import React, { Component } from 'react';
import axios from 'axios';

export default class SignIn extends Component {

    constructor(props) {
        super(props);

        this.onChangeSignInUser = this.onChangeSignInUser.bind(this);
        this.onChangeSignInpassword = this.onChangeSignInpassword.bind(this);
        //this.onChangeSignInPriority = this.onChangeSignInPriority.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            SignIn_User: '',
            SignIn_password: '',
            //SignIn_priority: '',
            SignIn_completed: false
        }
    }

    onChangeSignInUser(e) {
        this.setState({
            SignIn_User: e.target.value
        });
    }

    onChangeSignInpassword(e) {
        this.setState({
            SignIn_password: e.target.value
        });
    }

    //onChangeSignInPriority(e) {
    //    this.setState({
    //        SignIn_priority: e.target.value
    //    });
    //}

    onSubmit(e) {
        e.preventDefault();
        
        console.log(`Form submitted:`);
        console.log(`SignIn User: ${this.state.SignIn_User}`);
        console.log(`SignIn password: ${this.state.SignIn_password}`);
        //console.log(`SignIn Priority: ${this.state.SignIn_priority}`);
        const newLogin = {
            User: this.state.SignIn_User,
            Password: this.state.SignIn_password,
            completed: this.state.SignIn_completed
        };
        console.log(newLogin.User);
        /*axios.get('http://localhost:5000/dbRoute/addToDB', newLogin)
            .then(res => console.log(res.data));*/
            
        axios.get('http://localhost:5000/dbRoute/db', {
            params: {
                username : newLogin.User,
                password : newLogin.Password
            }
        }).then(res => console.log(res.data));    
            
        this.setState({
            SignIn_User: '',
            SignIn_password: '',
            //SignIn_priority: '',
            SignIn_completed: false
        })
    }

    render() {
        return (
            <div>
                <div style={{marginTop: 10}}>
                    <h3 class = "App big white-box">Sign in</h3>
                     <div class = "white-box-Upper">
                       <form onSubmit={this.onSubmit}>
                            <div className="form-group App "> 
                                <label>Email: </label>
                                <input  type="text"
                                        className="form-control center_div"
                                        value={this.state.SignIn_User}
                                        onChange={this.onChangeSignInUser}
                                        style={{ width: '500px'}}
                                        
                                        />
                            </div>
                            <div className="form-group App">
                                <label>Password: </label>
                                <input 
                                        type="password" 
                                        className="form-control center_div"
                                        value={this.state.SignIn_password}
                                        onChange={this.onChangeSignInpassword}
                                        style={{ width: '500px'}}
                                        />
                            </div>
                            {/*<div className="form-group">
                                <div className="form-check form-check-inline">
                                    <input  className="form-check-input" 
                                            type="radio" 
                                            name="priorityOptions" 
                                            id="priorityLow" 
                                            value="Low"
                                            checked={this.state.SignIn_priority==='Low'} 
                                            onChange={this.onChangeSignInPriority}
                                            />
                                    <label className="form-check-label">Low</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input  className="form-check-input" 
                                            type="radio" 
                                            name="priorityOptions" 
                                            id="priorityMedium" 
                                            value="Medium" 
                                            checked={this.state.SignIn_priority==='Medium'} 
                                            onChange={this.onChangeSignInPriority}
                                            />
                                    <label className="form-check-label">Medium</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input  className="form-check-input" 
                                            type="radio" 
                                            name="priorityOptions" 
                                            id="priorityHigh" 
                                            value="High" 
                                            checked={this.state.SignIn_priority==='High'} 
                                            onChange={this.onChangeSignInPriority}
                                            />
                                    <label className="form-check-label">High</label>
                                </div>
                            </div>*/}

                            <div className="form-group App">
                                <input type="submit" value="Login" className="btn btn-primary" />
                            </div>
                       </form>
                     </div>
                </div>
               </div>
        )
    }
}
