import React from 'react';
import { useState } from 'react';
import Modal from '@material-ui/core/Modal';
import { Button, Input } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import '../css/signup.css';
import { auth } from '../firebase';

import logo from '../Asset/logo.png';
import { useEffect } from 'react';

function getModalStyle() {
	const top = 50;
	const left = 50;

	return {
		top: `${top}%`,
		left: `${left}%`,
		transform: `translate(-${top}%, -${left}%)`,
	};
}

const useStyles = makeStyles((theme) => ({
	paper: {
		position: 'absolute',
		width: 400,
		backgroundColor: theme.palette.background.paper,
		border: '2px solid #000',
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
	},
}));

const SignUpModal = ({ user, setUser }) => {
	const classes = useStyles();
	const [modalStyle] = useState(getModalStyle);
	const [open, setOpen] = useState(false);
	const [openSignIn, setOpenSignIn] = useState(false);

	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	// const [user, setUser] = useState(null);

	const signUp = (event) => {
		event.preventDefault();

		auth
			.createUserWithEmailAndPassword(email, password)
			.then((authUser) => {
				return authUser.user.updateProfile({ displayName: username });
			})
			.catch((error) => alert(error.message));

		setOpen(false);
	};

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((authUser) => {
			if (authUser) {
				//User has logged in...
				console.log(authUser);
				setUser(authUser);
			} else {
				//User has logged out...
				setUser(null);
			}
		});

		return () => {
			//Perform some cleanup
			unsubscribe();
		};
	}, [user, username]);

	const signIn = (event) => {
		event.preventDefault();

		auth
			.signInWithEmailAndPassword(email, password)
			.catch((error) => alert(error.message));

		setOpenSignIn(false);
	};

	return (
		<>
			<Modal open={open} onClose={() => setOpen(false)}>
				<div style={modalStyle} className={classes.paper}>
					<form className="signup">
						<center>
							<img src={logo} alt="" />

							<h1>Sign Up</h1>
						</center>

						<Input
							type="text"
							placeholder="Username"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
						/>
						<Input
							type="text"
							placeholder="Email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
						<Input
							type="password"
							placeholder="Password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>

						<Button variant="outlined" type="submit" onClick={signUp}>
							Sign Up
						</Button>
					</form>
				</div>
			</Modal>

			<Modal open={openSignIn} onClose={() => setOpenSignIn(false)}>
				<div style={modalStyle} className={classes.paper}>
					<form className="signup">
						<center>
							<img src={logo} alt="" />

							<h1>Sign In</h1>
						</center>

						<Input
							type="text"
							placeholder="Email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
						<Input
							type="password"
							placeholder="Password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>

						<Button variant="outlined" type="submit" onClick={signIn}>
							Sign In
						</Button>
					</form>
				</div>
			</Modal>

			{user ? (
				<Button onClick={() => auth.signOut()}>Logout</Button>
			) : (
				<div className="login__container">
					<Button onClick={() => setOpenSignIn(true)}>Sign in</Button>
					<Button onClick={() => setOpen(true)}>Sign Up</Button>
				</div>
			)}
		</>
	);
};

export default SignUpModal;
