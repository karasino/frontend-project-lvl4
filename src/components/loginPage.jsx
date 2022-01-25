import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useFormik } from 'formik';
import { Button, Form } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import useAuth from '../hooks/index.jsx';
import routes from '../routes.js';

const LoginPage = () => {
  const auth = useAuth();
  const [authFailed, setAuthFailed] = useState(false);
  const inputRef = useRef();
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const signupSchema = yup.object().shape({
    username: yup.string()
      .min(2, 'Too Short!')
      .max(20, 'Too Long!')
      .required('Required'),
    password: yup.string()
      .min(4, 'Too Short!')
      .max(20, 'Too Long!')
      .required('Required'),
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: signupSchema,
    onSubmit: async (values) => {
      setAuthFailed(false);
      try {
        const response = await axios.post(routes.loginPath(), values);
        localStorage.setItem('userToken', JSON.stringify(response.data));
        auth.logIn();
        const { from } = location.state || { from: { pathname: '/' } };
        navigate(from);
      } catch (err) {
        if (err.isAxiosError && err.response.status === 401) {
          setAuthFailed(true);
          inputRef.current.select();
          return;
        }
        throw err;
      }
    },
  });

  return (
    <div className="container-fluid">
      <div className="row justify-content-center pt-5">
        <div className="col-sm-4">
          <Form onSubmit={formik.handleSubmit} className="p-3">
            <Form.Group>
              <Form.Label htmlFor="username">Username</Form.Label>
              <Form.Control
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.username}
                placeholder="username"
                name="username"
                id="username"
                autoComplete="username"
                isInvalid={authFailed}
                ref={inputRef}
              />
              {formik.errors.username && formik.touched.username
                ? (<div>{formik.errors.username}</div>)
                : null}
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="password">Password</Form.Label>
              <Form.Control
                type="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                placeholder="password"
                name="password"
                id="password"
                isInvalid={authFailed}
              />
              {formik.errors.password && formik.touched.password
                ? (<div>{formik.errors.password}</div>)
                : null}
              <Form.Control.Feedback type="invalid">the username or password is incorrect</Form.Control.Feedback>
            </Form.Group>
            <Button type="submit" variant="outline-primary">Submit</Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
