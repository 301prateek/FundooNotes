import React from 'react';
import './resetPassword.css';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import userService from '../../Services/userService';

const service = new userService();

export default class resetPassword extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            password: "",
            passwordErr: false,
            passwordMsg: "",
            confirmPassword: "" ,
            confirmPasswordErr: false,
            confirmPasswordMsg: "" ,
        }
    }

   
    // componentDidMount = () => {
    //     console.log(this.props.match.params.token);
    // }

    handleChange = (e) =>{
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    validate = () =>{
        this.setState({
            passwordErr: false,
            passwordMsg: "",
            confirmPasswordErr: false,
            confirmPasswordMsg: "" ,
        })

        let isValid = false

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

    token = this.props.match.params.token;
    submit = (e) =>{
        e.preventDefault();
        if(this.validate()){
            console.log('Reset failed');
        }else{
            console.log('Reset password successful', this.state.password, this.state.confirmPassword);
            let userData = {
                "newPassword": this.state.password
               
            }
            service.resetPassword(userData, this.token).then(data => {
                console.log(data);
                this.props.history.push('/login')
            }).catch(error => {
                console.log(error);
            })
        }
    }

    render(){
        return(
            <div className="main-container">
                 <div className="header1">
                    <span className="l1">F</span>
                    <span className="l2">u</span>
                    <span className="l3">n</span>
                    <span className="l4">d</span>
                    <span className="l5">o</span>
                    <span className="l6">o</span>
                </div>
                <div className="header2">
                    <span>Reset password</span>
                </div>
                <div className="inputs">
                    <TextField 
                        type="password"
                        name="password"
                        id="outlined-full-width" 
                        label="New Password" 
                        fullWidth variant="outlined"
                        onChange={this.handleChange}
                        error={this.state.passwordErr} 
                        helperText={this.state.passwordMsg}
                    />
                    <div className="text-field">
                        <TextField 
                            type="password"
                            name="confirmPassword"
                            id="outlined-full-width" 
                            label="Confirm Password" 
                            fullWidth variant="outlined"
                            onChange={this.handleChange}
                            error={this.state.confirmPasswordErr} 
                            helperText={this.state.confirmPasswordMsg} />
                    </div>
                </div> 
                <div className="reset-button">
                    <Button type="submit" onClick={this.submit} variant="contained" color="primary">Reset</Button>
                </div>   

            </div>

        )
    }
}