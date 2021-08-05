import { createTransport } from 'nodemailer';

import normalizeValue from '@src/utils/normalize-value';

const mailer = createTransport({
  host: process.env.MAIL_HOST,
  port: Number(process.env.MAIL_PORT ?? 587),
  secure: normalizeValue(process.env.MAIL_SECURE ?? false),
  debug: normalizeValue(process.env.MAIL_DEBUG ?? false),
  from: {
    name: process.env.MAIL_FROM_NAME ?? 'No Reply',
    address: process.env.MAIL_FROM_EMAIL ?? 'no-reply@localhost.dev',
  },
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,
  },
});

export default mailer;
