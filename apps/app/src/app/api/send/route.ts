import { Resend } from 'resend'

import {
  EmailTemplateReact,
  EmailTemplateText
} from '~/components/email-template'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST() {
  try {
    const data = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: ['delivered@resend.dev'],
      subject: 'Hello world',
      react: EmailTemplateReact({ firstName: 'John' }),
      text: EmailTemplateText({ firstName: 'John' })
    })

    return Response.json(data)
  } catch (error) {
    return Response.json({ error })
  }
}
