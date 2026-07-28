"""Gera o currículo PDF de Tiago Mendoza (1 página A4)."""

from pathlib import Path

from reportlab.lib.colors import HexColor
from reportlab.lib.enums import TA_CENTER, TA_JUSTIFY, TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.platypus import (
    HRFlowable,
    KeepTogether,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
)

OUT = Path(__file__).resolve().parents[1] / "public" / "cv.pdf"

TEXT = HexColor("#111111")
MUTED = HexColor("#222222")


def build_styles():
    base = getSampleStyleSheet()
    return {
        "name": ParagraphStyle(
            "Name",
            parent=base["Normal"],
            fontName="Helvetica-Bold",
            fontSize=15,
            leading=18,
            alignment=TA_CENTER,
            textColor=TEXT,
            spaceAfter=1 * mm,
        ),
        "location": ParagraphStyle(
            "Location",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=9.5,
            leading=11.5,
            alignment=TA_CENTER,
            textColor=MUTED,
            spaceAfter=0.6 * mm,
        ),
        "contact": ParagraphStyle(
            "Contact",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=8.5,
            leading=11,
            alignment=TA_CENTER,
            textColor=MUTED,
            spaceAfter=0.3 * mm,
        ),
        "section": ParagraphStyle(
            "Section",
            parent=base["Normal"],
            fontName="Helvetica-Bold",
            fontSize=10.5,
            leading=13,
            textColor=TEXT,
            spaceBefore=2.2 * mm,
            spaceAfter=0.8 * mm,
        ),
        "body": ParagraphStyle(
            "Body",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=9,
            leading=11.5,
            alignment=TA_JUSTIFY,
            textColor=MUTED,
            spaceAfter=0.6 * mm,
        ),
        "job": ParagraphStyle(
            "Job",
            parent=base["Normal"],
            fontName="Helvetica-Bold",
            fontSize=9.5,
            leading=12,
            textColor=TEXT,
            spaceBefore=1.4 * mm,
            spaceAfter=0.6 * mm,
        ),
        "bullet": ParagraphStyle(
            "Bullet",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=9,
            leading=11.4,
            alignment=TA_LEFT,
            textColor=MUTED,
            leftIndent=8,
            firstLineIndent=-8,
            spaceAfter=0.35 * mm,
        ),
        "tech": ParagraphStyle(
            "Tech",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=9,
            leading=11.4,
            textColor=MUTED,
            spaceAfter=0.45 * mm,
        ),
        "cert": ParagraphStyle(
            "Cert",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=9,
            leading=11.4,
            textColor=MUTED,
        ),
    }


def section_title(text: str, styles):
    return [
        Paragraph(text, styles["section"]),
        HRFlowable(width="100%", thickness=0.7, color=TEXT, spaceAfter=1.2 * mm),
    ]


def bullet(text: str, styles):
    return Paragraph(f"• {text}", styles["bullet"])


def tech_line(label: str, content: str, styles):
    return Paragraph(f"<b>{label}:</b> {content}", styles["tech"])


def main():
    styles = build_styles()
    doc = SimpleDocTemplate(
        str(OUT),
        pagesize=A4,
        leftMargin=16 * mm,
        rightMargin=16 * mm,
        topMargin=10 * mm,
        bottomMargin=10 * mm,
    )

    story = []

    story.append(Paragraph("Tiago Mendoza Ribeiro de Oliveira", styles["name"]))
    story.append(Paragraph("São Paulo, SP", styles["location"]))
    story.append(
        Paragraph(
            "Telefone: (67) 9 8218-6512 • E-mail: tiagomzdev@gmail.com • Portfólio: tiagomendoza.com",
            styles["contact"],
        )
    )
    story.append(
        Paragraph(
            "LinkedIn: linkedin.com/in/tiagomendoza • GitHub: github.com/Tiago-Mendoza",
            styles["contact"],
        )
    )
    story.append(Spacer(1, 1.2 * mm))

    story.extend(section_title("RESUMO PROFISSIONAL", styles))
    story.append(
        Paragraph(
            "Desenvolvedor em início de carreira com experiência prática em Front-end (Angular, Next.js/React) "
            "e Back-end moderno com Next.js, TypeScript, Prisma ORM, PostgreSQL, autenticação, APIs e "
            "integrações de pagamento, incluindo modelagem de dados e sustentação de sistemas em produção. "
            "Recentemente ampliei minha atuação para desenvolvimento full-stack, com alta capacidade de "
            "aprendizado e entrega em ritmo acelerado usando ferramentas atuais de produtividade com IA. "
            "Conhecimento em deploy em Vercel e metodologias ágeis (Scrum). Busco oportunidade como "
            "Desenvolvedor Júnior para contribuir com código confiável, evolução contínua e impacto nas "
            "entregas do time.",
            styles["body"],
        )
    )

    story.extend(section_title("FORMAÇÃO", styles))
    story.append(
        Paragraph(
            "<b>Graduação em Tecnologia — Análise e Desenvolvimento de Sistemas</b><br/>"
            "Centro Universitário Senac Santo Amaro — Cursando (Conclusão prevista em 2027).",
            styles["body"],
        )
    )

    story.extend(section_title("CONHECIMENTOS TÉCNICOS", styles))
    story.append(
        tech_line(
            "Front-end",
            "HTML5, CSS3, JavaScript, TypeScript (noções), React (noções)",
            styles,
        )
    )
    story.append(tech_line("Framework", "Angular, Next.js", styles))
    story.append(
        tech_line(
            "Back-end",
            "Java, Spring Boot, Node.js, Python (noções), APIs REST/GraphQL (Postman, Insomnia) (noções), "
            "SQL (MySQL, SQL Server, Oracle), NoSQL (MongoDB)",
            styles,
        )
    )
    story.append(
        tech_line("Banco de Dados", "Modelagem relacional, normalização, DDL/DML", styles)
    )
    story.append(
        tech_line(
            "DevOps, Testes e Ferramentas",
            "Git, GitHub, Figma, Postman, Insomnia, Power BI, Word, Excel, Cloud AWS (EC2, IAM, VPC)",
            styles,
        )
    )
    story.append(
        tech_line(
            "Metodologias",
            "Desenvolvimento Ágil (Scrum), Modelagem de Dados, ETL",
            styles,
        )
    )

    story.extend(section_title("IDIOMAS", styles))
    story.append(Paragraph("English (intermediário) • Espanhol (intermediário)", styles["body"]))

    story.extend(section_title("EXPERIÊNCIA PROFISSIONAL", styles))

    wae = [
        Paragraph(
            "mar 2026 – Atual | Estagiário de Desenvolvimento — WAE | Sistema de Gestão Educacional",
            styles["job"],
        ),
        bullet("São Paulo, Brasil · Remoto.", styles),
        bullet(
            "Atuação no desenvolvimento de sistema de gestão educacional, com foco em "
            "funcionalidades e suporte técnico às demandas do produto.",
            styles,
        ),
        bullet(
            "Trabalho com GeneXus, SQL, JSON, Postman, Docker e Apache Tomcat no dia a dia "
            "do desenvolvimento.",
            styles,
        ),
    ]
    story.append(KeepTogether(wae))

    control = [
        Paragraph("2024 – Atual | Desenvolvedor — Control Poker", styles["job"]),
        bullet(
            "Desenvolvimento e manutenção de plataforma SaaS para gestão de clubes de poker "
            "(cash game, torneios, jogadores e financeiro).",
            styles,
        ),
        bullet(
            "Programação de funcionalidades e correção de bugs em stack web: Next.js, React, "
            "TypeScript, Prisma e PostgreSQL.",
            styles,
        ),
        bullet(
            "Testes manuais de telas e fluxos, validando comportamentos e garantindo a qualidade "
            "das entregas.",
            styles,
        ),
        bullet(
            "Identificação e resolução de problemas técnicos, com sugestão de melhorias de "
            "usabilidade no produto.",
            styles,
        ),
        bullet(
            "Colaboração em ambiente de produto real, com deploy e uso operacional em clubes.",
            styles,
        ),
        bullet(
            "Atuação com foco em organização, comunicação clara e solução prática das demandas.",
            styles,
        ),
    ]
    story.append(KeepTogether(control))

    story.extend(section_title("CERTIFICADOS", styles))
    certs_left = [
        Paragraph("• Database Foundations – Oracle Academy", styles["cert"]),
        Paragraph("• Curso de Design para Banco de Dados – Oracle Academy", styles["cert"]),
        Paragraph("• Java Programming - Oracle Academy", styles["cert"]),
    ]
    certs_right = [
        Paragraph("• Java Foundations - Oracle Academy", styles["cert"]),
        Paragraph("• Começando em Cloud: usando a AWS - Alura", styles["cert"]),
        Paragraph("• (Mais certificados no meu linkedin)", styles["cert"]),
    ]
    cert_table = Table(
        [[certs_left, certs_right]],
        colWidths=[90 * mm, 78 * mm],
    )
    cert_table.setStyle(
        TableStyle(
            [
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 0),
                ("RIGHTPADDING", (0, 0), (-1, -1), 2),
                ("TOPPADDING", (0, 0), (-1, -1), 0),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 0),
            ]
        )
    )
    story.append(cert_table)

    doc.build(story)
    print(f"Gerado: {OUT}")


if __name__ == "__main__":
    main()
