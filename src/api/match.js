import instance  from './instance';
import cookies from 'universal-cookie';
const Cookies = new cookies();

 

export const match = (type,matchId) => instance.get(`/match?matchId=${matchId}&gameType=${type}`,{
  auth:{
    username: "app",
    password: 'qwewqinasdoinoinacino'
  },
}).then((response) => {
      return (response);
    });


    export const myMatch = (type, page,gameType) => instance.get(`/match/user?page=${page}&type=${type}&gameType=${gameType}`, {
      headers: {
        'Authorization': `${Cookies.get("token")}`,
      }
    })
      .then((response) => {
        return (response);
      });    