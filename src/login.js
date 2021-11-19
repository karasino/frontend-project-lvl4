import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from 'yup';

 

const SignupSchema = Yup.object().shape({
  login: Yup.string()
  	.min(2, 'Too Short!')
  	.max(20, 'Too Long!')
  	.required('Required'),
  lastName: Yup.string()
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
				<Form>
					<Field name="login" />
					{errors.login && touched.login ? (
						<div>{errors.login}</div>
					) : null}
					<Field name="password" />
					{errors.password && touched.password ? (
						<div>{errors.password}</div>
					) : null}
					<button type="submit">Submit</button>
				</Form>
			)}
		</Formik>
	</div>
);
