'use server';

import { Resend } from 'resend';
import ContactFormNotification from '@/components/ContactFormNotification';
import { contactSchema, type ContactValues } from '@/lib/contact-schema';

export type ContactActionState =
  | { status: 'idle' }
  | { status: 'success' }
  | { status: 'error'; message: string };

const SEND_FAILED =
  'Your message did not send.';

export async function sendContactEmail(
  _prev: ContactActionState,
  input: ContactValues,
): Promise<ContactActionState> {
  const parsed = contactSchema.safeParse(input);
  if (!parsed.success) {
    return { status: 'error', message: 'Check your details and try again.' };
  }
  const values = parsed.data;

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return { status: 'error', message: SEND_FAILED };
  }

  const resend = new Resend(apiKey);
  const subject = `New portfolio message from ${values.name}`;

  try {
    const { error } = await resend.emails.send({
      to: 'hello@gileadodo.com',
      from: 'Gilead Odo <info@mail.gileadodo.com>',
      replyTo: values.email,
      subject,
      react: ContactFormNotification({
        name: values.name,
        email: values.email,
        subject,
        message: values.message,
      }),
    });

    if (error) {
      console.error('Resend rejected a contact email', error);
      return { status: 'error', message: SEND_FAILED };
    }
    return { status: 'success' };
  } catch (err) {
    console.error('Contact email failed', err);
    return { status: 'error', message: SEND_FAILED };
  }
}
