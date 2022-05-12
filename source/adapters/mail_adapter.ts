export interface SendMailValues {
    subject: string;
    body: string;
}

export interface MailAdapter {
    SendMail: (data: SendMailValues)=>Promise<void>;
}