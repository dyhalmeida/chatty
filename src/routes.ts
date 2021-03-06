import { Router } from 'express';

const routes = Router();

/** Settings Routes */
import { SettingsController } from './controllers/SettingsController';
const settingsController = new SettingsController();
routes.post('/settings', settingsController.create);
routes.get('/settings/:username', settingsController.show);
routes.put('/settings/:username', settingsController.update);

/** Users Routes */
import { UsersController } from './controllers/UsersController';
const usersController = new UsersController();
routes.post('/users', usersController.create);

/** Messages Routes */
import { MessagesController } from './controllers/MessagesController';
const messagesController = new MessagesController();
routes.post('/messages', messagesController.create);
routes.get('/messages/:user_id', messagesController.index);

export { routes };
