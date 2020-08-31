import * as mailgunLoader from "mailgun-js";

let mailgun = mailgunLoader({
    apiKey: process.env.MAILGUN_KEY,
    domain: process.env.MAILGUN_DOM
});
const sendMail = (to: string, from: string, subject: string, content: string) => {
    let data: any = {
        to,
        from,
        subject,
        text: content
    };
    return mailgun.messages().send(data);
};

export { sendMail };