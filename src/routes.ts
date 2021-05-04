import { Router } from 'express';

const routes = Router();

import { SettingsController } from './controllers/SettingsController';
const settingsController = new SettingsController();
routes.post('/settings', settingsController.create);

export { routes };
