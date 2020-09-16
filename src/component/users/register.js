/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useHistory } from "react-router-dom";
import * as js from '../common/color.json';
import Countdown from 'react-countdown';

import  { CountdownCircleTimer } from 'react-countdown-circle-timer';

import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import FacebookIcon from '@material-ui/icons/Facebook';
import cookies from 'universal-cookie';

import CloseOutlined from '@material-ui/icons/CloseOutlined';

import { withStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Divider, Container } from '@material-ui/core';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Paper from '@material-ui/core/Paper';

import TextField from '@material-ui/core/TextField';
import Notification from '../common/notification'

import queryString from 'querystring';

import * as api from '../../api/user'

import './fb.css'

const Cookies = new cookies();


export const HomeContext = React.createContext()
export const LoginContext = React.createContext()

const CLIENT_ID = '303261768201-l8c6ojtlvgcees3e94gcs11pq7fns0a8.apps.googleusercontent.com';

const CssTextField = withStyles({
    root: {
      '& label.Mui-focused': {
        color: 'grey',
      },
      '& .MuiInput-underline:after': {
        borderBottomColor: 'green',
      },
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: 'red',
        },
        '&:hover fieldset': {
          borderColor: 'yellow',
        },
        '&.Mui-focused fieldset': {
          borderColor: 'green',
        },
      },
    },
  })(TextField);

export default function Register(props) {
    const history = useHistory()

    const [openVerify, setVerify] = React.useState(false);

 

    const [viewLogin, setView] = React.useState(false);


    const [email, setmail] = React.useState('');
    const [password, setpassword] = React.useState('');
    const [password2, setpassword2] = React.useState('');
 

    const [number, setnumber] = React.useState('');
    const [refer, setReferral] = React.useState('');
    const [code, setVerifyCode] = React.useState('');
    const [verifyId, setVerifyId] = React.useState('');
 

    const [message, setmessage] = React.useState('');
     const [openB, setopen] = React.useState(false);
 

    const [dt, setCountDown] = React.useState(0);

    const [type, setType] = React.useState('info')

    const [refCode, setrefCode] = React.useState('')

    const [expired, setCodeexpired] = React.useState(true)


    useEffect(() => {
        const parsed = queryString.parse(props.location.search);
         setReferral(parsed['?ref']);
         setrefCode(parsed['?ref']);

         if(localStorage.getItem('isLogged') === 'true'){
             history.push('/')
         }
    },[])
    const handleClickVerifyClose = () => {
        setVerify(false);
        setCodeexpired(true)
    };



    const setEmail = (mail) => {
        setmail(mail)
    }

    const setPhoneNumber = (number) => {
        let kk = parseInt(number);

        if(isNaN(kk)){
            setmessage("Must be a number")
            setopen(true)
            return
        }

        setnumber(number)
    }

    const setPassword = (password) => {
        setpassword(password)
    }

    const setRefer = (text) => {
        setReferral(text)
    }

    const setCode = (text) => {
        console.log(text);

        setVerifyCode(text)
    }


    const register = () => {


        api.signup({
            email: email,
            password: password,
            phone: number,
            countryCode: '+91',
            refferCode: refer,
            loginType: 1,
            facebookId: ''
        }).then(response => {
            console.log(response);
            setCountDown(120)
            setCodeexpired(false)
            if (response.status === 200) {
                setVerify(true);
                setVerifyId(response.data.userId)
                 return
            }
            setmessage(response.data.message)
            setopen(true)
            setType('error')

        }).catch(err => {
            console.log(err);

            if (err && err.response) {
                console.log(err.response);

                setmessage(err.response.message)
                setopen(true)
            }
        })
    }

    const googleLogin = (event) => {
        let obj = {
            email: event.profileObj.email,
            loginType: 3,
            googleId: event.profileObj.googleId,
            fullName: event.profileObj.name,
            profilePic: event.profileObj.imageUrl
        }
        api.login({
            ...obj
        }).then(response => {
            setCountDown(120)
            setCodeexpired(false)

            if (response.status === 200) {
                if (response.data.new) {
                    setView(true)
                    setVerifyId(response.data.userId)

                } else {
                    Cookies.set('token', response.data.token);
                    localStorage.setItem('isLogged', true);
                    localStorage.setItem('_ftoken', response.data.refToken);


                    setmessage(response.data.message)
                    setopen(true)
                    setType('success')

                    window.location.reload()
                }

            } else {
                setmessage(response.data.message)
                setopen(true)
                setType('error')
            }

        })
    }

    const fbLogin = (event) => {
        let obj = {
            email: event.email,
            loginType: 2,
            facebookId: event.id,
            fullName: event.name,
            profilePic: event.picture.data.url
        }
        api.login({
            ...obj
        }).then(response => {

            if (response.status === 200) {
                if (response.data.new) {
                    setView(true)
                    setVerifyId(response.data.userId)

                } else {
                    Cookies.set('token', response.data.token);
                    localStorage.setItem('isLogged', true);
                    localStorage.setItem('_ftoken', response.data.refToken);



                    setmessage(response.data.message)

                    setType('success')


                }

            } else {
                setmessage(response.data.message)
                setopen(true)
                setType('error')
            }

        })

    }

    const handleClickLoginClose = () => {
        setView(false);
        setCodeexpired(true)

    };

    const confirmOtp = () => {
        if(password2 !== password){
            setmessage("Password does not match");
            setopen(true)
            setType('error')
            return
        }

        api.resendOTP({
            phone: number,
            type:3,
            password,
            verifyId:verifyId
        }).then(response => {

            if (response.status === 200 ) {
                if(response.data.new){
                    setView(false)
                    setVerify(true);
                    setVerifyId(response.data.userId)
                     

                }else{
                    Cookies.set('token', response.data.token);
                    localStorage.setItem('isLogged', true);
                    localStorage.setItem('_ftoken', response.data.refToken);
    
                    console.log(typeof localStorage.getItem('isLogged'));
    
                    setmessage(response.data.message)
                    setopen(true)
                    setType('success')
 
                 }

            }else{
                setmessage(response.data.message)
                setopen(true)
                setType('error')
            }

        })
    }

    const resendOTP = (type) => {
        if(!expired){
            setmessage("Wait 120 seconds to resend OTP");
            setopen(true)
            setType('info')
            return
        }
        setCountDown(120)
        setCodeexpired(false)

        api.resendOTP({
            verifyId,
            number,
            type: type ? type : 1 // resendOTP
        }).then(response => {
            console.log(response);
 
        })
    }

    const verify = (type) => {
        if (type === 2) {
            api.verifyOTP({
                type: 2,
                id: verifyId,
                code: code
            }).then(response => {
                console.log(response);

                if (response.status === 200) {
                    Cookies.set('token', response.data.token);
                    localStorage.setItem('isLogged', true);
                    localStorage.setItem('_ftoken', response.data.refToken);
                    setmessage(response.data.message);
                    setopen(true)
                    setType('success')
                    setVerify(false);
                    window.location.reload()
                } else {
                    setmessage(response.data.message);
                    setopen(true)
                    setType('error')
                }
            })
        } else {
            api.verifyOTP({
                type: 1,
                id: verifyId,
                code: code
            }).then(response => {
                console.log(response);

                if (response.status === 200) {
                    Cookies.set('token', response.data.token);
                    localStorage.setItem('isLogged', true);
                    localStorage.setItem('_ftoken', response.data.refToken);

                    setVerify(false);

                    setmessage(response.data.message)
                    setopen(true)
                    setType('success')
                    window.location.reload()
                } else {
                    setmessage(response.data.message);
                    setopen(true)
                    setType('error')
                }
            })
        }

    }
    const Completionist = () => <Typography variant="caption">OTP expired!</Typography>;

    const renderer = ({ minutes, seconds, completed }) => {
        if (completed) {
            // Render a completed state
            return <Completionist />;
        } else {
            // Render a countdown
            return <Typography variant="caption" style={{ margin: "3px 5px", fontWeight: 600 }}>
                OTP expires in  {minutes}:{seconds}
            </Typography>;
        }
    }

    const setExpire = () => {
        setCodeexpired(true)

    }
    
    const handleNotificationClose = () => {
        setopen(false);
    }

    return (
        <Paper style={{
            maxWidth: 652,
            marginLeft: "auto",
            marginRight: "auto",
            marginTop:40,
 
        }}>
         <Notification message={message} open={openB} type={type} close={handleNotificationClose} />

            <div id="form-dialog-title" style={{
                display: "flex",
                flexDirection: "row",
                alignContent: "center",
                alignItems: "center",
                justifyContent: "space-between",
                padding: 10,
                 
            }} >
                {/* onClick={handleClickJoinClose} > */}

                <span style={{
                    justifySelf: "center"
                }}>
                    <Typography variant="h6">
                        Register
            </Typography>

                </span>
          
            </div>
            <DialogContent>
                <CssTextField
                    autoFocus
                    margin="dense"

                    label="Mobile No."
                    fullWidth
                    onChange={(event) => setPhoneNumber(event.target.value)}
                />
                <CssTextField
                    autoFocus
                    margin="dense"

                    label="Email Address"
                    type="email"
                    fullWidth
                    onChange={(event) => setEmail(event.target.value)}
                />
                <CssTextField
                    autoFocus
                    margin="dense"

                    label="Password"
                    type="password"
                    fullWidth
                    onChange={(event) => setPassword(event.target.value)}
                />
                <CssTextField
                    autoFocus
                    margin="dense"
                    value={refCode}
                    label="Refferal Code"
                    type="text"
                    fullWidth
                    onChange={(event) => setRefer(event.target.value)}
                />
            </DialogContent>
            <DialogActions style={{justifyContent:"center"}}>
   
                <Button size="small" variant="contained" style={{
                    backgroundColor: js.buttonGreen,
                    color: 'white',
                    
                }}
                    onClick={register}
                >Register</Button>

            </DialogActions>
            {/* <Divider /> */}
            <div style={{textAlign:"center"}}>
                    <Typography variant="caption">
                        -Or-
            </Typography>
                </div>
            <div style={{
                padding: 20,
                display: 'flex',
                flexDirection: "row",
                justifyContent: "center",// "space-between",
                alignItems: "center",
                alignContent: "center"
            }}>
                <GoogleLogin
                    clientId={CLIENT_ID}
                    buttonText='Register'
                    onSuccess={googleLogin}
                    // onFailure={ }
                    cookiePolicy={'single_host_origin'}
                    responseType='code,token'
                />
                {/* <div>
                    <Typography variant="caption">
                        -Or-
</Typography>
                </div>
                <FacebookLogin
                    appId="736932117095747"
                    autoLoad={false}
                    fields="name,email,picture"
                    callback={fbLogin}
                    cssClass="my-facebook-button-class"
                    textButton="Login"
                    icon={<FacebookIcon style={{ color: '#3B5998' }} />}
                // onClick={componentClicked}
                // callback={responseFacebook} 
                /> */}
            </div>
            <Divider />
            <div style={{ width: "90%", padding: 10 }}>
                <Typography variant="caption" style={{ color: "grey" }}>
                    By registering you confirm you are not a resident of the states of Assam, Orissa, Telangana, Nagaland and Sikkim
        </Typography>
            </div>
            
            <Dialog open={viewLogin}   
            style={{                            maxWidth: 525,
                marginLeft: "auto",
                marginRight: "auto",}}
            onClose={handleClickLoginClose} aria-labelledby="form-dialog-title">
                        <div id="form-dialog-title" style={{
                            display: "flex",
                            flexDirection: "row",
                            alignContent: "center",
                            alignItems: "center",
                            justifyContent:"space-between",
                            padding:"10px 25px"
                        }} onClick={handleClickLoginClose} >
                            
                            <span style={{
                                justifySelf:"center"
                            }}>
                                <Typography variant="h6">
                                 Details
                                </Typography>
                                
                                </span> 
                                <CloseOutlined  /> 
                        </div>
                        <div style={ { padding:"10px 25px" } }>
                            <CssTextField
                                autoFocus
                                margin="dense"
                                
                                label="Phone Number"
                                type="Text"
                                fullWidth
                                onChange={(event) => setPhoneNumber(event.target.value)}
                            />
                            <CssTextField
                                autoFocus
                                margin="dense"
                                
                                label="Password"
                                type="Password"
                                fullWidth
                                onChange={(event) => setPassword(event.target.value)}
                            />

                            <CssTextField
                                autoFocus
                                margin="dense"
                                
                                label="Re enter Password"
                                type="Password"
                                fullWidth
                                onChange={(event) => setpassword2(event.target.value)}
                            />
 
                        </div>
                        <DialogActions>

                            <Button size="small" variant="contained" style={{
                                backgroundColor: js.buttonGreen,
                                color: 'white',
                                marginLeft: '20px'
                            }}
                                onClick={() => confirmOtp()}
                            >Save</Button>
                        </DialogActions>
 
                    </Dialog>
                    <Dialog fullScreen open={openVerify} 
                    style={{maxWidth: 525}}
                    onClose={handleClickVerifyClose} aria-labelledby="form-dialog-title">
                        <Container maxWidth={"sm"} style={{ marginTop: "25vh" }}>
                            <Paper elevation={2}>
                                <div id="form-dialog-title" style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    alignContent: "center",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    padding: 10,

                                }} onClick={handleClickVerifyClose} >

                                    <span style={{
                                        justifySelf: "center"
                                    }}>
                                        <Typography variant="h6">
                                            Verify
                                </Typography>

                                    </span>
                                    <CloseOutlined />
                                </div>

                                <DialogContent>
                                    <CssTextField
                                        autoFocus
                                        margin="dense"

                                        label="OTP"
                                        type="text"
                                        fullWidth
                                        onChange={(event) => setCode(event.target.value)}
                                    />
                                </DialogContent>
                                <DialogActions>


                                    <p
                                        style={{
                                            color: js.buttonGreen,
                                            fontSize: '10px',
                                            cursor: 'pointer'
                                        }}

                                        onClick={() => { resendOTP(1) }}
                                    >
                                        Resend OTP
                            </p>
                                    <Button size="small" variant="contained" style={{
                                        backgroundColor: js.buttonGreen,
                                        color: 'white',
                                        marginLeft: '20px'
                                    }}
                                        onClick={verify}
                                    >Verify</Button>

                                </DialogActions>
                            </Paper>

                            <div style={{ margin: 10, display: "flex", justifyContent: "center", alignContent: "center" }}>

                                {!expired ? <CountdownCircleTimer
                                                isPlaying
                                                duration={dt} // {dt}
                                                size={40}
                                                strokeWidth={1}
                                                colors={[
                                                ['#004777', 0.33],
                                                ['#F7B801', 0.33],
                                                ['#A30000', 0.33],
                                                ]}
                                                onComplete={setExpire}
                                            >
                                            {({ remainingTime }) => remainingTime}
                                        </CountdownCircleTimer> 
  : <Completionist />}
                            </div>
                        </Container>
                    </Dialog>

 
        </Paper>
    )
}