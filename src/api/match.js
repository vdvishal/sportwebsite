import instance  from './instance';
import cookies from 'universal-cookie';
const Cookies = new cookies();

 

export const match = (type,matchId) => instance.get(`/match?matchId=${matchId}`,{
  auth:{
    username: "app",
    password: 'qwewqinasdoinoinacino'
  },
}).then((response) => {
      return (response);
    });


    export const myMatch = (type, page) => instance.get(`/match/user?page=${page}&type=${type}`, {
      headers: {
        'Authorization': `${Cookies.get("token")}`,
      }
    })
      .then((response) => {
        return (response);
      });