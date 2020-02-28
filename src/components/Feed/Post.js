import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const Post = props => {
	//console.log(props.user+" "+props.name);
	return (
		<article className="post card">

			<header className="card-header">
				<h3>
					{props.title}
				</h3>
				<h5>Usuario: {props.name}</h5>
			</header>

			<main className="card-body">
				<p>{props.text}</p>

				<img src={props.image} alt={props.name} />
			</main>

			<footer className="likes card-footer">
				<span> Likes: {props.likes} </span>
				<button type="button" className="btn btn-outline-primary" onClick={props.onClick}>Like!</button>
				{localStorage.getItem("myUser") === props.name ?
					<>
					<button type="button" className="btn btn-outline-primary" onClick={props.onDelete}>Delete</button>
					<Link to={{
						pathname: '/editPost',
						post: props.post
					}}>
						<button type="button" className="btn btn-outline-primary">Editar</button>
					</Link> 
					</>: null}

			</footer>
		</article>
	);
}

Post.propTypes = {
	title: PropTypes.string,
	name: PropTypes.string,
	image: PropTypes.string,
	likes: PropTypes.number,
	text: PropTypes.string,
	onClick: PropTypes.func,
}

export default Post;