import * as yup from 'yup'

export const authFormSchema = (type: string) => {
  return yup.object().shape({
    // EMAIL OR USERNAME
    email:
      type === 'sign-in'
        ? yup.string().email('Invalid email address').optional() // Дозволяємо пусте, оскільки username також допустимо
        : yup
            .string()
            .email('Invalid email address')
            .required('Email is required'),

    username:
      type === 'sign-in'
        ? yup.string().required('Email or Username is required') // username є обов'язковим для sign-in
        : yup
            .string()
            .min(3, 'Username must be at least 3 characters')
            .required('Username is required'),

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
