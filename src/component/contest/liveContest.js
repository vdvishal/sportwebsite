import React from 'react';
import ReactGA from 'react-ga';

import { useEffect, useContext } from 'react';

import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import Button from '@material-ui/core/Button';

import { makeStyles, withStyles,useTheme  } from '@material-ui/core/styles';

import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Fade from '@material-ui/core/Fade';

import LinearProgress from '@material-ui/core/LinearProgress';
import CircularProgress from '@material-ui/core/CircularProgress';

import * as api from '../../api/contest'
import { Divider, Avatar } from '@material-ui/core';


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
  

export default function ContestDetails(props) {

    const classes = useStyles();

    useEffect(() => {
      
        api.contestDetails(props.match.params.matchId,props.match.params.contestId,0)
        .then(response => {
            setContest(response.data.myTeam[0].contestDetails)
            setMyTeam(response.data.myTeam)
            setMatch(response.data.Match)
            setPlayers(response.data.FantasyPlayers)

        })

        api.leaderBoard(props.match.params.contestId,0)
        .then(response => { 
 
            setLeaderBoard(response.data.leaderBoard)
        })


    },[])

    
  const [contest, setContest] = React.useState({});
  const [leaders, setLeaderBoard] = React.useState("false");
  const [myTeams, setMyTeam] = React.useState(false);
  const [players, setPlayers] = React.useState([]);

  const [match, setMatch] = React.useState([]);

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const viewPrize = () => contest.prizeBreakUp.map(prize => {
    return <Paper
    elevation={0}
      style={{
        display:"flex",
        flexDirection:"row",
        width:"100%",
        justifyContent:"space-between"
      }}
    >
      <div>
        <Typography variant="caption" style={{fontWeight:700}}>
          #{prize.range}
        </Typography>
      </div>
      <div>
        <Typography variant="caption" style={{fontWeight:700}}>
          ₹{prize.prize}
        </Typography>
      </div>

    </Paper>
  })

  const viewLeaderBoard = () => leaders.map(leader => {
    return <Paper
    elevation={0}
      style={{
        display:"flex",
        flexDirection:"row",
        width:"100%",
        padding:5,
        justifyContent:"space-between"
      }}
    >
      <div style={{
        display:"flex",
        padding:5,
        flexDirection:"row",
        width:"100%",
        alignItems:"center"
      }}>
        <Avatar src={leader.userDetails.profilePic} circle />
        <Typography variant="caption" style={{fontWeight:700,marginLeft:10}}>
        {leader.teamDetails.teamName}
        </Typography>
      </div>
      <div
      style={{
        display:"flex",
        padding:5,
        flexDirection:"row",
        width:"100%",
        alignItems:"center",
        justifyContent:"flex-end"
      }}>
        <Typography variant="caption" style={{fontWeight:700}}>
          {leader.points}
        </Typography>
      </div>

    </Paper>
  })

  const myLeaderBoard = () => myTeams.map(leader => {
    return <Paper
    elevation={0}
      style={{
        display:"flex",
        flexDirection:"row",
        width:"100%",
        padding:5,
        backgroundColor:"#F5F6FA",
        justifyContent:"space-between"
      }}
    >
      <div style={{
        display:"flex",
        padding:5,
        flexDirection:"row",
        width:"100%",
        alignItems:"center"
      }}>
        <Avatar src={leader.userDetails.profilePic} circle />
        <Typography variant="caption" style={{fontWeight:700,marginLeft:10}}>
          {leader.teamDetails.teamName}
        </Typography>
      </div>
      <div
      style={{
        display:"flex",
        padding:5,
        flexDirection:"row",
        width:"100%",
        alignItems:"center",
        justifyContent:"flex-end"
      }}>
        <Typography variant="caption" style={{fontWeight:700}}>
          {leader.points}
        </Typography>
      </div>

    </Paper>
  })


  const viewPlayers = () => players.map(leader => {
    return <Paper
    elevation={0}
      style={{
        display:"flex",
        flexDirection:"row",
        width:"100%",
        padding:5,
        justifyContent:"space-between"
      }}
    >
      <div style={{
        display:"flex",
        padding:5,
        flexDirection:"row",
        width:"100%",
        alignItems:"center"
      }}>
        <Avatar src={leader.image_path} circle />
        <div style={{marginLeft:10}}>
            <Typography variant="caption" style={{fontWeight:700}}>
            {leader.firstname}
            </Typography>
            <br/>
            <Typography variant="caption" >
            {match.localteam.id === leader.teamId ? match.localteam.code :  match.visitorteam.code}
            </Typography>
        </div>

      </div>
      <div
      style={{
        display:"flex",
        padding:5,
        flexDirection:"row",
        width:"100%",
        alignItems:"center",
        justifyContent:"flex-end"
      }}>
        <Typography variant="caption" style={{fontWeight:700}}>
          {leader.points || 0}
        </Typography>
      </div>

    </Paper>
  })

    
  
 
    return (
      myTeams.length !== 0 && Object.keys(match).length !== 0 ? (
        <Container style={{ position: "relative", marginTop: 5, padding: 5 }} maxWidth='sm'>
        <Paper square className={classes.paper} elevation={2} style={{ 
            border: "1px solid #F5F6FA",
            backgroundColor: "white",
            margin: "0 0" }}
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
                  cursor:"pointer",borderRadius: 5,border:"1px solid #777777",
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

              {/* <Button size="small" onClick={() => joinFantasyContest(contest._id)} variant="contained" style={{
                backgroundColor: '#00A826',
                color: 'white'
              }}>₹{contest.entryFee}</Button> */}

            </span>
            <span style={{ padding: "2.5px",
            border:"2.5px solid #F8A017", 
            fontSize: "12px",
            marginTop:7,
            fontWeight:800,
            borderRadius:"50%",
            width:15,
            height:15,
            textAlign:"center",
             marginLeft: "auto",
             color:"#F8A017"
             }}>
              {contest.limit}
              </span>
          </div>
        </div>
      </div>
      <div className={classes.progress}>
        <ColorLinearProgress style={{ borderRadius: 0 }} variant="determinate" value={(contest.totalJoined/contest.totalSpots)* 100} />
      </div>
      <div className={classes.gridCard} style={{ backgroundColor:"#F5F6FA" }}>
        <div className={classes.gridCardContent}>
          <div className={classes.gridCardSubContent}>
            <span style={{ padding: "2.5px", fontSize: "12px", }}>
              <Typography variant="caption" style={{
                padding: "2.5px",
                fontSize: "12px", fontWeight: 500,
                color: "#ef8c22"
              }}>
            {contest.totalSpots - contest.totalJoined === 0 ?
           "Contest Full" : contest.totalSpots - contest.totalJoined + " spots left" }

 
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
    <Paper elevation={2} square style={{
          border: "1px solid #F5F6FA",
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
            <Tab label="Players" />
          </Tabs>

      </Paper>
      <Paper elevation={0}
      square
        style={{
          display:"flex",
          flexDirection:"column",
          padding:5,
          marginTop:5
        }}
      >
        <Paper
              elevation={0}
                style={{
                  display:"flex",
                  flexDirection:"row",
                  width:"100%",
                  justifyContent:"center"
                }}
              >
               <Typography variant="caption" style={{fontWeight:700,color:"grey"}}>
                  Ranks will be assigned at end of match
                </Typography>
        </Paper>
        {value === 0 && Object.keys(contest).length > 0 ? 
        <div>
          <Paper
        elevation={0}
          style={{
            display:"flex",
            flexDirection:"row",
            width:"100%",
            justifyContent:"space-between"
          }}
        >
          <div>
          <Typography variant="caption" style={{fontWeight:700,color:"grey"}}>
            Range
          </Typography>
        </div>
        <div>
          <Typography variant="caption" style={{fontWeight:700,color:"grey"}}>
            Prize
          </Typography>
        </div>
            
         </Paper>
         <Divider/>
         {viewPrize()} 
        </div>
        
         :
         <div />}
        {value === 1 ? 
                <div>
                <Paper
              elevation={0}
                style={{
                  display:"flex",
                  flexDirection:"row",
                  width:"100%",
                  justifyContent:"space-between"
                }}
              >
                <div>
                <Typography variant="caption" style={{fontWeight:700,color:"grey"}}>
                  Users
                </Typography>
              </div>
              <div>
                <Typography variant="caption" style={{fontWeight:700,color:"grey"}}>
                  Points
                </Typography>
              </div>
                  
               </Paper>
               <Divider />
               <Paper elevation={0} square>
                {myLeaderBoard()}
               </Paper>
               <Divider />
               {viewLeaderBoard()}
        </div>
        : <div />}
        {value === 2 ? 
        <div>
          <Paper
              elevation={0}
                style={{
                  display:"flex",
                  flexDirection:"row",
                  width:"100%",
                  justifyContent:"space-between"
                }}
              >
                <div>
                <Typography variant="caption" style={{fontWeight:700,color:"grey"}}>
                  Players
                </Typography>
              </div>
              <div>
                <Typography variant="caption" style={{fontWeight:700,color:"grey"}}>
                  Points
                </Typography>
              </div>
                  
               </Paper>
               <Divider />
               {viewPlayers()}
        </div>
        
        : <div />}
      </Paper>
    </Container>) :
      <CircularProgress style={{
        position: "fixed",
        top: "50%",
        left: "50%"
      }} disableShrink />
    )
  }