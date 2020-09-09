import React from 'react';
import ReactGA from 'react-ga';

import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import Drawer from '@material-ui/core/Drawer';
import { makeStyles,useTheme } from '@material-ui/core/styles';
import clsx from 'clsx';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import Container from '@material-ui/core/Container';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';

import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
// import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import { Paper,  Typography, Divider } from '@material-ui/core';
// import ArrowRightAltSharpIcon from '@material-ui/icons/ArrowRightAltSharp';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';

import * as combo from '../../image/comboExample.png' 
import * as payslip from '../../image/comboExampleMoney.png' 

import * as combo2 from '../../image/underExampleMoney.png' 
import * as payslip2 from '../../image/underExampleMoney2.png' 

import * as step1 from '../../image/customStep1.png' 
import * as step2 from '../../image/customStep2.png' 
import * as step3 from '../../image/customStep3.png' 

import * as step4 from '../../image/customStep4.png' 
import * as step5 from '../../image/customStep5.png' 

import * as step4a from '../../image/customStep4a.png' 
import * as step5a from '../../image/customStep5a.png' 

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {

        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginRight: drawerWidth,
    },
    title: {
        flexGrow: 1,
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-start',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginRight: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginRight: 0,
    },
}));


export default function FAQ() {



    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const [index, setIndexOpen] = React.useState(0);

    const history = useHistory()
    const check = useMediaQuery(theme.breakpoints.down('md'));

    useEffect(() => {


    }, []);


    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const goBack = () => {
        history.goBack()
    }

    const toggle = (index) => {
        setIndexOpen(index)
        handleDrawerClose()
    }

    return (
        <div>
            <Container maxWidth="md" style={{
                display: "flex",
                flexDirection: "column",
                flexWrap: "wrap",
                marginTop: 10
            }}>

                <div className={classes.root}>
                    <CssBaseline />
                    <AppBar
                        position="fixed"

                        className={clsx(classes.appBar, {
                            [classes.appBarShift]: open,
                        })}
                    >
                        <Toolbar>
                        <IconButton edge="start" style={{ color: "white" }} onClick={goBack} aria-label="close">
                <CloseIcon />
              </IconButton>
                            <Typography variant="h6" noWrap className={classes.title}>
                                FAQ
          </Typography>
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                edge="end"
                                onClick={handleDrawerOpen}
                                className={clsx(open && classes.hide)}
                            >
                                <MenuIcon />
                            </IconButton>
                        </Toolbar>
                    </AppBar>
                    <div

                        style={{
                            padding: 0
                        }}
                    >
                        <h3><strong>
                            WELCOME TO FANTASY JUTSU
                            </strong></h3>
                       
                       
                        
                        <Paper style={index === 0 ? {
                            display: "block",
                            padding: 20,
                        } : {
                                display: "none",
                            }}

                        >
                                                        <h3><strong>
                                Overview
                                </strong></h3>
                            <Typography variant="caption"  >
                                Fantasy Jutsu is a online fantasy platform that has started its journey to provide fun,
                                 yet challenging contest with lucrative prizes and payouts.
                                <br/>
                                The games here can be grouped into three categories:
              </Typography>
                            

                            <h3><strong>
                                1. Under/Over
                                </strong></h3>
                           
                            <Typography variant="caption"  >
                                {/* Are you tired of losing money on huge contest and want a change. Is it hard for you follow every player and merely depend on luck to win contests than, play our under/over contest. */}
            </Typography>
                           <Typography variant="caption"  >


            Here, a wide range of players with fantasy points outcome are given in match.
            Simply select a minimum of two correct player outcomes and win cash prizes.
            <a onClick={() => toggle(1)} style={{color:"blue",cursor:"pointer"}}> Click here</a>
            </Typography>
            <br/>
            <Typography variant="caption"  >
            The fantasy points are based on standard rules.
           </Typography>
                            
                            <h3><strong>
                                2. Combo Duels
                                </strong></h3>
                           
                           <Typography variant="caption"  >
                                This is another type of contest similar to under/over.
            

            Here, players are faced against each other and winner of each face off is selected based on
            the player who collects the most fantasy points during a given match.
            Simply select a minimum of three correct winning player and win cash prizes.
            <a onClick={() => toggle(2)} style={{color:"blue",cursor:"pointer"}}> Click here</a>
            
            
           </Typography>
           <br/>
            <Typography variant="caption"  >
            The fantasy points are based on standard rules.
           </Typography>
                            
                            <h3><strong>
                                3. Fantasy 11
                                </strong></h3>
                           
                           <Typography variant="caption"  >
                                This is a classic fantasy team contest for people who have extensive knowledge about the game.
            

            Here, create a team of 11 players and join one of contest available. The teams in the winning prize range
            are paid out accordingly.
            
            The fantasy points are based on standard rules.
           </Typography>
           <br/>
            <Typography variant="caption"  >
            The fantasy points are based on standard rules.
           </Typography>
                            
                            <h3><strong>
                            4. Custom Duels
                                </strong></h3>
                           
                           <Typography variant="caption"  >
                            This is a user vs user mode. There are two sub types: 
 
                                
                            <br/>
                            a. Under/Over
                            <br/>
                            b. Duels
                            <br/>

                            *Payouts are always 1.9 times the joining fee
                            <br/>
                            <a onClick={() => toggle(4)} style={{color:"blue",cursor:"pointer"}}> More Info</a>
                            <br/>
            The fantasy points are based on standard rules.
           </Typography>
           
                        </Paper>

                        <Paper style={index === 1 ? {
                            display: "block",
                            padding: 20,
                        } : {
                                display: "none",
                            }}

                        >


                            <h3><strong>
                                Under/Over
                                </strong></h3>
                           
                                <Typography variant="caption"  >
                               1. Pick a winner in 2 duels.
          </Typography>
                            <div style={{maxWidth:"970px"}} >
                                <img src={combo2} style={{maxWidth:"100%"}} alt="combo"/>
                            </div>
                            <br/>

                            <Typography variant="caption"  >
                                2. Add your desired money and confirm to join.
          </Typography>
                        <div style={{maxWidth:"970px"}}>
                                <img src={payslip2} style={{maxWidth:"100%"}} alt="combo"/>
                            </div>
                            <br/>
                            <Typography variant="caption"  >
                                3. Wait for the results.
          </Typography>
                         
                            <br/>
                            
                            <h3><strong>
                                Combine 10 contest and get 500 times your money
                                </strong></h3>
                            
                           <Typography variant="caption"  >
                                *All selected outcomes need to be right in order to win the prize payout.
          </Typography>
                           <br/> 
                           <Typography variant="caption"  >
                                *Even if you get 1 of your selections wrong, your payout will be invalidated.
          </Typography>
                            
                            <h3><strong>
                                Cancellations
                                </strong></h3>
                            
                           <Typography variant="caption"  >
                                If a player did not get start in the starting 11, the contest will cancelled and the prize ladder will reduced by one step.
                                In case on all selected players did not start in starting 11, full amount will be refunded.
          </Typography>

          <h3><strong>
                                Payout Ladder
                                </strong></h3>
                            
                                <Paper elevation={3} style={{maxWidth:260,padding:2.5}}>
                                <table style={{minWidth:260}}>
                                    <tbody >
                                        <tr style={{border:"1px solid black",borderCollapse: "collapse"}}>
                                            <th align="center" style={{width:125}}>Correct Pick</th>
                                            <th align="middle">Multiplier</th>
                                        </tr>
                                        <tr>
                                            <td align="center" style={{width:125}}>1</td>
                                            <td align="middle">1.5</td>
                                            
                                        </tr>
                                        <tr>
                                            <td align="center" style={{width:125}}>2</td>
                                            <td align="middle">3</td>
                  
                                        </tr>
                                        <tr>
                                            <td align="center" style={{width:125}}>3</td>
                                            <td align="middle">5</td>
             
                                        </tr>
                                        <tr>
                                            <td align="center" style={{width:125}}>4</td>
                                            <td align="middle">11</td>
   
                                        </tr>
                                        <tr>
                                            <td align="center" style={{width:125}}>5</td>
                                            <td align="middle">26</td>
   
                                        </tr>
                                        <tr>
                                            <td align="center" style={{width:125}}>6</td>
                                            <td align="middle">40</td>
   
                                        </tr>
                                        <tr>
                                            <td align="center" style={{width:125}}>7</td>
                                            <td align="middle">75</td>
   
                                        </tr>
                                        <tr>
                                            <td align="center" style={{width:125}}>8</td>
                                            <td align="middle">125</td>
   
                                        </tr>
                                        <tr>
                                            <td align="center" style={{width:125}}>9</td>
                                            <td align="middle">250</td>
   
                                        </tr>
                                        <tr>
                                            <td align="center" style={{width:125}}>10</td>
                                            <td align="middle">500</td>
   
                                        </tr>
                                    </tbody>
                                     </table>

                            </Paper>
 
                        </Paper>
                        <Paper style={index === 2 ? {
                            display: "block",
                            padding: 20,
                        } : {
                                display: "none",
                            }}

                        >


                            <h3><strong>
                                Combo Duels
                                </strong></h3>
                           

                           <Typography variant="caption"  >
                               1. Pick a winner in 3 duels.
          </Typography>
                            <div style={{maxWidth:"970px"}}>
                                <img src={combo} style={{maxWidth:"100%"}} alt="combo"/>
                            </div>
                            <br/>

                            <Typography variant="caption"  >
                                2. Add your desired money and confirm to join.
          </Typography>
                        <div style={{maxWidth:"970px"}}>
                                <img src={payslip} alt="combo" style={{maxWidth:"100%"}}/>
                            </div>
                            <br/>
                            <Typography variant="caption"  >
                                3. Wait for the results.
          </Typography>
                         
                            <br/>
                           <Typography variant="caption"  >
                                
          </Typography>
                            
                            <h3><strong>
                                Combine 10 contest and get 250 times your money
                                </strong></h3>
                            
                           <Typography variant="caption"  >
                                *All selected outcomes need to be right in order to win the prize payout.
          </Typography>
                            <br/>
                           <Typography variant="caption"  >
                                *Even if you get 1 of your selections wrong, your payout will be invalidated.
          </Typography>
                            
                            <h3><strong>
                                Draw Cases
                                </strong></h3>
                            
                           <Typography variant="caption"  >
                                Since there is a possibility of a draw between two players. The player with a start mark will have a handicap.
                                So, incase of a draw the player with the handicap will win the duel.
          </Typography>
                            
                            <h3><strong>
                                Cancellations
                                </strong></h3>
                            

                           <Typography variant="caption"  >
                                If a player did not get start in the starting 11, the contest will cancelled and the prize ladder will reduced by one step.
                                In case on all selected players did not start in starting 11, full amount will be refunded.
          </Typography>

          <h3><strong>
                                Payout Ladder
                                </strong></h3>

          <Paper elevation={3} style={{maxWidth:260 }}>
                                <table style={{ minWidth:260}}>
                                    <tbody  >
                                        <tr style={{borderCollapse: "collapse"}}>
                                            <th align="center" style={{width:125}}>Correct Pick</th>
                                            <th align="middle">Multiplier</th>
                                        </tr>
                                        <tr>
                                            <td align="center" style={{width:125}}>1</td>
                                            <td align="middle">1.5</td>
                                            
                                        </tr>
                                        <tr>
                                            <td align="center" style={{width:125}}>2</td>
                                            <td align="middle">2</td>
                  
                                        </tr>
                                        <tr>
                                            <td align="center" style={{width:125}}>3</td>
                                            <td align="middle">3</td>
             
                                        </tr>
                                        <tr>
                                            <td align="center" style={{width:125}}>4</td>
                                            <td align="middle">5</td>
   
                                        </tr>
                                        <tr>
                                            <td align="center" style={{width:125}}>5</td>
                                            <td align="middle">11</td>
   
                                        </tr>
                                        <tr>
                                            <td align="center" style={{width:125}}>6</td>
                                            <td align="middle">26</td>
   
                                        </tr>
                                        <tr>
                                            <td align="center" style={{width:125}}>7</td>
                                            <td align="middle">40</td>
   
                                        </tr>
                                        <tr>
                                            <td align="center" style={{width:125}}>8</td>
                                            <td align="middle">75</td>
   
                                        </tr>
                                        <tr>
                                            <td align="center" style={{width:125}}>9</td>
                                            <td align="middle">125</td>
   
                                        </tr>
                                        <tr>
                                            <td align="center" style={{width:125}}>10</td>
                                            <td align="middle">250</td>
   
                                        </tr>
                                    </tbody>
                                     </table>

                            </Paper>
                        </Paper>


                        <Paper style={index === 3 ? {
                            display: "block",
                            padding: 20,
                        } : {
                                display: "none",
                            }}

                        >


                            <h3><strong>
                                Fantasy 11
                                </strong></h3>
                           

                           <Typography variant="caption"  >

                            </Typography>
                            
                              
                            <h3><strong>
                                Create a team
                                </strong></h3>
                            
                           <Typography variant="caption"  >
                                Every cricket team you build has to
                                    have 11 players, of which a <span>maximum of 7 players</span>
                                    can be from any one team playing the respective match.
                         </Typography>
                            
                            
                            <Paper elevation={3} style={{maxWidth:260,padding:2.5}}>
                                <table style={{minWidth:260}}>
                                    <tbody>
                                        <tr>
                                            <th align="left">Player Type</th>
                                            <th align="middle">Min</th>
                                            <th align="middle">Max</th>
                                        </tr>
                                        <tr>
                                            <td>Wicket Keeper - WK</td>
                                            <td align="middle">1</td>
                                            <td align="middle">4</td>
                                        </tr>
                                        <tr>
                                            <td>Batsman - BAT</td>
                                            <td align="middle">3</td>
                                            <td align="middle">6</td>
                                        </tr>
                                        <tr>
                                            <td>All Rounder - AR</td>
                                            <td align="middle">1</td>
                                            <td align="middle">4</td>
                                        </tr>
                                        <tr>
                                            <td>Bowler - BWL</td>
                                            <td align="middle">3</td>
                                            <td align="middle">6</td>
                                        </tr>
                                    </tbody>
                                     </table>

                            </Paper>
 
                            
                            <h3><strong>
                                Captain and Vice-Captain
                                </strong></h3>
                                <Typography variant="caption"  >
                             Select a captain and vice captain.
                             </Typography>
                             <br/>
                           <Typography variant="caption"  >
                             The captain will give you 2x points scored. 
                             </Typography>
                            
                           <Typography variant="caption"  >
                             The vice-captain will give you 1.5x points scored. 
                             </Typography>
                             
                             <br/>
                             <h3><strong>
                               Select a contest and join
                                </strong></h3>
                        </Paper>


                        <Paper style={index === 4 ? {
                            display: "block",
                            padding: 20,
                        } : {
                                display: "none",
                            }}

                        >


                            <h3><strong>
                                Custom Duels
                                </strong></h3>
                           
                                <h5><strong>
                                Creating Duels
                                </strong></h5>
                           
                            <div style={{maxWidth:"970px"}}>
                                <img src={step1} style={{maxWidth:"100%"}} alt="combo"/>
                            </div>
                            <br/>

                            <Typography variant="caption"  >
                               a. Under/Over Duels
                            </Typography>
                        <div style={{maxWidth:"970px"}}>
                                <img src={step2} alt="combo" style={{maxWidth:"100%"}}/>
                            </div>
                            <br/>
                            <Typography variant="caption"  >
                               b. Player Duels 
                             </Typography>
                            <div style={{maxWidth:"970px"}}>
                                <img src={step3} alt="combo" style={{maxWidth:"100%"}}/>
                            </div>
                            <br/>
                            
                         
                 
                            <hr/>
                            <h5><strong>
                                Joining Duels
                                </strong></h5>
                           
                                <Typography variant="caption"  >
                               a. Under/Over Duels
                            </Typography>
 
                            <br/>
                             <Typography variant="caption"  >
                               i. Click here
                             </Typography>
                            <div style={{maxWidth:"970px"}}>
                                <img src={step4a} alt="combo" style={{maxWidth:"100%"}}/>
                            </div>
                            <Typography variant="caption"  >
                               ii. Confirm
                             </Typography>
                            <div style={{maxWidth:"970px"}}>
                                <img src={step5a} alt="combo" style={{maxWidth:"100%"}}/>
                            </div>
                            <hr/>
                            <Typography variant="caption"  >
                               b. Player Duels 
                             </Typography>
                             <br/>
                             <Typography variant="caption"  >
                               i. Click here
                             </Typography>
                            <div style={{maxWidth:"970px"}}>
                                <img src={step4} alt="combo" style={{maxWidth:"100%"}}/>
                            </div>
                            <Typography variant="caption"  >
                               ii. Select a player and Confirm
                             </Typography>
                            <div style={{maxWidth:"970px"}}>
                                <img src={step5} alt="combo" style={{maxWidth:"100%"}}/>
                            </div>

                            <hr />
                            <h5><strong>
                               *Payout is always 1.9 times
                            </strong>
                            </h5>
                            <h5><strong>
                            *The user who joins your duel has a handicap i.e incase of a tie between two player, the challenger wins the duel.

                            </strong>
                            </h5>
                            <h5><strong>
                            *Player with star mark indicates a handicap
                            </strong>
                            </h5>
                            <h5><strong>
                            *The handicap is only applicable in player duels.
                            </strong>
                            </h5>
                             

                        </Paper>




                            <Paper
                                style={index === 5 ? {
                                    display: "block",
                                    padding: 20,
                                } : {
                                        display: "none",
                                    }}
                            >
                             <h3><strong>Account Overview</strong></h3>
<Typography variant="caption"  >You are only allowed to register one account at Fantasy Jutsu.</Typography>
<Typography variant="caption"   dir="ltr">To view your account details, go to “My Account” in top right corner. This is where you can check your balance and transaction history and make withdrawal requests.</Typography>
<Typography variant="caption"   dir="ltr">If you wish to terminate your account at Fantasyjutsu.com, please send an email to support@fantasyjutsu.com and provide us with your personal details (name, address and username) so we can administrate your wish.</Typography>
<h3><strong>Personal details</strong></h3>
<Typography variant="caption"   dir="ltr">To edit your personal settings, go to “My Profile”. You can edit some of your personal details, but if you wish to edit your  address, DOB or bank details, you have to send a request to support@fantasyjutsu.com.</Typography>
<h3><strong>Login</strong></h3>
<Typography variant="caption"   dir="ltr">To login you can use your phone number or email address along with password</Typography>
<h3><strong>Register</strong></h3>
<Typography variant="caption"   dir="ltr">To register you have to provide details of your email, phone number and password. Your account will be activated only after you have verified it.</Typography>
<Typography variant="caption"   dir="ltr">You can also use your google or facebook account to register in the site.</Typography>


                            </Paper>

                            <Paper
                                style={index === 6 ? {
                                    display: "block",
                                    padding: 20,
                                } : {
                                        display: "none",
                                    }}
                            >
                             <h3><strong>Account Verification</strong></h3>
<Typography variant="caption"  >For Verification of account navigate to "my profile section", and submit a clear image of <span style={{fontWeight:500}}> pan card</span>  with your date of birth</Typography>
<br/>
<Typography variant="caption"  >If your entered number does not match with submitted image it will be rejected.</Typography>
<br/>
<Typography variant="caption"  >The time to verify your account is usually take 2-3 days.</Typography>
<br/>
<Typography variant="caption"  >Currently, individuals residing in the Indian states of Assam, Odisha, Sikkim, Nagaland or Telangana may not use our platform nor will the account be verified or even some cases banned.</Typography>
<br/>
<Typography variant="caption"  >Your address will be verified during your submission of bank details.</Typography>

                            </Paper>

                            <Paper
                                style={index === 7 ? {
                                    display: "block",
                                    padding: 20,
                                } : {
                                        display: "none",
                                    }}
                            >
                             <h3><strong>Deposits</strong></h3>
<Typography variant="caption"  ></Typography>

<Typography variant="caption"  >Deposit can be done through multiple channels from bank deposit,credit cards, debit card, UPI. We use reputed and verified third party payment gateways that have security layers and comply with every single law on online transactions.</Typography>

<h3><strong>Withdrawals</strong></h3>

<Typography variant="caption"  >Withdrawals are processed only after your bank account is verified and has the same matching name as submitted verification documents.</Typography>

<Typography variant="caption"  >The minimum withdrawal limit is ₹250 to maximum of ₹1lakh at a time. </Typography>


<h4>Details required</h4>

<Typography variant="caption"  >Name of the bank, Name of the branch, Name of account holder, account no. and IFSC code.</Typography>

<Typography variant="caption"  >A clear image of bank passbook with your name and address is required for address verification.</Typography>

<Typography variant="caption"  >You should double check your account no. and IFSC code, if you provide a wrong detail and the withdrawal goes to wrong address we will not be held responsible nor take responsibility of the error.</Typography>

                            </Paper>

                            <Paper
                                style={index === 8 ? {
                                    display: "block",
                                    padding: 20,
                                } : {
                                        display: "none",
                                    }}
                            >
                             <h3><strong>Bonus and Promotions</strong></h3>
 

<h3><strong>Bonus</strong></h3>

<Typography variant="caption"  >Currently, we are offering a 100% deposit bonus on 1st deposit upto ₹50.</Typography>

<Typography variant="caption"  >This amount can't be withdrawed to bank account.</Typography>

<h3><strong>Promotions</strong></h3>

<h4>Signup Bonus</h4>

<Typography variant="caption"  >Signup Bonus, we are offering a ₹50 signup bonus for limited period.</Typography>

<h4>Referral Bonus</h4>

<Typography variant="caption"  >A bonus of ₹50 is added everytime someone uses your referral code.</Typography>
<br/>
<Typography variant="caption"  >* If a user is found to use fake emails and phone number to gain bonus, we will ban the user account with no further notice.</Typography>

                            </Paper>


                    </div>
                    <Drawer
                        className={classes.drawer}
                         variant= {check ? "temporary" : "permanent" }
                        anchor="right"
                        open={open}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                    >
                        <div className={classes.drawerHeader}>
                            <IconButton onClick={handleDrawerClose}>
                                <ChevronRightIcon />
                            </IconButton>
          FAQ
        </div>
                       
                        <List>
                            {['Get Started', 'Under/Over', 'Combo Duels',
                                'Fantasy 11','Custom Duels', 'Account','Verification', 'Deposit and Withdrawals', 'Bonuses and Promotions'].map((text, index) => (
                                    <ListItem button key={text} onClick={() => toggle(index)}>
                                        <ListItemText primary={text} style={{ fontWeight: 600 }}  />
                                    </ListItem>
                                ))}
                        </List>


                    </Drawer>
                </div>
            </Container>
        </div>
    );

}