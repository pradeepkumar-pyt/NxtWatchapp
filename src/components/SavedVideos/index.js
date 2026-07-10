import {Link} from 'react-router-dom'
import Header from '../Header'
import Sidebar from '../Sidebar'
import ThemeAndVideoContext from '../../context/ThemeAndVideoContext'
import {RouteContainer} from '../StyledComponents'
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
                <div>
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
                    alt="no saved videos"
                  />
                  <h1>No saved videos found</h1>
                  <p>You can save your videos while watching them</p>
                </div>
              ) : (
                <div>
                  <h1>Saved Videos</h1>
                  <ul>
                    {savedVideos.map(video => (
                      <li key={video.id}>
                        {/* FIX: wrap in Link so clicking navigates to /videos/:id */}
                        <Link
                          to={`/videos/${video.id}`}
                          style={{textDecoration: 'none', color: 'inherit'}}
                        >
                          <img src={video.thumbnailUrl} alt="video thumbnail" />
                          <p>{video.title}</p>
                          <p>{video.channel.name}</p>
                          {/* FIX: formatted view count + published date */}
                          <p>
                            {formatViewsCount(video.viewCount)} views •{' '}
                            {formatPublishedDate(video.publishedAt)}
                          </p>
                        </Link>
                      </li>
                    ))}
                  </ul>
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
