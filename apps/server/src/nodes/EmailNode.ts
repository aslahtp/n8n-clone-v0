import nodemailer from 'nodemailer';
import { CredentialSchema, ParameterSchema } from "./types";
import { Inode } from "../db/schema";

export class EmailNode {
    getparameterSchema(): Record<string, ParameterSchema> {
        return {
            to: {
                type: 'string',
                required: true,
                label: 'To',
                placeholder: 'Enter E-mail'
            },
            subject: {
                type: 'string',
                required: true,
                label: 'Subject',
                placeholder: 'Enter Subject'
            },
            body: {
                type: 'string',
                required: true,
                label: 'Body',
                placeholder: 'Enter body'
            }
        };
    }

    getCredentialSchema(): Record<string, CredentialSchema> {
        return {
            user: {
                type: 'username',
                required: true,
                label: 'User',
                placeholder: 'Enter gmail user'
            },
            pass: {
                type: 'password',
                required: true,
                label: 'App password',
                placeholder: 'Enter gmail app password'
            }
        };
    }

    async execute(
        parameters: Record<string, any>,
        credentials: Record<string, any>,
        tools: any[] = [],
        model: any
    ): Promise<{ success: boolean }> {
        const { to, subject, body } = parameters;
        const { user, pass } = credentials;

        try {
            const transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: user,
                    pass: pass
                }
            });

            const mailOptions = {
                from: user,
                to: to,
                subject: subject,
                text: body,
            };

            await transporter.sendMail(mailOptions);
            return {
                success: true
            };
        } catch (e) {
            console.error("error sending email using node mailer", e);
            return {
                success: false
            };
        }
    }
}

