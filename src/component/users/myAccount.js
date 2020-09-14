import React from 'react';
import ReactGA from 'react-ga';

import { useHistory,Link } from "react-router-dom";
import { useEffect } from 'react';
import * as js from '../common/color.json';

import useMediaQuery from '@material-ui/core/useMediaQuery';
import Slide from '@material-ui/core/Slide';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Typography, Dialog, IconButton, AppBar, Toolbar, TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import List from '@material-ui/core/List';
 
import CloseIcon from '@material-ui/icons/Close';

import * as api from '../../api/user'
import * as pg from '../../api/pg'

import { useContext } from 'react';
import { HomeContext } from '../home';

import { WalletBonusContext } from '../home';


import { Paper, Container, Grid, Divider } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import Notification from '../common/notification'


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

let options = {}

const useStyles = makeStyles({
    list: {
        minWidth: 320,
    },
    fullList: {
        width: 'auto',
    },
    cell: {
        height: 50,
        width: 110,
        padding: 10,
        display: "flex",
        alignContent: "center",
        alignItems: "center",
        justifyContent: "center"
    },
    ...{
        root: {
            width: 750,

        },
        paper: {
            backgroundColor: "#F5F6FA"
        },
        progress: {
            width: "100%",
        },
        header: {
            maxWidth: 750,
        },

        grid: {
            maxWidth: 750,
            paddingTop: 10
        },
        gridCard: {
            alignItems: "center",
            width: "100%",
            display: "flex",
            alignContent: "center",
            justifyContent: "space-between",
            marginTop: 0,
        },

        gridCardContent: {
            display: "flex",
            justifyContent: "space-between",
            padding: "5px",
            width: "100%",
        },
        gridCardSubContent: {
            display: "flex",
            flexDirection: "column",
            marginLeft: "2.5px"
        },

        gridCardTeamText: {
            padding: "5px",

        },
        appBar: {
            top: 'auto',
            bottom: 0,
            color:"white"
        }
    }
});


export default function Profile() {
    const [team, setTeam] = React.useState({});
    const [amount, setamount] = React.useState(0);
    const [wait, setwait] = React.useState(false);
    const [, setWallet] = useContext(HomeContext)

    const [openTeam, setTeamOpen] = React.useState(false);

    const [message, setMessage] = React.useState("false");
    const [openNotification, setOpenNotifi] = React.useState(false);

    const [, setBonus] = useContext(WalletBonusContext)

    const history = useHistory()
    const theme = useTheme();

    const classes = useStyles();

    const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        document.body.appendChild(script);

        api.profile().then(response => {
            let data = {
                status: response.status,
                data: response.data.data
            }
            setTeam(data)
        })
    }, []);

    let { data } = team;

 

    const setAmount = (amount) => {
        setamount(amount)
    }

    const handleNotificationClose = () => {
        setOpenNotifi(false);
    }

    const handleNotificationClick = (message) => {
        setOpenNotifi(true);
        setMessage(message);

    }

    const handleClick = () => {
        setwait(true)
        handleTeamClose()
        pg.stripe(amount).then(response => {
            setwait(false)
            options = {
                key: 'rzp_test_XUhylBt5ecsoht',
                amount: response.data.amount, //  = INR 1
                order_id: response.data.id,
                handler: function (response) {
                    pg.success(response).then(result => {
                        handleNotificationClick(result.data.message)
                        api.profile().then(response => {
                            let data = {
                                status: response.status,
                                data: response.data.data
                            }
                            setTeam(data)
                            setWallet(response.data.data.wallet.balance)
                            setBonus(response.data.data.wallet.bonus)
                        }).catch(error => {
                            if (error.response) {
                                if (error.response.status === 401) {
                                    history.push({
                                        pathname: "/login"
                                    });
                                }
                            }
                        })
                    })
                },
                prefill: {
                    contact: "+91" + data.phone.phone,
                    email: data.email,
                },
                notes: response.data.notes,
            };
            var rzp1 = new window.Razorpay(options);
            rzp1.open();
        }).catch(() => {
            setwait(false)
           
            
            // handleNotificationClick(err.response.data.message);
        })



    };

    const handleTeamClose = () => {
        setTeamOpen(false);
    };


    return (
        <div >
            <Notification message={message} open={openNotification} close={handleNotificationClose} />

            {data ?
                <Container maxWidth={'sm'} style={{  marginTop:20, }}>
                    <Paper elevation={3}>
                        <Grid container  >
                            {/* <Grid item xs={12} sm={12} lg={12} style={{  
                    backgroundColor: color.secondary.main,
                    padding:10,
                    fontSize:'2rem',
                    color: 'white'}}>
                        <Typography variant="caption">
                            Wallet Details
                        </Typography>
                    </Grid> */}
                            <Grid item xs={12} sm={12} lg={12}>
                                <Divider />

                            </Grid>
                            <Grid item xs={6} sm={6} lg={6} style={{
                                textAlign: 'left',
                                color: "#9b9b9b",
                                fontWeight: 600,
                                fontSize: "1rem",
                                lineHeight: 1.5,
                                padding: '10px'
                            }}>
                                Total Balance
                        <br />
                                <span >
                                    <Typography variant="caption" style={{ fontSize: "1.25rem", color: "black" }} >
                                        ₹{Number.parseFloat(data.wallet.balance).toFixed(2)}
                                    </Typography>
                                </span>

                                {/* <br/> */}
                                <hr />
                                <div style={{
                                    textAlign: 'left',
                                    fontWeight: 600,
                                    fontSize: 'small',
                                    lineHeight: 1.5,
                                    // marginTop:20
                                }}>
                                    Bonus
                        <br />
                                    <span style={{ color: "black" }}>
                                        ₹{Number.parseFloat(data.wallet.bonus).toFixed(2)}
                                    </span>
                                    <br />
                                    <Typography variant="caption" style={{ fontSize: 10 }}>
                                        100% of can be used when joining a contest
                            </Typography>
                                </div>

                                <hr />
                                <div style={{
                                    textAlign: 'left',
                                    fontWeight: 600,
                                    fontSize: 'small',
                                    lineHeight: 1.5,
                                    // marginTop:20
                                }}>
                                    Withdrawable
                        <br />
                                    <span style={{ color: "black" }}>
                                        ₹{data.wallet.withdrawal || 0}
                                    </span>
                                    <br />
                                    <Typography variant="caption" style={{ fontSize: 10 }}>
                                        Minimum amount you can withdraw ₹200 
                            </Typography>
                            <br />
                                    <Typography variant="caption" style={{ fontSize: 10 }}>
                                        Minimum deposit should be ₹50 
                            </Typography>
                                </div>
                            </Grid>
                            <Grid item xs={6} sm={6} lg={6}
                                style={{
                                    fontWeight: 600,
                                    fontSize: 'smaller',
                                    display: 'flex',
                                    flexDirection: "column",
                                    justifyContent: "space-between",
                                    lineHeight: 1.5,
                                    alignItems: "flex-end",
                                    padding: '10px'
                                }}
                            >
                                <div

                                >
                                    <Button size="small" variant="outlined"
                                        onClick={() => setTeamOpen(true)}
                                        color="secondary"
                                    >Deposit
                            </Button>
                                </div>
                                <div>
                                <Link to={{ pathname: `/withdraw` }} style={{ textDecoration: 'none' }}>
                                <Button size="small"
                                        variant="outlined"
                                        color="secondary"
                                    >Withdraw</Button>
                            </Link>

                                </div>

                            </Grid>

                        </Grid>
                    </Paper>

                    <Paper>
                        <Grid container style={{ marginTop: '20px' }} >
                            {/* <Grid item xs={12} sm={12} lg={12} style={{  
                    backgroundColor: color.secondary.main,
                    padding:10,
                    color: 'white'}}>
                        <h4>
                            Bank Details
                        </h4>
                    </Grid>
                    <Grid item xs={12} sm={12} lg={12}>
                    <Divider />

                    </Grid>
                    <Grid item xs={12} sm={12} lg={12}style={{textAlign:'left',
                    fontWeight: 600,
                    fontSize: 'small',
                    lineHeight: 1.5,
                    padding: '10px'}}>
                        Acc Number
                        <br/>
                        XXXXX-123
       
                        <hr/>
                        <div style={{textAlign:'left',
                    fontWeight: 600,
                    fontSize: 'small',
                    lineHeight: 1.5,
                    // marginTop:20
                     }}>                      
                        Bank
                        <br/>
                        SBI
                        </div>
 
                          </Grid>
                     
                    </Grid>
                    </Paper>

                    <Paper>
                    <Grid container style={{ marginTop:'20px'}} >
     
                    <Grid item xs={12} sm={12} lg={12}>
 
                    </Grid> */}

                            <Grid item xs={6} sm={6} lg={6} style={{
                                textAlign: 'left',
                                fontWeight: 600,
                                fontSize: 'smaller',
                                lineHeight: 1.5,
                                padding: '10px',
                                display:"flex",
                                alignItems:"center"
                            }}>
                                <Link to={{ pathname: `/transactions` }} style={{ textDecoration: 'none' }}>
                                My Transactions
                            </Link>
                                
                            </Grid>
                            <Grid item xs={6} sm={6} lg={6} style={{
                                fontWeight: 600,
                                fontSize: 'smaller',
                                lineHeight: 1.5,
                                padding: '10px',
                                justifyContent:"flex-end",
                                display:"flex",
                                alignItems:"center"
                            }} >
                                 <Link to={{ pathname: `/transactions` }} style={{ textDecoration: 'none' }}>
                                 <ChevronRightIcon />
                            </Link>
                                
                            </Grid>

                        </Grid>
                    </Paper>



                </Container>

                : <CircularProgress style={{
                    position: "fixed",
                    top: "50%",
                    left: "50%"
                }} disableShrink />}

            <Dialog fullScreen={fullScreen} open={openTeam} onClose={handleTeamClose}  TransitionComponent={Transition}>
                <AppBar position={"relative"} className={classes.appBar} color="secondary">
                    <Toolbar>
                        <IconButton edge="start" style={{ color: "white" }} onClick={handleTeamClose} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            Deposit
            </Typography>
                    </Toolbar>
                </AppBar>
                <Container maxWidth="md" style={{ padding: 10,minWidth:256, }}>
                    <Paper elevation={0}   >
                        <List>
                            <TextField

                                autoFocus
                                margin="dense"
                                id="name"
                                label="Amount"
                                fullWidth
                                onChange={(event) => setAmount(event.target.value)}
                                value={amount}
                            />
                            <TextField

                                autoFocus
                                margin="dense"
                                id="name"
                                label="Promo code"
                                 
                                onChange={(event) => setAmount(event.target.value)}
                                value={''}
                                />
                            <div
                                style={{
                                    justifyContent: 'center',
                                    display: 'flex',
                                    flexDirection: 'row',
                                    flexWrap: 'wrap',
                                    alignItems: 'center'
                                }}
                            >
                                <Button size="medium" color="secondary" variant="contained" style={{
                                    width: 200
                                }} onClick={handleClick}>
                                    Deposit
                                     </Button>
                            </div>
                        </List>
                    </Paper>
                </Container>


            </Dialog>

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
