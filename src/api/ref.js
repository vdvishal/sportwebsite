import axios  from 'axios';
import * as config from "../config.json";

const instance = axios.create({
  baseURL: `${config.url}users`// 'https://api.fantasyjutsu.tk/api/v1/' //'http://apifantasyjutsu.tk
});



export const refresh = () => instance.get('/refreshToken',{
    headers: {
      'Authorization': `${localStorage.getItem("_ftoken")}`,
    }
    })
    .then((response) => {
      return (response);
    }) 
    