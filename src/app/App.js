import React from 'react'
import { theme, ThemeProvider, CSSReset } from '@chakra-ui/core'
import RHF from './reactHookForm/RHF'

const App = () => (
  <ThemeProvider theme={theme}>
    <CSSReset />
    <RHF />
  </ThemeProvider>
)

export default App
