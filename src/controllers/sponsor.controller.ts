import log from '$helpers/log';
import { fail, success } from '$helpers/response';
import { Express, Request, Response } from 'express';
import { verifyAccessToken } from '$middlewares/auth.middleware';
import { validate } from '$helpers/validate';
import { assignPaging } from '$helpers/index';
import { createSponsorSchema, updateSponsorSchema } from '$validators/sponsor';
import {
  createSponsor,
  getListSponsor,
  IGetListSponsor,
  updateSponsor,
} from '$services/sponsor.service';

const logger = log('Sponsor controller');

export default function sponsorController(app: Express) {
  app.post('/sponsor', [verifyAccessToken], async (req: Request, res: Response) => {
    try {
      validate(createSponsorSchema, req.body);

      await createSponsor(req.userId, req.body);
      return success(res);
    } catch (err) {
      logger.error(err);
      return fail(res, err);
    }
  });

  app.put('/sponsor/:postId', [verifyAccessToken], async (req: Request, res: Response) => {
    try {
      validate(updateSponsorSchema, req.body);

      await updateSponsor(req.params.postId, req.body);
      return success(res);
    } catch (err) {
      logger.error(err);
      return fail(res, err);
    }
  });

  app.get('/sponsor', [], async (req: Request, res: Response) => {
    try {
      const query = assignPaging(req.query) as IGetListSponsor;
      const { results, totalItems } = await getListSponsor(query);
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
