import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from '../reducers/user';
import { removeAllBookmark } from '../reducers/bookmarks';
import styles from '../styles/Header.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faXmark } from '@fortawesome/free-solid-svg-icons';
import Moment from 'react-moment';
import { Modal } from 'antd';
import Link from 'next/link';

function Header() {

	const dispatch = useDispatch();	// initialise dispatch
	const date = new Date();		// current date
	let userSection; 				// the header to hold the user display
	const user = useSelector((state) => state.user.value);			// the user local stoage
	const [isModalVisible, setIsModalVisible] = useState(false);	// the state to hold modal display
	const [signUpUsername, setSignUpUsername] = useState('');		// the state to hold the input of username sign Up value
	const [signUpPassword, setSignUpPassword] = useState('');		// the state to hold the input of password sign Up value
	const [signInUsername, setSignInUsername] = useState('');		// the state to hold the input of username sign In value
	const [signInPassword, setSignInPassword] = useState('');		// the state to hold the input of password sign In value


	/**
	 * when click to handleRegister
	 * POST (username, password) to the users/signup route
	 * GET username and token response from the database
	 * then add (username, token) to the user local storage
	 */
	const handleRegister = () => {
		fetch('http://localhost:3000/users/signup', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ username: signUpUsername, password: signUpPassword }),
		})
		.then(response => response.json())
		.then(data => {
			if (data.result) {
				dispatch(login({ username: signUpUsername, token: data.token }));
				setSignUpUsername('');     // reset the username input value
				setSignUpPassword('');     // reset the password input value
				setIsModalVisible(false);  // hide the modal
			}
		});
	};

	/**
	 * when click to handleConnection
	 * POST (username, password) to the users/signin route
	 * GET username and token response from the database
	 * then add (username, token) to the user local storage
	 */
	const handleConnection = () => {
		fetch('http://localhost:3000/users/signin', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ username: signInUsername, password: signInPassword }),
			})
			.then(response => response.json())
			.then(data => {
				if (data.result) {
					dispatch(login({ username: signInUsername, token: data.token }));
					setSignInUsername('');    // reset the username input value
					setSignInPassword('');    // reset the password input value
					setIsModalVisible(false); // hide the modal
				}
			});
	};


	// the header view
	if (user.token) {
		// if user is connected, show this content
		userSection = (
			<div className={styles.logoutSection}>
				<p>Welcome {user.username} / </p>
				<button onClick={() => {dispatch(logout()), dispatch(removeAllBookmark())}}>Logout</button>
			</div>
		);
	} else {
		// if user is not connected, show this content
		userSection =
			<div className={styles.headerIcons}>
				<FontAwesomeIcon onClick={ ()=>setIsModalVisible(!isModalVisible)} className={styles.userSection} icon={isModalVisible ? faXmark : faUser} />
			</div>
	}

	return (
		<header className={styles.header}>
			<div className={styles.logoContainer}>
				<Moment className={styles.date} date={date} format="MMM Do YYYY" />
				<h1 className={styles.title}>Morning News</h1>
				{userSection}
			</div>

			<div className={styles.linkContainer}>
				<Link href="/"><span className={styles.link}>Articles</span></Link>
				<Link href="/bookmarks"><span className={styles.link}>Bookmarks</span></Link>
			</div>

			{isModalVisible && <div id="react-modals">
				<Modal getContainer="#react-modals" className={styles.modal} visible={isModalVisible} closable={false} footer={null}>
					{!user.token && (
						<div className={styles.registerContainer}>
							<div className={styles.registerSection}>
								<p>Sign-up</p>
								<input type="text" placeholder="Username" id="signUpUsername" onChange={(e) => setSignUpUsername(e.target.value)} value={signUpUsername} />
								<input type="password" placeholder="Password" id="signUpPassword" onChange={(e) => setSignUpPassword(e.target.value)} value={signUpPassword} />
								<button id="register" onClick={() => handleRegister()}>Register</button>
							</div>
							<div className={styles.registerSection}>
								<p>Sign-in</p>
								<input type="text" placeholder="Username" id="signInUsername" onChange={(e) => setSignInUsername(e.target.value)} value={signInUsername} />
								<input type="password" placeholder="Password" id="signInPassword" onChange={(e) => setSignInPassword(e.target.value)} value={signInPassword} />
								<button id="connection" onClick={() => handleConnection()}>Connect</button>
							</div>
						</div>
					)}
				</Modal>
			</div>}
		</header >
	);
}

export default Header;
