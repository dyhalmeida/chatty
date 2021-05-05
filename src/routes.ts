import { Router } from 'express';

const routes = Router();

/** Settings Routes */
import { SettingsController } from './controllers/SettingsController';
const settingsController = new SettingsController();
routes.post('/settings', settingsController.create);

/** Users Routes */
import { UsersController } from './controllers/UsersController';
const usersController = new UsersController();
routes.post('/users', usersController.create);

/** Messages Routes */
import { MessagesController } from './controllers/MessagesController';
const messagesController = new MessagesController();
routes.post('/messages', messagesController.create);

export { routes };
