import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {SiYoutubegaming} from 'react-icons/si'
import {Link} from 'react-router-dom'

import Header from '../Header'
import Sidebar from '../Sidebar'
import ThemeAndVideoContext from '../../context/ThemeAndVideoContext'
import {RouteContainer} from '../StyledComponents'
import {formatViewsCount} from '../../utils/formatters'

class Gaming extends Component {
  state = {gamingVideos: [], apiStatus: 'INITIAL'}

  componentDidMount() {
    this.getGamingVideos()
  }

  getGamingVideos = async () => {
    this.setState({apiStatus: 'IN_PROGRESS'})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/videos/gaming'
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
      }))
      this.setState({gamingVideos: updatedData, apiStatus: 'SUCCESS'})
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
    const {gamingVideos, apiStatus} = this.state

    return (
      <ThemeAndVideoContext.Consumer>
        {({isDarkTheme}) => (
          <>
            <Header />
            <div style={{display: 'flex'}}>
              <Sidebar />
              <RouteContainer data-testid="gaming" isDark={isDarkTheme}>
                <div>
                  <SiYoutubegaming size={30} color="#ff0000" />
                  <h1>Gaming</h1>
                </div>
                {apiStatus === 'IN_PROGRESS' ? (
                  this.renderLoader()
                ) : (
                  <ul>
                    {gamingVideos.map(video => (
                      <li key={video.id}>
                        {/* FIX: wrap in Link so click navigates to /videos/:id */}
                        <Link
                          to={`/videos/${video.id}`}
                          style={{textDecoration: 'none', color: 'inherit'}}
                        >
                          <img src={video.thumbnailUrl} alt="video thumbnail" />
                          <p>{video.title}</p>
                          <p>
                            {formatViewsCount(video.viewCount)} Watching
                            Worldwide
                          </p>
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

export default Gaming
