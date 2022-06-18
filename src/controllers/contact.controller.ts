import log from '$helpers/log';
import { fail, success } from '$helpers/response';
import { Express, Request, Response } from 'express';
import { verifyAccessToken } from '$middlewares/auth.middleware';
import { validate } from '$helpers/validate';
import { assignPaging } from '$helpers/index';
import {
  createContact,
  getListContact,
  IGetListContact,
  updateContact,
} from '$services/contact.service';
import { createContactSchema, updateContactSchema } from '$validators/contact';
const logger = log('Contact controller');

export default function contactController(app: Express) {
  app.post('/contact', [verifyAccessToken], async (req: Request, res: Response) => {
    try {
      validate(createContactSchema, req.body);

      await createContact(req.body);
      return success(res);
    } catch (err) {
      logger.error(err);
      return fail(res, err);
    }
  });

  app.put('/contact/:contactId', [verifyAccessToken], async (req: Request, res: Response) => {
    try {
      validate(updateContactSchema, req.body);

      await updateContact(req.params.contactId, req.body);
      return success(res);
    } catch (err) {
      logger.error(err);
      return fail(res, err);
    }
  });

  app.get('/contact', [verifyAccessToken], async (req: Request, res: Response) => {
    try {
      const query = assignPaging(req.query) as IGetListContact;
      const { results, totalItems } = await getListContact(query);

      return success(res, results, 200, {
        totalItems,
        pageIndex: query.pageIndex,
        pageSize: query.pageSize,
      });
    } catch (err) {
      logger.error(err);
      return fail(res, err);
    }
  });
}
