import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import {
  Heading,
  FormControl,
  Input,
  Button,
  FormLabel,
  FormErrorMessage,
} from '@chakra-ui/core'

const RHF = () => {
  const [user, setUser] = useState('')

  const { register, handleSubmit, errors, reset } = useForm({
    validationSchema: yup.object().shape({
      username: yup
        .string()
        .required('Please enter your username!')
        .min(5, 'Username is too short! (Min 5 char)')
        .max(12, 'Username is too long! (Max 12 char)'),
      password: yup
        .string()
        .required('Please enter your password')
        .min(8, 'Password is too short! (Min 8 char)')
        .max(15, 'Password is too long! (Max 15 char)'),
    }),
  })

  const onSubmit = data => {
    setUser(data.username)
    reset()
  }

  return (
    <>
      <Heading as='h1'>Please Sign In To Your Account</Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={errors.username}>
          <FormLabel htmlFor='username'>Enter Username</FormLabel>
          <Input
            type='string'
            id='username'
            name='username'
            aria-describedby='usernameHelperText'
            placeholder='username'
            ref={register}
          />
          <FormErrorMessage>{errors.username?.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.password}>
          <FormLabel htmlFor='username'>Enter Password</FormLabel>
          <Input
            type='password'
            id='password'
            name='password'
            aria-describedby='passwordHelperText'
            placeholder='password'
            ref={register}
          />
          <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
        </FormControl>
        <Button type='submit'>Submit</Button>
      </form>
      {user && <Heading as='h2'>Welcome back {user}!</Heading>}
    </>
  )
}

export default RHF
