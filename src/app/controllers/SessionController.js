import jwt from 'jsonwebtoken';
import User from '../models/User';
import File from '../models/File';
import authConfig from '../../config/auth';
import Abrigo from '../models/Abrigo';

class SessionController {
  async store(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({
      where: { email },
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['id', 'path', 'url'],
        },
        {
          model: Abrigo,
          as: 'abrigo',
          attributes: ['id', 'nome', 'slug'],
        },
      ],
    });
    if (!user) {
      return res.status(401).json({ error: 'Usuário ou senha inválidos!' });
    }
    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ error: 'Usuário ou senha inválidos!' });
    }

    const { id, name, avatar, abrigo } = user;

    return res.json({
      user: {
        id,
        name,
        email,
        avatar,
        abrigo,
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new SessionController();
