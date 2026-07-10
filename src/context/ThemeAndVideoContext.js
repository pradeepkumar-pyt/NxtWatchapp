import React from 'react'

const ThemeAndVideoContext = React.createContext({
  isDarkTheme: false,
  savedVideos: [],
  activeTab: 'Home',
  toggleTheme: () => {},
  addVideo: () => {},
  changeTab: () => {},
})

export default ThemeAndVideoContext
