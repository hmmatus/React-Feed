import React, { Component } from 'react';
import {withRouter} from 'react-router-dom'

class SplashScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
        }
    }
    verifyToken = async (token) => {
        let config = {
            method: "GET",
            headers: {
                authorization: `Bearer ${token}`
            }
        }
        fetch('https://reactcourseapi.herokuapp.com/verifytoken', config)
            .then(res => {
                if (res.ok) {
                    //this.props.history.push("/feed")
                    this.setState({loading:false})
                }
                else {
                    this.props.history.push("/login")
                }
            })
    }

    //Components zone
    componentDidMount() {
        const token = localStorage.getItem("token");
        if (token) {
            this.verifyToken(token);
        }
        else {
            this.props.history.push("/login")
        }
    }

    render() {
        const splash =(
            <div className="full-center">
                <h1>Cargando lince...</h1>
            </div>)
        return (
            this.state.loading?splash:this.props.children
        )
    }
}

export default withRouter(SplashScreen);