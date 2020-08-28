import React,{useEffect} from 'react';
import {  Route,BrowserRouter,Switch } from 'react-router-dom';
 
  
 
 
 

 
// LogRocket.init('wtxkj7/fanapp');
// setupLogRocketReact(LogRocket);
 

export default (  
 
 
            <Switch >
             
              <Route path="/"  />
              <Route path="/register"  />

              <Route path="/contest/:matchId"  />
              <Route path="/contest/mymatch/:matchId"  />
              <Route path="/contest/details/:matchId/:contestId"  />

              <Route path="/team/:matchId"  />
              <Route path="/team/edit/:matchId/:teamId"  />

              

              <Route path="/profile"  />
              <Route path="/match/mymatch"  />
              <Route path="/myaccount"  />
              <Route path="/kyc"  />
              <Route path="/withdraw"  />



              <Route path="/transactions"    />           
              <Route path="/faq"   />  
              <Route path="/pointsystem"    />  

              <Route path="/terms" />  

              
              
              
            </Switch>
 
  )
 
