import {Component} from 'react'
import ReactPlayer from 'react-player'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {formatViewsCount, formatPublishedDate} from '../../utils/formatters'
import Header from '../Header'
import Sidebar from '../Sidebar'
import ThemeAndVideoContext from '../../context/ThemeAndVideoContext'
import {RouteContainer, ActionButton} from '../StyledComponents'

class VideoItemDetails extends Component {
  state = {
    apiStatus: 'INITIAL',
    videoDetails: {},
    isLiked: false,
    isDisliked: false,
  }

  componentDidMount() {
    this.getVideoDetails()
  }

  getVideoDetails = async () => {
    this.setState({apiStatus: 'IN_PROGRESS'})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/videos/${id}`
    const options = {
      headers: {Authorization: `Bearer ${jwtToken}`},
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const details = data.video_details
      const updatedData = {
        id: details.id,
        title: details.title,
        videoUrl: details.video_url,
        thumbnailUrl: details.thumbnail_url,
        viewCount: details.view_count,
        publishedAt: details.published_at,
        description: details.description,
        channel: {
          name: details.channel.name,
          profileImageUrl: details.channel.profile_image_url,
          subscriberCount: details.channel.subscriber_count,
        },
      }
      this.setState({videoDetails: updatedData, apiStatus: 'SUCCESS'})
    } else {
      this.setState({apiStatus: 'FAILURE'})
    }
  }

  render() {
    const {videoDetails, isLiked, isDisliked, apiStatus} = this.state

    return (
      <ThemeAndVideoContext.Consumer>
        {({isDarkTheme, savedVideos, addVideo}) => {
          const isSaved = savedVideos.some(each => each.id === videoDetails.id)

          return (
            <>
              <Header />
              <div style={{display: 'flex'}}>
                <Sidebar />
                <RouteContainer
                  data-testid="videoItemDetails"
                  isDark={isDarkTheme}
                  style={{
                    padding: '20px',
                    color: isDarkTheme ? '#ffffff' : '#000000',
                  }}
                >
                  {apiStatus === 'IN_PROGRESS' ? (
                    <div
                      className="loader-container"
                      data-testid="loader"
                      style={{textAlign: 'center'}}
                    >
                      <Loader
                        type="ThreeDots"
                        color="#0b69ff"
                        height="50"
                        width="50"
                      />
                    </div>
                  ) : (
                    <div>
                      <ReactPlayer
                        url={videoDetails.videoUrl}
                        controls
                        width="100%"
                        height="450px"
                      />
                      <p style={{fontSize: '20px', marginTop: '15px'}}>
                        {videoDetails.title}
                      </p>
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}
                      >
                        <p style={{color: '#64748b'}}>
                          {formatViewsCount(videoDetails.viewCount)} views{' '}
                          {formatPublishedDate(videoDetails.publishedAt)}
                        </p>
                        <div style={{display: 'flex', gap: '15px'}}>
                          <ActionButton
                            type="button"
                            isActive={isLiked}
                            onClick={() =>
                              this.setState(prev => ({
                                isLiked: !prev.isLiked,
                                isDisliked: false,
                              }))
                            }
                          >
                            Like
                          </ActionButton>
                          <ActionButton
                            type="button"
                            isActive={isDisliked}
                            onClick={() =>
                              this.setState(prev => ({
                                isDisliked: !prev.isDisliked,
                                isLiked: false,
                              }))
                            }
                          >
                            Dislike
                          </ActionButton>
                          <ActionButton
                            type="button"
                            isActive={isSaved}
                            onClick={() => addVideo(videoDetails)}
                          >
                            {isSaved ? 'Saved' : 'Save'}
                          </ActionButton>
                        </div>
                      </div>
                      <hr />
                      <div
                        style={{
                          display: 'flex',
                          gap: '15px',
                          marginTop: '20px',
                        }}
                      >
                        <img
                          src={videoDetails.channel?.profileImageUrl}
                          alt="channel logo"
                          style={{width: '50px', height: '50px'}}
                        />
                        <div>
                          <p style={{margin: 0, fontWeight: 'bold'}}>
                            {videoDetails.channel?.name}
                          </p>
                          <p
                            style={{
                              color: '#64748b',
                              fontSize: '12px',
                              marginTop: '5px',
                            }}
                          >
                            {videoDetails.channel?.subscriberCount} subscribers
                          </p>
                          <p style={{marginTop: '15px'}}>
                            {videoDetails.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </RouteContainer>
              </div>
            </>
          )
        }}
      </ThemeAndVideoContext.Consumer>
    )
  }
}

export default VideoItemDetails
