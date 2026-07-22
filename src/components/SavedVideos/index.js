import {Link} from 'react-router-dom'
import Header from '../Header'
import Sidebar from '../Sidebar'
import ThemeAndVideoContext from '../../context/ThemeAndVideoContext'
import {
  RouteContainer,
  VideoGrid,
  VideoCard,
  ThumbnailImage,
  VideoTitle,
  VideoMeta,
  EmptyStateContainer,
  EmptyStateImage,
  EmptyStateHeading,
  EmptyStateText,
} from '../StyledComponents'
import {formatViewsCount, formatPublishedDate} from '../../utils/formatters'

const SavedVideos = () => (
  <ThemeAndVideoContext.Consumer>
    {({isDarkTheme, savedVideos}) => {
      const isEmpty = savedVideos.length === 0

      return (
        <>
          <Header />
          <div style={{display: 'flex'}}>
            <Sidebar />
            <RouteContainer data-testid="savedVideos" isDark={isDarkTheme}>
              {isEmpty ? (
                <EmptyStateContainer>
                  <EmptyStateImage
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
                    alt="no saved videos"
                  />
                  <EmptyStateHeading isDark={isDarkTheme}>
                    No saved videos found
                  </EmptyStateHeading>
                  <EmptyStateText>
                    You can save your videos while watching them
                  </EmptyStateText>
                </EmptyStateContainer>
              ) : (
                <div>
                  <h1>Saved Videos</h1>
                  <VideoGrid>
                    {savedVideos.map(video => (
                      <VideoCard key={video.id}>
                        {/* FIX: wrap in Link so clicking navigates to /videos/:id */}
                        <Link
                          to={`/videos/${video.id}`}
                          style={{textDecoration: 'none', color: 'inherit'}}
                        >
                          <ThumbnailImage
                            src={video.thumbnailUrl}
                            alt="video thumbnail"
                          />
                          <VideoTitle isDark={isDarkTheme}>
                            {video.title}
                          </VideoTitle>
                          <VideoMeta>{video.channel.name}</VideoMeta>
                          {/* FIX: formatted view count + published date */}
                          <VideoMeta>
                            {formatViewsCount(video.viewCount)} views
                          </VideoMeta>
                          <VideoMeta>
                            {formatPublishedDate(video.publishedAt)}
                          </VideoMeta>
                        </Link>
                      </VideoCard>
                    ))}
                  </VideoGrid>
                </div>
              )}
            </RouteContainer>
          </div>
        </>
      )
    }}
  </ThemeAndVideoContext.Consumer>
)

export default SavedVideos
