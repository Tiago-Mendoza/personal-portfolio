import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, subject, message } = body

    // Validação básica
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Todos os campos são obrigatórios' },
        { status: 400 }
      )
    }

    // Verificar se a API key está configurada
    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        { error: 'Configuração de email não encontrada. Por favor, configure a variável de ambiente RESEND_API_KEY.' },
        { status: 500 }
      )
    }

    // Enviar o email usando Resend
    await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>', // Você pode verificar seu domínio depois
      to: 'tiagomzdev@gmail.com',
      replyTo: email,
      subject: `Portfolio Contact: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
            Nova mensagem do portfolio
          </h2>
          <div style="margin-top: 20px; line-height: 1.6;">
            <p><strong>Nome:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Assunto:</strong> ${subject}</p>
            <div style="margin-top: 20px; padding: 15px; background-color: #f5f5f5; border-radius: 5px;">
              <strong>Mensagem:</strong>
              <p style="margin-top: 10px; white-space: pre-wrap;">${message}</p>
            </div>
          </div>
        </div>
      `,
      text: `
        Nova mensagem do portfolio
        
        Nome: ${name}
        Email: ${email}
        Assunto: ${subject}
        
        Mensagem:
        ${message}
      `,
    })

    return NextResponse.json(
      { message: 'Email enviado com sucesso!' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Erro ao enviar email:', error)
    return NextResponse.json(
      { error: 'Erro ao enviar email. Por favor, tente novamente mais tarde.' },
      { status: 500 }
    )
  }
}

