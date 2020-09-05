/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-lone-blocks */
import React from 'react';
import ReactGA from 'react-ga';

import { useEffect, useContext } from 'react';
import * as color from '../../json/color.json';
import { Link } from "react-router-dom";

import useMediaQuery from '@material-ui/core/useMediaQuery';

import styled from 'styled-components'

import CircularProgress from '@material-ui/core/CircularProgress';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import _ from 'lodash';
import InputLabel from '@material-ui/core/InputLabel';

//
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import { makeStyles, withStyles, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
 
import Button from '@material-ui/core/Button';
 
import EditIcon from '@material-ui/icons/Edit';

import { Divider, IconButton, Dialog,TextField, Avatar,Slider, Input, Toolbar, Badge } from '@material-ui/core';

import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';


import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
 
import StarRateIcon from '@material-ui/icons/StarRate';
// Other modules
import AppBar from '@material-ui/core/AppBar';

import Countdown from 'react-countdown';
import Notification from '../common/notification'
 
import PropTypes from 'prop-types';

import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import LinearProgress from '@material-ui/core/LinearProgress';

import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';


// API
import * as api from '../../api/contest'
import * as matchApi from '../../api/match'
import * as team from '../../api/team'

import * as user from '../../api/user'

// components
import { HomeContext, WalletBonusContext } from '../home';
import { LoginContext } from '../home';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

let dynamicObj = {}
let dynamicObj2 = {};
 
const multipleArr = [1.5, 2, 3, 5, 11, 26, 40, 75, 125, 250]
const multipleArr2 = [1.5, 3, 5, 11, 26, 40, 75, 125, 250, 500]

const size = {
  mobileS: '320px',
  mobileM: '375px',
  mobileL: '649px',
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
      borderRadius:"0 0px 5px 5px"
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
    },
    select:{
      height:"36px"
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
    backgroundColor: 'white',
  },
  bar: {
    borderRadius: "0 0 2px 2px",
    backgroundImage: 'linear-gradient(to right, #ffbc00, #fcb00c, #f9a315, #f4981c, #ef8c22)',
  },
})(LinearProgress);

const DuelsCustom = styled.div`
  display: grid;
  grid-template-columns: 1fr 0.5fr 1fr;
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
    background-color:white;
     text-align:center;
     border: 1px solid #cdcbcb;
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
    grid-template-rows: auto auto auto;
    align-items: center;
    margin:10px 0 10px 0;
    background-color:white;
     text-align:center;
     border: 1px solid #cdcbcb;
    border-radius: 5px;
 
  }
`


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
border:1px solid #cbd4df;
background-color: #FFFFFF;
padding:5px;
border-radius:4px;
transition: transform .2s;
cursor:pointer;
@media ${device.mobileL} {
  border:none;
  text-align:center;
  justify-content:center;
   }
 
`;



const Duels = styled.div`
  display: grid;
  grid-template-columns: 1fr 40px 1fr;
  margin-bottom: 0.25em;
  grid-gap: 2px;
  -webkit-align-items: end;
  -ms-flex-align: end;
  align-items: end;
  grid-template-rows: auto 1fr;
 
  @media ${device.mobileL} {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto 0px auto;
    align-items: center;
    margin:0px 0 12px 0;
     
  }
`

const DuelSingle = styled.div`
  display:flex;
  flex-direction:row;
  margin:2px;
  border:1px solid #cbd4df;
  background-color: #FFFFFF;
  padding:5px;
  border-radius:4px;
  transition: transform .2s;
  cursor:pointer;
  @media ${device.mobileL} {
 
    flex-direction: row-reverse;
  }
  &:hover {
    transform: scale(1.025);
    box-shadow:0 0 0.52em 0 rgba(0,0,0,0.15)
}
`;

const DuelSingleLeft = styled.div`
  display:flex;
  flex-direction:row;
  margin:2px;
  align-content:center;
  justify-content:space-between;
  width:100%;
  @media ${device.mobileL} {
    
    flex-direction: row-reverse;
  }
`;

const DuelSingleLeftSub = styled.div`
  display: flex;
  align-content: center;
  flex-direction: column;
  align-items: flex-end;
  @media ${device.mobileL} {
    align-items: flex-start;

  }
`

const DuelSingleRightTop = styled.div`
  display:flex;
  flex-direction:row;
  margin:2px;
  border:1px solid #cbd4df;
  background-color: #FFFFFF;
  padding:5px;
  border-radius:4px;
  transition: transform .2s;
  cursor:pointer;
  @media ${device.mobileL} {
     }
  &:hover {
    transform: scale(1.025);
    box-shadow:0 0 0.52em 0 rgba(0,0,0,0.15)
}
`;

const DuelSingleRight = styled.div`
  display:flex;
  flex-direction:row;
  margin:2px;
  align-content:"center";
  justify-content:space-between;
  width:100%;
 
`;

const Betslip = styled.div`
display:block;
 border-radius: 2px;
bottom: 0;
transition: 250ms;

-webkit-filter: drop-shadow(0 0 5px rgba(0,0,0,0.3));
filter: drop-shadow(0 0 5px rgba(0,0,0,0.3));
font-size: .9em;
max-width: 400px;
overflow: hidden;
position: fixed;
right: 0;
 transform: translateY(calc(100% - 10.72em));
width: 100%;
z-index: 123;
  @media ${device.mobileL} {
    max-width:100%;
    margin:-9px 0;
    bottom: 8px;
  }
`;

const BetHeader = styled.div`
-webkit-justify-content: space-between;
-ms-flex-pack: justify;
justify-content: space-between;
background-color: var(--bet-slip-header-bg,var(--primary-color,#1a1e23));
color: var(--primary-text,#fff);
height: var(--bet-slip-header-height,3em);
border: 1px solid var(--bet-slip-header-bg,var(--primary-color,#1a1e23));
cursor: pointer;
padding: var(--bet-slip-header-padding,0 var(--padding,.5em));
display: -webkit-flex;
display: -ms-flexbox;
display: flex;
-webkit-align-items: center;
-ms-flex-align: center;
align-items: center;
`;

const BetInfo = styled.div`
background-color: #3E4651;
padding: 13px;
color:white;
 transform: translateY(0px);
`;

const BetFooter = styled.div`
background-color: #77BC37;
width:100%;
padding: 5px;
height:25px;
text-align:center;
color:white;
font-weight:600;
cursor:pointer
`;

const ContestMainHeader = styled.div`

  border-image: initial;
  padding: 10px;
  display: flex;
  border-radius:5px;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: center;

  @media ${device.mobileL} {
    flex-direction: column;
    justify-content: center;
    text-align:center;
  }
`;


 




const ContestType2 = styled.div`
  display: grid;
  grid-template-columns: 1fr 435px;
  grid-template-rows: 1fr;
 
  grid-template-areas: "nameArea valueArea";
  
  @media (max-width: 627px) {
    width:100%;
    margin: 10px 0;
    display: grid;
    grid-template-columns: 1fr 1fr;

    grid-template-areas: "nameArea nameArea"
                         "valueArea valueArea";
     grid-template-rows: 0.5fr 0.5fr;
    gap: 5px 5px;
    text-align:center
  }
`

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
    text-align: center;
    display: flex;
    flex-direction: row;
    place-content: center;
    align-items: center;
  
  }
`


const ContestvalueArea = styled.div`
  grid-area:valueArea;
  width:100%;
   display: grid;
  grid-template-columns: 32% 32% 32%;
  grid-gap:5px;
  align-items:center;
  @media (max-width: 627px) {
    width:100%;
    display: grid;
    justify-content: center;
    grid-template-columns: 32% 32% 32%;
    grid-gap:5px;
  }
`

const ContestButton = styled.div`
  display: flex;
  width:100%;
   height:56px;
   transition: transform .2s;

   @media (min-width: 627px) {
    &:hover {
      transform: scale(1.025);
      box-shadow:0 0 0.52em 0 rgba(0,0,0,0.15)
    }
 }

   
  @media (max-width: 627px) {
     width:100%;
     height:100%;
 
  }
`

const ContestButtonContent = styled.div`
cursor: pointer;
              border-radius:2px;
                            border:1px solid #CBD4DF;
              width:100%;
              background-color:white;
              padding:0 10px;
              text-align:center;
  @media (max-width: 627px) {
    width:100%;
   }
`

const TeamCard = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-template-rows: 0.25fr 1fr;
  @media (max-width: 545px) {
 
    grid-template-columns: 1fr 1fr; 
    text-align:center
  }
`

const TeamCommon = styled.div`
  display:flex;
  padding: 2.5px 10px;
  flex-direction: row;
  align-items:center;
  min-height: 30px;
  
`
const TeamCommonPlayer = styled.div`
display:flex;
flex-direction:column;
ailgn-content:center;
  text-align:center;
  margin:5px;
  min-width:76px
`

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
            border:1px solid white;
            align-content:center;
            justify-content:center;
            color: white;
            border-radius: 4px;
            -webkit-transform: rotate(45deg);
            -ms-transform: rotate(45deg);
                    transform: rotate(45deg);
`

// align-items:center;
let combo = {};

export default function Contest(props) {


  // let history = useHistory();
  // 

  const theme = useTheme();

  const classes = useStyles();

  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));


  const [value, setValue] = React.useState(props.location && props.location.state && props.location.state.tabNumber ?
    props.location.state.tabNumber : 1);
  const [, setChecked] = React.useState(false);



  const [match, setMatches] = React.useState(null);
  const [message, setMessage] = React.useState("false");
  const [openNotification, setOpenNotifi] = React.useState(false);


  const [, setWallet] = useContext(HomeContext)
  const [, setBonus] = useContext(WalletBonusContext)


  const [, setOpenLogin] = useContext(LoginContext)

  // const [, setOpen] = React.useState(false);

  const [moreLessArr, setMoreLess] = React.useState([]);

  const [, setVs] = React.useState([]);

  const [matchUps, setMatchups] = React.useState([]);

  const [fantasy, setfantasy] = React.useState([]);

  const [betAmount, setBet] = React.useState(0);

 
  const [, setcontestId] = React.useState('0');

 
  const [, setteamId] = React.useState('0');
  // const [playerIn] = React.useState({});
  const [, setcontestType] = React.useState(0);
  const [multiple, setMultiple] = React.useState(0);

  const [, setCount] = React.useState([]);

  const [enterContest, setEnterContest] = React.useState(false);

  const [minimize, setMinimize] = React.useState(true);

  const [selectedTeam, setTeams] = React.useState({});

  const [enterContest2, setEnterContest2] = React.useState(false);

  const [minimize2, setMinimize2] = React.useState(true);
  const [minimize3, setMinimize3] = React.useState(true);
  const [minimize4, setMinimize4] = React.useState(true);

  const [openTeam, setTeamOpen] = React.useState(false);

  const [teamList, setTeamList] = React.useState([]);

  const [fanId, setFantasyId] = React.useState('');
  const [openSelectTeam, setOpenTeamSelect] = React.useState(false);

  const [openPrizePool, setOpenPrizePool] = React.useState(false);


  const [breakdown, setBreakDown] = React.useState([]);

  const [direction, setDirection] = React.useState('asc');

  const [sortType, setSortType] = React.useState('prizePool');

  const [directionValue, setDirectionValue] = React.useState(1);

  const [sortTypeValue, setSortTypeValue] = React.useState(1);

  const [disableButton, setDisableButton] = React.useState(false);

  const [filter, setFilter] = React.useState(0);

  const [fantasyOrginal, setfantasyOrginal] = React.useState([]);

  const [wait, setWait] = React.useState(false);
  const [custom, setCustom] = React.useState(null);

  const [min, setMinRange] = React.useState(0);
  const [max, setMaxRange] = React.useState(10000000);
 
  const [filterCustom, setCustomFilter] = React.useState(5);

  const [, setPage] = React.useState(0);
  const [directionCustom, setCustomDirection] = React.useState(1);

  const [, setCustomDirectionValue] = React.useState(1);

  const [openCustom, handleCustomDialog] = React.useState(false);

  const [contestType, setContestType] = React.useState(1);
  const [playerIdCustom, setPlayerIdCustom] = React.useState(1);
  const [fantasyPoints, setFantasyPoints] = React.useState('');
  const [subType, setUnderOver] = React.useState('');
  const [customAmount, setCustomAmount] = React.useState('');


  const [openJoinCustom, joinDialog] = React.useState(false);
  const [openJoinDuelCustom, setCustomDuelDialog] = React.useState(false);

  const [playerList, setplayerList] = React.useState(null);

  const [click, setClick] = React.useState(false);
  const [customDialogDetail, setJoinCustom] = React.useState({});
   const [selectedPlayer, setSelectedPlayer] = React.useState('');

   
  const handleFilterCustom = (value) => {
    setCustomFilter(value)
    setCustom(null)
    setCustomDuelDialog(false)
    joinDialog(false)
    setSelectedPlayer('')
    if(min > max){
      return handleNotificationClick("Min amount cannot be greater than max")
    }
    api.customContest(props.match.params.matchId,min,max,value,1).then(response => {
       
      setCustom(response.data.data);
      
    })
  }

  const handleContestType = (event) => { 
    setContestType(event.target.value)
  }
  
  const handlePlayerId = (event) => { 
    setPlayerIdCustom(event.target.value);
  }

  const handleSelectPlayer = (event) => { 
    setSelectedPlayer(event.target.value);
  }

  const handleUnderOver = (event) => { 
    setUnderOver(event.target.value);
  }

  const handleCustomAmount = (event) => { 
    setCustomAmount(event.target.value);
  }
  

  const handleFantasyPoints = (event) => {
    setFantasyPoints(event.target.value);
  }

  const createDuel = () => {
      let object;
       if(!click){
         setClick(true)
      if(contestType === 2){
      object = { 
        matchId:props.match.params.matchId,
        contestType:6,
        playerId: playerIdCustom,
        type:3,
        amount:customAmount,
      }}

      if(contestType === 1){
      object = { 
        matchId:props.match.params.matchId,
        contestType:5,
        playerId: playerIdCustom,
        type:3,
        subType:subType,
        amount:customAmount,
        value:fantasyPoints
      }}

 
      api.createContest(object).then(response => {
          if(response.status === 200){
            handleNotificationClick("Contest created");
            getCustom()
          }
      }).catch(err => {
        setClick(false)
        handleCustomDialog(false)
        handleNotificationClick("Error, Please try again later")
        console.log(err.response);
        
      })   
    }
  }

  const joinCustom = (contestId) => {
    api.joinCustomContest({contestId}).then(response => {
      if(response.status === 200){
        getCustom();
        setJoinCustom(false);
        joinDialog(false)
       return handleNotificationClick("Contest joined");
       
      }
      return handleNotificationClick(response.data.message)
    })
  }

  const getCustom = () => {
    api.customContest(props.match.params.matchId,min,max,filterCustom,1).then(response => {
      setClick(false)
      setCustom(response.data.data);
      profile();
      handleCustomDialog(false)
    })
  }

   
  const joinDuelCustom = (contestId) => {
     
    if(selectedPlayer === ''){
      return handleNotificationClick("Select a player")
    }
    api.joinCustomContestDuel({contestId,playerId:selectedPlayer}).then(response => {
      if(response.status === 200){
        getCustom();
        setJoinCustom(false);
        joinDialog(false);
        setCustomDuelDialog(false);
        setSelectedPlayer('')
       return handleNotificationClick("Contest joined")
      }
      return handleNotificationClick(response.data.message)
    })
  }

  const handleCustomDirectionChange = (dir) => {
    let fanD = custom;
    if (dir === 1) {
      setCustomDirection(1);

      setCustomDirectionValue('asc');
      fanD = _.orderBy(fanD, 'amount', ['asc']);
      setCustom(fanD)
    } else {
      setCustomDirection(dir);

      setCustomDirectionValue('desc')
      fanD = _.orderBy(fanD, 'amount', ['desc']);
      setCustom(fanD)
    }
  }

  const getFilteredCustom = () => {
    setCustom(null);
    if(min > max){
      return handleNotificationClick("Min amount cannot be greater than max")
    }
    api.customContest(props.match.params.matchId,min,max,filterCustom,1).then(response => {     
      setCustom(response.data.data);

    })
  }

  const getPageCustom = (page) => {
    setPage(page)
    api.customContest(props.match.params.matchId,min,max,0,page).then(response => {
      let ff = response.data.data;
      if(filterCustom !== 0 ){
        ff = _.filter(response.data.data, ['contestType', filterCustom]);
      }
      
      setCustom(ff);

    })
  }

  const handleTeamOpen = () => {
    setWait(true)
   

    team.getAllUserTeam(props.match.params.matchId).then(response => {
      setWait(false)
      setTeamOpen(true);
      setTeamList(response.data);
      
    }).catch(err => {
      setWait(false)

      if(err.response && err.response.status === 401){
        setOpenLogin(true)
      }
    })
  };

  const handleTeamClose = () => {
    setTeamOpen(false);
    setOpenTeamSelect(false)
    handleCustomDialog(false)
  };

  const PrizePoolClose = () => {
    setTeamOpen(false);
    setOpenPrizePool(false)

  };

  useEffect(() => {

    ReactGA.pageview(props.location.pathname);
    window.scrollTo(0, 0)
    console.log("windo");

     matchApi.match(1, props.match.params.matchId).then(response => {


      setMatches(response.data.match)



    })
    api.contest(props.match.params.matchId, 'active').then(response => {
      response.data.data.forEach(contest => {
        if (contest._id === 1) {
          setCount(['1'])

          // dynamicObj2 = {}
          // contest.contest.forEach((contest,index2) => {
          //   uState[`typeCA-${index2}`] = true;

          //   dynamicObj2 = {
          //     ...dynamicObj2,
          //     [contest._id]: {
          //       bool: false,
          //       [contest._id]: false,
          //     }
          //   }
          // })

          dynamicObj2 = {}
          contest.contest.forEach(contest => {
            dynamicObj2 = {
              ...dynamicObj2,
              [contest._id]: {
                bool: false,
                [contest._id + "playerL"]: false,
                [contest._id + "playerM"]: false,
                [contest._id + "playerR"]: false,
              }
            }
          })

          setMoreLess(contest.contest);
        } else {
          setVs(contest.contest)
        }
      });
    })

    api.matchUps(props.match.params.matchId).then(response => {
      dynamicObj = {}
      response.data.data.forEach(contest => {
        dynamicObj = {
          ...dynamicObj,
          [contest._id]: {
            bool: false,
            [contest._id + "playerL"]: false,
            [contest._id + "playerR"]: false,
          }
        }
      })
      setMatchups(response.data.data);

    })

    api.customContest(props.match.params.matchId,min,max,5,1).then(response => {
      console.log(response.data.data);
      
      setCustom(response.data.data);
      
    })

    
    api.fantasy(props.match.params.matchId).then(response => {
      let fff = _.orderBy(response.data.data, ['prizePool'], ['desc'])
      setfantasy(fff)
      setfantasyOrginal(fff)
    })

    team.teamStats(props.match.params.matchId).then(response => {
      console.log(response.data);
      let fff = [...response.data.players[response.data.localTeam],...response.data.players[response.data.visitorTeam]]
       fff = _.orderBy(fff, ['fullname'], ['asc'])
      console.log(fff);
      setplayerList(fff)
    })


  }, []);
 



  const handleChange = (event, newValue) => {
    setValue(newValue);
    joinDialog(false)
    setCustomDuelDialog(false)
    setBet(0);
    handleReset();
    setTeams({})
    console.log(newValue);
    
    if (newValue !== 1) {
      setEnterContest(false);
    }
    if (newValue !== 0) {
      setEnterContest2(false);
    }

    if (newValue === 1) {
      setChecked(true);
      dynamicObj2 = {}
      moreLessArr.forEach(contest => {
        dynamicObj2 = {
          ...dynamicObj2,
          [contest._id]: {
            bool: false,
            [contest._id + "playerL"]: false,
            [contest._id + "playerM"]: false,
            [contest._id + "playerR"]: false,
          }
        }
      })
    } else {
      setChecked(false);
      dynamicObj = {}
      matchUps.forEach(contest => {
        dynamicObj = {
          ...dynamicObj,
          [contest._id]: {
            bool: false,
            [contest._id + "playerL"]: false,
            [contest._id + "playerR"]: false,
          }
        }
      })
    }
  };




  const handleNotificationClose = () => {
    setOpenNotifi(false);
  }

  const handleNotificationClick = (message) => {
    setOpenNotifi(true);
    setMessage(message);

  }

  // const handleClose = () => {
  //   setOpen(false);
  // }


  const setBetAmount = (amount, type) => {
    
    

    if (type === 'add') {
      let bet = amount + betAmount;
      setBet(bet)
    } else if (type === 'minus') {
      let bet = betAmount - amount;
      if (bet < 0) {
        setBet(0)
      } else {
        setBet(bet)
      }
    } else {
      if (isNaN(amount)) {
        setBet(0)
        return handleNotificationClick("Value must be a number")
      }
      setBet(Number.parseFloat(amount).toFixed(2))
    }
  }


  const joinFantasyContest = (id, fee) => {
    if(localStorage.getItem('isLogged')=== 'true'){

    setWait(true)
    team.getAllUserTeam(props.match.params.matchId).then(response => {
      setWait(false)
      setFantasyId(id);
      setOpenTeamSelect(true);
      setBet(fee);
      setTeamList(response.data);
      
    }).catch(err => {
      setWait(false)

      if(err.response && err.response.status === 401){
        setOpenLogin(true)
      }
    })
    }else{
      setOpenLogin(true)
    } 
  }

  const confirmJoinFantasyContest = (teamId) => {
    if (localStorage.getItem('isLogged') === null || localStorage.getItem('isLogged') === 'false') {
      setOpenLogin(true)
      return
    }
    if (!disableButton) {
      
      let obj = {
        matchId: parseInt(props.match.params.matchId),
        contestId: fanId,
        teamId: teamId
      }
      setDisableButton(true)

      handleTeamClose()

      api.joinFantasyContest(obj).then(response => {

        handleNotificationClick(response.data.message)
        
        handleTeamClose()
        setDisableButton(false)
        if (response.data.status === 202) {
          return
        }
        api.fantasy(props.match.params.matchId).then(response => {
          let fff = _.orderBy(response.data.data, ['prizePool'], ['desc'])
          setfantasy(fff)
          setfantasyOrginal(fff)
        })
        profile();
        setBet(0)
 
      })
    }
  }








  const view = () => moreLessArr.map(contest => (
    <Paper key={contest._id} elevation={1} style={{
 
      marginTop: 10
    }}>
      <ContestType2>
        <ContestNameArea>
          <ContestRightNameArea>
            <div style={{

              padding: '16.5px',
              // margin: '5.5px',


            }}>
              <Avatar src={contest.playerInfo.image_path} variant="circle" />
            </div>
            <div>
              <Typography variant="caption" style={{ fontWeight: 700 }}>
                {contest.playerInfo.fullname}
              </Typography>
              <br />
              <Typography variant="caption" >
                {contest.playerInfo.team ? contest.playerInfo.team.name : ""}
              </Typography>
              <br />
              <Typography variant="caption" >
                {contest.playerInfo.position ? contest.playerInfo.position.name : ""}
              </Typography>
            </div>

          </ContestRightNameArea>
        </ContestNameArea>
        <div>

        </div>

        <ContestvalueArea>
          <ContestButton onClick={() => { setEnterContest2(true); setMinimize2(true); makeCombo2(contest._id, contest._id + "playerL", { value1: contest.value1, value2: contest.value2, typeName: contest.typeName }, contest.playerInfo, 1) }}>

            <ContestButtonContent
              onClick={() => { setcontestType(1); setcontestId(contest._id); setteamId(1); }}
              style={{
                cursor: "pointer",
                boxShadow: dynamicObj2[contest._id][contest._id + "playerL"] ? "0 0 1em 0 #71bc4f" : "",
                backgroundColor: dynamicObj2[contest._id][contest._id + "playerL"] ? color.secondary.main : "#F5F6FA",
                color: dynamicObj2[contest._id][contest._id + "playerL"] ? "white" : "grey"
              }}
            >
              <Typography variant="caption"  >
                Under
            </Typography>
              <br />
              <Typography variant="caption"
                style={{
                  fontWeight: 800
                }}
              >{contest.value1} FP</Typography>

            </ContestButtonContent>
          </ContestButton>


          <ContestButton onClick={() => { setEnterContest2(true); setMinimize2(true); makeCombo2(contest._id, contest._id + "playerM", { value1: contest.value1, value2: contest.value2, typeName: contest.typeName }, contest.playerInfo, 2) }}>


            <ContestButtonContent
              onClick={() => { setcontestType(1); setcontestId(contest._id); setteamId(2); }}
              style={{ 
                cursor: "pointer", 
                display:"grid",
                padding:0,
                gridTemplateColumns:"45px 1fr 45px",
                boxShadow: dynamicObj2[contest._id][contest._id + "playerM"] ? "0 0 1em 0 #71bc4f" : "", 
                backgroundColor: dynamicObj2[contest._id][contest._id + "playerM"] ? 
                color.secondary.main : "#F5F6FA", 
                color: dynamicObj2[contest._id][contest._id + "playerM"] ? "white" : "grey" }}

            >
              <div>
              <Typography variant="caption"  >
                Over
            </Typography>
              <br />
              <Typography variant="caption"
                style={{
                  fontWeight: 800
                }}
              >{contest.value1 + 1} FP


              </Typography>
              </div>
              <div>
                -
              </div>
              <div>
              <Typography variant="caption"  >
                Under
            </Typography>
              <br />
              <Typography variant="caption"
                style={{
                  fontWeight: 800
                }}
              >{contest.value2} FP


              </Typography>
              </div>


            </ContestButtonContent>



          </ContestButton>


          <ContestButton onClick={() => { setEnterContest2(true); setMinimize2(true); makeCombo2(contest._id, contest._id + "playerR", { value1: contest.value1, value2: contest.value2, typeName: contest.typeName }, contest.playerInfo, 3) }}>

            <ContestButtonContent
              onClick={() => { setcontestType(1); setcontestId(contest._id); setteamId(3); }}
              style={{ cursor: "pointer", boxShadow: dynamicObj2[contest._id][contest._id + "playerR"] ? 
              "0 0 1em 0 #71bc4f" : "", 
              backgroundColor: dynamicObj2[contest._id][contest._id + "playerR"] ? 
              color.secondary.main : "#F5F6FA", color: dynamicObj2[contest._id][contest._id + "playerR"] ?
               "white" : "grey" }}

            >

              <Typography variant="caption"  >
                Over
            </Typography>
              <br />
              <Typography variant="caption"
                style={{
                  fontWeight: 800
                }}
              >{contest.value2 + 1} FP</Typography>

            </ContestButtonContent>





          </ContestButton>





        </ContestvalueArea>
      </ContestType2>
    </Paper>

  ))


  const viewCombo = () => matchUps.map(contest => (
    <Duels key={contest._id}>
      
      <DuelSingle onClick={() => { setEnterContest(true); makeCombo(contest._id, contest._id + "playerL", contest.players[contest.player1].id, contest.players[contest.player1]) }}
        style={{ cursor: "pointer", boxShadow: dynamicObj[contest._id][contest._id + "playerL"] ? "0 0 1em 0 #71bc4f" : "", backgroundColor: dynamicObj[contest._id][contest._id + "playerL"] ? color.secondary.main : "#FFFFFF", color: dynamicObj[contest._id][contest._id + "playerL"] ? "white" : "black" }}>
 
        <DuelSingleLeft >
          <div style={{
            display: "flex",
            alignContent: "center",
            alignItems: "center"
          }}>
            <Typography variant="subtitle2">
            <StarRateIcon style={dynamicObj[contest._id][contest._id + "playerL"] ? { margin: 10,color:"#ebff00" } : { margin: 10,color:"#f79123" }} />

            </Typography>
          </div>
          <DuelSingleLeftSub  >
            <Typography variant="caption">
              {contest.players[contest.player1].fullname}

            </Typography>

            <Typography variant="caption">
              <span style={{ fontWeight: 600 }}>
                {contest.players[contest.player1].team.code}
              </span>
                           -{contest.players[contest.player2].team.code}

            </Typography>
            <Typography variant="caption">
              {contest.players[contest.player1].position.name}

            </Typography>
          </DuelSingleLeftSub>
        </DuelSingleLeft>
       
        <div style={{

          padding: '2.5px',
          margin: '5.5px',

        }}>
          <Avatar src={contest.players[contest.player1].image_path} variant="circle" />
        </div>
      
     </DuelSingle>
      
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


      <DuelSingleRightTop  
        onClick={() => { setEnterContest(true); makeCombo(contest._id, contest._id + "playerR", contest.players[contest.player2].id, contest.players[contest.player2]) }} 
        style={{  cursor: "pointer", 
        boxShadow: dynamicObj[contest._id][contest._id + "playerR"] ? "0 0 1em 0 #71bc4f" 
        : "",
         backgroundColor: dynamicObj[contest._id][contest._id + "playerR"] ? color.secondary.main 
         : "#FFFFFF", 
         color: dynamicObj[contest._id][contest._id + "playerR"] ? "white" : "black" }} >
        <div style={{
          padding: '2.5px',
          margin: '5.5px',
        }}>
          <Avatar src={contest.players[contest.player2].image_path} variant="circle" />

        </div>

        <DuelSingleRight style={{ flexDirection: "row-reverse" }} >
          <div style={{
            display: "flex",
            alignContent: "center",
            alignItems: "center"
          }}>
            <Typography variant="subtitle2">
              {/* <CheckCircleSharpIcon style={{ margin: 10 }} /> */}

            </Typography>
          </div>
          <div style={{
            display: "flex",
            alignContent: "center",
            alignItems: "flex-start",
            flexDirection: "column"
          }}>
            <Typography variant="caption">
              {contest.players[contest.player2].fullname}

            </Typography>

            <Typography variant="caption">

              {contest.players[contest.player1].team.code}-
                           <span style={{ fontWeight: 600 }}>
                {contest.players[contest.player2].team.code}
              </span>

            </Typography>
            <Typography variant="caption">
              {contest.players[contest.player2].position.name}

            </Typography>
          </div>
        </DuelSingleRight>
      </DuelSingleRightTop>
    </Duels>

  ))

  const viewCustom = () => custom.map(contest => {
     
    return(
    <div key={contest._id}>
    
    <DuelsCustom >
    <DuelCustomHeader>
      Under/Over 
    </DuelCustomHeader>
   

      <DuelsCustomDiv style={{padding: "6px"}} >
        <div style={{
          padding: '2.5px',
          margin: '5.5px',
        }}>
          <Avatar src={contest.userInfo.player1.profilePic ? contest.userInfo.player1.profilePic : 'https'}  variant="circle" />

        </div>

        <DuelSingleRight >
          <div style={{
            display:"flex",
            alignContent:"center",
            alignItems:"center"
          }}>
            <Typography variant="caption">
            {contest.userInfo.player1.userName}
            </Typography>
      
            {/* <Typography variant="subtitle2">
             Level
            </Typography> */}
          </div>
           
        </DuelSingleRight>
        <DuelSingleRight style={{
             justifyContent:"flex-end",
             textAlign:"end"
         }}>
          <div style={{
            display: "flex",
            alignContent: "center",
            alignItems: "flex-end",
            flexDirection: "column",
            textAlign:"end",
            padding: "3.89px 0",
            color:"#E78922",
            minWidth:100
          }}>
            <Typography variant="caption" style={{color:"grey"}}>
            Challenge
            </Typography>
      
            <Typography variant="caption">
            {contest.info.player1}
            </Typography>
          </div>
        </DuelSingleRight>
      </DuelsCustomDiv>
      <DuelsCustomDiv style={{
           
          justifyContent:"center",
        }}>
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
            <Typography variant="caption"  style={{color: "grey",
              }}>
            {contest.playerDetail.firstname[0]+". "+contest.playerDetail.lastname}
            </Typography>

            <Typography variant="caption"  style={{color:"grey"}}>
            {contest.playerDetail.teamInfo.code}                 

            </Typography>
            <Typography variant="caption"  style={{color:"grey"}}>
            {contest.playerDetail.position.name}

            </Typography>
          </div>
        </DuelsCustomDiv>
      <DuelsCustomDiv style={{padding: "5px"}} >
       


        <DuelSingleRight >
          <div style={{
            display: "flex",
            alignContent: "center",
            alignItems: "flex-start",
            flexDirection: "column",
            padding: "6.89px 0",
            color:"#77BC37",
          }}>
            <Typography variant="caption" style={{color:"grey"}}>
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
            justifyContent:"center"
          }}>
                        <span style={{ padding: "2.5px", fontSize: "12px", marginLeft: "auto" }}>

                  <Button size="small" 
                   onClick={() => {joinDialog(true);setMinimize3(true);setCustomDuelDialog(false)
                    ;setJoinCustom({contestId:contest._id,amount:contest.amount.toFixed(2)})}} 
                  variant="contained" style={{
                    backgroundColor: '#77BC37',
                    color: 'white'
                  }}>₹{contest.amount.toFixed(2)}</Button>

                  </span>
                  <Typography variant="caption"
                  style={{
                    
                    color: '#77BC37'
                  }}>
                    Payout: 1.9x
                  </Typography>
          </div>
        </DuelSingleRight>
      </DuelsCustomDiv>
     
     </DuelsCustom>
     </div>
  )})

  const viewCustomDuel = () => custom.map(contest => (
    <div key={contest._id}>
    
    <DuelsCustom2 >
      <DuelCustomHeader>
        Player Duel 
      </DuelCustomHeader>
   

      <DuelsCustomDiv style={{padding: "6px"}} >
        <div style={{
          padding: '2.5px',
          margin: '5.5px',
        }}>
          <Avatar  variant="circle" />

        </div>

        <DuelSingleRight style={{
            textOverflow: "ellipsis",
            overflow: "hidden",
            maxWidth: 60,
            display:"flex",
            alignContent:"center",
            alignItems:"center"
          }}>
          <div style={{
            textOverflow: "ellipsis",
            overflow: "hidden",
            maxWidth: 60,
            display:"flex",
            alignContent:"center",
            alignItems:"center"
          }}>
            <Typography variant="caption">
             {contest.userInfo.player1.userName}
            </Typography>
      
            {/* <Typography variant="subtitle2">
             Level
            </Typography> */}
          </div>

        </DuelSingleRight>
        <DuelSingleRight style={{
             justifyContent:"flex-start",
             textAlign:"start",
             flexDirection:"row-reverse"
         }}>
                     <div style={{
          padding: '2.5px',
          margin: '5.5px',
           
        }}>
          <Avatar src={contest.player1Detail.image_path}  variant="circle" />

        </div>

        <div style={{
            display: "flex",
            alignContent: "center",
            alignItems: "flex-end",
            flexDirection: "column",
            textAlign:"end"
          }}>
            <Typography variant="caption"  style={{color:"grey"}}>
            {contest.player1Detail.firstname[0]+". "+contest.player1Detail.lastname}

            </Typography>

            <Typography variant="caption"  style={{color:"grey"}}>
            {contest.player1Detail.teamInfo.code}               

            </Typography>
            <Typography variant="caption"  style={{color:"grey"}}>
            {contest.player1Detail.position.name} 

            </Typography>
          </div>
        
        </DuelSingleRight>
      </DuelsCustomDiv>
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
      <DuelsCustomDiv style={{padding: "7px"}} >
       


        <DuelSingleRight >
          <div style={{
            display: "flex",
            alignContent: "center",
            alignItems: "flex-start",
            flexDirection: "column",
            padding: "6.89px 0",
            color:"#77BC37",
          }}>
            <Typography variant="caption" style={{color:"grey"}}>
             Challenger
            </Typography>
      
            <Typography variant="caption" 
            // onClick={() => {selectedPlayer(true)}}
            >
             Select a player
            </Typography>
          </div>
          <div style={{
            display: "flex",
            alignContent: "center",
            alignItems: "flex-start",
            flexDirection: "column",
            justifyContent:"center"
          }}>
                        <span style={{ padding: "2.5px", fontSize: "12px", marginLeft: "auto" }}>

                  <Button size="small" 
                   onClick={() => {setCustomDuelDialog(true);setJoinCustom({contestId:contest._id,amount:contest.amount.toFixed(2)});joinDialog(false);setMinimize4(true)}} 
                  variant="contained" style={{
                    backgroundColor: '#77BC37',
                    color: 'white'
                  }}>₹{contest.amount}</Button>

                  </span>
                  <Typography variant="caption"
                  style={{
                    
                    color: '#77BC37'
                  }}>
                    Payout: 1.9x
                  </Typography>
          </div>
        </DuelSingleRight>
      </DuelsCustomDiv>
     
     </DuelsCustom2>
     </div>
  ))

  const viewFantasy = () => fantasy.map(cnt => (
    <Paper className={classes.paper} elevation={2} style={{ margin: "15px 0",borderRadius:5 }} key={cnt._id}>
      <div className={classes.gridCard}>
        <div className={classes.gridCardContent}>
          {/* <Link to = {{pathname:`/contest/details/${cnt._id}`,
                                }}  style={{ textDecoration: 'none' }}> */}
          <div className={classes.gridCardSubContent}>

            <span
              style={{ padding: "5px", fontSize: "12px", color: "#777777" }}>
              <Typography variant="caption">
                {cnt.contestName}

              </Typography>
            </span>
            <span className={classes.gridCardTeamText} onClick={() => { setBreakDown(cnt.prizeBreakUp); setOpenPrizePool(true) }}>
              <Typography variant="caption"
                style={{
                  fontWeight: "700",
                  padding: "5px 10px",
                  cursor: "pointer", borderRadius: 5, border: "1px solid #777777",
                  fontSize: "15px"
                }}>
                ₹{cnt.prizePool}

              </Typography>

            </span>
            <span style={{ padding: "2.5px", fontSize: "14px", color: "black" }}>
              <Typography variant="caption">
                {cnt.totalWinners} Winner

                          </Typography>
            </span>
          </div>
          {/* </Link> */}
          <div className={classes.gridCardSubContent}>
            <span style={{ padding: "2.5px", fontSize: "12px", marginLeft: "auto", color: "#777777" }}>
              Entry
            </span>
            <span style={{ padding: "2.5px", fontSize: "12px", marginLeft: "auto" }}>

              <Button size="small" onClick={() => joinFantasyContest(cnt._id, cnt.entryFee)} variant="contained" style={{
                backgroundColor: '#77BC37',
                color: 'white'
              }}>₹{cnt.entryFee}</Button>

            </span>
            <span style={{
              padding: "2.5px",
              border: "1.5px solid #F8A017",
              fontSize: "12px",
              marginTop: 7,
              fontWeight: 500,
              borderRadius: "5px",
               minWidth: 15,
              height: 15,
              textAlign: "center",
              marginLeft: "auto",
              color: "#F8A017"
            }}>
              {cnt.limit}
            </span>
          </div>
        </div>
      </div>
      <div className={classes.progress}>
        <ColorLinearProgress style={{ borderRadius: 0 }} variant="determinate" value={(cnt.totalJoined / cnt.totalSpots) * 100} />
      </div>
      <div className={classes.gridCard} style={{ backgroundColor: "white" }}>
        <div className={classes.gridCardContent}>
          <div className={classes.gridCardSubContent}>
            <span style={{ padding: "2.5px", fontSize: "12px", }}>
              <Typography variant="caption" style={{
                padding: "2.5px",
                fontSize: "12px", fontWeight: 500,
                color: "#ef8c22"
              }}>
                {cnt.totalSpots - cnt.totalJoined} spots left

                          </Typography>

            </span>
          </div>
          <div className={classes.gridCardSubContent}>
            <span style={{ padding: "2.5px", fontSize: "12px", marginLeft: "auto", color: "grey" }}>
              <Typography variant="caption" style={{
                padding: "2.5px",
                fontSize: "12px", fontWeight: 500,

              }}>
                {cnt.totalSpots} spots

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
      key={prz.range}
      style={{
        minWidth: 256,
        display: "flex",
        flexDirection: "row",
        padding:"5px 2.5px",
        justifyContent: "space-between"
      }}
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


  const viewmyTeam = () => teamList.map(team => (
    <ListItem style={{ padding: 0 }} key={team._id}>
      <Paper className={classes.paper} elevation={2} style={{ margin: "2.5px 0", padding: "0", width: "100%" }}>
        <TeamCard>
          <TeamCommon>
            <Typography variant="caption" style={{ fontWeight: 700 }}>
              #{team.serialNumber} {team.teamName}
            </Typography>

          </TeamCommon>
          <TeamCommon style={{ justifyContent: "flex-end" }}>
            <Typography variant="caption" style={{ fontWeight: 700 }}>
              Wk-{team.Wicketkeeper} Bat-{team.Batsman} AllR-{team.Allrounder} Bowl-{team.Bowler}
            </Typography>

          </TeamCommon>
          <TeamCommon>
            <TeamCommonPlayer>
              <Badge
                overlap="circle"
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                badgeContent="C"
                color="error"
                style={{ height: "50px", width: "50px",alignSelf:"center"  }}
              >
                <Avatar src={team.captain.image_path} style={{ height: "50px", width: "50px",alignSelf:"center" }} variant="circle" />
              </Badge>
               
              <Typography variant="caption">
                {team.captain.firstname[0]+". " + team.captain.lastname}
              </Typography>
              <Typography variant="caption">
              {team.captain.position.name}
              </Typography>
            </TeamCommonPlayer>
            <Divider />
            <TeamCommonPlayer>
              <Badge
                overlap="circle"
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                badgeContent="VC"
                color="error"
                style={{ height: "50px", width: "50px",alignSelf:"center"  }}
              >
                <Avatar src={team.viceCaptain.image_path} style={{ height: "50px", width: "50px"}} variant="circle" />
              </Badge>
             
              <Typography variant="caption">
              {team.viceCaptain.firstname[0]+". " +team.viceCaptain.lastname}
              </Typography>
               
              <Typography variant="caption">
              {team.viceCaptain.position.name}
              </Typography>
            </TeamCommonPlayer>
          </TeamCommon>
          <TeamCommon style={{ justifyContent: "flex-end" }}>
            <Link
              to={{
                pathname: `/team/edit/${props.match.params.matchId}/${team._id}`
              }}
              style={{ textDecoration: "none" }}
            >
              <EditIcon style={{ textDecoration: "none" }} />

              <Divider />
              <Typography variant="caption" style={{ textDecoration: "none" }}>
                Edit
                  </Typography>

            </Link>

          </TeamCommon>
        </TeamCard>
      </Paper>

    </ListItem>
  ))

  const viewJoinTeam = () => teamList.map(team => (
    <ListItem style={{ padding: 0 }} key={team._id}>
      <Paper className={classes.paper} elevation={2} style={{ margin: "2.5px 0", padding: "0", width: "100%" }}>
        <TeamCard>
          <TeamCommon>
            <Typography variant="caption" style={{ fontWeight: 700 }}>
              #{team.serialNumber} {team.teamName}
            </Typography>
          </TeamCommon>
          <TeamCommon style={{ justifyContent: "flex-end", height: 0 }}>

          </TeamCommon>
          <TeamCommon>
            <TeamCommonPlayer>
              <Badge
                overlap="circle"
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                badgeContent="C"
                color="error"
                style={{ height: "50px", width: "50px" }}
              >
                <Avatar src={team.captain.image_path} style={{ height: "50px", width: "50px" }} variant="circle" />
              </Badge>
              <br />
              <Typography variant="caption">
                {team.captain.firstname[0]+". " + team.captain.lastname}
              </Typography>
            </TeamCommonPlayer>
            <Divider />
            <TeamCommonPlayer>
              <Badge
                overlap="circle"
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                badgeContent="VC"
                color="error"
                style={{ height: "50px", width: "50px" }}
              >
                <Avatar src={team.viceCaptain.image_path} style={{ height: "50px", width: "50px" }} variant="circle" />
              </Badge>
              <br />
              <Typography variant="caption">
                {team.viceCaptain.firstname[0]+". " +team.viceCaptain.lastname}
              </Typography>
            </TeamCommonPlayer>
          </TeamCommon>
          <TeamCommon style={{ justifyContent: "flex-end", alignItems: "start", color: "white" }}>
            <Button color="secondary" variant="contained" style={{ color: "white" }} onClick={() => confirmJoinFantasyContest(team._id)}>Join</Button>
          </TeamCommon>
        </TeamCard>
      </Paper>

    </ListItem>
  ))




  const [activeStep, setActiveStep] = React.useState(0);


  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setMultiple(multipleArr[activeStep])
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    setMultiple(multipleArr[activeStep - 2])

  };

  const handleReset = () => {
    setActiveStep(0);
    setMultiple(multipleArr[0])
  };

  const handleNext2 = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setMultiple(multipleArr2[activeStep])
  };

  const handleBack2 = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    setMultiple(multipleArr2[activeStep - 2])

  };


  const makeCombo = (contestId, plId, playerId, playerInfo) => {
    let c = Math.random(0, 1);
    setCount([c.toString()]);
  

    if (activeStep === 10 && dynamicObj[contestId]["bool"] === false) {
      handleNotificationClick("Max player selected");
      return;
    } else {
      if (dynamicObj[contestId][contestId + "playerL"] === false && plId === contestId + "playerL" && dynamicObj[contestId][contestId + "playerR"] === false) {
        dynamicObj[contestId][plId] = !dynamicObj[contestId][plId];
        dynamicObj[contestId]["bool"] = !dynamicObj[contestId]["bool"];
        handleNext();

        combo = {
          ...selectedTeam,
          [contestId]: {
            matchId: props.match.params.matchId,
            contestId: contestId,
            selectedPlayer: playerId,
            playerDetails: playerInfo
          }
        }
      } else if (dynamicObj[contestId][contestId + "playerL"] === false && plId === contestId + "playerL" && dynamicObj[contestId][contestId + "playerR"] === true) {

        dynamicObj[contestId][plId] = !dynamicObj[contestId][plId];
        dynamicObj[contestId]["bool"] = true
        dynamicObj[contestId][contestId + "playerR"] = false;
        combo = {
          ...selectedTeam,
          [contestId]: {
            matchId: props.match.params.matchId,
            contestId: contestId,
            selectedPlayer: playerId,
            playerDetails: playerInfo
          }
        }
      } else if (dynamicObj[contestId][contestId + "playerR"] === false && plId === contestId + "playerR" && dynamicObj[contestId][contestId + "playerL"] === false) {
        dynamicObj[contestId][plId] = !dynamicObj[contestId][plId];
        dynamicObj[contestId]["bool"] = !dynamicObj[contestId]["bool"];
        handleNext();
        combo = {
          ...selectedTeam,
          [contestId]: {
            matchId: props.match.params.matchId,
            contestId: contestId,
            selectedPlayer: playerId,
            playerDetails: playerInfo
          }
        }
      } else if (dynamicObj[contestId][contestId + "playerR"] === false && plId === contestId + "playerR" && dynamicObj[contestId][contestId + "playerL"] === true) {
        dynamicObj[contestId][plId] = !dynamicObj[contestId][plId];
        dynamicObj[contestId]["bool"] = true
        dynamicObj[contestId][contestId + "playerL"] = false;
        combo = {
          ...selectedTeam,
          [contestId]: {
            matchId: props.match.params.matchId,
            contestId: contestId,
            selectedPlayer: playerId,
            playerDetails: playerInfo
          }
        }
      } else if (dynamicObj[contestId][contestId + "playerL"] === true && plId === contestId + "playerL" && dynamicObj[contestId][contestId + "playerR"] === false) {
        dynamicObj[contestId][plId] = !dynamicObj[contestId][plId];
        dynamicObj[contestId]["bool"] = !dynamicObj[contestId]["bool"];
        handleBack();
        delete combo[contestId]
      } else if (dynamicObj[contestId][contestId + "playerR"] === true && plId === contestId + "playerR" && dynamicObj[contestId][contestId + "playerL"] === false) {
        dynamicObj[contestId][plId] = !dynamicObj[contestId][plId];
        dynamicObj[contestId]["bool"] = !dynamicObj[contestId]["bool"];
        handleBack();
        delete combo[contestId]
      }
    }

    


    setTeams(combo);
  }

  const makeCombo2 = (contestId, plId, value, playerInfo, type) => {
    let c = Math.random(0, 1);
    setCount([c.toString()]);
 
    if (activeStep === 10 && dynamicObj2[contestId]["bool"] === false) {
      handleNotificationClick("Max player selected");
      return;
    } else {
 

      if (dynamicObj2[contestId][contestId + "playerL"] === false && plId === contestId + "playerL" && dynamicObj2[contestId][contestId + "playerR"] === false && dynamicObj2[contestId][contestId + "playerM"] === false) {
          dynamicObj2[contestId][plId] = !dynamicObj2[contestId][plId];
          dynamicObj2[contestId]["bool"] = !dynamicObj2[contestId]["bool"];
          handleNext2();
          combo = {
            ...selectedTeam,
            [contestId]: {
              matchId: props.match.params.matchId,
              contestId: contestId,
              selectedType: type,
              typeName: type === 1 ? `Under ${value.value1} ${value.typeName}` : type === 2 ? `Between ${value.value1} - ${value.value2} ${value.typeName}` : `Over ${value.value2} ${value.typeName}`,
              playerDetails: playerInfo
            }
          }
      }else if (dynamicObj2[contestId][contestId + "playerL"] === false && plId === contestId + "playerL" && dynamicObj2[contestId][contestId + "playerR"] === true && dynamicObj2[contestId][contestId + "playerM"] === false) {

        dynamicObj2[contestId][plId] = !dynamicObj2[contestId][plId];
        dynamicObj2[contestId]["bool"] = true
        dynamicObj2[contestId][contestId + "playerR"] = false;

        combo = {
          ...selectedTeam,
          [contestId]: {
            matchId: props.match.params.matchId,
            contestId: contestId,
            selectedType: type,
            typeName: type === 1 ? `Under ${value.value1} ${value.typeName}` : type === 2 ? `Between ${value.value1} - ${value.value2} ${value.typeName}` : `Over ${value.value2} ${value.typeName}`,
            playerDetails: playerInfo
          }
        }
      }else if (dynamicObj2[contestId][contestId + "playerL"] === false && plId === contestId + "playerL" && dynamicObj2[contestId][contestId + "playerR"] === false && dynamicObj2[contestId][contestId + "playerM"] === true) {

        dynamicObj2[contestId][plId] = !dynamicObj2[contestId][plId];
        dynamicObj2[contestId]["bool"] = true
        dynamicObj2[contestId][contestId + "playerM"] = false;

        combo = {
          ...selectedTeam,
          [contestId]: {
            matchId: props.match.params.matchId,
            contestId: contestId,
            selectedType: type,
            typeName: type === 1 ? `Under ${value.value1} ${value.typeName}` : type === 2 ? `Between ${value.value1} - ${value.value2} ${value.typeName}` : `Over ${value.value2} ${value.typeName}`,
            playerDetails: playerInfo
          }
        }
      }else if (dynamicObj2[contestId][contestId + "playerR"] === false && plId === contestId + "playerR" && dynamicObj2[contestId][contestId + "playerL"] === false && dynamicObj2[contestId][contestId + "playerM"] === false) {
        dynamicObj2[contestId][plId] = !dynamicObj2[contestId][plId];
        dynamicObj2[contestId]["bool"] = !dynamicObj2[contestId]["bool"];
        handleNext2();

        combo = {
          ...selectedTeam,
          [contestId]: {
            matchId: props.match.params.matchId,
            contestId: contestId,
            selectedType: type,
            typeName: type === 1 ? `Under ${value.value1} ${value.typeName}` : type === 2 ? `Between ${value.value1} - ${value.value2} ${value.typeName}` : `Over ${value.value2} ${value.typeName}`,
            playerDetails: playerInfo
          }
        }
      }else if (dynamicObj2[contestId][contestId + "playerR"] === false && plId === contestId + "playerR" && dynamicObj2[contestId][contestId + "playerL"] === true && dynamicObj2[contestId][contestId + "playerM"] === false) {
        dynamicObj2[contestId][plId] = !dynamicObj2[contestId][plId];
        dynamicObj2[contestId]["bool"] = true
        dynamicObj2[contestId][contestId + "playerL"] = false;

        combo = {
          ...selectedTeam,
          [contestId]: {
            matchId: props.match.params.matchId,
            contestId: contestId,
            selectedType: type,
            typeName: type === 1 ? `Under ${value.value1} ${value.typeName}` : type === 2 ? `Between ${value.value1} - ${value.value2} ${value.typeName}` : `Over ${value.value2} ${value.typeName}`,
            playerDetails: playerInfo
          }
        }
      } else if (dynamicObj2[contestId][contestId + "playerR"] === false && plId === contestId + "playerR" && dynamicObj2[contestId][contestId + "playerL"] === false && dynamicObj2[contestId][contestId + "playerM"] === true) {
        dynamicObj2[contestId][plId] = !dynamicObj2[contestId][plId];
        dynamicObj2[contestId]["bool"] = true
        dynamicObj2[contestId][contestId + "playerM"] = false;

        combo = {
          ...selectedTeam,
          [contestId]: {
            matchId: props.match.params.matchId,
            contestId: contestId,
            selectedType: type,
            typeName: type === 1 ? `Under ${value.value1} ${value.typeName}` : type === 2 ? `Between ${value.value1} - ${value.value2} ${value.typeName}` : `Over ${value.value2} ${value.typeName}`,
            playerDetails: playerInfo
          }
        }
      }else if (dynamicObj2[contestId][contestId + "playerM"] === false && plId === contestId + "playerM" && dynamicObj2[contestId][contestId + "playerL"] === false && dynamicObj2[contestId][contestId + "playerR"] === false) {
        dynamicObj2[contestId][plId] = !dynamicObj2[contestId][plId];
        dynamicObj2[contestId]["bool"] = !dynamicObj2[contestId]["bool"];
        handleNext2();

        combo = {
          ...selectedTeam,
          [contestId]: {
            matchId: props.match.params.matchId,
            contestId: contestId,
            selectedType: type,
            typeName: type === 1 ? `Under ${value.value1} ${value.typeName}` : type === 2 ? `Between ${value.value1} - ${value.value2} ${value.typeName}` : `Over ${value.value2} ${value.typeName}`,
            playerDetails: playerInfo
          }
        }
      } else if (dynamicObj2[contestId][contestId + "playerM"] === false && plId === contestId + "playerM" && dynamicObj2[contestId][contestId + "playerL"] === true && dynamicObj2[contestId][contestId + "playerR"] === false) {
        dynamicObj2[contestId][plId] = !dynamicObj2[contestId][plId];
        dynamicObj2[contestId]["bool"] = true
        dynamicObj2[contestId][contestId + "playerL"] = false;

        combo = {
          ...selectedTeam,
          [contestId]: {
            matchId: props.match.params.matchId,
            contestId: contestId,
            selectedType: type,
            typeName: type === 1 ? `Under ${value.value1} ${value.typeName}` : type === 2 ? `Between ${value.value1} - ${value.value2} ${value.typeName}` : `Over ${value.value2} ${value.typeName}`,
            playerDetails: playerInfo
          }
        }
      } else if (dynamicObj2[contestId][contestId + "playerM"] === false && plId === contestId + "playerM" && dynamicObj2[contestId][contestId + "playerR"] === true && dynamicObj2[contestId][contestId + "playerL"] === false) {
        dynamicObj2[contestId][plId] = !dynamicObj2[contestId][plId];
        dynamicObj2[contestId]["bool"] = true
        dynamicObj2[contestId][contestId + "playerR"] = false;

        combo = {
          ...selectedTeam,
          [contestId]: {
            matchId: props.match.params.matchId,
            contestId: contestId,
            selectedType: type,
            typeName: type === 1 ? `Under ${value.value1} ${value.typeName}` : type === 2 ? `Between ${value.value1} - ${value.value2} ${value.typeName}` : `Over ${value.value2} ${value.typeName}`,
            playerDetails: playerInfo
          }
        }
      } else if (dynamicObj2[contestId][contestId + "playerL"] === true && plId === contestId + "playerL" && dynamicObj2[contestId][contestId + "playerR"] === false && dynamicObj2[contestId][contestId + "playerM"] === false) {
        dynamicObj2[contestId][plId] = !dynamicObj2[contestId][plId];
        dynamicObj2[contestId]["bool"] = !dynamicObj2[contestId]["bool"];
        handleBack2()

        delete combo[contestId]
      } else if (dynamicObj2[contestId][contestId + "playerR"] === true && plId === contestId + "playerR" && dynamicObj2[contestId][contestId + "playerL"] === false && dynamicObj2[contestId][contestId + "playerM"] === false) {
        dynamicObj2[contestId][plId] = !dynamicObj2[contestId][plId];
        dynamicObj2[contestId]["bool"] = !dynamicObj2[contestId]["bool"];
        handleBack2();

        delete combo[contestId]
      } else if (dynamicObj2[contestId][contestId + "playerM"] === true && plId === contestId + "playerM" && dynamicObj2[contestId][contestId + "playerL"] === false && dynamicObj2[contestId][contestId + "playerR"] === false) {
        dynamicObj2[contestId][plId] = !dynamicObj2[contestId][plId];
        dynamicObj2[contestId]["bool"] = !dynamicObj2[contestId]["bool"];
        handleBack2();
        delete combo[contestId]
      }


      // else if (dynamicObj2[contestId][contestId + "playerL"] === true && plId === contestId + "playerM" && dynamicObj2[contestId][contestId + "playerR"] === false && dynamicObj2[contestId][contestId + "playerM"] === false) {

      //   dynamicObj2[contestId][contestId + "playerL"] = false;
      //   dynamicObj2[contestId]["bool"] = true
      //   dynamicObj2[contestId][contestId + "playerM"] = true;
      // }



    }

 
    


    setTeams(combo);
  }


  const joinMatchUps = (amount) => {
    
    if (localStorage.getItem('isLogged') === null || localStorage.getItem('isLogged') === 'false') {
      setOpenLogin(true)
      return
    }

    if (activeStep < 3) {
      handleNotificationClick("Select a minimum of 3 duels.");
      return;
    }

    if (amount === 0) {
      handleNotificationClick("Minimum amount is 1₹.");
      return;
    }

    let data = {
      matchId: props.match.params.matchId,
      amount: amount,
      selectedTeam: selectedTeam
    }
    setWait(true)

    api.joinMatchupContest(data).then(response => {
      setWait(false)

      if (response.status === 200) {
        handleNotificationClick("Success");
        handleReset();
        profile();
        setEnterContest(false);
        setBet(0);

        dynamicObj = {}
        matchUps.forEach(contest => {
          dynamicObj = {
            ...dynamicObj,
            [contest._id]: {
              bool: false,
              [contest._id + "playerL"]: false,
              [contest._id + "playerR"]: false,
            }
          }
        })
        return
      }

      handleNotificationClick(response.data.message);


    }).catch(() => {})
  }

  const joinUnderOver = (amount) => {
    if (localStorage.getItem('isLogged') === null || localStorage.getItem('isLogged') === 'false') {
      setOpenLogin(true)
      return
    }

    if (amount === 0) {
      handleNotificationClick("Minimum amount is 1₹.");
      return;
    }

    if (activeStep < 2) {
      handleNotificationClick("Select a minimum of 2 duels.");
      return;
    }

    let data = {
      matchId: props.match.params.matchId,
      amount: amount,
      selectedTeam: selectedTeam
    }
      setWait(true)

    api.joinUnderOverContest(data).then(response => {

      handleNotificationClick(response.data.message);
      
      setWait(false)

      if (response.status === 200) {
        handleReset();
        profile();
        setBet(0);
        setEnterContest2(false);
        dynamicObj2 = {}
        profile();
        moreLessArr.forEach(contest => {
          dynamicObj2 = {
            ...dynamicObj2,
            [contest._id]: {
              bool: false,
              [contest._id + "playerL"]: false,
              [contest._id + "playerM"]: false,
              [contest._id + "playerR"]: false,
            }
          }
        })
        return handleNotificationClick(response.data.message);
      }

    }).catch(() => {})
  }

  const profile = () => {
    user.profile().then(response => {
      setWallet(response.data.data.wallet.balance)
      setBonus(response.data.data.wallet.bonus)

    }).catch(() => {

    })
  }

  const handleDirectionChange = (dir) => {
    let fanD = [];
    setDirectionValue(dir);
    

    if (dir === 1) {
      setDirection('asc');
      fanD = _.orderBy(fantasy, [sortType], ['asc']);
      setfantasy(fanD)
    } else {
      setDirection('desc')
      fanD = _.orderBy(fantasy, [sortType], ['desc']);
      setfantasy(fanD)
    }
  }

  const handleSortType = (type, name) => {
    setSortTypeValue(type);
    
    let fanD = [];
    switch (type) {
      case 1:
        fanD = _.orderBy(fantasy, ['prizePool'], [direction]);
        setSortType('prizePool');

        setfantasy(fanD)
        break;

      case 2:
        fanD = _.orderBy(fantasy, ['entryFee'], [direction]);
        setSortType('entryFee');

        setfantasy(fanD)
        break;

      case 3:
        fanD = _.orderBy(fantasy, ['totalWinners'], [direction]);
        setSortType('totalWinners');

        setfantasy(fanD)
        break;

      case 4:
        fanD = _.orderBy(fantasy, ['totalSpots'], [direction]);
        setSortType('totalSpots');

        setfantasy(fanD)
        break;
      case 5:
        switch (name) {
          case 1:
            fanD = _.filter(fantasyOrginal, ['contestName', "Mega Contest"]);
            break;

          case 2:
            fanD = _.filter(fantasyOrginal, ['contestName', "Head to head"]);
            break;
          case 3:
            fanD = _.filter(fantasyOrginal, ['contestName', "2X Pay"]);
            break;
          case 4:
            fanD = _.filter(fantasyOrginal, ['contestName', "3 way"]);
            break;
        case 5:
            fanD = _.filter(fantasyOrginal, ['contestName', "4 way"]);
            break;
          default:
            fanD = _.orderBy(fantasyOrginal, ['prizePool'], [direction]);
            break;
        }

        setFilter(name)
        setfantasy(fanD)
        break;

      default:
        break;
    }
  }
  /**
   * @VIEWMATCH
   */
  return (
    match !== null ? (
      <Container style={{ position: "relative", marginTop: 5, padding: 5 }} maxWidth='md'>
        <Notification message={message} open={openNotification} close={handleNotificationClose} />

        <Paper elevation={3}>
          <ContestMainHeader>
            <div>
              <Typography variant="caption" style={{
                fontSize: "0.75em",
                fontWeight: 600
              }}>
                {match.league.name}
              </Typography>

              <div
                style={{
                  display: "flex",
                  flexDirection: 'row',
                  width: "100%",
                  marginTop: 10,
                  justifyContent: "space-between"
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: 'row',
                    alignContent: "center",
                    alignItems: "center",
                    justifyContent: "space-between"
                  }}
                >

                  <Avatar src={match.localteam.image_path} variant="circle"></Avatar>
                  <Typography variant="caption" style={{
                    fontWeight: 600,
                    margin: 10
                  }}>
                    {match.localteam.code}
                  </Typography>


                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: 'row',
                    alignContent: "center",
                    alignItems: "center",
                    justifyContent: "space-between"
                  }}
                >
                  <Typography variant="caption" style={{
                    fontWeight: 600,
                    margin: 10
                  }}>
                    <Countdown date={match.starting_at ? match.starting_at : match.starting_at} />
                  </Typography>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: 'row',
                    alignContent: "center",
                    alignItems: "center",
                    justifyContent: "space-between"
                  }}>

                  <Typography variant="caption" style={{
                    fontWeight: 600,
                    margin: 10
                  }}>
                    {match.visitorteam.code}
                  </Typography>
                  <Avatar src={match.visitorteam.image_path} variant="circle"></Avatar>

                </div>
              </div>
              <br />
              <Typography variant="caption">
                {/* <Countdown  date={matchInfo.startDate ? matchInfo.startDate.iso : matchInfo.start_date.iso} /> */}
              </Typography>
            </div>


            <div>
            <Link to = {{pathname:`/faq`,
                                }}  style={{ textDecoration: 'none' }}>
              <Button variant="outlined" style={{ borderRadius: '20px', }}>
                <Typography variant="caption" >
                  Rules & scoring
                  </Typography>
              </Button>
                                </Link>
            </div>

          </ContestMainHeader>
        </Paper>
        <Paper style={{
          borderRadius:"5px",
          marginTop:10
        }}>
          <Tabs
            value={value}
            indicatorColor="secondary"
            textColor="primary"
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="on"
          >
 
            <Tab label="Under/Over" />
            <Tab label="Combo Duels" />
            <Tab label="Fantasy 11" />
            <Tab label="Custom Duels" />

          </Tabs>

        </Paper>

        {/* <Paper elevation={0} style={value === 0 ? { display: 'block', marginTop: '25px' } : { display: 'none' }}>
          <div>
            {vsContest.length > 0 ? viewVs() : <div />}
          </div>
        </Paper> */}

        <div style={value === 0 ? { display: 'block', marginTop: '10px' } : { display: 'none' }}  >
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
                Under/Over
             </Typography>

            </div>
            <div elevation={0} style={{
              fontStyle: "italic",
              textAlign: 'end',

            }}>
              <Typography variant="caption">
                Select a minimum of 2 outcomes
                  </Typography>
            </div>


          </Paper>
          <Paper elevation={0} style={{ backgroundColor:"#F9F8FC"}} >


            {view()}
          </Paper>
        </div>






        <div style={value === 1 ? { display: 'block', position: "relative", marginTop: '10px' } : { display: 'none' }}>

          <Paper elevation={0} style={{  backgroundColor:"#F9F8FC", }}>
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
              <div elevation={0} style={{
                fontStyle: "italic",
                textAlign: 'end',

              }}>
                <Typography variant="caption">
                  Select a minimum of 3 duels
                  </Typography>
              </div>


            </Paper>

            <Paper elevation={0} style={{ backgroundColor:"#F9F8FC",marginTop: '10px'}}>
              {matchUps.length > 0 ? viewCombo() : <div />}
            </Paper>
          </Paper>

        </div>

        <div style={value === 2 ? { display: 'block',   position: "relative", marginTop: '10px' } : { display: 'none' }}>
          <Paper elevation={0} style={{  backgroundColor:"#F9F8FC", }}>
            <Paper elevation={0} style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              padding: "10px",
              position:"sticky",
            }}>
              <div elevation={0} style={{
                textAlign: 'start',

              }}>
                <Typography variant="caption" style={{ marginRight: 5 }}>
                  Sort By
              </Typography>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={sortTypeValue}
                  onChange={(event) => handleSortType(event.target.value)}
                >
                  <MenuItem value={1}>Prize Pool</MenuItem>
                  <MenuItem value={2}>Entry</MenuItem>
                  {/* <MenuItem value={3}>Winners</MenuItem> */}
                  <MenuItem value={4}>Spots</MenuItem>
                </Select>
              </div>
              <div elevation={0} style={{
                textAlign: 'start',

              }}>
                <Typography variant="caption" style={{ marginRight: 5 }}>
                  Filter
              </Typography>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={filter}
                  onChange={(event) => handleSortType(5, event.target.value)}
                >
                  <MenuItem value={0}>All Contest</MenuItem>
                  <MenuItem value={1}>Mega Contest</MenuItem>
                  <MenuItem value={2}>Head to head</MenuItem>
                  <MenuItem value={3}>2X Pay</MenuItem>
                  <MenuItem value={4}>3 way</MenuItem>
                  <MenuItem value={5}>4 way</MenuItem>
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
                  value={directionValue}
                  onChange={(event) => handleDirectionChange(event.target.value)}
                >
                  <MenuItem value={1}>Asc</MenuItem>
                  <MenuItem value={-1}>Dsc</MenuItem>
                </Select>
              </div>



            </Paper>

            <Paper elevation={0} style={{
              marginBottom: 60,
              backgroundColor:"#F9F8FC"
            }} >
              {fantasy.length > 0 ? viewFantasy() : <div ></div>}
            </Paper>
          </Paper>

        </div>

        <div style={value === 3 ? { display: 'block',   position: "relative", marginTop: '10px' } : { display: 'none' }}>
          <Paper elevation={0} style={{  backgroundColor:"#F9F8FC", }}>
            <Paper elevation={0} style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              padding: "10px",
              position:"sticky",
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
                  <MenuItem value={5}>Under/Over</MenuItem>
                  <MenuItem value={6}>Duel</MenuItem>

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
                  <MenuItem value={1}>Asc</MenuItem>
                  <MenuItem value={-1}>Dsc</MenuItem>
                </Select>
              </div>



            </Paper>
            <Paper elevation={0} style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              padding: "10px",
              position:"sticky",
            }}>
                <div elevation={0} style={{
                textAlign: 'start',

              }}>
 
                   <Input type="text" placeholder="₹Min" style={{ width: '50px',marginRight:5 }} onChange={(e) => setMinRange((e.target.value))} />

               
                  <Input type="text" placeholder="₹Max" style={{ width: '50px',marginRight:5 }} onChange={(e) => setMaxRange((e.target.value))} />

                  <Button variant={"outlined"} size="small" onClick={getFilteredCustom} >
                    Filter
                  </Button>
                  </div>
              
              <div elevation={0} style={{
                textAlign: 'end',

              }}>
                <Button variant={"outlined"} size="small" onClick={() => handleCustomDialog(true)} >
                    Create
                  </Button>
              </div>



            </Paper>

            <Paper elevation={0} style={{
              marginBottom: 60,
              backgroundColor:"#F9F8FC"
            }} >
               {custom !== null ? 
               custom.length > 0 ? 
               filterCustom === 5 ? viewCustom() : viewCustomDuel() : 
               <div style={{
                 textAlign:"center",
                 marginTop:30
               }}>
                 <Typography variant="caption" >Create a Duel.</Typography> 
               </div>
               :
               <CircularProgress style={{
          position: "fixed",
          top: "50%",
          left: "50%"
      }} disableShrink />}
            </Paper>
          </Paper>

        </div>

 
 

        {enterContest && multiple >= 2 ? (<Betslip style={
          enterContest ? minimize ? { transform: "translateY(0px)",display: "block", } : { transform: "translateY(79%)",display: "block", }  : { display: "none", }
        }
        >
          <BetHeader onClick={() => setMinimize(!minimize)}>
            Payslip
        </BetHeader>
          <BetInfo>
            <div style={{
              display: "flex",
              flexDirection: "row",
              margin: "10px 0",
              justifyContent: "space-between"
            }}>

              <div style={{
                backgroundColor: "white",
                boxShadow: multiple >= 2 ? "0 0 0.52em 0 white" : "",

                width: '100%',
                color: 'black',
                padding: "5px 5px",
                cursor: "pointer",
                textAlign: "center"
              }}
              >
                <Input type="text" placeholder="Amount" style={{ width: '100%' }} onChange={(e) => setBetAmount((e.target.value))} />
              </div>

              {/* <IconButton style={{
                  padding: 2.5,
                  color:'white',
                }}
                  onClick={() => setBetAmount(1, 'minus')}>
                  <RemoveIcon />

                </IconButton > */}


            </div>

            <div style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              margin: "10px 0",

            }}>

              <div>
                <Typography variant="caption">
                  Multiplier
               </Typography>
              </div>
              <div>
                <Typography variant="caption" style={{ fontSize: '12px' }}>
                  {multiple}X
               </Typography>


              </div>
            </div>
            <div style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between"
            }}>
              <Typography variant="caption">
                Potential winnings

               </Typography>
              <div>
                <Typography variant="caption" style={{ color: "#77BC37", fontWeight: 700 }}>
                  {isNaN(betAmount * multiple) ? 0 : (betAmount * multiple).toFixed(2)}₹
               </Typography>

              </div>
            </div>

          </BetInfo>
          <BetFooter onClick={() => { joinMatchUps(betAmount); setMinimize(!minimize) }}>
            Confirm {betAmount}₹
        </BetFooter>
        </Betslip>
        ) : <div></div>}

        {enterContest2 && multiple >= 2 ? (<Betslip style={
                    enterContest2 ? minimize2 ? { transform: "translateY(0px)",display: "block", } : { transform: "translateY(79%)",display: "block", }  : { display: "none", }
        }
        >
          <BetHeader onClick={() => setMinimize2(!minimize2)}>
            Payslip
        </BetHeader>
          <BetInfo>
            <div style={{
              display: "flex",
              flexDirection: "row",
              margin: "10px 0",
              justifyContent: "space-between"
            }}>
              {/*              
             <IconButton style={{
                  padding: 2.5,
                  color:'white',
                }}
                  onClick={() => setBetAmount(baseAmount, 'add')}>
                  <AddRoundedIcon />

                </IconButton > */}
              <div style={{
                backgroundColor: "white",
                boxShadow: multiple >= 3 ? "0 0 0.52em 0 white" : "",

                width: '100%',
                color: 'black',
                padding: "5px 5px",
                cursor: "pointer",
                textAlign: "center"
              }}

              >
                {/* <Typography
                    variant="button"
                    style={{
                      padding: "5px 25px",
                     }}
                  >
                    {betAmount}₹
              </Typography> */}
                <Input type="text" placeholder="Amount" style={{ width: '100%' }} onChange={(e) => setBetAmount((e.target.value))} />
              </div>

              {/* <IconButton style={{
                  padding: 2.5,
                  color:'white',
                }}
                  onClick={() => setBetAmount(1, 'minus')}>
                  <RemoveIcon />

                </IconButton > */}


            </div>

            <div style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              margin: "10px 0",

            }}>

              <div>
                <Typography variant="caption">
                  Multiplier
               </Typography>
              </div>
              <div>
                <Typography variant="caption" style={{ fontSize: '12px' }}>
                  {multiple}X
               </Typography>


              </div>
            </div>
            <div style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between"
            }}>
              <Typography variant="caption">
                Potential winnings

               </Typography>
              <div>
                <Typography variant="caption" style={{ color: "#77BC37", fontWeight: 700 }}>
                  {isNaN(betAmount * multiple) ? 0 : (betAmount * multiple).toFixed(2)}₹
               </Typography>

              </div>
            </div>
          </BetInfo>
          <BetFooter onClick={() => { joinUnderOver(betAmount); setMinimize2(!minimize2) }}>
            Confirm {betAmount}₹
        </BetFooter>
        </Betslip>
        ) : <div></div>}

      {openJoinCustom ? (<Betslip style={
          openJoinCustom ? minimize3 ? { transform: "translateY(0px)",display: "block", } : { transform: "translateY(79%)",display: "block", }  : { display: "none", }
        }
        >
          <BetHeader onClick={() => setMinimize3(!minimize3)}>
            Payslip
        </BetHeader>
          <BetInfo>
             

            <div style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              margin: "0 0 10px 0",

            }}>

              <div>
                <Typography variant="caption">
                  Multiplier
               </Typography>
              </div>
              <div>
                <Typography variant="caption" style={{ fontSize: '12px' }}>
                  1.9x
               </Typography>


              </div>
            </div>
            <div style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between"
            }}>
              <Typography variant="caption">
                Potential winnings

               </Typography>
              <div>
                <Typography variant="caption" style={{ color: "#77BC37", fontWeight: 700 }}>
                  {isNaN(customDialogDetail.amount) ? 0 : (customDialogDetail.amount * 1.9).toFixed(2)}₹
               </Typography>

              </div>
            </div>

          </BetInfo>
          <BetFooter onClick={() => { joinCustom(customDialogDetail.contestId); setMinimize(!minimize3) }}>
            Confirm {customDialogDetail.amount}₹
        </BetFooter>
        </Betslip>
        ) : <div></div>}

{openJoinDuelCustom ? (<Betslip style={
          openJoinDuelCustom ? minimize4 ? { transform: "translateY(0px)",display: "block", } : { transform: "translateY(79%)",display: "block", }  : { display: "none", }
        }
        >
          <BetHeader onClick={() => setMinimize4(!minimize4)}>
            Payslip
        </BetHeader>
          <BetInfo>
          <InputLabel style={{margin:5,color:"#FFFFFF"}}>
            <Typography variant="caption">
            Select Player
            </Typography>
            
          </InputLabel>
          <Select
          classes={{select: classes.select}}
                style={{display:"inline-flex",
                marginBottom:5,
                width:"100%",
              backgroundColor:"white"}}
                select
                label="Select Player"
                value={selectedPlayer}
                onChange={handleSelectPlayer}
                // helperText="Please select a Player"
              >
                {playerList !== null ? playerList.map(player =>  
                <MenuItem key={player.id} value={player.id} style={{
                  zIndex:99999999
                }}>
                  <div style={{
                    display:'flex',
                    flexDirection:'row',
 
                    width:"100%",
                    alignContent:"center",
                    alignItems:"center"
                  }}>
                    <Avatar src={player.image_path} />
                    <div style={{
                    display:'flex',
                    flexDirection:'column',
                    marginLeft:10,
 
                    alignContent:"center",
                    alignItems:"start"
                  }}>

                    
                    <Typography variant="caption" >
                     {player.fullname}
                     </Typography>
                     <Typography variant="caption" >
                      {player.position.name}
                      </Typography>
                </div>
         
                              
                  </div>
                  <Divider/>
                  </MenuItem>) : <div />}
                 
                   
                
              </Select>
              


            <div style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              margin: "0 0 10px 0",

            }}>
              
              <div>
                <Typography variant="caption">
                  Multiplier
               </Typography>
              </div>
              <div>
                <Typography variant="caption" style={{ fontSize: '12px' }}>
                  1.9x
               </Typography>


              </div>
            </div>
            <div style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between"
            }}>
              <Typography variant="caption">
                Potential winnings

               </Typography>
              <div>
                <Typography variant="caption" style={{ color: "#77BC37", fontWeight: 700 }}>
                  {isNaN(customDialogDetail.amount) ? 0 : (customDialogDetail.amount * 1.9).toFixed(2)}₹
               </Typography>

              </div>
            </div>

          </BetInfo>
          <BetFooter onClick={() => { joinDuelCustom(customDialogDetail.contestId); setMinimize(!minimize3) }}>
            Confirm {customDialogDetail.amount}₹
        </BetFooter>
        </Betslip>
        ) : <div></div>}

        {value === 2 ?
          <AppBar position="fixed" className={classes.appBar}>
            <Toolbar style={{
              display: "flex",
              justifyContent: "center"
            }}>
              <div style={{
                width: 850,
                color: 'white',
                display: "flex",
                justifyContent: "space-between"
              }}>

                <Link to={{ pathname: `/team/${props.match.params.matchId}` }} style={{ textDecoration: 'none' }}>

                  <Button
                    variant="outlined"
                    color="secondary"
                    style={{
                      width: 150,
                      color: 'white',
                      margin: '5px'
                    }}
                  >

                    Create Team
            </Button>

                </Link>

                <Button
                  variant="outlined"
                  color="secondary"
                  style={{
                    width: 150,
                    color: 'white',
                    margin: '5px'
                  }}

                  onClick={handleTeamOpen}
                >
                  My Teams
            </Button>
              </div>
            </Toolbar>
          </AppBar> : <div />}

        <Dialog fullScreen={fullScreen} open={openTeam} onClose={handleTeamClose} TransitionComponent={Transition}>
          <AppBar position={"relative"} color="secondary" className={classes.appBar}>
            <Toolbar>
              <IconButton edge="start" style={{ color: "white" }} onClick={handleTeamClose} aria-label="close">
                <CloseIcon />
              </IconButton>
              <Typography variant="h6" style={{ color: "white" }} className={classes.title}>
                My Teams
            </Typography>
            </Toolbar>
          </AppBar>
          <Container maxWidth="md" style={{ padding: 10 }}>
          {match && new Date(match.starting_at).getTime() > Date.now() ? <Paper elevation={0} style={{
              marginBottom: 60
            }} >
              <List>
                {teamList.length > 0 ? viewmyTeam() :
                  <Link to={{ pathname: `/team/${props.match.params.matchId}` }} style={{ textDecoration: 'none' }}>

                    <Button
                      variant="contained"
                      color="secondary"
                      style={{
                        width: 150,
                        color: 'white',
                        margin: '5px'
                      }}
                    >

                      Create Team
              </Button>

                  </Link>
                }

              </List>
            </Paper>: <Typography variant="caption">
                Match has already started
              </Typography>}
          </Container>


        </Dialog>

        <Dialog fullScreen={fullScreen} open={openSelectTeam} onClose={handleTeamClose} TransitionComponent={Transition}>
          <AppBar color="secondary" position={"relative"} className={classes.appBar}>
            <Toolbar>
              <IconButton edge="start" style={{ color: "white" }} onClick={handleTeamClose} aria-label="close">
                <CloseIcon />
              </IconButton>
              <Typography variant="h6" style={{ color: "white" }} className={classes.title}>
                My Teams
            </Typography>
            </Toolbar>
          </AppBar>
          <Container maxWidth="md" style={{ padding: 10 }}>
            {match && new Date(match.starting_at).getTime() > Date.now() ? <Paper elevation={0} style={{
              marginBottom: 60
            }} >
              <List style={fullScreen ? { minWidth: 0 } : teamList.length > 0 ? { minWidth: 469 } : { minWidth: 0 }}>
                {teamList.length > 0 ? viewJoinTeam() :
                  <Link to={{ pathname: `/team/${props.match.params.matchId}` }} style={{ textDecoration: 'none' }}>

                    <Button
                      variant="contained"
                      color="secondary"
                      style={{
                        width: 150,
                        color: 'white',
                        margin: '5px'
                      }}
                    >

                      Create Team
              </Button>

                  </Link>
                }
              </List>
            </Paper> : <Typography variant="caption">
                Match has already started
              </Typography>}
          </Container>


        </Dialog>

        <Dialog fullScreen={fullScreen} open={openPrizePool} onClose={PrizePoolClose} TransitionComponent={Transition}>
          <AppBar color="secondary" position={"relative"} className={classes.appBar}>
            <Toolbar>
              <IconButton edge="start" style={{ color: "white",padding:"12px 6px" }} onClick={PrizePoolClose} aria-label="close">
                <CloseIcon />
              </IconButton>
              <Typography variant="h6" style={{ color: "white" }}  >
                Prize Breakdown
            </Typography>
            </Toolbar>
          </AppBar>
          <Container maxWidth="md" style={{ padding: 10 }}>
            <Paper elevation={0} style={{
               
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
  
        <Dialog fullScreen={fullScreen} open={openCustom} onClose={handleTeamClose} TransitionComponent={Transition}>
          <AppBar color="secondary" position={"relative"} className={classes.appBar}>
            <Toolbar>
              <IconButton edge="start" style={{ color: "white",padding:"12px 6px" }} onClick={handleTeamClose} aria-label="close">
                <CloseIcon />
              </IconButton>
              <Typography variant="h6" style={{ color: "white" }}  >
                New Duel
            </Typography>
            </Toolbar>
          </AppBar>
          <Container maxWidth="md" style={{ padding: 10 }}>
            <Paper elevation={0} style={{
              display:"flex",
              flexDirection:"column",
              minWidth:280
            }} >
              <TextField
                               style={{display:"inline-flex",marginBottom:5}}

                select
                label="Contest Type"
                value={contestType}
                onChange={handleContestType}
                // helperText="Please select a Contest Type"
              >
                
                  <MenuItem key={1} value={1}>
                    Under/Over
                  </MenuItem>
                  <MenuItem key={2} value={2}>
                    Player Duel
                  </MenuItem>
               
              </TextField>
              <InputLabel style={{margin:0,color:"#A3A3A3"}}>
            <Typography variant="caption">
            Select Player
            </Typography>
            
          </InputLabel>
              <Select
              classes={{select: classes.select}}
                style={{display:"inline-flex",marginBottom:5}}
                select
                label="Select Player"
                value={playerIdCustom}
                onChange={handlePlayerId}
                // helperText="Please select a Player"
              >
                {playerList !== null ? playerList.map(player =>  
                <MenuItem key={player.id} value={player.id} style={{
 
                }}>
                  <div style={{
                    display:'flex',
                    flexDirection:'row',
 
                    width:"100%",
                    alignContent:"center",
                    alignItems:"center"
                  }}>
                    <Avatar src={player.image_path} />
                    <div style={{
                    display:'flex',
                    flexDirection:'column',
                    marginLeft:10,
 
                    alignContent:"center",
                    alignItems:"start"
                  }}>

                    
                    <Typography variant="caption" >
                     {player.fullname}
                     </Typography>
                     <Typography variant="caption" >
                      {player.position.name}
                      </Typography>
                </div>
         
                              
                  </div>
                  <Divider/>
                  </MenuItem>) : <div />}
                 
                   
                
              </Select>
              
              <TextField
                style={contestType === 1 ? {display:"inline-flex"} : {display:"none"}}
                select
                label="Select Type"
                value={subType}
                onChange={handleUnderOver}
                // helperText="Please select type"
              >
                
                  <MenuItem key={"1"} value={1}>
                    Under
                  </MenuItem>
                  <MenuItem key={"2"} value={2}>
                  Over
                  </MenuItem>
                
              </TextField>
              
              <TextField
               style={contestType === 1 ? {display:"inline-flex"} : {display:"none"}}
                id="standard-textarea"
                label="Fantasy Points"
                placeholder="Fantasy Points"
                multiline
                value={fantasyPoints}
                onChange={handleFantasyPoints}
              />

              
              
              <TextField
                id="standard-textarea"
                label="Amount"
                placeholder="Amount"
                multiline
                value={customAmount}
                onChange={handleCustomAmount}
              />

              <div>
                <Button variant="contained" color="secondary" style={{color:"white",marginTop:"5px"}} onClick={() => {createDuel();}} size="small">Submit</Button>
              </div>
              <Typography  variant="caption"  style={contestType === 2 ? {display:"inline-flex",marginTop:2.5} : {display:"none"}}>
                  *Challenger has a handicap incase of a draw
              </Typography>
            </Paper>
          </Container>


        </Dialog>
  
        

      {  wait ? <CircularProgress style={{
          position: "fixed",
          top: "50%",
          left: "50%"
      }} disableShrink /> : <div/>}
      </Container>) :
      <CircularProgress style={{
        position: "fixed",
        top: "50%",
        left: "50%"
      }} disableShrink />
  )
}