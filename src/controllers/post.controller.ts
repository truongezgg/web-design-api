import log from '$helpers/log';
import { fail, success } from '$helpers/response';
import { Express, Request, Response } from 'express';
import { verifyAccessToken } from '$middlewares/auth.middleware';
import { validate } from '$helpers/validate';
import { assignPaging } from '$helpers/index';
import {
  createPost,
  getDetailPost,
  getListPost,
  IGetListPost,
  updatePost,
} from '$services/post.service';
import { createPostSchema, updatePostSchema } from '$validators/post';
const logger = log('Post controller');

export default function postController(app: Express) {
  app.post('/post', [verifyAccessToken], async (req: Request, res: Response) => {
    try {
      validate(createPostSchema, req.body);

      await createPost(req.userId, req.body);
      return success(res);
    } catch (err) {
      logger.error(err);
      return fail(res, err);
    }
  });

  app.put('/post/:postId', [verifyAccessToken], async (req: Request, res: Response) => {
    try {
      validate(updatePostSchema, req.body);

      await updatePost(req.params.postId, req.body);
      return success(res);
    } catch (err) {
      logger.error(err);
      return fail(res, err);
    }
  });

  app.get('/post', [], async (req: Request, res: Response) => {
    try {
      const query = assignPaging(req.query) as IGetListPost;
      const { results, totalItems } = await getListPost(query);
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

  app.get('/post/:postId', [], async (req: Request, res: Response) => {
    try {
      const results = await getDetailPost(req.params.postId);
      return success(res, results, 200);
    } catch (err) {
      logger.error(err);
      return fail(res, err);
    }
  });
}
