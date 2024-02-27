// get total number of public repositories
export const getReposCount = async () => {
  const response = await fetch("https://api.github.com/users/mohssineAboutaj")
  const data = await response.json()
  return data.public_repos
}

// get coding activity total hours
export const getCodingActivity = async () => {
  const averageCodingLinesPerHour = 150

  const response = await fetch(
    "https://wakatime.com/share/@mohssineAboutaj/c7080d72-f315-4f03-a913-43f454f4a23b.json",
  )
  const data = await response.json()
  const totalHours = Math.floor(
    data.data.grand_total.total_seconds_including_other_language / 3600,
  )
  const totalCodedLines = totalHours * averageCodingLinesPerHour

  return { totalHours, totalCodedLines }
}
