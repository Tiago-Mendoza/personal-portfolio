"use client"

import { useState } from "react"
import { FileCheck } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export interface Certificate {
  title: string
  issuer: string
  year: string
  pdfUrl: string
}

const certificates: Certificate[] = [
  {
    title: "Java Foundations",
    issuer: "Oracle",
    year: "2025",
    pdfUrl: "/cert-java-foundations.pdf",
  },
  {
    title: "Database Foundations",
    issuer: "Oracle",
    year: "2025",
    pdfUrl: "/cert-database-foundations.pdf",
  },
  {
    title: "Database Design",
    issuer: "Oracle",
    year: "2025",
    pdfUrl: "/cert-database-design.pdf",
  },
  {
    title: "Começando em Cloud usando a AWS e explorando os recursos da nuvem como serviço",
    issuer: "Alura",
    year: "2025",
    pdfUrl: "/cert-aws-cloud.pdf",
  },
  {
    title: "Modelagem de banco de dados relacional: entendendo SQL",
    issuer: "Alura",
    year: "2025",
    pdfUrl: "/cert-sql-modelagem.pdf",
  },
]

export default function CertificatesSection() {
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState<Certificate | null>(null)

  const handleOpen = (cert: Certificate) => {
    setSelected(cert)
    setOpen(true)
  }

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold mb-8 text-center">Certificados</h2>
      <Card>
        <CardContent className="p-6 space-y-4">
          {certificates.map((cert) => (
            <button
              key={cert.pdfUrl}
              type="button"
              onClick={() => handleOpen(cert)}
              className="flex items-center gap-3 p-3 bg-secondary rounded-lg w-full text-left hover:bg-secondary/80 transition-colors cursor-pointer border border-transparent hover:border-border group"
            >
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                <FileCheck className="w-4 h-4 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium">{cert.title}</p>
                <p className="text-muted-foreground text-sm">{cert.issuer}</p>
                <Badge variant="secondary" className="mt-1">
                  {cert.year}
                </Badge>
              </div>
              <span className="text-sm text-muted-foreground/60 group-hover:text-muted-foreground transition-colors whitespace-nowrap">
                Ver certificado
              </span>
            </button>
          ))}
        </CardContent>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-4xl w-[95vw] h-[85vh] p-0 gap-0 overflow-hidden flex flex-col">
          <DialogHeader className="px-6 pt-6 pb-2 pr-12 border-b shrink-0">
            <DialogTitle>
              {selected?.title}
            </DialogTitle>
            {selected && (
              <p className="text-sm text-muted-foreground">
                {selected.issuer} · {selected.year}
              </p>
            )}
          </DialogHeader>
          <div className="flex-1 min-h-0 p-4">
            {selected && (
              <iframe
                src={`${selected.pdfUrl}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
                title={selected.title}
                className="w-full h-full rounded border bg-muted"
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
