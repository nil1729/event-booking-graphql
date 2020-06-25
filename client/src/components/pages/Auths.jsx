import React, { useState, useRef, useContext } from 'react';
import Alert from '../Alert';
import AuthContext from '../../context/AuthContext.js';
import AlertContext from '../../context/AlertContext.js';

const Authentication = () => {
	const authContext = useContext(AuthContext);
	const alertContext = useContext(AlertContext);
	const { login } = authContext;
	const { showAlert, msgs } = alertContext;
	const [modeLogin, setModeLogin] = useState(true);
	const emailEl = useRef();
	const passwordEl = useRef();
	const modeChange = () => {
		setModeLogin(!modeLogin);
	};
	const resetForm = () => {
		emailEl.current.value = '';
		passwordEl.current.value = '';
	};
	const createRequestData = (email, password, modeLogin) => {
		let requestData = {
			query: ` 
                query {
                    loginUser(userInput: {email: "${email}", password: "${password}"}){
                        userID,
                        token
                    }
                }
            `,
		};
		if (!modeLogin) {
			requestData = {
				query: ` 
                    mutation {
                        createUser(userInput: {email: "${email}", password: "${password}"}){
                            _id
                            email
                            password
                        }
                    }
                `,
			};
		}
		return requestData;
	};
	const sendRequest = async requestData => {
		const myHeaders = new Headers();
		myHeaders.append('Content-Type', 'application/json');
		const requestOptions = {
			method: 'POST',
			headers: myHeaders,
			body: JSON.stringify(requestData),
			redirect: 'follow',
		};
		const response = await fetch('/graphql', requestOptions);
		const JSONData = await response.json();
		return JSONData;
	};

	const submitHandle = async e => {
		e.preventDefault();
		const email = emailEl.current.value;
		const password = passwordEl.current.value;
		if (email.trim().length === 0 || password.trim().length === 0) {
			return;
		}
		resetForm();
		const requestData = createRequestData(email, password, modeLogin);
		const response = await sendRequest(requestData);
		if (response.errors) {
			return showAlert('warning', response.errors);
		} else if (response.data.loginUser) {
			return login(response.data.loginUser);
		} else {
			setModeLogin(true);
		}
	};

	return (
		<div className='container mt-4'>
			{msgs && <Alert />}
			<form
				className='auth__form'
				style={{ width: '60%', margin: 'auto' }}
				onSubmit={submitHandle}>
				<h2 className='text-center'>{modeLogin ? 'Login' : 'Register'} User</h2>
				<div className='form-group'>
					<label>Email address</label>
					<input
						ref={emailEl}
						type='email'
						className='form-control'
						id='exampleInputEmail1'
						placeholder='Enter email'
						required
					/>
				</div>
				<div className='form-group'>
					<label>Password</label>
					<input
						ref={passwordEl}
						type='password'
						className='form-control'
						id='exampleInputPassword1'
						placeholder='Password'
						required
					/>
				</div>
				<button type='submit' className='btn btn-sm btn-danger'>
					Submit
				</button>
				<button
					type='button'
					className='btn btn-sm btn-warning ml-2 text-dark'
					onClick={modeChange}>
					Switch to {modeLogin ? 'SignUp' : 'Login'}
				</button>
			</form>
		</div>
	);
};

export default Authentication;
