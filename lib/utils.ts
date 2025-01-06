import toast from 'react-hot-toast'
import * as yup from 'yup'

export const authFormSchema = (type: string) => {
  return yup.object().shape({
    // EMAIL OR USERNAME
    email:
      type === 'sign-in'
        ? yup.string().email('Invalid email address').optional()
        : yup
            .string()
            .email('Invalid email address')
            .required('Email is required'),

    username:
      type === 'sign-in'
        ? yup.string().required('Email or Username is required')
        : yup
            .string()
            .min(3, 'Username must be at least 3 characters')
            .optional(),

    // SIGN UP ONLY
    firstName:
      type === 'sign-in'
        ? yup.string().optional()
        : yup
            .string()
            .min(3, 'First name must be at least 3 characters')
            .required('First name is required'),
    lastName:
      type === 'sign-in'
        ? yup.string().optional()
        : yup
            .string()
            .min(3, 'Last name must be at least 3 characters')
            .required('Last name is required'),

    // COMMON
    password: yup
      .string()
      .min(8, 'Password must be at least 8 characters')
      .required('Password is required'),
  })
}

export const EditUserSchema = yup.object().shape({
  email: yup
    .string()
    .email('Invalid email format')
    .required('Email is required'),
  firstName: yup
    .string()
    .min(2, 'First Name must be at least 2 symbols')
    .required('First name is required'),
  lastName: yup
    .string()
    .min(2, 'Last Name must be at least 2 symbols')
    .required('Last name is required'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .notRequired()
    .nullable()
    .transform((value, originalValue) => (originalValue === '' ? null : value)),
})

export function showErrorToast(error: unknown): void {
  if (error && typeof error === 'object' && 'data' in error) {
    const typedError = error as { data: { message: string } }
    toast.error(`Failed: ${typedError.data.message}`)
  } else {
    toast.error('An unknown error occurred')
  }
}
