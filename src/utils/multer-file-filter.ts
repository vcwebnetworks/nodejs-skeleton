import { Request } from 'express';
import multer from 'multer';

import { ForbiddenError } from '@src/errors';

export const multerFileFilter =
  (mimeTypes: string[]) =>
  (
    _: Request,
    file: Express.Multer.File,
    callback: multer.FileFilterCallback,
  ) => {
    try {
      if (!mimeTypes.includes(file.mimetype)) {
        const extensions = mimeTypes.map(row => row.split('/')[1]);

        throw new ForbiddenError(
          `Only ${extensions.join(',')} extensions are allowed.`,
        );
      }

      callback(null, true);
    } catch (e) {
      callback(e, false);
    }
  };
