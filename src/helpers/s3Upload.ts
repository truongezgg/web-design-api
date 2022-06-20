import config from '$config';
import aws from 'aws-sdk';
import multer from 'multer';
import multerS3 from 'multer-s3';
import md5 from 'md5';

const s3 = new aws.S3({
  secretAccessKey: config.S3.S3_SECRET_KEY,
  accessKeyId: config.S3.S3_ACCESS_KEY,
  region: config.S3.S3_REGION,
});
// https://www.npmjs.com/package/multer-s3
export default {
  upload: multer({
    storage: multerS3({
      s3: s3,
      bucket: config.S3.S3_BUCKET,
      acl: 'public-read',
      contentType: multerS3.AUTO_CONTENT_TYPE,
      metadata: (req, file, callback) => {
        callback(null, { fieldName: file.fieldname });
      },
      key: (req, file, callback) => {
        let arr_ext = (file.originalname || '').split('.');
        let md5FileName =
          arr_ext.length > 0
            ? `${md5(file.originalname)}.${arr_ext[arr_ext.length - 1]}`
            : md5(file.originalname);
        callback(null, `${Date.now().toString()}-${md5FileName}`);
      },
    }),
  }),
};
