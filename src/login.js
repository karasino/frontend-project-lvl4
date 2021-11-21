import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from 'yup';

 

const SignupSchema = Yup.object().shape({
  login: Yup.string()
  	.min(2, 'Too Short!')
  	.max(20, 'Too Long!')
  	.required('Required'),
  password: Yup.string()
  	.min(6, 'Too Short!')
  	.max(20, 'Too Long!')
  	.required('Required'),
});

export default () => (
	<div>
		<h1>Log in, please.</h1>
		<Formik
			initialValues={{
				login: '',
				password: '',
			}}
			validationSchema={SignupSchema}
			onSubmit={values => {
				alert(JSON.stringify(values, null, 2));
			}}
		>
			{({ errors, touched }) => (
				<Form class="log-in-form">
					<label htmlFor="login">Login</label>
					<Field name="login" class="form-control" />
					{(errors.login && touched.login) && <div>{errors.login}</div>}

					<label htmlFor="password">Password</label>
					<Field name="password" class="form-control" />
					{errors.password && touched.password ? (
						<div>{errors.password}</div>
					) : null}
					<button type="submit" class="btn btn-primary">Submit</button>
				</Form>
			)}
		</Formik>
	</div>
);
