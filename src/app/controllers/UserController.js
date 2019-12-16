import * as Yup from 'yup';
import User from '../models/User';
import File from '../models/File';
import RedefinirSenhaMail from '../jobs/redefinirSenhaMail';
import Queue from '../../lib/Queue';

function gerarPassword() {
  return Math.random()
    .toString(36)
    .slice(-10);
}

class UserController {
  async indexByPK(req, res) {
    const user = await User.findOne({
      where: { id: req.params.id },
      attributes: ['id', 'name', 'email', 'admin', 'avatar_id'],
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['id', 'path', 'url'],
        },
      ],
    });

    return res.json(user);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .required()
        .min(6),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'A validação falhou!' });
    }

    const UserExists = await User.findOne({ where: { email: req.body.email } });

    if (UserExists) {
      return res.status(400).json({ error: 'Email já cadastrado.' });
    }

    const { id, name, email, admin, avatar_id } = await User.create(req.body);

    return res.json({
      id,
      name,
      email,
      admin,
      avatar_id,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      oldPassword: Yup.string().min(6),
      password: Yup.string()
        .min(6)
        .when('oldPassword', (oldPassword, field) =>
          oldPassword ? field.required() : field
        ),
      confirmPassword: Yup.string().when('password', (password, field) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field
      ),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'A validação falhou!' });
    }
    const { email, oldPassword } = req.body;

    const user = await User.findByPk(req.userId, {
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['id', 'path', 'url'],
        },
      ],
    });
    if (!user) return res.status(401).json('Usuario precisa estar logado');

    if (email.toLowerCase() !== user.email.toLowerCase()) {
      const UserExists = await User.findOne({ where: { email } });

      if (UserExists) {
        return res.status(400).json({ error: 'Email já cadastrado.' });
      }
    }
    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'Senha incorreta.' });
    }

    await user.update(req.body);

    const { id, name, admin, avatar, avatar_id } = await User.findByPk(
      req.userId,
      {
        include: [
          {
            model: File,
            as: 'avatar',
            attributes: ['id', 'path', 'url'],
          },
        ],
      }
    );

    return res.json({
      id,
      name,
      email,
      admin,
      avatar,
      avatar_id,
    });
  }

  async redefinirSenha(req, res) {
    const { email } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: 'E-mail não cadastrado!' });
    }

    const novaSenha = gerarPassword();

    user.password = novaSenha;
    user.update();

    await Queue.add(RedefinirSenhaMail.key, {
      user,
      novaSenha,
    });
    return res.json({ message: `Senha enviada para o e-mail ${email}` });
  }
}

export default new UserController();
