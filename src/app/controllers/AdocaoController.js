import * as Yup from 'yup';
import Adocao from '../models/Adocao';
import Abrigo from '../models/Abrigo';
import Animal from '../models/Animal';

class AdocaoController {
  async indexByPK(req, res) {
    const adocoes = await Adocao.findOne({
      where: { id: req.params.id },
      attributes: [
        'id',
        'nome',
        'email',
        'telefone',
        'idade',
        'sexo',
        'estado_civil',
        'estado',
        'cidade',
        'bairro',
        'endereco',
        'numero',
        'complemento',
        'energia',
        'qtd_filhos',
        'qtd_filhos_menor',
        'mora_em',
        'tipo_moradia',
        'tempo_livre',
        'status',
        'descricao',
        'lida',
        'abrigo_id',
        'animal_id',
      ],
      include: [
        {
          model: Animal,
          as: 'animal',
          attributes: ['id', 'nome'],
        },
        {
          model: Abrigo,
          as: 'abrigo',
          attributes: ['id', 'nome', 'slug', 'user_id'],
        },
      ],
    });

    return res.json(adocoes);
  }

  async indexByAbrigo(req, res) {
    const adocoes = await Adocao.findAll({
      where: { abrigo_id: req.params.abrigoid },
      order: [['created_at', 'DESC']],
      attributes: [
        'id',
        'nome',
        'email',
        'telefone',
        'idade',
        'sexo',
        'estado_civil',
        'estado',
        'cidade',
        'bairro',
        'endereco',
        'numero',
        'complemento',
        'energia',
        'qtd_filhos',
        'qtd_filhos_menor',
        'mora_em',
        'tipo_moradia',
        'tempo_livre',
        'status',
        'descricao',
        'lida',
        'abrigo_id',
        'animal_id',
      ],
      include: [
        {
          model: Animal,
          as: 'animal',
          attributes: ['id', 'nome'],
        },
        {
          model: Abrigo,
          as: 'abrigo',
          attributes: ['id', 'nome', 'slug', 'user_id'],
        },
      ],
    });

    return res.json(adocoes);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      nome: Yup.string().required(),
      email: Yup.string().required(),
      telefone: Yup.string().required(),
      sexo: Yup.string().required(),
      descricao: Yup.string().required(),
      estado: Yup.string().required(),
      cidade: Yup.string().required(),
      bairro: Yup.string().required(),
      endereco: Yup.string().required(),
      numero: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'A validação falhou!' });
    }

    req.body.status = 'P';
    req.body.lida = 'false';
    if (!req.body.qtd_filhos) req.body.qtd_filhos = 0;
    if (!req.body.qtd_filhos_menor) req.body.qtd_filhos_menor = 0;
    const {
      id,
      nome,
      email,
      telefone,
      idade,
      sexo,
      estado_civil,
      estado,
      cidade,
      bairro,
      endereco,
      numero,
      complemento,
      energia,
      qtd_filhos,
      qtd_filhos_menor,
      mora_em,
      tipo_moradia,
      tempo_livre,
      status,
      descricao,
      lida,
      abrigo_id,
      animal_id,
    } = await Adocao.create(req.body);

    return res.json({
      id,
      nome,
      email,
      telefone,
      idade,
      sexo,
      estado_civil,
      estado,
      cidade,
      bairro,
      endereco,
      numero,
      complemento,
      energia,
      qtd_filhos,
      qtd_filhos_menor,
      mora_em,
      tipo_moradia,
      tempo_livre,
      status,
      descricao,
      lida,
      abrigo_id,
      animal_id,
    });
  }

  async update(req, res) {
    const { id, qtd_filhos, qtd_filhos_menor } = req.body;
    const adocao = await Adocao.findByPk(id);
    if (!adocao) return res.status(401).json('Adoção não encontrada!');

    if (!qtd_filhos) req.body.qtd_filhos = 0;
    if (!qtd_filhos_menor) req.body.qtd_filhos_menor = 0;
    const {
      nome,
      email,
      telefone,
      idade,
      sexo,
      estado_civil,
      estado,
      cidade,
      bairro,
      endereco,
      numero,
      complemento,
      energia,
      mora_em,
      tipo_moradia,
      tempo_livre,
      status,
      descricao,
      lida,
      abrigo_id,
      animal_id,
    } = await adocao.update(req.body);

    return res.json({
      id,
      nome,
      email,
      telefone,
      idade,
      sexo,
      estado_civil,
      estado,
      cidade,
      bairro,
      endereco,
      numero,
      complemento,
      energia,
      qtd_filhos,
      qtd_filhos_menor,
      mora_em,
      tipo_moradia,
      tempo_livre,
      status,
      descricao,
      lida,
      abrigo_id,
      animal_id,
    });
  }

  async delete(req, res) {
    const { id } = req.body;

    const adocao = await Adocao.findByPk(id);
    if (!adocao) return res.status(401).json('Adoção não encontrada!');
    adocao.status = 'H';

    await adocao.save();

    return res.json({ message: 'Registro excluído com sucesso!' });
  }
}

export default new AdocaoController();
