import React from 'react';
import './login.css';
import axios from 'axios';

class Home extends React.Component {
    constructor(props){
        super(props);
        this.onFileChange=this.onFileChange.bind(this);
        this.sendMail=this.sendMail.bind(this);
        this.state={
            selectedFile:'',
            to_user:'',
            to_subject:''
        };
    }
    onFileChange = e =>{
        this.setState({selectedFile:e.target.files[0]});
    }
    onChangeHandler = e=>{
        this.setState({
            [e.target.name]:e.target.value
        });
    }

    sendMail = (e) =>{
        e.preventDefault();
        const formData = new FormData();
        formData.append('to_file',this.state.selectedFile);
        formData.append('to_user',this.state.to_user);
        formData.append('to_subject',this.state.to_subject);
        var obj={
            headers: { 'content-type': 'multipart/form-data' },
            to_user:this.state.to_user,
            to_subject:this.state.to_subject
        };
        alert("This may take a minute please wait");
        axios.post('http://localhost:3000/sendmail',formData,obj)
        .then(resp =>{
            if(resp.data.message==='Success')
                alert("Email Sent Successfully");
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
                <form onSubmit={(e)=>this.sendMail(e)}>
                    <h1>Send Prescription</h1>
                    <legend>Contents to recipient</legend>
                    <p>Before sending your email using this website you have to allow non secure apps to access gmail you can do this by going to your gmail settings <a href="https://myaccount.google.com/lesssecureapps">here</a>.</p>
                    <label >To:</label>
                    <input type="email" name="to_user" id="to_user" onChange={this.onChangeHandler} required />
                    <label >File:</label>
                    <input type='file' id="to_file" accept='image/*,.pdf' onChange={this.onFileChange}/>
                    <label >Subject:</label>
                    <input type="text" name="to_subject" id="to_subject" onChange={this.onChangeHandler}/>
                    <button type="submit">Send It</button>
                </form>
            </div>
        );
    }
}

export default Home;