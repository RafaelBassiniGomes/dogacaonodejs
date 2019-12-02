class NotificacaoController {
  async index(req, res) {
    return res.json([
      {
        id: 1,
        descricao: 'teste 1',
        user: 1,
        lida: false,
        createdAt: '2019-10-07 07:30:00.742',
      },
      {
        id: 2,
        descricao: 'teste 2',
        user: 1,
        lida: true,
        createdAt: '2019-10-07 07:38:00.742',
      },
    ]);
  }
}

export default new NotificacaoController();
