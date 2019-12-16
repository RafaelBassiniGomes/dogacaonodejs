import { compressImage } from '../../config/filehelper';

class RedimensionarImagens {
  get key() {
    return 'RedimensionarImagens';
  }

  async handle({ data }) {
    const { reqFile } = data;

    await compressImage(reqFile, 100);
    await compressImage(reqFile, 300);
    await compressImage(reqFile, 600);
    // await compressImage(reqFile, 800);
    // await compressImage(reqFile, 1024);
  }
}

export default new RedimensionarImagens();
