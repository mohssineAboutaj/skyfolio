import { defineStore } from "pinia"
import info from "~/data/about/info.data"

export const useSettingsStore = defineStore("settings", {
  state: () => ({
    links: [
      // home
      {
        icon: "mdi-home",
        title: "Home",
        value: "home",
        targetId: "#home",
        isCurrent: false,
      },
      // about
      {
        icon: "mdi-account",
        title: "About",
        value: "about",
        targetId: "#about",
        isCurrent: false,
      },
      // statistics
      {
        icon: "mdi-chart-bar",
        title: "Statistics",
        value: "statistics",
        targetId: "#statistics",
        isCurrent: false,
      },
      // services
      {
        icon: "mdi-view-list",
        title: "Services",
        value: "services",
        targetId: "#services",
        isCurrent: false,
      },
      // skills
      {
        icon: "mdi-code-tags",
        title: "Skills",
        value: "skills",
        targetId: "#skills",
        isCurrent: false,
      },
      // projects
      {
        icon: "mdi-folder-multiple",
        title: "Projects",
        value: "projects",
        targetId: "#projects",
        isCurrent: false,
      },
      // contacts
      {
        icon: "mdi-email",
        title: "Contacts",
        value: "contacts",
        targetId: "#contacts",
        isCurrent: false,
      },
    ],
    title: info.fullName,
  }),
  getters: {
    getLinks: (state) => state.links,
    getTitle: (state) => state.title,
  },
  actions: {
    updateTitle(title: string) {
      this.title = title
    },
    resetTitle() {
      this.title = info.fullName
    },
  },
})
