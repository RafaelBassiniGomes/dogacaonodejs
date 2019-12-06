import * as Yup from 'yup';
import Animal from '../models/Animal';
import Abrigo from '../models/Abrigo';
import File from '../models/File';

import Cache from '../../lib/Cache';
import { FormataStringData } from '../logicas/funcao';

class AnimalController {
  async index(req, res) {
    const cached = await Cache.get('animais');

    if (cached) {
      return res.json(cached);
    }

    const animais = await Animal.findAll({
      where: { status: 'A' },
      attributes: [
        'id',
        'nome',
        'descricao',
        'peso',
        'data_resgate',
        'data_nascimento',
        'tipo',
        'porte',
        'energia',
        'amizade_caes',
        'amizade_estranhos',
        'amizade_crianca',
        'status',
        'sexo',
        'castrado',
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
          attributes: ['id', 'nome', 'slug', 'email', 'telefone', 'user_id'],
        },
      ],
    });

    await Cache.set('animais', animais);

    return res.json(animais);
  }

  async indexByPK(req, res) {
    const animais = await Animal.findOne({
      where: { status: 'A', id: req.params.id },
      attributes: [
        'id',
        'nome',
        'descricao',
        'peso',
        'data_resgate',
        'data_nascimento',
        'tipo',
        'porte',
        'energia',
        'amizade_caes',
        'amizade_estranhos',
        'amizade_crianca',
        'status',
        'abrigo_id',
        'avatar_id',
        'sexo',
        'castrado',
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
          attributes: ['id', 'nome', 'slug', 'email', 'telefone', 'user_id'],
        },
      ],
    });

    return res.json(animais);
  }

  async indexByAbrigo(req, res) {
    const animais = await Animal.findAll({
      where: { status: 'A', abrigo_id: req.params.abrigoid },
      attributes: [
        'id',
        'nome',
        'descricao',
        'peso',
        'data_resgate',
        'data_nascimento',
        'tipo',
        'porte',
        'energia',
        'amizade_caes',
        'amizade_estranhos',
        'amizade_crianca',
        'status',
        'sexo',
        'castrado',
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
          attributes: ['id', 'nome', 'slug', 'email', 'telefone'],
        },
      ],
    });

    return res.json(animais);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      nome: Yup.string().required(),
      descricao: Yup.string().required(),
      tipo: Yup.number().required(),
      porte: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'A validação falhou!' });
    }

    req.body.user_id = req.userId;
    req.body.status = 'A';
    req.body.data_nascimento = FormataStringData(req.body.data_nascimento);
    req.body.data_resgate = FormataStringData(req.body.data_resgate);

    const {
      id,
      nome,
      descricao,
      peso,
      data_resgate,
      data_nascimento,
      tipo,
      porte,
      energia,
      amizade_caes,
      amizade_estranhos,
      amizade_crianca,
      status,
      abrigo_id,
      avatar_id,
      sexo,
      castrado,
    } = await Animal.create(req.body);

    await Cache.invalidate('animais');

    return res.json({
      id,
      nome,
      descricao,
      peso,
      data_resgate,
      data_nascimento,
      tipo,
      porte,
      energia,
      amizade_caes,
      amizade_estranhos,
      amizade_crianca,
      status,
      abrigo_id,
      avatar_id,
      sexo,
      castrado,
    });
  }

  async update(req, res) {
    const { id } = req.body;

    const animal = await Animal.findByPk(id);
    if (!animal) return res.status(401).json('Animal não encontrado!');

    req.body.data_nascimento = FormataStringData(req.body.data_nascimento);
    req.body.data_resgate = FormataStringData(req.body.data_resgate);

    const {
      nome,
      descricao,
      peso,
      data_resgate,
      data_nascimento,
      tipo,
      porte,
      energia,
      amizade_caes,
      amizade_estranhos,
      amizade_crianca,
      status,
      abrigo_id,
      avatar_id,
      sexo,
      castrado,
    } = await animal.update(req.body);

    await Cache.invalidate('animais');

    return res.json({
      id,
      nome,
      descricao,
      peso,
      data_resgate,
      data_nascimento,
      tipo,
      porte,
      energia,
      amizade_caes,
      amizade_estranhos,
      amizade_crianca,
      status,
      abrigo_id,
      avatar_id,
      sexo,
      castrado,
    });
  }

  async delete(req, res) {
    const { id } = req.body;

    const animal = await Animal.findByPk(id);
    if (!animal) return res.status(401).json('Animal não encontrado!');
    animal.status = 'H';

    await animal.save();

    await Cache.invalidate('animais');

    return res.json({ message: 'Registro excluído com sucesso!' });
  }
}

export default new AnimalController();
