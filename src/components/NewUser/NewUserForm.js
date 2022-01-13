import useInput from '../hooks/use-input';
import './NewUserForm.scss';
import { fetchAddUser } from '../../store/userActions';
import { useDispatch } from 'react-redux';

const isNotEmpty = (value) => value.trim() !== '';
const isEmail = (value) => value.includes('@');
const initialValue = '';

const NewUserForm = (props) => {
	const dispatch = useDispatch();
	
	const {
		value: enteredName,
		isValid: nameIsValid,
		hasError: nameHasError,
		valueChangeHandler: nameChangeHandler,
		inputBlurHandler: nameBlurHandler,
		reset: resetName,
	} = useInput(isNotEmpty, initialValue);

	const {
		value: enteredUsername,
		isValid: usernameIsValid,
		hasError: usernameHasError,
		valueChangeHandler: usernameChangeHandler,
		inputBlurHandler: usernameBlurHandler,
		reset: resetUsername,
	} = useInput(isNotEmpty, initialValue);

	const {
		value: enteredEmail,
		isValid: emailIsValid,
		hasError: emailHasError,
		valueChangeHandler: emailChangeHandler,
		inputBlurHandler: emailBlurHandler,
		reset: resetEmail,
	} = useInput(isEmail, initialValue);

	const {
		value: enteredCity,
		isValid: cityIsValid,
		hasError: cityHasError,
		valueChangeHandler: cityChangeHandler,
		inputBlurHandler: cityBlurHandler,
		reset: resetCity,
	} = useInput(isNotEmpty, initialValue);

	let formIsValid = false;

	if (nameIsValid && usernameIsValid && emailIsValid && cityIsValid) {
		formIsValid = true;
	}

	const formSubmissionHandler = (event) => {
		event.preventDefault();
		if (!formIsValid) {
			return;
		}

		const user = {
			name: enteredName,
			username: enteredUsername,
			email: enteredEmail,
			address: { city: enteredCity },
		};

		dispatch(fetchAddUser(user));

		props.onCancel();

		resetName();
		resetUsername();
		resetEmail();
		resetCity();
	};

	const nameInputClasses = nameHasError
		? 'form-control invalid'
		: 'form-control';
	const usernameInputClasses = usernameHasError
		? 'form-control invalid'
		: 'form-control';
	const emailInputClasses = emailHasError
		? 'form-control invalid'
		: 'form-control';
	const cityInputClasses = cityHasError
		? 'form-control invalid'
		: 'form-control';

	return (
		<form onSubmit={formSubmissionHandler}>
			<div className='control-group'>
				<div className={nameInputClasses}>
					<label htmlFor='name'>Name</label>
					<input
						type='text'
						id='name'
						value={enteredName}
						onChange={nameChangeHandler}
						onBlur={nameBlurHandler}
					/>
					{nameHasError && (
						<p className='error-text'>Name must not be empty.</p>
					)}
				</div>
				<div className={usernameInputClasses}>
					<label htmlFor='username'>Username</label>
					<input
						type='text'
						id='username'
						value={enteredUsername}
						onChange={usernameChangeHandler}
						onBlur={usernameBlurHandler}
					/>
					{usernameHasError && (
						<p className='error-text'>Username must not be empty.</p>
					)}
				</div>
				<div className={emailInputClasses}>
					<label htmlFor='email'>E-Mail Address</label>
					<input
						type='email'
						id='email'
						value={enteredEmail}
						onChange={emailChangeHandler}
						onBlur={emailBlurHandler}
					/>
					{emailHasError && (
						<p className='error-text'>Please enter a vaild email.</p>
					)}
				</div>
				<div className={cityInputClasses}>
					<label htmlFor='city'>City</label>
					<input
						type='text'
						id='city'
						value={enteredCity}
						onChange={cityChangeHandler}
						onBlur={cityBlurHandler}
					/>
					{cityHasError && (
						<p className='error-text'>City must not be empty.</p>
					)}
				</div>
			</div>

			<div className='form__actions'>
				<button
					type='submit'
					className='form__actions--button'
					disabled={!formIsValid}
				>
					Add
				</button>
				<button
					type='button'
					className='form__actions--button'
					onClick={props.onCancel}
				>
					Cancel
				</button>
			</div>
		</form>
	);
};

export default NewUserForm;
