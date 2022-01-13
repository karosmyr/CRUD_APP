import {
	FETCH_USERS_REQUEST,
	FETCH_USERS_SUCCESS,
	FETCH_USERS_FAILURE,
	DELETE_USER_REQUEST,
	DELETE_USER_SUCCESS,
	DELETE_USER_FAILURE,
	ADD_USER_REQUEST,
	ADD_USER_SUCCESS,
	ADD_USER_FAILURE,
	EDIT_USER_REQUEST,
	EDIT_USER_SUCCESS,
	EDIT_USER_FAILURE,
	CLEAR_ERROR,
} from './userTypes';

export const fetchUsersRequest = () => {
	return {
		type: FETCH_USERS_REQUEST,
	};
};

export const fetchUsersSuccess = (users) => {
	return {
		type: FETCH_USERS_SUCCESS,
		payload: users,
	};
};

export const fetchUsersFailure = (error) => {
	return {
		type: FETCH_USERS_FAILURE,
		payload: error,
	};
};

export const deleteUserRequest = () => {
	return {
		type: DELETE_USER_REQUEST,
	};
};
export const deleteUserSuccess = (userId) => {
	return {
		type: DELETE_USER_SUCCESS,
		payload: userId,
	};
};
export const deleteUserFailure = (error) => {
	return {
		type: DELETE_USER_FAILURE,
		payload: error,
	};
};
export const addUserRequest = () => {
	return {
		type: ADD_USER_REQUEST,
	};
};
export const addUserSuccess = (user) => {
	return {
		type: ADD_USER_SUCCESS,
		payload: user,
	};
};
export const addUserFailure = (error) => {
	return {
		type: ADD_USER_FAILURE,
		payload: error,
	};
};

export const editUserRequest = () => {
	return {
		type: EDIT_USER_REQUEST,
	};
};
export const editUserSuccess = (editedUser) => {
	return {
		type: EDIT_USER_SUCCESS,
		payload: editedUser,
	};
};
export const editUserFailure = (error) => {
	return {
		type: EDIT_USER_FAILURE,
		payload: error,
	};
};

export const clearError = () => {
	return {
		type: CLEAR_ERROR,
	};
};

export const clearErrorHandler = () => {
	return (dispatch) => {
		dispatch(clearError());
	};
};

export const fetchUsers = () => {
	return async (dispatch) => {
		dispatch(fetchUsersRequest());

		const fetchData = async () => {
			const response = await fetch(
				'https://jsonplaceholder.typicode.com/users'
			);
			if (!response.ok) {
				throw new Error('Cannot load users.');
			}
			const data = await response.json();
			return data;
		};

		try {
			const users = await fetchData();
			dispatch(fetchUsersSuccess(users));
		} catch (error) {
			dispatch(fetchUsersFailure(error.message));
		}
	};
};

export const fetchDeleteUser = (userId) => {
	return async (dispatch) => {
		dispatch(deleteUserRequest());

		const deleteRequest = async () => {
			const response = await fetch(
				`https://jsonplaceholder.typicode.com/users/${userId}`,
				{
					method: 'DELETE',
				}
			);

			if (!response.ok) {
				throw new Error('Cannot delete user.');
			}
		};

		try {
			await deleteRequest();
			dispatch(deleteUserSuccess(userId));
		} catch (error) {
			dispatch(deleteUserFailure(error.message));
		}
	};
};

export const fetchAddUser = (user) => {
	return async (dispatch) => {
		dispatch(addUserRequest());

		const addRequest = async () => {
			const response = await fetch(
				'https://jsonplaceholder.typicode.com/users',
				{
					method: 'POST',
					body: JSON.stringify(user),
					headers: {
						'Content-type': 'application/json',
					},
				}
			);

			if (!response.ok) {
				throw new Error('Cannot add user.');
			}
			const data = await response.json();
			return data;
		};

		try {
			const users = await addRequest();
			dispatch(addUserSuccess(users));
		} catch (error) {
			dispatch(addUserFailure(error.message));
		}
	};
};

export const fetchEditUser = (editedUser, id) => {
	return async (dispatch) => {
		dispatch(editUserRequest());

		const editRequest = async () => {
			const response = await fetch(
				`https://jsonplaceholder.typicode.com/users/${id}`,
				{
					method: 'PUT',
					body: JSON.stringify(editedUser),
					headers: {
						'Content-type': 'application/json',
					},
				}
			);
			if (!response.ok) {
				throw new Error('Cannot edit user.');
			}
			const data = await response.json();
			return data;
		};
		try {
			const users = await editRequest();
			dispatch(editUserSuccess(users));
		} catch (error) {
			dispatch(editUserFailure(error.message));
		}
	};
};
