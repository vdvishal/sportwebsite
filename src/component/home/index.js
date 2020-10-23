import React, { useEffect,useContext } from 'react';
import { useHistory, Router } from "react-router-dom";

import * as js from '../common/color.json';
import Countdown from 'react-countdown';
import  { CountdownCircleTimer } from 'react-countdown-circle-timer';

import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

import cookies from 'universal-cookie';
import { useTheme,withStyles } from '@material-ui/core/styles';

import CloseOutlined from '@material-ui/icons/CloseOutlined';

import { Link } from "react-router-dom";

// import * as publicIp from "public-ip";

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Divider, Container, Avatar,Badge } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import BrightnessHighIcon from '@material-ui/icons/BrightnessHigh';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Paper from '@material-ui/core/Paper';

import TextField from '@material-ui/core/TextField';
import Notification from '../common/notification'
import styled from 'styled-components'

import Footer from './footer'


import MoreVertIcon from '@material-ui/icons/MoreVert';
import { ModeContext } from '../../App';

import * as mqtt from 'mqtt';

import * as api from '../../api/user'
import * as ref from '../../api/ref'
import * as matchapi from '../../api/match';


import './fb.css'
import * as logo from './logo_transparent.png'

const size = {
    mobileS: '320px',
    mobileM: '375px',
    mobileL: '525px',
    tablet: '768px',
    laptop: '1024px',
    laptopL: '1440px',
    desktop: '2560px',
    customPreset: '525px',
 
  
  }

  const device = {
    mobileS: `(max-width: ${size.mobileS})`,
    mobileM: `(max-width: ${size.mobileM})`,
    mobileL: `(max-width: ${size.mobileL})`,
    tablet: `(max-width: ${size.tablet})`,
    laptop: `(max-width: ${size.laptop})`,
    laptopL: `(max-width: ${size.laptopL})`,
    desktop: `(max-width: ${size.desktop})`,
    desktopL: `(max-width: ${size.desktop})`,
    customPreset: `(max-width: ${size.customPreset})`,  
  };

const Cookies = new cookies();

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

  const SDiv = styled.div`
 
cursor:pointer;
height:25px;
background-color:#232C31;
margin-left:20px;
display:flex;
align-items:center;
color:#AAC0C8;
@media ${device.customPreset} {
    display:none
 };
&:hover {
    color: #77BC37;
}
`;

const SDivMenu = styled.div`
    cursor:pointer;
    height:25px;
    background-color:#232C31;
    
    display:flex;
    align-items:center;
    color:#AAC0C8;
    @media ${device.customPreset} {
        cursor:pointer;
        height:25px;
        background-color:#232C31;
         
        display:flex;
        align-items:center;
        color:#AAC0C8;
    };
    &:hover {
        color: #77BC37;
    }
`; 

export const HomeContext = React.createContext()
export const LoginContext = React.createContext()
export const GameContext = React.createContext()

 
export const WalletBonusContext = React.createContext()

export const TransactContext = React.createContext()

var client;
export default function HomePage(props) {

    const history = useHistory()

    const theme = useTheme();

    const [dt, setCountDown] = React.useState(120);

    const [userIp,setIp]  = React.useState(0);


    const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

    const arrowView = useMediaQuery('(max-width: 450px)');

    const [anchorEl, setAnchorEl] = React.useState(null);

    const [, setRegisterOpen] = React.useState(false);

    const [openLogin, setOpenLogin] = React.useState(false);

    const [openVerify, setVerify] = React.useState(false);

    const [openForget, setSendForget] = React.useState(false);
    const [openResetPassword, setOpenResetPassword] = React.useState(false);

 
    const [viewLogin, setView] = React.useState(false);


    const [email, setmail] = React.useState('');
    const [password, setpassword] = React.useState('');
    const [password2, setpassword2] = React.useState('');
    const [OTP, setOTP] = React.useState('');


    const [number, setnumber] = React.useState('');
     const [code, setVerifyCode] = React.useState('');
    const [verifyId, setVerifyId] = React.useState('');
    const [expired, setCodeexpired] = React.useState(true)


    const [message, setmessage] = React.useState('');
    const [, setwrongPasword] = React.useState(false);
    const [openB, setopen] = React.useState(false);
    const [balance, setWallet] = React.useState(0);
    const [bonus, setBonus] = React.useState(0);

    const [pic, setPro] = React.useState('');
    const [msg, setMsgCount] = React.useState(0);

    
    const [type, setType] = React.useState('info')

    const [mode, setMode] = useContext(ModeContext)

    const [game, setGame] = React.useState(1);

    const [matches, setMatches] = React.useState(null);

    useEffect(() => {
 
        if (localStorage.getItem('isLogged') === "false" || localStorage.getItem('isLogged') === null) {
            api.login({ loginType: 4 }).then(response => {
                if (response && response.status === 200) {

                    Cookies.set('guestToken', response.data.token);
                    localStorage.setItem('isLogged', false);
                    localStorage.setItem('_ftoken', "guest");
                    localStorage.setItem('sid',"guest");
                }
            })
        }
        api.profile().then(response => {
            let data = response.data.data

            setPro(data.profilePic);
            setMsgCount(data.messageCount || 0);
            setWallet(data.wallet.balance)
            setBonus(data.wallet.bonus)
            localStorage.setItem('sid',data._id);
        }).catch(error => {
            if (error && error.response && error.response.status === 403) {
                ref.refresh().then(response => {
                    Cookies.set('token', response.data.token);
                    api.profile().then(response => {
                        let data = response.data.data

                        setPro(data.profilePic);

                        setWallet(data.wallet.balance)
                        setBonus(data.wallet.bonus)

                    })
                }).catch(err => {
                    if (err.response && err.response.status === 496) {
                        localStorage.removeItem("isLogged");
                    }
                })
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                // if(error.response.status === 401){
                // history.push({
                //     pathname : "/login"
                // });
                // }
            }
        })

        matchapi.match(game,1).then(response => {      
            if(response.data.match !== null){      
                  setMatches(response.data.match);
            }else{
              setMatches([]);
            }
          })

        
          const options = {
            // clientId uniquely identifies client
            // choose any string you wish
            clientId: "MQTT_CLIENT_" + new Date().getTime()
          };
      
          client = mqtt.connect('wss://mqtt.fantasyjutsu.com:8083/mqtt', options);
          client.on('connect', function () {
            console.log("ws home connected")
          })
      
          client.on('reconnect', function () {
            console.log('ws home reconnect')
          })
          client.subscribe("withdraw_"+localStorage.getItem('sid'))
      
          client.on('message', function (topic, message) {
            // console.log('message: ', message);
            // Updates React state with message 
            let m = JSON.parse(message)
            console.log('message: ', m);
            handleNotificationClick(m.message)
            setWallet(m.amount)
          });
      
       
          return () => {
            // HERE I WANT TO UNSUBSCRIBE WHEN THE COMPONENT UNMOUNT 
            client.unsubscribe("withdraw_"+localStorage.getItem('sid'))
          }

    }, []);

    const handleNotificationClick = (message) => {
        setopen(true);
        setmessage(message);
    
      }

    const setEmail = (mail) => {
        setmail(mail)
    }

    const setPhoneNumber = (number) => {
        setnumber(number)
    }

    const setPassword = (password) => {
        setpassword(password)
    }


    const setCode = (text) => {
       

        setVerifyCode(text)
    }

    const handleForgot = () => {
        setSendForget(true)
    }

    const handleGameType = (value) => {
        
        if(window.location.pathname === "/"){
            setGame(value);
            matchapi.match(value,1).then(response => {      
                if(response.data.match !== null){      
                      setMatches(response.data.match);
                }else{
                  setMatches([]);
                }
              })
        }else{
            setGame(value);
            setMatches(null);
            matchapi.match(value,1).then(response => {      
                if(response.data.match !== null){      
                      setMatches(response.data.match);
                }else{
                  setMatches([]);
                }
              })
            history.push('/')
        }
    }

    const handleClickLoginOpen = () => {
        setOpenLogin(true);
    };


    const handleClickLoginClose = () => {
        setOpenLogin(false);
        setSendForget(false)
        setOpenResetPassword(false)
        setCodeexpired(true)

    };




    const handleClickVerifyClose = () => {
        setVerify(false);
        setCodeexpired(true)

    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleNotificationClose = () => {
        setopen(false);
    }



    const login = async () => {
        if (password.length === 0) {
            setmessage("Password can't be empty")
            setopen(true)
            setType('info')
            return
        }
 
        await api.login({ email: email, password: password}).then(response => {
            if (response && response.status === 200) {
                console.log(window.location.pathname)
                if(window.location.pathname === '/register'){
                    history.goBack()
                }
                Cookies.set('token', response.data.token);
                localStorage.setItem('isLogged', true);
                localStorage.setItem('_ftoken', response.data.refToken);
 
 
                setmessage(response.data.message)
                setopen(true)
                setType('success')

                setOpenLogin(false);

                    api.profile().then(response => {
                        let data = response.data.data

                        setPro(data.profilePic);
                        setMsgCount(data.messageCount);
                        localStorage.setItem('sid',data._id);
                        client.subscribe("withdraw_"+data._id)

                        setWallet(data.wallet.balance)
                        setBonus(data.wallet.bonus)

                    }).catch(error => {
                        if (error.response) {

                            // The request was made and the server responded with a status code
                            // that falls out of the range of 2xx
                            // if(error.response.status === 401){
                            // history.push({
                            //     pathname : "/login"
                            // });
                            // }
                        }
                    })


            } else if (response &&  response.status === 401) {
                setwrongPasword(true)
                setmessage(response.data.message)
                setopen(true)
                setType('error')
                setTimeout(() => {
                    setwrongPasword(false)
                }, 5000);
            } else if (response &&  response.status === 204) {
                

                setmessage("No user found")
                setopen(true)
                setType('info')
            }else if (response &&  response.status === 202) {
                

                setmessage(response.data.message)
                setopen(true)
                setType('info')
            }
        })
    }

    const setExpire = () => {
        setCodeexpired(true)

    }

    const verify = (type) => {
        if (type === 2) {
            api.verifyOTP({
                type: 2,
                id: verifyId,
                code: code
            }).then(response => {
                

                if (response.status === 200) {
                    setmessage(response.data.message);
                    setopen(true)
                    setType('success')
                    setVerify(false);

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
                

                if (response.status === 200) {
                    Cookies.set('token', response.data.token);
                    localStorage.setItem('isLogged', true);
                    localStorage.setItem('_ftoken', response.data.refToken);

                    setVerify(false);

                    setmessage(response.data.message)
                    setopen(true)
                    setType('success')

                } else {
                    setmessage(response.data.message);
                    setopen(true)
                    setType('error')
                }
            })
        }

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
             if (type === 2) {
                setSendForget(false)
                setOpenResetPassword(true)
                setVerifyId(response.data.data)
            }
        })
    }
 


    const confirmPass = () => {
        if (password2 === password) {
            api.saveForgotPass({
                OTP: OTP,
                verifyId,
                password,
                type: 2 // resendOTP
            }).then(response => {
                setmessage(response.data.message);
                setopen(true)
                setType('info')
                handleClickLoginClose()

            })
        } else {
            setmessage("Password does not match");
            setopen(true)
            setType('error')
        }

    }

    const logout = () => {
        api.logoutUser({}).then(() => {
            localStorage.removeItem('token');
            localStorage.setItem('isLogged', false);
            Cookies.set('token', "");
            localStorage.removeItem('sid');
            history.push('/');
            window.location.reload(true);
        }).catch()
    }



    const confirmOtp = () => {
        if (password2 !== password) {
            setmessage("Password does not match");
            setopen(true)
            setType('error')
            return
        }

        api.resendOTP({
            phone: number,
            type: 3,
            password,
            verifyId: verifyId
        }).then(response => {

            if (response.status === 200) {
                if (response.data.new) {
                    setView(false)
                    setVerify(true);
                    setVerifyId(response.data.userId)
                    setRegisterOpen(false);
                    setOpenLogin(false);


                } else {
                    Cookies.set('token', response.data.token);
                    localStorage.setItem('isLogged', true);
                    localStorage.setItem('_ftoken', response.data.refToken);

                    

                    setmessage(response.data.message)
                    setopen(true)
                    setType('success')
                    setRegisterOpen(false);

                    setOpenLogin(false);
                }

            } else {
                setmessage(response.data.message)
                setopen(true)
                setType('error')
            }

        })
    }

    const Completionist = () => <Typography variant="caption">OTP expired!</Typography>;
 


    return (
        <div>

            <div style={{minHeight:"100vh"}}>

            
            <HomeContext.Provider value={[balance, setWallet]} maxWidth="lg">
            
            <TransactContext.Provider value={[msg, setMsgCount]} >
                <WalletBonusContext.Provider value={[bonus, setBonus]} >
                <LoginContext.Provider value={[openLogin, setOpenLogin]} >
                <GameContext.Provider value={[matches, handleGameType]} >

                
                    <Notification message={message} open={openB} type={type} close={handleNotificationClose} />
                     
                    <Dialog fullScreen={fullScreen} open={openLogin}
                        onClose={handleClickLoginClose} aria-labelledby="form-dialog-title"
                        >
                        <div id="form-dialog-title" style={{
                            display: "flex",
                            flexDirection: "row",
                            alignContent: "center",
                            alignItems: "center",
                            justifyContent: "space-between",
                            padding: 10,
                             
                        }} onClick={handleClickLoginClose} >

                            <span style={{
                                justifySelf: "center"
                            }}>
                                <Typography variant="h6">
                                    LOGIN
                                </Typography>

                            </span>
                            <CloseOutlined />
                        </div>
                        <DialogContent  style={fullScreen ? { marginTop: 100,flexGrow:0 } : { marginTop: 0 }}>
                            <CssTextField
                                autoFocus
                                margin="dense"

                                label="Email Address/Phone Number"
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
                        </DialogContent>
                        <DialogActions>
                            <p
                                style={{
                                    color: js.buttonGreen,
                                    fontSize: '10px',
                                    cursor: 'pointer'
                                }}

                                onClick={handleForgot}
                            >
                                Forgot password ?
                    </p>
                            <Button size="small" variant="contained" style={{
                                backgroundColor: js.buttonGreen,
                                color: 'white',
                                marginLeft: '20px'
                            }}
                                onClick={login}
                            >Login</Button>
                        </DialogActions>
 

                    </Dialog>

                    <Dialog fullScreen open={openVerify} onClose={handleClickVerifyClose} aria-labelledby="form-dialog-title">
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

                                <DialogContent style={fullScreen ? { marginTop: 100,flexGrow:0 } : { marginTop: 0 }}>
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

                                        onClick={() => { resendOTP(2) }}
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

                    <Dialog fullScreen={fullScreen} open={openForget} onClose={handleClickLoginClose} aria-labelledby="form-dialog-title">
                        <div id="form-dialog-title" style={{
                            display: "flex",
                            flexDirection: "row",
                            alignContent: "center",
                            alignItems: "center",
                            justifyContent: "space-between",
                            padding: 10
                        }} onClick={handleClickLoginClose} >

                            <span style={{
                                justifySelf: "center"
                            }}>
                                <Typography variant="caption" style={{fontWeight:800,fontSize:"0.875rem"}}>
                                    Forgot Password
                                </Typography>

                            </span>
                            <CloseOutlined />
                        </div>
                        <DialogContent  style={fullScreen ? { marginTop: 100,flexGrow:0 } : { marginTop: 0 }}>
                            <CssTextField
                                autoFocus
                                margin="dense"

                                label="Phone Number"
                                type="text"
                                fullWidth
                                onChange={(event) => setPhoneNumber(event.target.value)}
                            />
                        </DialogContent>
                        <DialogActions>

                            <Button size="small" variant="contained" style={{
                                backgroundColor: js.buttonGreen,
                                color: 'white',
                                marginLeft: '20px'
                            }}
                                onClick={() => {resendOTP(2);setCountDown(120);setCodeexpired(false)}}
                            >Send OTP</Button>
                        </DialogActions>

                    </Dialog>

                    <Dialog fullScreen={fullScreen} open={openResetPassword} onClose={handleClickLoginClose} aria-labelledby="form-dialog-title">
                        <div id="form-dialog-title" style={{
                            display: "flex",
                            flexDirection: "row",
                            alignContent: "center",
                            alignItems: "center",
                            justifyContent: "space-between",
                            padding: 10
                        }} onClick={handleClickLoginClose} >

                            <span style={{
                                justifySelf: "center"
                            }}>
                                <Typography variant="caption" style={{fontWeight:800,fontSize:"0.875rem"}}>
                                    Forgot Password
                                </Typography>

                            </span>
                            <CloseOutlined />
                        </div>
                        <DialogContent style={fullScreen ? { marginTop: 100,flexGrow:0 } : { marginTop: 0 }}>
                            <CssTextField
                                autoFocus
                                margin="dense"

                                label="OTP"
                                type="Text"
                                fullWidth
                                onChange={(event) => setOTP(event.target.value)}
                            />
                            <CssTextField
                                autoFocus
                                margin="dense"

                                label="New Password"
                                type="Password"
                                fullWidth
                                onChange={(event) => setpassword(event.target.value)}
                            />
                            <CssTextField
                                autoFocus
                                margin="dense"

                                label="Re enter Password"
                                type="Password"
                                fullWidth
                                onChange={(event) => setpassword2(event.target.value)}
                            />
                        </DialogContent>
                        <DialogActions>
                        <p
                                        style={{
                                            color: js.buttonGreen,
                                            fontSize: '12px',
                                            cursor: 'pointer'
                                        }}

                                        onClick={() => { resendOTP(2) }}
                                    >
                                        Resend OTP
                            </p>
                            <Button size="small" variant="contained" style={{
                                backgroundColor: js.buttonGreen,
                                color: 'white',
                                marginLeft: '20px'
                            }}
                                onClick={() => confirmPass()}
                            >Reset Password</Button>
                        </DialogActions>
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
                    </Dialog>


                    <Dialog fullScreen={fullScreen} open={viewLogin} onClose={handleClickLoginClose} aria-labelledby="form-dialog-title">
                        <div id="form-dialog-title" style={{
                            display: "flex",
                            flexDirection: "row",
                            alignContent: "center",
                            alignItems: "center",
                            justifyContent: "space-between",
                            padding: 10
                        }} onClick={handleClickLoginClose} >

                            <span style={{
                                justifySelf: "center"
                            }}>
                                <Typography variant="h6">
                                    Details
                                </Typography>

                            </span>
                            <CloseOutlined />
                        </div>
                        <DialogContent style={fullScreen ? { marginTop: 100,flexGrow:0 } : { marginTop: 0 }}>
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

                        </DialogContent>
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



                    <AppBar position="sticky"  >
                        
                        <Toolbar style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            padding:"0 0 0 10px"
                        }} > 
                        <div style={{
                                alignItems: "center",
                                display: "flex",
                                color: "#77BC37",
                        }}>
                        <ArrowBackIosIcon style={arrowView ? {display:"block"} :  {display:"none"} } onClick={() => history.goBack()} />

                            <Link
                                to={{
                                    pathname: '/'
                                }}
                                style={{
                                    textDecoration: 'none',
                                    color: 'white'
                                }}>
                                    <img src={logo} height="60px" alt="logo"></img>
                            </Link>
                                <SDiv
                                    style={{
                                        color:game === 1 ? "white" : '',
                                        backgroundColor: game === 1 ? "#77BC37" : '',
                                        borderRadius: "5px 0 0 5px"
                                    }}
                                    onClick={() => handleGameType(1)}
                                >
                                <Typography variant="caption" style={{
                                fontWeight:600,
                                padding:10,
                                
                            }}>
                                Cricket
                            </Typography>
                                </SDiv>
                                <SDiv 
                                    style={{
                                    marginLeft:0,
                                    color:game === 2 ? "white" : '',
                                    backgroundColor: game === 2 ? "#77BC37" : '',
                                    borderRadius: "0px 5px 5px 0px"
                                }}
                                    onClick={() => handleGameType(2)}
                                    >
                                    <Typography variant="caption" style={{
                                    fontWeight:600,
                                    padding:10
                                        }}>
                                            FootBall
                                        </Typography>
                                </SDiv>

                        </div>



                            {localStorage.getItem('isLogged') === "true" ?
                                <div
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        alignItems: 'center', margin: '0 5px'
                                    }}
                                >
                                    <div
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'space-between',
                                            alignItems: 'center', margin: '0 5px'
                                        }}
                                    >
                                        <span style={{ fontSize: '12px', fontWeight: 400 }}>Balance</span><span style={{ color: '#77BC37', fontSize: '15px', fontWeight: 600 }}>₹{balance.toFixed(2)}</span>
                                    </div>
                                    <div
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'space-between',
                                            alignItems: 'center', margin: '0 5px'
                                        }}
                                    >
                                        <span style={{ fontSize: '12px', fontWeight: 400 }}>Bonus</span><span style={{ color: '#F79123', fontSize: '15px', fontWeight: 600 }}>₹{bonus.toFixed(2)}</span>
                                    </div>
                                    {pic && pic.length === 0 ? 
                                    <Avatar style={ !arrowView ? {display:"flex",cursor:"pointer" } :  {display:"none",cursor:"pointer" }}  onClick={handleClick}   /> :
                                    <Avatar src={pic} style={ !arrowView ? {display:"flex",cursor:"pointer" } :  {display:"none",cursor:"pointer" }} onClick={handleClick} />}
                                        <MoreVertIcon  onClick={handleClick}  style={{cursor:"pointer"}} />
                                </div> 
                                : <div
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        fontSize: '13px',
                                        fontWeight: 600
                                    }}>
                                    <div>
                                        <Link
                                            to={{
                                                pathname: '/register'
                                            }}
                                            style={{
                                                textDecoration: 'none',

                                            }}
                                        >
                                            <Button size="small" variant="contained" style={{
                                                backgroundColor: js.buttonGreen,
                                                color: 'white',
                                                marginLeft: '2.5px'
                                            }}


                                            >Join</Button>

                                        </Link>

                                    </div>
                                    <div>
                                        <Button size="small" variant="contained" style={{
                                            backgroundColor: js.buttonGreen,
                                            color: 'white',
                                            marginLeft: '2.5px'
                                        }}
                                            onClick={handleClickLoginOpen}
                                        >Login</Button>
                                    </div>
                                </div>}

                        </Toolbar>
                        {localStorage.getItem('isLogged') === "true" ? (
                            <Menu
                                id="simple-menu"
                                anchorEl={anchorEl}
                                keepMounted
                                open={Boolean(anchorEl)}
                                onClose={handleClose}

                            >
                                <MenuItem onClick={handleClose} style={{
                                    display: 'flex',
                                    flexDirection: 'column'
                                }}>
                                    <div
                                     
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            fontSize: '13px',
                                            fontWeight: 600
                                        }}>
                                        <div>
                                            Balance
                                <br />
                                            {balance.toFixed(2)}
                                        </div>
                                        <div>
                                            <Link
                                                to={{
                                                    pathname: '/myaccount'
                                                }}
                                                style={{
                                                    textDecoration: 'none',

                                                }}
                                            >
                                                <Button size="small" variant="contained" style={{
                                                    backgroundColor: js.buttonGreen,
                                                    color: 'white',
                                                    marginLeft: '20px'
                                                }}
                                                >Deposit</Button>
                                            </Link>
                                        </div>
                                    </div>
                                </MenuItem>
                                <Divider />
                            <MenuItem onClick={handleClose} style={{
                                display:"flex",
                                justifyContent:"center"
                            }}>
                                <SDivMenu
                                    style={{
                                        color:game === 1 ? "white" : '',
                                        backgroundColor: game === 1 ? "#77BC37" : '',
                                        borderRadius: "5px 0 0 5px"
                                    }}
                                    onClick={() => handleGameType(1)}
                                >
                                <Typography variant="caption" style={{
                                fontWeight:600,
                                padding:10,
                                
                            }}>
                                Cricket
                            </Typography>
                                </SDivMenu>
                                <SDivMenu 
                                    style={{
                                    
                                    color:game === 2 ? "white" : '',
                                    backgroundColor: game === 2 ? "#77BC37" : '',
                                    borderRadius: "0px 5px 5px 0px"
                                }}
                                    onClick={() => handleGameType(2)}
                                    >
                                    <Typography variant="caption" style={{
                                    fontWeight:600,
                                    padding:10
                                        }}>
                                            FootBall
                                        </Typography>
                                </SDivMenu>
                                </MenuItem>
                                <Divider />
                                <MenuItem 
                                    onClick={() => {setMode(!mode);handleClose()}}
                                    >  
                                    <div
                                        style={{
                                            display:"flex",
                                            width:"100%",
                                            justifyContent:"space-between",
                                            alignContent:"center",
                                            alignItems:"center"
                                        }}
                                    >
                                        <Typography variant="caption">
                                            Color Mode
                                        </Typography>
                                        {mode ? <BrightnessHighIcon /> : <Brightness4Icon />}
                                    </div>
                                      
                                         
                                    </MenuItem>
                                <Link
                                    to={{
                                        pathname: '/transactions'
                                    }}
                                    style={{
                                        textDecoration: 'none',
                                        color: '#262626'
                                    }}
                                >
                                    <MenuItem 
                                    style={
                                        {
                                            padding: "15px 16px"
                                        }
                                    }
                                    onClick={handleClose}
                                    >  
                                    <Badge color="secondary" badgeContent={
                                        msg
                                    } showZero>
                                            <Typography variant="caption">My Updates</Typography>
                                
                                    </Badge>
                                         
                                    </MenuItem>
                                </Link>
                                 <Divider />
                                <Link
                                    to={{
                                        pathname: '/profile'
                                    }}
                                    style={{
                                        textDecoration: 'none',
                                        color: '#262626'
                                    }}
                                >
                                    <MenuItem onClick={handleClose}
                                    > <Typography variant="caption">Profile</Typography> </MenuItem>
                                </Link>
                                <Link
                                    to={{
                                        pathname: '/match/mymatch'
                                    }}
                                    style={{
                                        textDecoration: 'none',
                                        color: '#262626'
                                    }}
                                >
                                    <MenuItem onClick={handleClose}><Typography variant="caption">My matches</Typography></MenuItem>
                                </Link>

                                <Link
                                    to={{
                                        pathname: '/myaccount'
                                    }}
                                    style={{
                                        textDecoration: 'none',
                                        color: '#262626'
                                    }}
                                >
                                    <MenuItem onClick={handleClose}><Typography variant="caption">My account</Typography></MenuItem>
                                </Link>
                                <Link
                                    to={{
                                        pathname: '/faq'
                                    }}
                                    style={{
                                        textDecoration: 'none',
                                        color: '#262626'
                                    }}
                                >
                                    <MenuItem onClick={handleClose}><Typography variant="caption">FAQ</Typography></MenuItem>
                                </Link>
                                <MenuItem onClick={() => { handleClose(); logout() }}><Typography variant="caption">Logout</Typography></MenuItem>
                            </Menu>
                        ) : (
                                <div
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        fontSize: '13px',
                                        fontWeight: 600
                                    }}>
                                </div>


                            )}

                    </AppBar>
                    {props.children}
                    </GameContext.Provider>
           
                </LoginContext.Provider>
                </WalletBonusContext.Provider>
                </TransactContext.Provider>
            </HomeContext.Provider>
            </div>
            <Footer/>
        </div>
    );
}