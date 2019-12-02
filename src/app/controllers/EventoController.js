import * as Yup from 'yup';
import Evento from '../models/Evento';
import Abrigo from '../models/Abrigo';
import File from '../models/File';

import Cache from '../../lib/Cache';
import { FormataStringData } from '../logicas/funcao';

class EventoController {
  async index(req, res) {
    const cached = await Cache.get('Eventos');

    if (cached) {
      return res.json(cached);
    }

    const eventos = await Evento.findAll({
      where: { status: 'A' },
      attributes: [
        'id',
        'titulo',
        'descricao',
        'data_evento',
        'estado',
        'cidade',
        'bairro',
        'endereco',
        'numero',
        'local',
        'referencia',
        'latitude',
        'longitude',
        'status',
        'abrigo_id',
        'avatar_id',
      ],
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['id', 'path', 'url'],
        },
        {
          model: Abrigo,
          as: 'abrigo',
          attributes: ['id', 'nome', 'slug', 'user_id'],
        },
      ],
    });

    await Cache.set('Eventos', eventos);

    return res.json(eventos);
  }

  async indexByPK(req, res) {
    const eventos = await Evento.findOne({
      where: { status: 'A', id: req.params.id },
      attributes: [
        'id',
        'titulo',
        'descricao',
        'data_evento',
        'estado',
        'cidade',
        'bairro',
        'endereco',
        'numero',
        'local',
        'referencia',
        'latitude',
        'longitude',
        'status',
        'abrigo_id',
        'avatar_id',
      ],
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['id', 'path', 'url'],
        },
        {
          model: Abrigo,
          as: 'abrigo',
          attributes: ['id', 'nome', 'slug', 'user_id'],
        },
      ],
    });

    return res.json(eventos);
  }

  async indexByAbrigo(req, res) {
    const eventos = await Evento.findAll({
      where: { status: 'A', abrigo_id: req.params.abrigoid },
      attributes: [
        'id',
        'titulo',
        'descricao',
        'data_evento',
        'estado',
        'cidade',
        'bairro',
        'endereco',
        'numero',
        'local',
        'referencia',
        'latitude',
        'longitude',
        'status',
      ],
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['id', 'path', 'url'],
        },
        {
          model: Abrigo,
          as: 'abrigo',
          attributes: ['id', 'nome', 'slug', 'user_id'],
        },
      ],
    });

    return res.json(eventos);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      titulo: Yup.string().required(),
      descricao: Yup.string().required(),
      estado: Yup.string().required(),
      cidade: Yup.string().required(),
      bairro: Yup.string().required(),
      endereco: Yup.string().required(),
      numero: Yup.string().required(),
      local: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'A validação falhou!' });
    }

    req.body.user_id = req.userId;
    req.body.status = 'A';
    req.body.data_evento = FormataStringData(req.body.data_evento);

    const {
      id,
      titulo,
      descricao,
      data_evento,
      estado,
      cidade,
      bairro,
      endereco,
      numero,
      local,
      referencia,
      latitude,
      longitude,
      status,
      abrigo_id,
      avatar_id,
      user_id,
    } = await Evento.create(req.body);

    await Cache.invalidate('Eventos');

    return res.json({
      id,
      titulo,
      descricao,
      data_evento,
      estado,
      cidade,
      bairro,
      endereco,
      numero,
      local,
      referencia,
      latitude,
      longitude,
      status,
      abrigo_id,
      avatar_id,
      user_id,
    });
  }

  async update(req, res) {
    const { id } = req.body;
    console.log(req.body);
    const evento = await Evento.findByPk(id);
    if (!evento) return res.status(401).json('Evento não encontrado!');

    req.body.user_id = req.userId;
    req.body.data_evento = FormataStringData(req.body.data_evento);

    const {
      titulo,
      descricao,
      data_evento,
      estado,
      cidade,
      bairro,
      endereco,
      numero,
      local,
      referencia,
      latitude,
      longitude,
      status,
      abrigo_id,
      avatar_id,
      user_id,
    } = await evento.update(req.body);

    await Cache.invalidate('Eventos');

    return res.json({
      id,
      titulo,
      descricao,
      data_evento,
      estado,
      cidade,
      bairro,
      endereco,
      numero,
      local,
      referencia,
      latitude,
      longitude,
      status,
      abrigo_id,
      avatar_id,
      user_id,
    });
  }

  async delete(req, res) {
    const { id } = req.body;

    const evento = await Evento.findByPk(id);
    if (!evento) return res.status(401).json('Evento não encontrado!');
    evento.status = 'H';

    await evento.save();

    await Cache.invalidate('Eventos');

    return res.json({ message: 'Registro excluído com sucesso!' });
  }
}

export default new EventoController();
