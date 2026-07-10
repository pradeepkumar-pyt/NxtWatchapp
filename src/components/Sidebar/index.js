import {Link} from 'react-router-dom'
import ThemeAndVideoContext from '../../context/ThemeAndVideoContext'

const Sidebar = () => (
  <ThemeAndVideoContext.Consumer>
    {({isDarkTheme, activeTab, changeTab}) => (
      <div
        style={{
          backgroundColor: isDarkTheme ? '#231f20' : '#ffffff',
          color: isDarkTheme ? '#ffffff' : '#231f20',
          width: '250px',
          height: '90vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '20px',
        }}
      >
        <ul style={{listStyleType: 'none', padding: 0}}>
          <li
            onClick={() => changeTab('Home')}
            style={{
              padding: '10px 0',
              fontWeight: activeTab === 'Home' ? 'bold' : 'normal',
            }}
          >
            <Link to="/" style={{color: 'inherit', textDecoration: 'none'}}>
              Home
            </Link>
          </li>
          <li
            onClick={() => changeTab('Trending')}
            style={{
              padding: '10px 0',
              fontWeight: activeTab === 'Trending' ? 'bold' : 'normal',
            }}
          >
            <Link
              to="/trending"
              style={{color: 'inherit', textDecoration: 'none'}}
            >
              Trending
            </Link>
          </li>
          <li
            onClick={() => changeTab('Gaming')}
            style={{
              padding: '10px 0',
              fontWeight: activeTab === 'Gaming' ? 'bold' : 'normal',
            }}
          >
            <Link
              to="/gaming"
              style={{color: 'inherit', textDecoration: 'none'}}
            >
              Gaming
            </Link>
          </li>
          <li
            onClick={() => changeTab('Saved')}
            style={{
              padding: '10px 0',
              fontWeight: activeTab === 'Saved' ? 'bold' : 'normal',
            }}
          >
            <Link
              to="/saved-videos"
              style={{color: 'inherit', textDecoration: 'none'}}
            >
              Saved Videos
            </Link>
          </li>
        </ul>
        <div>
          <p style={{fontWeight: 'bold'}}>CONTACT US</p>
          <div style={{display: 'flex', gap: '10px', margin: '10px 0'}}>
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
              alt="facebook logo"
              style={{width: '30px'}}
            />
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
              alt="twitter logo"
              style={{width: '30px'}}
            />
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
              alt="linked in logo"
              style={{width: '30px'}}
            />
          </div>
          <p style={{fontSize: '14px'}}>
            Enjoy! Now to see your channels and recommendations!
          </p>
        </div>
      </div>
    )}
  </ThemeAndVideoContext.Consumer>
)

export default Sidebar
