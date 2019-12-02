import * as Yup from 'yup';
import Produto from '../models/Produto';
import Abrigo from '../models/Abrigo';

class ProdutoController {
  async index(req, res) {
    const produto = await Produto.findAll({
      attributes: ['id', 'nome', 'descricao', 'preco', 'quantidade', 'tamanho'],
      include: [
        {
          model: Abrigo,
          as: 'abrigo',
          attributes: ['id', 'nome'],
        },
      ],
    });
    return res.json(produto);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      nome: Yup.string().required(),
      abrigo_id: Yup.number().required(),
      quantidade: Yup.number(),
      preco: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'A validação falhou!' });
    }

    const produtoExists = await Produto.findOne({
      where: { nome: req.body.nome, abrigo_id: req.body.abrigo_id },
    });

    if (produtoExists) {
      return res
        .status(400)
        .json({ error: 'Produto já cadastrado para esse abrigo.' });
    }

    req.body.user_id = req.userId;

    const {
      id,
      nome,
      descricao,
      preco,
      quantidade,
      tamanho,
      abrigo_id,
      user_id,
    } = await Produto.create(req.body);

    return res.json({
      id,
      nome,
      descricao,
      preco,
      quantidade,
      tamanho,
      abrigo_id,
      user_id,
    });
  }

  async update(req, res) {
    const { id, nome, abrigo_id } = req.body;

    const produto = await Produto.findByPk(id);
    if (!produto) return res.status(401).json('Produto não encontrado!');

    if (nome !== produto.nome) {
      const produtoExists = await Produto.findOne({
        where: { nome: req.body.nome, abrigo_id: req.body.abrigo_id },
      });

      if (produtoExists) {
        return res
          .status(400)
          .json({ error: 'Produto já cadastrado para esse abrigo.' });
      }
    }

    const {
      descricao,
      preco,
      quantidade,
      tamanho,
      user_id,
    } = await produto.update(req.body);

    return res.json({
      id,
      nome,
      descricao,
      preco,
      quantidade,
      tamanho,
      abrigo_id,
      user_id,
    });
  }

  async delete(req, res) {
    const { id } = req.params;

    const produto = await Produto.findByPk(id);
    if (!produto) return res.status(401).json('Produto não encontrado!');

    await produto.destroy();

    return res.json({ message: 'Registro excluído com sucesso!' });
  }
}

export default new ProdutoController();
