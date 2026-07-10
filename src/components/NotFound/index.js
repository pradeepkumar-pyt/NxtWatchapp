import Header from '../Header'
import Sidebar from '../Sidebar'
import ThemeAndVideoContext from '../../context/ThemeAndVideoContext'
import {RouteContainer} from '../StyledComponents'

const NotFound = () => (
  <ThemeAndVideoContext.Consumer>
    {({isDarkTheme}) => {
      const imgUrl = isDarkTheme
        ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-dark-theme-img.png'
        : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png'

      return (
        <>
          <Header />
          <div style={{display: 'flex'}}>
            <Sidebar />
            <RouteContainer isDark={isDarkTheme}>
              <img src={imgUrl} alt="not found" />
              <h1>Page Not Found</h1>
              <p>We are sorry, the page you requested could not be found.</p>
            </RouteContainer>
          </div>
        </>
      )
    }}
  </ThemeAndVideoContext.Consumer>
)

export default NotFound
