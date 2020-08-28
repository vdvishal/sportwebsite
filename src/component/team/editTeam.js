/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import ReactGA from 'react-ga';

 import * as api from '../../api/team';
import styled from 'styled-components'
import {  useHistory } from "react-router-dom";
import * as color from '../../json/color.json';

import AppBar from '@material-ui/core/AppBar';
import Notification from '../common/notification'

import Button from '@material-ui/core/Button';
import { Toolbar, Container, Avatar, Typography } from '@material-ui/core';

 import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
 
 
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import { green } from '@material-ui/core/colors';
import Icon from '@material-ui/core/Icon';


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

const Duels = styled.div`
  display: grid;
  grid-template-columns: 100%;
 
  grid-gap: 1px;
  -webkit-align-items: end;
  -ms-flex-align: end;
  align-items: end;
  grid-template-rows: auto 1fr;
 
  @media ${device.mobileL} {
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items: center;
    margin:0px 0 16px 0;
     
  }
`



const DuelOptionRight = styled.div`
  display:grid;
  grid-template-columns: 1fr 1fr 1fr;
  align-content: center;
  flex-direction: column;
  @media ${device.mobileL} {
    align-items: flex-start;
  }
  @media (max-width:545px) {
    align-items: flex-start;
    grid-template-columns: 43px 43px 43px;

  }
`

const DuelSingleRightTop = styled.div`
  display:grid;
  grid-template-columns: 0.2fr 2fr 1fr;
  margin:2px;
  border:1px solid #cbd4df;
  background-color: #FFFFFF;
  padding:5px;
  border-radius:4px;
  transition: transform .2s;
  cursor:pointer;
  
  @media ${device.mobileL} {
     margin:0px 0 -13px 0;
         width:100%

    }
 
`;

const TeamView = styled.div`
  display:grid;
  grid-template-columns: 0.2fr 2fr 1fr;
  margin:2px;
  border:1px solid #cbd4df;
  background-color: #FFFFFF;
  padding:5px;
  border-radius:4px;
  transition: transform .2s;
  cursor:pointer;
  width:100%;
  @media ${device.mobileL} {
    width:100%;
     
   }
 
`;

const SingleHeadingTop = styled.div`
  display:grid;
  grid-template-columns: 0.2fr 2fr 1fr;
  margin:2px;
  border:1px solid #cbd4df;
  background-color: #FFFFFF;
  padding:0px 5px;
  border-radius:0;
  transition: transform .2s;
  cursor:pointer;
  @media ${device.mobileL} {
     border-radius:0;
    margin:-9px 0;
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


const HeaderTop = styled.div`
  display:grid;
  grid-template-columns: 0.25fr 1fr 0.5fr 1fr 0.25fr;
  margin:2px;
  height:4.5rem;

  background-color: #FFFFFF;
  padding:5px;
  border-radius:4px;
  transition: transform .2s;
  cursor:pointer;
  @media (max-width: 380px) {
    grid-template-columns:1fr 0.5fr 1fr;
 
  }
`;

const CreditView = styled.div`
  display: flex;
   flex-direction: column;
  place-content: center;
  align-items: center;
  @media (max-width: 380px) {
    display: none
  }
`;

const PlayerView = styled.div`
  display: flex;
   flex-direction: column;
  place-content: center;
  align-items: center;
  @media (max-width: 380px) {
    display: none
  }
`;

const HeaderTop2 = styled.div`
  display:none;
  grid-template-columns: 1fr 0.5fr 1fr ;
  margin:2px;
  background-color: #FFFFFF;
  padding:5px;
  border-radius:4px;
  transition: transform .2s;
  cursor:pointer;
  @media (max-width: 380px) {
    display:grid;
    grid-template-columns: 1fr 0.5fr 1fr ;
 
  }
`;

const CreditView2 = styled.div`
display: none
  @media (max-width: 380px) {
   
    display: flex;
   flex-direction: column;
  place-content: center;
  align-items: center;
  }
`;

const PlayerView2 = styled.div`
display: none
@media (max-width: 380px) {
 text-align:end;
  display: flex;
 flex-direction: column;
place-content: center;
align-items: center;
justify-content:flex-end;
}
`;

const SelecB = styled.div`
    border-radius: 50%;
    width: 34px;
    height: 34px;
  &:hover {
    transform: scale(1.025);
    box-shadow:0 0 0.52em 0 rgba(0,0,0,0.15);
  }
`

const HeaderMainLeft = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    @media (max-width: 380px) {
      justify-content: flex-start;
   
    }
`

const HeaderMainRight = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    @media (max-width: 380px) {
      justify-content: flex-end;
   
    }
`
const RowNameSection = styled.div`
  display: flex;
  align-content: center;
  align-items: flex-start;
  flex-direction: column;
  justify-content: center;
`


let dynamicObj2 = {};

export default function EditTeam(props) {

    let history = useHistory()

  const [contest, setMatchups] = React.useState(true);
  const [value, setValue] = React.useState(0);
  const [openNotification, setOpenNotifi] = React.useState(false);
  const [message, setMessage] = React.useState("false");

  const [countp, setCount] = React.useState(11);

  const [credit, setCredit] = React.useState(100);

  const [localTeam, setlocalTeam] = React.useState(0);
  const [visitorTeam, setvisitorTeam] = React.useState(0);

  const [teamFinal, setTeam] = React.useState({});

  const [cap, setCap] = React.useState(null);
  const [vcap, setvCap] = React.useState(null);

 

  const [Allrounder, setAllrounder] = React.useState({});
  const [Batsman, setBatsman] = React.useState({});
  const [Bowler, setBowler] = React.useState({});
  const [Wicketkeeper, setWicketkeeper] = React.useState({});

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

 

  useEffect(() => {
    ReactGA.pageview(props.location.pathname);

    (async function teamsFnc() {
        let userTeam= await getMyTeam();

        await getTeam(userTeam);
      })();
  }, []);

  const getMyTeam = () => api.userTeamGet(props.match.params.teamId,props.match.params.matchId).then(response => {
    
    
    

    let players = {}
    let team = {}
    let Wicketkeeper = {}
    let Batsman = {}
    let Bowler = {}
    let Allrounder = {}

    response.data.FantasyPlayers.forEach(object => {
        if(object.position.name === 'Wicketkeeper'){
          Wicketkeeper = { ...Wicketkeeper,[object.id]: object}
          team =  { ...team,[object.id]: object} 
          players = {...players,[object.id]: object}

        }
        if(object.position.name === 'Batsman'){
          Batsman = { ...Batsman,[object.id]: object}
          team =  { ...team,[object.id]: object} 
          players = {...players,[object.id]: object}
        }
        if(object.position.name === 'Bowler'){
          Bowler = { ...Bowler,[object.id]: object}
          team =  { ...team,[object.id]: object} 
          players = {...players,[object.id]: object}

        }
        if(object.position.name === 'Allrounder'){
            Allrounder = { ...Allrounder,[object.id]: object}
            team =  { ...team,[object.id]: object} 
            players = {...players,[object.id]: object}

        }
        
    })



    return players
})

const getTeam = (teamFinal) => api.team(props.match.params.matchId).then(response => {
    
    

    dynamicObj2 = {}
    let creditT = 100
    let capT = false
    let vcapT = false

    let localTeam = 0;
    let visitorTeam = 0

    let Wicketkeeper = {}
    let Batsman = {}
    let Bowler = {}
    let Allrounder = {}

    response.data.Allrounder.forEach((player) => {
      if(player.teamId === response.data.localTeam && teamFinal.hasOwnProperty(player.id)){
        localTeam += 1
        player.captain = teamFinal[player.id].captain
        player.viceCaptain = teamFinal[player.id].viceCaptain
        Allrounder = { ...Allrounder,[player.id]: player}

      }else if(teamFinal.hasOwnProperty(player.id)){
        visitorTeam += 1
        player.captain = teamFinal[player.id].captain
        player.viceCaptain = teamFinal[player.id].viceCaptain
        Allrounder = { ...Allrounder,[player.id]: player}

      }

      dynamicObj2 = {
        ...dynamicObj2,
        [player.id]: {
          bool: false,
          [player.id]: teamFinal.hasOwnProperty(player.id) ? true : false,
        }
      }
      if(teamFinal.hasOwnProperty(player.id)){
        creditT = creditT - parseFloat(player.credit)

        if(teamFinal[player.id].captain){
          capT = player.id
        }
        if(teamFinal[player.id].viceCaptain){
          vcapT = player.id
        }
      }
    })

    response.data.Batsman.forEach((player) => {
      if(player.teamId === response.data.localTeam && teamFinal.hasOwnProperty(player.id)){
        localTeam += 1
        player.captain = teamFinal[player.id].captain
        player.viceCaptain = teamFinal[player.id].viceCaptain
        Batsman = { ...Batsman,[player.id]: player}

      }else if(teamFinal.hasOwnProperty(player.id)){
        visitorTeam += 1
        player.captain = teamFinal[player.id].captain
        player.viceCaptain = teamFinal[player.id].viceCaptain
        Batsman = { ...Batsman,[player.id]: player}

      }

      dynamicObj2 = {
        ...dynamicObj2,
        [player.id]: {
          bool: false,
          [player.id]: teamFinal.hasOwnProperty(player.id) ? true : false,
        }
      }
      if(teamFinal.hasOwnProperty(player.id)){
        creditT = creditT - parseFloat(player.credit)
        if(teamFinal[player.id].captain){
          capT = player.id
        }
        if(teamFinal[player.id].viceCaptain){
          vcapT = player.id
        }
      }

    })

    response.data.Bowler.forEach((player) => {
      if(player.teamId === response.data.localTeam && teamFinal.hasOwnProperty(player.id)){
        localTeam += 1
        player.captain = teamFinal[player.id].captain
        player.viceCaptain = teamFinal[player.id].viceCaptain
        Bowler = { ...Bowler,[player.id]: player}

      }else if(teamFinal.hasOwnProperty(player.id)){
        visitorTeam += 1
        player.captain = teamFinal[player.id].captain
        player.viceCaptain = teamFinal[player.id].viceCaptain
        Bowler = { ...Bowler,[player.id]: player}

      }
      dynamicObj2 = {
        ...dynamicObj2,
        [player.id]: {
          bool: false,
          [player.id]: teamFinal.hasOwnProperty(player.id) ? true : false,
        }
      }
      if(teamFinal.hasOwnProperty(player.id)){
        creditT = creditT - parseFloat(player.credit)
        if(teamFinal[player.id].captain){
          capT = player.id
        }
        if(teamFinal[player.id].viceCaptain){
          vcapT = player.id
        }
      }

    })

    response.data.Wicketkeeper.forEach((player) => {
      if(player.teamId === response.data.localTeam && teamFinal.hasOwnProperty(player.id)){
        localTeam += 1
        player.captain = teamFinal[player.id].captain
        player.viceCaptain = teamFinal[player.id].viceCaptain
        Wicketkeeper = { ...Wicketkeeper,[player.id]: player}
      }else if(teamFinal.hasOwnProperty(player.id)){
        visitorTeam += 1
        player.captain = teamFinal[player.id].captain
        player.viceCaptain = teamFinal[player.id].viceCaptain
        Wicketkeeper = { ...Wicketkeeper,[player.id]: player}
      }

      dynamicObj2 = {
        ...dynamicObj2,
        [player.id]: {
          bool: false,
          [player.id]: teamFinal.hasOwnProperty(player.id) ? true : false,
        }
      }
      if(teamFinal.hasOwnProperty(player.id)){
        creditT = creditT - parseFloat(player.credit)
        if(teamFinal[player.id].captain){
          capT = player.id
        }
        if(teamFinal[player.id].viceCaptain){
          vcapT = player.id
        }
      }
    })

    setCredit(creditT)
    setMatchups(response.data);
    setCap(capT)
    setvCap(vcapT)
    setlocalTeam(localTeam);
    setvisitorTeam(visitorTeam);
    setAllrounder(Allrounder);
    setBatsman(Batsman)
    setBowler(Bowler)
    setWicketkeeper(Wicketkeeper)
    setTeam({...Wicketkeeper,...Bowler,...Batsman,...Allrounder})
  })

  const saveTeam = () => {
    if(vcap === null){
      handleNotificationClick("Please select a vice captain");
      return;
    }

    if(cap === null){
      handleNotificationClick("Please select a captain")
      return;
    }

    let obj = {
      matchId: parseInt(props.match.params.matchId),
      players: teamFinal
    }

    api.patchUserTeam(obj,props.match.params.teamId).then(response => {
        handleNotificationClick(response.message);
        history.push({
          pathname:`/contest/${props.match.params.matchId}`,
          state: {
            tabNumber: 2
          }
        })
    }).catch(() => {
        handleNotificationClick("Error, Please try again")
    });
  }

  const handleNotificationClick = (message) => {
    setOpenNotifi(true);
    setMessage(message);

  }

  const handleNotificationClose = () => {
    setOpenNotifi(false);
  }

  const makeCombo2 = (key, player, pCredit) => {
    
    
    

    if (dynamicObj2[key][key]) {
      setCredit(credit + parseFloat(pCredit))
      setCount(countp - 1);
      dynamicObj2[key][key] = !dynamicObj2[key][key]
      
      switch (player.position.id) {
        case 1:
          if(Batsman[player.id].captain === true){
            setCap(null)
 
          }
          if(Batsman[player.id].viceCaptain === true){
 
            setvCap(null)
          }
          delete Batsman[player.id]
          

          setBatsman({ ...Batsman })
          break;
        case 2:
          if(Bowler[player.id].captain === true){
            setCap(null)
 
          }
          if(Bowler[player.id].viceCaptain === true){
 
            setvCap(null)
          }
          delete Bowler[player.id]
          
          setBowler({ ...Bowler })
          break;
        case 3:
          if(Wicketkeeper[player.id].captain === true){
            setCap(null)
 
          }
          if(Wicketkeeper[player.id].viceCaptain === true){
 
            setvCap(null)
          }
          delete Wicketkeeper[player.id]
           
          
          setWicketkeeper({ ...Wicketkeeper })
          break;
        case 4:
          if(Allrounder[player.id].captain === true){
            setCap(null)
 
          }
          if(Allrounder[player.id].viceCaptain === true){
 
            setvCap(null)
          }
          delete Allrounder[player.id]
          setAllrounder({ ...Allrounder })
          break;

        default:
          break;
      }
      if (player.teamId === contest.localTeam) {
        setlocalTeam(localTeam - 1)
      }

      if (player.teamId === contest.visitorTeam) {
        setvisitorTeam(visitorTeam - 1)
      }
      return
    }

    if (countp >= 11) {
      handleNotificationClick("Maximum 11 players are allowed")
      return
    }

    if (visitorTeam >= 7 && player.teamId === contest.visitorTeam) {
      handleNotificationClick("Maximum 7 players are allowed per team")
      return
    }

    if (localTeam >= 7 && player.teamId === contest.localTeam) {
      handleNotificationClick("Maximum 7 players are allowed per team")
      return
    }
    if (Object.keys(Wicketkeeper).length < 1 && countp >= 10 && player.position.id !== 3) {
      handleNotificationClick("Select a minimum of 1 wicketkeeper.")
      return
    } else if (Object.keys(Allrounder).length < 1 && countp >= 10 && player.position.id !== 4) {
      handleNotificationClick("Select a minimum of 1 allrounder.")
      return
    }

    if(player.position.id !== 1){
      if(Object.keys(Batsman).length === 2 && countp === 9){
        handleNotificationClick("Select a minimum of 3 batsman.")
        return
      }
      if(Object.keys(Batsman).length === 1 && countp === 9){
        handleNotificationClick("Select a minimum of 3 batsman.")
        return
      }
      if(Object.keys(Batsman).length === 0 && countp === 8){
        handleNotificationClick("Select a minimum of 3 batsman.")
        return
      }
    }

    if(player.position.id !== 2){
      if(Object.keys(Bowler).length === 2 && countp === 9){
        handleNotificationClick("Select a minimum of 3 bowler.")
        return
      }
      if(Object.keys(Bowler).length === 1 && countp === 9){
        handleNotificationClick("Select a minimum of 3 bowler.")
        return
      }
      if(Object.keys(Bowler).length === 0 && countp === 8){
        handleNotificationClick("Select a minimum of 3 bowler.")
        return
      }
    }

    if (credit < player.credit) {
      handleNotificationClick("Not enough credit.")
      return
    }


    if (player.position.id === 1 && Object.keys(Batsman).length < 6) {
      setBatsman({ ...Batsman, [player.id]: {...player,captain:false,viceCaptain:false} });
      setTeam({...Batsman,...Bowler,...Wicketkeeper,...Allrounder,[player.id]: {...player,captain:false,viceCaptain:false}})

    } else if (player.position.id === 1) {
      handleNotificationClick("Max 6 batsman is allowed ")
      return
    }
    if (player.position.id === 2 && Object.keys(Bowler).length < 6) {
      setBowler({ ...Bowler, [player.id]: {...player,captain:false,viceCaptain:false} })
      setTeam({...Batsman,...Bowler,...Wicketkeeper,...Allrounder,[player.id]: {...player,captain:false,viceCaptain:false}})

    } else if (player.position.id === 2) {
      handleNotificationClick("Max 6 bowler is allowed ")
      return
    }

    if (player.position.id === 3 && Object.keys(Wicketkeeper).length < 4) {
      setWicketkeeper({ ...Wicketkeeper, [player.id]: {...player,captain:false,viceCaptain:false} })
      setTeam({...Batsman,...Bowler,...Wicketkeeper,...Allrounder,[player.id]: {...player,captain:false,viceCaptain:false}})

    } else if (player.position.id === 3) {
      handleNotificationClick("Max 4 wicketkeeper is allowed ")
      return
    }

    if (player.position.id === 4 && Object.keys(Allrounder).length < 4) {
      setAllrounder({ ...Allrounder, [player.id]: {...player,captain:false,viceCaptain:false} })
      setTeam({...Batsman,...Bowler,...Wicketkeeper,...Allrounder,[player.id]: {...player,captain:false,viceCaptain:false}})

    } else if (player.position.id === 4) {
      handleNotificationClick("Max 4 allrounder is allowed ")
      return
    }



    dynamicObj2[key][key] = true


    setCredit(credit - parseFloat(pCredit))
    setCount(parseInt(countp) + 1);

    if (player.teamId === contest.localTeam) {
      setlocalTeam(localTeam + 1)
    }

    if (player.teamId === contest.visitorTeam) {
      setvisitorTeam(visitorTeam + 1)
    }


  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
    
  }

  const selectVcap = (value) => {
    if(cap === value.id){
      setCap(null)
    }
    
    if(vcap === value.id){
      setvCap(null)
    }else{
      setvCap(value.id)
    }

    if (value.position.id === 1) {
      let objectMap = {...Batsman,...Bowler,...Wicketkeeper,...Allrounder}


      Object.entries(objectMap).forEach(([, value2]) => {
        if(value2['viceCaptain'] && value2.id !== value.id){
         return objectMap[value2.id]['viceCaptain'] = false;
        }
        if(value2['viceCaptain'] === false && value2.id === value.id){
          return objectMap[value2.id]['viceCaptain'] = true;
        }else if(value2.id === value.id){
          return objectMap[value2.id]['viceCaptain'] = false;
        }
      })
      

      objectMap[value.id]['captain'] = false;
      setTeam(objectMap);
    } 
    if (value.position.id === 2) {
      let objectMap = {...Batsman,...Bowler,...Wicketkeeper,...Allrounder}


      Object.entries(objectMap).forEach(([, value2]) => {
        if(value2['viceCaptain'] && value2.id !== value.id){
          return  objectMap[value2.id]['viceCaptain'] = false;
        }
        if(value2['viceCaptain'] === false && value2.id === value.id){
          return  objectMap[value2.id]['viceCaptain'] = true;
        }else if(value2.id === value.id){
          return  objectMap[value2.id]['viceCaptain'] = false;
        }
      })
      

      objectMap[value.id]['captain'] = false;
      setTeam(objectMap);
    } 

    if (value.position.id === 3) {
      let objectMap = {...Batsman,...Bowler,...Wicketkeeper,...Allrounder}


      Object.entries(objectMap).forEach(([, value2]) => {
        if(value2['viceCaptain'] && value2.id !== value.id){
          return objectMap[value2.id]['viceCaptain'] = false;
        }
        if(value2['viceCaptain'] === false && value2.id === value.id){
          return objectMap[value2.id]['viceCaptain'] = true;
        }else if(value2.id === value.id){
          return objectMap[value2.id]['viceCaptain'] = false;
        }
      })
      

      objectMap[value.id]['captain'] = false;
      setTeam(objectMap);
    } 
    if (value.position.id === 4) {
      let objectMap = {...Batsman,...Bowler,...Wicketkeeper,...Allrounder}


      Object.entries(objectMap).forEach(([, value2]) => {
        if(value2['viceCaptain'] && value2.id !== value.id){
          return  objectMap[value2.id]['viceCaptain'] = false;
        }
        if(value2['viceCaptain'] === false && value2.id === value.id){
          return objectMap[value2.id]['viceCaptain'] = true;
        }else if(value2.id === value.id){
          return objectMap[value2.id]['viceCaptain'] = false;
        }
      })
      

      objectMap[value.id]['captain'] = false;
      setTeam(objectMap);      
    } 

  }

  const selectCap = (value) => {
    if(vcap === value.id){
      setvCap(null)
    }

    if(cap === value.id){
      setCap(null)
    }else{
      setCap(value.id)
    }

    if (value.position.id === 1) {
      let objectMap = {...Batsman,...Bowler,...Wicketkeeper,...Allrounder}


      Object.entries(objectMap).forEach(([, value2]) => {
        if(value2['captain'] && value2.id !== value.id){
          return  objectMap[value2.id]['captain'] = false;
        }
        if(value2['captain'] === false && value2.id === value.id){
          return objectMap[value2.id]['captain'] = true;
        }else if(value2.id === value.id){
          return objectMap[value2.id]['captain'] = false
        }
      })
      

      objectMap[value.id]['viceCaptain'] = false;
 
      setTeam({...objectMap});
    } 
    if (value.position.id === 2) {
      let objectMap = {...Batsman,...Bowler,...Wicketkeeper,...Allrounder}


      Object.entries(objectMap).forEach(([, value2]) => {
        if(value2['captain'] && value2.id !== value.id){
          return  objectMap[value2.id]['captain'] = false;
        }
        if(value2['captain'] === false && value2.id === value.id){
          return objectMap[value2.id]['captain'] = true;
        }else if(value2.id === value.id){
          return objectMap[value2.id]['captain'] = false
        }
      })
      

      objectMap[value.id]['viceCaptain'] = false;
      setTeam(objectMap)
    } 

    if (value.position.id === 3) {
      let objectMap = {...Batsman,...Bowler,...Wicketkeeper,...Allrounder}


      Object.entries(objectMap).forEach(([, value2]) => {
        if(value2['captain'] && value2.id !== value.id){
          return objectMap[value2.id]['captain'] = false;
        }
        if(value2['captain'] === false && value2.id === value.id){
          return  objectMap[value2.id]['captain'] = true;
        }else if(value2.id === value.id){
          return objectMap[value2.id]['captain'] = false
        }
      })
      

      objectMap[value.id]['viceCaptain'] = false;

      setTeam(objectMap)
    } 
    if (value.position.id === 4) {
      let objectMap = {...Batsman,...Bowler,...Wicketkeeper,...Allrounder}


      Object.entries(objectMap).forEach(([, value2]) => {
        if(value2['captain'] && value2.id !== value.id){
          return  objectMap[value2.id]['captain'] = false;
        }
        if(value2['captain'] === false && value2.id === value.id){
          return objectMap[value2.id]['captain'] = true;
        }else if(value2.id === value.id){
          return objectMap[value2.id]['captain'] = false
        }
      })
      

      objectMap[value.id]['viceCaptain'] = false;

      setTeam(objectMap)
    } 

  }

  const showAllR = () => contest.Allrounder.map((player) =>
    <Duels
      onClick={() => { makeCombo2(player.id, player, player.credit) }}
      key={player.id}
    >
      <DuelSingleRightTop
        style={{ cursor: "pointer", boxShadow: dynamicObj2[player.id][player.id] ? "0 0 1em 0 #71bc4f" : "", backgroundColor: dynamicObj2[player.id][player.id] ? color.secondary.main : "#F5F6FA", color: dynamicObj2[player.id][player.id] ? "white" : "black" }}
      >
        <div style={{
          padding: '2.5px',
          margin: '5.5px',
        }}>
          <Avatar src={player.image_path} variant="circle" />

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
          <RowNameSection>
            <Typography variant="caption" style={{ fontWeight: 600 }}>
            {player.firstname[0]}. {player.lastname}


            </Typography>

            <Typography variant="caption">

               
              <span>
                 {player.teamId === contest.matchDetail.localteam.id ? contest.matchDetail.localteam.name : contest.matchDetail.visitorteam.name }
              </span>

            </Typography>
            <Typography variant="caption">
              {/* {contest.players[2].player.position.name} */}

            </Typography>
          </RowNameSection>
        </DuelSingleRight>

        <DuelOptionRight  >
          <div style={{
            padding: '2.5px',
            margin: '5.5px',
            display: "flex",
            flexDirection:"column",
            alignContent: "center",
            alignItems: "center",
            justifyContent:"center"
          }}>

            <Typography variant="caption">
                          {!isNaN(player.selected) ? (100*player.selected/contest.totalTeams).toFixed(2):0}%

        </Typography>
          </div>
          <div style={{
            padding: '2.5px',
            margin: '5.5px',
            display: "flex",
            flexDirection:"column",
            alignContent: "center",
            alignItems: "center",
            justifyContent:"center"
          }}>

            <Typography variant="caption">
              {player.credit}
            </Typography>
          </div>
          <div style={{
            padding: '2.5px',
            margin: '5.5px',
            display: "flex",
            flexDirection:"column",
            alignContent: "center",
            alignItems: "center",
            justifyContent:"center"
          }}>
            <Icon style={{ color: dynamicObj2[player.id][player.id] ? "white":green[500] }}>
            {dynamicObj2[player.id][player.id] ? "check" : "add_circle" }

            </Icon>


          </div>

        </DuelOptionRight>

      </DuelSingleRightTop>
    </Duels>

  )

  const showBat = () => contest.Batsman.map((value) =>
    <Duels
      onClick={() => { makeCombo2(value.id, value, value.credit) }}
      key={value.id}
    >
      <DuelSingleRightTop
        style={{ cursor: "pointer", boxShadow: dynamicObj2[value.id][value.id] ? "0 0 1em 0 #71bc4f" : "", backgroundColor: dynamicObj2[value.id][value.id] ? color.secondary.main : "#F5F6FA", color: dynamicObj2[value.id][value.id] ? "white" : "black" }}
      >
        <div style={{
          padding: '2.5px',
          margin: '5.5px',
        }}>
          <Avatar src={value.image_path} variant="circle" />

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
          <RowNameSection>
            <Typography variant="caption" style={{ fontWeight: 600 }}>
            {value.firstname[0]}. {value.lastname}

            </Typography>

            <Typography variant="caption">

               <span>
              {value.teamId === contest.matchDetail.localteam.id ? contest.matchDetail.localteam.name : contest.matchDetail.visitorteam.name }
              </span>

            </Typography>
            <Typography variant="caption">
              {/* {contest.players[2].player.position.name} */}

            </Typography>
          </RowNameSection>
        </DuelSingleRight>

        <DuelOptionRight  >
          <div style={{
            padding: '2.5px',
            margin: '5.5px',
            display: "flex",
            flexDirection:"column",
            alignContent: "center",
            alignItems: "center",
            justifyContent:"center"
          }}>

            <Typography variant="caption">
                          {!isNaN(value.selected) ? (100*value.selected/contest.totalTeams).toFixed(2):0}%

        </Typography>
          </div>
          <div style={{
            padding: '2.5px',
            margin: '5.5px',
            display: "flex",
            flexDirection:"column",
            alignContent: "center",
            alignItems: "center",
            justifyContent:"center"
          }}>

            <Typography variant="caption">
              {value.credit}
            </Typography>
          </div>
          <div style={{
            padding: '2.5px',
            margin: '5.5px',
            display: "flex",
            flexDirection:"column",
            alignContent: "center",
            alignItems: "center",
            justifyContent:"center"
          }}>
            <Icon style={{ color: dynamicObj2[value.id][value.id] ? "white":green[500] }}>
            {dynamicObj2[value.id][value.id] ? "check" : "add_circle" }

            </Icon>


          </div>

        </DuelOptionRight>
      </DuelSingleRightTop>
    </Duels>

  )
  const showBowl = () => contest.Bowler.map((value) =>
    <Duels
      onClick={() => { makeCombo2(value.id, value, value.credit) }}
      key={value.id}
    >
      <DuelSingleRightTop
        style={{ cursor: "pointer", boxShadow: dynamicObj2[value.id][value.id] ? "0 0 1em 0 #71bc4f" : "", backgroundColor: dynamicObj2[value.id][value.id] ? color.secondary.main : "#F5F6FA", color: dynamicObj2[value.id][value.id] ? "white" : "black" }}
      >
        <div style={{
          padding: '2.5px',
          margin: '5.5px',
        }}>
          <Avatar src={value.image_path} variant="circle" />

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
          <RowNameSection>
            <Typography variant="caption" style={{ fontWeight: 600 }}>
              {value.fullname}

            </Typography>

            <Typography variant="caption">

               <span>
              {value.teamId === contest.matchDetail.localteam.id ? contest.matchDetail.localteam.name : contest.matchDetail.visitorteam.name }
              </span>

            </Typography>
            <Typography variant="caption">
              {/* {contest.players[2].player.position.name} */}

            </Typography>
          </RowNameSection>
        </DuelSingleRight>

        <DuelOptionRight  >
          <div style={{
            padding: '2.5px',
            margin: '5.5px',
            display: "flex",
            flexDirection:"column",
            alignContent: "center",
            alignItems: "center",
            justifyContent:"center"
          }}>

            <Typography variant="caption">
                          {!isNaN(value.selected) ? (100*value.selected/contest.totalTeams).toFixed(2):0}%

        </Typography>
          </div>
          <div style={{
            padding: '2.5px',
            margin: '5.5px',
            display: "flex",
            flexDirection:"column",
            alignContent: "center",
            alignItems: "center",
            justifyContent:"center"
          }}>

            <Typography variant="caption">
              {value.credit}
            </Typography>
          </div>
          <div style={{
            padding: '2.5px',
            margin: '5.5px',
            display: "flex",
            flexDirection:"column",
            alignContent: "center",
            alignItems: "center",
            justifyContent:"center"
          }}>
            <Icon style={{ color: dynamicObj2[value.id][value.id] ? "white":green[500] }}>
            {dynamicObj2[value.id][value.id] ? "check" : "add_circle" }

            </Icon>


          </div>

        </DuelOptionRight>

      </DuelSingleRightTop>
    </Duels>

  )

  const showWk = () => contest.Wicketkeeper.map((value) =>
    <Duels
      onClick={() => { makeCombo2(value.id, value, value.credit) }}
          key={value.id}
    >
      <DuelSingleRightTop
        style={{ cursor: "pointer", boxShadow: dynamicObj2[value.id][value.id] ? "0 0 1em 0 #71bc4f" : "", backgroundColor: dynamicObj2[value.id][value.id] ? color.secondary.main : "#F5F6FA", color: dynamicObj2[value.id][value.id] ? "white" : "black" }}
      >
        <div style={{
          padding: '2.5px',
          margin: '5.5px',
        }}>
          <Avatar src={value.image_path} variant="circle" />

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
          <RowNameSection>
            <Typography variant="caption"  style={{ fontWeight: 600 }}>
              {value.firstname[0]}. {value.lastname}
            </Typography>

            <Typography variant="caption">

               <span>
              {value.teamId === contest.matchDetail.localteam.id ? contest.matchDetail.localteam.name : contest.matchDetail.visitorteam.name }

               </span>

            </Typography>
            <Typography variant="caption">
              {/* {contest.players[2].player.position.name} */}

            </Typography>
          </RowNameSection>
        </DuelSingleRight>

        <DuelOptionRight  >
          <div style={{
            padding: '2.5px',
            margin: '5.5px',
            display: "flex",
            flexDirection:"column",
            alignContent: "center",
            alignItems: "center",
            justifyContent:"center"
          }}>

            <Typography variant="caption">
            {!isNaN(value.selected) ? (100*value.selected/contest.totalTeams).toFixed(2):0}%
            </Typography>
          </div>
          <div style={{
            padding: '2.5px',
            margin: '5.5px',
            display: "flex",
            flexDirection:"column",
            alignContent: "center",
            alignItems: "center",
            justifyContent:"center"
          }}>

            <Typography variant="caption">
              {value.credit}
            </Typography>
          </div>
          <div style={{
            padding: '2.5px',
            margin: '5.5px',
            display: "flex",
            flexDirection:"column",
            alignContent: "center",
            alignItems: "center",
            justifyContent:"center"
          }}>
            <Icon style={{ color: dynamicObj2[value.id][value.id] ? "white":green[500] }}>
            {dynamicObj2[value.id][value.id] ? "check" : "add_circle" }
            </Icon>


          </div>

        </DuelOptionRight>
      </DuelSingleRightTop>
    </Duels>

  )

  const prev = () => Object.entries(Wicketkeeper).length > 0 ? Object.entries({Wicketkeeper,Batsman,Allrounder,Bowler}).map(([key2, value2]) => 
  <List style={{padding:0}} key={key2+"m"}> 
     <ListItem style={{padding:0}}>
      <Typography variant="subtitle2">
      {key2 === "Wicketkeeper" ? "Wicketkeeper" :
          key2 === "Batsman" ? "Batsman" :
          key2 === "Bowler" ? "Bowler" :
          key2 === "Allrounder" ? "Allrounder" : ''
              }
      </Typography>
    </ListItem>
    {key2 === "Wicketkeeper" ? Object.entries({...value2}).map(([key, value]) => 
    <ListItem style={{padding:0}} key={key+"p"} >
      <TeamView>
        <RowNameSection style={{
          padding: '2.5px',
          margin: '5.5px',
        }}>
          <Avatar src={value.image_path} variant="circle" />

        </RowNameSection>

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
          <RowNameSection>
            <Typography variant="caption" style={{fontWeight:800}}>
                          {value.firstname[0]}. {value.lastname}


            </Typography>

            <Typography variant="caption">
            {value.position.name}
               
            </Typography>
            <Typography variant="caption">
              {/* {contest.players[2].player.position.name} */}

            </Typography>
          </RowNameSection>
        </DuelSingleRight>

        <DuelOptionRight  >
        <div style={{
            padding: '2.5px',
            margin: '5.5px',
            display: "flex",
            flexDirection:"column",
            alignContent: "center",
            alignItems: "center",
            justifyContent:"center",
            height:"80%"
          }}>

            <Typography variant="caption"
            style={{
              display: "flex",
              alignContent: "center",
              alignItems: "center"
            }}
            >
                          {!isNaN(value.selected) ? (100*value.selected/contest.totalTeams).toFixed(2):0}%

            </Typography>
          </div>
          <div style={{
            padding: '2.5px',
            margin: '5.5px',
            display: "flex",
            flexDirection:"column",
            alignContent: "center",
            alignItems: "center",
            justifyContent:"center"
          }}>
            <SelecB onClick={()=>selectVcap(value)}>
            <Typography 
            variant="caption"
              style={{
              borderRadius:"50%",
              width: "34px",
              height: "34px",
              display:"flex",
              alignItems:"center",
              justifyContent:"center",
              border: !value.viceCaptain ? "1px solid" : "1px solid white",
              color: !value.viceCaptain ? "black" : "white",
              backgroundColor: value.viceCaptain ? "#00A826" : "rgba(0,0,0,0)"
            }}
            >
              VC
            </Typography>
             
            </SelecB>
            <div>
           <Typography variant="caption">
           {!isNaN(value.vcaptainCount) ? (100*value.vcaptainCount/contest.totalTeams).toFixed(2):0}%
           </Typography>
            </div>
          </div>
          <div style={{
            padding: '2.5px',
            margin: '5.5px',
            display: "flex",
            flexDirection:"column",
            alignContent: "center",
            alignItems: "center",
            justifyContent:"center",
          }}>

          <SelecB onClick={()=>selectCap(value)}>
            <Typography 
            variant="caption"
              style={{
              borderRadius:"50%",
              
              width: "34px",
              height: "34px",
              display:"flex",
              alignItems:"center",
              justifyContent:"center",
              border: !value.captain ? "1px solid" : "1px solid white",
              color: !value.captain ? "black" : "white",
              backgroundColor: value.captain ? "#00A826" : "rgba(0,0,0,0)"
            }}
            >
              C
            </Typography>
             
            </SelecB>
            <div>
           <Typography variant="caption">
           {!isNaN(value.captainCount) ? (100*value.captainCount/contest.totalTeams).toFixed(2):0}%
           </Typography>
            </div>
          </div>

        </DuelOptionRight>
      </TeamView>
      </ListItem>
    ) : <div/>}
    {key2 === "Batsman" ? Object.entries({...value2}).map(([key, value]) => 
    <ListItem style={{padding:0}} key={key+"p"} >
      <TeamView>
        <RowNameSection style={{
          padding: '2.5px',
          margin: '5.5px',
        }}>
          <Avatar src={value.image_path} variant="circle" />

        </RowNameSection>

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
          <RowNameSection>
            <Typography variant="caption" style={{fontWeight:800}}>
                          {value.firstname[0]}. {value.lastname}


            </Typography>

            <Typography variant="caption">
            {value.position.name}
               
            </Typography>
            <Typography variant="caption">
              {/* {contest.players[2].player.position.name} */}

            </Typography>
          </RowNameSection>
        </DuelSingleRight>

        <DuelOptionRight  >
          <div style={{
            padding: '2.5px',
            margin: '5.5px',
            display: "flex",
            flexDirection:"column",
            alignContent: "center",
            alignItems: "center",
            justifyContent:"center",
            height:"80%"
          }}>

            <Typography variant="caption"
            style={{
              display: "flex",
              alignContent: "center",
              alignItems: "center"
            }}
            >
                          {!isNaN(value.selected) ? (100*value.selected/contest.totalTeams).toFixed(2):0}%

            </Typography>
          </div>
          <div style={{
            padding: '2.5px',
            margin: '5.5px',
            display: "flex",
            flexDirection:"column",
            alignContent: "center",
            alignItems: "center",
            justifyContent:"center"
          }}>
            <SelecB onClick={()=>selectVcap(value)}>
              <Typography 
              variant="caption"
                style={{
                borderRadius:"50%",
 
                width: "34px",
                height: "34px",
                display:"flex",
                alignItems:"center",
                justifyContent:"center",
                border: !value.viceCaptain ? "1px solid" : "1px solid white",
                color: !value.viceCaptain ? "black" : "white",
                backgroundColor: value.viceCaptain ? "#00A826" : "rgba(0,0,0,0)"
              }}
              >
                VC
              </Typography>
              
            </SelecB>
            <div>
           <Typography variant="caption">
           {!isNaN(value.vcaptainCount) ? (100*value.vcaptainCount/contest.totalTeams).toFixed(2):0}%
           </Typography>
            </div>
          </div>
          <div style={{
            padding: '2.5px',
            margin: '5.5px',
            display: "flex",
            flexDirection:"column",
            alignContent: "center",
            alignItems: "center",
            justifyContent:"center"
          }}>

          <SelecB onClick={()=>selectCap(value)}>
          <Typography 
              variant="caption"
              style={{
              borderRadius:"50%",
               width: "34px",
              height: "34px",
              display:"flex",
              alignItems:"center",
              justifyContent:"center",
              border: !value.captain ? "1px solid" : "1px solid white",
              color: !value.captain ? "black" : "white",
              backgroundColor: value.captain ? "#00A826" : "rgba(0,0,0,0)"
            }}
            >
              C
            </Typography>
          </SelecB>
          <div>
           <Typography variant="caption">
           {!isNaN(value.captainCount) ? (100*value.captainCount/contest.totalTeams).toFixed(2):0}%
           </Typography>
            </div>
          </div>

        </DuelOptionRight></TeamView>
      </ListItem>
    ) : <div/>}
        {key2 === "Allrounder" ? Object.entries({...value2}).map(([key, value]) => 
    <ListItem style={{padding:0}} key={key+"p"} >
      <TeamView>
        <RowNameSection style={{
          padding: '2.5px',
          margin: '5.5px',
        }}>
          <Avatar src={value.image_path} variant="circle" />

        </RowNameSection>

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
          <RowNameSection>
            <Typography variant="caption" style={{fontWeight:800}}>
                          {value.firstname[0]}. {value.lastname}


            </Typography>

            <Typography variant="caption">
            {value.position.name}
               
            </Typography>
            <Typography variant="caption">
              {/* {contest.players[2].player.position.name} */}

            </Typography>
          </RowNameSection>
        </DuelSingleRight>

        <DuelOptionRight  >
        <div style={{
            padding: '2.5px',
            margin: '5.5px',
            display: "flex",
            flexDirection:"column",
            alignContent: "center",
            alignItems: "center",
            justifyContent:"center",
            height:"80%"
          }}>

            <Typography variant="caption"
            style={{
              display: "flex",
              alignContent: "center",
              alignItems: "center"
            }}
            >
                          {!isNaN(value.selected) ? (100*value.selected/contest.totalTeams).toFixed(2):0}%

            </Typography>
          </div>
          <div style={{
            padding: '2.5px',
            margin: '5.5px',
            display: "flex",
            flexDirection:"column",
            alignContent: "center",
            alignItems: "center",
            justifyContent:"center"
          }}>
          <SelecB onClick={()=>selectVcap(value)}>
          <Typography 
              variant="caption"
              style={{
              borderRadius:"50%",
              
              width: "34px",
              height: "34px",
              display:"flex",
              alignItems:"center",
              justifyContent:"center",
              border: !value.viceCaptain ? "1px solid" : "1px solid white",
              color: !value.viceCaptain ? "black" : "white",
              backgroundColor: value.viceCaptain ? "#00A826" : "rgba(0,0,0,0)"
            }}
            >
              VC
            </Typography>
          </SelecB>
          <div>
           <Typography variant="caption">
           {!isNaN(value.vcaptainCount) ? (100*value.vcaptainCount/contest.totalTeams).toFixed(2):0}%
           </Typography>
            </div>
          </div>
          <div style={{
            padding: '2.5px',
            margin: '5.5px',
            display: "flex",
            flexDirection:"column",
            alignContent: "center",
            alignItems: "center",
            justifyContent:"center"
          }}>

 
          <SelecB onClick={()=>selectCap(value)}>
           <Typography 
              variant="caption"
              style={{
              borderRadius:"50%",
              
              width: "34px",
              height: "34px",
              display:"flex",
              alignItems:"center",
              justifyContent:"center",
              border: !value.captain ? "1px solid" : "1px solid white",
              color: !value.captain ? "black" : "white",
              backgroundColor: value.captain ? "#00A826" : "rgba(0,0,0,0)"
            }}
            >
              C
            </Typography>
          </SelecB>
          <div>
           <Typography variant="caption">
           {!isNaN(value.captainCount) ? (100*value.captainCount/contest.totalTeams).toFixed(2):0}%
           </Typography>
            </div>
          </div>

        </DuelOptionRight></TeamView>
      </ListItem>
    ) : <div/>}
            {key2 === "Bowler" ? Object.entries({...value2}).map(([key, value]) => 
    <ListItem style={{padding:0}} key={key+"p"} >
      <TeamView>
        <RowNameSection style={{
          padding: '2.5px',
          margin: '5.5px',
        }}>
          <Avatar src={value.image_path} variant="circle" />

        </RowNameSection>

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
          <RowNameSection>
            <Typography variant="caption" style={{fontWeight:800}}>
                          {value.firstname[0]}. {value.lastname}


            </Typography>

            <Typography variant="caption">
            {value.position.name}
               
            </Typography>
            <Typography variant="caption">
              {/* {contest.players[2].player.position.name} */}

            </Typography>
          </RowNameSection>
        </DuelSingleRight>

        <DuelOptionRight  >
        <div style={{
            padding: '2.5px',
            margin: '5.5px',
            display: "flex",
            flexDirection:"column",
            alignContent: "center",
            alignItems: "center",
            justifyContent:"center",
            height:"80%"
          }}>

            <Typography variant="caption"
            style={{
              display: "flex",
              alignContent: "center",
              alignItems: "center"
            }}
            >
                          {!isNaN(value.selected) ? (100*value.selected/contest.totalTeams).toFixed(2):0}%

            </Typography>
          </div>
          <div style={{
            padding: '2.5px',
            margin: '5.5px',
            display: "flex",
            flexDirection:"column",
            alignContent: "center",
            alignItems: "center",
            justifyContent:"center"
          }}>

        <SelecB
          onClick={()=>selectVcap(value)}
        >
          <Typography 
              variant="caption"
              style={{
              borderRadius:"50%",
              
              width: "34px",
              height: "34px",
              display:"flex",
              alignItems:"center",
              justifyContent:"center",
              border: !value.viceCaptain ? "1px solid" : "1px solid white",
              color: !value.viceCaptain ? "black" : "white",
              backgroundColor: value.viceCaptain ? "#00A826" : "rgba(0,0,0,0)"
            }}
            
            >
              VC
            </Typography>
          </SelecB>
          <div>
           <Typography variant="caption">
           {!isNaN(value.vcaptainCount) ? (100*value.vcaptainCount/contest.totalTeams).toFixed(2):0}%
           </Typography>
            </div>
          </div>
          <div style={{
            padding: '2.5px',
            margin: '5.5px',
            display: "flex",
            flexDirection:"column",
            alignContent: "center",
            alignItems: "center",
            justifyContent:"center"
          }}>

 
          <SelecB
            onClick={()=>selectCap(value)}
          >
          <Typography 
              variant="caption"
              style={{
              borderRadius:"50%",
              
              width: "34px",
              height: "34px",
              display:"flex",
              alignItems:"center",
              justifyContent:"center",
              border: !value.captain ? "1px solid" : "1px solid white",
              color: !value.captain ? "black" : "white",
              backgroundColor: value.captain ? "#00A826" : "rgba(0,0,0,0)"
            }}
            >
              C
            </Typography>
          </SelecB>
          <div>
           <Typography variant="caption">
           {!isNaN(value.captainCount) ? (100*value.captainCount/contest.totalTeams).toFixed(2):0}%
           </Typography>
            </div>
          </div>

        </DuelOptionRight> </TeamView>
      </ListItem>
    ) : <div/>}
  </List>
  
 ):<div/>


  return (Object.keys(contest).length > 0 ?

    <Container maxWidth={'md'}
      style={{
        marginTop: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 0
      }}
    >
       <AppBar elevation={0} position="sticky" 
       style={{ width: "100%", 
       background: "#F9F8FC", 
       top: 57, 
       boxShadow: 0 
       }}>
       <Paper elevation={3} style={{
        border: "1px solid #00A826",
        backgroundColor: "#00A826",
         
      }}>
        {Object.keys(contest).length > 0 ?
          <div >
            <HeaderTop style={{ backgroundColor: "#00A826", color: "white" }}>
              <CreditView>
                <div>

                  <Typography variant="caption" style={{
                    fontWeight: 600,
                    fontSize: '1em',
                    margin: 10
                  }}>
                    Credits
                    </Typography>
                </div>
                <div>

                  <Typography variant="caption">
                    {credit}/100
                    </Typography>
                </div>
              </CreditView>

              <HeaderMainLeft >

                <Avatar src={contest.matchDetail.localteam.image_path} variant="circle"></Avatar>
                <Typography variant="caption" style={{
                  fontWeight: 600,
                  margin: 10
                }}>
                  {contest.matchDetail.localteam.code}
                </Typography>


              </HeaderMainLeft>
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
                  {localTeam}
                </Typography>

                <Typography variant="caption" style={{
                  fontWeight: 600,
                  margin: 10
                }}>
                  {visitorTeam}
                </Typography>
              </div>
              <HeaderMainRight>

                <Typography variant="caption" style={{
                  fontWeight: 600,
                  margin: 10
                }}>
                  {contest.matchDetail.visitorteam.code}
                </Typography>
                <Avatar src={contest.matchDetail.visitorteam.image_path} variant="circle"></Avatar>

              </HeaderMainRight>

              <PlayerView>
                <div>

                  <Typography variant="caption" style={{
                    fontWeight: 600,
                    fontSize: '1rem',
                    margin: 10
                  }}>
                    Players
                    </Typography>
                </div>
                <div>

                  <Typography variant="caption">
                    {countp}/11
                    </Typography>
                </div>
              </PlayerView>
            </HeaderTop>
            <HeaderTop2 style={{ backgroundColor: "#00A826", color: "white" }}>
              <CreditView2>
                <div>

                  <Typography variant="caption" style={{
                    fontWeight: 600,
                    fontSize: '1em',
                    margin: 10
                  }}>
                    Credits
                    </Typography>
                </div>
                <div>

                  <Typography variant="caption" style={{
 
                     margin: 10
                  }}>
                    {credit}/100
                    </Typography>
                </div>
              </CreditView2>
            <div>

            </div>
              <PlayerView2>
                <div
                  style={{
                    textAlign: "end"
                  }}
                >

                  <Typography variant="caption" style={{
                    fontWeight: 600,
                    fontSize: '1rem',
                    margin: 10
                  }}>
                    Players
                    </Typography>
                </div>
                <div style={{
                    textAlign: "end"
                  }}>

                  <Typography variant="caption" style={{
                          
                          margin: 10
                          }}>
                    {countp}/11
                    </Typography>
                </div>
              </PlayerView2>
            </HeaderTop2>
          </div> :
          <div />}

      </Paper>
      <Paper  elevation={3} style={{
         marginTop: 10,
        display: !open ? "block" : "none"
      }}>
        <Tabs
          value={value}
          indicatorColor="secondary"
          textColor="primary"
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="on"
        >
          <Tab label={"Wk("+(Object.keys(Wicketkeeper).length)+")"} />
          <Tab label={"Bat("+(Object.keys(Batsman).length)+")"} />
          <Tab label={"AllR("+(Object.keys(Allrounder).length)+")"} />
          <Tab label={"Bowl("+(Object.keys(Bowler).length)+")"} />

        </Tabs>
      </Paper>
      </AppBar>
      

      <Duels style={{ width: "100%", border: "none",
     margin: '0px', padding: "0px",display: !open ? "block" : "none" }} >
        
      <Paper elevation={0} style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              padding: "10px",
              backgroundColor:"#F9F8FC"
            }}>
               
              <div elevation={0} style={{
                fontStyle: "italic",
                textAlign: 'end',
                backgroundColor:"#F9F8FC"
              }}>
                {value === 0 ? <Typography variant="caption">1-4 Wicketkeeper</Typography> : 
                 value === 1 ? <Typography variant="caption">3-6 Batsman</Typography> : 
                 value === 2 ? <Typography variant="caption">1-4 All rounder</Typography> :
                 <Typography variant="caption">3-6 Bowler</Typography>
                }
                
              
              </div>


            </Paper>
        
        <SingleHeadingTop
          style={{
            padding: '0px',
            margin: '0px',
          }}
        >
          <div style={{
            padding: '2.5px',
            margin: '5.5px',
          }}>

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
              alignItems: "center",

            }}>
              <Typography variant="caption">
                Name
              </Typography>

            </div>
          </DuelSingleRight>

          <DuelOptionRight  >
            <div style={{
              padding: '2.5px',
              margin: '5.5px',
              display: "flex",
              alignContent: "center",
              alignItems: "center",
              justifyContent:"center"
            }}>

              <Typography variant="caption">
                %Sel
              </Typography>
            </div>
            <div style={{
              padding: '2.5px',
              margin: '5.5px',
              display: "flex",
              alignContent: "center",
              alignItems: "center",
              justifyContent:"center"

            }}>

              <Typography variant="caption">
                Credits
              </Typography>
            </div>
            <div style={{
              padding: '2.5px',
              margin: '5.5px',
              display: "flex",
              alignContent: "center",
              alignItems: "center"
            }}>



            </div>

          </DuelOptionRight>
        </SingleHeadingTop>
      </Duels>







      <div style={!open && value === 0 ? { display: 'block', position: "relative", width: "100%" } : { display: 'none' }}>
        <Container maxWidth="md" style={{ padding: 5 }}>
          <Paper elevation={0} style={{
            marginBottom: 60,
            backgroundColor:"#F9F8FC"
          }} >
            {Object.keys(contest).length > 0 ? showWk() : <div />}
          </Paper>
        </Container>
      </div>
      <div style={!open && value === 1 ? { display: 'block', position: "relative", width: "100%" } : { display: 'none' }}>
        <Container maxWidth="md" style={{ padding: 5 }}>
          <Paper elevation={0} style={{
            marginBottom: 60,
            backgroundColor:"#F9F8FC"
          }} >
            {Object.keys(contest).length > 0 ? showBat() : <div />}
          </Paper>
        </Container>
      </div>

      <div style={!open && value === 2 ? { display: 'block', position: "relative", width: "100%" } : { display: 'none' }}>
        <Container maxWidth="md" style={{ padding: 5 }}>
          <Paper elevation={0} style={{
            marginBottom: 60,
            backgroundColor:"#F9F8FC"
          }} >
            {Object.keys(contest).length > 0 ? showAllR() : <div />}
          </Paper>
        </Container>
      </div>
      <div style={!open && value === 3 ? { display: 'block', position: "relative", width: "100%" } : { display: 'none' }}>
        <Container maxWidth="md" style={{ padding: 5 }}>
          <Paper elevation={0} style={{
            marginBottom: 60,
            backgroundColor:"#F9F8FC"
          }} >
            {Object.keys(contest).length > 0 ? showBowl() : <div />}
          </Paper>
        </Container>
      </div>
      
      
      <div style={open ? { display: 'block', position: "relative", width: "100%" } : { display: 'none' }}>
        <Container maxWidth="md" style={{ padding: 5 }}>
            <Paper elevation={0} style={{
              marginBottom: 60,
              backgroundColor:"#F9F8FC"
            }} >
              <List  >
                {prev()}
              </List>
            </Paper>
          </Container>
      </div>


      <AppBar position="fixed" style={{
        top: 'auto',
        bottom: 0,
      }}>
        <Toolbar style={{
          display: "flex",
          justifyContent: "center"
        }}>
          <div style={{
            width: 850,
            color: 'white',
            display: "flex",
            justifyContent: !open ? "flex-end" : "space-between"
          }}>


            <Button
              variant="outlined"
              color="secondary"
              style={{
                width: 150,
                color: 'white',
                marginRight:"10px",
                display: open ? "block" : "none"
              }}
              onClick={handleClose}
            >

              Back
            </Button>



            <Button
              variant="contained"
              color="secondary"
              style={countp !== 11 ? {  width: 150,
                color: 'white',
                backgroundColor: 'grey'
              } : {
                width: 150,
                color: 'white',
              }}
              disabled={countp !== 11 ? true : false}
              onClick={!open ? handleClickOpen : saveTeam}
            >
              {open ? "Save" : "Proceed"}
            </Button>
          </div>
        </Toolbar>
      </AppBar>

      

      <Notification message={message} open={openNotification} close={handleNotificationClose} />

 
    </Container>
    : <CircularProgress style={{
      position: "fixed",
      top: "50%",
      left: "50%"
    }} disableShrink />

  );
}