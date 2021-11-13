import React from 'react'
import '../Style/Header.css'
import Modal from "react-modal";
import GoogleLogin from 'react-google-login';
import {withRouter } from "react-router";



const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        height: '80%',
        backgroundColor: 'gainsboro'

    },
};



class Header extends React.Component {
    constructor() {
        super();
        this.state = {
            loginModalIsOpen: false,
            LoginInUserName: undefined,
            LoggedIn: false
        }

    }

    handleCloseModal = () => {
        this.setState({ loginModalIsOpen: false })
    }

    handleLogin = () => {
        this.setState({ loginModalIsOpen: true })
    }

    responseGoogle = (response) => {
        console.log(response);
        this.setState({ LoggedIn: true, LoginInUserName: response.profileObj.givenName, loginModalIsOpen: false })
    }

    handleLogoClick=()=>{
        this.props.history.push('/')
    }
    handleLogout=()=>{
        this.setState({LoggedIn:false,LoginInUserName:undefined})
    }


    render() {
        const { loginModalIsOpen, LoggedIn, LoginInUserName } = this.state
        return (
            <div className="container-fluid upper_box">

                <div className="row">
                    <div className=" col-lg-3 col-md-3 col-sm-3">
                        <div className="logo_header" onClick={this.handleLogoClick}><b>e!</b></div>
                    </div>
                
               
                    <div className="col-lg-9 col-md-9 col-sm-9 Log_box" >
                        {LoggedIn ?
                            <>
                               
                                <div className="Create_account" onClick={this.handleLogout}>Logout</div>
                                <div className="Login"> {LoginInUserName}</div></>
                            :
                            <>
                                
                                <div className="Create_account">Create account </div> 
                                <div className="Login" onClick={this.handleLogin}>Login</div></>}
                    </div>
                
                </div>

                <Modal
                    isOpen={loginModalIsOpen}
                    style={customStyles}>

                    <div className="fas fa-times cross " onClick={() => this.handleCloseModal('loginModalIsOpen', false)}></div>
                    <div>Hi this is login modal</div>
                    <div>
                        <GoogleLogin
                            clientId="608780469074-0aa36vbjrotcms740d1gvap5l4m2dnav.apps.googleusercontent.com"
                            buttonText="Login with google"
                            onSuccess={this.responseGoogle}
                            onFailure={this.responseGoogle}
                            cookiePolicy={'single_host_origin'}
                        />
                    </div>
                </Modal>
            </div>







        )
    }
}

export default withRouter(Header)