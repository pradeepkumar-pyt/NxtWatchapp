import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import {
  LoginContainer,
  LoginButton,
  LoginCard,
  InputField,
  InputLabel,
  CheckboxRow,
} from '../StyledComponents'
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
            <LoginCard>
              <img
                src={
                  isDarkTheme
                    ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
                    : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
                }
                alt="website logo"
                style={{
                  width: '150px',
                  marginBottom: '30px',
                  alignSelf: 'center',
                }}
              />
              <form onSubmit={this.submitForm} style={{width: '100%'}}>
                <InputLabel htmlFor="username">USERNAME</InputLabel>
                <br />
                <InputField
                  id="username"
                  type="text"
                  value={username}
                  onChange={e => this.setState({username: e.target.value})}
                />

                <InputLabel htmlFor="password">PASSWORD</InputLabel>
                <br />
                <InputField
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => this.setState({password: e.target.value})}
                />

                <CheckboxRow>
                  <input
                    type="checkbox"
                    id="showPassword"
                    checked={showPassword}
                    onChange={this.onToggleShowPassword}
                  />
                  <InputLabel htmlFor="showPassword" style={{fontSize: '13px'}}>
                    Show Password
                  </InputLabel>
                </CheckboxRow>

                <LoginButton type="submit" style={{width: '100%'}}>
                  Login
                </LoginButton>
                {showError && (
                  <p style={{color: '#ff0000', fontSize: '13px'}}>
                    *{errorMsg}
                  </p>
                )}
              </form>
            </LoginCard>
          </LoginContainer>
        )}
      </ThemeAndVideoContext.Consumer>
    )
  }
}

export default Login
