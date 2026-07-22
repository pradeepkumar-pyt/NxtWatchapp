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
export const LoginButton = styled.button`
  background-color: #ff0000;
  color: #ffffff;
  border: none;
  padding: 10px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
`
export const LoginCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: #ffffff;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.15);
  width: 350px;
`

export const InputField = styled.input`
  width: 100%;
  padding: 8px;
  margin-top: 5px;
  margin-bottom: 20px;
  border: 1px solid #cbd5e1;
  border-radius: 4px;
  box-sizing: border-box;
`

export const InputLabel = styled.label`
  font-size: 12px;
  font-weight: bold;
  color: #64748b;
  letter-spacing: 1px;
`

export const CheckboxRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 20px;
`
export const VideoGrid = styled.ul`
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  padding: 0;
  margin: 20px 0 0 0;
  gap: 20px;
`

export const VideoCard = styled.li`
  width: 300px;
  list-style-type: none;
`

export const ThumbnailImage = styled.img`
  width: 100%;
  height: 170px;
  object-fit: cover;
  border-radius: 8px;
`

export const VideoTitle = styled.p`
  font-size: 15px;
  font-weight: 500;
  margin: 10px 0 5px 0;
  color: ${props => (props.isDark ? '#ffffff' : '#0f0f0f')};
`

export const VideoMeta = styled.p`
  font-size: 13px;
  color: #64748b;
  margin: 3px 0;
`
