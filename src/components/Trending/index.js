import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {HiFire} from 'react-icons/hi'
import {Link} from 'react-router-dom'

import Header from '../Header'
import Sidebar from '../Sidebar'
import ThemeAndVideoContext from '../../context/ThemeAndVideoContext'
import {RouteContainer} from '../StyledComponents'
import {formatViewsCount, formatPublishedDate} from '../../utils/formatters'

class Trending extends Component {
  state = {trendingVideos: [], apiStatus: 'INITIAL'}

  componentDidMount() {
    this.getTrendingVideos()
  }

  getTrendingVideos = async () => {
    this.setState({apiStatus: 'IN_PROGRESS'})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/videos/trending'
    const options = {
      headers: {Authorization: `Bearer ${jwtToken}`},
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const updatedData = data.videos.map(each => ({
        id: each.id,
        title: each.title,
        thumbnailUrl: each.thumbnail_url,
        viewCount: each.view_count,
        publishedAt: each.published_at,
        channel: {
          name: each.channel.name,
          profileImageUrl: each.channel.profile_image_url,
        },
      }))
      this.setState({trendingVideos: updatedData, apiStatus: 'SUCCESS'})
    } else {
      this.setState({apiStatus: 'FAILURE'})
    }
  }

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  render() {
    const {trendingVideos, apiStatus} = this.state

    return (
      <ThemeAndVideoContext.Consumer>
        {({isDarkTheme}) => (
          <>
            <Header />
            <div style={{display: 'flex'}}>
              <Sidebar />
              <RouteContainer data-testid="trending" isDark={isDarkTheme}>
                <div>
                  <HiFire size={30} color="#ff0000" />
                  <h1>Trending</h1>
                </div>
                {apiStatus === 'IN_PROGRESS' ? (
                  this.renderLoader()
                ) : (
                  <ul>
                    {trendingVideos.map(video => (
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
                          <p>{formatViewsCount(video.viewCount)} views </p>
                          <p>{formatPublishedDate(video.publishedAt)}</p>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </RouteContainer>
            </div>
          </>
        )}
      </ThemeAndVideoContext.Consumer>
    )
  }
}

export default Trending
