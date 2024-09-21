'use client'

import React from 'react'
import { authFormSchema } from '../../../../lib/utils'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { GiDinosaurBones } from 'react-icons/gi'
import Link from 'next/link'
import CustomInput from '../CustomInput'

interface AuthFormData {
  email?: string
  firstName?: string
  lastName?: string
  username: string
  password: string
}

const AuthForm = ({ type }: { type: 'sign-in' | 'sign-up' }) => {
  const {
    control,
    // register,
    handleSubmit,
    // formState: { errors },
  } = useForm<AuthFormData>({
    resolver: yupResolver(authFormSchema(type)),
  })

  const onSubmit: SubmitHandler<AuthFormData> = (data) => {
    if (type === 'sign-in') {
      const identifier = data.username?.includes('@')
        ? `email: ${data.username}`
        : `username: ${data.username}`
      console.log(identifier)
    } else {
      console.log(data)
    }
  }

  return (
    <section className="flex min-h-screen w-full flex-col justify-center gap-5 py-10 px-5 md:gap-8 ">
      <header className="flex flex-col gap-3">
        {/* LOGO */}
        <Link href="/" className="flex cursor-pointer gap-1 items-center">
          <GiDinosaurBones size={30} color="#b87333" />
          <h1 className="text-xl font-bold text-slate-900">
            DINO<span className="text-amber-500">WORLD</span>
          </h1>
        </Link>
        {/* DESCRIPTION ABOUT PAGE */}
        <div className="flex flex-col gap-1 md:gap-3">
          <h1 className="text-2xl font-bold text-slate-900">
            {type === 'sign-in' ? 'Sign In' : 'Sign Up'}
          </h1>
          <p className="text-lg font-semibold">Please enter your details</p>
        </div>
      </header>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center w-full"
      >
        {type === 'sign-up' && (
          <div className="w-full">
            <div className="flex gap-4">
              <CustomInput
                control={control}
                name="firstName"
                label="First Name"
                placeholder="Enter your First Name"
              />
              <CustomInput
                control={control}
                name="lastName"
                label="Last Name"
                placeholder="Enter your Last Name"
              />
            </div>

            <CustomInput
              control={control}
              name="username"
              label="Username"
              placeholder="Enter you Username"
            />

            {/* <div>
              <label>Username</label>
              <input
                className="border"
                {...register('username', { required: true })}
              />
              <p>{errors.username?.message}</p>
            </div> */}
          </div>
        )}
        <CustomInput
          control={control}
          name={type === 'sign-in' ? 'username' : 'email'}
          label={type === 'sign-in' ? 'Email or Username' : 'Email'}
          placeholder="Enter your email"
        />
        {/* <div>
          <label>{type === 'sign-in' ? 'Email or Username' : 'Email'}</label>
          <input
            className="border"
            {...register(type === 'sign-in' ? 'username' : 'email', {
              required: true,
            })}
          />
          <p>{errors.email?.message || errors.username?.message}</p>
        </div> */}

        <CustomInput
          control={control}
          name="password"
          label="Password"
          placeholder="Enter your password"
          type="password"
        />

        <button type="submit">
          {type === 'sign-in' ? 'Sign In' : 'Sign Up'}
        </button>
      </form>
    </section>
  )
}

export default AuthForm
