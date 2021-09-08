import { Moment } from 'moment-timezone';

import mailer from '@shared/mailer';

import { UserModel } from '@database/models';

class SendMailLink {
  public async run(rowUser: UserModel, hash: string, momentExpiredAt: Moment) {
    const linkResetPassword = `${process.env.ADMIN_URL}/reset-password/${hash}`;

    await mailer.sendMail({
      to: `${rowUser.name} <${rowUser.email}>`,
      subject: 'Recuperação de senha.',
      from: mailer.options.from,
      html: `
        <p style='margin-bottom: 0;'>Clique no link abaixo para recuperar a sua senha.</p>
        <p style='font-weight: bold; margin-bottom: 5px;'><a href='${linkResetPassword}'>${linkResetPassword}</a></p>
        <p style='margin-bottom: 0;'>Seu link expira em ${momentExpiredAt.format(
          'DD/MM/YYYY HH:mm:ss',
        )}</p>
      `,
    });
  }
}

const forgotPasswordSendMailLinkService = new SendMailLink();
export default forgotPasswordSendMailLinkService;
