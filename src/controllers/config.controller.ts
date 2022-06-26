import log from '$helpers/log';
import { fail, success } from '$helpers/response';
import { Express, Request, Response } from 'express';
import { verifyAccessToken } from '$middlewares/auth.middleware';
import { validate } from '$helpers/validate';
import { createConfig, deleteConfig, getConfig, updateConfig } from '$services/config.service';
import { createConfigSchema, deleteConfigSchema, updateConfigSchema } from '$validators/config';
const logger = log('Config controller');

export default function configController(app: Express) {
  app.post('/config', [verifyAccessToken], async (req: Request, res: Response) => {
    try {
      validate(createConfigSchema, req.body);
      const { key, value } = req.body;

      await createConfig(key, value);
      return success(res);
    } catch (err) {
      logger.error(err);
      return fail(res, err);
    }
  });

  app.put('/config', [verifyAccessToken], async (req: Request, res: Response) => {
    try {
      validate(updateConfigSchema, req.body);
      const { key, value } = req.body;

      await updateConfig(key, value);
      return success(res);
    } catch (err) {
      logger.error(err);
      return fail(res, err);
    }
  });

  app.get('/config', [], async (req: Request, res: Response) => {
    try {
      const results = await getConfig();

      return success(res, results);
    } catch (err) {
      logger.error(err);
      return fail(res, err);
    }
  });

  app.put('/config/remove', [verifyAccessToken], async (req: Request, res: Response) => {
    try {
      validate(deleteConfigSchema, req.body);
      const { key } = req.body;

      await deleteConfig(key);
      return success(res);
    } catch (error) {}
  });
}
