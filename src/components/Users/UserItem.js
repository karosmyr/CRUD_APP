import React, { Fragment, useState } from 'react';
import { useDispatch } from 'react-redux';
import EditedItem from './EditedItem';
import './UserItem.scss';
import { fetchDeleteUser } from '../../store/userActions';

const UserItem = React.memo((props) => {
	const [isEditing, setIsEditing] = useState(false);
	const dispatch = useDispatch();

	const startEditingHandler = () => {
		setIsEditing(true);
	};

	const stopEditingHandler = () => {
		setIsEditing(false);
	};

	const removeUserHandler = (userId) => {
		dispatch(fetchDeleteUser(userId));
	};

	return (
		<Fragment>
			{!isEditing && (
				<li className='user'>
					<div>
						<div className='user__detail'>
							<span className='user__detail--bold'>Name: </span>
							{props.name}
						</div>
						<div className='user__detail'>
							<span className='user__detail--bold'>Username: </span>
							{props.username}
						</div>
						<div className='user__detail'>
							<span className='user__detail--bold'>Email: </span>
							{props.email}
						</div>
						<div className='user__detail'>
							<span className='user__detail--bold'>City: </span>
							{props.address}
						</div>
					</div>
					<div className='user__btnContainer'>
						<button
							className='user__btnContainer--button'
							onClick={startEditingHandler}
						>
							EDIT
						</button>
						<button
							className='user__btnContainer--button'
							onClick={removeUserHandler.bind(this, props.id)}
						>
							DELETE
						</button>
					</div>
				</li>
			)}
			{isEditing && (
				<EditedItem
					name={props.name}
					username={props.username}
					email={props.email}
					address={props.address}
					onCancel={stopEditingHandler}
					id={props.id}
				/>
			)}
		</Fragment>
	);
});

export default UserItem;
