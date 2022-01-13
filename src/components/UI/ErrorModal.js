import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import './ErrorModal.scss';

const Backdrop = (props) => {
	return (
		<div className='backdrop' onClick={props.onClose}>
			{' '}
		</div>
	);
};

const ModalOverlay = (props) => {
	return (
		<div className='error-modal'>
			<h2>An Error Occurred!</h2>
			<p>{props.children}</p>
			<div className='error-modal__actions'>
				<button type='button' onClick={props.onClose}>
					Okay
				</button>
			</div>
		</div>
	);
};

const portalElement = document.getElementById('overlays');

const ErrorModal = React.memo((props) => {
	return (
		<Fragment>
			{ReactDOM.createPortal(
				<Backdrop onClose={props.onClose} />,
				portalElement
			)}
			{ReactDOM.createPortal(
				<ModalOverlay onClose={props.onClose}>{props.children}</ModalOverlay>,
				portalElement
			)}
		</Fragment>
	);
});

export default ErrorModal;
