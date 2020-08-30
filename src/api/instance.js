import axios from 'axios';
 
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import cookies from 'universal-cookie';
import * as config from "../config.json";
 
const Cookies = new cookies();
 

const instance = axios.create({
  baseURL: `${config.url}`
});

instance.interceptors.response.use(response => {
  return response
}, async function (error) {
  
  console.log(window.location.pathname);
  
  if(error && error.response && error.response.status === 496 && localStorage.getItem("isLogged") === "true"){
 
     localStorage.setItem("isLogged",false); 

 
     window.location.replace('/');

   } 
   if(error && error.response && error.response.status === 496 && localStorage.getItem("isLogged") === "false" && window.location.pathname !== "/"){
 
    localStorage.setItem("isLogged",false); 


    window.location.replace('/');

  } 

   if(error && error.response && error.response.status === 401 && localStorage.getItem("isLogged") === "true"){
 
    localStorage.setItem("isLogged",false); 


    window.location.replace('/');

  } 

   if(error && error.response && error.response.status === 500 && localStorage.getItem("isLogged") === "true"){
 
    localStorage.setItem("isLogged",false); 


    

  } 
  return Promise.reject(error);

})


const refreshAuthLogic = failedRequest => instance.get('/users/refreshToken',{
  headers: {
    'Authorization': `${localStorage.getItem("_ftoken")}`,
  }
  }).then(tokenRefreshResponse => {   
    Cookies.set('token', tokenRefreshResponse.data.token);
    failedRequest.response.config.headers['Authorization'] = tokenRefreshResponse.data.token;
    return Promise.resolve();
});

createAuthRefreshInterceptor(instance, refreshAuthLogic,{
  statusCodes: [  403 ]
});

export default instance;