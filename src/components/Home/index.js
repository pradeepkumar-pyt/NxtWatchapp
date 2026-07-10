import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {IoMdSearch, IoMdClose} from 'react-icons/io'
import {Link} from 'react-router-dom'

import Header from '../Header'
import Sidebar from '../Sidebar'
import ThemeAndVideoContext from '../../context/ThemeAndVideoContext'
import {HomeContainer} from '../StyledComponents'
import {formatViewsCount, formatPublishedDate} from '../../utils/formatters'

class Home extends Component {
  state = {
    displayBanner: true,
    searchInput: '',
    apiStatus: 'INITIAL',
    videosList: [],
  }

  componentDidMount() {
    this.getVideos()
  }

  getVideos = async () => {
    this.setState({apiStatus: 'IN_PROGRESS'})
    const {searchInput} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/videos/all?search=${searchInput}`
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
      this.setState({videosList: updatedData, apiStatus: 'SUCCESS'})
    } else {
      this.setState({apiStatus: 'FAILURE'})
    }
  }

  renderLoader = () => (
    <div
      className="loader-container"
      data-testid="loader"
      style={{textAlign: 'center', marginTop: '40px'}}
    >
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  // NEW: failure view
  renderFailureView = () => (
    <div style={{textAlign: 'center', padding: '20px'}}>
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
        alt="failure view"
        style={{width: '200px'}}
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>
        We are having some trouble completing your request. Please try again.
      </p>
      <button type="button" onClick={this.getVideos}>
        Retry
      </button>
    </div>
  )

  renderVideoList = () => {
    const {videosList} = this.state
    if (videosList.length === 0) {
      return (
        <div style={{textAlign: 'center', padding: '20px'}}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
            alt="no videos"
            style={{width: '200px'}}
          />
          <h1>No Search results found</h1>
          <p>Try different key words or remove search filter</p>
          <button type="button" onClick={this.getVideos}>
            Retry
          </button>
        </div>
      )
    }
    return (
      <ul
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          listStyleType: 'none',
          padding: 0,
          gap: '20px',
        }}
      >
        {videosList.map(video => (
          <li key={video.id} style={{width: '280px'}}>
            <Link
              to={`/videos/${video.id}`}
              style={{textDecoration: 'none', color: 'inherit'}}
            >
              <img
                src={video.thumbnailUrl}
                alt="video thumbnail"
                style={{width: '100%'}}
              />
              <div style={{display: 'flex', gap: '10px', marginTop: '10px'}}>
                <img
                  src={video.channel.profileImageUrl}
                  alt="channel logo"
                  style={{width: '40px', height: '40px'}}
                />
                <div>
                  <p style={{fontSize: '14px', margin: 0}}>{video.title}</p>
                  <p
                    style={{
                      fontSize: '12px',
                      color: '#64748b',
                      margin: '5px 0',
                    }}
                  >
                    {video.channel.name}
                  </p>
                  <p style={{fontSize: '12px', color: '#64748b', margin: 0}}>
                    {formatViewsCount(video.viewCount)} views •{' '}
                    {formatPublishedDate(video.publishedAt)}
                  </p>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    )
  }

  renderContent = () => {
    const {apiStatus} = this.state
    if (apiStatus === 'IN_PROGRESS') return this.renderLoader()
    if (apiStatus === 'FAILURE') return this.renderFailureView()
    return this.renderVideoList()
  }

  render() {
    const {displayBanner, searchInput} = this.state
    return (
      <ThemeAndVideoContext.Consumer>
        {({isDarkTheme}) => (
          <>
            <Header />
            <div style={{display: 'flex'}}>
              <Sidebar />
              <HomeContainer
                data-testid="home"
                isDark={isDarkTheme}
                style={{
                  padding: '20px',
                  color: isDarkTheme ? '#ffffff' : '#000000',
                }}
              >
                {displayBanner && (
                  <div
                    data-testid="banner"
                    style={{
                      backgroundImage:
                        "url('https://assets.ccbp.in/frontend/react-js/nxt-watch-banner-bg.png')",
                      backgroundSize: 'cover',
                      padding: '20px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginBottom: '20px',
                    }}
                  >
                    <div>
                      <img
                        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                        alt="nxt watch logo"
                        style={{width: '120px'}}
                      />
                      <p>Buy Nxt Watch Premium prepaid plans with UPI</p>
                      <button type="button">GET IT NOW</button>
                    </div>
                    <button
                      type="button"
                      data-testid="close"
                      onClick={() => this.setState({displayBanner: false})}
                      style={{
                        background: 'none',
                        border: 'none',
                        height: 'fit-content',
                        cursor: 'pointer',
                      }}
                    >
                      <IoMdClose size={20} />
                    </button>
                  </div>
                )}
                <div
                  style={{
                    display: 'flex',
                    maxWidth: '400px',
                    marginBottom: '20px',
                  }}
                >
                  <input
                    type="search"
                    value={searchInput}
                    onChange={e => this.setState({searchInput: e.target.value})}
                    placeholder="Search"
                    style={{flexGrow: 1, padding: '8px'}}
                  />
                  <button
                    type="button"
                    data-testid="searchButton"
                    onClick={this.getVideos}
                    style={{padding: '8px 15px'}}
                  >
                    <IoMdSearch />
                  </button>
                </div>
                {this.renderContent()}
              </HomeContainer>
            </div>
          </>
        )}
      </ThemeAndVideoContext.Consumer>
    )
  }
}

export default Home
