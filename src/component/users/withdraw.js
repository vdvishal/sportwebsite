import React from 'react';
import ReactGA from 'react-ga';

// import { useHistory, Link } from "react-router-dom";
import { useEffect } from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';

import { Typography, Paper, Container, TextField, Button } from '@material-ui/core';
import styled from 'styled-components'

import CircularProgress from '@material-ui/core/CircularProgress';

import ImageUploader from 'react-images-upload';

import Notification from '../common/notification'

import * as api from '../../api/user'




const Div = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
   grid-gap: 2px;
  align-items: center;
    text-align:left;
    padding:10px
 
 
`


export default function Profile() {

    const [bank, setTeam] = React.useState({});
    const [name, setName] = React.useState('');
    const [acc, setAcc] = React.useState('');
    const [IFSC, setIFSC] = React.useState('')

    const [withdraw, setWithdraw] = React.useState('')

    const [image, setImage] = React.useState('')


    // const [wait] = React.useState(false);
    const [complete, setComplete] = React.useState(false);
    const [waitUpload, setwaitUpload] = React.useState(false);

    const [message, setMessage] = React.useState("false");
    const [openNotification, setOpenNotifi] = React.useState(false);

    const onDrop = (e) => {
        const formdata = new FormData();

        formdata.append('image', e[0])
        setwaitUpload(true)


        api.uploadImage(formdata).then(response => {
            setwaitUpload(false)
            if (response.status === 200) {
                setComplete(true)
            }
            setImage(response.data.link);

        })
    }

    const SubmitForm = () => {


        api.submitBank({
            bankName:name,
            accNumber:acc,
            IFSC:IFSC,
            image:image
        }).then(response => {
            if (response.status === 200) {
                handleNotificationClick("Documents uploaded");

            }
        }).catch(err => {
            console.log(err.response)
        })
    }

    
    const SubmitWithdraw = () => {


        api.withdraw({
            amount:withdraw,
            type:1
        }).then(response => {
            if (response.status === 200) {
                handleNotificationClick("Withdraw request processing");
                window.location.reload()

            }

            if (response.status === 202) {
                handleNotificationClick(response.data.message);

            }
        }).catch(err => {
            console.log(err.response);
            
            handleNotificationClick(err.response ? err.response.message : '');
        })
    }

    const handleNotificationClick = (message) => {
        setOpenNotifi(true);
        setMessage(message);

    }

    useEffect(() => {

 
        profile();



    }, []);

    const profile = () => {
        api.profile().then(response => {
            console.log(response);

            setTeam(response.data.data)
        }).catch(error => {
            if (error.response) {

            }
        })
    }

    const setText = (value, type) => {
        switch (type) {
            case 1:
                setName(value)
                break;

            case 2:
                setAcc(value)
                break;

            case 3:
                setIFSC(value)
                break;
            default:
                break;
        }
    }

    const setAmount = (amount) => {
        let amt = parseFloat(amount);



        if (isNaN(amt)) {
            return handleNotificationClick("Amount must be a number")
        }

        if (amt > bank.wallet.withdrawal) {
            return handleNotificationClick("Amount must be less than the avail withdrawable amount.")
        }

        if(bank.bank !== undefined && bank.bank.reject !== true){
            setWithdraw(amt);
        }else{
            return handleNotificationClick("Submit your account details to proceed.")
        }

         
    }

    const handleNotificationClose = () => {
        setOpenNotifi(false);
    }

    

    return (
        Object.entries(bank).length > 0 ?
         <Container maxWidth="md" style={{
            marginTop:45
        }}>
            <Notification message={message} open={openNotification} close={handleNotificationClose} />

            {bank.bank !== undefined && bank.bank.reject !== true? <Paper>
                <Div>
                    <div>
                        <Typography variant="caption">
                            Bank
                            </Typography>
                    </div>
                    <div>
                        <Typography variant="caption">
                            {bank.bank.bankName}
                            </Typography>
                    </div>
                </Div>
                <Div>
                    <div>
                        <Typography variant="caption">
                            Account Number
                            </Typography>
                    </div>
                    <div>
                        <Typography variant="caption">
                        {bank.bank.accNumber}
                            </Typography>
                    </div>
                </Div>
                <Div>
                    <div>
                        <Typography variant="caption">
                            IFSC
                            </Typography>
                    </div>
                    <div>
                        <Typography variant="caption">
                        {bank.bank.IFSC}
                            </Typography>
                    </div>
                </Div>
                <Div>
                    <div>
                        <Typography variant="caption">
                            Verified
                            </Typography>
                    </div>
                    <div>
                        <Typography variant="caption">
                        {bank.bank.verified ? 
                        <span style={{color:"green"}} >Verified</span>:
                        
                        <span style={{color:"red"}} >Unverified</span>
                        }
                            </Typography>
                    </div>
                </Div>

            </Paper> :
                <Paper style={{
                    padding: 10
                }}>
                    <Div>
                        <div>
                            <Typography variant="caption">
                                Bank Name
                            </Typography>
                        </div>
                        <div>
                            <TextField


                                id="demo-simple-select"
                                value={name}
                                onChange={(event) => setText(event.target.value, 1)}
                            >

                            </TextField>
                        </div>
                    </Div>
                    <Div>
                        <div>
                            <Typography variant="caption">
                                Account Number
                            </Typography>
                        </div>
                        <div>
                            <TextField


                                id="demo-simple-select"
                                value={acc}
                                onChange={(event) => setText(event.target.value, 2)}
                            >

                            </TextField>
                        </div>
                    </Div>
                    <Div>
                        <div>
                            <Typography variant="caption">
                                IFSC
                            </Typography>
                        </div>
                        <div>
                            <TextField


                                id="demo-simple-select"
                                value={IFSC}
                                onChange={(event) => setText(event.target.value, 3)}
                            >

                            </TextField>
                        </div>
                    </Div>
                    <Div

                    >
                        <div>
                            <Typography variant="caption">
                               Your Bank Address
                            </Typography>
                            <br />
                            <Typography variant="caption">
                                *Your name should match with pan card.
                            </Typography>
                        </div>

                    </Div>
                    <div>

                        <div>
                            {!waitUpload && !complete ? <ImageUploader
                                withIcon={true}
                                buttonText='Choose images'
                                onChange={onDrop}
                                imgExtension={['.jpg','.png' ]}
                                maxFileSize={10485760}
                                label={'Max file size: 10mb, accepted: jpg,png'}
                            /> : complete ? <img src={image} alt="ID" /> :
                                    <LinearProgress color="secondary" />}
                        </div>
                    </div>

                    <div
                        style={{ padding: "20px 10px 0 0", textAlign: "end" }}
                    >
                        <Button variant="outlined" onClick={SubmitForm}>Submit</Button>
                    </div>
                </Paper>
            }
            <Paper style={{
                padding: 10,
                marginTop: 10
            }}>
                <Div>
                    <div>
                        <Typography variant="caption">
                            Withdrawable
                            </Typography>
                    </div>
                    <div>
                        <Typography variant="caption">


                            <span style={{ color: "black", fontWeight: 600 }}>
                                ₹{isNaN(Number.parseFloat(bank.wallet.withdrawal).toFixed(2)) ? 0 : Number.parseFloat(bank.wallet.withdrawal).toFixed(2) }
                            </span>
                        </Typography>
                    </div>
                </Div>
                <Div>
                    <div>
                        <Typography variant="caption">
                            Withdraw Amount
                            </Typography>
                    </div>
                    <div>
                        <TextField


                            id="demo-simple-select"
                            value={withdraw}

                            onChange={(event) => setAmount(event.target.value)}
                        >

                        </TextField>

                    </div>
                </Div>
                <div
                        style={{ padding: "20px 10px 0 0", textAlign: "end" }}
                    >
                        <Button variant="outlined" onClick={SubmitWithdraw}>Submit</Button>
                    </div>
            </Paper>

        </Container>

            : <CircularProgress style={{
                position: "fixed",
                top: "50%",
                left: "50%"
            }} disableShrink />
    )

}