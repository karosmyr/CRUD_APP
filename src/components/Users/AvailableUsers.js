import React, { useEffect, Fragment } from 'react';
import { fetchUsers } from '../../store/userActions';
import UserItem from './UserItem';
import Card from '../UI/Card';
import LoadingSpinner from '../UI/LoadingSpinner';
import { useSelector, useDispatch } from 'react-redux';

import './AvailableUsers.scss';

const AvailableUsers = () => {
	const dispatch = useDispatch();
	const userData = useSelector((state) => state);

	useEffect(() => {
		dispatch(fetchUsers());
	}, [dispatch]);

	let userContent = userData.users.map((user) => (
		<UserItem
			key={user.id}
			id={user.id}
			name={user.name}
			username={user.username}
			email={user.email}
			address={user.address.city}
		/>
	));

	if (userData.users.length === 0) {
		userContent = (
			<section className='users--error'>
				<p>Cannot load users.</p>
			</section>
		);
	}

	return (
		<Fragment>
			{userData.initLoading ? (
				<section className='users__items'>
					<div className='loading__container'>
						<LoadingSpinner />
					</div>
				</section>
			) : userData.error ? (
				<section className='users--error'>
					<Card>
						<p>{userData.error}</p>
					</Card>
				</section>
			) : (
				<section className='users_items'>
					<Card>
						<ul>{userContent}</ul>
					</Card>
				</section>
			)}
		</Fragment>
	);
};

export default AvailableUsers;
