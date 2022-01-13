import { useDispatch } from 'react-redux';
import { fetchEditUser } from '../../store/userActions';
import useInput from '../hooks/use-input';
import './EditedItem.scss';

const isNotEmpty = (value) => value.trim() !== '';
const isEmail = (value) => value.includes('@');

const EditedItem = (props) => {
	const dispatch = useDispatch();

	const {
		value: enteredName,
		isValid: nameIsValid,
		hasError: nameHasError,
		valueChangeHandler: nameChangeHandler,
		inputBlurHandler: nameBlurHandler,
		reset: resetName,
	} = useInput(isNotEmpty, props.name);

	const {
		value: enteredUsername,
		isValid: usernameIsValid,
		hasError: usernameHasError,
		valueChangeHandler: usernameChangeHandler,
		inputBlurHandler: usernameBlurHandler,
		reset: resetUsername,
	} = useInput(isNotEmpty, props.username);

	const {
		value: enteredEmail,
		isValid: emailIsValid,
		hasError: emailHasError,
		valueChangeHandler: emailChangeHandler,
		inputBlurHandler: emailBlurHandler,
		reset: resetEmail,
	} = useInput(isEmail, props.email);

	const {
		value: enteredCity,
		isValid: cityIsValid,
		hasError: cityHasError,
		valueChangeHandler: cityChangeHandler,
		inputBlurHandler: cityBlurHandler,
		reset: resetCity,
	} = useInput(isNotEmpty, props.address);

	let formIsValid = false;

	if (nameIsValid && usernameIsValid && emailIsValid && cityIsValid) {
		formIsValid = true;
	}

	const editSubmissionHandler = (event) => {
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

		dispatch(fetchEditUser(user, props.id));

		props.onCancel();

		resetName();
		resetUsername();
		resetEmail();
		resetCity();
	};

	const nameInputClasses = nameHasError
		? 'editedUser__detail invalid'
		: 'editedUser__detail';
	const usernameInputClasses = usernameHasError
		? 'editedUser__detail invalid'
		: 'editedUser__detail';
	const emailInputClasses = emailHasError
		? 'editedUser__detail invalid'
		: 'editedUser__detail';
	const cityInputClasses = cityHasError
		? 'editedUser__detail invalid'
		: 'editedUser__detail';

	return (
		<li className='list'>
			<form onSubmit={editSubmissionHandler}>
				<div className='editedUser'>
					<div className='control'>
						<div className={nameInputClasses}>
							<label htmlFor='name' className='editedUser__detail--bold'>
								Name:{' '}
							</label>
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
							<label htmlFor='username' className='editedUser__detail--bold'>
								Username:{' '}
							</label>
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
							<label htmlFor='email' className='editedUser__detail--bold'>
								Email:{' '}
							</label>
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
							<label htmlFor='city' className='editedUser__detail--bold'>
								City:{' '}
							</label>
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
					<div className='editedUser__actions'>
						<button
							type='submit'
							className='editedUser__actions--button'
							disabled={!formIsValid}
						>
							Save
						</button>
						<button
							type='button'
							className='editedUser__actions--button'
							onClick={props.onCancel}
						>
							Cancel
						</button>
					</div>
				</div>
			</form>
		</li>
	);
};

export default EditedItem;
