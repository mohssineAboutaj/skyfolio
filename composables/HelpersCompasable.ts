// get the full relative path of the image
export function useProjectImageFormater(image: string) {
  if (image.startsWith("http")) {
    return image
  } else {
    return `/uploads/imgs/projects/${image}`
  }
}
