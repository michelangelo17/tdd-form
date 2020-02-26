import React from 'react'
import RHF from './RHF'
import { renderWithChakraTheme } from '../../utils/testHelpers'
import { fireEvent } from '@testing-library/react'

beforeEach(() => require('mutationobserver-shim'))

test('renders form without crashing', () => {
  renderWithChakraTheme(<RHF />)
})

test('renders ui components', () => {
  const { getByText, getByPlaceholderText } = renderWithChakraTheme(<RHF />)

  getByText(/sign in/i)
  getByText(/enter username/i)
  getByPlaceholderText(/username/i)
  getByText(/enter password/i)
  getByPlaceholderText(/password/i)
  getByText(/submit/i)
})

test('username and password are required', async () => {
  const { getByText, queryByText, findByText } = renderWithChakraTheme(<RHF />)
  const submitButton = getByText(/submit/i)

  //no error message at first
  expect(queryByText(/please enter your username/i)).not.toBeInTheDocument()

  //submit blank form
  fireEvent.click(submitButton)

  //should show required messages
  expect(await findByText(/please enter your username/i)).toBeInTheDocument()
  expect(await findByText(/please enter your password/i)).toBeInTheDocument()
})

test('if username added, only password required message shows up', async () => {
  const {
    getByPlaceholderText,
    getByText,
    queryByText,
    findByText,
  } = renderWithChakraTheme(<RHF />)
  const usernameInput = getByPlaceholderText(/username/i)
  const submitButton = getByText(/submit/i)

  //add a username of testing
  fireEvent.change(usernameInput, { target: { value: 'testing' } })
  fireEvent.click(submitButton)

  expect(queryByText(/please enter your username/i)).not.toBeInTheDocument()
  expect(await findByText(/please enter your password/i)).toBeInTheDocument()
})

test('if password added, only username required message shows up', async () => {
  const {
    getByPlaceholderText,
    getByText,
    queryByText,
    findByText,
  } = renderWithChakraTheme(<RHF />)
  const passwordInput = getByPlaceholderText(/password/i)
  const submitButton = getByText(/submit/i)

  //add a password of test1234
  fireEvent.change(passwordInput, { target: { value: 'test1234' } })
  fireEvent.click(submitButton)

  expect(queryByText(/please enter your password/i)).not.toBeInTheDocument()
  expect(await findByText(/please enter your username/i)).toBeInTheDocument()
})

test('form validates other rules correctly and shows appropriate error messages', async () => {
  const { getByPlaceholderText, getByText, findByText } = renderWithChakraTheme(
    <RHF />
  )
  const usernameInput = getByPlaceholderText(/username/i)
  const passwordInput = getByPlaceholderText(/password/i)
  const submitButton = getByText(/submit/i)

  //add a username of test should fail as too short
  fireEvent.change(usernameInput, { target: { value: 'test' } })
  fireEvent.click(submitButton)

  expect(await findByText(/username is too short/i)).toBeInTheDocument()

  //add a username of test should fail as too long
  fireEvent.change(usernameInput, {
    target: { value: '0123456789012' },
  })
  fireEvent.click(submitButton)

  expect(await findByText(/username is too long/i)).toBeInTheDocument()

  //add a password of test should fail as too short
  fireEvent.change(passwordInput, { target: { value: 'test' } })
  fireEvent.click(submitButton)

  expect(await findByText(/password is too short/i)).toBeInTheDocument()

  //add a username of test should fail as too long
  fireEvent.change(passwordInput, {
    target: { value: '0123456789012345' },
  })
  fireEvent.click(submitButton)

  expect(await findByText(/password is too long/i)).toBeInTheDocument()
})

test('happy path: clear form and a welcome back message', async () => {
  const {
    getByPlaceholderText,
    getByText,
    findByText,
    findByPlaceholderText,
  } = renderWithChakraTheme(<RHF />)
  const usernameInput = getByPlaceholderText(/username/i)
  const passwordInput = getByPlaceholderText(/password/i)
  const submitButton = getByText(/submit/i)

  //submit form with valid data
  fireEvent.change(usernameInput, {
    target: { value: 'testing' },
  })
  fireEvent.change(passwordInput, {
    target: { value: 'test1234' },
  })
  fireEvent.click(submitButton)

  expect(await findByText(/welcome Back testing/i)).toBeInTheDocument()
  expect(await findByPlaceholderText(/username/i)).toHaveValue('')
  expect(await findByPlaceholderText(/password/i)).toHaveValue('')
})

//should contain a please sign in message X
//should contain two fields: username and password X
//should contain a submit button X
//should have some helper text to explain what to put into each input X
//should validate both fields as required X
//should have validation to make sure username is at least 5 char and no more than 12 char X
//should have validation to make sure password is at least 8 char and no more than 15 char X
//should show error messages for each case X
//should show a welcome back message on the page and clear the form on successful submission X
