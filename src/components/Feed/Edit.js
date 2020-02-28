import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'

const initState = {
    _id:"",
    title: "",
    user: "",
    text: "",
    likes: 0,
    image: "",
}

class EditPost extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ...initState,
        }
        if(!this.props.location.post){
            console.log("No hay post para editar")
            this.props.history.push('/');
        }

        
    }
    componentDidMount(){
        this.setState({user:localStorage.getItem("token")});
        const post = this.props.location.post;
        this.setState({...post})
        //console.log(post)
    }

    submitHandler = event => {
        event.preventDefault();

        const user=localStorage.getItem("token");

        const content = {
            _id:this.state._id,
            title:this.state.title,
            text:this.state.text,
            image:this.state.image,
        }

        console.log(content);

        let config = {
            method: 'PUT',
            headers: {
                'Content-type': 'Application/json',
                'Authorization':`Bearer ${user}`
            },
            body: JSON.stringify(content),
        };

        fetch('https://reactcourseapi.herokuapp.com/post', config)
            .then(res => {
                if (res.ok) {
                    res.json()
                        .then(data => {
                            this.setState({ ...initState })
                            alert("Se ha publicado con exito")
                            this.props.history.push('/')
                        })
                } else {
                    this.setState({
                        errorFlag: true,
                    })
                }
            })
            .catch(err=>{
                console.log(err);
            })
    }

    changeHandler = (event) => {
        this.setState({
            [event.target.id]: event.target.value,
        })
    }

    render() {
        return (
            <div className="full-centered">
                <div className="jumbotron">
                    <h1 className="display-3">Edit your Post</h1>

                    <form onSubmit={this.submitHandler}>
                        <div className="form-group">
                            <label>Title:
								<input
                                    className="form-control"
                                    type="text"
                                    id="title"
                                    onChange={this.changeHandler}
                                    value={this.state.title} />
                            </label>

                            <label>Text:
								<input
                                    className="form-control"
                                    type="text"
                                    id="text"
                                    onChange={this.changeHandler}
                                    value={this.state.text} />
                            </label>
                            <label>Image:
								<input
                                    className="form-control"
                                    type="text"
                                    id="image"
                                    onChange={this.changeHandler}
                                    value={this.state.image} />
                            </label>
                        </div>
                        <button className="btn btn-primary" type="submit">Post</button>
                    </form>
                    {this.state.errorFlag &&
                        <div className="alert alert-dismissible alert-danger">
                            <strong>Oh snap!</strong> Hubo un error al publicar en la app.
						</div>
                    }
                </div>
            </div>
        );
    }
}

export default withRouter(EditPost)