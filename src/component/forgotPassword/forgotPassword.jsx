import React from 'react';
import './forgotPassword.css'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import userService from '../../Services/userService';

const service = new userService();

export default class forgotPassword extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            email: "",
            emailErr: false,
            emailMsg: ""
        }
    }

    handleChange = (e) =>{
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    validate = () => {
        this.setState({
            emailErr: false,
            emailMsg: ""
        })

        let isValid = false

        let emailRegex = new RegExp(/^([A-Za-z0-9]){2,}([.]?)([A-Za-z0-9]){2,}@([a-z])+([.][a-z]{2,})+$/);
        if(this.state.email.length > 0 && !emailRegex.test(this.state.email)){
            this.setState({
                emailErr: true,
                emailMsg: 'Invlid Email'
            })
            isValid = true
        }

        if(this.state.email.length === 0){
            this.setState({
                emailErr: true,
                emailMsg: 'Email required'
            })
            isValid = true
        }
        return isValid;
    }

    submit = (e) =>{
        e.preventDefault();
        if(this.validate()){
            console.log('Action failed');
        }else{
            console.log('Successful', this.state.email);
            let userData = {
                "email": this.state.email,
            }
            service.forgotPassword(userData).then(data => {
                console.log(data);
                this.props.history.push('/resetPassword')
            }).catch(error => {
                console.log(error);
            })
        }
    }

    render(){
        return(
            <div className="parent3">
                 <div className="heading3">
                    <span className="l1">F</span>
                    <span className="l2">u</span>
                    <span className="l3">n</span>
                    <span className="l4">d</span>
                    <span className="l5">o</span>
                    <span className="l6">o</span>
                </div>
                <div className="heading4">
                    <div className="main1">
                        <span>
                            Find your email
                        </span>
                    </div>
                    <div className="sub-head">
                        <span>
                            Enter your recovery email
                        </span>
                    </div>
                </div>
                <div className="input">
                    <TextField
                        name="email" 
                        id="outlined-full-width" 
                        label="Phone number or email" 
                        fullWidth variant="outlined" 
                        onChange={this.handleChange}
                        error={this.state.emailErr}
                        helperText={this.state.emailMsg}
                    />
                </div>
                <div className="button-bottom1">
                    <Button onClick={this.submit} variant="contained" color="primary">Submit</Button>
                </div>
            </div>

        )
    }
}