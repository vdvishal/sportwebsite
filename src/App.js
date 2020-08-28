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

import Kyc from './component/users/kyc';

import * as color from './json/color.json';

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

 
// LogRocket.init('wtxkj7/fanapp');
// setupLogRocketReact(LogRocket);

const darkTheme = createMuiTheme({
  palette: {
    type: 'light',
    primary:  {
      main: color.primary.main,
      
    },
    secondary: {
      main: color.secondary.main,
      contrastText: 'black'
    },
  },
});

function App() {
  useEffect(() => {
    initGA.initGA();
  }, [])
  return (
    <div className="App">
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
          <ThemeProvider theme={darkTheme}>
           
            <BrowserRouter >
          
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

              
              
              </Home>
              
            </BrowserRouter>
          </ThemeProvider>
        </CookiesProvider>
    </div>
  );
}

export default App;
