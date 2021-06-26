import { useEffect } from 'react';
import { useState } from 'react';
import './App.css';
import logo from './Asset/logo.png';
import Post from './Component/Post';
import ImageUpload from './Component/ImageUpload';
import SignUpModal from './Component/SignUpModal';
import { db } from './firebase';
// import InstagramEmbed from 'react-instagram-embed';

function App() {
	const [posts, setPosts] = useState([]);
	const [user, setUser] = useState(null);
	const [color, setColor] = useState('#2c3e50');

	const pickColor = () => {
		let colors = [
			'#1abc9c',
			'#2ecc71',
			'#3498db',
			'#8e44ad',
			'#f1c40f',
			'#e74c3c',
			'#e67e22',
		];
		return colors[Math.floor(Math.random() * colors.length)];
	};

	useEffect(() => {
		db.collection('posts')
			.orderBy('timestamp', 'desc')
			.onSnapshot((snapshot) => {
				setPosts(
					snapshot.docs.map((doc) => ({
						id: doc.id,
						post: doc.data(),
					}))
				);
			});
	}, []);

	return (
		<div className="app">
			<div className="app__header">
				<img className="app__headerImage" src={logo} alt="" />

				<SignUpModal user={user} setUser={setUser} />
			</div>

			{user?.displayName ? (
				<ImageUpload username={user.displayName} />
			) : (
				<h2 style={{ background: '#fff', textAlign: 'center' }}>
					Sorry! You need to login to Upload!
				</h2>
			)}

			<div className="app__posts">
				{posts.map(({ id, post }) => (
					<Post
						key={id}
						postId={id}
						user={user}
						username={post.username}
						caption={post.caption}
						imageUrl={post.imageUrl}
						color={pickColor()}
					/>
				))}
			</div>

			{/* <InstagramEmbed
				url="https://www.instagram.com/p/B8hOhcFAG81zBdHOjNLmbaxKn_hy6UXYiHjBMk0/"
				maxWidth={320}
				hideCaption={false}
				containerTagName="div"
				protocol=""
				injectScript
				onLoading={() => {}}
				onSuccess={() => {}}
				onAfterRender={() => {}}
				onFailure={() => {}}
			/> */}
		</div>
	);
}

export default App;
