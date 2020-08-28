import instance  from './instance';
import cookies from 'universal-cookie';
const Cookies = new cookies();

export const getAllUserTeam = (matchId) => instance.get(`/team/user/all/${matchId}`, {
  headers: {
    'Authorization': `${Cookies.get("token")}`,
  }
})
  .then((response) => {
    return (response);
  });


export const team = (teamId) => instance.get(`/fantasyPlayer?matchId=${teamId}`,{
  auth:{
    username: "app",
    password: 'qwewqinasdoinoinacino'
  },
})
  .then((response) => {
    return (response);
  });

  export const teamStats = (teamId) => instance.get(`/fantasyPlayer/team?matchId=${teamId}`,{
    auth:{
      username: "app",
      password: 'qwewqinasdoinoinacino'
    },
  })
  .then((response) => {
    return (response);
  });

  

export const userTeam = (data) => instance.post(`/team/user/`, data, {
  headers: {
    'Authorization': `${Cookies.get("token")}`,
  }
})
  .then((response) => {
    return (response);
  });

  export const userTeamGet = (teamId,matchId) => instance.get(`/team/user/${matchId}/${teamId}`,{
    headers: {
      'Authorization': `${Cookies.get("token")}`,
    }
  })
    .then((response) => {
      return (response);
    });


  export const patchUserTeam = (team,teamId) => instance.patch(`/team/user/${teamId}`, team, {
    headers: {
      'Authorization': `${Cookies.get("token")}`,
    }
  })
    .then((response) => {
      return (response);
    });