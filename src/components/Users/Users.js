import { Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearErrorHandler } from '../../store/userActions';
import NewUser from '../NewUser/NewUser';
import AvailableUsers from './AvailableUsers';
import ErrorModal from '../UI/ErrorModal';
import LoadingSpinner from '../UI/LoadingSpinner';
import './Users.scss';

const Users = () => {
	const dispatch = useDispatch();
	const error = useSelector((state) => state.error);
	const loading = useSelector((state) => state.loading);

	const clearError = () => {
		dispatch(clearErrorHandler());
	};

	return (
		<Fragment>
			{error && <ErrorModal onClose={clearError}>{error}</ErrorModal>}
			<NewUser />
			<AvailableUsers />
			{loading && (
				<div className='loading__container'>
					<LoadingSpinner />
				</div>
			)}
		</Fragment>
	);
};

export default Users;
