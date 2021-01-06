import React from 'react';
import TextField from '@material-ui/core/TextField';
import './registration.css';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import 'fontsource-roboto';
import UserService from '../../Services/userService';
import { Link } from 'react-router-dom';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';

const service = new UserService();

export default class registration extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            firstName: "",
            firstNameErr: false,
            firstNameMsg: "",
            lastName: "",
            lastNameErr: false,
            lastNameMsg: "",
            email: "",
            emailErr: false, 
            emailMsg: "",
            password: "",
            passwordErr: false,
            passwordMsg: "",
            confirmPassword: "",
            confirmPasswordErr: false,
            confirmPasswordMsg: "",
            hidden: true,
            snackbarOpen: false,
            snackbarMsg: ""
        };
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleConfirmPasswordChange = this.handleConfirmPasswordChange.bind(this);
        this.toggleShow = this.toggleShow.bind(this);
        this.submit = this.submit.bind(this);
    }

    snackbarClose = (event) =>{
        this.setState({snackbarOpen:false})
    }

    handleChange = (e) => {
        e.preventDefault();
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    validate = () => {
        this.setState({
            firstNameErr: false,
            firstNameMsg: "",
            lastNameErr: false,
            lastNameMsg: "",         
            emailErr: false, 
            emailMsg: "",
            passwordErr: false,
            passwordMsg: "",
            confirmPasswordErr: false,
            confirmPasswordMsg: "",
        })

        let isValid = false

        const firstNameRegex = new RegExp(/^[A-Z]{1}[a-zA-Z]{2,}$/);
        if(this.state.firstName.length > 0 && !firstNameRegex.test(this.state.firstName)){
            this.setState({
                firstNameErr: true,
                firstNameMsg: 'First name Invalid'
            })
            isValid = true
        }

        if(this.state.firstName.length === 0 ){
            this.setState({
                firstNameErr: true,
                firstNameMsg: 'Required'
            })
            isValid = true
        }

        const lastNameRegex = new RegExp(/^[A-Z]{1}[a-zA-Z]{2,}$/);
        if(this.state.lastName.length > 0 && !lastNameRegex.test(this.state.lastName)){
            this.setState({
                lastNameErr: true,
                lastNameMsg: 'Last name invalid'
            })
            isValid = true
        }

        if(this.state.lastName.length === 0 ){
            this.setState({
                lastNameErr: true,
                lastNameMsg: 'Required'
            })
            isValid = true
        }

        const emailRegex = new RegExp(/^([A-Za-z0-9]){2,}([.]?)([A-Za-z0-9]){2,}@([a-z])+([.][a-z]{2,})+$/);
        if(this.state.email.length > 0 && !emailRegex.test(this.state.email)){
            this.setState({
                emailErr: true,
                emailMsg: 'Invalid Email'
            })
            isValid = true
        }

        if(this.state.email.length === 0 ){
            this.setState({
                emailErr: true,
                emailMsg: 'Required'
            })
            isValid = true
        }

        const passwordRegex = RegExp(/^(?=.+[0-9])(?=.+[a-z])(?=.+[!@#$%^&*])(?=.+[A-Z])(?=.*[a-zA-Z]).{8,}/);
        if(this.state.password.length > 0 && !passwordRegex.test(this.state.password)){
            this.setState({
                passwordErr: true,
                passwordMsg: 'Follow password rules'
            })
            isValid = true
        }

        if(this.state.password.length === 0){
            this.setState({
                passwordErr: true,
                passwordMsg: 'Required'
            })
            isValid = true
        }

        const confirmPasswordRegex = RegExp(/^(?=.+[0-9])(?=.+[a-z])(?=.+[!@#$%^&*])(?=.+[A-Z])(?=.*[a-zA-Z]).{8,}/);
        if(this.state.confirmPassword.length > 0 && !confirmPasswordRegex.test(this.state.confirmPassword)){
            this.setState({
                confirmPasswordErr: true,
                confirmPasswordMsg: "Follow password rules"
            })
            isValid = true
        }

        if(this.state.confirmPassword.length === 0){
            this.setState({
                confirmPasswordErr: true,
                confirmPasswordMsg: 'Required'
            })
            isValid = true
        }

        if(this.state.password !== this.state.confirmPassword){
            this.setState({
                confirmPasswordErr:true,
                confirmPasswordMsg: 'Password Mismatch'
            })
            isValid= true
        }

        return isValid;
    }

    submit = (event) =>{
        // event.preventDefault();
        if(this.validate()){
            console.log('Registration failed');
            
        }else{
           
            console.log('Registration Sucessful', this.state.firstName, this.state.lastName, this.state.email, this.state.password, this.state.confirmPassword);
            let userData = {
                "firstName" : this.state.firstName,
                "lastName" : this.state.lastName,
                "email" : this.state.email,
                "password": this.state.password,
                "service": "advanced"
            }
            service.registration(userData)
            .then(data => {
                
                console.log(data);
                this.props.history.push("/login");
                this.setState({snackbarOpen: true, snackbarMsg: 'Registered Successfully!'})
                
            })
            .catch(error =>{
                
                console.log(error);   
                this.setState({snackbarOpen: true, snackbarMsg: 'Failed!'})
            }) 
        }
    }

    handleConfirmPasswordChange(e){
        this.setState({ confirmPassword: e.target.value});
    }

    handlePasswordChange(e) {
        this.setState({ password: e.target.value });
        
    }
    
    toggleShow() {
        this.setState({ hidden: !this.state.hidden });
      }
    
    componentDidMount() {
        if (this.props.password) {
          this.setState({ password: this.props.password });
        }
        if (this.props.confirmPassword) {
            this.setState({confirmPassword: this.props.confirmPassword});
          }
      }

    

    render(){ 
        return (
            <div className="parent">
            <Snackbar
                // anchorOrigin={{vertical:'center', horizontal:'left'}}
                open = {this.state.snackbarOpen} 
                autoHideDuration = {3000}
                onClose = {this.snackbarClose}
                message ={<span id="message-id">{this.state.snackbarMsg}</span>}
                action={[
                    <IconButton
                        key="close"
                        arial-label="close"
                        color="inherit"
                        onClick={this.snackbarClose}
                    >
                        x
                    </IconButton>
                ]}
            />
                <div className="child1">
                    <div className="heading">  
                    <span className="letter1">F</span>
                    <span className="letter2">u</span>
                    <span className="letter3">n</span>
                    <span className="letter4">d</span>
                    <span className="letter5">o</span>
                    <span className="letter6">o</span>
                    </div>
                    <div className="textalign">
                        <span className="heading-second">Create your Fundoo Account</span>
                    </div>
                    <form onSubmit={this.submit}>
                        <div className="fields">
                                <TextField 
                                    type="text"
                                    className="mr" 
                                    id="outlined-basic" 
                                    label="First name" 
                                    variant="outlined" 
                                    size="small" 
                                    name="firstName" 
                                    onChange={this.handleChange}
                                    error={this.state.firstNameErr}
                                    helperText={this.state.firstNameMsg}

                                />    
                            <div className="mr2">    
                                <TextField
                                    className="second-field" 
                                    type="text"
                                    id="outlined-basic" 
                                    label="Last name" 
                                    variant="outlined" 
                                    size="small" 
                                    name="lastName"
                                    onChange={this.handleChange}
                                    error={this.state.lastNameErr}
                                    helperText={this.state.lastNameMsg}
                                />                            
                            </div>    
                        </div>
                        <div className="fields email-content">
                            <TextField 
                                id="outlined-full-width" 
                                label="Your email address" 
                                fullWidth variant="outlined" 
                                size="small" 
                                helperText="You can use letters, numbers & periods" 
                                name="email"
                                onChange={this.handleChange}
                                error={this.state.emailErr}
                                helperText={this.state.emailMsg}
                            />
                            <div>
                                <small>You can use letters, numbers & periods</small>
                            </div>
                        </div>                        
                        <div className="fields">   
                                <TextField 
                                    className="mr" 
                                    type={this.state.hidden ? 'text' : 'password'}
                                    id="outlined-basic" 
                                    label="Password" 
                                    variant="outlined"
                                    size="small" 
                                    name="password"
                                    onChange={this.handleChange}
                                    error={this.state.passwordErr}
                                    helperText={this.state.passwordMsg}
                                    value={this.state.password}
                                    onChange={this.handlePasswordChange}
                                />                         
                            <div className="mr2">    
                                <TextField
                                    className="second-field"                                    
                                    id="outlined-basic" 
                                    type={this.state.hidden ? 'text' : 'password'}
                                    label="Confirm" 
                                    variant="outlined" 
                                    size="small" 
                                    name="confirmPassword"
                                    onChange={this.handleChange}
                                    error={this.state.confirmPasswordErr}
                                    helperText={this.state.confirmPasswordMsg}
                                    value={this.state.confirmPassword}
                                    onChange={this.handleConfirmPasswordChange}
                                />                            
                            </div>    
                        </div>
                        <div className="password">
                            <span>
                                Use 8 or more characters with a mix of letters, numbers & symbols
                            </span>
                        </div>
                        <div className="checkbox">
                            <div>
                                <Checkbox
                                    className="checkbox"
                                    defaultChecked
                                    color="primary"
                                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                                    onClick={this.toggleShow}
                                />
                            </div>
                            <div>
                                <span>Show password</span>
                            </div>
                        </div>
                        <div className="button">
                            <Button component={Link} to="/login" href="#text-buttons" color="primary" >
                                Sign in instead
                            </Button>                
                            <Button type="submit" className="submit-btn" variant="contained" color="primary" onClick={this.submit}>
                                submit
                            </Button>
                            <Snackbar />
                        </div>   
                    </form>
                </div>
                <div className="child2">
                    <div>
                        <img src="/images/account.svg" alt=""  width="244" height="244" />
                    </div>
                </div>
            </div>
            
        );
    }   
}


