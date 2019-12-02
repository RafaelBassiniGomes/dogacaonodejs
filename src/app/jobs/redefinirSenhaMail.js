import Mail from '../../lib/Mail';

class RedefinirSenhaMail {
  get key() {
    return 'RedefinirSenhaMail';
  }

  async handle({ data }) {
    const { user, novaSenha } = data;

    await Mail.sendMail({
      to: `${user.name} <${user.email}>`,
      subject: 'Redefinição de senha',
      template: 'RedefinirSenha',
      context: {
        nome: user.name,
        email: user.email,
        novaSenha,
      },
    });
  }
}

export default new RedefinirSenhaMail();
