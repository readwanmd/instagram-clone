import React, { useEffect, useState } from 'react';
import '../css/post.css';
import Avatar from '@material-ui/core/Avatar';
import { db } from '../firebase';
import { Button, Input } from '@material-ui/core';
import firebase from 'firebase';

const Post = ({ color, postId, user, username, imageUrl, caption }) => {
	const [comments, setComments] = useState([]);
	const [comment, setComment] = useState('');

	// console.log(color);

	// console.log(comments);
	useEffect(() => {
		let unsubscribe;
		if (postId) {
			unsubscribe = db
				.collection('posts')
				.doc(postId)
				.collection('comments')
				.orderBy('timestamp', 'desc')
				.onSnapshot((snapshot) => {
					setComments(snapshot.docs.map((doc) => doc.data()));
				});
		}

		return () => {
			unsubscribe();
		};
	}, [postId]);

	const postComment = (event) => {
		event.preventDefault();

		db.collection('posts').doc(postId).collection('comments').add({
			text: comment,
			username: user.displayName,
			timestamp: firebase.firestore.FieldValue.serverTimestamp(),
		});
		setComment('');
	};

	return (
		<div className="post">
			<div className="post__header">
				<Avatar
					style={{ background: color }}
					className="post__avatar"
					alt={username}
					src="/static/images/avatar/1.jpg"
				/>
				<h3>{username}</h3>
			</div>
			{/* header ==> avatar , username */}

			{/* image */}
			<img className="post__image" src={imageUrl} alt="" />

			{/* username + caption */}
			<h4 className="post__text">
				<strong>{username}</strong> {caption}
			</h4>

			<div className="post__comments">
				<h4>{comments.length > 0 ? 'Comments...' : 'No comment yet.'}</h4>
				{comments.map((comment) => (
					<p>
						<strong>{comment.username}</strong> {comment.text}
					</p>
				))}
			</div>

			{user && (
				<form className="post__commentBox">
					<Input
						className="post__input"
						type="text"
						placeholder="Add comment..."
						value={comment}
						onChange={(e) => setComment(e.target.value)}
					/>

					<Button
						className="post__button"
						variant="outlined"
						color="primary"
						disabled={!comment}
						type="submit"
						onClick={postComment}
					>
						Post
					</Button>
				</form>
			)}
		</div>
	);
};

export default Post;
