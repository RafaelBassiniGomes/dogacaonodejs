import File from '../models/File';
import RedimensionarImagens from '../jobs/redimensionarImagens';
import Queue from '../../lib/Queue';

class FileController {
  async store(req, res) {
    const { originalname: name, filename: path } = req.file;
    const reqFile = req.file;
    const file = await File.create({
      name,
      path,
    });
    await Queue.add(RedimensionarImagens.key, {
      reqFile,
    });

    return res.json(file);
  }

  async index(req, res) {
    const files = await File.findAll({
      attributes: [
        'id',
        'name',
        'path',
        'url',
        'url_100',
        'url_300',
        'url_600',
      ],
    });

    return res.json(files);
  }
}

export default new FileController();
