type ImageModifiers = {
  width?: number
  height?: number
  fit?: "cover" | "contain" | "fill" | "inside" | "outside"
  format?: "webp" | "avif" | "jpeg" | "jpg" | "png" | "gif"
  quality?: number
  [key: string]: unknown
}

const defaults: ImageModifiers = {
  format: "webp",
  quality: 80,
  fit: "cover",
}

/**
 * Thin wrapper around @nuxt/image's useImage() for optimized URLs
 * without using <NuxtImg> / <NuxtPicture>.
 */
export function useOptimizedImage() {
  const img = useImage()

  function optimize(src: string | undefined | null, modifiers: ImageModifiers = {}) {
    if (!src) return ""
    return img(src, { ...defaults, ...modifiers })
  }

  function optimizeSizes(
    src: string | undefined | null,
    sizes: string,
    modifiers: ImageModifiers = {},
  ) {
    if (!src) {
      return { src: "", srcset: undefined as string | undefined, sizes: undefined as string | undefined }
    }

    return img.getSizes(src, {
      sizes,
      modifiers: { ...defaults, ...modifiers },
    })
  }

  return { img, optimize, optimizeSizes }
}
