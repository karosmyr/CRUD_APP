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

const initialState = {
	initLoading: false,
	loading: false,
	users: [],
	error: '',
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case FETCH_USERS_REQUEST:
			return {
				...state,
				initLoading: true,
			};
		case FETCH_USERS_SUCCESS:
			return {
				...state,
				initLoading: false,
				users: action.payload,
			};
		case FETCH_USERS_FAILURE:
			return {
				...state,
				initLoading: false,
				error: action.payload,
			};
		case DELETE_USER_REQUEST:
			return {
				...state,
				loading: true,
			};
		case DELETE_USER_SUCCESS:
			return {
				...state,
				loading: false,
				users: state.users.filter((item) => item.id !== action.payload),
			};
		case DELETE_USER_FAILURE:
			return {
				...state,
				loading: false,
				error: action.payload,
			};
		case ADD_USER_REQUEST:
			return {
				...state,
				loading: true,
			};
		case ADD_USER_SUCCESS:
			return {
				...state,
				loading: false,
				users: [{ ...action.payload }, ...state.users],
			};
		case ADD_USER_FAILURE:
			return {
				...state,
				loading: false,
				error: action.payload,
			};
		case EDIT_USER_REQUEST:
			return {
				...state,
				loading: true,
			};
		case EDIT_USER_SUCCESS:
			return {
				...state,
				loading: false,
				users: state.users.map((user) => {
					if (user.id === action.payload.id) {
						return action.payload;
					}
					return user;
				}),
			};
		case EDIT_USER_FAILURE:
			return {
				...state,
				loading: false,
				error: action.payload,
			};
		case CLEAR_ERROR:
			return {
				...state,
				error: '',
			};
		default:
			return state;
	}
};

export default reducer;
