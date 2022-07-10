require('dotenv').config();
import 'module-alias/register';
import express from 'express';
import { createServer } from 'http';
import cors from 'cors';
import createMongoConnection from '$helpers/mongo';
import log from '$helpers/log';
import config from '$config';
import logRequest from '$middlewares/logRequest';
import limiter from '$middlewares/limiter';
import authController from '$controllers/auth.controller';
import userController from '$controllers/user.controller';
import categoryController from '$controllers/category.controller';
import postController from '$controllers/post.controller';
import contactController from '$controllers/contact.controller';
import configController from '$controllers/config.controller';
import uploadController from '$controllers/upload.controller';
import sponsorController from '$controllers/sponsor.controller';
const logger = log('Index');

const app = express();
const http = createServer(app);

createMongoConnection()
  .then(() => {
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    /* -------------------------------------------------------------------------- */
    /*                        Logging all request to server                       */
    /* -------------------------------------------------------------------------- */
    app.use(logRequest);

    /* -------------------------------------------------------------------------- */
    /*                     Limit maximum 300 req/1m from 1 IP                     */
    /* -------------------------------------------------------------------------- */
    app.use(limiter());

    /* -------------------------------------------------------------------------- */
    /*                            Register API endpoint                           */
    /* -------------------------------------------------------------------------- */
    authController(app);
    userController(app);
    categoryController(app);
    postController(app);
    contactController(app);
    configController(app);
    uploadController(app);
    sponsorController(app);

    /* -------------------------------------------------------------------------- */
    /*                                 Run server                                 */
    /* -------------------------------------------------------------------------- */
    http.listen(config.SERVER.PORT, () => {
      logger.info(
        `Express server started on port ${process.env.PORT || 3000}. Environment: ${
          process.env.NODE_ENV || 'dev'
        }`
      );
    });
  })
  .catch((error) => {
    logger.error(error);
  });
