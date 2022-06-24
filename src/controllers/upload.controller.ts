import log from '$helpers/log';
import { fail, success } from '$helpers/response';
import { Express, Request, Response } from 'express';
import { verifyAccessToken } from '$middlewares/auth.middleware';
import config from '$config';
import s3Upload from '$helpers/s3Upload';

const logger = log('Upload controller');

export default function uploadController(app: Express) {
  app.post(
    '/upload',
    [verifyAccessToken, s3Upload.upload.array('files', 50)],
    async (req: Request, res: Response) => {
      try {
        let files = [];

        if (req['files'] && req['files'].length > 0) {
          for (let f of req['files']) {
            files.push(`${config.S3.S3_DOMAIN}/${f.key}`);
          }
        }

        return success(res, files);
      } catch (err) {
        logger.error(err);
        return fail(res, err);
      }
    }
  );
}
