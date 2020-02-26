import React from 'react'
import { render } from '@testing-library/react'
import { ThemeProvider, theme } from '@chakra-ui/core'

export const renderWithChakraTheme = ui => {
  const rendered = render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>)
  return {
    ...rendered,
    rerender: ui =>
      renderWithChakraTheme(ui, { container: rendered.container }),
  }
}
