import React, { Component } from 'react';
import Post from './Post'
import { withRouter,Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import NewPost from '../Forms/new_post'
import EditPost from '../Forms/new_post'
import swal from 'sweetalert'

class ReactFeed extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
      token: localStorage.getItem('token'),
      myUser:""
    }
  }

  likeHandler = index => {
    let postsAux = [...this.state.posts];

    postsAux[index].likes += 1;

    const config = {
      method: "PUT",
      headers: {
        'Content-type': 'Application/json',
        authorization: `Bearer ${this.state.token}`
      },
      body: JSON.stringify(postsAux[index])
    }

    fetch('https://reactcourseapi.herokuapp.com/post/like', config)
      .then(res => { this.fetchData() })

  }

  fetchData = () => {
    let config = {
      method: "GET",
      headers: {
        'Content-type': 'Application/json',
        authorization: `Bearer ${this.state.token}`
      }
    }

    fetch('https://reactcourseapi.herokuapp.com/post/', config)
      .then(res => res.json())
      .then(data => {
        this.setState({
          posts: data.filteredPosts
        })

      })
  }

  editHandler=item=>{
    swal()
  }

  deleteHandler = (element, index) => {
    window.confirm('Seguro que deseas borrar este post') && this.deleteItem(element, index);
  }
  deleteItem = (id, index) => {

    const data = {
      _id: id
    }
    let config = {
      method: "DELETE",
      headers: {
        'Content-type': 'Application/json',
        authorization: `Bearer ${this.state.token}`
      },
      body: JSON.stringify(data)
    }

    fetch('https://reactcourseapi.herokuapp.com/post', config)
      .then(res => {
        if (res.ok) {
          alert("Se ha borrado con exitos el post")
          this.fetchData()
        }
        else{
          throw new Error(res.status)
        }
      })
      .catch(err=>{
        console.log(err)
      })

    //alert("Deleted");
  }

  getUserId=async ()=>{
    console.log(this.state.token);
    let config = {
      method: "GET",
      headers: {
        'Content-type': 'Application/json',
        authorization: `Bearer ${this.state.token}`
      },
    }
    const user=await fetch("https://reactcourseapi.herokuapp.com/user/name",config)
    .then(res=>res.json())
    .then(data=>data.username)
    localStorage.setItem("myUser",user);
  }

  loggoutSession = () => {
    console.log(localStorage.getItem('token'))
    localStorage.clear()
    console.log(localStorage.getItem('token'))
    this.props.history.push('/login')
  }

  componentDidMount() {
    this.fetchData();
    this.getUserId();
  }

  render() {
    
    const postsComponents = this.state.posts.map((post, index) => {

      return (<Post
        key={index}
        name={post.user}
        likes={post.likes}
        title={post.title}
        text={post.text}
        image={post.image}
        post={post}
        onClick={() => this.likeHandler(index)}
        onDelete={() => this.deleteHandler(post._id, index)}
      />);

    });

    return (
      <div className="container">
        <Helmet>
          <title>React Feed</title>
        </Helmet>
        <h1 className="display-3">ReactFeed</h1>
        <NewPost reload={()=>this.fetchData()} />
        <h2>Recent posts</h2>
        <button onClick={this.loggoutSession}>Cerrar sesion!</button>
        <div className="posts">
          {postsComponents}
        </div>
      </div>
    );
  }
}

export default withRouter(ReactFeed);
