import { Fragment, useState } from 'react';
import Card from '../UI/Card';
import NewUserForm from './NewUserForm';
import './NewUser.scss';

const NewUser = () => {
	const [isAdding, setIsAdding] = useState(false);

	const startAddingHandler = () => {
		setIsAdding(true);
	};

	const stopAddingHandler = () => {
		setIsAdding(false);
	};

	return (
		<Fragment>
			<Card>
				<div className='addUser'>
					{!isAdding && (
						<button className='addUser__button' onClick={startAddingHandler}>
							Add New User
						</button>
					)}
					{isAdding && <NewUserForm onCancel={stopAddingHandler} />}
				</div>
			</Card>
		</Fragment>
	);
};

export default NewUser;
