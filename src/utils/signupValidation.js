import * as yup from 'yup';

const signupValidationSchema = yup.object({
  fullName: yup
    .string("Enter your Name")
    .min(3, "Too Short!")
    .max(50, "Too Long!")
    .required("Your Name is required"),
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string('Enter your password')
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
});


export default signupValidationSchema;