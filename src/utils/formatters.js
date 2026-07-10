export const formatViewsCount = count => {
  const num = Number(count)
  if (Number.isNaN(num)) return count
  if (num >= 10000000) return `${Math.floor(num / 10000000)}Cr`
  if (num >= 100000) return `${Math.floor(num / 1000)}K`
  if (num >= 1000) return `${Math.floor(num / 1000)}K`
  return `${num}`
}

export const formatPublishedDate = dateString => {
  const publishedDate = new Date(dateString)
  const now = new Date()
  const diffInSeconds = Math.floor((now - publishedDate) / 1000)

  const intervals = [
    {label: 'year', seconds: 31536000},
    {label: 'month', seconds: 2592000},
    {label: 'day', seconds: 86400},
    {label: 'hour', seconds: 3600},
    {label: 'minute', seconds: 60},
  ]

  for (let i = 0; i < intervals.length; i += 1) {
    const {label, seconds} = intervals[i]
    const count = Math.floor(diffInSeconds / seconds)
    if (count >= 1) {
      return `${count} ${label}${count > 1 ? 's' : ''} ago`
    }
  }
  return 'just now'
}
