import React from 'react';
import './login.css';
import axios from 'axios';

class Signup extends React.Component {
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
    signUp = (e)=>{
        e.preventDefault();
        var obj={
        username:this.state.username,
        password:this.state.password
        }
        axios.post('http://localhost:3000/signup',obj)
        .then(resp =>{
            if(resp.data.message==='Success')
                window.location.replace('http://localhost:3001/#/login');
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
                <form onSubmit={(e)=>this.signUp(e)}>
                    <h1>Sign Up</h1>
                    <legend>Your basic info</legend>
                    <label >Name:</label>
                    <input type="text" id="name" name="user" required />
                    <label >Email:</label>
                    <input type="email" id="mail" name="username" onChange={this.onChangeHandler} required />
                    <label>Password:(Provide as same as the email password)</label>
                    <input type="password" id="password" name="password" onChange={this.onChangeHandler} required />
                    <button type="submit">Sign Up</button>
                </form>
            </div>
        );
    }
}

export default Signup;