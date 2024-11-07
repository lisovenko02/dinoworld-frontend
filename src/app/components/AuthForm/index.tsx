'use client'

import React, { useState } from 'react'
import { authFormSchema, showErrorToast } from '../../../../lib/utils'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { GiDinosaurBones } from 'react-icons/gi'
import Link from 'next/link'
import CustomInput from '../CustomInput'
import { useSignInMutation, useSignUpMutation } from '@/state/api'
import { useRouter } from 'next/navigation'
import { NewUser } from '@/app/types'
import Loader from '../Loader'
import toast from 'react-hot-toast'

const AuthForm = ({ initialType }: { initialType: 'sign-in' | 'sign-up' }) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const [signUp] = useSignUpMutation()
  const [signIn] = useSignInMutation()

  const { control, handleSubmit } = useForm<NewUser>({
    resolver: yupResolver(authFormSchema(initialType)),
  })

  const onSubmit: SubmitHandler<NewUser> = async (data) => {
    setIsLoading(true)
    try {
      let credentials: { username?: string; email?: string; password: string }

      if (initialType === 'sign-in') {
        if (data.username?.includes('@')) {
          credentials = {
            email: data.username,
            password: data.password,
          }
        } else {
          credentials = {
            username: data.username,
            password: data.password,
          }
        }
        await signIn(credentials).unwrap()
      } else {
        await signUp(data).unwrap()
        toast.success('Sign-up successful!')
        console.log(data)
      }
      router.push('/market')
    } catch (error) {
      showErrorToast(error)
    } finally {
      setIsLoading(false)
    }
  }

  const toggleForm = () => {
    if (initialType === 'sign-in') {
      setIsLoading(true)
      router.push('/sign-up')
    } else {
      setIsLoading(true)
      router.push('/sign-in')
    }
  }

  return isLoading ? (
    <Loader isLoading={isLoading} />
  ) : (
    <section className="flex min-h-screen w-full flex-col justify-center items-center py-10 px-5">
      {/* LOGO */}
      <header className="absolute top-5 left-5">
        <Link href="/market" className="flex cursor-pointer gap-1 items-center">
          <GiDinosaurBones size={30} color="#b87333" />
          <h1 className="text-xl font-bold text-slate-900">
            DINO<span className="text-amber-500">WORLD</span>
          </h1>
        </Link>
      </header>

      <div className="flex flex-col items-center w-full max-w-md space-y-6">
        <h1 className="text-2xl font-bold text-slate-900">
          {initialType === 'sign-up' ? 'Sign Up' : 'Sign In'}
        </h1>
        <p className="text-lg font-semibold text-gray-700">
          Please enter your details
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-center w-full space-y-5"
        >
          {initialType === 'sign-up' && (
            <div className="w-full space-y-4">
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
                placeholder="Enter your username"
              />
            </div>
          )}

          <CustomInput
            control={control}
            name={initialType === 'sign-in' ? 'username' : 'email'}
            label={initialType === 'sign-in' ? 'Email or Username' : 'Email'}
            placeholder="Enter your email"
          />

          <CustomInput
            control={control}
            name="password"
            label="Password"
            type="password"
            placeholder="Enter your password"
          />

          <button
            type="submit"
            className="w-full py-3 px-4 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-lg transition-colors duration-300"
          >
            {initialType === 'sign-in' ? 'Sign In' : 'Sign Up'}
          </button>
        </form>

        <button
          onClick={toggleForm}
          className="text-sm text-blue-600 hover:underline mt-4"
        >
          {initialType === 'sign-in'
            ? 'Don’t have an account? Sign Up'
            : 'Already have an account? Sign In'}
        </button>
      </div>
    </section>
  )
}

export default AuthForm
