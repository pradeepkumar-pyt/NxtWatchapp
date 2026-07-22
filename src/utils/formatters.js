import {formatDistanceToNow} from 'date-fns'

export const formatViewsCount = count => {
  const num = Number(count)
  if (Number.isNaN(num)) return count
  if (num >= 10000000) return `${Math.floor(num / 10000000)}Cr`
  if (num >= 100000) return `${Math.floor(num / 1000)}K`
  if (num >= 1000) return `${Math.floor(num / 1000)}K`
  return `${num}`
}
export const formatPublishedDate = dateString => {
  if (!dateString) return ''
  const publishedDate = new Date(dateString)
  if (Number.isNaN(publishedDate.getTime())) return ''
  return formatDistanceToNow(publishedDate, {addSuffix: true})
}
