import aboutInfo from "~/data/about/info.data"
import services from "~/data/services.data"

export default defineNuxtPlugin(() => {
  const route = useRoute()

  if (route.path !== "/") return

  useSchemaOrg([
    defineWebPage({ "@type": "ProfilePage" }),
    ...services.map((service) =>
      defineService({
        name: service.title,
        description: service.description,
        provider: {
          "@type": "Person",
          name: aboutInfo.fullName,
        },
      }),
    ),
  ])
})
