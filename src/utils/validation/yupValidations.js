import * as Yup from 'yup'

export const registerFormSchema = Yup.object().shape({
  name: Yup.string()
    .required('Name is required')
    .min(5, 'Name must be at least 5 characters long')
    .max(15, 'Name must not exceed 15 characters')
    .matches(/^[a-zA-Z0-9\s]*$/, 'Name must not contain special characters')
    .trim(),
  email: Yup.string().email().required('A Valid email is required'),
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters long')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      'Password must include at least one uppercase letter, one lowercase letter, one number, and one special character'
    ),
  cnic: Yup.string()
    .required('CNIC is required')
    .matches(/^[0-9]{5}-[0-9]{7}-[0-9]$/, 'Invalid format. It should be like 00000-0000000-0'),
})

export const loginFormSchema = Yup.object().shape({
  email: Yup.string().email().required('A Valid email is required'),
})

export const applicationFormSchema = Yup.object().shape({
  partyName: Yup.string()
    .required('Party Name is required')
    .min(5, 'Party Name must be at least 5 characters long')
    .max(15, 'Party Name must not exceed 15 characters')
    .trim(),
})

export const newElectionSchema = Yup.object().shape({
  electionName: Yup.string()
    .required('Election Name is required')
    .min(5, 'Election Name must be at least 5 characters long')
    .trim(),
})
