import {withRouter, Link} from 'react-router-dom'
import Popup from 'reactjs-popup'
import Cookies from 'js-cookie'
import {FiSun} from 'react-icons/fi'
import {BsMoon} from 'react-icons/bs'
import ThemeAndVideoContext from '../../context/ThemeAndVideoContext'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <ThemeAndVideoContext.Consumer>
      {({isDarkTheme, toggleTheme}) => (
        <nav
          style={{
            backgroundColor: isDarkTheme ? '#231f20' : '#ffffff',
            padding: '15px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Link to="/">
            <img
              src={
                isDarkTheme
                  ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
                  : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
              }
              alt="website logo"
              style={{width: '120px'}}
            />
          </Link>
          <div style={{display: 'flex', alignItems: 'center', gap: '15px'}}>
            <button
              type="button"
              data-testid="theme"
              onClick={toggleTheme}
              style={{background: 'none', border: 'none', cursor: 'pointer'}}
            >
              {isDarkTheme ? (
                <FiSun color="#ffffff" size={25} />
              ) : (
                <BsMoon size={25} />
              )}
            </button>
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
              alt="profile"
              style={{width: '30px', height: '30px'}}
            />
            <Popup
              modal
              trigger={
                <button type="button" style={{cursor: 'pointer'}}>
                  Logout
                </button>
              }
              className="popup-content"
            >
              {close => (
                <div
                  style={{
                    padding: '20px',
                    backgroundColor: isDarkTheme ? '#212121' : '#ffffff',
                    color: isDarkTheme ? '#ffffff' : '#000000',
                  }}
                >
                  <p>Are you sure, you want to logout?</p>
                  <button type="button" onClick={close}>
                    Cancel
                  </button>
                  <button type="button" onClick={onClickLogout}>
                    Confirm
                  </button>
                </div>
              )}
            </Popup>
          </div>
        </nav>
      )}
    </ThemeAndVideoContext.Consumer>
  )
}

export default withRouter(Header)
