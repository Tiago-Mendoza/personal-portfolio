"use client"

import type React from "react"

import { useState } from "react"
import { CheckCircle2, Send } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

const MAX_EMAILS = 1

export default function ContactForm() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [emailsSent, setEmailsSent] = useState(0)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Verificar se já atingiu o limite de envios
    if (emailsSent >= MAX_EMAILS) {
      toast({
        title: "Limite de envios atingido",
        description: `Você já enviou ${MAX_EMAILS} emails. Recarregue a página para enviar mais mensagens.`,
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    const formData = new FormData(e.currentTarget)
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      subject: formData.get("subject") as string,
      message: formData.get("message") as string,
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || "Erro ao enviar mensagem")
      }

      // Incrementar contador de emails enviados
      const newEmailsSent = emailsSent + 1
      setEmailsSent(newEmailsSent)

      // Limpar formulário
      e.currentTarget.reset()

      // Mostrar mensagem de sucesso
      setShowSuccessMessage(true)
    } catch (error) {
      toast({
        title: "Erro ao enviar mensagem",
        description: error instanceof Error ? error.message : "Por favor, tente novamente mais tarde.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const isLimitReached = emailsSent >= MAX_EMAILS

  return (
    <Card>
      <CardContent className="p-6 md:p-8">
        {showSuccessMessage && (
          <div className="mb-6 p-5 bg-green-50 dark:bg-green-900/20 border-2 border-green-300 dark:border-green-700 rounded-lg">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
              <div className="flex-1 space-y-2">
                <h3 className="text-lg font-bold text-green-800 dark:text-green-200">
                  Mensagem enviada com sucesso!
                </h3>
                <p className="text-sm text-green-700 dark:text-green-300">
                  Obrigado por entrar em contato. Responderei em breve.
                </p>
                <p className="text-sm font-medium text-yellow-700 dark:text-yellow-300 pt-3 mt-3 border-t border-yellow-300 dark:border-yellow-700">
                  ⚠️ Limite de {MAX_EMAILS} envios atingido. Recarregue a página para enviar mais mensagens.
                </p>
              </div>
            </div>
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Nome</Label>
            <Input id="name" name="name" placeholder="Seu nome" required disabled={isLimitReached} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" placeholder="seu.email@exemplo.com" required disabled={isLimitReached} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="subject">Assunto</Label>
            <Input id="subject" name="subject" placeholder="Como posso ajudar?" required disabled={isLimitReached} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="message">Mensagem</Label>
            <Textarea id="message" name="message" placeholder="Sua mensagem aqui..." className="min-h-[120px] resize-y" required disabled={isLimitReached} />
          </div>
          <Button type="submit" className="w-full" disabled={isSubmitting || isLimitReached}>
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                Enviando...
              </span>
            ) : isLimitReached ? (
              <span className="flex items-center gap-2">
                Mensagem enviada
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Send className="h-4 w-4" />
                Enviar Mensagem
              </span>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
