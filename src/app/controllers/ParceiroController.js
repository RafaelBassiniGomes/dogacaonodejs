import * as Yup from 'yup';
import Parceiro from '../models/Parceiro';

class ParceiroController {
  async index(req, res) {
    const parceiro = await Parceiro.findAll({
      attributes: ['id', 'nome', 'link'],
      order: [['ordenacao', 'ASC']],
    });
    return res.json(parceiro);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      nome: Yup.string().required(),
      link: Yup.string().required(),
      ordenacao: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'A validação falhou!' });
    }
    const ParceiroExists = await Parceiro.findOne({
      where: { nome: req.body.nome },
    });

    if (ParceiroExists) {
      throw new Error('Parceiro já cadastrado.');
    }

    const { id, nome, link, ordenacao } = await Parceiro.create(req.body);

    return res.json({
      id,
      nome,
      link,
      ordenacao,
    });
  }
}

export default new ParceiroController();
