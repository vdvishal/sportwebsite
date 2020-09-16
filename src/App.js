import React,{useEffect} from 'react';
import {  Route,BrowserRouter } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import {Helmet} from "react-helmet";

// import LogRocket from 'logrocket';
// import setupLogRocketReact from 'logrocket-react';


//Components
import Home from './component/home';
 

import Match from './component/match/match';
import MyMatch from './component/match/myMatch';

import Contest from './component/contest/contest';
  
import FAQ from './component/faq/index';

import Privacy from './component/faq/privacy';

import PointSystem from './component/faq/pointsystem';

import Terms from './component/terms/terms';


import Register from './component/users/register';

import Profile from './component/users/profile';
import MyAccount from './component/users/myAccount';
import MyContest from './component/contest/myContest';
import Withdraw from './component/users/withdraw';



import ContestDetail from './component/contest/contestDetails';

import Team from './component/team/team';
import EditTeam from './component/team/editTeam';


import * as initGA from './component/common/GA';

import ScrollToTop from './component/common/scrollToTop';

 import Transaction from './component/users/transaction';

 import Message from './component/users/message';

import Kyc from './component/users/kyc';

import * as color from './json/color.json';

import * as theme from './json/colorPallete.json';

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

export const ModeContext = React.createContext()

 
// LogRocket.init('wtxkj7/fanapp');
// setupLogRocketReact(LogRocket);

const darkTheme = createMuiTheme({
  palette: {
    primary:  {
      main: color.primary.main,
    },
    secondary: {
      main: theme.dark.secondary,
      contrastText: theme.dark.text,
    },
  },
  overrides: {

    MuiMenu:{
      paper:{
        color:"green",
        backgroundColor:theme.dark.menu
      }
    },
    MuiListItem:{
      root:{
        color:"white",
      }
    },
    MuiPaper:{
      root:{
        color:"white",
        backgroundColor:theme.dark.cardBackground //:colorTheme.light.cardBackground,
      }
    },
    MuiTab:{
      wrapper:{
        color:"#AAC0C8",
      }
    },
    MuiInputBase:{
      root:{
         color:"white"
      }
    },
    MuiPaginationItem:{
      input:{
        color:"white",
      }
    },
    MuiFormLabel:{
      root:{
        color:"white",

      },
 
      text:{
        color:"white",
      }
    },
    MuiInputBase:{
      input:{
        color:"white",
      },
      root:{
        color:"white",
      }
    },
    MuiLinearProgress:{
      colorPrimary:{
        color:"white",
        backgroundColor:'#262c33' //:colorTheme.light.cardBackground,
      }
    },
    Mui:{
      focused:{
        color:"white"
      }
    },
    MuiButton:{
      root:{
        color:"white"
      },
    }
  }
  
});


const lightTheme = createMuiTheme({
  palette: {
    
    primary:  {
      main: color.primary.main,
    },
    secondary: {
      main: color.secondary.main,
      contrastText: 'white'
    },
    overrides: {
      MuiMenu:{
        paper:{
          color:"green",
          backgroundColor:theme.light.menu
        }
      },
      MuiListItem:{
        root:{
          color:"white",
        }
      },
      MuiPaper:{
        root:{
          color:"white",
          backgroundColor:theme.light.cardBackground //:colorTheme.light.cardBackground,
        }
      },
      MuiTab:{
        wrapper:{
          color:"#AAC0C8",
        }
      },
      MuiSelect:{
        select:{
          color:"white",
          backgroundColor:"white"
        }
      },
      MuiPaginationItem:{
        root:{
          color:"white",
        }
      },
      MuiFormLabel:{
        root:{
          color:"white",
        },
        text:{
          color:"white",
        }
      },
      MuiInputBase:{
        input:{
          color:"white",
        },
        root:{
          color:"white",
        }
      },
      MuiLinearProgress:{
        colorPrimary:{
          color:"white",
          backgroundColor:'#F9F8FC' //:colorTheme.light.cardBackground,
        }
      },
      MuiButton:{
        containedSecondary:{
          color:"white"
      },
      root:{
        color:"white"
      },
      },
      MuiBadge:{colorSecondary:{
        color:"white"
      }
      }
    }
    
  },
});



function App() {

  const [mode, setMode] = React.useState(false);

  useEffect(() => {
    initGA.initGA();
    setMode(
      localStorage.getItem('mode') === 'true' ? true : false
    )
    localStorage.getItem('mode') === 'true' ? localStorage.setItem('mode',true)  : localStorage.setItem('mode',false)
  }, [])

  const handlemode = () => {
    setMode(!mode)
    localStorage.setItem('mode',
      !mode ? true : false
    )
  }

  return (
    <div className="App" style={mode ? {"backgroundColor": theme.dark.background} :{"backgroundColor": theme.light.background} }>
          <Helmet>
                <meta charSet="utf-8" />
                <title>FantasyJutsu: Play fantasy cricket online 24/7</title>
                <meta name="description"
                 content="Play fantasy cricket online at FantasyJutsu & Win cash daily.Participate in fantasy cricket leagues matches like IPL, T20 and ODI league" />
                <link rel="canonical" href="https://fantasyjutsu.com" />
                <meta name="keywords" content="fantasy,cricket,football,contests,duels," />
            </Helmet>

            <Helmet>
                <meta charSet="utf-8" />
                <title>Play fantasy cricket</title>
                <meta name="description"
                 content="Play fantasy cricket online at FantasyJutsu & Win cash daily.Participate in fantasy cricket leagues matches like IPL, T20 and ODI league" />
                <link rel="canonical" href="https://fantasyjutsu.com" />
            </Helmet>

 

 
 

            <Helmet>
            <meta property="og:title" content="Fantasy Jutsu" />
            <meta property="og:type" content="website" />
            <meta property="og:url" content="http://www.fantasyjutsu.com" />
            <meta property="og:image:url" content="https://image.fantasyjutsu.com/1597685053164.png" />
            <meta property="og:description" content="Play fantasy cricket duels online at FantasyJutsu" />
            </Helmet>


        <CookiesProvider>
          <ThemeProvider theme={mode ? darkTheme : lightTheme}>
           
            <BrowserRouter >
            <ModeContext.Provider value={[mode, handlemode]} >
            <Home style={{minHeight:"100vh"}}>
              <Route path="/" exact component={Match} />
              <Route path="/register" exact component={Register} /> 

              <Route path="/contest/:matchId" exact component={Contest} /> 
              <Route path="/contest/mymatch/:matchId" exact component={MyContest} />           
              <Route path="/contest/details/:matchId/:contestId" exact component={ContestDetail} />  

              <Route path="/team/:matchId" exact component={Team} /> 
              <Route path="/team/edit/:matchId/:teamId" exact component={EditTeam} /> 

              

              <Route path="/profile" exact component={Profile} />           
              <Route path="/match/mymatch" exact component={MyMatch} />
              <Route path="/myaccount" exact component={MyAccount} />           
              <Route path="/kyc" exact component={Kyc} />      
              <Route path="/withdraw" exact component={Withdraw} />  



              <Route path="/transactions" exact component={Transaction} />           
              <Route path="/faq" exact component={FAQ} />  
              <Route path="/pointsystem" exact component={PointSystem} />  

              <Route path="/terms" exact component={Terms} />  
              <Route path="/privacypolicy" exact component={Privacy} />  
              <Route path="/message" exact component={Message} />  

              
              
              </Home>
             
              </ModeContext.Provider>
            </BrowserRouter>
          </ThemeProvider>
        </CookiesProvider>
    </div>
  );
}

export default App;
