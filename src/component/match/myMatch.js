/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-lone-blocks */
import React from 'react';
import ReactGA from 'react-ga';

import  {  useEffect,useContext } from 'react';
import * as color from '../../json/color.json'

import Pagination from '@material-ui/lab/Pagination';

import CircularProgress from '@material-ui/core/CircularProgress';
import styled from 'styled-components'

import Container from '@material-ui/core/Container';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
  
import { Paper, Divider, Typography, Avatar,Button } from '@material-ui/core';

import { ModeContext } from '../../App';

// Other modules
import Countdown from 'react-countdown';


// API
import * as api from '../../api/match'


import { Link,useHistory, Redirect } from 'react-router-dom';

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


const SDiv = styled.div`
transition: transform .2s;
cursor:pointer;
min-width:260px;
background-color:#FFFFF;
&:hover {
    transform: scale(1.025);
    box-shadow:0 0 0.52em 0 rgba(0,0,0,0.15)
}
`;
 

const EDIV = styled.div`
height: 50vh;
text-align: center;
margin-top: 100px;
font-weight: 500;
 
`;
 

 

 
  
export default function MyMatch(props) {
    let history = useHistory();
    const [matches, setMatches] = React.useState([]);
    const [resp, setresp] = React.useState(0);
    const [wait, setWait] = React.useState(false);

    const [mode, setMode] = useContext(ModeContext)


    const [value, setValue] = React.useState(0);

    const [page, setPage] = React.useState(null);

    const [activePage, setActivePage] = React.useState(1);

    const [gameType, setGameType] = React.useState(0);

    useEffect(() => {
      ReactGA.pageview(props.location.pathname);
      window.scrollTo(0,0)
        api.myMatch(1,page,gameType+1).then(response => {
            setresp(200)
            
            setMatches(response.data.data || [])
        }).catch(err => {
           if(err && err.response){
            if(err.response.status === 500){
              history.push('/')
            }
          }
        })
    },[]);
 
const handleGameChange  = (event, newValue) => {
      setWait(true)
      setMatches([])
      setGameType(newValue)
      api.myMatch(value+1,1,newValue+1).then(response => {
        console.log(response);
          setresp(200)
          setWait(false)
          setPage(response.data.page)
          
          setMatches(response.data.data || [])
      }).catch(err => {
        console.log(err);
        if(err && err.response){
          setresp(err.response.status)
        }

      })
    }

 const handleChange = (event, newValue) => {
      setWait(true)
      setMatches([])
      
      setValue(newValue);
      setActivePage(1)
      
      api.myMatch(newValue+1,1,gameType+1).then(response => {
        console.log(response);
          setresp(200)
          setWait(false)
          setPage(response.data.page)
          
          setMatches(response.data.data || [])
      }).catch(err => {
        console.log(err);
        if(err && err.response){
          setresp(err.response.status)
        }

      })
    };

    const handlePage = (event,page) => {
      setWait(true)
      setMatches([])
      setActivePage(page)
      
      api.myMatch(value+1,page,gameType+1).then(response => {
        console.log(response);
          setresp(200)
          setWait(false)
         
          
          setMatches(response.data.data || [])
      }).catch(err => {
        console.log(err);
        if(err && err.response){
          setresp(err.response.status)
        }

      })
    }
  
    const viewCompMatch = () => matches.map(match => <div
 
      key={match._id}
    >
      <SDiv>
        <Paper elevation={1}
          style={{
            height: 'auto',
            padding: 10,
            margin: "10px 0",
            borderRadius:5,
            
            
          }}
        >
          <Link to={{
            pathname: `/contest/mymatch/${match.id}`,
            state: {
              matchInfo: match
            }
          }}
            style={{
              textDecoration: 'none',
            }}
          >
            <Paper elevation={0}
              style={{
                height: 25,
                fontSize: '0.75rem',
                 
                
              }}
            >
              {match.league.name}
            </Paper>
            <Divider />
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: 'space-between',
                alignItems: "center",
  
              }}
            >
              <div
                style={{
                  width: "100%",
                }}
              >
                <Paper elevation={0}
                  style={{
  
                    height: 'auto',
                    margin: 20,
                    fontWeight: 600,
                     
                    
                  }}
                >
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
                        justifyContent: "space-between"
                      }}
                    >
  
                      <Avatar src={match.localteam.image_path} variant="square"></Avatar>
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
                        justifyContent: "space-between",
                        marginBottom: "3.5px"
                      }}
                    >
                      <Typography variant="caption">
                            {match.note}
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
                      <Avatar src={match.visitorteam.image_path} variant="square"></Avatar>
  
                    </div>
                  </div>
  
                </Paper>
  
  
              </div>
  
  
  
            </div>
          </Link>
        </Paper>
      </SDiv>
       
    </div>)
  
    const viewUpcMatch = () => matches.map(match => <div
 
      key={match._id}
    >
      <SDiv>
        <Paper elevation={1}
          style={{
            height: 'auto',
            padding: 10,
            margin: "10px 0",
            borderRadius:5,
           
            }}
        >
          <Link to={{
            pathname: `/contest/mymatch/${match.id}`,
            state: {
              status:"upcoming"
            }
          }}
            style={{
              textDecoration: 'none',
            }}
          >
            <Paper elevation={0}
              style={{
                height: 25,
                fontSize: '0.75rem',
               
                
              }}
            >
              {match.league.name}
            </Paper>
            <Divider />
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: 'space-between',
                alignItems: "center",
  
              }}
            >
              <div
                style={{
                  width: "100%",
                }}
              >
                <Paper elevation={0}
                  style={{
  
                    height: 'auto',
                    margin: 20,
                    fontWeight: 600,
                    
                    
                  }}
                >
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
                        justifyContent: "space-between"
                      }}
                    >
  
                      <Avatar src={match.localteam.image_path} variant="square"></Avatar>
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
                        justifyContent: "space-between",
                        marginBottom: "3.5px",
                        color:"#77BC37"
                      }}
                    >
                      <Typography variant="caption" style={{ margin: "3px 5px", fontWeight: 600 }}>
                    <Countdown 
                     
                     date={match.starting_at ? match.starting_at : match.starting_at} 
                     daysInHours={false} />
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
                      <Avatar src={match.visitorteam.image_path} variant="square"></Avatar>
  
                    </div>
                  </div>
  
                </Paper>
  
  
              </div>
  
  
  
            </div>
          </Link>
        </Paper>
      </SDiv>
       
    </div>)
  

    const viewLiveMatch = () => { return matches.length > 0 ? (matches.map(match => {
      return(<div
 
      key={match._id}
    >
      <SDiv>
        <Paper elevation={1}
          style={{
            height: 'auto',
            padding: 10,
            margin: "10px 0",
            borderRadius:5,
             
 
          }}
        >
          <Link to={{
            pathname: `/contest/mymatch/${match.id}`,
            state: {
              status:"upcoming"
            }
          }}
            style={{
              textDecoration: 'none',
            }}
          >
            <Paper elevation={0}
              style={{
                height: 25,
                fontSize: '0.75rem',
                 
                
              }}
            >
              {match.league.name}
            </Paper>
            <Divider />
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: 'space-between',
                alignItems: "center",
  
              }}
            >
              <div
                style={{
                  width: "100%",
                }}
              >
                <Paper elevation={0}
                  style={{
  
                    height: 'auto',
                    margin: "20px 0px",
                    fontWeight: 600,
                     
                    
                  }}
                >
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
                        justifyContent: "space-between"
                      }}
                    >
  
                      <Avatar src={match.localteam.image_path} variant="square"></Avatar>

  
  
                    </div>
  
                    <div
                      style={{
                        display: "flex",
                        flexDirection: 'row',
                        alignContent: "center",
                        alignItems: "center",
                        justifyContent: "space-between",
                        margin: "3.5px 14px",
                        width:"100%"
                      }}
                    >
                        <div>
                        <Typography variant="caption" style={{
                        fontWeight: 600,
 
                      }}>
                        {match.localteam.code}
                      </Typography>
                        {
                          match.scoreboards ? 
                          match.scoreboards.map(inn => {
                            if(match.localteam.id === inn.team_id && inn.total !== 0){
                              return(<div key={match.localteam.id}>

                              <Typography variant="caption">
                                {inn.total}/{inn.wickets}
                              </Typography>
                              <br/>
                              <Typography variant="caption">
                                {inn.overs} overs
                              </Typography>
                              </div>)
                            } 
                          }) : <div />
                        }
                        </div>

                        <div style={{
                        fontWeight: 600,
                        textAlign: "end"
                      }}>
                        <Typography variant="caption" style={{
                        fontWeight: 600,
                        textAlign: "end"
                      }}>
                        {match.visitorteam.code}
                      </Typography>
                        {
                          match.scoreboards ? 
                          match.scoreboards.map(inn => {
                            if(match.visitorteam.id === inn.team_id && inn.total !== 0){
                              return(<div key={match.visitorteam.id} style={{
                              textAlign: "end"
                            }}>

                              <Typography variant="caption">
                                {inn.total}/{inn.wickets}
                              </Typography>
                              <br/>
                              <Typography variant="caption">
                                {inn.overs} overs
                              </Typography>
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
  

                      <Avatar src={match.visitorteam.image_path} variant="square"></Avatar>
  
                    </div>
                  </div>
  
                </Paper>
  
  
              </div>
  
  
  
            </div>
          </Link>
        </Paper>
      </SDiv>
       
    </div>)})) : <div />}
  
  const redirectUser = () => {
    history.push('/')
  }

    return (
    <div>
        {resp === 500 ? <Container style={{ position: "relative", marginTop: 0, padding: 0 }} maxWidth='md'>
          Join a match!
        </Container> : resp === 200 ?
        <div>
           <Container style={{ position: "relative", marginTop: 2, padding: 0 }} maxWidth='md'>
          <Paper elevation={3} style={{
          }}>
            <Tabs
              value={gameType}
              indicatorColor="secondary"
              textColor="primary"
              onChange={handleGameChange}
              scrollButtons="on"
              centered
            >
              <Tab label="Cricket" />
              <Tab label="Football" />
             </Tabs>
         
            <Tabs
              value={value}
              indicatorColor="secondary"
              textColor="primary"
              onChange={handleChange}
              scrollButtons="on"
              centered
            >
              <Tab label="Upcoming" />
              <Tab label="Live" />
              <Tab label="Completed" />
            </Tabs>
          
          </Paper>
        </Container>
        <Container style={{ position: "relative", marginTop: 0, padding: "0px 5px" }} maxWidth='md'>
          <Paper elevation={0} style={value === 0 ? { display: 'block',minHeight:"80vh", marginTop: '5px',backgroundColor: mode ? "#232C31"  :"#F9F8FC" } : { display: 'none' }}>
            { !wait ? matches.length > 0 && value === 0 ? viewUpcMatch() : <EDIV>
              
              <Button color="secondary" variant="contained" onClick={redirectUser} >Join match</Button>
            </EDIV> : <CircularProgress style={{
          position: "fixed",
          top: "50%",
          left: "50%"
      }} disableShrink />}
          </Paper>

          <Paper elevation={0} style={value === 1 ? { display: 'block',minHeight:"80vh" , marginTop: '5px',backgroundColor:mode ? "#232C31"  :"#F9F8FC" } : { display: 'none' }}>
            {!wait ? matches.length > 0 && value === 1 ? viewLiveMatch() : <EDIV>
              <Button color="secondary" variant="contained" onClick={redirectUser} >Join match</Button>
              </EDIV> : <CircularProgress style={{
          position: "fixed",
          top: "50%",
          left: "50%"
      }} disableShrink />}
      </Paper>
          <Paper elevation={0} style={value === 2 ? { display: 'block',minHeight:"80vh", marginTop: '5px',backgroundColor:mode ? "#232C31"  :"#F9F8FC" } : { display: 'none' }}>
            {!wait ? matches.length > 0 && value === 2 ? viewCompMatch() : <EDIV>
              <Button color="secondary" variant="contained" onClick={redirectUser} >Join match</Button>
              </EDIV>
               : <CircularProgress style={{
          position: "fixed",
          top: "50%",
          left: "50%"
      }} disableShrink />}

          </Paper>
          
          <div
            style={{
                marginTop:15,
              width: "100%",
              textAlign: "center",
              alignItems: "center",
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              color:"white"
            }}>
            <Pagination 
             onChange={handlePage}
 
             page={activePage} count={page}
              color="secondary"  />
                </div>
        </Container>
        </div>
        :<CircularProgress style={{
          position: "fixed",
          top: "50%",
          left: "50%"
      }} disableShrink />}
     </div>
    );
  }