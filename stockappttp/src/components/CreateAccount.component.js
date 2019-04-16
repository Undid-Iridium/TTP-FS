import React, { Component } from 'react';
import axios from 'axios';
import '../App.css'; 
export default class createaccount extends Component {

    constructor(props) {
        super(props);

        this.onChangecreateaccountUser = this.onChangecreateaccountUser.bind(this);
        this.onChangecreateaccountPassword = this.onChangecreateaccountPassword.bind(this);
        this.onChangecreateaccountEmail = this.onChangecreateaccountEmail.bind(this);
        //this.onChangecreateaccountPriority = this.onChangecreateaccountPriority.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            createaccount_User: '',
            createaccount_Password: '',
            createaccount_Email: '',
            createaccount_Balance: 5000,
            //createaccount_priority: '',
            createaccount_completed: false
        }
    }

    onChangecreateaccountUser(e) {
        this.setState({
            createaccount_User: e.target.value
        });
    }
    
    onChangecreateaccountEmail(e) {
        this.setState({
            createaccount_Email: e.target.value
        });
    }

    onChangecreateaccountPassword(e) {
        this.setState({
            createaccount_Password: e.target.value
        });
    }

    //onChangecreateaccountPriority(e) {
    //    this.setState({
    //        createaccount_priority: e.target.value
    //    });
    //}
    
    validateForm() {
      return this.state.createaccount_Email.length > 0 && this.state.createaccount_Password.length > 0;
    }

    onSubmit(e) {
        e.preventDefault();
        
        console.log(`Form submitted:`);
        console.log(`createaccount User: ${this.state.createaccount_User}`);
        console.log(`createaccount Password: ${this.state.createaccount_Password}`);
        console.log(`createaccount Email: ${this.state.createaccount_Email}`);
        //console.log(`createaccount Priority: ${this.state.createaccount_priority}`);
        const newLogin = {
            User: this.state.createaccount_User,
            Email: this.state.createaccount_Email,
            Password: this.state.createaccount_Password,
            Balance: this.state.createaccount_Balance
            //completed: this.state.createaccount_completed
        };
        console.log(newLogin.User);
        /*axios.get('http://localhost:5000/dbRoute/addToDB', newLogin)
            .then(res => console.log(res.data));*/
            
        axios.post('http://localhost:5000/dbRoute/addToDB', newLogin).then(res => console.log(res.data));    
            
        this.setState({
            createaccount_User: '',
            createaccount_Password: '',
            createaccount_Email: '',
            //createaccount_priority: '',
            createaccount_completed: false
        })
    }

    render() {
        return (
            <div style={{marginTop: 10}}>
                <h3 className = "App big white-box">Create Account</h3>
                <div className = "white-box-Upper">
                <form onSubmit={this.onSubmit}>
                    <div className="form-group App"> 
                        <label>Username: </label>
                        <input  type="text"
                                className="form-control center_div"
                                value={this.state.createaccount_User}
                                onChange={this.onChangecreateaccountUser}
                                style={{ width: '500px'}}
                                />
                    </div>
                    <div className="form-group App">
                        <label>Email: </label>
                        <input 
                                type="text" 
                                className="form-control center_div"
                                value={this.state.createaccount_Email}
                                onChange={this.onChangecreateaccountEmail}
                                style={{ width: '500px'}}
                                />
                    </div>
                    <div className="form-group App">
                        <label>Password: </label>
                        <input 
                                type="text" 
                                className="form-control center_div"
                                value={this.state.createaccount_Password}
                                onChange={this.onChangecreateaccountPassword}
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
                                    checked={this.state.createaccount_priority==='Low'} 
                                    onChange={this.onChangecreateaccountPriority}
                                    />
                            <label className="form-check-label">Low</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input  className="form-check-input" 
                                    type="radio" 
                                    name="priorityOptions" 
                                    id="priorityMedium" 
                                    value="Medium" 
                                    checked={this.state.createaccount_priority==='Medium'} 
                                    onChange={this.onChangecreateaccountPriority}
                                    />
                            <label className="form-check-label">Medium</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input  className="form-check-input" 
                                    type="radio" 
                                    name="priorityOptions" 
                                    id="priorityHigh" 
                                    value="High" 
                                    checked={this.state.createaccount_priority==='High'} 
                                    onChange={this.onChangecreateaccountPriority}
                                    />
                            <label className="form-check-label">High</label>
                        </div>
                    </div>*/}

                    <div className="form-group App">
                        <input type="submit" value="Create Account" className="btn btn-primary"  disabled={!this.validateForm()}/>
                    </div>
                </form>
               </div>
            </div>
        )
    }
}
