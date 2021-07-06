import { createTransport } from 'nodemailer';

import normalizeValue from '@src/utils/normalize-value';

const mailer = createTransport({
  host: process.env.MAIL_HOST,
  port: Number(process.env.MAIL_PORT ?? 587),
  secure: normalizeValue(process.env.MAIL_SECURE ?? false),
  debug: normalizeValue(process.env.MAIL_DEBUG ?? false),
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,
  },
});

export default mailer;
