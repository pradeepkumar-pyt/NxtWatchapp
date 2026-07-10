import styled from 'styled-components'

export const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: ${props => (props.isDark ? '#181818' : '#ffffff')};
`

export const HomeContainer = styled.div`
  background-color: ${props => (props.isDark ? '#181818' : '#f9f9f9')};
  min-height: 100vh;
  width: 100%;
  overflow-y: auto;
`

export const RouteContainer = styled.div`
  background-color: ${props => (props.isDark ? '#0f0f0f' : '#f9f9f9')};
  min-height: 100vh;
  width: 100%;
  overflow-y: auto;
`

export const ActionButton = styled.button`
  background: none;
  border: none;
  font-weight: bold;
  cursor: pointer;
  color: ${props => (props.isActive ? '#2563eb' : '#64748b')};
`
