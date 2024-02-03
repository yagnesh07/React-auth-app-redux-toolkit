import React, { useState } from 'react'
import './Login.css'
import { useDispatch } from 'react-redux'
import { login } from '../features/userSlice'
import { Formik } from 'formik'

const Login = () => {
    const dispatch = useDispatch();

  return (
    <div>
      <div className='login'>
        <Formik 
            initialValues={{name: '', email: '', password: ''}}
            validate={values => {
                const errors = {}
                if(!values.email) {
                    errors.email = 'Required'
                } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                    errors.email = 'Invalid email address';
                }
                if(!values.name) {
                    errors.name = 'Requierd'
                }
                if(!values.password) {
                    errors.password = 'Required';
                }
                return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                    alert(JSON.stringify(values, null, 2));
                    setSubmitting(false)
                }, 400)
                dispatch(
                    login({
                        name: values.name,
                        email: values.email,
                        password: values.password,
                        loggedIn: true
                    })
                )
            }}
        >
            {
                ({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting
                }) => (
                    <form className='login_form' onSubmit={handleSubmit}>
                        <h1>Login here 📝</h1>
                        <input
                            id='name'
                            type="text" 
                            placeholder='Name' 
                            value={values.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <span className='error_message'>{errors.name && touched.name && errors.name}</span>
                        <input
                            id='email'
                            type="email" 
                            placeholder='Email' 
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <span className='error_message'>{errors.email && touched.email && errors.email}</span>
                        <input
                            id='password'
                            type="password" 
                            placeholder='Password' 
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                         <span className='error_message'>{errors.password && touched.password && errors.password}</span>
                        <button type='submit' disabled={isSubmitting} className='submit_btn'>
                            Submit
                        </button>
                    </form>
                )
            }
        </Formik>
      </div>
    </div>
  )
}

export default Login
