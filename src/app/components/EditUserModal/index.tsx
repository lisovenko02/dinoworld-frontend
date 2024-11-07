import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import Modal, { ModalProps } from '../Modal'
import { useUser } from '@/app/(root)/dashboardWrapper'
import Image from 'next/image'
import { FaWindowClose } from 'react-icons/fa'
import { useEditProfileMutation } from '@/state/api'
import toast from 'react-hot-toast'
import { LuImagePlus } from 'react-icons/lu'
import { EditUserSchema, showErrorToast } from '../../../../lib/utils'
import { EditUserFormData } from '@/app/types'

const EditUserModal = ({ onClose, show }: ModalProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const { user, setUser } = useUser()
  console.log('user', user)
  const [editProfile] = useEditProfileMutation()
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [currentImageUrl, setCurrentImageUrl] = useState(user?.imageUrl)

  useEffect(() => {
    if (selectedFile) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result
        setCurrentImageUrl(result ? result.toString() : '')
      }
      reader.readAsDataURL(selectedFile)
    }
  }, [selectedFile])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0])
    }
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditUserFormData>({
    resolver: yupResolver(EditUserSchema),
    defaultValues: {
      email: user?.email,
      firstName: user?.firstName,
      lastName: user?.lastName,
      password: '',
    },
  })

  const onSubmit = async (data: EditUserFormData) => {
    setIsLoading(true)

    try {
      const formData = new FormData()

      formData.append('email', data.email)
      formData.append('firstName', data.firstName)
      formData.append('lastName', data.lastName)
      if (data.password) {
        formData.append('password', data.password)
      }
      if (selectedFile) {
        formData.append('img', selectedFile)
      }

      const response = await editProfile(formData).unwrap()

      if (response) {
        setUser((prevInfo) => {
          return {
            ...prevInfo!,
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            imageUrl: response.imageUrl,
          }
        })
        toast.success('You successfully updated your profile')

        setTimeout(() => {
          onClose()
        }, 1000)
      }
    } catch (error) {
      showErrorToast(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Modal onClose={onClose} show={show}>
      <button
        onClick={onClose}
        className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
      >
        <FaWindowClose size={24} />
      </button>

      <h2 className="text-2xl font-bold text-gray-900 dark:text-zinc-200 mb-4 text-center">
        Edit Info
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex flex-col items-center">
          <div className="relative w-48 h-48 mb-4">
            <Image
              src={currentImageUrl || '/images/dinosaur-bones.png'}
              alt="User Avatar"
              fill
              className="object-cover rounded-full"
            />
          </div>
          <label className="flex gap-2 items-center bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 py-2 px-4 rounded-md hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors">
            <LuImagePlus size={20} />
            Change Photo
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>
        </div>

        {/* Email */}
        <div>
          <label className="block text-gray-700 dark:text-slate-700 font-medium mb-2">
            Email
          </label>
          <input
            {...register('email')}
            type="email"
            className={`w-full px-4 py-2 rounded-md border ${
              errors.email
                ? 'border-red-500'
                : 'border-gray-300 dark:border-gray-600'
            } bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* First Name */}
        <div>
          <label className="block text-gray-700 dark:text-slate-700 font-medium mb-2">
            First Name
          </label>
          <input
            {...register('firstName')}
            type="text"
            className={`w-full px-4 py-2 rounded-md border ${
              errors.firstName
                ? 'border-red-500'
                : 'border-gray-300 dark:border-gray-600'
            } bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100`}
          />
          {errors.firstName && (
            <p className="text-red-500 text-sm mt-1">
              {errors.firstName.message}
            </p>
          )}
        </div>

        {/* Last Name */}
        <div>
          <label className="block text-gray-700 dark:text-slate-700 font-medium mb-2">
            Last Name
          </label>
          <input
            {...register('lastName')}
            type="text"
            className={`w-full px-4 py-2 rounded-md border ${
              errors.lastName
                ? 'border-red-500'
                : 'border-gray-300 dark:border-gray-600'
            } bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100`}
          />
          {errors.lastName && (
            <p className="text-red-500 text-sm mt-1">
              {errors.lastName.message}
            </p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="block text-gray-700 dark:text-slate-700 font-medium mb-2">
            Password
          </label>
          <input
            {...register('password', { required: false })}
            type="password"
            className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600  text-gray-900 dark:text-gray-100 "
          />
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition-colors"
            disabled={isLoading}
          >
            Save Changes
          </button>
        </div>
      </form>
    </Modal>
  )
}

export default EditUserModal
