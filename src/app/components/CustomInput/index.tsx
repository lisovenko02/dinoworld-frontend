import React from 'react'
import { useController, Control, FieldValues, FieldPath } from 'react-hook-form'

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

  return (
    <div className="w-full">
      <label className="form-label">{label}</label>
      <div className="flex flex-col w-full">
        <input
          placeholder={placeholder}
          className="input-class border"
          type={type}
          {...field}
        />
        {error && (
          <p className="form-message mt-2 text-red-500">{error.message}</p>
        )}
      </div>
    </div>
  )
}

export default CustomInput
