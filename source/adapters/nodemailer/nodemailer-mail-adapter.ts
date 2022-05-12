import { MailAdapter, SendMailValues } from './../mail_adapter';
import nodemailer from 'nodemailer';


const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "a23fc2fe586af2",
      pass: "5b3d1f62ee28cb"
    }
});

export class NodeMailerMailAdapter implements MailAdapter {
    async SendMail({subject, body}: SendMailValues) {
        await transport.sendMail({
            from: 'JAM <JAM@feedget.com>',
            to: 'Juan A. <jamdeveloper0@gmail.com>',
            subject,
            html: body,
        })
    }
}