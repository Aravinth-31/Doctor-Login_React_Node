import React from 'react';
import './login.css';
import axios from 'axios';

class Login extends React.Component {
    constructor(props){
        super(props);
        this.state={
            username:'',
            password:''
        };
    }
    onChangeHandler = e=>{
        this.setState({
            [e.target.name]:e.target.value
        });
    }
    login = (event) =>{
        event.preventDefault();
        var obj={
        username:this.state.username,
        password:this.state.password
        }
        axios.post('http://localhost:3000/login',obj)
        .then(resp =>{
            if(resp.data.message==='Success')
                window.location.replace('http://localhost:3001/#/home');
            else
                alert(resp.data.message);
        })
        .catch(err=>{
            console.log(err);
        })
    }
    render() {
        return (
            <div className="App">
                <form onSubmit={(e)=>this.login(e)}>
                    <h1>Sign In</h1>
                        <label>Email:</label>
                        <input type="email" id="mail" name="username" onChange={this.onChangeHandler} required />
                        <label>Password:</label>
                        <input type="password" id="password" name="password" onChange={this.onChangeHandler} required />
                        <button onClick={this.login}>Sign In</button>
                    <p>Don't have an account <a href="http://localhost:3001/#/signup">SignUp</a></p>
                </form>
            </div>
        );
    }
}

export default Login;