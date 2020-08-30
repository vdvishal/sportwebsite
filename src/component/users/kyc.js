/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import ReactGA from 'react-ga';

import { useHistory } from "react-router-dom";
import { useEffect } from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';


 
 import { Typography, Paper, Container, TextField } from '@material-ui/core';
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
    const [image, setImage] = React.useState('')

    const [wait] = React.useState(false);
    const [complete, setComplete] = React.useState(false);
    const [waitUpload, setwaitUpload] = React.useState(false);

    
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
 

    const handleDateChange = (date) => {
        setSelectedDate(date);
      };

    const onDrop = (e) => {
        const formdata = new FormData();

        formdata.append('image',e[0])
        setwaitUpload(true)
 

        api.uploadImage(formdata).then(response => {
                 setwaitUpload(false)
                if(response.status === 200){
                    setComplete(true)
                }
                setImage(response.data.link);

        })
    }

    const SubmitForm = () => {
 

        api.submitKyc({id:text,type,dob:selectedDate,image}).then(response => {
            if(response.status === 200){
                handleNotificationClick("Documents uploaded");
                setTimeout(() => {
                    history.goBack()
                }, 500);
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
                <Container maxWidth={'sm'} style={{ padding: 0 }}>
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
                             id="demo-simple-select"
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
                             id="demo-simple-select"
                            placeholder="Pan Card"//{type === 1 ? "Aadhar Card" : "Pan Card"}
                            value={text}
                            onChange={(event) => setIDText(event.target.value)}
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

                { !waitUpload && !complete ? <ImageUploader
                withIcon={true}
                buttonText='Choose images'
                onChange={onDrop}
                imgExtension={['.jpg','.png' ]}
                maxFileSize={10485760}
                label={'Max file size: 10mb, accepted: jpg,png'}
            /> : complete ?  <img src={image} alt="ID" />:
            <LinearProgress color="secondary" />}
 
                </Container>

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
