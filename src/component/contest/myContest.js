/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-lone-blocks */
import React from 'react';
import ReactGA from 'react-ga';
import moment from 'moment';
import { useEffect,useContext } from 'react';
import { Link } from "react-router-dom";
import { Collapse } from 'react-collapse';

import _ from 'lodash';

import styled from 'styled-components'
import Countdown from 'react-countdown';

import CircularProgress from '@material-ui/core/CircularProgress';

import useMediaQuery from '@material-ui/core/useMediaQuery';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
//
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import { makeStyles, withStyles, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import Button from '@material-ui/core/Button';
import StarRateIcon from '@material-ui/icons/StarRate';

import { Divider, IconButton, Dialog, Avatar, Toolbar, Select, MenuItem } from '@material-ui/core';

import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';


import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import { ModeContext } from '../../App';

import * as mqtt from 'mqtt';


// Other modules
import AppBar from '@material-ui/core/AppBar';

// import Notification from '../common/notification'

import PropTypes from 'prop-types';

import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import LinearProgress from '@material-ui/core/LinearProgress';

import List from '@material-ui/core/List';


// API
import * as api from '../../api/contest'
import * as matchApi from '../../api/match'
import * as teamApi from '../../api/team'



import './collapse.css'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


const multipleArr = [1.5, 2, 3, 5, 11, 26, 40, 75, 125, 250]
const multipleArr2 = [1.5, 2, 3, 5, 11, 26, 40, 75, 125, 250] //[1.5, 3, 5, 11, 26, 40, 75, 125, 250, 500]

const size = {
  mobileS: '320px',
  mobileM: '375px',
  mobileL: '718px',
  tablet: '768px',
  laptop: '1024px',
  laptopL: '1440px',
  desktop: '2560px',
  amountPreset: '675px'
}

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
      // backgroundColor: "#F5F6FA"
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
      borderRadius: "0 0px 5px 5px"

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
    }
  }
});

function ElevationScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

ElevationScroll.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
}

export const device = {
  mobileS: `(max-width: ${size.mobileS})`,
  mobileM: `(max-width: ${size.mobileM})`,
  mobileL: `(max-width: ${size.mobileL})`,
  tablet: `(max-width: ${size.tablet})`,
  laptop: `(max-width: ${size.laptop})`,
  laptopL: `(max-width: ${size.laptopL})`,
  desktop: `(max-width: ${size.desktop})`,
  desktopL: `(max-width: ${size.desktop})`,
  amountPreset: `(max-width: ${size.amountPreset})`,
};

const ColorLinearProgress = withStyles({
  root: {
    height: 7,
    // backgroundColor: '#aac0c8',
  },
  bar: {
    borderRadius: "0 0 2px 2px",
    backgroundImage: 'linear-gradient(to right, #ffbc00, #fcb00c, #f9a315, #f4981c, #ef8c22)',
  },
})(LinearProgress);












// background-color: white;
const ContestMainHeader = styled.div`
  
 border-radius:5px;
  border-image: initial;
  padding: 10px;
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;

  @media ${device.mobileL} {
    flex-direction: column;
    justify-content: center;
    text-align:center;
  }
`;







const ContestType2 = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-template-rows: 1fr;
  gap: 5px 5px;
  grid-template-areas: "nameArea valueArea";
  @media (max-width: 627px) {
      .image{
        display:none
      }
    }

`
// @media (max-width: 627px) {
//   width:100%;
//   margin: 10px 0;
//   display: grid;
//   grid-template-columns: 1fr 1fr;

//   grid-template-areas: "nameArea nameArea"
//                        "valueArea valueArea";
//    grid-template-rows: 75px 50px;
//   gap: 5px 5px;
//   text-align:center
// }

const ContestNameArea = styled.div`
  display: flex;
  grid-area:nameArea;
  @media (max-width: 627px) {
    width:100%;
    text-align:center;
    justify-items:center
  }
`
const ContestRightNameArea = styled.div`
    width: 100%;
    text-align: start;
    display: flex;
    flex-direction: row;
    place-content: start;
    align-items: center;
 
  @media (max-width: 627px) {
    width: 100%;
    text-align: start;
    display: flex;
    flex-direction: row;
     align-items: center;
    margin-top: 5px;
    margin-left:10px
  }
  
`


const ContestvalueArea = styled.div`
  grid-area:valueArea;
  width:100%;
  margin: 5px 0;
  display: grid;
  grid-template-columns: 48% 48% ;
  grid-gap:5px;
  align-items:center;
  position:relative;

`
// @media (max-width: 627px) {
//   width:100%;
//   margin: 5px 0;
//   display: grid;
//   justify-content: center;
//   grid-template-columns: 32% 32% 32%;
//   grid-gap:5px
// }

const ContestCardheader = styled.div`
  padding:10px;
  border-radius: 3px;
  display:flex;
  flexDirection:row;
  justify-content:space-between;
  align-items: center;

  background-color: #77BC37;
   @media (min-width: 627px) {
    &:hover {
    
    }
 }
`
// border-left: 3px solid rgb(185 185 185);
const Line = styled.div`
    
    height: 108px;
    position: absolute;
    left: 25%;
    top: 25px;
 
`


const FinalValue = styled.div`
display: flex;
justify-content: center;
  
`
const NestedFinalDiv = styled.div`
  height: 25px;
  width: 25px;
  color: white;
  text-align: center;
  padding: 3.5px;
  display:flex;
  align-items:center;
  align-content:center;
  justify-content:center;
  background-color: rgb(185 185 185);
  border-radius: 50%; 
  box-shadow: 0px 0px 8px 1px rgb(185 185 185);
   
`
const StatDiv = styled.div`
  display:grid;
  grid-template-columns: 85px 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  @media (max-width: 567px) {
    grid-template-columns: 85px 63px 63px 63px 63px 63px 63px 63px;
    
    
    }
`

const StatBowlerDiv = styled.div`
  display:grid;
  grid-template-columns: 85px 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  @media (max-width: 567px) {
    grid-template-columns:85px 63px 63px 63px 63px 63px 63px 63px;
    
    }
  
`
const StatFieldDiv = styled.div`
  display:grid;
  grid-template-columns: 85px 1fr 1fr;
 
  
`


const HeaderDiv = styled.div`
  padding-left: 1.5rem;
  display:flex;
  flex-wrap:wrap;
  justify-content: center;
  align-items: center;
   border-color: #edeef0;
  padding: .75rem 12px;
  text-align:center;
  

`

const StatsContainerDiv = styled.div`
  
  @media (max-width: 567px) {
    overflow-x: scroll    
    }
`

const ContentDiv = styled.div`
  padding-left: 1.5rem;
   
   
  border-color: #edeef0;
  padding: .75rem 12px;
  text-align:center;
  display:grid;
  align-items:center;
  justify-content:center;
`

const DuelsCustom = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  margin-bottom: 0.25em;
  grid-gap: 2px;
  -webkit-align-items: end;
  -ms-flex-align: end;
  align-items: center;
  grid-template-rows: auto 1fr;
 margin-top:10px;
  @media ${device.mobileL} {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto auto auto;
    align-items: center;
    margin:10px 0 10px 0;
    
     text-align:center;
      
    border-radius: 5px;
 
  }
`

const DuelsCustom2 = styled.div`
  display: grid;
  grid-template-columns: 1fr 40px 1fr;
  margin-bottom: 0.25em;
  grid-gap: 2px;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  grid-template-rows: auto 1fr;
 margin-top:10px;
  @media ${device.mobileL} {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto 0px auto;
    align-items: center;
    margin:10px 0 10px 0;
    
     text-align:center;
     
    border-radius: 5px;
 
  }
`

const DuelSingleRight = styled.div`
  display:flex;
  flex-direction:row;
  margin:2px;
  align-content:center;
  justify-content:space-between;
  width:100%;
 
`;

const DuelSingleRight1a = styled.div`
  display:flex;
  flex-direction:row;
  margin:2px;
  align-content:center;
  justify-content:flex-start;
  width:100%;
  @media ${device.mobileL} {
    flex-direction:row-reverse;
    text-align: start;
  }
`;

const DuelSingleRight1b = styled.div`
  display:flex;
  flex-direction:row-reverse;
 
  align-content:center;
  justify-content:flex-start;
  width:100%;
  @media ${device.mobileL} {
    flex-direction:row;
    text-align: start;
  }
`;

const DuelSingleRight1bSub = styled.div`
display: flex;
    place-content: center;
    text-align: end;
    flex-direction: column;
    @media ${device.mobileL} {
       
      text-align: start;
    }
`

const DuelSingleRight1aNestedDiv = styled.div`
  display: flex;
  align-content: center;
  align-items: flex-start;
  flex-direction: column;
  @media ${device.mobileL} {
 
      align-items: flex-end;
    }
`;
const DuelSingleRight1bNestedDiv = styled.div`
    display: flex;
    place-content: center;
    align-items: self-end;
    flex-direction: column;
    text-align: end;
    padding: 3.89px 0px;
    color: rgb(119, 188, 55);
    min-width: 100px;
  @media ${device.mobileL} {
 
      align-items: flex-end;
    }
`;


const DuelSingleRight2 = styled.div`
  display:flex;
  flex-direction:row-reverse;
  margin:2px;
  align-content:center;
  justify-content:flex-start;
  width:100%;
  alignItems:center;
  @media ${device.mobileL} {
    flex-direction:row;
  }
`;

const DuelSingleRight2sub = styled.div`
display: flex;
    place-content: center;
    align-items: flex-end;
    flex-direction: column;
  @media ${device.mobileL} {
    align-items: flex-start;
  }
`;

const DuelSingleRight1sub = styled.div`
text-overflow: ellipsis;
overflow: hidden;
max-width: 100px;
display: flex;
flex-direction: column;
align-content: center;
justify-content:center;
`;



const DuelCustomHeader = styled.div`
  display:none;
  font-weight:600;
  color:grey;
  padding:6.5px;
  @media ${device.mobileL} {
    display:flex
  }
`

const DuelsCustomDiv = styled.div`
display:flex;
flex-direction:row;
margin:2px;
 
 
padding:5px;
border-radius:4px;
transition: transform .2s;

@media ${device.mobileL} {
  border:none;
  text-align:center;
  justify-content:center;
   }
 
`;

const DuelsCustomDiv2 = styled.div`
display:flex;
flex-direction:row-reverse;
margin:2px;
 
padding:6px;
border-radius:4px;
transition: transform .2s;
 
justify-content:space-between;
@media ${device.mobileL} {
  flex-direction:row;
  text-align:center;
  
  justify-content:center;
   }
 
`;

const DuelsCustomDiv2a = styled.div`
display:flex;
flex-direction:row-reverse;
margin:2px;
 
padding:6px;
border-radius:4px;
transition: transform .2s;
 
justify-content:space-between;
@media ${device.mobileL} {
  flex-direction:row;
  text-align:center;
  border:none;
  justify-content:space-between;
   }
 
`;


const DiagonalTrans = styled.div`
text-align: center;
-webkit-transform: rotate(-45deg);
-ms-transform: rotate(-45deg);
transform: rotate(-45deg);
width: 25px;
height: 25px;
display:flex;
place-content:center;
text-align:center;
`

const AntiDiagonalTrans = styled.div`

background-color: #77BC37;
            width: 25px;
            height: 25px;
            display:flex;
            align-content:center;
            justify-content:center;
            color: white;
            border-radius: 4px;
            -webkit-transform: rotate(45deg);
            -ms-transform: rotate(45deg);
                    transform: rotate(45deg);
`

const PlayerStatDiv = styled.div`
display:grid;
grid-gap:5px;
grid-template-columns: 1fr;
grid-template-rows: auto;
padding:10px;
`
const PlayerStatNestedDiv = styled.div`
display:grid;
grid-gap:2.5px;
grid-template-columns: 1fr 1fr;
grid-template-rows: auto;
`


let uState = {}

export default function Contest(props) {

  const theme = useTheme();

  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

  const classes = useStyles();

  const [value, setValue] = React.useState(0);
  const [value2, setValue2] = React.useState(0);



  const [match, setMatch] = React.useState(null);
  // const [message, setMessage] = React.useState("false");
  // const [openNotification, setOpenNotifi] = React.useState(false);

  const [teamStats, setteam] = React.useState([]);



  const [UnderOver, setUnderOver] = React.useState(null);
  const [UnderOver2, setUnderOver2] = React.useState(null);

  
  const [matchUps, setMatchups] = React.useState(null);

  const [fantasy, setfantasy] = React.useState([]);


  const [update, setUpdate] = React.useState(0);




  const [breakdown, setBreakDown] = React.useState([]);

  const [openPrizePool, setOpenPrizePool] = React.useState(false);

  const [filterCustom, setCustomFilter] = React.useState(5);

  const [contestType, setContestType] = React.useState(5);

  const [custom, setCustom] = React.useState(null);

  const [directionCustom, setCustomDirection] = React.useState(1);

  const [customAllCon, setCustomAll] = React.useState(null);
  const [playerStats, setPlayer] = React.useState(null);
  const [openPlayerDetail, setOpenPlayerDetail] = React.useState(false);

  const [mode, setMode] = useContext(ModeContext)

  useEffect(() => {
    uState = {};
    ReactGA.pageview(props.location.pathname);
    window.scrollTo(0,0)
    api.mycontest(props.match.params.matchId).then(response => {

      // setVs(response.data.vs.length === 0 ? [] : response.data.vs)
      setUnderOver(response.data.underOver)
      setUnderOver2(response.data.underOver2)

      

      setMatchups(response.data.comboMatch)
      setfantasy(response.data.fantasy)

      response.data.underOver.map((contest2, index2) => {
        return uState[`typeA-${index2}`] = false;
      })

      response.data.underOver2.map((contest2, index2) => {
        return uState[`typeC-${index2}`] = false;
      })

      response.data.comboMatch.map((contest2, index2) => {
        return uState[`typeB-${index2}`] = false;
      })


      setCustomAll(response.data.custom)
      let custom = _.filter(response.data.custom, ['contestType', filterCustom]);
      setCustom(custom)


    })

    matchApi.match('matchId', props.match.params.matchId).then(response => {
      setMatch(response.data.match)
    })
     

    const options = {
      // clientId uniquely identifies client
      // choose any string you wish
      clientId: "MQTT_CLIENT_" + new Date().getTime()
    };

    var client = mqtt.connect('wss://mqtt.fantasyjutsu.com:8083/mqtt', options);
    client.on('connect', function () {
      console.log('ws connected')
    })

    client.on('reconnect', function () {
      console.log('ws connected')
    })
    client.subscribe(props.match.params.matchId)

    client.on('message', function (topic, message) {
      // Updates React state with message 
      console.log(JSON.parse(message));
      let data = JSON.parse(message)
      setteam(data);
      let x = data.matchDetail ? setMatch(data.matchDetail) : '';
    });

    teamApi.teamStats(props.match.params.matchId).then(response => {
      console.log(response);

      setteam(response.data)
    })
    return () => {
      // HERE I WANT TO UNSUBSCRIBE WHEN THE COMPONENT UNMOUNT 
      client.unsubscribe(props.match.params.matchId)
    }


  }, []);


  const getPlayer = (player) => {
    setPlayer(null);
    setOpenPlayerDetail(true);
    teamApi.getPlayer(props.match.params.matchId, player).then(response => {
      console.log(response.data)
      setPlayer(response.data[0].player)
    })
  }

  const handleContestType = (event) => {
    setContestType(event.target.value)
  }




  const handleChange = (event, newValue) => {
    setValue(newValue);


  };

  const handleChange2 = (event, newValue) => {
    setValue2(newValue);


  };


  const handleFilterCustom = (value) => {
    setCustomFilter(value)
    setCustom(null)

    let filtered = _.filter(customAllCon, ['contestType', value])
    setCustom(filtered)
  }


  const handleCustomDirectionChange = (dir) => {
    let fanD = custom;
    if (dir === 1) {
      setCustomDirection(1);


      fanD = _.orderBy(fanD, 'amount', ['asc']);
      setCustom(fanD)
    } else {
      setCustomDirection(dir);


      fanD = _.orderBy(fanD, 'amount', ['desc']);
      setCustom(fanD)
    }
  }


  const handleCollapse = (type) => {
    setUpdate(update + 1)
    uState[type] = !uState[type];
  }




  const PrizePoolClose = () => {
    setOpenPrizePool(false)
    setOpenPlayerDetail(false)
  };

  // const viewVs = () => vsContest.map((contest, index) =>
  //   <Container maxWidth="md" style={{ padding: 0 }} key={contest._id}>
  //     <Paper style={{
  //       padding: 10,
  //       display: 'flex',
  //       // border: "0.5px solid grey",
  //       flexDirection: "row",
  //       justifyContent: "space-between",
  //       color: "white",
  //       backgroundColor: "#77BC37",
  //       borderBottomLeftRadius: 0,
  //       borderBottomRightRadius: 0
  //     }}
  //     onClick={() => handleCollapse(`typeC-${index}`)}
  //   >
  //       <div  >
  //         <Typography variant="caption">
  //           <span
  //             style={{

  //               fontWeight: 600
  //             }}
  //           >Contest #{index + 1}</span>
  //         </Typography>
  //         <br />
  //         <Typography variant="caption">
  //           Prize Pool: <span
  //             style={{

  //               fontWeight: 600
  //             }}
  //           >{contest.finalTotal}</span>
  //         </Typography>

  //         <br />
  //       </div>


  //     </Paper>
  //     <Collapse  isOpened={Object.keys(uState).length === 0 ? true : uState[`typeC-${index}`] ? true : false}  >
  //       <ContestCard >
  //         {contest.teams.map(player =>
  //           player.userAmount > 0 ? <ContestBody key={player._id} >
  //             <Paper elevation={1} style={{ backgroundColor: color.card.background }}>
  //               <ContestMainBody>
  //                 <div style={{

  //                   textAlign: "center",
  //                   display: "flex",
  //                   flexDirection: "row",
  //                   alignContent: "center",
  //                   alignItems: "center",
  //                   backgroundColor: color.card.background,
  //                   height: 80
  //                 }}>
  //                   <div style={{

  //                     padding: '5.5px',
  //                     margin: '5.5px',


  //                   }}>
  //                     <Avatar src={player.image_path} variant="circle" />
  //                   </div>
  //                   <div style={{
  //                     display: "flex",
  //                     flexDirection: "column",
  //                     width: 62
  //                   }}>
  //                     <Typography variant="caption" style={{ fontWeight: 700 }}>
  //                       {player.fullname}
  //                     </Typography>

  //                     <Typography variant="caption" style={{ fontWeight: 700 }}>
  //                       {player.team ? player.team.name : ""}
  //                     </Typography>

  //                     <Typography variant="caption" style={{ fontWeight: 700 }}>
  //                       {player.position ? player.position.name : ""}
  //                     </Typography>
  //                   </div>

  //                 </div>
  //                 <ContestBodyThird >
  //                   <Typography variant="caption">
  //                     Spots Filled: <span
  //                       style={{
  //                         color: "black",
  //                         fontWeight: 600
  //                       }}
  //                     >
  //                       {player.totalAmount / 25}
  //                     </span>
  //                   </Typography>
  //                   <br />
  //                   <Typography variant="caption">
  //                     Total Amount: <span
  //                       style={{
  //                         color: "black",
  //                         fontWeight: 600
  //                       }}
  //                     >
  //                       {player.totalAmount}
  //                     </span>
  //                   </Typography>
  //                   <br />
  //                   <Typography variant="caption">
  //                     Current Payout: <span
  //                       style={{
  //                         color: "black",
  //                         fontWeight: 600
  //                       }}
  //                     >
  //                       {player.multiplier !== null ? (player.multiplier.toFixed(2)) : 1}X
  //                       </span>
  //                   </Typography>

  //                 </ContestBodyThird>

  //                 <ContestBodyThird >
  //                   <Typography variant="caption">
  //                   <span style={{color:"#77BC37",fontWeight:700}} >Joined</span>
  //                     </Typography>
  //                   <br />
  //                   <Typography variant="caption">
  //                     Amount: <span
  //                       style={{
  //                         color: "black",
  //                         fontWeight: 600
  //                       }}
  //                     >
  //                       {player.userAmount}
  //                     </span>
  //                   </Typography>
  //                   <br />
  //                   <Typography variant="caption">
  //                     Your Payout: <span
  //                       style={{
  //                         color: "black",
  //                         fontWeight: 600
  //                       }}
  //                     >
  //                       {player.payout.toFixed(2)}
  //                     </span>
  //                   </Typography>

  //                 </ContestBodyThird>

  //               </ContestMainBody>
  //             </Paper>
  //           </ContestBody> : <div style={{ display: "none" }}  key={Math.random()}></div>)}

  //       </ContestCard>
  //     </Collapse>
  //   </Container>
  // )




  

  const view = () => UnderOver.map((contest2, index2) => {
    return UnderOver.length !== 0 ?

      (<Paper elevation={2} style={{ margin: 2.5 }} key={contest2._id} >
        <Paper  >
          <ContestCardheader >

            <Typography variant="caption"
              style={{ fontWeight: 500, fontSize: '1.05rem', color: "white" }}>
              Entry #{index2 + 1}
            </Typography>
            <ExpandMoreIcon onClick={() => handleCollapse(`typeA-${index2}`)} style={!uState[`typeA-${index2}`] ? { fontWeight: 800, padding: 10, fontSize: '1.45rem', color: "white", cursor: "pointer" } : { display: "none" }} />
            <ExpandLessIcon onClick={() => handleCollapse(`typeA-${index2}`)} style={uState[`typeA-${index2}`] ? { fontWeight: 800, padding: 10, fontSize: '1.45rem', color: "white", cursor: "pointer" } : { display: "none" }} />
          </ContestCardheader>
        </Paper>
        <Collapse isOpened={uState[`typeA-${index2}`]} >
          {Object.entries(contest2.contest).map(([, contest], indx) =>
            <ContestType2 key={contest._id}>
              <ContestNameArea>
                <ContestRightNameArea
                style={{
                  cursor:"pointer"
                }}
                   onClick={() => getPlayer(contest.playerInfo.id)}
                >
                  <div className="image" style={{

                    padding: '16.5px',
                    margin: '5.5px',


                  }}>
                    <Avatar src={contest.playerInfo.image_path} variant="circle" />
                  </div>
                  <div>
                    <Typography variant="caption" style={{ fontWeight: 700 }}>
                      {contest.playerInfo.firstname[0]}. {contest.playerInfo.lastname}
                    </Typography>
                    <br />
                    <Typography variant="caption" style={{ fontWeight: 400 }}>
                      {contest.playerInfo.team ? contest.playerInfo.team.name : ""}
                    </Typography>
                    <br />
                    <Typography variant="caption" style={{ fontWeight: 400 }}>
                      {contest.playerInfo.position ? contest.playerInfo.position.name : ""}
                    </Typography>
                  </div>

                </ContestRightNameArea>
              </ContestNameArea>


              <ContestvalueArea>
                <div style={{
                  positon: "relative",
                  display: "flex",
                  justifyContent: "center",
                }}>

                  <NestedFinalDiv
                    style={
                      contest2['winner'] ?
                        contest2['winner'][contest._id] === 1 ? {
                          backgroundColor: "#77BC37",
                          boxShadow: "0px 0px 12px 1px #77BC37",
                          // marginLeft: "-17px"
                        } : {
                            backgroundColor: contest2['winner'][contest._id] === 2 ? "#F79123" : "#f58f22",
                            boxShadow: "0px 0px 12px 1px #f58f22",
                            // marginLeft: "-17px"
                          } : {
                            display: 'flex',
                          backgroundColor: "#B9B9B9",
                          boxShadow: "0px 0px 12px 1px #B9B9B9",
                        }}
                  >
                    <Typography variant="caption">
                      {`${multipleArr2[indx]}X`}

                    </Typography>
                  </NestedFinalDiv>

                  <Typography variant="caption"  >

                    {/* {multipleArr2[index]}X */}
                  </Typography>
                </div>

                <Typography variant="caption" style={{ padding: "0 10px", textAlign: "end" }} >

                  {
                    contest.status === "Discarded" ?
                      <Typography variant="caption" style={{ color: "grey", fontWeight: 700 }} >
                        Contest cancelled
                </Typography>
                      :
                      <Typography variant="caption">
                        <span style={contest2['winner'] ?
                          contest2['winner'][contest._id] === 1 ? { color: "#77BC37", fontWeight: 700 } : { color: "#F79123", fontWeight: 700 } : { color: "#F79123", fontWeight: 700 }} >
                          {contest2['selectedTeam'][contest._id]['typeName']}
                        </span>
                      </Typography>}
                </Typography>

              </ContestvalueArea>
            </ContestType2>
          )}
        </Collapse>
        <div>
          <ContestType2 style={{ height: 88 }}>
            <ContestNameArea>
              <ContestRightNameArea>
                <div style={{

                  padding: '16.5px',
                  margin: '5.5px',


                }}>

                </div>

              </ContestRightNameArea>
            </ContestNameArea>


            <ContestvalueArea>
              <div style={{
                positon: "relative",
                display: "flex",
                justifyContent: "center",
              }}>

                <FinalValue >
                  <NestedFinalDiv style={
                    contest2['winner'] && contest2['status'] === "Finished" ? contest2.lostContest.length === 0 ? {
                      backgroundColor: "#77BC37",
                      boxShadow: "0px 0px 12px 1px #77BC37",
                    } : {
                        backgroundColor: "#f58f22",
                        boxShadow: "0px 0px 12px 1px #f58f22",
                      } : {
                        display: "flex",
                        backgroundColor: "#B9B9B9",
                        boxShadow: "0px 0px 12px 1px #B9B9B9",
                      }
                  }         >

                    <Typography variant="caption">
                      {contest2.lostContest !== null && contest2.lostContest !== undefined && contest2.lostContest.length === 0 ? multipleArr2[Object.keys(contest2.wonContest).length - 1] : ''}X

                  </Typography>

                  </NestedFinalDiv>

                </FinalValue>
                <Typography variant="caption"  >

                  {/* {multipleArr2[index]}X */}
                </Typography>
              </div>



              {/* <Typography variant="caption" style={{padding:"0 10px",textAlign:"end"}} >
            Payout: <span style={{color:"#77BC37",fontWeight:700}} >
            ₹{multipleArr2[contest2.contest.length - 1]*contest2.amount}
              </span>
          </Typography> */}


              {contest2['winner'] && contest2['status'] === "Finished" ?
                contest2.wonContest.length !== 0 && contest2.lostContest.length === 0 ?

                  <Typography variant="caption" style={{ padding: "0 10px", textAlign: "end" }} >
                    <span style={{ color: "#77BC37", fontWeight: 500, }} >
                      You won
              ₹{multipleArr2[Object.keys(contest2.wonContest).length - 1] * contest2.amount}
                    </span>
                  </Typography>
                  :
                  contest2.wonContest.length === 0 && contest2.lostContest.length === 0
                    ?
                    <Typography variant="caption" style={{ padding: "0 10px", textAlign: "end" }} >
                      <span style={{ color: "#77BC37", fontWeight: 500, }} >
                        Refund
              ₹{contest2.amount}
                      </span>
                    </Typography>
                    :
                    <Typography variant="caption" style={{ padding: "0 10px", textAlign: "end" }} >
                      <span style={{ color: "#F79123", fontWeight: 500 }} >
                        You lost {contest2.lostContest.length} contest
              </span>
                    </Typography>
                :
                contest2['status'] === "Aban." ?
                  <Typography variant="caption" style={{ padding: "0 10px", textAlign: "end" }}>
                    Refund due to match abandoned
                    </Typography>
                  :

                  <Typography variant="caption" style={{ padding: "0 10px", textAlign: "end" }} >
                    <Typography variant="caption">
                      Entry:&nbsp;    
                    <span style={{ color: "#77BC37", fontWeight: 500 }} >

                        ₹{contest2.amount}
                      </span>
                    </Typography>
                    {/* <br />
                Payout: <span style={{ color: "#77BC37", fontWeight: 500 }} >
                      {contest2.lostContest !== null && contest2.lostContest.length > 0 ?
                        "You lost " + contest2.lostContest.length + " contest"
                        :
                        contest2.wonContest !== null && contest2.wonContest.length > 0 ?
                          "₹" + contest2.wonContest.length > 0 ?
                            multipleArr2[contest2.wonContest.length - 1] * contest2.amount : 0 : 0}

                    </span> */}
                  </Typography>}
            </ContestvalueArea>
          </ContestType2>
        </div>
      </Paper>) : <div>No contest Joined</div>
  })

  const viewUnderOver = () => UnderOver2.map((contest2, index2) => {
    return UnderOver2.length !== 0 ?

      (<Paper elevation={2} style={{ margin: 2.5 }} key={contest2._id} >
        <Paper  >
          <ContestCardheader >

            <Typography variant="caption"
              style={{ fontWeight: 500, fontSize: '1.05rem', color: "white" }}>
              Entry #{index2 + 1}
            </Typography>
            <ExpandMoreIcon onClick={() => handleCollapse(`typeC-${index2}`)} style={!uState[`typeC-${index2}`] ? { fontWeight: 800, padding: 10, fontSize: '1.45rem', color: "white", cursor: "pointer" } : { display: "none" }} />
            <ExpandLessIcon onClick={() => handleCollapse(`typeC-${index2}`)} style={uState[`typeC-${index2}`] ? { fontWeight: 800, padding: 10, fontSize: '1.45rem', color: "white", cursor: "pointer" } : { display: "none" }} />
          </ContestCardheader>
        </Paper>
        <Collapse isOpened={uState[`typeC-${index2}`]} >
          {Object.entries(contest2.contest).map(([, contest], indx) =>
            <ContestType2 key={contest._id}>
              <ContestNameArea>
                <ContestRightNameArea
                style={{
                  cursor:"pointer"
                }}
                   onClick={() => getPlayer(contest.playerInfo.id)}
                >
                  <div className="image" style={{

                    padding: '16.5px',
                    margin: '5.5px',


                  }}>
                    <Avatar src={contest.playerInfo.image_path} variant="circle" />
                  </div>
                  <div>
                    <Typography variant="caption" style={{ fontWeight: 700 }}>
                      {contest.playerInfo.firstname[0]}. {contest.playerInfo.lastname}
                    </Typography>
                    <br />
                    <Typography variant="caption" style={{ fontWeight: 400 }}>
                      {contest.playerInfo.team ? contest.playerInfo.team.name : ""}
                    </Typography>
                    <br />
                    <Typography variant="caption" style={{ fontWeight: 400 }}>
                      {contest.playerInfo.position ? contest.playerInfo.position.name : ""}
                    </Typography>
                  </div>

                </ContestRightNameArea>
              </ContestNameArea>


              <ContestvalueArea>
                <div style={{
                  positon: "relative",
                  display: "flex",
                  justifyContent: "center",
                }}>

                  <NestedFinalDiv
                    style={
                      contest2['winner'] ?
                        contest2['winner'][contest._id] === 1 ? {
                          backgroundColor: "#77BC37",
                          boxShadow: "0px 0px 12px 1px #77BC37",
                          // marginLeft: "-17px"
                        } : {
                            backgroundColor: contest2['winner'][contest._id] === 2 ? "#F79123" : "#f58f22",
                            boxShadow: "0px 0px 12px 1px #f58f22",
                            // marginLeft: "-17px"
                          } : {
                            display: 'flex',
                          backgroundColor: "#B9B9B9",
                          boxShadow: "0px 0px 12px 1px #B9B9B9",
                        }}
                  >
                    <Typography variant="caption">
                      {`${multipleArr2[indx]}X`}

                    </Typography>
                  </NestedFinalDiv>

                  <Typography variant="caption"  >

                    {/* {multipleArr2[index]}X */}
                  </Typography>
                </div>

                <Typography variant="caption" style={{ padding: "0 10px", textAlign: "end" }} >

                  {
                    contest.status === "Discarded" ?
                      <Typography variant="caption" style={{ color: "grey", fontWeight: 700 }} >
                        Contest cancelled
                </Typography>
                      :
                      <Typography variant="caption">
                        <span style={contest2['winner'] ?
                          contest2['winner'][contest._id] === 1 ? { color: "#77BC37", fontWeight: 700 } : { color: "#F79123", fontWeight: 700 } : { color: "#F79123", fontWeight: 700 }} >
                          {contest2['selectedTeam'][contest._id]['typeName']}
                        </span>
                      </Typography>}
                </Typography>

              </ContestvalueArea>
            </ContestType2>
          )}
        </Collapse>
        <div>
          <ContestType2 style={{ height: 88 }}>
            <ContestNameArea>
              <ContestRightNameArea>
                <div style={{

                  padding: '16.5px',
                  margin: '5.5px',


                }}>

                </div>

              </ContestRightNameArea>
            </ContestNameArea>


            <ContestvalueArea>
              <div style={{
                positon: "relative",
                display: "flex",
                justifyContent: "center",
              }}>

                <FinalValue >
                  <NestedFinalDiv style={
                    contest2['winner'] && contest2['status'] === "Finished" ? contest2.lostContest.length === 0 ? {
                      backgroundColor: "#77BC37",
                      boxShadow: "0px 0px 12px 1px #77BC37",
                    } : {
                        backgroundColor: "#f58f22",
                        boxShadow: "0px 0px 12px 1px #f58f22",
                      } : {
                        display: "flex",
                        backgroundColor: "#B9B9B9",
                        boxShadow: "0px 0px 12px 1px #B9B9B9",
                      }
                  }         >

                    <Typography variant="caption">
                      {contest2.lostContest !== null && contest2.lostContest !== undefined && contest2.lostContest.length === 0 ? multipleArr2[Object.keys(contest2.wonContest).length - 1] : ''}X

                  </Typography>

                  </NestedFinalDiv>

                </FinalValue>
                <Typography variant="caption"  >

                  {/* {multipleArr2[index]}X */}
                </Typography>
              </div>



              {/* <Typography variant="caption" style={{padding:"0 10px",textAlign:"end"}} >
            Payout: <span style={{color:"#77BC37",fontWeight:700}} >
            ₹{multipleArr2[contest2.contest.length - 1]*contest2.amount}
              </span>
          </Typography> */}


              {contest2['winner'] && contest2['status'] === "Finished" ?
                contest2.wonContest.length !== 0 && contest2.lostContest.length === 0 ?

                  <Typography variant="caption" style={{ padding: "0 10px", textAlign: "end" }} >
                    <span style={{ color: "#77BC37", fontWeight: 500, }} >
                      You won
              ₹{multipleArr2[Object.keys(contest2.wonContest).length - 1] * contest2.amount}
                    </span>
                  </Typography>
                  :
                  contest2.wonContest.length === 0 && contest2.lostContest.length === 0
                    ?
                    <Typography variant="caption" style={{ padding: "0 10px", textAlign: "end" }} >
                      <span style={{ color: "#77BC37", fontWeight: 500, }} >
                        Refund
              ₹{contest2.amount}
                      </span>
                    </Typography>
                    :
                    <Typography variant="caption" style={{ padding: "0 10px", textAlign: "end" }} >
                      <span style={{ color: "#F79123", fontWeight: 500 }} >
                        You lost {contest2.lostContest.length} contest
              </span>
                    </Typography>
                :
                contest2['status'] === "Aban." ?
                  <Typography variant="caption" style={{ padding: "0 10px", textAlign: "end" }}>
                    Refund due to match abandoned
                    </Typography>
                  :

                  <Typography variant="caption" style={{ padding: "0 10px", textAlign: "end" }} >
                    <Typography variant="caption">
                      Entry:&nbsp;
                      <span style={{ color: "#77BC37", fontWeight: 500 }} >

                        ₹{contest2.amount}
                      </span>
                    </Typography>
                    {/* <br />
                Payout: <span style={{ color: "#77BC37", fontWeight: 500 }} >
                      {contest2.lostContest !== null && contest2.lostContest.length > 0 ?
                        "You lost " + contest2.lostContest.length + " contest"
                        :
                        contest2.wonContest !== null && contest2.wonContest.length > 0 ?
                          "₹" + contest2.wonContest.length > 0 ?
                            multipleArr2[contest2.wonContest.length - 1] * contest2.amount : 0 : 0}

                    </span> */}
                  </Typography>}
            </ContestvalueArea>
          </ContestType2>
        </div>
      </Paper>) : <div>No contest Joined</div>
  })

  const viewCombo = () => matchUps.length !== 0 ? matchUps.map((contest2, index2) =>
    <Paper key={contest2._id} elevation={2} style={{ margin: "5px 2.5px" }} >
      <Paper  >
        <ContestCardheader  >
          <Typography variant="caption" style={{ fontWeight: 450, fontSize: '1.05rem', color: "white" }}>
            Entry #{index2 + 1}
          </Typography>
          <ExpandMoreIcon onClick={() => handleCollapse(`typeB-${index2}`)} style={!uState[`typeB-${index2}`] ? { fontWeight: 800, padding: 10, fontSize: '1.45rem', color: "white", cursor: "pointer" } : { display: "none" }} />
          <ExpandLessIcon onClick={() => handleCollapse(`typeB-${index2}`)} style={uState[`typeB-${index2}`] ? { fontWeight: 800, padding: 10, fontSize: '1.45rem', color: "white", cursor: "pointer" } : { display: "none" }} />

        </ContestCardheader>
      </Paper>
      <Collapse isOpened={uState[`typeB-${index2}`]} >
        {Object.entries(contest2.contest).map(([, contest], index) =>
          <ContestType2 key={contest._id}>
            <ContestNameArea
             onClick={() => getPlayer(contest2['selectedTeam'][contest._id]['playerDetails'].id)}
              style={{
                cursor:"pointer"
              }}
            >
              <ContestRightNameArea>
                <div className="image"
                 style={{

                  padding: '16.5px',
                  margin: '5.5px',


                }}>
                  <Avatar src={contest2['selectedTeam'][contest._id]['playerDetails'].image_path} variant="circle" />

                </div>
                <div>
                  {
                    contest.handicap === contest2['selectedTeam'][contest._id]['playerDetails'].id ?
                      <Typography variant="caption" style={{ fontWeight: 700 }}>

                        {contest2['selectedTeam'][contest._id]['playerDetails'].firstname[0]}. {contest2['selectedTeam'][contest._id]['playerDetails'].lastname}
                        <StarRateIcon style={{ fontSize: "1.25em", color: "#F58F22" }} />
                      </Typography>
                      : <Typography variant="caption" style={{ fontWeight: 700 }}>

                        {contest2['selectedTeam'][contest._id]['playerDetails'].firstname[0]}. {contest2['selectedTeam'][contest._id]['playerDetails'].lastname}
                      </Typography>}
                  <br />
                  <Typography variant="caption" style={{ fontWeight: 400 }}>
                    {contest2['selectedTeam'][contest._id]['playerDetails'].team ? contest2['selectedTeam'][contest._id]['playerDetails'].team.name : ""}
                  </Typography>
                  <br />
                  <Typography variant="caption" style={{ fontWeight: 400 }}>
                    {contest2['selectedTeam'][contest._id]['playerDetails'].position ? contest2['selectedTeam'][contest._id]['playerDetails'].position.name : ""}
                  </Typography>
                </div>

              </ContestRightNameArea>
            </ContestNameArea>


            <ContestvalueArea>
              <div style={{
                positon: "relative",
                display: "flex",
                justifyContent: "center",
              }}>




                <NestedFinalDiv
                  style={
                    contest2['winner'] ?
                      contest2['winner'][contest._id] === 1 ? {
                        backgroundColor: "#77BC37",
                        boxShadow: "0px 0px 12px 1px #77BC37",

                      } : {
                          backgroundColor: "#f58f22",
                          boxShadow: "0px 0px 12px 1px #f58f22",

                        } : {
                          display: "flex",
                        backgroundColor: "#B9B9B9",
                        boxShadow: "0px 0px 12px 1px #B9B9B9",
                      }}
                >
                  <Typography variant="caption">
                    {`${multipleArr[index]}X`}

                  </Typography>
                </NestedFinalDiv>

                <Typography variant="caption"  >

                  {/* {multipleArr2[index]}X */}
                </Typography>
              </div>

              <div
                style={{

                  display: "flex",
                  flexDirection: "row-reverse",
                  alignItems: "center",
                  cursor:"pointer"

                }}

                onClick={() => getPlayer(
                  contest.players[contest.player1].id !== contest2['selectedTeam'][contest._id]['playerDetails'].id ?
                  contest.players[contest.player1].id :
                  contest.players[contest.player2].id
                )}
 
              >
                <div className="image" style={{

                  // padding: '16.5px',
                  // margin: '5.5px',


                }}>
                  {contest.players[contest.player1].id !== contest2['selectedTeam'][contest._id]['playerDetails'].id ?
                    <Avatar src={contest.players[contest.player1].image_path} variant="circle" />
                    : <Avatar src={contest.players[contest.player2].image_path} variant="circle" />}
                </div>
                <Typography variant="caption" style={{ padding: "0 10px", textAlign: "end",display:'flex',
                        flexDirection:"column",
                        justifyContent:"center", }} >

                  {
                    contest.status === "Discarded" ?
                      <Typography variant="caption" style={{ color: "grey", fontWeight: 700 }} >
                        Contest cancelled
                </Typography>
                      :
                      <div >
                      <Typography variant="caption">
                         <span style={{  fontWeight: 700 }} >{ //color: "#E78922",
                          contest.players[contest.player1].id !== contest2['selectedTeam'][contest._id]['playerDetails'].id ?
                            `${contest.players[contest.player1].firstname[0]}. ${contest.players[contest.player1].lastname}` :
                            `${contest.players[contest.player2].firstname[0]}. ${contest.players[contest.player2].lastname}`
                        }</span></Typography>
                        <br/>
                        <Typography variant="caption" style={{ fontWeight: 400 }}>
                          {contest.players[contest.player1].id !== contest2['selectedTeam'][contest._id]['playerDetails'].id
                           && contest.players[contest.player1].team ?
                           contest.players[contest.player1].team.name : contest.players[contest.player2].team ?contest.players[contest.player2].team.name :""}                        </Typography>
                        </div>
                        }
 


                </Typography>

              </div>
            </ContestvalueArea>
          </ContestType2>
        )}
      </Collapse>
      <div>
        <ContestType2 style={{ height: 88 }}>
          <ContestNameArea>
            <ContestRightNameArea>
              <div style={{

                padding: '16.5px',
                margin: '5.5px',


              }}>

              </div>

            </ContestRightNameArea>
          </ContestNameArea>


          <ContestvalueArea>
            <div style={{ positon: "relative" }}>

              <FinalValue >
                <NestedFinalDiv style={
                  contest2['winner'] && contest2['status'] === "Finished" ? contest2.lostContest.length === 0 ? {
                    backgroundColor: "#77BC37",
                    boxShadow: "0px 0px 12px 1px #77BC37",
                  } : {
                      backgroundColor: "#f58f22",
                      boxShadow: "0px 0px 12px 1px #f58f22",
                    } : { display: "flex" }
                }         >
                  <Typography variant="caption">

                    {contest2.lostContest !== null && contest2.lostContest !== undefined && contest2.lostContest.length === 0 ? multipleArr[Object.keys(contest2.wonContest).length - 1] : ''}X

                  </Typography>

                </NestedFinalDiv>

              </FinalValue>
              <Typography variant="caption"  >

                {/* {multipleArr[index]}X */}
              </Typography>
            </div>



            {contest2['winner'] && contest2['status'] === "Finished" ?

              contest2.lostContest.length === 0 && contest2.wonContest.length !== 0 ?

                <Typography variant="caption" style={{ padding: "0 10px", textAlign: "end" }} >
                  <span style={{ color: "#77BC37", fontWeight: 500, }} >
                    You won
                ₹{multipleArr[Object.keys(contest2.wonContest).length - 1] * contest2.amount}
                  </span>
                </Typography>

                : contest2.lostContest.length === 0 && contest2.wonContest.length === 0 ?
                  <Typography variant="caption" style={{ padding: "0 10px", textAlign: "end" }} >
                    <span style={{ color: "#77BC37", fontWeight: 500, }} >
                      Refunded
                ₹{contest2.amount}
                    </span>
                  </Typography> :
                  <Typography variant="caption" style={{ padding: "0 10px", textAlign: "end" }} >
                    <span style={{ color: "#f58f22", fontWeight: 500 }} >
                      You lost {contest2.lostContest.length} contest
             </span>
                  </Typography>


              : contest2['status'] === "Aban." ?
                <Typography variant="caption" style={{ padding: "0 10px", textAlign: "end" }}>
                  Refund due to match abandoned
                    </Typography>
                : <Typography variant="caption" style={{ padding: "0 10px", textAlign: "end" }} >
                  <Typography variant="caption">
                    Entry:&nbsp;     
                    <span style={{ color: "#77BC37", fontWeight: 500 }} >

                      ₹{contest2.amount}
                    </span>
                  </Typography>
                  {/* <br />
                Payout: <span style={{ color: "#77BC37", fontWeight: 500 }} >
                    {contest2.lostContest !== null && contest2.lostContest.length > 0 ?
                      "You lost " + contest2.lostContest.length + " contest"
                      : contest2.wonContest !== null && contest2.wonContest.length > 0 ?
                        "₹" + Object.keys(contest2.wonContest).length > 0 ?
                          multipleArr[Object.keys(contest2.wonContest).length - 1] * contest2.amount : 0 : 0}
                  </span> */}
                </Typography>}
          </ContestvalueArea>
        </ContestType2>
      </div>
    </Paper>
  ) : <div>No contest Joined</div>


  const viewFantasy = () => fantasy.map(cnt => (
    <Paper className={classes.paper} elevation={2} style={{ margin: "15px 0", borderRadius: 5 }} key={cnt.contestDetails._id}>
      <div className={classes.gridCard}>
        <div className={classes.gridCardContent}>
          {/* <Link to = {{pathname:`/contest/details/${cnt.contestDetails._id}`,
                                }}  style={{ textDecoration: 'none' }}> */}
          <div className={classes.gridCardSubContent}>

            <span style={{ padding: "5px", fontSize: "12px", }}>
              <Typography variant="caption">
                Prize Pool

                          </Typography>
            </span>
            <span className={classes.gridCardTeamText} onClick={() => { setBreakDown(cnt.contestDetails.prizeBreakUp); setOpenPrizePool(true) }}>
              <Typography variant="caption"
                style={{
                  fontWeight: "700",
                  padding: "5px 10px",
                  cursor: "pointer", borderRadius: 5, 
                  border: "1px solid #777777",
                  fontSize: "15px"
                }}>
                ₹{cnt.contestDetails.prizePool}

              </Typography>

            </span>
            <span style={{ padding: "2.5px", fontSize: "14px", color: "grey" }}>
              <Typography variant="caption">
                {cnt.contestDetails.totalWinners} Winner

                          </Typography>
            </span>
          </div>
          {/* </Link> */}
          <div className={classes.gridCardSubContent}>
            <span style={{ padding: "2.5px", fontSize: "12px", marginLeft: "auto" }}>
              <Link
                to={{
                  pathname: `/contest/details/${props.match.params.matchId}/${cnt.contestDetails._id}/`,
                  state: props.location.state
                }} style={{ textDecoration: 'none' }}>
                <Button size="small"
                  //  onClick={() => viewFantasyContest(cnt._id)} 
                  variant="contained"
                  style={{
                    backgroundColor: '#77BC37',
                    color: 'white'
                  }}>View Info</Button>
              </Link>
            </span>
          </div>
        </div>
      </div>
      {
        match && new Date(match.starting_at).getTime() > Date.now() ?
          <div className={classes.progress}>
            <ColorLinearProgress style={{ borderRadius: 0,backgroundColor:mode ? '#262c33':'#F9F8FC' }} variant="determinate" value={(cnt.contestDetails.totalJoined / cnt.contestDetails.totalSpots) * 100} />
          </div> :
          <div />

      }
      <div className={classes.gridCard}  >
        <div className={classes.gridCardContent}>
          <div className={classes.gridCardSubContent}>
            <span style={{ padding: "2.5px", fontSize: "12px", }}>
              <Typography variant="caption" style={{
                padding: "2.5px",
                fontSize: "12px", fontWeight: 500,
                color: "#ef8c22"
              }}>
                {
                  match && new Date(match.starting_at).getTime() > Date.now() ?

                    cnt.contestDetails.totalSpots - cnt.contestDetails.totalJoined === 0 ?
                      "Contest Full" : cnt.contestDetails.totalSpots - cnt.contestDetails.totalJoined + " spots left"
                    : cnt.contestDetails.totalJoined + " joined"
                }

              </Typography>

            </span>
          </div>
          <div className={classes.gridCardSubContent}>
            <span style={{ padding: "2.5px", fontSize: "12px", marginLeft: "auto", color: "grey" }}>
              <Typography variant="caption" style={{
                padding: "2.5px",
                fontSize: "12px", fontWeight: 500,

              }}>
                {cnt.contestDetails.totalSpots} spots

                          </Typography>



            </span>
          </div>
        </div>
      </div>

    </Paper>
  ))




  const viewBreakdown = () => breakdown.map(prz =>
    <Paper
      elevation={0}
      style={{
        minWidth: 256,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between"
      }}
      key={prz.prize}
    >
      <div>
        <Typography variant="caption">
          #{prz.range}
        </Typography>
      </div>
      <div>
        <Typography variant="caption">
          ₹{prz.prize}
        </Typography>

      </div>
    </Paper>
  )


  const statslocalTeam = () => teamStats.players[teamStats.localTeam].map((players) => {
    return <div key={players.id} style={players.battingScoreCard ? { display: "block" } : { display: "none" }}>
      <StatDiv>
        <ContentDiv>
          <Typography variant="caption">
            {players.fullname}
          </Typography>
        </ContentDiv>
        <ContentDiv>
          <Typography variant="caption">
            {players.battingScoreCard ? players.battingScoreCard.ball : "Did not bat"}
          </Typography>
        </ContentDiv>
        <ContentDiv>
          <Typography variant="caption">
            {players.battingScoreCard ? players.battingScoreCard.score : "Did not bat"}
          </Typography>
        </ContentDiv>
        <ContentDiv>
          <Typography variant="caption">
            {players.battingScoreCard ? players.battingScoreCard.four_x : "Did not bat"}
          </Typography>
        </ContentDiv>
        <ContentDiv>
          <Typography variant="caption">
            {players.battingScoreCard ? players.battingScoreCard.six_x : "Did not bat"}
          </Typography>
        </ContentDiv>
        <ContentDiv>
          <Typography variant="caption">
            {players.battingScoreCard ? (100*players.battingScoreCard.score/players.battingScoreCard.ball).toFixed(2) : "Did not bat"}
          </Typography>
        </ContentDiv>
        <ContentDiv>
          <Typography variant="caption">
            {players.catchStump ? players.catchStump : 0}
          </Typography>
        </ContentDiv>
        <ContentDiv>
          <Typography variant="caption">
            {players.points ? players.points : 0}
          </Typography>
        </ContentDiv>
      </StatDiv>
      <Divider />
    </div>
  })

  const statslocalTeamBowler = () => teamStats.players[teamStats.localTeam].map((players) => {
    return <div key={players.id + "b"} style={players.bowlingScoreCard ? { display: "block" } : { display: "none" }}>
      <StatBowlerDiv>
        <ContentDiv>
          <Typography variant="caption">
            {players.fullname}
          </Typography>
        </ContentDiv>


        <ContentDiv>
          <Typography variant="caption">
            {players.bowlingScoreCard ? players.bowlingScoreCard.overs : "Did not bat"}
          </Typography>

        </ContentDiv>
        <ContentDiv>
          <Typography variant="caption">
            {players.bowlingScoreCard ? players.bowlingScoreCard.medians : "Did not bat"}
          </Typography>

        </ContentDiv>
        <ContentDiv>
          <Typography variant="caption">
            {players.bowlingScoreCard ? players.bowlingScoreCard.runs : "Did not bat"}
          </Typography>

        </ContentDiv>
        <ContentDiv>
          <Typography variant="caption">
            {players.bowlingScoreCard ? players.bowlingScoreCard.wickets : "Did not bat"}
          </Typography>

        </ContentDiv>
        <ContentDiv>
          <Typography variant="caption">
            {players.bowlingScoreCard ? (players.bowlingScoreCard.runs/players.bowlingScoreCard.overs).toFixed(2) : "Did not bat"}
          </Typography>

        </ContentDiv>
        <ContentDiv>
          <Typography variant="caption">
            {players.catchStump ? players.catchStump : 0}
          </Typography>
        </ContentDiv>
        <ContentDiv style={{

          textAlign: "center"
        }}>
          <Typography variant="caption" >
            {players.points ? players.points : 0}
          </Typography>

        </ContentDiv>
      </StatBowlerDiv>
      <Divider />
    </div>
  })
  const statslocalTeamField = () => teamStats.players[teamStats.localTeam].map((players) => {
    return <div key={players.id + "b"} style={players.catchStump ? { display: "block" } : { display: "none" }}>
      <StatFieldDiv>
        <ContentDiv>
          <Typography variant="caption">
            {players.fullname}
          </Typography>
        </ContentDiv>


        <ContentDiv>
          <Typography variant="caption">
            {players.catchStump ? players.catchStump : 0}
          </Typography>

        </ContentDiv>
        <ContentDiv style={{

          textAlign: "center"
        }}>
          <Typography variant="caption" >
            {players.points ? players.points : 0}
          </Typography>

        </ContentDiv>
      </StatFieldDiv>
      <Divider />
    </div>
  })

  const statsVisitorTeam = () => teamStats.players[teamStats.visitorTeam].map((players) => {
    return <div key={players.id} style={players.battingScoreCard ? { display: "block" } : { display: "none" }}>
      <StatDiv>
        <ContentDiv>
          <Typography variant="caption">
            {players.fullname}
          </Typography>
        </ContentDiv>
        <ContentDiv>
          <Typography variant="caption">
            {players.battingScoreCard ? players.battingScoreCard.ball : "Did not bat"}
          </Typography>
        </ContentDiv>
        <ContentDiv>
          <Typography variant="caption">
            {players.battingScoreCard ? players.battingScoreCard.score : "Did not bat"}
          </Typography>
        </ContentDiv>
        <ContentDiv>
          <Typography variant="caption">
            {players.battingScoreCard ? players.battingScoreCard.four_x : "Did not bat"}
          </Typography>
        </ContentDiv>
        <ContentDiv>
          <Typography variant="caption">
            {players.battingScoreCard ? players.battingScoreCard.six_x : "Did not bat"}
          </Typography>
        </ContentDiv>
        <ContentDiv>
          <Typography variant="caption">
            {players.battingScoreCard ? (100*players.battingScoreCard.score/players.battingScoreCard.ball).toFixed(2) : "Did not bat"}
          </Typography>
        </ContentDiv>
        <ContentDiv>
          <Typography variant="caption">
            {players.catchStump ? players.catchStump : 0}
          </Typography>
        </ContentDiv>
        <ContentDiv style={{

          textAlign: "center"
        }}>
          <Typography variant="caption" >
            {players.points ? players.points : 0}
          </Typography>
        </ContentDiv>
      </StatDiv>
      <Divider />
    </div>
  })

  const statsVisitorTeamBowler = () => teamStats.players[teamStats.visitorTeam].map((players) => {
    return <div key={players.id + "v"} style={players.bowlingScoreCard ? { display: "block" } : { display: "none" }}>
      <StatBowlerDiv>
        <ContentDiv>
          <Typography variant="caption">
            {players.fullname}
          </Typography>
        </ContentDiv>

        <ContentDiv>
          <Typography variant="caption">
            {players.bowlingScoreCard ? players.bowlingScoreCard.overs : "Did not bat"}
          </Typography>

        </ContentDiv>
        <ContentDiv>
          <Typography variant="caption">
            {players.bowlingScoreCard ? players.bowlingScoreCard.medians : "Did not bat"}
          </Typography>

        </ContentDiv>
        <ContentDiv>
          <Typography variant="caption">
            {players.bowlingScoreCard ? players.bowlingScoreCard.runs : "Did not bat"}
          </Typography>

        </ContentDiv>
        <ContentDiv>
          <Typography variant="caption">
            {players.bowlingScoreCard ? players.bowlingScoreCard.wickets : "Did not bat"}
          </Typography>

        </ContentDiv>
        <ContentDiv>
          <Typography variant="caption">
            {players.bowlingScoreCard ? (players.bowlingScoreCard.runs/players.bowlingScoreCard.overs).toFixed(2) : "Did not bat"}
          </Typography>

        </ContentDiv>
        <ContentDiv>
          <Typography variant="caption">
            {players.catchStump ? players.catchStump : 0}
          </Typography>
        </ContentDiv>
        <ContentDiv style={{

          textAlign: "center"
        }}>
          <Typography variant="caption">
            {players.points ? players.points : 0}
          </Typography>

        </ContentDiv>
      </StatBowlerDiv>
      <Divider />
    </div>
  })

  const statsVisitorTeamField = () => teamStats.players[teamStats.visitorTeam].map((players,index) => {
    return <div key={players.id + "b"} style={players.catchStump ? { display: "block" } : { display: "none" }}>
      <StatFieldDiv >
        <ContentDiv>
          <Typography variant="caption">
            {players.fullname}
          </Typography>
        </ContentDiv>


        <ContentDiv>
          <Typography variant="caption">
            {players.catchStump ? players.catchStump : 0}
          </Typography>

        </ContentDiv>
        <ContentDiv style={{

          textAlign: "center"
        }}>
          <Typography variant="caption" >
            {players.points ? players.points : 0}
          </Typography>

        </ContentDiv>
      </StatFieldDiv>
      <Divider />
    </div>
  })


  const viewCustom = () => custom.map(contest => {

    return (
      <div key={contest._id}>

        <DuelsCustom >
 
        <Paper elevation={0} >

        
          <DuelsCustomDiv 
          style={{ padding: "6px" }} >
            <div style={{
              padding: '2.5px',
              margin: '5.5px',
            }}>
              <Avatar src={contest.userInfo.player1.profilePic ? contest.userInfo.player1.profilePic : 'https'} variant="circle" />

            </div>

            <DuelSingleRight >
              <div style={{
                display: "flex",
                flexDirection:"column",
                alignContent: "center",
                 textAlign:"start",
                justifyContent: "center"
              }}>
                <Typography variant="caption">
                  {contest.userInfo.player1.userName}
                </Typography>

                { contest.status === "Discarded" ? 
                              <Typography variant="caption" style={{ color: "#F38E22" }}>
                               Contest Cancelled!
                            </Typography>
              :
               
                contest.winner &&  contest.status !== "Discarded" ? 
                
                 contest.winner === contest.users.player1 ? 
                <Typography variant="caption" style={{ color: "#77BC37" }}>
                 {
                   contest.users.player1 === localStorage.getItem('sid') ? 
                      "You won ₹" + contest.totalAmount
                      :
                      "Winner ₹" + contest.totalAmount
                 } 
                </Typography> 
                : 
              <Typography variant="caption" style={{ color: "red" }}>
                 {
                   contest.users.player1 === localStorage.getItem('sid') ? 
                      "You lost, try again in next match"
                      :
                      "Duel lost"
                 } 
              </Typography>

             
                :
                <Typography variant="caption" style={{ color: "grey" }}>
                 

              </Typography>
              }
              </div>

            </DuelSingleRight>
            <DuelSingleRight style={{
              justifyContent: "flex-end",
              textAlign: "end"
            }}>
              <div style={{
                display: "flex",
                alignContent: "center",
                alignItems: "flex-end",
                flexDirection: "column",
                textAlign: "end",
                padding: "3.89px 0",
                color: "#E78922",
                minWidth: 100
              }}>
                <Typography variant="caption" style={{ color: "grey" }}>
                  Challenge
            </Typography>

                <Typography variant="caption">
                  {contest.info.player1}
                </Typography>
              </div>
            </DuelSingleRight>
      
          </DuelsCustomDiv>
          </Paper>
          <Paper elevation={0} > 
          <DuelsCustomDiv
            onClick={() => getPlayer(contest.playerDetail.id)}
            style={{
              cursor:"pointer",
              justifyContent: "space-between",
            }}>
              <div
               style={{
                display:"flex",
                flexDirection:"row",
                justifyContent: "flex-start",
              }}
              >

            <div style={{
              padding: '2.5px',
              margin: '5.5px',

            }}>
              <Avatar src={contest.playerDetail.image_path} variant="circle" />

            </div>

            <div style={{
              display: "flex",
              alignContent: "center",
              alignItems: "flex-start",
              flexDirection: "column"
            }}>
              <Typography variant="caption" style={{
                color: "grey",
              }}>
                {contest.playerDetail.firstname[0] + ". " + contest.playerDetail.lastname}
              </Typography>

              <Typography variant="caption" style={{ color: "grey" }}>
                {contest.playerDetail.teamInfo.code}

              </Typography>
              {
                contest.winner ? 
                <Typography variant="caption" style={{ color: "grey" }}>
                {contest.playerPoints} points

              </Typography>
                :
                <Typography variant="caption" style={{ color: "grey" }}>
                {contest.playerDetail.position.name}

              </Typography>
              }
              
            </div>
            </div>
              <div style={{
              display: "flex",
              alignContent: "center",
              alignItems: "flex-end",
              flexDirection: "column",
              justifyContent:"center"
            }}>
              <Typography variant="caption" style={{
                color: "grey",
              }}>
                Prize Pool
              </Typography>
              <Typography variant="caption" style={{
                color: "grey",
              }}>
               ₹{contest.totalAmount.toFixed(2)}
              </Typography>
                
              </div>

          </DuelsCustomDiv>
          </Paper>
          <Paper elevation={0} > 
          {contest.open &&  moment(match.starting_at).unix() >= moment().unix() ? 
          <DuelsCustomDiv style={{ padding: "5px" }} >



            <DuelSingleRight >
              <div style={{
                display: "flex",
                alignContent: "center",
                alignItems: "flex-start",
                flexDirection: "column",
                padding: "6.89px 0",
                color: "#77BC37",
              }}>
                <Typography variant="caption" style={{ color: "grey" }}>
                  Challenger
            </Typography>

                <Typography variant="caption">
                  {contest.info.player2}
                </Typography>
              </div>
              <div style={{
                display: "flex",
                alignContent: "center",
                alignItems: "flex-start",
                flexDirection: "column",
                justifyContent: "center"
              }}>
                <span style={{ padding: "2.5px", fontSize: "12px", marginLeft: "auto" }}>



                </span>
                <Typography variant="caption"
                  style={{

                    color: '#77BC37'
                  }}>
                  No Challenger yet
                  </Typography>
              </div>
            </DuelSingleRight>
          </DuelsCustomDiv>
            : contest.userInfo.player2 ?
            <DuelsCustomDiv2a style={{ padding: "6px",}} >

 
              <DuelSingleRight1b   >
                <div style={{
                  padding: '2.5px',
                  margin: '5.5px',


                }}>
                  <Avatar src={contest.userInfo.player2.profilePic ? contest.userInfo.player2.profilePic : 'https'} variant="circle" />

                </div>
                <DuelSingleRight1bSub >
                  <Typography variant="caption">
                    {contest.userInfo.player2.userName}
                  </Typography>
                  { contest.status === "Discarded" ? 
                              <Typography variant="caption" style={{ color: "#F38E22" }}>
                               Contest Cancelled!
                            </Typography>
              :
                contest.winner ? 
                
                 contest.winner === contest.users.player2 ? 
                <Typography variant="caption" style={{ color: "#77BC37" }}>
                 {
                   contest.users.player2 === localStorage.getItem('sid') ? 
                      "You won ₹" + contest.totalAmount
                      :
                      "Winner ₹" + contest.totalAmount
                 } 
                </Typography> 
                : 
              <Typography variant="caption" style={{ color: "red" }}>
                 {
                   contest.users.player2.toString() === localStorage.getItem('sid') ? 
                      "You lost, try again in next match"
                      :
                      "Duel lost"
                 } 
              </Typography>

             
                :
                <Typography variant="caption" style={{ color: "grey" }}>
                 

              </Typography>
              }
                </DuelSingleRight1bSub>

              </DuelSingleRight1b>
 
                <DuelSingleRight1bNestedDiv>
                  <Typography variant="caption" style={{ color: "grey" }}>
                    Challenger
                    </Typography>

                  <Typography variant="caption">
                    {contest.info.player2}
                  </Typography>
                </DuelSingleRight1bNestedDiv>
               
            </DuelsCustomDiv2a>
            : 
            <DuelsCustomDiv style={{ padding: "5px" }} >



            <DuelSingleRight >
              <div style={{
                display: "flex",
                alignContent: "center",
                alignItems: "flex-start",
                flexDirection: "column",
                padding: "6.89px 0",
                color: "#77BC37",
              }}>
                <Typography variant="caption" style={{ color: "grey" }}>
                  Challenger
            </Typography>

                <Typography variant="caption">
                  {contest.info.player2}
                </Typography>
              </div>
              <div style={{
                display: "flex",
                alignContent: "center",
                alignItems: "flex-start",
                flexDirection: "column",
                justifyContent: "center"
              }}>
                <span style={{ padding: "2.5px", fontSize: "12px", marginLeft: "auto" }}>



                </span>
                <Typography variant="caption"
                  style={{

                    color: '#77BC37'
                  }}>
                  No Challenger. Refunded
                  </Typography>
              </div>
            </DuelSingleRight>
          </DuelsCustomDiv>
           
          }
        </Paper>

        </DuelsCustom>
      </div>
    )
  })

  const viewCustomDuel = () => custom.map(contest => (
    <div key={contest._id}>

      <DuelsCustom2 >
        {/* <DuelCustomHeader>
        Player Duel 
      </DuelCustomHeader> */}

      <Paper elevation={0} >
        <DuelsCustomDiv style={{ padding: "6px" }} >
          <div style={{
            padding: '2.5px',
            margin: '5.5px',
          }}>
            <Avatar src={contest.userInfo.player1.profilePic ? contest.userInfo.player1.profilePic : 'https'} variant="circle" />

          </div>

          <DuelSingleRight  >
            <DuelSingleRight1sub  >
              <Typography variant="caption" className="textAlign">
                {contest.userInfo.player1.userName}
              </Typography>

              { contest.status === "Discarded" ? 
                              <Typography variant="caption" className="textAlign" style={{ color: "#F38E22" }}>
                               {contest.notPlaying === contest.player1 ? 
                               "Player not in starting 11" :
                               contest.users.player1 === localStorage.getItem('sid') ? "You won! ₹" + contest.totalAmount : "Won ₹" + contest.totalAmount

                               }
                            </Typography>
              : contest.winner && contest.status !== "Discarded" ? contest.users.player1 === contest.winner ? 
              
                contest.users.player1 === localStorage.getItem('sid') ? 

              
                <Typography variant="caption" className="textAlign" style={{ color: "#77BC37" }}>
                  You won ₹{contest.totalAmount}
                </Typography>
                :
                <Typography variant="caption" className="textAlign" style={{ color: "#77BC37" }}>
                Winner ₹{contest.totalAmount}
              </Typography>
                : 
                    <Typography variant="caption" className="textAlign" style={{ color: "red" }}>
                        {
                   contest.users.player1 === localStorage.getItem('sid')? 
                      "You lost, try again in next match"
                      :
                      "Duel lost"
                 } 
                  </Typography>
                :
                <Typography variant="caption" className="textAlign" style={{ color: "#77BC37" }}>
                Prize Pool ₹{contest.totalAmount}
              </Typography>
              }
            </DuelSingleRight1sub>

          </DuelSingleRight>
          <DuelSingleRight
            onClick={() => getPlayer(contest.player1Detail.id)}

            style={{
              cursor:"pointer",
              justifyContent: "flex-start",
              textAlign: "start",
              flexDirection: "row-reverse"
            }}
 
            >
            <div style={{
              padding: '2.5px',
              margin: '5.5px',

            }}>
              <Avatar src={contest.player1Detail.image_path} variant="circle" />

            </div>

            <div style={{
              display: "flex",
              alignContent: "center",
              alignItems: "flex-end",
              flexDirection: "column",
              textAlign: "end"
            }}>
              <Typography variant="caption" style={{ color: "grey" }}>
                {contest.player1Detail.firstname[0] + ". " + contest.player1Detail.lastname}

              </Typography>
              
              <Typography variant="caption" style={{ color: "grey" }}>
                {contest.player1Detail.teamInfo.code}

              </Typography>
              {
                 contest.winner ? 
                 <Typography variant="caption" style={{ color: "grey" }}>
                  {contest.player1Points} points
 
               </Typography>
                 :
              <Typography variant="caption" style={{ color: "grey" }}>
                {contest.player1Detail.position.name}

              </Typography>
              }
            </div>

          </DuelSingleRight>
        </DuelsCustomDiv>
        </Paper><Paper elevation={0} >
        <div style={{
          display: "flex",
          alignContent: "center",
          alignItems: "center",
          justifyContent: "center",
          height: "100%"
        }}>
          <AntiDiagonalTrans>
            <DiagonalTrans>
              vs
          </DiagonalTrans>
          </AntiDiagonalTrans>

        </div>
        </Paper><Paper elevation={0} >
        {contest.open &&  moment(match.starting_at).unix() >= moment().unix() ?
          <DuelsCustomDiv style={{ padding: "7px" }} >



            <DuelSingleRight >
              <div style={{
                display: "flex",
                alignContent: "center",
                alignItems: "flex-start",
                flexDirection: "column",
                padding: "6.89px 0",
                color: "#77BC37",
              }}>
                <Typography variant="caption" style={{ color: "grey" }}>
                  Challenger
            </Typography>

                <Typography variant="caption"
                // onClick={() => {selectedPlayer(true)}}
                >
                  No challenger yet
            </Typography>
              </div>
              <div style={{
                display: "flex",
                alignContent: "center",
                alignItems: "flex-start",
                flexDirection: "column",
                justifyContent: "center"
              }}>
                <span style={{ padding: "2.5px", fontSize: "12px", marginLeft: "auto" }}>



                </span>
                <Typography variant="caption"
                  style={{

                    color: '#77BC37'
                  }}>
                  No Challenger yet
                  </Typography>
              </div>
            </DuelSingleRight>
          </DuelsCustomDiv>
          : contest.player2 ? <DuelsCustomDiv2  >

            <DuelSingleRight2 >
              <div style={{
                padding: '2.5px',
                margin: '5.5px',


              }}>
                <Avatar src={contest.userInfo.player2.profilePic ? contest.userInfo.player2.profilePic : 'https'} variant="circle" />

              </div>
              <DuelSingleRight2sub  >
                <Typography variant="caption" className="textAlign" >
                  {contest.userInfo.player2.userName}
                </Typography>
                { contest.status === "Discarded" ? 
                              <Typography variant="caption" className="textAlign"  style={{ color: "#F38E22" }}>
                               {contest.notPlaying === contest.player2 ? 
                               "Player not in starting 11" :
                               contest.users.player2 === localStorage.getItem('sid') ? "You won! ₹" + contest.totalAmount : "Won ₹" + contest.totalAmount
                               }
                            </Typography>
              : contest.winner ? contest.users.player2 === contest.winner ? 
              
              contest.users.player2 === localStorage.getItem('sid') ? 

            
              <Typography variant="caption" className="textAlign"  style={{ color: "#77BC37" }}>
                You won ₹{contest.totalAmount}
              </Typography>
              :
              <Typography variant="caption" className="textAlign"  style={{ color: "#77BC37" }}>
              Winner ₹{contest.totalAmount}
            </Typography>
              : 
                  <Typography variant="caption"  style={{ color: "red",textAlign:"right" }}>
                                     {
                   contest.users.player2 === localStorage.getItem('sid')? 
                      "You lost, try again in next match"
                      :
                      "Duel lost"
                 } 
                </Typography>
              :
              <Typography variant="caption" className="textAlign"  style={{ color: "#77BC37" }}>
              Prize Pool ₹{contest.totalAmount}
            </Typography>
            }
              </DuelSingleRight2sub>

            </DuelSingleRight2>
            <DuelSingleRight1a
                          onClick={() => getPlayer(contest.player2Detail.id)}
              style={{
                cursor:"pointer"
              }}
            >
              <div style={{
                padding: '2.5px',
                margin: '5.5px',

              }}>
                <Avatar src={contest.player2Detail.image_path} variant="circle" />

              </div>

              <DuelSingleRight1aNestedDiv>
                <Typography variant="caption" style={{ color: "grey" }}>
                  {contest.player2Detail.firstname[0] + ". " + contest.player2Detail.lastname}

                </Typography>

                <Typography variant="caption" style={{ color: "grey" }}>
                  {contest.player2Detail.teamInfo.code}

                </Typography>
                {
                 contest.winner ? 
                 <Typography variant="caption" style={{ color: "grey" }}>
                  {contest.player2Points} points
 
               </Typography>
                 :
              <Typography variant="caption" style={{ color: "grey" }}>
                {contest.player2Detail.position.name}

              </Typography>
              }
              </DuelSingleRight1aNestedDiv>

            </DuelSingleRight1a>
          </DuelsCustomDiv2>
          :   <DuelsCustomDiv style={{ padding: "5px" }} >



          <DuelSingleRight >
            <div style={{
              display: "flex",
              alignContent: "center",
              alignItems: "flex-start",
              flexDirection: "column",
              padding: "6.89px 0",
              color: "#77BC37",
            }}>
              <Typography variant="caption" style={{ color: "grey" }}>
                Challenger
          </Typography>

              <Typography variant="caption">
              No Challenger
              </Typography>
            </div>
            <div style={{
              display: "flex",
              alignContent: "center",
              alignItems: "flex-start",
              flexDirection: "column",
              justifyContent: "center"
            }}>
              <span style={{ padding: "2.5px", fontSize: "12px", marginLeft: "auto" }}>



              </span>
              <Typography variant="caption"
                style={{

                  color: '#77BC37'
                }}>
                No Challenger. Refunded
                </Typography>
            </div>
          </DuelSingleRight>
        </DuelsCustomDiv>
         
        }
          </Paper>
          </DuelsCustom2>
          
    </div>
  ))

  /**
   * @VIEWMATCH
   */
  return (
    match !== null ? (
      <Container style={{ position: "relative", marginTop: 5, padding: 5 }} maxWidth='md'>

        <Paper elevation={3}>
          <ContestMainHeader>
            <div style={{ width: "100%" }}>
              <Typography variant="caption" style={{
                fontSize: "0.75em",
 
                // fontWeight: 600
              }}>
                {match.league.name}
              </Typography>
<br/>
              <div
                style={{
                  display: "flex",
                  flexDirection: 'row',
                  width: "100%",
                  
                  justifyContent: "space-between"
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: 'row',
                    alignContent: "center",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >

                  <Avatar src={match.localteam.image_path} variant="square"></Avatar>
                  {/* <Typography variant="caption" style={{
                    fontWeight: 600,
                    margin: 10
                  }}>
                    {match.localteam.code}
                  </Typography> */}


                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: 'row',
                    alignContent: "center",
                    alignItems: "center",
                    justifyContent: "space-between",
                    margin: "3.5px 14px",
                    width: "100%"
                  }}
                >
                  <div style={{

                    textAlign: "start"
                  }}>
                    <Typography variant="caption" style={{
                      fontWeight: 600,
                      textAlign: "start",

                    }}>
                      {match.localteam.name}
                    </Typography>
                    {
                      match.scoreboards ?
                        match.scoreboards.map((inn) => {
                          if (match.localteam.id === inn.team_id && inn.total !== 0) {
                            return (<div key={match.localteam.id}>
                              <div>
                                <Typography variant="caption">
                                  {inn.total}/{inn.wickets}
                                </Typography>
                              </div>
                              <div>
                                <Typography variant="caption">
                                  {inn.overs} overs
                              </Typography>
                              </div>
                            </div>)
                          }
                        }) : <div />
                    }
                  </div>

                  <div >

                    <div
                      style={{
                        display: "flex",
                        flexDirection: 'row',
                        alignContent: "center",
                        alignItems: "center",
                        justifyContent: "space-between",
                        // marginBottom: "3.5px",
                        margin: 10
                      }}
                    >
                      {match.isFinished===true && match.isCounting===true
                        ? <Typography variant={"caption"} style={{fontWeight:600}}>Counting points</Typography>
                        : !match.isLive
                        ? match.status === "Finished" 
                        ? <Typography variant={"caption"}>{match.note}</Typography> 
                        : match.status === "Aban." || match.status === "Cancl."
                        ? <Typography variant={"caption"}>Match Abandoned: {match.note}</Typography>
                        : <Typography variant={"caption"}>
                            <Countdown
                              date={match.starting_at ? match.starting_at : match.starting_at}
                              daysInHours={false} />
                          </Typography>
                        : <Typography variant={"caption"}>{match.note}</Typography>
                      }
                    </div>


                  </div>
                  <div style={{
                    fontWeight: 600,
                    textAlign: "end"
                  }}>
                    <Typography variant="caption" style={{
                      fontWeight: 600,
                      textAlign: "end"
                    }}>
                      {match.visitorteam.name}
                    </Typography>
                    {match.scoreboards ?
                      match.scoreboards.map(inn => {
                        if (match.visitorteam.id === inn.team_id && inn.total !== 0) {
                          return (<div key={match.localteam.id} style={{
                            textAlign: "end"
                          }}>

                            <div>
                              <Typography variant="caption">
                                {inn.total}/{inn.wickets}
                              </Typography>
                            </div>
                            <div>
                              <Typography variant="caption">
                                {inn.overs} overs
                              </Typography>
                            </div>
                          </div>)
                        }
                      }) : <div />

                    }

                  </div>

                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: 'row',
                    alignContent: "center",
                    alignItems: "center",
                    justifyContent: "space-between"
                  }}>

                  {/* <Typography variant="caption" style={{
                    fontWeight: 600,
                    margin: 10
                  }}>
                    {match.visitorteam.code}
                  </Typography> */}
                  <Avatar src={match.visitorteam.image_path} variant="square"></Avatar>

                </div>
              </div>
              <br />
              <Typography variant="caption">
                {/* <Countdown  date={matchInfo.startDate ? matchInfo.startDate.iso : matchInfo.start_date.iso} /> */}
              </Typography>
            </div>

            {/* 
            <div>

              <Button variant="outlined" style={{ borderRadius: '20px', }}>
                <Typography variant="caption" >
                  Rules & scoring
                  </Typography>
              </Button>

            </div> */}

          </ContestMainHeader>
        </Paper>
        <Paper style={{
          borderRadius: "5px",
          marginTop: 10
        }}>
          <Tabs
            value={value}
            indicatorColor="secondary"
            textColor="primary"
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="on"
          >
            <Tab label="1/3 Under/Over" />
            <Tab label="1/2 Under/Over" />
            <Tab label="Combo Duels" />
            <Tab label="Fantasy 11" />
            <Tab label="Custom Duels" />
            <Tab label="Stats" />
          </Tabs>
        </Paper>
        {/* 
        <Paper elevation={0} style={value === 0 ? { display: 'block', marginTop: '25px' } : { display: 'none' }}>
          <div>
            {vsContest.length > 0 ? viewVs() : <div>No Contest Joined</div>}
          </div>
        </Paper> */}

        <div style={value === 0 ? { display: 'block', marginTop: '10px' } : { display: 'none' }}  >
          <Paper elevation={0} style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            padding: "10px",
            marginBottom: '2.5px'
          }}>
            <div elevation={0} style={{
              fontStyle: "italic",
              textAlign: 'start',

            }}>
              <Typography variant="caption" style={{ fontWeight: 800 }}>
                Under/Over
             </Typography>

            </div>
          </Paper>
          <div style={{
            display: 'flex',
            flexDirection: "column",

          }}>


            {UnderOver !== null ? UnderOver.length > 0 ? view()
              :  <Paper elevation={0} style={{ width: "100%", textAlign: "center", backgroundColor: mode ? "#232C31" : "#F9F8FC" }}>
              <Typography variant="caption" style={{ width: "100%", fontWeight: 600, textAlign: "center" }} >
                Join Contest
             </Typography>
            </Paper> :
              <CircularProgress style={{
                position: "fixed",
                top: "50%",
                left: "50%"
              }} disableShrink />
            }
          </div>
        </div>

        <div style={value === 1 ? { display: 'block', marginTop: '10px' } : { display: 'none' }}  >
          <Paper elevation={0} style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            padding: "10px",
            marginBottom: '2.5px'
          }}>
            <div elevation={0} style={{
              fontStyle: "italic",
              textAlign: 'start',

            }}>
              <Typography variant="caption" style={{ fontWeight: 800 }}>
                Under/Over
             </Typography>

            </div>
          </Paper>
          <div style={{
            display: 'flex',
            flexDirection: "column",

          }}>


            {UnderOver2 !== null ? UnderOver2.length > 0 ? viewUnderOver()
              :  <Paper elevation={0} style={{ width: "100%", textAlign: "center", backgroundColor: mode ? "#232C31" : "#F9F8FC" }}>
              <Typography variant="caption" style={{ width: "100%", fontWeight: 600, textAlign: "center" }} >
                Join Contest
             </Typography>
            </Paper> :
              <CircularProgress style={{
                position: "fixed",
                top: "50%",
                left: "50%"
              }} disableShrink />
            }
          </div>
        </div>






        <div style={value === 2 ? { display: 'block', position: "relative", marginTop: '10px' } : { display: 'none' }}>

          <Container maxWidth="md" style={{ padding: 0 }}>
            <Paper elevation={0} style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              padding: "10px",
            }}>
              <div elevation={0} style={{
                fontStyle: "italic",
                textAlign: 'start',

              }}>
                <Typography variant="caption" style={{ fontWeight: 800 }}>
                  Combo Duels
                  </Typography>
              </div>
            </Paper>

            {matchUps !== null ? matchUps.length > 0 ? viewCombo() :  <Paper elevation={0} style={{ width: "100%", textAlign: "center", backgroundColor: mode ? "#232C31" : "#F9F8FC" }}>
                  <Typography variant="caption" style={{ width: "100%", fontWeight: 600, textAlign: "center", }} >
                    Join Contest
                 </Typography>
                </Paper> :
              <CircularProgress style={{
                position: "fixed",
                top: "50%",
                left: "50%"
              }} disableShrink />}

          </Container>

        </div>

        <div style={value === 3 ? { display: 'block', marginTop: '10px', position: "relative" } : { display: 'none' }}>
          <Container maxWidth="md" style={{ padding: 10 }}>
            <Paper elevation={0} style={{
              marginBottom: 60,
              backgroundColor: "rgba(0,0,0,0)"
            }} >
              {fantasy.length > 0 ? viewFantasy() :
                <div style={{ width: "100%", textAlign: "center" }}>
                  <Typography variant="caption" style={{ width: "100%", fontWeight: 600, textAlign: "center" }} >
                    Join Contest
                 </Typography>
                </div>}
            </Paper>
          </Container>

        </div>

        <div style={value === 4 ? { display: 'block', position: "relative", marginTop: '10px' } : { display: 'none' }}>
          
            <Paper elevation={0} style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              padding: "10px",
              position: "sticky",
            }}>
              <div elevation={0} style={{
                textAlign: 'start',

              }}>
                <Typography variant="caption" style={{ marginRight: 5 }}>
                  Select
              </Typography>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={filterCustom}
                  onChange={(event) => handleFilterCustom(event.target.value)}
                >
                  <MenuItem value={5}>
                  <Typography variant="caption" style={{ marginRight: 5 }}>
                  Under/Over
              </Typography></MenuItem>
                  <MenuItem value={6}><Typography variant="caption" style={{ marginRight: 5 }}>
                  Duels
              </Typography></MenuItem>

                </Select>
              </div>

              <div elevation={0} style={{
                textAlign: 'end',

              }}>
                <Typography variant="caption" style={{ marginRight: 5 }}>
                  Sort
              </Typography>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={directionCustom}
                  onChange={(event) => handleCustomDirectionChange(event.target.value)}
                >
                  <MenuItem value={1}><Typography variant="caption" style={{ marginRight: 5 }}>
                  Asc
              </Typography></MenuItem>
                  <MenuItem value={-1}><Typography variant="caption" style={{ marginRight: 5 }}>
                  Desc
              </Typography></MenuItem>
                </Select>
              </div>



            </Paper>

            <Paper elevation={0} style={{
              marginBottom: 60,
              backgroundColor: "rgba(0,0,0,0)"
            }} >
              {custom !== null ?
                custom.length > 0 ?
                  filterCustom === 5 ? viewCustom() : viewCustomDuel() :
                  <div style={{
                    textAlign: "center",
                    marginTop: 30,
                    height:100
                  }}>
                    <Typography variant="caption" >Create a Duel</Typography>
                  </div>
                :
                <CircularProgress style={{
                  position: "fixed",
                  top: "50%",
                  left: "50%"
                }} disableShrink />}
            </Paper>
      

        </div>

        <div style={value === 5 ? { display: 'block', marginTop: '10px', position: "relative" } : { display: 'none' }}>
          <Container maxWidth="md" style={{ padding: 10 }}>
            <Paper elevation={0} style={{
              marginBottom: 60
            }} >

              <Tabs
                value={value2}
                indicatorColor="secondary"
                textColor="primary"
                onChange={handleChange2}

                variant="fullWidth"
              >
                <Tab label={Object.entries(teamStats).length > 0 ? teamStats.matchDetail.localteam.code : ''} />
                <Tab label={Object.entries(teamStats).length > 0 ? teamStats.matchDetail.visitorteam.code : ''} />

              </Tabs>
              <StatsContainerDiv style={value2 === 0 ? { position: "relative" } : { display: 'none' }}>
                {Object.entries(teamStats).length > 0 ? <div style={{ width: "100%", textAlign: "center", margin: 25 }}>
                  <Typography variant="caption" style={{ width: "100%", fontWeight: 600, textAlign: "center", }} >
                    BATTING
                 </Typography>
                </div> : <div />}
                <Divider />
                <StatDiv style={{ backgroundColor: !mode ? "#E4E5E6" : "#2F3D44" }} >
                  <HeaderDiv>
                    <Typography variant="caption" style={{
                      fontSize: "0.85rem",
                      fontWeight: "750",
                      lineHeight: "1.5"
                    }}>
                      BAT
          </Typography>

                  </HeaderDiv>
                  <HeaderDiv>
                    <Typography variant="caption" style={{
                      fontSize: "0.85rem",
                      fontWeight: "750",
                      lineHeight: "1.5"
                    }}>
                      B
          </Typography>

                  </HeaderDiv>
                  <HeaderDiv>
                    <Typography variant="caption" style={{
                      fontSize: "0.85rem",
                      fontWeight: "750",
                      lineHeight: "1.5"
                    }}>
                      R
          </Typography>

                  </HeaderDiv>
                  <HeaderDiv>
                    <Typography variant="caption" style={{
                      fontSize: "0.85rem",
                      fontWeight: "750",
                      lineHeight: "1.5"
                    }}>
                      4s
          </Typography>

                  </HeaderDiv>
                  <HeaderDiv>
                    <Typography variant="caption" style={{
                      fontSize: "0.85rem",
                      fontWeight: "750",
                      lineHeight: "1.5"
                    }}>
                      6s
          </Typography>

                  </HeaderDiv>
                  <HeaderDiv>
                    <Typography variant="caption" style={{
                      fontSize: "0.85rem",
                      fontWeight: "750",
                      lineHeight: "1.5"
                    }}>
                      SR
          </Typography>

                  </HeaderDiv>
                  <HeaderDiv>
                    <Typography variant="caption" style={{
                      fontSize: "0.85rem",
                      fontWeight: "750",
                      lineHeight: "1.5"
                    }}>
                      Catch/
          </Typography>
          <Typography variant="caption" style={{
                      fontSize: "0.85rem",
                      fontWeight: "750",
                      lineHeight: "1.5"
                    }}>
                      Stump/
          </Typography>
          <Typography variant="caption" style={{
                      fontSize: "0.85rem",
                      fontWeight: "750",
                      lineHeight: "1.5"
                    }}>
                      RunOut
          </Typography>

                  </HeaderDiv>
                  <HeaderDiv style={{

                    textAlign: "center"
                  }}>
                    <Typography variant="caption" style={{
                      fontSize: "0.85rem",
                      fontWeight: "750",
                      lineHeight: "1.5"
                    }}>
                      FP
          </Typography>

                  </HeaderDiv>
                </StatDiv>
                {Object.entries(teamStats).length > 0 ? statslocalTeam() :
                  <div style={{ width: "100%", textAlign: "center", backgroundColor: "#F9F8FC" }}>
                    <Typography variant="caption" style={{ width: "100%", fontWeight: 600, textAlign: "center", backgroundColor: "#F9F8FC" }} >
                      Stats will be updated soon
                 </Typography>
                  </div>}

                {Object.entries(teamStats).length > 0 ? <div style={{ width: "100%", textAlign: "center", margin: 25 }}>
                  <Typography variant="caption" style={{ width: "100%", fontWeight: 600, textAlign: "center", }} >
                    BOWLING
                 </Typography>
                </div> : <div />}
                <Divider />
                <StatBowlerDiv style={{ backgroundColor: !mode ? "#E4E5E6" : "#2F3D44" }} >
                  <HeaderDiv>
                    <Typography variant="caption" style={{
                      fontSize: "0.85rem",
                      fontWeight: "750",
                      lineHeight: "1.5"
                    }}>
                      BOWL
          </Typography>

                  </HeaderDiv>
                  <HeaderDiv>
                    <Typography variant="caption" style={{
                      fontSize: "0.85rem",
                      fontWeight: "750",
                      lineHeight: "1.5"
                    }}>
                      O
          </Typography>

                  </HeaderDiv>
                  <HeaderDiv>
                    <Typography variant="caption" style={{
                      fontSize: "0.85rem",
                      fontWeight: "750",
                      lineHeight: "1.5"
                    }}>
                      M
          </Typography>

                  </HeaderDiv>
                  <HeaderDiv>
                    <Typography variant="caption" style={{
                      fontSize: "0.85rem",
                      fontWeight: "750",
                      lineHeight: "1.5"
                    }}>
                      R
          </Typography>

                  </HeaderDiv>
                  <HeaderDiv>
                    <Typography variant="caption" style={{
                      fontSize: "0.85rem",
                      fontWeight: "750",
                      lineHeight: "1.5"
                    }}>
                      W
          </Typography>

                  </HeaderDiv>
                  <HeaderDiv>
                    <Typography variant="caption" style={{
                      fontSize: "0.85rem",
                      fontWeight: "750",
                      lineHeight: "1.5"
                    }}>
                      ECON
          </Typography>

                  </HeaderDiv>
                  <HeaderDiv>
                  <Typography variant="caption" style={{
                      fontSize: "0.85rem",
                      fontWeight: "750",
                      lineHeight: "1.5"
                    }}>
                      Catch/
          </Typography>
          <Typography variant="caption" style={{
                      fontSize: "0.85rem",
                      fontWeight: "750",
                      lineHeight: "1.5"
                    }}>
                      Stump/
          </Typography>
          <Typography variant="caption" style={{
                      fontSize: "0.85rem",
                      fontWeight: "750",
                      lineHeight: "1.5"
                    }}>
                      RunOut
          </Typography>

 
                  </HeaderDiv>
                  <HeaderDiv style={{

                    textAlign: "center"
                  }}>
                    <Typography variant="caption" style={{
                      fontSize: "0.85rem",
                      fontWeight: "750",
                      lineHeight: "1.5"
                    }}>
                      FP
          </Typography>

                  </HeaderDiv>
                </StatBowlerDiv>
                <Divider />
                {Object.entries(teamStats).length > 0 ? statslocalTeamBowler() :
                  <div style={{ width: "100%", textAlign: "center", backgroundColor: "#F9F8FC" }}>
                    <Typography variant="caption" style={{ width: "100%", fontWeight: 600, textAlign: "center", backgroundColor: "#F9F8FC" }} >
                      Stats will be updated soon
                 </Typography>
                  </div>}

                <div style={{ width: "100%", textAlign: "center", margin: 25 }}>
                  <Typography variant="caption" style={{ width: "100%", fontWeight: 600, textAlign: "center", }} >
                    OTHERS
                 </Typography>
                </div>
                <Divider />
                <StatFieldDiv style={{ backgroundColor: !mode ? "#E4E5E6" : "#2F3D44" }}>

                  <HeaderDiv>
                    <Typography variant="caption" style={{
                      fontSize: "0.85rem",
                      fontWeight: "750",
                      lineHeight: "1.5"
                    }}>
                      FIELD
          </Typography>

                  </HeaderDiv>




                  <HeaderDiv>
                  <Typography variant="caption" style={{
                      fontSize: "0.85rem",
                      fontWeight: "750",
                      lineHeight: "1.5"
                    }}>
                      Catch/
          </Typography>
          <Typography variant="caption" style={{
                      fontSize: "0.85rem",
                      fontWeight: "750",
                      lineHeight: "1.5"
                    }}>
                      Stump/
          </Typography>
          <Typography variant="caption" style={{
                      fontSize: "0.85rem",
                      fontWeight: "750",
                      lineHeight: "1.5"
                    }}>
                      RunOut
          </Typography>

                  </HeaderDiv>
                  <HeaderDiv>
                    <Typography variant="caption" style={{
                      fontSize: "0.85rem",
                      fontWeight: "750",
                      lineHeight: "1.5"
                    }}>
                      FP
          </Typography>

                  </HeaderDiv>

                </StatFieldDiv>
                <Divider />
                {Object.entries(teamStats).length > 0 ? statslocalTeamField() :
                  <div style={{ width: "100%", textAlign: "center", backgroundColor: "#F9F8FC" }}>
                    <Typography variant="caption" style={{ width: "100%", fontWeight: 600, textAlign: "center", backgroundColor: "#F9F8FC" }} >
                      Stats will be updated soon
                 </Typography>
                  </div>}



              </StatsContainerDiv>

              <StatsContainerDiv style={value2 === 1 ? { position: "relative" } : { display: 'none' }}>
                {Object.entries(teamStats).length > 0 ? <div style={{ width: "100%", textAlign: "center", margin: 25 }}>
                  <Typography variant="caption" style={{ width: "100%", fontWeight: 600, textAlign: "center", }} >
                    BATTING
                 </Typography>
                </div> : <div />}
                <Divider />
                <StatDiv style={{ backgroundColor: !mode ? "#E4E5E6" : "#2F3D44" }} >
                  <HeaderDiv>
                    <Typography variant="caption" style={{
                      fontSize: "0.85rem",
                      fontWeight: "750",
                      lineHeight: "1.5"
                    }}>
                      BAT
          </Typography>

                  </HeaderDiv>
                  <HeaderDiv>
                    <Typography variant="caption" style={{
                      fontSize: "0.85rem",
                      fontWeight: "750",
                      lineHeight: "1.5"
                    }}>
                      B
          </Typography>

                  </HeaderDiv>
                  <HeaderDiv>
                    <Typography variant="caption" style={{
                      fontSize: "0.85rem",
                      fontWeight: "750",
                      lineHeight: "1.5"
                    }}>
                      R
          </Typography>

                  </HeaderDiv>
                  <HeaderDiv>
                    <Typography variant="caption" style={{
                      fontSize: "0.85rem",
                      fontWeight: "750",
                      lineHeight: "1.5"
                    }}>
                      4s
          </Typography>

                  </HeaderDiv>
                  <HeaderDiv>
                    <Typography variant="caption" style={{
                      fontSize: "0.85rem",
                      fontWeight: "750",
                      lineHeight: "1.5"
                    }}>
                      6s
          </Typography>

                  </HeaderDiv>
                  <HeaderDiv>
                    <Typography variant="caption" style={{
                      fontSize: "0.85rem",
                      fontWeight: "750",
                      lineHeight: "1.5"
                    }}>
                      SR
          </Typography>

                  </HeaderDiv >
                  <HeaderDiv>
                  <Typography variant="caption" style={{
                      fontSize: "0.85rem",
                      fontWeight: "750",
                      lineHeight: "1.5"
                    }}>
                      Catch/
          </Typography>
          <Typography variant="caption" style={{
                      fontSize: "0.85rem",
                      fontWeight: "750",
                      lineHeight: "1.5"
                    }}>
                      Stump/
          </Typography>
          <Typography variant="caption" style={{
                      fontSize: "0.85rem",
                      fontWeight: "750",
                      lineHeight: "1.5"
                    }}>
                      RunOut
          </Typography>

                  </HeaderDiv>
                  <HeaderDiv style={{

                    textAlign: "center"
                  }}>
                    <Typography variant="caption" style={{
                      fontSize: "0.85rem",
                      fontWeight: "750",
                      lineHeight: "1.5",
                      textAlign: "center"
                    }}>
                      FP
          </Typography>

                  </HeaderDiv>
                </StatDiv>
                {Object.entries(teamStats).length > 0 ? statsVisitorTeam() :
                  <div style={{ width: "100%", textAlign: "center", backgroundColor: "#F9F8FC" }}>
                    <Typography variant="caption" style={{ width: "100%", fontWeight: 600, textAlign: "center", backgroundColor: "#F9F8FC" }} >
                      Stats will be updated soon
                 </Typography>
                  </div>}

                {Object.entries(teamStats).length > 0 ? <div style={{ width: "100%", textAlign: "center", margin: 25 }}>
                  <Typography variant="caption" style={{ width: "100%", fontWeight: 600, textAlign: "center", }} >
                    BOWLING
                 </Typography>
                </div> : <div />}
                <Divider />
                <StatBowlerDiv style={{ backgroundColor: !mode ? "#E4E5E6" : "#2F3D44" }} >
                  <HeaderDiv>
                    <Typography variant="caption" style={{
                      fontSize: "0.85rem",
                      fontWeight: "750",
                      lineHeight: "1.5"
                    }}>
                      BOWL
          </Typography>

                  </HeaderDiv>
                  <HeaderDiv>
                    <Typography variant="caption" style={{
                      fontSize: "0.85rem",
                      fontWeight: "750",
                      lineHeight: "1.5"
                    }}>
                      O
          </Typography>

                  </HeaderDiv>
                  <HeaderDiv>
                    <Typography variant="caption" style={{
                      fontSize: "0.85rem",
                      fontWeight: "750",
                      lineHeight: "1.5"
                    }}>
                      M
          </Typography>

                  </HeaderDiv>
                  <HeaderDiv>
                    <Typography variant="caption" style={{
                      fontSize: "0.85rem",
                      fontWeight: "750",
                      lineHeight: "1.5"
                    }}>
                      R
          </Typography>

                  </HeaderDiv>
                  <HeaderDiv>
                    <Typography variant="caption" style={{
                      fontSize: "0.85rem",
                      fontWeight: "750",
                      lineHeight: "1.5"
                    }}>
                      W
          </Typography>

                  </HeaderDiv>
                  <HeaderDiv>
                    <Typography variant="caption" style={{
                      fontSize: "0.85rem",
                      fontWeight: "750",
                      lineHeight: "1.5"
                    }}>
                      ECON
          </Typography>

                  </HeaderDiv>
                  <HeaderDiv>
                  <Typography variant="caption" style={{
                      fontSize: "0.85rem",
                      fontWeight: "750",
                      lineHeight: "1.5"
                    }}>
                      Catch/
          </Typography>
          <Typography variant="caption" style={{
                      fontSize: "0.85rem",
                      fontWeight: "750",
                      lineHeight: "1.5"
                    }}>
                      Stump/
          </Typography>
          <Typography variant="caption" style={{
                      fontSize: "0.85rem",
                      fontWeight: "750",
                      lineHeight: "1.5"
                    }}>
                      RunOut
          </Typography>

                  </HeaderDiv>
                  <HeaderDiv style={{

                    textAlign: "center"
                  }}>
                    <Typography variant="caption" style={{
                      fontSize: "0.85rem",
                      fontWeight: "750",
                      lineHeight: "1.5"
                    }}>
                      FP
          </Typography>

                  </HeaderDiv>
                </StatBowlerDiv>
                <Divider />
                {Object.entries(teamStats).length > 0 ? statsVisitorTeamBowler() :
                  <div style={{ width: "100%", textAlign: "center", backgroundColor: "#F9F8FC" }}>
                    <Typography variant="caption" style={{ width: "100%", fontWeight: 600, textAlign: "center", backgroundColor: "#F9F8FC" }} >
                      Stats will be updated soon
                 </Typography>
                  </div>}
                <div style={{ width: "100%", textAlign: "center", margin: 25 }}>
                  <Typography variant="caption" style={{ width: "100%", fontWeight: 600, textAlign: "center", }} >
                    OTHERS
                 </Typography>
                </div>
                <Divider />
                <StatFieldDiv style={{ backgroundColor: !mode ? "#E4E5E6" : "#2F3D44" }} >

                  <HeaderDiv>
                    <Typography variant="caption" style={{
                      fontSize: "0.85rem",
                      fontWeight: "750",
                      lineHeight: "1.5"
                    }}>
                      FIELD
          </Typography>

                  </HeaderDiv>




                  <HeaderDiv>
                  <Typography variant="caption" style={{
                      fontSize: "0.85rem",
                      fontWeight: "750",
                      lineHeight: "1.5"
                    }}>
                      Catch/
          </Typography>
          <Typography variant="caption" style={{
                      fontSize: "0.85rem",
                      fontWeight: "750",
                      lineHeight: "1.5"
                    }}>
                      Stump/
          </Typography>
          <Typography variant="caption" style={{
                      fontSize: "0.85rem",
                      fontWeight: "750",
                      lineHeight: "1.5"
                    }}>
                      RunOut
          </Typography>

                  </HeaderDiv>
                  <HeaderDiv>
                    <Typography variant="caption" style={{
                      fontSize: "0.85rem",
                      fontWeight: "750",
                      lineHeight: "1.5"
                    }}>
                      FP
          </Typography>

                  </HeaderDiv>

                </StatFieldDiv>
                <Divider />
                {Object.entries(teamStats).length > 0 ? statsVisitorTeamField() :
                  <div style={{ width: "100%", textAlign: "center", backgroundColor: "#F9F8FC" }}>
                    <Typography variant="caption" style={{ width: "100%", fontWeight: 600, textAlign: "center", backgroundColor: "#F9F8FC" }} >
                      Stats will be updated soon
                 </Typography>
                  </div>}

              </StatsContainerDiv>

            </Paper>
          </Container>

        </div>



        <Dialog fullScreen={fullScreen} open={openPrizePool} onClose={PrizePoolClose} TransitionComponent={Transition}>
          <AppBar color="secondary" position={"relative"} className={classes.appBar}>
            <Toolbar>
              <IconButton edge="start" style={{ color: "white" }} onClick={PrizePoolClose} aria-label="close">
                <CloseIcon />
              </IconButton>
              <Typography variant="caption" style={{ color: "white",fontSize:"1rem",
                        fontWeight:500, }} className={classes.title}>
                Prize Breakdown
            </Typography>
            </Toolbar>
          </AppBar>
          <Container maxWidth="md" style={{ padding: 10 }}>
            <Paper elevation={0} style={{
              marginBottom: 60
            }} >
              <List>
                <Paper
                  elevation={0}
                  style={{
                    minWidth: 256,
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between"
                  }}
                >
                  <div>
                    <Typography variant="caption" style={{ fontWeight: 800 }}>
                      Range
                  </Typography>
                  </div>
                  <div>
                    <Typography variant="caption" style={{ fontWeight: 800 }}>
                      Winnings
                </Typography>

                  </div>
                </Paper>
                <Divider />
                {viewBreakdown()}
              </List>
            </Paper>
          </Container>


        </Dialog>

        <Dialog fullScreen={fullScreen} open={openPlayerDetail} onClose={PrizePoolClose}>
        <AppBar color="secondary" position={"relative"} className={classes.appBar}>
            <Toolbar>
              <IconButton edge="start" style={{ color: "white" }} onClick={PrizePoolClose} aria-label="close">
                <CloseIcon />
              </IconButton>
              <Typography variant="caption" style={{ color: "white", fontSize:"1rem",
                        fontWeight:500, }} className={classes.title}>
               Player Details
            </Typography>
            </Toolbar>
          </AppBar>
          <Paper elevation={0} style={{
            minWidth: 285
          }}>
            {playerStats !== null ? Object.keys(playerStats).length > 0 ?
              <PlayerStatDiv>
                  <PlayerStatNestedDiv style={{
                    gridTemplateColumns: "auto 1fr"
                  }}>
                    <Avatar src={playerStats.image_path} style={{
                      width: 45,
                      height: 45
                    }}></Avatar>
                    <Typography variant="caption" style={{
                      textAlign:"start",
                      alignItems:"center",
                      display:"flex",
                      fontWeight:700,
                      fontSize:"1rem"
                    }}>
                      {playerStats.fullname}
                    </Typography>
                  </PlayerStatNestedDiv>

                  <PlayerStatNestedDiv style={{
                    gridTemplateColumns: "auto 1fr"
                  }}>
                    <Avatar src={playerStats.teamDetails.image_path} style={{
                      width: 45
                    }}></Avatar>
                    <Typography variant="caption" style={{
                      textAlign:"start",
                      alignItems:"center",
                      display:"flex"
                    }}>
                      {playerStats.teamDetails.code}
                    </Typography>
                  </PlayerStatNestedDiv>


                  <PlayerStatNestedDiv  >
                  <Typography variant="caption">
                    Batting style
                  </Typography>
                    <Typography variant="caption" style={{
                       
                    }}>
                    {playerStats.battingstyle ? playerStats.battingstyle.split('-')[0][0].toUpperCase() + playerStats.battingstyle.split('-').join(' ').slice(1) : "-"}
                    </Typography>
                  </PlayerStatNestedDiv>
                  <PlayerStatNestedDiv  >
                  <Typography variant="caption">
                    Bowling style 
                  </Typography>
                    <Typography variant="caption" style={{
                
                    }}>
                    {playerStats.bowlingstyle ? playerStats.bowlingstyle.split('-')[0][0].toUpperCase() + playerStats.bowlingstyle.split('-').join(' ').slice(1) : "-"}
                    </Typography>
                  </PlayerStatNestedDiv>

                  <PlayerStatNestedDiv  >
                  <Typography variant="caption">
                    Positon role
                  </Typography>
                    <Typography variant="caption" style={{
                       
                    }}>
                    {playerStats.position.name}
                    </Typography>
                  </PlayerStatNestedDiv>

                  

                  {playerStats.battingScoreCard ?
                   <div>
                   <Divider />

                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <Typography variant="caption" style={{
                        fontSize:"1rem",
                        fontWeight:500,
                         
                      }}>
                        Batting Scorecard
                      </Typography>
                      <Divider />
                      <PlayerStatNestedDiv style={{
                         marginTop:"5px"
                      }}>
                        <Typography variant="caption">
                          Ball
                        </Typography>
                        <Typography variant="caption">
                          {playerStats.battingScoreCard.ball}
                        </Typography>
                        <Typography variant="caption">
                          Score
                        </Typography>
                        <Typography variant="caption">
                          {playerStats.battingScoreCard.score}
                        </Typography>
                        <Typography variant="caption">
                          Fours
                        </Typography>
                        <Typography variant="caption">
                          {playerStats.battingScoreCard.four_x}
                        </Typography>
                        <Typography variant="caption">
                          Sixes
                        </Typography>
                        <Typography variant="caption">
                          {playerStats.battingScoreCard.six_x}
                        </Typography>
                        <Typography variant="caption">
                          Strike Rate
                        </Typography>
                        <Typography variant="caption">
                          {playerStats.battingScoreCard.rate}
                        </Typography>
                      </PlayerStatNestedDiv>
                    </div>
                    </div>

                    : <div />
                  }

                  

                  {playerStats.bowlingScoreCard ?
                  <div>
                                      <Divider />

                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <Typography variant="caption" style={{
                        fontSize:"1rem",
                        fontWeight:500,
                        
                      }}>
                        Bowling Scorecard
                      </Typography>
                      <Divider />
                      <PlayerStatNestedDiv style={{
                         marginTop:"5px"
                      }}>
                        <Typography variant="caption">
                          Overs
                        </Typography>
                        <Typography variant="caption">
                          {playerStats.bowlingScoreCard.overs}
                        </Typography>
                        <Typography variant="caption">
                          Runs
                        </Typography>
                        <Typography variant="caption">
                          {playerStats.bowlingScoreCard.runs}
                        </Typography>
                        <Typography variant="caption">
                          Wickets
                        </Typography>
                        <Typography variant="caption">
                          {playerStats.bowlingScoreCard.wickets}
                        </Typography>
                        <Typography variant="caption">
                          Medians
                        </Typography>
                        <Typography variant="caption">
                          {playerStats.bowlingScoreCard.medians}
                        </Typography>
                        <Typography variant="caption">
                          Wide
                        </Typography>
                        <Typography variant="caption">
                          {playerStats.bowlingScoreCard.wide}
                        </Typography>
                        <Typography variant="caption">
                          No ball
                        </Typography>
                        <Typography variant="caption">
                          {playerStats.bowlingScoreCard.noball}
                        </Typography>
                        <Typography variant="caption">
                          Economy
                        </Typography>
                        <Typography variant="caption">
                          {(playerStats.bowlingScoreCard.runs/playerStats.bowlingScoreCard.overs).toFixed(2)}
                        </Typography>
                      </PlayerStatNestedDiv>
                    </div>
                    </div>
                    : <div />
                  }
 
                   
                  {playerStats.catchStump > 0 || playerStats.runOut ?
                  <div>
                                      <Divider />

                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <Typography variant="caption" style={{
                        fontSize:"1rem",
                        fontWeight:500,
                        
                      }}>
                        Fielding Scorecard
                      </Typography>
                      <Divider />
                      <PlayerStatNestedDiv style={{
                         marginTop:"5px"
                      }}>
                        <Typography variant="caption">
                          Catch/Stump
                        </Typography>
                        <Typography variant="caption">
                          {playerStats.catchStump}
                        </Typography>
                        <Typography variant="caption">
                          Runout(Throw/Stump)
                        </Typography>
                        <Typography variant="caption">
                          {playerStats.runOut ? playerStats.runOut.length : 0 }
                        </Typography>
                     </PlayerStatNestedDiv>
                    </div>
                    </div>
                    : <div />
                  }
                   <Divider />
                  <PlayerStatNestedDiv>
                    <Typography variant="caption">
                      Credit
                     </Typography>
                    <Typography variant="caption">
                      {playerStats.credit || 0}
                    </Typography>
                  </PlayerStatNestedDiv>
                  <PlayerStatNestedDiv>
                    <Typography variant="caption">
                      Points
                     </Typography>
                    <Typography variant="caption">
                      {playerStats.points || 0}
                    </Typography>
                  </PlayerStatNestedDiv>
                 
              </PlayerStatDiv>
              :
              <Typography >
                Player details not available
                 </Typography>
              :
              <CircularProgress style={{
                position: "fixed",
                top: "60%",
                left: "50%",
                color:"white"
              }} disableShrink />}
          </Paper>

        </Dialog>


      </Container>) :
      <CircularProgress style={{
        position: "fixed",
        top: "50%",
        left: "50%"
      }} disableShrink />
  )
}