import React from 'react';
import ReactGA from 'react-ga';

import { useHistory,Link } from "react-router-dom";
import { useEffect } from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import CircularProgress from '@material-ui/core/CircularProgress';
import {CopyToClipboard} from 'react-copy-to-clipboard';

import CloseIcon from '@material-ui/icons/Close';
import { Paper, Container, Button, Divider,Avatar, Typography, Dialog, IconButton,Tooltip, AppBar, Toolbar, TextField } from '@material-ui/core';

import { useTheme,withStyles } from '@material-ui/core/styles';
import Slide from '@material-ui/core/Slide';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ImageUploader from 'react-images-upload';

import * as api from '../../api/user'
import * as logo from './whatsapp.png'
import * as twitter from './twitter.png'

import styled from 'styled-components'


import Notification from '../common/notification'


const CssTextField = withStyles({
    root: {
      '& label.Mui-focused': {
        color: 'grey',
      },
      '& .MuiInput-underline:after': {
        borderBottomColor: 'white',
      },
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: 'red',
        },
        '&:hover fieldset': {
          borderColor: 'yellow',
        },
        '&.Mui-focused fieldset': {
          borderColor: 'white',
        },
      },
    },
  })(TextField);

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


const Div = styled.div`
  display: grid;
  grid-template-row: 15px 30px;
   grid-gap: 2px;
  align-items: center;
   
    width:100%
`


export default function Profile() {
    const theme = useTheme();
    const history = useHistory()


    const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

    const [team, setTeam] = React.useState({});

    const [type, setType] = React.useState(0);

    const [typeNum, setTypeNumber] = React.useState(0);

    const [open, setOpen] = React.useState(false);

    const [value, setEdit] = React.useState('');

    const [newPassword, setPassword] = React.useState('');

    
    const [message, setMessage] = React.useState("false");
    const [openNotification, setOpenNotifi] = React.useState(false);

    const [copied, setcopied] = React.useState(false);

    const [copiedvalue, setcopiedvalue] = React.useState('');

    const [image, setImage] = React.useState('')

    const [wait] = React.useState(false);
    const [complete, setComplete] = React.useState(false);
    const [waitUpload, setwaitUpload] = React.useState(false);

    useEffect(() => {
        api.profile().then(response => {
 
            let data = {
                status: response.status,
                data: response.data.data
            }
            setTeam(data)
             
            setcopiedvalue(response.data.data.refLink)
        }).catch(() => {
            

            // if (error && error.response && error.response.status === 403) {
            //     ref.refresh().then(response => {
            //         Cookies.set('token', response.data.token);
            //         

            //         profile();    
            //     }).catch(err => {
            //         if(err.response && err.response.status === 496){
            //             localStorage.removeItem("isLogged");
            //          }
            //     })
 
            // }
        })

    }, []);

    let { data } = team;


    const handleEdit = (type) => {
        setOpen(true);
        
        
        setTypeNumber(type)
        switch (type) {
            case 1:
                setType("Team Name");
                break;

            case 2:
                setType("Name");
                break;

            case 3:
                setType("Old Password");
                break;
            
                case 4:
                    setType("Profile Picture");
                    break;
            default:
                break;
        }
    }

    const handleEditClose = () => {
        setOpen(false)
    }

    const setValue = (value) => {
        setEdit(value)
    }

    const setValuePasword = (value) => {
        setPassword(value)
    }

    const handleNotificationClose = () => {
        setOpenNotifi(false);
    }

    const handleNotificationClick = (message) => {
        setOpenNotifi(true);
        setMessage(message);
    }
    const handleClick = () => {
        let object = {}
        switch (typeNum) {
            case 1:
                if(value.length > 8){
                   return handleNotificationClick("Choose a username less than 8 characters")
                }
                object = {
                    userName: value
                }
                break;
            case 2:
                object = {
                    fullName: value
                }
                break;
            default:
                break;
        }

        if(typeNum === 2 || typeNum === 1){
            setTypeNumber(0)
            handleEditClose()
            api.patchProfile(object).then(response => {
                api.profile().then(response => {
                    let data = {
                        status: response.status,
                        data: response.data.data
                    }
                    setTeam(data)
                }).catch(error => {
                    if (error.response) {
                        // The request was made and the server responded with a status code
                        // that falls out of the range of 2xx
                        if (error.response.status === 401) {
                            history.push({
                                pathname: "/login"
                            });
                        }
                    }
                })
                
                handleNotificationClick(response.data.message)
            }).catch(() => {
                handleNotificationClick("Some error occured")
            })
        }
    }

    
    const handlePassClick = () => {
        
        

        let object = {
            passsword: newPassword,
            oldPassword: value
        }
         

             setTypeNumber(0)
            handleEditClose()
            api.patchPassword(object).then(response => {
                api.profile().then(response => {
                    let data = {
                        status: response.status,
                        data: response.data.data
                    }
                    setTeam(data)
                }).catch(error => {
                    if (error.response) {
                        // The request was made and the server responded with a status code
                        // that falls out of the range of 2xx
                        if (error.response.status === 401) {
                            history.push({
                                pathname: "/login"
                            });
                        }
                    }
                })
                
                handleNotificationClick(response.data.message)
            }).catch(() => {
                handleNotificationClick("Some error occured")
            })
     
    }

    const onDrop = (e) => {
        const formdata = new FormData();
    
        formdata.append('image',e[0])
        setwaitUpload(true)
    
    
        api.uploadImage(formdata).then(response => {
                 setwaitUpload(false)
                if(response.status === 200){
                    setComplete(true);
                    api.patchProfile({
                        profilePic:response.data.link
                    }).then(response => {
                        handleEditClose()
                        api.profile().then(response => {
                            let data = {
                                status: response.status,
                                data: response.data.data
                            }
                            setTeam(data)
                        }).catch(error => {
                            if (error.response) {
                                // The request was made and the server responded with a status code
                                // that falls out of the range of 2xx
                                if (error.response.status === 401) {
                                    history.push({
                                        pathname: "/login"
                                    });
                                }
                            }
                        })
                        
                        handleNotificationClick(response.data.message)
                    }).catch(() => {
                        handleNotificationClick("Some error occured")
                    })
                }
                 
    
        })
    }
    

    const setcopiedTime = () => {
        setcopied(true);
        setTimeout(() => {
            setcopied(false)
        }, 5000);
    }

    return (
        <div >
            {data ?
                <Container maxWidth={'sm'}>
                    <Paper elevation={3} style={{marginTop:20,
                        // boxShadow: "0px 2px 3px -1px rgb(22 255 0 / 20%), 0px 1px 1px 0px rgb(46 255 0 / 14%), 0px 1px 3px 0px rgb(0 255 1 / 12%)"
                        borderRadius:5
                    
                    }}>
                        <div style={{ borderRadius:5, padding: "5px 10px",display:"flex",justifyContent:"center" }}>
                            <Avatar style={{width:80,height:80,cursor:"pointer"}} src={data.profilePic} onClick={() => handleEdit(4)} ></Avatar>
                        </div>
                        <Divider />
                        <Div>
                            <div style={{ padding: "5px 10px" }}>
                                <Typography variant="caption" style={{ fontWeight: 700, color: "grey" }}>
                                    Team Name
                                </Typography>
                            </div>
                            <div style={{ padding: "5px 10px", display: 'flex', flexDirection: "row", justifyContent: "space-between" }}>
                                <Typography variant="caption" style={{ fontSize: "0.75rem" }}>
                                    {data.userName}
                                </Typography>
                                <ChevronRightIcon style={{cursor:"pointer"}} onClick={() => handleEdit(1)}  />
                            </div>
                        </Div>
                        <Divider />
                        <Div>
                            <div style={{ padding: "5px 10px" }}>
                                <Typography variant="caption" style={{ fontWeight: 700, color: "grey" }}>
                                    Name
                                </Typography>
                            </div>
                            <div style={{ padding: "5px 10px", display: 'flex', flexDirection: "row", justifyContent: "space-between" }}>
                                <Typography variant="caption" style={{ fontSize: "0.75rem" }}>
                                    {data.fullName}
                                </Typography>
                                <ChevronRightIcon style={{cursor:"pointer"}} onClick={() => handleEdit(2)} />
                            </div>
                        </Div>
                        <Divider />
                        <Div>
                            <div style={{ padding: "5px 10px" }}>
                                <Typography variant="caption" style={{ fontWeight: 700, color: "grey" }}>
                                    Email
                                </Typography>
                            </div>
                            <div style={{ padding: "5px 10px" }}>
                                <Typography variant="caption" style={{ fontSize: "0.75rem" }}>
                                    {data.email}
                                </Typography>

                            </div>
                        </Div>
                        <Divider />
                        <Div>
                            <div style={{ padding: "5px 10px" }}>
                                <Typography variant="caption" style={{ fontWeight: 700, color: "grey" }}>
                                    Password
                                </Typography>
                            </div>
                            <div style={{ padding: "5px 10px", display: 'flex', flexDirection: "row", justifyContent: "space-between" }}>
                                <Typography variant="caption" style={{ fontSize: "0.75rem" }}>
                                    **********
                                </Typography>
                                <ChevronRightIcon style={{cursor:"pointer"}} onClick={() => handleEdit(3)} />
                            </div>
                        </Div>
                        <Divider />
                        <Div>
                            <div style={{ padding: "5px 10px" }}>
                                <Typography variant="caption" style={{ fontWeight: 700, color: "grey" }}>
                                    Phone Number
                                </Typography>
                            </div>
                            <div style={{ padding: "5px 10px", display: 'flex', flexDirection: "row", justifyContent: "space-between" }}>
                                <Typography variant="caption" style={{ fontSize: "0.75rem" }}>
                                {data.phone.phone}
                                </Typography>
                                {/* <ChevronRightIcon style={{cursor:"pointer"}} onClick={() => handleEdit(3)} /> */}
                            </div>
                        </Div>
                        <Divider />
                        <Div>
                            <div style={{ padding: "5px 10px" }}>
                                <Typography variant="caption" style={{ fontWeight: 700, color: "grey" }}>
                                    KYC
                                </Typography>
                            </div>
                            <div style={{ padding: "5px 10px" }}>
                            {data.documentSubmitted === true && !data.verifiedKYC ?  
                            <Typography variant="caption">
                                    Verification pending from admin
                                    </Typography> : 
                                    !data.verifiedKYC ?
                                <Link to={{
                                    pathname:"/kyc"
                                }} style={{ textDecoration:"none",color:"red", cursor:"pointer" }} >
                                    <Typography variant="caption">
                                    Verify now
                                    </Typography>
                                     
                                </Link>

                                : <Typography variant="caption" style={{ fontSize: "0.75rem",color:"#009B24" }}>
                                Verified
                            </Typography>}
                            </div>
                        </Div>
                        <Divider />
                    </Paper>


                    <Paper elevation={0} style={{
                        marginTop:"10px",
                        fontSize: "3.2rem",
                        padding: "10px",
                        textAlign: "center",
                        color:'#707173'
                    }}>
                        {data.refCode}
                    </Paper>

                    <Paper elevation={0} style={{
                        padding: "10px",
                        textAlign: "center",
                        
                    }}>
                        Share your referral code
                    </Paper>

                    <Paper elevation={0}
                    style={{
                        padding: "10px",
                        justifyContent: "center",
                        display:'flex',
                        alignItems:"center"
                    }} >

                        
                    <iframe 
                    src={`https://www.facebook.com/plugins/share_button.php?href=https%3A%2F%2Ffantasyjutsu.com%2Fregister%3Fref%3D${data.refCode}&layout=button&size=large&appId=736932117095747&width=67&height=28`}
                     width="77" height="28" style={{border:"none",overflow:"hidden"}} scrolling="no" frameBorder="0" allowtransparency="true" title="fbb" allow="encrypted-media">

                     </iframe>
                    <a href={`https://api.whatsapp.com/send?text=Here's Rs. 25 to play Fantasy Sports with me on Fantasyjutsu. Click ${copiedvalue} to register with my code ${data.refCode}.`}  >
                        <img src={logo} alt="whatsapp" />
                    </a>
                    <a className="twitter-share-button"
                    href={`https://twitter.com/intent/tweet?text=Here's Rs. 25 to play Fantasy Sports with me on Fantasyjutsu. Click ${copiedvalue} to register with my code ${data.refCode}.`}>
                    <img src={twitter}  alt="twitter"  />
                    
                    </a>
                    
                    <CopyToClipboard text={copiedvalue}
                    onCopy={() => setcopiedTime(true)}>
                        <Tooltip title={copied ? "Copied!" : "Copy Link" } aria-label="add">
                        <Button size="small" variant="contained" style={{color:"#FFFFFF"}} color="secondary">
                        Copy Link
                        </Button>
                        </Tooltip>
                    </CopyToClipboard>
 
                    </Paper>
                    <Dialog fullScreen={fullScreen} open={open} onClose={handleEditClose} TransitionComponent={Transition}>
                        <AppBar position={"relative"} color="secondary">
                            <Toolbar>
                                <IconButton edge="start" style={{ color: "white" }} onClick={handleEditClose} aria-label="close">
                                    <CloseIcon />
                                </IconButton>
                                <Typography variant="h6" style={{ color: "white" }}  >
                                    Edit
                        </Typography>
                            </Toolbar>
                        </AppBar>
                        <Container maxWidth="md" style={{ padding: 10, minWidth: 256, marginTop: "10px" }}>
                        {
                                    typeNum !== 4 ? <Paper elevation={0}   >
                          

                             <CssTextField

                                    autoFocus
                                    margin="dense"
                                    type= {typeNum === 3 ? "Password" : "text"}
                                    label={type}
                                    fullWidth
                                    onChange={(event) => setValue(event.target.value)}
                                    value={value}
                                />
                                {
                                    typeNum === 3 ? <CssTextField

                                    autoFocus
                                    margin="dense"
                                    type="Password"

                                    label="New Password"
                                    fullWidth
                                    onChange={(event) => setValuePasword(event.target.value)}
                                    value={newPassword}
                                /> : <div style={{display:"none"}}></div>
                                }
                                <div
                                    style={{
                                        justifyContent: 'center',
                                        display: 'flex',
                                        flexDirection: 'row',
                                        flexWrap: 'wrap',
                                        alignItems: 'center'
                                    }}
                                >
                                  { typeNum === 3 ? <Button size="small"
                                        variant="contained"
                                        color="secondary"
                                        style={{
                                            margin: "20px 50px 0 50px",color:'#FFFFFF'
                                        }} onClick={handlePassClick}>
                                        Save
                             </Button> : <Button size="small"
                                        variant="contained"
                                        color="secondary"
                                        style={{
                                            margin: "20px 50px 0 50px",color:'#FFFFFF'
                                        }} onClick={handleClick}>
                                        Save
                                    </Button> }
                                </div>
                       
                            </Paper>
                             : <ImageUploader
                             withIcon={true}
                             style={{
                                 color:"black"
                             }}
                             buttonText='Choose images'
                             onChange={onDrop}
                             imgExtension={['.jpg','.png' ]}
                             maxFileSize={10485760}
                             label={'Max file size: 10mb, accepted: jpg,png'}
                         />  }
                        </Container>


                    </Dialog>

                    <Notification message={message} open={openNotification} close={handleNotificationClose} />

                </Container>

                :  <CircularProgress style={{
                    position: "fixed",
                    top: "50%",
                    left: "50%"
                }} disableShrink />}

        </div>


    );
}
