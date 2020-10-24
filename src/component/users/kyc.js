/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import ReactGA from 'react-ga';

import { useHistory } from "react-router-dom";
import { useEffect } from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';


 
 import { Typography, Paper, Container, TextField,Badge } from '@material-ui/core';
import Button from '@material-ui/core/Button';
 
import CircularProgress from '@material-ui/core/CircularProgress';
import Notification from '../common/notification'
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import DateFnsUtils from '@date-io/date-fns';
import ImageUploader from 'react-images-upload';

import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
  } from '@material-ui/pickers';


import * as api from '../../api/user'







 

export default function KYC() {
    const [team, setTeam] = React.useState({});
    const [type, setType] = React.useState(2);
    const [text, setText] = React.useState('');
    const [text2, setText2] = React.useState('');

    
    const [image, setImage] = React.useState('')
    const [image2, setImage2] = React.useState('')
    const [image3, setImage3] = React.useState('')

    const [wait] = React.useState(false);

    const [complete, setComplete] = React.useState(false);
    const [waitUpload, setwaitUpload] = React.useState(false);

    const [complete2, setComplete2] = React.useState(false);
    const [waitUpload2, setwaitUpload2] = React.useState(false);

    const [complete3, setComplete3] = React.useState(false);
    const [waitUpload3, setwaitUpload3] = React.useState(false);

    
    const [message, setMessage] = React.useState("false");
    const [openNotification, setOpenNotifi] = React.useState(false);

    const [selectedDate, setSelectedDate] = React.useState(new Date('2002-01-01T00:00:00'));

    const history = useHistory()
 


    useEffect(() => {


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

    }, []);

    let { data } = team;

 

    const handleNotificationClose = () => {
        setOpenNotifi(false);
    }


    const setID = (value) => {
        setType(value)
    };

    const setIDText = (value) => {
        setText(value)
    }

    const setIDText2 = (value) => {
        setText2(value)
    }
 

    const handleDateChange = (date) => {
        setSelectedDate(date);
      };

    const onDrop = (e) => {
        const formdata = new FormData();

        formdata.append('image',e[0])
        for (var pair of formdata.entries()) {
            console.log(pair[0]+ ', ' + pair[1]); 
        }
                setwaitUpload(true)
 

        api.uploadImage(formdata).then(response => {
                 setwaitUpload(false)
                if(response.status === 200){
                    setComplete(true)
                }
                setImage(response.data ? response.data.link : '');

        })
    }

    const onDrop2 = (e) => {
        const formdata = new FormData();

        formdata.append('image',e[0])
        setwaitUpload2(true)
 

        api.uploadImage(formdata).then(response => {
            setwaitUpload2(false)
            if(response.status === 200){
                setComplete2(true)
            }
                setImage2(response.data ? response.data.link : '');

        })
    }

    const onDrop3 = (e) => {
        const formdata = new FormData();

        formdata.append('image',e[0])
        setwaitUpload3(true)
 

        api.uploadImage(formdata).then(response => {
                 setwaitUpload3(false)
                if(response.status === 200){
                    setComplete3(true)
                }
                setImage3(response.data ? response.data.link : '');

        })
    }

    const SubmitForm = () => {
        

        api.submitKyc({id:text,aadhar:text2,type,dob:selectedDate,image,aadharFront:image2,aadharBack:image3}).then(response => {
            if(response.status === 200){
                handleNotificationClick("Documents uploaded");
                setTimeout(() => {
                    history.push('/profile')
                }, 500);
            }else{
                handleNotificationClick(response.data.message);
            }
        })
    }

    const handleNotificationClick = (message) => {
        setOpenNotifi(true);
        setMessage(message);
    
      }

    return (
        <div >
            <Notification message={message} open={openNotification} close={handleNotificationClose} />

            {data ?
                !data.documentSubmitted ?<Container maxWidth={'sm'} style={{ padding: 0 }}>
                    <Paper square style={{display:"flex",flexDirection:"row",justifyContent:"center"}}>
                         
                            <Typography variant="caption" style={{ padding: 10,fontSize:"1em",fontWeight:700 }}>
                                KYC
                            </Typography>
 
                    </Paper>
                    <Paper style={{display:"flex",flexDirection:"column",marginTop:15,fontWeight:700,padding:10}}>
                        {/* <div>
                            <Typography variant="caption"  style={{ padding: 10,color:"grey",fontSize:"0.75em",fontWeight:700 }}>
                                ID Verification
                            </Typography>
                        </div> */}
                        <div
                       
                            >
                             <Select
                             
                            value={type}
                            onChange={(event) => setID(event.target.value)}
                            >
                                {/* <MenuItem value={1}>Aadhar Card</MenuItem> */}
                                <MenuItem value={2}>
                                    
                                    <Typography variant="caption"  style={{ color:"grey",fontSize:"0.75em",fontWeight:700 }}>
                                    Pan Card
                                        </Typography>
                                    </MenuItem>
                            </Select>
                        </div>
                        <div
                        style={{ padding:"20px 10px 0 0",}}
                            >
                             <TextField
                             
                            placeholder="Pan Card"//{type === 1 ? "Aadhar Card" : "Pan Card"}
                            value={text}
                            onChange={(event) => setIDText(event.target.value)}
                            >
                               
                            </TextField>
                        </div>
                        <div
                        style={{ padding:"20px 10px 0 0",}}
                            >
                             <TextField
                            helperText="*Address proof"
                            
                            placeholder="Aadhaar Number"//{type === 1 ? "Aadhar Card" : "Pan Card"}
                            value={text2}
                            onChange={(event) => setIDText2(event.target.value)}
                            >
                               
                            </TextField>
                        </div>
                        <div
                        style={{ padding:"20px 10px 0 0",}}
                            >
                                 <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDatePicker
                                // disableToolbar
                                variant="inline"

                                format="MM/dd/yyyy"
                                margin="normal"
                                id="date-picker-inline"
                                label="Date of birth"
                                value={selectedDate}
                                onChange={handleDateChange}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                                />
                                </MuiPickersUtilsProvider>
                        </div>

                        <div
                        style={{ padding:"20px 10px 0 0",}}
                            >
                            <Button variant="outlined" onClick={SubmitForm}>Submit</Button>
                        </div>
                    </Paper>
                    <Paper elevation={0} style={{
                        backgroundColor:'rgba(0,0,0,0)',
                        display:"flex",
                        flexDirection:"row",
                        flexWrap:"wrap",
                        color:"black"
                    }}>

                    

                { !waitUpload && !complete ? <ImageUploader
                withIcon={true}
                buttonText='Pan card'
                onChange={onDrop}
                imgExtension={['.jpg','.png', '.jpeg' ]}
                maxFileSize={10485760}
                label={'Max file size: 10mb, accepted: jpg,png,jpeg'}
            /> : complete ?
            <Badge 
            color="secondary" badgeContent={
                'X'
            } 
            style={{cursor:"pointer"}}
            onClick={()=>{setImage('');setComplete(false)}}
            >
            <img src={image} height="100px" style={{margin:10}} alt="Pan card" />
            </Badge> 
            :
            <LinearProgress color="secondary" />}
            
                    

            { !waitUpload2 && !complete2 ? <ImageUploader
                withIcon={true}
                buttonText='Aadhaar card Front'
                onChange={onDrop2}
                imgExtension={['.jpg','.png', '.jpeg' ]}
                maxFileSize={10485760}
                label={'Max file size: 10mb, accepted: jpg,png,jpeg'}
            /> : complete2 ? 
            <Badge 
            color="secondary" badgeContent={
                'X'
            } 
            style={{cursor:"pointer"}}
            onClick={()=>{setImage2('');setComplete2(false)}}
            >
            <img src={image2} height="100px"  style={{margin:10}} alt="Aadhaar" />
            </Badge>  :
            <LinearProgress color="secondary" />}

            { !waitUpload3 && !complete3 ? <ImageUploader
                withIcon={true}
                buttonText='Aadhaar card Back'
                onChange={onDrop3}
                imgExtension={['.jpg','.png', '.jpeg' ]}
                maxFileSize={10485760}
                label={'Max file size: 10mb, accepted: jpg,png,jpeg'}

            /> : complete3 ?  <Badge 
            color="secondary" badgeContent={
                'X'
            } 
            style={{cursor:"pointer"}}
            onClick={()=>{setImage3('');setComplete3(false)}}
            >
            <img src={image3} height="100px"  style={{margin:10}} alt="Aadhaar" />
            </Badge> :
            <LinearProgress color="secondary" />}
                </Paper>
                </Container> : 
                <Paper elevation={0}  style={{marginTop:15,background:"rgba(0,0,0,0)",textAlign:"center"}} >
                    
                    <Typography variant="caption">
                    Document Submitted
                    </Typography>
                    
                </Paper>

                : <CircularProgress style={{
                    position: "fixed",
                    top: "50%",
                    left: "50%"
                }} disableShrink />}

 
            {wait ? (
                <div style={{
                    position: 'fixed',
                    zIndex: 999
                }}>
                    <CircularProgress style={{
                        position: "fixed",
                        top: "50%",
                        left: "50%"
                    }} disableShrink />
                </div>
            ) : <div style={{
                position: 'fixed',
                zIndex: 999, display: 'none'
            }}></div>}


        </div>


    );
}
