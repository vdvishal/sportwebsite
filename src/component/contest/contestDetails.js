/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-lone-blocks */
import React from 'react';
import ReactGA from 'react-ga';

import { useEffect } from 'react';
import styled from 'styled-components'
import { Link } from "react-router-dom";

import Pagination from '@material-ui/lab/Pagination';

import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Notification from '../common/notification'

import Button from '@material-ui/core/Button';
import RepeatIcon from '@material-ui/icons/Repeat';
import { makeStyles, withStyles, useTheme } from '@material-ui/core/styles';

import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import EditIcon from '@material-ui/icons/Edit';

import LinearProgress from '@material-ui/core/LinearProgress';
import CircularProgress from '@material-ui/core/CircularProgress';

import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';

import * as mqtt  from 'mqtt';

import * as api from '../../api/contest'
import * as team from '../../api/team'

import { Divider, IconButton, Dialog, Avatar, AppBar, Toolbar, Badge } from '@material-ui/core';
 

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

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
    }
  }
});

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
min-width:65px;
  text-align:center;
  margin:5px;
`



export default function ContestDetails(props) {

  const theme = useTheme();

  const classes = useStyles();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

  const [contest, setContest] = React.useState({});
  const [leaders, setLeaderBoard] = React.useState(null);
  const [myTeams, setMyTeam] = React.useState(false);
  const [players, setPlayers] = React.useState([]);

  const [match, setMatch] = React.useState([]);

  const [value, setValue] = React.useState(0);

  const [teamUser, setTeam] = React.useState([]);

  const [myLeader, setMyLeader] = React.useState([]);


  const [message, setMessage] = React.useState("false");
  const [openNotification, setOpenNotifi] = React.useState(false);

  const [openUserTeam, setopenUserTeam] = React.useState(false);
  const [openSelectTeam, setOpenTeamSelect] = React.useState(false);
  const [openSelectTeam2, setOpenTeamSelect2] = React.useState(false);

  const [fanId, setFantasyId] = React.useState('');

  const [, setBet] = React.useState(0);

  const [teamList, setTeamList] = React.useState([]);

  const [prevTeam, setPrev] = React.useState('');

  const [size, setSize] = React.useState('');

  const [activePage, setActivePage] = React.useState(1);

  
  const [openTeam, setTeamOpen] = React.useState(false);
  const [wait, setWait] = React.useState(false);
  const [disableButton, setDisableButton] = React.useState(false);

  useEffect(() => {
    ReactGA.pageview(props.location.pathname);

    api.contestDetails(props.match.params.matchId, props.match.params.contestId, 0)
      .then(response => {
        setContest(response.data.myTeam[0].contestDetails)
        setMyTeam(response.data.myTeam)
        setMyLeader(response.data.leaderBoard)

        setMatch(response.data.Match)
        setPlayers(response.data.FantasyPlayers)

      })

    api.leaderBoard(props.match.params.contestId, 1)
      .then(response => {
        console.log(response.data.data);
        
        setLeaderBoard(response.data.data);
        setSize(response.data.size)
      })

      const options = {
         // clientId uniquely identifies client
        // choose any string you wish
        clientId: "MQTT_CLIENT_" + new Date().getTime()
    };
  
    var client  = mqtt.connect('wss://mqtt.fantasyjutsu.com:8083/mqtt', options);
    client.on('connect', function(){
      console.log('ws connected')
  })

  client.on('reconnect', function(){
    console.log('ws connected')
})
    client.subscribe(props.match.params.contestId)

    client.on('message', function (topic, message) {
      // Updates React state with message 
     console.log(JSON.parse(message));
     let data= JSON.parse(message)
      setLeaderBoard(data.leader);

     });
      return () => {
        // HERE I WANT TO UNSUBSCRIBE WHEN THE COMPONENT UNMOUNT 
         client.unsubscribe(props.match.params.contestId)
      }
  }, [])



  const handleChange = (event, newValue) => {
    setValue(newValue);
    if(newValue === 1){
        api.leaderBoard(props.match.params.contestId, 1)
        .then(response => {
          console.log(response.data.data);
          
          setLeaderBoard(response.data.data);
          setSize(response.data.size)
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

  const handleTeamOpen = () => {
    setWait(true)
    team.getAllUserTeam(props.match.params.matchId).then(response => {
      setWait(false)
      if (response.status === 202) {
        handleNotificationClick(response.data.message)
      } else {
        setTeamOpen(true);
        setTeamList(response.data);

      }
    })
  };

  const handleTeamClose = () => {
    setOpenTeamSelect(false)
    setTeamOpen(false)
    setOpenTeamSelect2(false);

  };

  const showTeamUser = (id) => {
    setTeam([])
    if (new Date(match.starting_at).getTime() > Date.now() ) {
      return handleNotificationClick("Teams can viewed after match has started")
    }
    setopenUserTeam(true)

    team.userTeamGet(id, props.match.params.matchId).then(response => {
      if (response.status !== 200) {
        return handleNotificationClick(response.data.message)
      }

      setTeam(response.data)
    })
  }

  const showMyTeam = (id) => {
    setTeam([])
 
    setopenUserTeam(true)

    team.userTeamGet(id, props.match.params.matchId).then(response => {
      if (response.status !== 200) {
        return handleNotificationClick(response.data.message)
      }

      setTeam(response.data)
    })
  }

  const showTeam = () => teamUser.FantasyPlayers.map((leader, index) => {
    return <div
      key={`${index}_players`}
    > <Paper
      elevation={0}
      style={{
        display: "flex",
        flexDirection: "row",
        minWidth: fullScreen ? "" : 435,
        padding: 5,
        justifyContent: "space-between"
      }}
    >
        <div style={{
          display: "flex",
          padding: 5,
          flexDirection: "row",
          // width: "100%",
          alignItems: "center"
        }}>
          {leader.viceCaptain || leader.captain ?
            <Badge
              overlap="circle"
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              badgeContent={leader.viceCaptain ? "VC" : "C"}
              color="error"
              style={{ height: "50px", width: "50px", alignSelf: "center" }}
            >
              <Avatar src={leader.image_path} style={{ height: "50px", width: "50px", alignSelf: "center" }} variant="circle" />
            </Badge> : <Avatar src={leader.image_path} style={{ height: "50px", width: "50px", alignSelf: "center" }} variant="circle" />
          }
          <div style={{ marginLeft: 10 }}>
            <Typography variant="caption" style={{ fontWeight: 700 }}>
              {leader.firstname}
            </Typography>
            <br />
            <Typography variant="caption" >
              {match.localteam.id === leader.teamId ? match.localteam.code : match.visitorteam.code}
            </Typography>
            <br />
            <Typography variant="caption" >
              {leader.position.name.slice(0, 3)}
            </Typography>
          </div>

        </div>
        <div
          style={{
            display: "flex",
            padding: 5,
            flexDirection: "row",
            // width: "100%",
            alignItems: "center",
            justifyContent: "flex-end"
          }}>
          <Typography variant="caption" style={{ fontWeight: 500,color:'grey' }}>
            {leader.points || 0}
          </Typography>
        </div>

      </Paper>
      <Divider />
    </div>
  })


  const getTeam = (matchId, prevTeam) => {
    setWait(true)
    team.getAllUserTeam(matchId).then(response => {
      setWait(false)

      if (response.status === 202) {
        handleNotificationClick(response.data.message)
      } else {
        setOpenTeamSelect(true);
        setTeamList(response.data);
        setPrev(prevTeam)
      }
    })
  }

  const joinFantasyContest = (id, fee) => {
    setFantasyId(id);
    setOpenTeamSelect2(true);
    setBet(fee);
    team.getAllUserTeam(props.match.params.matchId).then(response => {
      setWait(false)

      if (response.status === 202) {
        handleNotificationClick(response.data.message)
      } else {

        setTeamList(response.data);

      }
    })
  }

  const confirmJoinFantasyContest = (teamId) => {
    let obj = {
      matchId: parseInt(match.id),
      contestId: props.match.params.contestId,
      teamId: teamId,
      prevTeam: prevTeam
    }

    api.patchFantasyContest(obj).then(response => {

      handleNotificationClick(response.data.message)
      handleTeamClose()

      api.contestDetails(props.match.params.matchId, props.match.params.contestId, 0)
        .then(response => {
          setContest(response.data.myTeam[0].contestDetails)
          setMyTeam(response.data.myTeam)
          setMatch(response.data.Match)
          setPlayers(response.data.FantasyPlayers)

        })

    })
  }

  const confirmJoinFantasyContest2 = (teamId) => {

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

        setBet(0)
        window.location.reload()
      })
    }
  }

  const viewPrize = () => contest.prizeBreakUp.map((prize, index) => {
    return <Paper key={index}
      elevation={0}
      style={{
        display: "flex",
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between"
        , margin: "10px 0"
      }}
    >
      <div>
        <Typography variant="caption" style={{ fontWeight: 465, padding: 10 }}>
          #{prize.range}
        </Typography>
      </div>
      <div>
        <Typography variant="caption" style={{ fontWeight: 465, padding: 10, margin: "10px 0" }}>
          ₹{prize.prize}
        </Typography>
      </div>

    </Paper>
  })

  const viewLeaderBoard = () => leaders.map(leader => {
    console.log('-----------',leader);
    // console.log('-----------',Date.now());
    return leader.users.map(user => <Paper key={user._id + "K"}
      elevation={0}
      style={{
        display: "grid",
        // flexDirection: "row",
        padding: 5,
        gridTemplateColumns: "144px 1fr 1fr"
        // justifyContent: "space-between"
      }}

      onClick={() => { return(user.teamDetails ? showTeamUser(user.teamDetails._id) : '') }}
    >

      <div style={{
        display: "flex",
        padding: 5,
        flexDirection: "row",
        alignItems: "center"
      }}>
        <Avatar src={user.userDetails.profilePic} />
        <Typography variant="caption" style={{ 
          fontWeight: 700,
          overflow:"hidden",
          textOverflow:"ellipsis", marginLeft: 10 }}>
          { user.teamDetails ? user.teamDetails.teamName : user.userDetails.userName} (T{ user.teamDetails ? user.teamDetails.serialNumber : 0})
          </Typography>
      </div>
      <div
        style={{
          display: "flex",
          padding: 5,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-end"
        }}>
        <Typography variant="caption" style={{ fontWeight: 500,color:'grey' }}>
          {user.points ? `${user.points} points` : "--"}
        </Typography>
      </div>

      <div
        style={match.isLive === true ||( match.isLive === false && match.status === "Finished" )? // && new Date(match.starting_at).getTime() < Date.now() ?
          {
            display: "flex",
            padding: 5,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-end"
          } : {
            display: "none"
          }}>
        <Typography variant="caption" style={{ fontWeight: 700 }}>
          #{leader.rank}
        </Typography>
      </div>

    </Paper>)
  })

  const myLeaderBoard = () => {


    if ( new Date(match.starting_at).getTime() < Date.now() ) {
      return myLeader.map(leader => {
         
        return leader.users.map(user => {
          return <Paper key={user._id}
            elevation={0}
            style={{
              display: "flex",
              flexDirection: "row",
              padding: 5,
              justifyContent: "space-between"
            }}

            onClick={() => { showMyTeam(user.teamDetails._id) }}
          >

            <div style={{
              display: "flex",
              padding: 5,
              flexDirection: "row",
              alignItems: "center"
            }}>
              <Avatar src={user.userDetails.profilePic} />
              <Typography variant="caption" style={{ fontWeight: 700, marginLeft: 10 }}>
                {user.teamDetails.teamName} (T{user.teamDetails.serialNumber})
          </Typography>
            </div>
            <div
              style={{
                display: "flex",
                padding: 5,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-end"
              }}>
              <Typography variant="caption" style={{ fontWeight: 500,color:'grey' }}>
                {user.points ? `${user.points} points` : "--"}
              </Typography>
            </div>

            <div
              style={  // && new Date(match.starting_at).getTime() < Date.now() ?
                {
                  display: "flex",
                  padding: 5,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "flex-end"
                }}>
              <Typography variant="caption" style={{ fontWeight: 700 }}>
                #{leader.rank}
              </Typography>
            </div>

          </Paper>
        })
      })
    } else {
      return myTeams.map(leader => {
        return <Paper key={leader._id}
          elevation={0}
          style={{
            display: "flex",
            flexDirection: "row",
            padding: 5,
            // backgroundColor:"#F5F6FA",
            justifyContent: "space-between"
          }}
        >
          <div style={{
            display: "flex",
            padding: 5,
            flexDirection: "row",
            alignItems: "center"
          }}
          onClick={() => { showMyTeam(leader.teamDetails._id) }}

          >
            <Avatar src={leader.userDetails.profilePic} />
            <Typography variant="caption" style={{ fontWeight: 700, marginLeft: 10 }}>
              #{leader.teamDetails.serialNumber} {leader.teamDetails.teamName}
            </Typography>
          </div>
          <div
            style={{
              display: "flex",
              padding: 5,
              flexDirection: "row",

              alignItems: "center",
              justifyContent: "flex-end"
            }}>
            {
              <RepeatIcon style={{ cursor: "pointer" }} onClick={() => getTeam(match.id, leader._id)} />
            }
            {/* <RepeatIcon style={{cursor:"pointer"}} onClick={() => getTeam(match.id,leader._id)} /> */}
          </div>

        </Paper>
      })
    }

  }

 

  const viewJoinTeam = () => teamList.map(team => (
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
                style={{ height: "50px", width: "50px", alignSelf: "center" }}
              >
                <Avatar src={team.captain.image_path} style={{ height: "50px", width: "50px", alignSelf: "center" }} variant="circle" />
              </Badge>

              <Typography variant="caption">
                {team.captain.firstname[0] + ". " + team.captain.lastname}
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
                style={{ height: "50px", width: "50px", alignSelf: "center" }}
              >
                <Avatar src={team.viceCaptain.image_path} style={{ height: "50px", width: "50px" }} variant="circle" />
              </Badge>

              <Typography variant="caption">
                {team.viceCaptain.firstname[0] + ". " + team.viceCaptain.lastname}
              </Typography>

              <Typography variant="caption">
                {team.viceCaptain.position.name}
              </Typography>
            </TeamCommonPlayer>
          </TeamCommon>
          <TeamCommon style={{ justifyContent: "flex-end", alignItems: "center", color: "white" }}>
            <Button color="secondary" variant="contained" style={{ color: "white" }} onClick={() => confirmJoinFantasyContest(team._id)}>Join</Button>
          </TeamCommon>
        </TeamCard>
      </Paper>

    </ListItem>

  ))

  const viewJoinTeam2 = () => teamList.map(team => (
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
                {team.captain.fullname}
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
                {team.viceCaptain.fullname}
              </Typography>
            </TeamCommonPlayer>
          </TeamCommon>
          <TeamCommon style={{ justifyContent: "flex-end", alignItems: "start", color: "white" }}>
            <Button color="secondary" variant="contained" style={{ color: "white" }} onClick={() => confirmJoinFantasyContest2(team._id)}>Join</Button>
          </TeamCommon>
        </TeamCard>
      </Paper>

    </ListItem>
  ))

  const viewmyTeam = () => teamList.map(team => (
    <ListItem style={{ padding: 0 }} key={team._id}>
      <Paper className={classes.paper} elevation={2} style={{ margin: "2.5px 0", padding: "0", 
      // width: "100%" 
      }}>
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
                style={{ height: "50px", width: "50px", alignSelf: "center" }}
              >
                <Avatar src={team.captain.image_path} style={{ height: "50px", width: "50px", alignSelf: "center" }} variant="circle" />
              </Badge>

              <Typography variant="caption">
                {team.captain.firstname[0] + ". " + team.captain.lastname}
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
                style={{ height: "50px", width: "50px", alignSelf: "center" }}
              >
                <Avatar src={team.viceCaptain.image_path} style={{ height: "50px", width: "50px" }} variant="circle" />
              </Badge>

              <Typography variant="caption">
                {team.viceCaptain.firstname[0] + ". " + team.viceCaptain.lastname}
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

  const page = (event, pageNum) => {
    setActivePage(setActivePage);
    api.leaderBoard(props.match.params.contestId, pageNum)
      .then(response => {
        setLeaderBoard(response.data.data);
      })
  }

  return (
    myTeams.length !== 0 && Object.keys(match).length !== 0 ? (
      <div>
        <Container style={match.isLive !== true && match.status !== "Finished" ? { position: "relative", marginTop: 5, padding: 5, marginBottom: 65 } : { position: "relative", marginTop: 5, padding: 5 }} maxWidth='md'>
          <Notification message={message} open={openNotification} close={handleNotificationClose} />

          <Paper elevation={3} className={classes.paper}  style={{
            border: "1px solid #F5F6FA",
            backgroundColor: "white",
            margin: "0 0"
          }}
            key={contest._id}>
            <div className={classes.gridCard}>
              <div className={classes.gridCardContent}>
                {/* <Link to = {{pathname:`/contest/details/${contest._id}`,
                                }}  style={{ textDecoration: 'none' }}> */}
                <div className={classes.gridCardSubContent}>

                  <span
                    style={{ padding: "5px", fontSize: "12px", color: "#777777" }}>
                    <Typography variant="caption">
                      Prize Pool

                          </Typography>
                  </span>
                  <span className={classes.gridCardTeamText}
                  // onClick={() => {setBreakDown(contest.prizeBreakUp);setOpenPrizePool(true)}}
                  >
                    <Typography variant="caption"
                      style={{
                        fontWeight: "700",
                        padding: "5px 10px",
                        cursor: "pointer", borderRadius: 5, border: "1px solid #777777",
                        fontSize: "15px"
                      }}>
                      ₹{contest.prizePool}

                    </Typography>

                  </span>
                  <span style={{ padding: "2.5px", fontSize: "14px", color: "black" }}>
                    <Typography variant="caption">
                      {contest.totalWinners} Winner

                          </Typography>
                  </span>
                </div>
                {/* </Link> */}
                <div className={classes.gridCardSubContent}>
                  <span style={{ padding: "2.5px", fontSize: "12px", marginLeft: "auto", color: "#777777" }}>
                    Entry
            </span>
                  <span style={{ padding: "2.5px", fontSize: "12px", marginLeft: "auto" }}>

                    {
                      (match.isLive === undefined) || (match.isLive !== true && match.status !== "Finished")
                        ? <Button size="small" onClick={() => joinFantasyContest(contest._id, contest.entryFee)} variant="contained" style={{
                          backgroundColor: '#77BC37',
                          color: 'white'
                        }}>₹{contest.entryFee}</Button> : <div />}

                  </span>
                  <span style={{
                    padding: "2.5px",
                    border: "1.5px solid #F8A017",
                    fontSize: "12px",
                    marginTop: 7,
                    fontWeight: 500,
                     borderRadius:5,
                    minWidth: 15,
                    height: 15,
                    textAlign: "center",
                    marginLeft: "auto",
                    color: "#F8A017"
                  }}>
                    {contest.limit}
                  </span>
                </div>
              </div>
            </div>
            <div className={classes.progress}>
            {
        match && new Date(match.starting_at).getTime() > Date.now() ?
        <div className={classes.progress}>
        <ColorLinearProgress style={{ borderRadius: 0 }} variant="determinate" value={(contest.totalJoined / contest.totalSpots) * 100} />
      </div> :
      <div />
      
      }
              
            </div>
            <div className={classes.gridCard} style={{ backgroundColor: "#F5F6FA" }}>
              <div className={classes.gridCardContent}>
                <div className={classes.gridCardSubContent}>
                  <span style={{ padding: "2.5px", fontSize: "12px", }}>
                    <Typography variant="caption" style={{
                      padding: "2.5px",
                      fontSize: "12px", fontWeight: 500,
                      color: "#ef8c22"
                    }}>
                      {}


    {
        match && new Date(match.starting_at).getTime() > Date.now() ?
        
        contest.totalSpots - contest.totalJoined === 0 ?
        "Contest Full" : contest.totalSpots - contest.totalJoined + " spots left" : contest.totalJoined + " joined"
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
                      {contest.totalSpots} spots

                          </Typography>



                  </span>
                </div>
              </div>
            </div>

          </Paper>
          <Paper elevation={2}  style={{
            border: "1px solid #F5F6FA",
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
              <Tab label="Prize BreakUp" />
              <Tab label="Leaderboard" />
              {/* <Tab label="Players" /> */}
              <Tab label="My Teams" />
            </Tabs>

          </Paper>
          <Paper elevation={0}
            
            style={{
              display: "flex",
              flexDirection: "column",
              padding: 5,
              marginTop: 5,

            }}
          >
            {/* <Paper
              elevation={0}
                style={{
                  display:"flex",
                  flexDirection:"row",
                  width:"100%",
                  justifyContent:"center"
                }}
              >
                {match.status === "Finished" ? <Typography variant="caption" style={{fontWeight:700,color:"grey"}}>
                  Contest Finished
                </Typography>
               : <Typography variant="caption" style={{fontWeight:700,color:"grey"}}>
                  Ranks will be assigned at end of match
                </Typography>}
        </Paper> */}
            {value === 0 && Object.keys(contest).length > 0 ?
              <div>
                <Paper
                  elevation={0}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    width: "100%",
                    justifyContent: "space-between"
                  }}
                >
                  <div>
                    <Typography variant="caption" style={{ fontWeight: 700, color: "grey" }}>
                      Range
          </Typography>
                  </div>
                  <div>
                    <Typography variant="caption" style={{ fontWeight: 700, color: "grey" }}>
                      Prize
          </Typography>
                  </div>

                </Paper>
                <Divider />
                {viewPrize()}
              </div>

              :
              <div />}
            {value === 1 ?
              <div>
                <Paper
                  elevation={0}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    width: "100%",
                    justifyContent: "space-between"
                  }}
                >
                  <div>
                    <Typography variant="caption" style={{ fontWeight: 700, color: "grey" }}>
                      Users
                </Typography>
                  </div>
                  <div>
                    <Typography variant="caption" style={{ fontWeight: 700, color: "grey" }}>
                      Rank
                </Typography>
                  </div>

                </Paper>
                <Divider />
                <Paper elevation={0} square>
                  {/* {myLeaderBoard()} */}
                </Paper>
                <Divider />
                {leaders === null ? <CircularProgress style={{
                  position: "fixed",
                  top: "50%",
                  left: "50%"
                }} disableShrink /> :  leaders.length > 0 ? viewLeaderBoard() : <div />}

                <div style={{ display: "flex", justifyContent: "center" }}>
                  <div  >
                    <Pagination count={Math.ceil(size / 10)} defaultPage={activePage} variant="outlined" onChange={page}  color="secondary" />
                  </div>
                </div>

              </div>
              : <div />}
            {/* {value === 2 ?
              <div>
                <Paper
                  elevation={0}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    width: "100%",
                    justifyContent: "space-between"
                  }}
                >
                  <div>
                    <Typography variant="caption" style={{ fontWeight: 700, color: "grey" }}>
                      Players
                </Typography>
                  </div>
                  <div>
                    <Typography variant="caption" style={{ fontWeight: 700, color: "grey" }}>
                    { new Date(match.starting_at).getTime() < Date.now() ? 
            "Points" : "Credit"}
                </Typography>
                  </div>

                </Paper>
                <Divider />
                {viewPlayers()}
              </div>

              : <div />} */}

            {value === 2 ?
              <div>
                <Paper
                  elevation={0}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    width: "100%",
                    justifyContent: "space-between"
                  }}
                >
                  <div>
                    <Typography variant="caption" style={{ fontWeight: 700, color: "grey" }}>
                      Users
                </Typography>
                  </div>
                  <div>
                    <Typography variant="caption" style={{ fontWeight: 700, color: "grey" }}>
                      Rank
                </Typography>
                  </div>

                </Paper>
                <Divider />
                <Paper elevation={0} square>
                  {myLeaderBoard()}
                </Paper>
                 

              </div>
              : <div />}

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
                <Link

                  to={{ pathname: `/team/${props.match.params.matchId}` }} style={{ textDecoration: 'none' }}>

                  <Button
                    variant="text"
                    color="secondary"
                    style={{
                      width: 150,
                      color: 'white',
                      margin: '5px',
                      position: "absolute",
                      top: 8,
                      right: 0
                    }}
                  >

                    Create Team
              </Button>
                </Link>

              </AppBar>
              <Container maxWidth="md" style={{ padding: 10 }}>
                <Paper elevation={0} style={{
                  marginBottom: 60
                }} >
                  <List style={fullScreen ? { minWidth: 0 } : teamList.length > 0 ? { minWidth: 469 } : { minWidth: 0 }}>
                    {teamList.length > 0 ? viewJoinTeam() :
                      <div />
                    }
                  </List>
                </Paper>


              </Container>

            </Dialog>

            <Dialog fullScreen={fullScreen} open={openSelectTeam2} onClose={handleTeamClose} TransitionComponent={Transition}>
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
                <Paper elevation={0} style={{
                  marginBottom: 60
                }} >
                  <List style={fullScreen ? { minWidth: 0 } : teamList.length > 0 ? { minWidth: 469 } : { minWidth: 0 }}>
                    {teamList.length > 0 ? viewJoinTeam2() :
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
                </Paper>
              </Container>


            </Dialog>


            <Dialog fullScreen={fullScreen} 
               
              open={openUserTeam}
              onClose={() => setopenUserTeam(false)}
              TransitionComponent={Transition}>
              <AppBar style={{
                minWidth:220,
                alignSelf: "center", textAlign: "center"
              }} color="secondary" position={"relative"} className={classes.appBar}>
                <Toolbar style={{
                  textAlign: 'center'
                }} >
                  <IconButton edge="start" style={{ color: "white" }} onClick={() => setopenUserTeam(false)} aria-label="close">
                    <CloseIcon />
                  </IconButton>
                  <Typography variant="h6" style={{ color: "white" }} className={classes.title}>
                    #{teamUser.serialNumber} {teamUser.teamName}
                  </Typography>
                </Toolbar>
                <Typography variant="caption" style={{ color: "white" }} className={classes.title}>
                  Total Points
                <br />
                  {teamUser.totalPoints}
                </Typography>
              </AppBar>
              <div style={{
                width:"100%", 
                alignSelf: "center"
              }}>
                <Paper
                  elevation={0}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    padding:3,
                    
                    justifyContent: "space-between"
                  }}
                >
                  <div>
                    <Typography variant="caption" style={{ fontWeight: 700, color: "grey" }}>
                      Players
                </Typography>
                  </div>
                  <div>
                    <Typography variant="caption" style={{ fontWeight: 700, color: "grey" }}>
                      Points
                </Typography>
                  </div>

                </Paper>
                <Divider />
                {teamUser !== undefined && teamUser.FantasyPlayers !== undefined && teamUser.FantasyPlayers.length > 0 ? showTeam() :
                <div style={{
                  minHeight:100,
                  width:"100%"
                }}>
                   <CircularProgress style={{
                  position: "fixed",
                  top: "50%",
                  left: "47%",
                 
                }} disableShrink />
                
                </div>}
              </div>

            </Dialog>

          </Paper>

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
              <Paper elevation={0} style={{
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
              </Paper>
            </Container>


          </Dialog>


        </Container>
        {wait ? <CircularProgress style={{
          position: "fixed",
          top: "50%",
          left: "50%"
        }} disableShrink /> : <div />}
        {match.isLive === undefined || (match.isLive !== true && match.status !== "Finished") ?
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
      </div>

    ) :
      <CircularProgress style={{
        position: "fixed",
        top: "50%",
        left: "50%"
      }} disableShrink />
  )
}