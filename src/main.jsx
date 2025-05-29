import React from 'react'
import ReactDOM from 'react-dom'
import { ThemeProvider } from '@mui/material/styles'
import { CssBaseline } from '@mui/material'
import { ThemeProvider as CustomThemeProvider } from './contexts/ThemeContext'
import RepSpheresApp from './components/RepSpheresApp'
import { designTokens } from './styles/designTokens'

ReactDOM.render(
  <React.StrictMode>
    <CustomThemeProvider>
      <CssBaseline />
      <RepSpheresApp />
    </CustomThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
)