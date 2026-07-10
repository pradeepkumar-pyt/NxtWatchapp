import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import {LoginContainer} from '../StyledComponents'
import ThemeAndVideoContext from '../../context/ThemeAndVideoContext'

class Login extends Component {
  state = {
    username: '',
    password: '',
    showError: false,
    errorMsg: '',
    showPassword: false, // NEW
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showError: true, errorMsg})
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  // NEW: toggle handler
  onToggleShowPassword = () => {
    this.setState(prevState => ({showPassword: !prevState.showPassword}))
  }

  render() {
    const {username, password, showError, errorMsg, showPassword} = this.state
    const token = Cookies.get('jwt_token')
    if (token !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <ThemeAndVideoContext.Consumer>
        {({isDarkTheme}) => (
          <LoginContainer isDark={isDarkTheme}>
            <form onSubmit={this.submitForm}>
              <img
                src={
                  isDarkTheme
                    ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
                    : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
                }
                alt="website logo"
              />
              <label htmlFor="username">USERNAME</label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={e => this.setState({username: e.target.value})}
              />
              <label htmlFor="password">PASSWORD</label>
              <input
                id="password"
                type={showPassword ? 'text' : 'password'} // NEW: toggled type
                value={password}
                onChange={e => this.setState({password: e.target.value})}
              />

              {/* NEW: Show Password checkbox */}
              <input
                type="checkbox"
                id="showPassword"
                checked={showPassword}
                onChange={this.onToggleShowPassword}
              />
              <label htmlFor="showPassword">Show Password</label>

              <button type="submit">Login</button>
              {showError && <p>*{errorMsg}</p>}
            </form>
          </LoginContainer>
        )}
      </ThemeAndVideoContext.Consumer>
    )
  }
}

export default Login
