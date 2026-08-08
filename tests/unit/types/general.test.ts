import { describe, it, expect } from 'vitest'
import type {
  Link,
  Social,
  AboutTab,
  AboutInfo,
  AboutBasicInfo,
  AboutEducation,
  AboutCertification,
  Statistic,
  Service,
  Project,
  Skill,
  Contact
} from '~/types/general'

describe('Type Definitions Validation', () => {
  describe('Link Interface', () => {
    it('should have correct Link interface structure', () => {
      const link: Link = {
        icon: "mdi-home",
        title: "Home",
        value: "home",
        targetId: "#home",
        isCurrent: false,
      }

      expect(link).toMatchObject({
        icon: expect.any(String),
        title: expect.any(String),
        value: expect.any(String),
        targetId: expect.any(String),
        isCurrent: expect.any(Boolean),
      })
    })

    it('should validate Link properties', () => {
      const link: Link = {
        icon: "mdi-home",
        title: "Home",
        value: "home",
        targetId: "#home",
        isCurrent: false,
      }

      expect(typeof link.icon).toBe('string')
      expect(typeof link.title).toBe('string')
      expect(typeof link.value).toBe('string')
      expect(typeof link.targetId).toBe('string')
      expect(typeof link.isCurrent).toBe('boolean')
    })
  })

  describe('Social Interface', () => {
    it('should have correct Social interface structure', () => {
      const social: Social = {
        icon: "mdi-github",
        link: "https://github.com/user",
      }

      expect(social).toMatchObject({
        icon: expect.any(String),
        link: expect.any(String),
      })
    })

    it('should validate Social properties', () => {
      const social: Social = {
        icon: "mdi-github",
        link: "https://github.com/user",
      }

      expect(typeof social.icon).toBe('string')
      expect(typeof social.link).toBe('string')
    })
  })

  describe('AboutTab Interface', () => {
    it('should have correct AboutTab interface structure', () => {
      const tab: AboutTab = {
        name: "Basic Info",
        value: "basic",
        icon: "mdi-account",
      }

      expect(tab).toMatchObject({
        name: expect.any(String),
        value: expect.any(String),
        icon: expect.any(String),
      })
    })

    it('should validate AboutTab properties', () => {
      const tab: AboutTab = {
        name: "Basic Info",
        value: "basic",
        icon: "mdi-account",
      }

      expect(typeof tab.name).toBe('string')
      expect(typeof tab.value).toBe('string')
      expect(typeof tab.icon).toBe('string')
    })
  })

  describe('AboutInfo Interface', () => {
    it('should have correct AboutInfo interface structure', () => {
      const info: AboutInfo = {
        avatar: "/images/avatar.jpg",
        firstName: "John",
        lastName: "Doe",
        fullName: "John Doe",
        email: "john@example.com",
        birth: "1990-01-01",
        address: "123 Street, City",
        phone: "+1234567890",
        jobs: ["Developer", "Designer"],
        shortDescription: "A developer",
        description: "A detailed description",
      }

      expect(info).toMatchObject({
        avatar: expect.any(String),
        firstName: expect.any(String),
        lastName: expect.any(String),
        fullName: expect.any(String),
        email: expect.any(String),
        birth: expect.any(String),
        address: expect.any(String),
        phone: expect.any(String),
        jobs: expect.any(Array),
        shortDescription: expect.any(String),
        description: expect.any(String),
      })
    })

    it('should validate AboutInfo properties', () => {
      const info: AboutInfo = {
        avatar: "/images/avatar.jpg",
        firstName: "John",
        lastName: "Doe",
        fullName: "John Doe",
        email: "john@example.com",
        birth: "1990-01-01",
        address: "123 Street, City",
        phone: "+1234567890",
        jobs: ["Developer", "Designer"],
        shortDescription: "A developer",
        description: "A detailed description",
      }

      expect(typeof info.avatar).toBe('string')
      expect(typeof info.firstName).toBe('string')
      expect(typeof info.lastName).toBe('string')
      expect(typeof info.fullName).toBe('string')
      expect(typeof info.email).toBe('string')
      expect(typeof info.birth).toBe('string')
      expect(typeof info.address).toBe('string')
      expect(typeof info.phone).toBe('string')
      expect(Array.isArray(info.jobs)).toBe(true)
      expect(typeof info.shortDescription).toBe('string')
      expect(typeof info.description).toBe('string')
    })
  })

  describe('AboutBasicInfo Interface', () => {
    it('should have correct AboutBasicInfo interface structure', () => {
      const basicInfo: AboutBasicInfo = {
        title: "Experience",
        subtitle: "Years of experience",
        icon: "mdi-briefcase",
      }

      expect(basicInfo).toMatchObject({
        title: expect.any(String),
        subtitle: expect.any(String),
        icon: expect.any(String),
      })
    })

    it('should validate AboutBasicInfo properties', () => {
      const basicInfo: AboutBasicInfo = {
        title: "Experience",
        subtitle: "Years of experience",
        icon: "mdi-briefcase",
      }

      expect(typeof basicInfo.title).toBe('string')
      expect(typeof basicInfo.subtitle).toBe('string')
      expect(typeof basicInfo.icon).toBe('string')
    })
  })

  describe('AboutEducation Interface', () => {
    it('should have correct AboutEducation interface structure', () => {
      const education: AboutEducation = {
        id: "1",
        title: "Bachelor's Degree",
        enterprise: "University",
        year: 2020,
      }

      expect(education).toMatchObject({
        id: expect.any(String),
        title: expect.any(String),
        enterprise: expect.any(String),
        year: expect.any(Number),
      })
    })

    it('should validate AboutEducation properties', () => {
      const education: AboutEducation = {
        id: "1",
        title: "Bachelor's Degree",
        enterprise: "University",
        year: 2020,
      }

      expect(typeof education.id).toBe('string')
      expect(typeof education.title).toBe('string')
      expect(typeof education.enterprise).toBe('string')
      expect(typeof education.year).toBe('number')
    })
  })

  describe('AboutCertification Interface', () => {
    it('should have correct AboutCertification interface structure', () => {
      const certification: AboutCertification = {
        id: "1",
        title: "Vue.js Certification",
        enterprise: "Vue.js Official",
        url: "https://vuejs.org/certification",
        year: 2023,
      }

      expect(certification).toMatchObject({
        id: expect.any(String),
        title: expect.any(String),
        enterprise: expect.any(String),
        url: expect.any(String),
        year: expect.any(Number),
      })
    })

    it('should validate AboutCertification properties', () => {
      const certification: AboutCertification = {
        id: "1",
        title: "Vue.js Certification",
        enterprise: "Vue.js Official",
        url: "https://vuejs.org/certification",
        year: 2023,
      }

      expect(typeof certification.id).toBe('string')
      expect(typeof certification.title).toBe('string')
      expect(typeof certification.enterprise).toBe('string')
      expect(typeof certification.url).toBe('string')
      expect(typeof certification.year).toBe('number')
    })
  })

  describe('Statistic Interface', () => {
    it('should have correct Statistic interface structure', () => {
      const statistic: Statistic = {
        title: "Projects",
        value: 25,
        icon: "mdi-folder",
      }

      expect(statistic).toMatchObject({
        title: expect.any(String),
        value: expect.any(Number),
        icon: expect.any(String),
      })
    })

    it('should validate Statistic properties', () => {
      const statistic: Statistic = {
        title: "Projects",
        value: 25,
        icon: "mdi-folder",
      }

      expect(typeof statistic.title).toBe('string')
      expect(typeof statistic.value).toBe('number')
      expect(typeof statistic.icon).toBe('string')
    })
  })

  describe('Service Interface', () => {
    it('should have correct Service interface structure', () => {
      const service: Service = {
        id: "1",
        icon: "mdi-web",
        title: "Web Development",
        description: "Custom web applications",
      }

      expect(service).toMatchObject({
        id: expect.any(String),
        icon: expect.any(String),
        title: expect.any(String),
        description: expect.any(String),
      })
    })

    it('should validate Service properties', () => {
      const service: Service = {
        id: "1",
        icon: "mdi-web",
        title: "Web Development",
        description: "Custom web applications",
      }

      expect(typeof service.id).toBe('string')
      expect(typeof service.icon).toBe('string')
      expect(typeof service.title).toBe('string')
      expect(typeof service.description).toBe('string')
    })
  })

  describe('Project Interface', () => {
    it('should have correct Project interface structure', () => {
      const project: Project = {
        id: "1",
        title: "Test Project",
        slug: "test-project",
        description: "A test project",
        imgs: ["/images/project.jpg"],
        visible: true,
        featured: true,
        types: ["web"],
        tech: ["Vue.js"],
        show: true,
        platforms: [
          {
            label: "GitHub",
            icon: "mdi-github",
            url: "https://github.com/project",
          }
        ],
      }

      expect(project).toMatchObject({
        id: expect.any(String),
        title: expect.any(String),
        slug: expect.any(String),
        description: expect.any(String),
        imgs: expect.any(Array),
        visible: expect.any(Boolean),
        featured: expect.any(Boolean),
        types: expect.any(Array),
        tech: expect.any(Array),
      })
    })

    it('should validate Project properties', () => {
      const project: Project = {
        id: "1",
        title: "Test Project",
        slug: "test-project",
        description: "A test project",
        imgs: ["/images/project.jpg"],
        visible: true,
        featured: true,
        types: ["web"],
        tech: ["Vue.js"],
      }

      expect(typeof project.id).toBe('string')
      expect(typeof project.title).toBe('string')
      expect(typeof project.slug).toBe('string')
      expect(typeof project.description).toBe('string')
      expect(Array.isArray(project.imgs)).toBe(true)
      expect(typeof project.visible).toBe('boolean')
      expect(typeof project.featured).toBe('boolean')
      expect(Array.isArray(project.types)).toBe(true)
      expect(Array.isArray(project.tech)).toBe(true)
    })

    it('should handle optional Project properties', () => {
      const project: Project = {
        id: "1",
        title: "Test Project",
        slug: "test-project",
        description: "A test project",
        imgs: ["/images/project.jpg"],
        visible: true,
        featured: true,
        types: ["web"],
        tech: ["Vue.js"],
      }

      // Optional properties should be undefined by default
      expect(project.show).toBeUndefined()
      expect(project.platforms).toBeUndefined()
    })
  })

  describe('Skill Interface', () => {
    it('should have correct Skill interface structure', () => {
      const skill: Skill = {
        id: "1",
        name: "Vue.js",
        color: "#41B883",
        score: 90,
        icon: "devicon:vuejs",
        categories: ["frontend"],
      }

      expect(skill).toMatchObject({
        id: expect.any(String),
        name: expect.any(String),
        color: expect.any(String),
        score: expect.any(Number),
        icon: expect.any(String),
        categories: expect.any(Array),
      })
    })

    it('should validate Skill properties', () => {
      const skill: Skill = {
        id: "1",
        name: "Vue.js",
        color: "#41B883",
        score: 90,
        icon: "devicon:vuejs",
        categories: ["frontend"],
      }

      expect(typeof skill.id).toBe('string')
      expect(typeof skill.name).toBe('string')
      expect(typeof skill.color).toBe('string')
      expect(typeof skill.score).toBe('number')
      expect(typeof skill.icon).toBe('string')
    })
  })

  describe('Contact Interface', () => {
    it('should have correct Contact interface structure', () => {
      const contact: Contact = {
        id: "1",
        label: "Email",
        headline: "Send me an email",
        icon: "mdi-email",
        color: "#333",
        link: "mailto:test@example.com",
        isFeatured: true,
      }

      expect(contact).toMatchObject({
        id: expect.any(String),
        label: expect.any(String),
        headline: expect.any(String),
        icon: expect.any(String),
        color: expect.any(String),
        link: expect.any(String),
        isFeatured: expect.any(Boolean),
      })
    })

    it('should validate Contact properties', () => {
      const contact: Contact = {
        id: "1",
        label: "Email",
        headline: "Send me an email",
        icon: "mdi-email",
        color: "#333",
        link: "mailto:test@example.com",
        isFeatured: true,
      }

      expect(typeof contact.id).toBe('string')
      expect(typeof contact.label).toBe('string')
      expect(typeof contact.headline).toBe('string')
      expect(typeof contact.icon).toBe('string')
      expect(typeof contact.color).toBe('string')
      expect(typeof contact.link).toBe('string')
      expect(typeof contact.isFeatured).toBe('boolean')
    })
  })

  describe('Type Compatibility', () => {
    it('should allow arrays of interface types', () => {
      const links: Link[] = [
        { icon: "mdi-home", title: "Home", value: "home", targetId: "#home", isCurrent: false },
        { icon: "mdi-account", title: "About", value: "about", targetId: "#about", isCurrent: false },
      ]

      const skills: Skill[] = [
        { id: "1", name: "Vue.js", color: "#41B883", score: 90, icon: "devicon:vuejs", categories: ["frontend"] },
        { id: "2", name: "React", color: "#61DAFB", score: 85, icon: "devicon:react", categories: ["frontend"] },
      ]

      expect(Array.isArray(links)).toBe(true)
      expect(Array.isArray(skills)).toBe(true)
      expect(links.length).toBe(2)
      expect(skills.length).toBe(2)
    })

    it('should allow partial interface implementation', () => {
      const project: Partial<Project> = {
        id: "1",
        title: "Test Project",
        // Other properties can be omitted
      }

      expect(project.id).toBe("1")
      expect(project.title).toBe("Test Project")
    })
  })
}) 