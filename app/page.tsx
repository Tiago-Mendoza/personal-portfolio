import Link from "next/link"
import { Github, Linkedin, Mail, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import ProjectCard from "@/components/project-card"
import ProjectCardCarousel from "@/components/project-card-carousel"
import SkillBadge from "@/components/skill-badge"
import ContactForm from "@/components/contact-form"

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold">
            <User className="h-5 w-5" />
            <span>Tiago Mendoza</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link href="#about" className="text-sm font-medium hover:underline underline-offset-4">
              Sobre
            </Link>
            <Link href="#skills" className="text-sm font-medium hover:underline underline-offset-4">
              Habilidades
            </Link>
            <Link href="#projects" className="text-sm font-medium hover:underline underline-offset-4">
              Projetos
            </Link>
            <Link href="#contact" className="text-sm font-medium hover:underline underline-offset-4">
              Contato
            </Link>
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" asChild>
              <Link href="https://github.com/Tiago-Mendoza" target="_blank" rel="noopener noreferrer">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link href="https://www.linkedin.com/in/tiagomendoza/" target="_blank" rel="noopener noreferrer">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Hero Section */}
        <section className="flex flex-col md:flex-row items-center gap-8 py-12">
          <div className="w-full md:w-1/2 space-y-4">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Olá, Eu sou Tiago Mendoza
            </h1>
            <p className="text-xl text-muted-foreground">
              Sou um Desenvolvedor especializado na criação de experiências digitais excepcionais
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild>
                <Link href="#contact">Entre em Contato</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="#projects">Ver Projetos</Link>
              </Button>
              <Button variant="outline" asChild>
                <a href="/cv.pdf" download>
                  Baixar Currículo
                </a>
              </Button>
            </div>
          </div>
          <div className="w-full md:w-1/2 flex justify-center">
            <div className="relative w-64 h-64 rounded-full overflow-hidden border-4 border-primary/20">
              <img src="/placeholder.svg?height=256&width=256" alt="Profile" className="object-cover" />
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-12 scroll-mt-20">
          <h2 className="text-3xl font-bold mb-8 text-center">Sobre Mim</h2>
          <div className="max-w-4xl mx-auto">
            <Card>
              <CardContent className="p-6 md:p-8">
                <p className="text-lg leading-relaxed">
                  Sou um desenvolvedor apaixonado com uma sólida base em tecnologias web. Gosto de resolver problemas complexos, criar experiências de usuário intuitivas e de alto desempenho e estou sempre aprendendo novas tecnologias para aprimorar minhas habilidades.
                </p>
                <p className="text-lg leading-relaxed mt-4">
                  Acredito no poder da tecnologia para gerar um impacto positivo e estou sempre em busca de novas oportunidades para crescer e colaborar.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-12 scroll-mt-20">
          <h2 className="text-3xl font-bold mb-8 text-center">Habilidades & Tecnologias</h2>
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              <SkillBadge name="Java" />
              <SkillBadge name="JavaScript" />
              <SkillBadge name="Git & GitHub" />
              <SkillBadge name="MySQL" />
              <SkillBadge name="Tailwind CSS" />
              <SkillBadge name="HTML" />
              <SkillBadge name="Angular" />
              <SkillBadge name="Next.js" />
              <SkillBadge name="AWS" />
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-12 scroll-mt-20">
          <h2 className="text-3xl font-bold mb-8 text-center">Projetos em Destaque</h2>
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <ProjectCardCarousel
                title="Jardim Encantado"
                description="E-commerce de floricultura com CRUD completo de produtos. Vitrine com buquês, arranjos e presentes; carrinho de compras; autenticação; painel administrativo para cadastro, edição e exclusão. Backend REST com json-server."
                tags={["Angular", "TypeScript", "CSS", "json-server"]}
                images={["/jardim-1.jpg", "/jardim-2.jpg", "/jardim-3.jpg"]}
                demoUrl="https://jardim-angular.vercel.app/buques"
                repoUrl="https://github.com/Tiago-Mendoza/JardimAngular"
                imageClassName="scale-110"
              />
              <ProjectCardCarousel
                title="Controle de Gastos Pessoais"
                description="Dashboard de gestão financeira para receitas, despesas e orçamentos. Cadastro com categoria, tipo (débito/crédito/PIX) e fixo/variável. Gráficos por categoria e evolução patrimonial (Chart.js), filtros por ano/mês, alertas de orçamento (80%/100%+), extratos em modais e próximos vencimentos. Angular 20, Signals, Standalone Components. Backend com json-server e db.json."
                tags={["Angular", "TypeScript", "Chart.js", "Signals", "json-server"]}
                images={["/gastos-pessoais-1.png"]}
                demoUrl="https://gastos-pessoais-dashboard-angular.vercel.app/"
                repoUrl="https://github.com/Tiago-Mendoza/Gastos-Pessoais-DashboardAngular"
              />
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-12 scroll-mt-20">
          <h2 className="text-3xl font-bold mb-8 text-center">Entre em Contato</h2>
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardContent className="p-6 md:p-8 space-y-4">
                  <h3 className="text-xl font-semibold">Informações de Contato</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-primary" />
                      <Link
                        href="mailto:tiagomzdev@gmail.com"
                        className="hover:underline"
                      >
                        tiagomzdev@gmail.com
                      </Link>
                    </div>
                    <div className="flex items-center gap-3">
                      <svg className="h-5 w-5 text-primary" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                      </svg>
                      <Link
                        href="https://wa.me/5567982186512"
                        className="hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        +55 67 9 8218-6512
                      </Link>
                    </div>
                    <div className="flex items-center gap-3">
                      <Linkedin className="h-5 w-5 text-primary" />
                      <Link
                        href="https://www.linkedin.com/in/tiagomendoza/"
                        className="hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        linkedin.com/in/tiagomendoza
                      </Link>
                    </div>
                    <div className="flex items-center gap-3">
                      <Github className="h-5 w-5 text-primary" />
                      <Link
                        href="https://github.com/Tiago-Mendoza"
                        className="hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        github.com/Tiago-Mendoza
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <ContactForm />
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t py-6 md:py-8">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Tiago Mendoza. Todos os direitos reservados.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild>
              <Link href="https://github.com/Tiago-Mendoza" target="_blank" rel="noopener noreferrer">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link href="https://www.linkedin.com/in/tiagomendoza/" target="_blank" rel="noopener noreferrer">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </Button>
          </div>
        </div>
      </footer>
    </div>
  )
}
