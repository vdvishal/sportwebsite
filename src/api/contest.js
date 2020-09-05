import instance  from './instance';
import cookies from 'universal-cookie';
const Cookies = new cookies();


 
export const contest = (matchId,sort) => instance.get(`/contest/${matchId}?sort=${sort}`,{
  auth:{
    username: "app",
    password: 'qwewqinasdoinoinacino'
  },
})
  .then((response) => {
    return (response);
  });

  // export const contestUser = (matchId,sort) => instance.get(`/contest/${matchId}?sort=${sort}`,{
  //   headers: {
  //     'Authorization': `${Cookies.get("token")}`,
  //   }
  //   })
  // .then((response) => {
  //   return (response);
  // });

  export const matchUps = (matchId) => instance.get(`/contest/matchUps/${matchId}`,{
    auth:{
      username: "app",
      password: 'qwewqinasdoinoinacino'
    },
  })
  .then((response) => {
    return (response);
  });

  export const customContest = (matchId,min,max,contestType,page) => 
        instance
        .get(`/contest/custom/${matchId}?min=${min}&max=${max}&contestType=${contestType}&page=${page}`,{
    auth:{
      username: "app",
      password: 'qwewqinasdoinoinacino'
    },
  })
  .then((response) => {
    return (response);
  });

  export const fantasy = (matchId) => instance.get(`/contest/fantasy/${matchId}`,{
    auth:{
      username: "app",
      password: 'qwewqinasdoinoinacino'
    },
  })
  .then((response) => {
    return (response);
  });


export const mycontest = (matchId) => instance.get(`/contest/user/${matchId}`, {
  headers: {
    'Authorization': `${Cookies.get("token")}`,
  }
  }).then((response) => {
      return (response);
    });

export const contestDetails = (matchId,contestId,page) => instance.get(`/contest/details/${matchId}/${contestId}?page=${page}`,{
      headers: {
        'Authorization': `${Cookies.get("token")}`,
      }
    })
      .then((response) => {
        return (response);
      });

      export const leaderBoard = (contestId,page) => instance.get(`/contest/leaderboard/${contestId}?page=${page}`,{
        headers: {
          'Authorization': `${Cookies.get("token")}`,
        }
      })
        .then((response) => {
          return (response);
        });
        

        export const teamDetails = (teamId) => instance.get(`/team/user/${teamId}`,{
          headers: {
            'Authorization': `${Cookies.get("token")}`,
          }
        })
          .then((response) => {
            return (response);
          });

export const contestLive = (matchId,page) => instance.get(`/contest/live/${matchId}?start=${page}`,{
  headers: {
    'Authorization': `${Cookies.get("token")}`,
  }
})
  .then((response) => {
    return (response);
  });

export const joinUnderOverContest = (data) => instance.post(`/contest/join/underover`, data, {
    headers: {
      'Authorization': `${Cookies.get("token")}`,
    }
  })
  .then((response) => {
    return (response);
  });


  export const joinVsContest = (contestId, teamId,playerInfo,amount) => instance.post(`/contest/join/vs`, {
    contestId, teamId,playerInfo,amount
  }, {
      headers: {
        'Authorization': `${Cookies.get("token")}`,
      }
    })
    .then((response) => {
      return (response);
    });


    export const joinMatchupContest = (data) => instance.post(`/contest/join/matchup`, data, {
        headers: {
          'Authorization': `${Cookies.get("token")}`,
        }
      })
      .then((response) => {
        return (response);
      });

      export const joinFantasyContest = (data) => instance.post(`/contest/join/fantasy`, data, {
        headers: {
          'Authorization': `${Cookies.get("token")}`,
        }
      })
      .then((response) => {
        return (response);
      });

      export const patchFantasyContest = (data) => instance.patch(`/contest/patch/fantasy`, data, {
        headers: {
          'Authorization': `${Cookies.get("token")}`,
        }
      })
      .then((response) => {
        return (response);
      });


      export const createContest = (data) => instance.post(`/contest/custom`, data, {
        headers: {
          'Authorization': `${Cookies.get("token")}`,
        }
      })
      .then((response) => {
        return (response);
      });


      export const joinCustomContest = (data) => instance.patch(`/contest/join/custom`, data, {
        headers: {
          'Authorization': `${Cookies.get("token")}`,
        }
      })
      .then((response) => {
        return (response);
      });

      export const joinCustomContestDuel = (data) => instance.patch(`/contest/join/custom`, data, {
        headers: {
          'Authorization': `${Cookies.get("token")}`,
        }
      })
      .then((response) => {
        return (response);
      });

      