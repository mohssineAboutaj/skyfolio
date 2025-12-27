import jsPDF from 'jspdf'

export const useResumePDF = () => {
  const generatePDF = async () => {
    // Get data from stores
    const aboutStore = useAboutInfoStore()
    const projectsStore = useProjectsStore()
    const skillsStore = useSkillsStore()
    const contactsStore = useContactStore()

    const info = aboutStore.getInfo
    const educations = aboutStore.getEducations
    const certifications = aboutStore.getCertifications
    const allProjects = projectsStore.getAll()
    const skills = skillsStore.getAll
    const contacts = contactsStore.getFeatured

    // Create new PDF document
    const doc = new jsPDF()
    const pageWidth = doc.internal.pageSize.getWidth()
    const pageHeight = doc.internal.pageSize.getHeight()
    const margin = 20
    let yPosition = margin

    // Helper function to add a new page if needed
    const checkPageBreak = (requiredSpace: number) => {
      if (yPosition + requiredSpace > pageHeight - margin) {
        doc.addPage()
        yPosition = margin
      }
    }

    // Helper function to convert image to base64 and make it circular
    const getCircularImageBase64 = async (imagePath: string, size: number): Promise<string | null> => {
      try {
        // Handle both relative and absolute paths
        let fullPath = imagePath
        if (imagePath.startsWith('/')) {
          // For public assets, use the full URL
          if (typeof window !== 'undefined') {
            fullPath = window.location.origin + imagePath
          } else {
            return null
          }
        }

        const response = await fetch(fullPath)
        if (!response.ok) return null

        const blob = await response.blob()
        return new Promise((resolve) => {
          const reader = new FileReader()
          reader.onloadend = () => {
            const base64 = reader.result as string

            // Create a canvas to make the image circular
            if (typeof window !== 'undefined' && window.document) {
              const canvas = document.createElement('canvas')
              canvas.width = size
              canvas.height = size
              const ctx = canvas.getContext('2d')

              if (ctx) {
                // Create circular clipping path
                ctx.beginPath()
                ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2)
                ctx.clip()

                // Draw the image
                const img = new Image()
                img.onload = () => {
                  ctx.drawImage(img, 0, 0, size, size)
                  const circularBase64 = canvas.toDataURL('image/png')
                  resolve(circularBase64)
                }
                img.onerror = () => resolve(base64) // Fallback to original
                img.src = base64
              } else {
                resolve(base64) // Fallback to original
              }
            } else {
              resolve(base64) // Fallback to original
            }
          }
          reader.onerror = () => resolve(null)
          reader.readAsDataURL(blob)
        })
      } catch {
        return null
      }
    }

    // Helper function to add section heading
    const addSectionHeading = (text: string) => {
      checkPageBreak(25)
      doc.setFontSize(18)
      doc.setFont('helvetica', 'bold')
      doc.setTextColor('#1976d2')
      doc.text(`# ${text}`, margin, yPosition)
      yPosition += 12
    }

    // Helper function to add text with word wrap
    const addText = (text: string, fontSize: number, isBold: boolean = false, color: string = '#000000', xOffset: number = 0) => {
      checkPageBreak(fontSize + 5)
      doc.setFontSize(fontSize)
      doc.setTextColor(color)
      if (isBold) {
        doc.setFont('helvetica', 'bold')
      } else {
        doc.setFont('helvetica', 'normal')
      }

      const lines = doc.splitTextToSize(text, pageWidth - 2 * margin - xOffset)
      doc.text(lines, margin + xOffset, yPosition)
      yPosition += lines.length * fontSize * 0.4 + 5
    }

    // Header Section with Profile Picture
    const avatarSize = 50
    const headerStartY = margin + 10

    // Try to load and add profile picture (with timeout)
    try {
      const avatarBase64 = await Promise.race([
        getCircularImageBase64(info.avatar, avatarSize),
        new Promise<string | null>((resolve) => setTimeout(() => resolve(null), 3000))
      ])

      if (avatarBase64) {
        const imgWidth = avatarSize
        const imgHeight = avatarSize
        const centerX = pageWidth / 2
        const imgX = centerX - imgWidth / 2

        try {
          // Add the circular image (already processed to be circular via canvas)
          doc.addImage(avatarBase64, 'PNG', imgX, headerStartY, imgWidth, imgHeight)
          yPosition = headerStartY + imgHeight + 15
        } catch {
          yPosition = headerStartY + 20
        }
      } else {
        yPosition = headerStartY + 20
      }
    } catch {
      yPosition = headerStartY + 20
    }

    // Name (centered)
    doc.setFontSize(28)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor('#000000')
    const nameWidth = doc.getTextWidth(info.fullName)
    doc.text(info.fullName, (pageWidth - nameWidth) / 2, yPosition)
    yPosition += 12

    // Title (centered)
    doc.setFontSize(14)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor('#666666')
    const titleText = info.jobs[0] || 'Fullstack Web Developer'
    const titleWidth = doc.getTextWidth(titleText)
    doc.text(titleText, (pageWidth - titleWidth) / 2, yPosition)
    yPosition += 10

    // Website URL (centered, if available)
    // Try to find a portfolio/website link, or use the first non-mailto link
    const websiteUrl = contacts.find(c =>
      c.label.toLowerCase().includes('website') ||
      c.label.toLowerCase().includes('portfolio') ||
      c.link.startsWith('http') && !c.link.includes('mailto')
    )?.link || contacts.find(c => c.link.startsWith('http'))?.link

    if (websiteUrl && !websiteUrl.startsWith('mailto:')) {
      doc.setFontSize(10)
      doc.setTextColor('#1976d2')
      const urlWidth = doc.getTextWidth(websiteUrl)
      doc.text(websiteUrl, (pageWidth - urlWidth) / 2, yPosition)
      yPosition += 8
    }

    // Contact Information (horizontal layout)
    checkPageBreak(15)
    doc.setFontSize(9)
    doc.setTextColor('#000000')
    const contactItems = []
    if (info.address) contactItems.push(`📍 ${info.address}`)
    if (info.phone) contactItems.push(`📞 ${info.phone}`)
    if (info.email) contactItems.push(`✉️ ${info.email}`)

    // Calculate spacing for horizontal layout
    const contactSpacing = contactItems.length > 0 ? (pageWidth - 2 * margin) / contactItems.length : 0
    contactItems.forEach((item, index) => {
      const itemWidth = doc.getTextWidth(item)
      const xPos = margin + (contactSpacing * index) + (contactSpacing - itemWidth) / 2
      doc.text(item, xPos, yPosition)
    })
    yPosition += 15

    // Summary Section
    addSectionHeading('Summary')
    doc.setFontSize(10)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor('#000000')
    // Use shortDescription if available, otherwise use description
    const summaryText = info.shortDescription || info.description
    const cleanDescription = summaryText.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim()
    addText(cleanDescription, 10)
    yPosition += 5

    // Contacts/Social Section
    if (contacts.length > 0) {
      addSectionHeading('Contacts/Social')
      doc.setFontSize(10)
      doc.setFont('helvetica', 'normal')
      doc.setTextColor('#000000')

      contacts.forEach((contact) => {
        checkPageBreak(12)
        // Format: "Follow Me On LinkedIn" style
        const headline = contact.headline || contact.label
        const linkText = contact.link.startsWith('mailto:')
          ? contact.link.replace('mailto:', '')
          : contact.link
        const contactText = `${headline} - ${linkText}`
        addText(contactText, 10)
      })
      yPosition += 5
    }

    // Educations Section
    if (educations.length > 0) {
      addSectionHeading('Educations')
      educations.forEach((edu) => {
        checkPageBreak(20)
        doc.setFontSize(11)
        doc.setFont('helvetica', 'bold')
        doc.text(edu.title, margin, yPosition)
        yPosition += 7

        doc.setFontSize(10)
        doc.setFont('helvetica', 'normal')
        doc.text(edu.enterprise, margin, yPosition)
        yPosition += 6

        doc.setFontSize(10)
        doc.setTextColor('#666666')
        doc.text(String(edu.year), margin, yPosition)
        doc.setTextColor('#000000')
        yPosition += 10
      })
      yPosition += 5
    }

    // Certifications Section (if you want to include them)
    if (certifications.length > 0) {
      addSectionHeading('Certifications')
      certifications.slice(0, 5).forEach((cert) => {
        checkPageBreak(20)
        doc.setFontSize(11)
        doc.setFont('helvetica', 'bold')
        doc.text(cert.title, margin, yPosition)
        yPosition += 7

        doc.setFontSize(10)
        doc.setFont('helvetica', 'normal')
        doc.text(`${cert.enterprise} - ${cert.year}`, margin, yPosition)
        yPosition += 10
      })
      yPosition += 5
    }

    // Skills Section (plain text, no colors)
    if (skills.length > 0) {
      addSectionHeading('Skills')

      // Sort skills by score and get top skills
      const topSkills = skills
        .sort((a, b) => b.score - a.score)
        .slice(0, 30) // Show top 30 skills

      doc.setFontSize(10)
      doc.setFont('helvetica', 'normal')
      doc.setTextColor('#000000')

      // Display skills as plain text, comma-separated
      const skillsText = topSkills.map(s => s.name).join(', ')
      const skillsLines = doc.splitTextToSize(skillsText, pageWidth - 2 * margin)
      doc.text(skillsLines, margin, yPosition)
      yPosition += skillsLines.length * 5 + 10
    }

    // Projects Section
    if (allProjects.length > 0) {
      addSectionHeading('Projects')

      allProjects.slice(0, 15).forEach((project) => {
        checkPageBreak(30)

        // Project title
        doc.setFontSize(12)
        doc.setFont('helvetica', 'bold')
        doc.setTextColor('#000000')
        doc.text(project.title, margin, yPosition)
        yPosition += 8

        // Project description
        doc.setFontSize(9)
        doc.setFont('helvetica', 'normal')
        const cleanDesc = project.description.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim()
        const descLines = doc.splitTextToSize(cleanDesc, pageWidth - 2 * margin)
        doc.text(descLines, margin, yPosition)
        yPosition += descLines.length * 4 + 3

        // Project links
        if (project.platforms && project.platforms.length > 0) {
          project.platforms.forEach((platform) => {
            checkPageBreak(8)
            doc.setFontSize(8)
            doc.setFont('helvetica', 'normal')
            doc.setTextColor('#1976d2')
            // Format links nicely
            const linkText = platform.url
            const linkLines = doc.splitTextToSize(linkText, pageWidth - 2 * margin - 10)
            doc.text(linkLines, margin + 5, yPosition)
            yPosition += linkLines.length * 3.5 + 2
          })
          doc.setTextColor('#000000')
        }

        // Technologies
        if (project.tech && project.tech.length > 0) {
          doc.setFontSize(8)
          doc.setFont('helvetica', 'normal')
          doc.setTextColor('#666666')
          doc.text(`Tech: ${project.tech.join(', ')}`, margin + 5, yPosition)
          yPosition += 5
          doc.setTextColor('#000000')
        }

        yPosition += 8
      })
    }

    // Footer with page numbers
    const totalPages = doc.getNumberOfPages()
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i)
      doc.setFontSize(8)
      doc.setTextColor('#999999')
      doc.text(
        `Page ${i} of ${totalPages}`,
        pageWidth - margin - 20,
        pageHeight - 10
      )
    }

    const today = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })

    // Generate and download PDF
    const fileName = `Resume_${info.fullName.replace(/\s+/g, '_')}__${today.replace(/ /g, '_')}.pdf`
    doc.save(fileName)
  }

  return {
    generatePDF,
  }
}
