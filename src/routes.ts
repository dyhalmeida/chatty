import { Router } from 'express';

const routes = Router();

/** Settings Routes */
import { SettingsController } from './controllers/SettingsController';
const settingsController = new SettingsController();
routes.post('/settings', settingsController.create);

/** Usuário Routes */
import { UsersController } from './controllers/UsersController';
const usersController = new UsersController();
routes.post('/users', usersController.create);

export { routes };
