import React from 'react'
import App from './App'
import { renderWithChakraTheme } from '../utils/testHelpers'

beforeEach(() => require('mutationobserver-shim'))

test('app renders without crashing', () => {
  renderWithChakraTheme(<App />)
})
