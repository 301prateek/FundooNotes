import React from 'react'
import './login.css'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import userService from '../../Services/userService';
import { Link } from 'react-router-dom';
// import auth from './component/authentication/auth';

const service = new userService();

export default class login extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            email: "",
            emailErr: false,
            emailMsg: "",
            password: "",
            passwordErr: false,
            passwordMsg: "",
            // authenticated: false,
        }
    }

    // isAuthenticated(){
    //     return this.authenticated;
    // };

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });    
    }    

    validate = () =>{

        this.setState({
            emailErr: false, 
            emailMsg: "",
            passwordErr: false,
            passwordMsg: "",
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

        let passwordRegex = RegExp(/^(?=.+[0-9])(?=.+[a-z])(?=.+[!@#$%^&*])(?=.+[A-Z])(?=.*[a-zA-Z]).{8,}/);
        if(this.state.password.length > 0 && !passwordRegex.test(this.state.password)){
            this.setState({
                passwordErr: true,
                passwordMsg: 'Follow Password Rules'
            })
            isValid = true
        }

        if(this.state.password.length === 0){
            this.setState({
                passwordErr: true,
                passwordMsg: 'Password required'
            })
            isValid = true
        }
        return isValid;
    }

    submit = (e) =>{
        e.preventDefault();
        if(this.validate()){
            console.log('login failed');
        }else{
            console.log('login successful', this.state.email, this.state.password);
            let userData = {
                "email": this.state.email,
                "password": this.state.password,
            }
            service.login(userData).then(data => {
                console.log(data);
                localStorage.setItem('userToken', data.data.id);
                localStorage.setItem('email', data.data.email);
                this.props.history.push('/dashboard');
                // this.authenticated = true;
                
            }).catch(error => {
                console.log(error);
            })
        }
    }

    render(){
        return(
            <div className="parent1">
                 <div className="heading1">
                    <span className="l1">F</span>
                    <span className="l2">u</span>
                    <span className="l3">n</span>
                    <span className="l4">d</span>
                    <span className="l5">o</span>
                    <span className="l6">o</span>
                </div>
                <div className="heading2">
                    <div className="main">
                        <span>
                            Sign in
                        </span>
                    </div>
                    <div className="message">
                        <span>
                            Use your Fundoo account
                        </span>
                    </div>
                </div>
                <div className="input" >
                    <form>
                        <TextField 
                            type="text"
                            id="outlined-full-width" 
                            label="Email or phone" 
                            fullWidth variant="outlined" 
                            name="email"
                            onChange={this.handleChange}
                            error={this.state.emailErr}
                            helperText={this.state.emailMsg}
                        />
                        <div className="text-field">
                            <TextField 
                                type="password"
                                className="margin" 
                                id="outlined-full-width" 
                                label="Password" 
                                fullWidth variant="outlined" 
                                name="password"
                                onChange={this.handleChange}
                                error={this.state.passwordErr}
                                helperText={this.state.passwordMsg}
                            />
                        </div>
                        <div className="button">
                            <Button  component={Link} to="/forgotPassword" color="primary">Forgot password?</Button>
                        </div>
                        <div className="button-bottom">
                            <Button  component={Link} to="/registration" color="primary">Create Account</Button>
                            <Button 
                                type="submit" 
                                variant="contained" 
                                color="primary"
                                onClick={this.submit}>
                                    Login
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

