import * as Yup from 'yup';
import Abrigo from '../models/Abrigo';
import User from '../models/User';
import File from '../models/File';

import Cache from '../../lib/Cache';

class AbrigoController {
  async index(req, res) {
    await Cache.invalidate('abrigos');
    const cached = await Cache.get('abrigos');
    if (cached) {
      return res.json(cached);
    }

    const abrigos = await Abrigo.findAll({
      where: { status: 'A' },
      order: [['updated_at', 'DESC']],
      attributes: [
        'id',
        'nome',
        'slug',
        'email',
        'telefone',
        'estado',
        'cidade',
        'bairro',
        'endereco',
        'numero',
        'complemento',
        'quemSomos',
        'comoAjudar',
        'status',
      ],
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name', 'email'],
        },
        {
          model: File,
          as: 'avatar',
          attributes: ['id', 'path', 'url', 'url_100', 'url_300', 'url_600'],
        },
      ],
    });

    await Cache.set('abrigos', abrigos);

    return res.json(abrigos);
  }

  async indexByPk(req, res) {
    const abrigos = await Abrigo.findByPk(req.params.id, {
      where: { status: 'A' },
      attributes: [
        'id',
        'nome',
        'slug',
        'email',
        'telefone',
        'estado',
        'cidade',
        'bairro',
        'endereco',
        'numero',
        'complemento',
        'quemSomos',
        'comoAjudar',
        'status',
      ],
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name', 'email'],
        },
        {
          model: File,
          as: 'avatar',
          attributes: ['id', 'path', 'url', 'url_100', 'url_300', 'url_600'],
        },
      ],
    });

    return res.json(abrigos);
  }

  async indexBySlug(req, res) {
    const abrigos = await Abrigo.findOne({
      where: { slug: req.params.slug },
      attributes: [
        'id',
        'nome',
        'slug',
        'email',
        'telefone',
        'estado',
        'cidade',
        'bairro',
        'endereco',
        'numero',
        'complemento',
        'quemSomos',
        'comoAjudar',
        'status',
      ],
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name', 'email'],
        },
        {
          model: File,
          as: 'avatar',
          attributes: ['id', 'path', 'url', 'url_100', 'url_300', 'url_600'],
        },
      ],
    });

    return res.json(abrigos);
  }

  async indexBySlugResponsavel(req, res) {
    const abrigos = await Abrigo.findOne({
      where: { slug: req.params.slug, user_id: req.userId },
      attributes: [
        'id',
        'nome',
        'slug',
        'email',
        'telefone',
        'estado',
        'cidade',
        'bairro',
        'endereco',
        'numero',
        'complemento',
        'quemSomos',
        'comoAjudar',
        'status',
      ],
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name', 'email'],
        },
        {
          model: File,
          as: 'avatar',
          attributes: ['id', 'path', 'url', 'url_100', 'url_300', 'url_600'],
        },
      ],
    });

    return res.json(abrigos);
  }

  async indexByResponsavel(req, res) {
    const abrigos = await Abrigo.findAll({
      where: { user_id: req.userId },
      attributes: ['id', 'nome', 'title', 'cidade', 'estado'],
      include: [{
        model: File,
        as: 'avatar',
        attributes: ['id', 'path', 'url', 'url_100', 'url_300', 'url_600'],
      },
    ],
    });

    return res.json(abrigos);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      nome: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      estado: Yup.string().required(),
      cidade: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'A validação falhou!' });
    }
    const AbrigoExists = await Abrigo.findOne({
      where: { nome: req.body.nome },
    });

    if (AbrigoExists) {
      throw new Error('Nome já cadastrado.');
    }
    req.body.user_id = req.userId;
    req.body.status = 'A';
    req.body.slug = req.body.nome.replace(/ /g, '');

    const {
      id,
      nome,
      slug,
      email,
      telefone,
      estado,
      cidade,
      bairro,
      endereco,
      numero,
      complemento,
      quemSomos,
      comoAjudar,
      user_id,
      avatar_id,
      status,
    } = await Abrigo.create(req.body);

    await Cache.invalidate('abrigos');

    return res.json({
      id,
      nome,
      slug,
      email,
      telefone,
      estado,
      cidade,
      bairro,
      endereco,
      numero,
      complemento,
      quemSomos,
      comoAjudar,
      user_id,
      avatar_id,
      status,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      nome: Yup.string(),
      email: Yup.string().email(),
      estado: Yup.string(),
      cidade: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'A validação falhou!' });
    }
    const { id, nome } = req.body;

    const abrigo = await Abrigo.findByPk(id);
    if (!abrigo) return res.status(401).json('Abrigo não encontrado!');

    if (abrigo.user_id !== req.userId)
      return res
        .status(401)
        .json('Usuário não tem permissão para alterar esse abrigo!');

    if (nome !== abrigo.nome) {
      const AbrigoExists = await Abrigo.findOne({ where: { nome } });

      if (AbrigoExists) {
        return res.status(400).json({ error: 'Nome já cadastrado.' });
      }
    }
    req.body.slug = req.body.nome.replace(/ /g, '');
    const { email, telefone, cidade, bairro, slug } = await abrigo.update(
      req.body
    );

    await Cache.invalidate('abrigos');

    return res.json({
      id,
      nome,
      email,
      telefone,
      cidade,
      bairro,
      slug,
    });
  }
}

export default new AbrigoController();
