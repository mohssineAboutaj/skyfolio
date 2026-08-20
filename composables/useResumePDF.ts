import jsPDF from "jspdf"
import type { Contact, Project } from "~/types/general"

/** Strip HTML / entities so ATS parsers get plain text. */
function toPlainText(html: string): string {
  return html
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/<\/p>/gi, " ")
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/\s+/g, " ")
    .trim()
}

function contactUrl(contact: Contact): string {
  return contact.link.startsWith("mailto:")
    ? contact.link.replace(/^mailto:/i, "")
    : contact.link
}

/** Prefer featured visible projects; fall back to visible. */
function pickProjects(all: Project[], limit = 10): Project[] {
  const visible = all.filter((p) => p.visible !== false)
  const featured = visible.filter((p) => p.featured)
  const pool = featured.length > 0 ? featured : visible
  return pool.slice(0, limit)
}

export const useResumePDF = () => {
  const generatePDF = async () => {
    const aboutStore = useAboutInfoStore()
    const projectsStore = useProjectsStore()
    const skillsStore = useSkillsStore()
    const contactsStore = useContactStore()

    const info = aboutStore.getInfo
    const educations = aboutStore.getEducations
    const certifications = aboutStore.getCertifications
    const projects = pickProjects(projectsStore.getAll())
    const skills = skillsStore.getAll
    const contacts = contactsStore.getFeatured
    const allContacts = contactsStore.getAll
    const siteUrl = "https://mohssineaboutaj.com"

    const linkedIn =
      contacts.find((c) => /linkedin/i.test(c.label)) ||
      allContacts.find((c) => /linkedin/i.test(c.label))
    const github =
      contacts.find((c) => /github/i.test(c.label)) ||
      allContacts.find((c) => /github/i.test(c.label))

    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    })

    // Helps ATS / document managers identify the file
    doc.setProperties({
      title: `${info.fullName} - Resume`,
      subject: "Resume / Curriculum Vitae",
      author: info.fullName,
      keywords: [
        info.fullName,
        ...(info.jobs || []),
        "resume",
        "curriculum vitae",
        "full-stack developer",
      ]
        .filter(Boolean)
        .join(", "),
      creator: "Skyfolio ATS Resume Export",
    })

    const pageWidth = doc.internal.pageSize.getWidth()
    const pageHeight = doc.internal.pageSize.getHeight()
    const margin = 18
    const contentWidth = pageWidth - 2 * margin
    const black = "#111111"
    const muted = "#333333"
    let y = margin

    const ensureSpace = (needed: number) => {
      if (y + needed > pageHeight - margin) {
        doc.addPage()
        y = margin
      }
    }

    const setBody = (size = 10, style: "normal" | "bold" = "normal") => {
      doc.setFont("helvetica", style)
      doc.setFontSize(size)
      doc.setTextColor(black)
    }

    /** Left-aligned wrapped text; returns line count used. */
    const writeLines = (
      text: string,
      opts: {
        size?: number
        bold?: boolean
        color?: string
        indent?: number
        lineGap?: number
        after?: number
      } = {},
    ) => {
      const size = opts.size ?? 10
      const indent = opts.indent ?? 0
      const lineGap = opts.lineGap ?? size * 0.42
      setBody(size, opts.bold ? "bold" : "normal")
      if (opts.color) doc.setTextColor(opts.color)

      const lines: string[] = doc.splitTextToSize(
        text,
        contentWidth - indent,
      )
      ensureSpace(lines.length * lineGap + (opts.after ?? 2))
      doc.text(lines, margin + indent, y)
      y += lines.length * lineGap + (opts.after ?? 2)
    }

    /** Standard ATS section label: ALL CAPS, underline via rule. */
    const section = (title: string) => {
      ensureSpace(14)
      y += 3
      setBody(11, "bold")
      doc.text(title.toUpperCase(), margin, y)
      y += 2
      doc.setDrawColor(180)
      doc.setLineWidth(0.3)
      doc.line(margin, y, pageWidth - margin, y)
      y += 6
    }

    // ─── HEADER (single column, no photo, no emoji) ───
    setBody(18, "bold")
    doc.text(info.fullName, margin, y)
    y += 7

    const primaryTitle =
      info.jobs?.find((j) => /full[- ]?stack/i.test(j)) ||
      info.jobs?.[0] ||
      "Full-Stack Web Developer"
    writeLines(primaryTitle, { size: 11, color: muted, after: 3 })

    // Contact block: one field per line — safest ATS reading order
    const contactLines: string[] = []
    if (info.email) contactLines.push(`Email: ${info.email}`)
    if (info.phone) contactLines.push(`Phone: ${info.phone}`)
    if (info.address) contactLines.push(`Location: ${info.address}`)
    contactLines.push(`Portfolio: ${siteUrl}`)
    if (linkedIn) contactLines.push(`LinkedIn: ${contactUrl(linkedIn)}`)
    if (github) contactLines.push(`GitHub: ${contactUrl(github)}`)

    contactLines.forEach((line) => {
      writeLines(line, { size: 9, after: 1.5 })
    })
    y += 2

    // ─── PROFESSIONAL SUMMARY ───
    section("Professional Summary")
    const summarySource = info.description || info.shortDescription || ""
    writeLines(toPlainText(summarySource), { size: 10, after: 2 })

    // Optional: secondary titles as plain keywords (helps matching)
    if (info.jobs?.length > 1) {
      writeLines(`Focus areas: ${info.jobs.join(", ")}`, {
        size: 9,
        color: muted,
        after: 2,
      })
    }

    // ─── SKILLS ───
    if (skills.length > 0) {
      section("Skills")
      const skillNames = [...skills]
        .sort((a, b) => b.score - a.score)
        .map((s) => s.name)
        .filter(Boolean)
      // Comma-separated keyword line — ATS-friendly
      writeLines(skillNames.join(", "), { size: 10, after: 2 })
    }

    // ─── PROJECTS (stand-in for experience when no work history store) ───
    if (projects.length > 0) {
      section("Projects")
      projects.forEach((project) => {
        ensureSpace(22)
        writeLines(project.title, { size: 11, bold: true, after: 2 })

        const desc = toPlainText(project.description)
        if (desc) writeLines(desc, { size: 9, after: 2 })

        if (project.tech?.length) {
          writeLines(`Technologies: ${project.tech.join(", ")}`, {
            size: 9,
            after: 1.5,
          })
        }

        const urls = (project.platforms || [])
          .map((p) => p.url)
          .filter((u) => /^https?:\/\//i.test(u))
        if (urls.length) {
          writeLines(`Links: ${urls.join(" | ")}`, { size: 8, after: 1.5 })
        }

        y += 3
      })
    }

    // ─── EDUCATION ───
    if (educations.length > 0) {
      section("Education")
      educations.forEach((edu) => {
        ensureSpace(16)
        writeLines(edu.title, { size: 10, bold: true, after: 1.5 })
        writeLines(`${edu.enterprise} | ${edu.year}`, {
          size: 9,
          color: muted,
          after: 3,
        })
      })
    }

    // ─── CERTIFICATIONS ───
    if (certifications.length > 0) {
      section("Certifications")
      certifications.forEach((cert) => {
        ensureSpace(16)
        writeLines(cert.title, { size: 10, bold: true, after: 1.5 })
        const orgLine = `${cert.enterprise} | ${cert.year}`
        writeLines(orgLine, { size: 9, color: muted, after: 1 })
        if (cert.url && /^https?:\/\//i.test(cert.url)) {
          writeLines(`Credential: ${cert.url}`, { size: 8, after: 3 })
        } else {
          y += 2
        }
      })
    }

    // ─── ADDITIONAL LINKS (remaining featured contacts) ───
    const headerUrls = new Set(
      [linkedIn, github]
        .filter(Boolean)
        .map((c) => contactUrl(c as Contact).toLowerCase()),
    )
    const extraContacts = contacts.filter((c) => {
      const url = contactUrl(c).toLowerCase()
      if (headerUrls.has(url)) return false
      if (info.email && url === info.email.toLowerCase()) return false
      return true
    })

    if (extraContacts.length > 0) {
      section("Additional Links")
      extraContacts.forEach((c) => {
        writeLines(`${c.label}: ${contactUrl(c)}`, { size: 9, after: 1.5 })
      })
    }

    // Filename only — no decorative page footers (ATS often ignore/misread them)
    const today = new Date().toISOString().slice(0, 10)
    const fileName = `Resume_${info.fullName.replace(/\s+/g, "_")}_${today}.pdf`
    doc.save(fileName)
  }

  return {
    generatePDF,
  }
}
