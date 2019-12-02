import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import AbrigoController from './app/controllers/AbrigoController';
import AnimalController from './app/controllers/AnimalController';
import RemedioController from './app/controllers/RemedioController';
import ProdutoController from './app/controllers/ProdutoController';
import ParceiroController from './app/controllers/ParceiroController';
import EventoController from './app/controllers/EventoController';

import authMiddleware from './app/middlewares/auth';
import NotificacaoController from './app/controllers/NotificacaoController';

const routes = new Router();
const upload = multer(multerConfig);
routes.post('/users', UserController.store);

routes.get('/abrigos', AbrigoController.index);
routes.get('/abrigo/:slug', AbrigoController.indexBySlug);
routes.get('/abrigos/:id', AbrigoController.indexByPk);
routes.get('/produtos', ProdutoController.index);
routes.get('/parceiros', ParceiroController.index);
routes.post('/parceiros', ParceiroController.store);
routes.get('/eventos', EventoController.index);
routes.get('/eventos/:id', EventoController.indexByPK);
routes.get('/animais/:id', AnimalController.indexByPK);
routes.get('/animais', AnimalController.index);
routes.get('/adocoesabrigos/:abrigoid', AnimalController.indexByAbrigo);
routes.get('/files', FileController.index);

routes.post('/sessions', SessionController.store);
routes.post('/redefinirSenha', UserController.redefinirSenha);
routes.post('/notificacao', NotificacaoController.index);

routes.use(authMiddleware);

routes.put('/users', UserController.update);
routes.get('/users/:id', UserController.indexByPK);
routes.post('/files', upload.single('file'), FileController.store);
routes.get('/abrigosResponsavel', AbrigoController.indexByResponsavel);
routes.get('/abrigoResponsavel/:slug', AbrigoController.indexBySlugResponsavel);
routes.post('/abrigos', AbrigoController.store);
routes.put('/abrigos', AbrigoController.update);
routes.post('/animais', AnimalController.store);
routes.put('/animais', AnimalController.update);
routes.delete('/animais/:id', AnimalController.delete);
routes.get('/remedios', RemedioController.index);
routes.post('/remedios', RemedioController.store);
routes.put('/remedios', RemedioController.update);
routes.delete('/remedios/:id', RemedioController.delete);
routes.post('/produtos', ProdutoController.store);
routes.put('/produtos', ProdutoController.update);
routes.delete('/produtos/:id', ProdutoController.delete);
routes.get('/notificacao', NotificacaoController.index);
routes.post('/eventos', EventoController.store);
routes.put('/eventos', EventoController.update);
routes.delete('/eventos/:id', EventoController.delete);
export default routes;
