import log from '$helpers/log';
import { fail, success } from '$helpers/response';
import { Express, Request, Response } from 'express';
import { verifyAccessToken } from '$middlewares/auth.middleware';
import { validate } from '$helpers/validate';
import {
  createCategory,
  getDetailCategory,
  getListCategory,
  getListPostByCategory,
  IGetListCategory,
  IGetListPostByCategory,
  updateCategory,
} from '$services/category.service';
import { assignPaging } from '$helpers/index';
import { createCategorySchema, updateCategorySchema } from '$validators/category';
const logger = log('Category controller');

export default function categoryController(app: Express) {
  app.post('/category', [verifyAccessToken], async (req: Request, res: Response) => {
    try {
      validate(createCategorySchema, req.body);

      await createCategory(req.userId, req.body);
      return success(res);
    } catch (err) {
      logger.error(err);
      return fail(res, err);
    }
  });

  app.put('/category/:categoryId', [verifyAccessToken], async (req: Request, res: Response) => {
    try {
      validate(updateCategorySchema, req.body);

      await updateCategory(req.params.categoryId, req.body);
      return success(res);
    } catch (err) {
      logger.error(err);
      return fail(res, err);
    }
  });

  app.get('/category', [], async (req: Request, res: Response) => {
    try {
      const query = assignPaging(req.query) as IGetListCategory;
      const { results, totalItems } = await getListCategory(query);
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

  app.get('/category/:categoryId', [], async (req: Request, res: Response) => {
    try {
      const results = await getDetailCategory(req.params.categoryId);
      return success(res, results, 200);
    } catch (err) {
      logger.error(err);
      return fail(res, err);
    }
  });

  app.get('/category/:categoryId/list-post', [], async (req: Request, res: Response) => {
    try {
      const query = assignPaging(req.query) as IGetListPostByCategory;
      const { results, totalItems } = await getListPostByCategory(req.params.categoryId, query);
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
