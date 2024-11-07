import React, { useState } from 'react'
import { useController, Control, FieldValues, FieldPath } from 'react-hook-form'
import { LiaEye, LiaEyeSlash } from 'react-icons/lia'

type CustomInputProps<TFieldValues extends FieldValues> = {
  control: Control<TFieldValues>
  name: FieldPath<TFieldValues>
  label: string
  placeholder: string
  type?: string
}

const CustomInput = <TFieldValues extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  type = 'text',
}: CustomInputProps<TFieldValues>) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    control,
    name,
  })

  const [showPassword, setShowPassword] = useState(false)

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState)
  }

  return (
    <div className="w-full relative">
      <label className="block text-gray-700 text-sm font-bold mb-2">
        {label}
      </label>
      <div className="flex items-center w-full relative">
        <input
          placeholder={placeholder}
          className={`input-class border w-full py-2 px-3 rounded-md shadow-sm focus:ring-amber-500 focus:border-amber-500 ${
            error ? 'border-red-500' : 'border-gray-300'
          }`}
          type={showPassword && type === 'password' ? 'text' : type}
          {...field}
        />
        {type === 'password' && (
          <span
            onClick={togglePasswordVisibility}
            className="absolute right-3 cursor-pointer text-gray-500"
          >
            {showPassword ? <LiaEyeSlash size={24} /> : <LiaEye size={24} />}
          </span>
        )}
      </div>
      {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
    </div>
  )
}

export default CustomInput
