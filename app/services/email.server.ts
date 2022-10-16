/* TODO: attachment support */

import { createTransport } from "nodemailer";
import {
  FROM_EMAIL,
  EMAIL_PASSWORD,
  EMAIL_SENDING_ENABLED,
} from "~/config.server";

export type Email = {
  to: string | string[];
  subject: string;
  text: string;

  cc?: string | string[];
  bcc?: string | string[];
  html?: string;
};

export type CompleteEmail = Email & {
  from: string;
};

const transport = createTransport({
  // note: nodemailer types are whack for the moment.
  // see https://github.com/DefinitelyTyped/DefinitelyTyped/discussions/61639
  //@ts-ignore
  host: "smtp.gmail.com",
  pool: true,
  port: 465,
  secure: true,
  auth: {
    user: FROM_EMAIL,
    pass: EMAIL_PASSWORD,
  },
});

export const sendEmailRaw = async (
  eml: Pick<Email, "to" | "subject" | "text">
): Promise<boolean> => {
  if (!EMAIL_SENDING_ENABLED) {
    console.log(`Would send email to ${eml.to} with subject ${eml.subject}`);
    return true;
  }
  const completedEmail: CompleteEmail = {
    ...eml,
    from: FROM_EMAIL,
  };
  try {
    await transport.sendMail(completedEmail);
    console.log(
      `email sent to ${completedEmail.to} with subject ${completedEmail.subject}`
    );
    return true;
  } catch (e) {
    console.error(`email failed to send due to error ${e}`);
    console.log(`email contents failed to send: ${JSON.stringify(eml)}`);
    return false;
  }
};
