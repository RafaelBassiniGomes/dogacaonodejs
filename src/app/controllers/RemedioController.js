import * as Yup from 'yup';
import Remedio from '../models/Remedio';
import Abrigo from '../models/Abrigo';

class RemedioController {
  async index(req, res) {
    const remedio = await Remedio.findAll({
      attributes: ['id', 'nome', 'quantidade', 'tipo', 'fechado', 'observacao'],
      include: [
        {
          model: Abrigo,
          as: 'abrigo',
          attributes: ['id', 'nome'],
        },
      ],
    });
    return res.json(remedio);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      nome: Yup.string().required(),
      quantidade: Yup.number().required(),
      tipo: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'A validação falhou!' });
    }

    const RemedioExists = await Remedio.findOne({
      where: { nome: req.body.nome, abrigo_id: req.body.abrigo_id },
    });

    if (RemedioExists) {
      return res
        .status(400)
        .json({ error: 'Remédio já cadastrado para esse abrigo.' });
    }

    req.body.user_id = req.userId;
    req.body.status = 'A';

    const {
      id,
      nome,
      quantidade,
      tipo,
      observacao,
      fechado,
      abrigo_id,
      user_id,
    } = await Remedio.create(req.body);

    return res.json({
      id,
      nome,
      quantidade,
      tipo,
      observacao,
      fechado,
      abrigo_id,
      user_id,
    });
  }

  async update(req, res) {
    const { id, nome, abrigo_id } = req.body;

    const remedio = await Remedio.findByPk(id);
    if (!remedio) return res.status(401).json('Remédio não encontrado!');

    if (nome !== remedio.nome) {
      const RemedioExists = await Remedio.findOne({
        where: { nome: req.body.nome, abrigo_id: req.body.abrigo_id },
      });

      if (RemedioExists) {
        return res
          .status(400)
          .json({ error: 'Remédio já cadastrado para esse abrigo.' });
      }
    }

    const {
      quantidade,
      tipo,
      observacao,
      fechado,
      user_id,
    } = await remedio.update(req.body);

    return res.json({
      id,
      nome,
      quantidade,
      tipo,
      observacao,
      fechado,
      abrigo_id,
      user_id,
    });
  }

  async delete(req, res) {
    const { id } = req.body;

    const remedio = await Remedio.findByPk(id);
    if (!remedio) return res.status(401).json('Remédio não encontrado!');

    await remedio.destroy();

    return res.json({ message: 'Registro excluído com sucesso!' });
  }
}

export default new RemedioController();
