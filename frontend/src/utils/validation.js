import * as Yup from 'yup';

export const authValidationSchema = Yup.object().shape({
  name: Yup.string().min(20, 'Minimum 20 characters required').max(60, 'Maximum 60 limits reached').required('Required'),
  address: Yup.string().max(400, 'Max 400 characters allowed').required('Required'),
  email: Yup.string().email('Invalid Email Structure format').required('Required'),
  password: Yup.string()
    .min(8, '8-16 bounds expected')
    .max(16, '8-16 bounds expected')
    .matches(/[A-Z]/, 'Missing uppercase condition')
    .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Missing special char condition')
    .required('Required')
});
