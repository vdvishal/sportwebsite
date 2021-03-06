/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-lone-blocks */
import React from 'react';
import ReactGA from 'react-ga';
import Slider from "react-slick";

import { Link } from 'react-router-dom';
 
import { useEffect,useContext } from 'react';
import Countdown from 'react-countdown';
import CircularProgress from '@material-ui/core/CircularProgress';

import Container from '@material-ui/core/Container';
 
// API
import * as api from '../../api/match';
import * as color from '../../json/color.json'
import * as colorTheme from '../../json/colorPallete.json'


import { Paper, Divider, Typography, Avatar } from '@material-ui/core';

import styled from 'styled-components';
import { GameContext } from '../home/index';


const size = {
  mobileS: '320px',
  mobileM: '375px',
  mobileL: '525px',
  tablet: '768px',
  laptop: '1024px',
  laptopL: '1440px',
  desktop: '2560px',
  amountPreset: '675px',
  hdiv: '768px'

}

const device = {
  mobileS: `(max-width: ${size.mobileS})`,
  mobileM: `(max-width: ${size.mobileM})`,
  mobileL: `(max-width: ${size.mobileL})`,
  tablet: `(max-width: ${size.tablet})`,
  laptop: `(max-width: ${size.laptop})`,
  laptopL: `(max-width: ${size.laptopL})`,
  desktop: `(max-width: ${size.desktop})`,
  desktopL: `(max-width: ${size.desktop})`,
  amountPreset: `(max-width: ${size.amountPreset})`,
  hdiv: `(max-width: ${size.hdiv})`,

};


const SDiv = styled.div`
transition: transform .2s;
cursor:pointer;
min-width:760px;
@media ${device.hdiv} {
   min-width:260px;

  padding: 0px;
}

&:hover {
    transform: scale(1.025);
    box-shadow:0 0 0.52em 0 rgba(0,0,0,0.15)
}
`;

const SDiv2 = styled.div`
transition: transform .2s;
cursor:pointer;
padding: 2.5px;
max-width:760px;
display:none;
@media ${device.hdiv} {
  padding: 2.5px;
  display:block
}
 
`;

const HDiv = styled.div`
    border-radius: 4px;
    padding: 0px 10px;
    @media ${device.hdiv} {
      width: 100%;
      padding: 0px;
    }
`;











 
let dynamicObj = {}

 


export default function Match(props) {

  // const [matches, setMatches] = React.useState(null);
  

  const [matches, handleGameType] = useContext(GameContext)



  useEffect(() => {
    window.scrollTo(0, 0)
    ReactGA.pageview(props.location.pathname);

    // api.match(1,1).then(response => {      
    //   if(response.data.match !== null){
    //         dynamicObj = {}
    //         // response.data.match.forEach(contest => {
    //         //   dynamicObj = {
    //         //     ...dynamicObj,
    //         //     [contest._id]: {
    //         //       bool: false,
    //         //       [contest._id + "playerL"]: false,
    //         //       [contest._id + "playerR"]: false,
    //         //     }
    //         //   }
    //         // })

    //         setMatches(response.data.match);
    //   }else{
    //     setMatches([]);
    //   }
    // })
  }, []);





  const viewMatch = () => matches.map(match => <div
 
    key={match._id}
  >
    <SDiv >
      <Paper className="dark" elevation={1}
          
          style={{
          height: 'auto',
          padding: 10,
          margin: "10px 0",
 
          // color: "theme" !== 1 ? colorTheme.dark.text:colorTheme.light.text,
          // backgroundColor: "theme" !== 1 ? colorTheme.dark.cardBackground:colorTheme.light.cardBackground,
        
        }}
        className="dark"
      >
        <Link to={{
          pathname: `/contest/${match.id}`,
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
              // color: "theme" !== 1 ? colorTheme.dark.text:colorTheme.light.text,
              // backgroundColor: "theme" !== 1 ? colorTheme.dark.cardBackground:colorTheme.light.cardBackground,
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
                  // color: "theme" !== 1 ? colorTheme.dark.text:colorTheme.light.text,
                  // backgroundColor: "theme" !== 1 ? colorTheme.dark.cardBackground:colorTheme.light.cardBackground,
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
                       color: "theme" !== 1 ? colorTheme.dark.countDownText:colorTheme.light.countDownText,
            
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

const viewMyMatch = () => matches.map(match => 
<div
 
  key={match._id}
>
  <SDiv2 >
    <Paper className="dark" elevation={1}
        
        style={{
        height: 'auto',
        padding: 10,
        margin: "10px 0",

        // color: "theme" !== 1 ? colorTheme.dark.text:colorTheme.light.text,
        // backgroundColor: "theme" !== 1 ? colorTheme.dark.cardBackground:colorTheme.light.cardBackground,
      
      }}
      className="dark"
    >
      <Link to={{
        pathname: `/contest/${match.id}`,
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
            // color: "theme" !== 1 ? colorTheme.dark.text:colorTheme.light.text,
            // backgroundColor: "theme" !== 1 ? colorTheme.dark.cardBackground:colorTheme.light.cardBackground,
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
                // color: "theme" !== 1 ? colorTheme.dark.text:colorTheme.light.text,
                // backgroundColor: "theme" !== 1 ? colorTheme.dark.cardBackground:colorTheme.light.cardBackground,
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
                     color: "theme" !== 1 ? colorTheme.dark.countDownText:colorTheme.light.countDownText,
          
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
  </SDiv2>
   
</div>)


const settings = {
  arrows: false,
  infinite: false,
  speed: 500,
  autoplaySpeed:2500,
  autoplay:true,
  slidesToShow: 2,
  slidesToScroll: 2,
  initialSlide: 0,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        infinite: true,
         
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2
      }
    },
    {
      breakpoint: 525,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ]

};



  return (
    matches !== null ? matches.length > 0 ? <div
      style={{
        margin: '5px',
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        flexWrap: "wrap",
 
      }}
    >
       <HDiv>
        {/* <Container maxWidth="md" style={{padding:"2.5px 2.50px",maxWidth:760}} >
          
        <Slider {...settings}>
              <div
      style={{height:"100%",maxWidth:760 }}
      key={"deposit"}
      >
  <SDiv2 >
   <Paper className="dark" elevation={1}
       
       style={{
       height: 'auto',
       padding: 10,
       margin: "10px 0",

       // color: "theme" !== 1 ? colorTheme.dark.text:colorTheme.light.text,
       // backgroundColor: "theme" !== 1 ? colorTheme.dark.cardBackground:colorTheme.light.cardBackground,
     
     }}
     className="dark"
   >
     
     <Link to={{
       pathname: `/myaccount`,
 
     }}
       style={{
         textDecoration: 'none',
       }}
     >
       <Paper elevation={0}
       
         style={{
           height: 25,
           fontSize: '0.75rem',
           // color: "theme" !== 1 ? colorTheme.dark.text:colorTheme.light.text,
           // backgroundColor: "theme" !== 1 ? colorTheme.dark.cardBackground:colorTheme.light.cardBackground,
         }}
       >
         
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
               margin: 30,
               fontWeight: 600,
               // color: "theme" !== 1 ? colorTheme.dark.text:colorTheme.light.text,
               // backgroundColor: "theme" !== 1 ? colorTheme.dark.cardBackground:colorTheme.light.cardBackground,
             }}
           >
 
           </Paper>


         </div>



       </div>
     </Link>
   </Paper>
 </SDiv2>
  
</div>
          {matches.length > 0 ? viewMyMatch() : <div></div>}
         </Slider>
        </Container> */}
 

         
        <Container maxWidth="md"
          style={{
            backgroundColor: color.secondary.main,
            color: "white",
            borderRadius: 4,
            padding:10
          }}>

          <Typography
            variant="caption"
            style={{
              fontSize: "1em",
              fontWeight: 500,
              margin: 0
            }}
          >
            Upcoming Matches
          </Typography>
          <br />
        </Container>

        {matches.length > 0 ? viewMatch() : <div></div>}
      </HDiv>

      <HDiv style={{display:"none"}}>

        <Container maxWidth="md"
          style={{
            display: "none",
            backgroundColor: "#1A1E23",
            color: "white",
            borderRadius: 4,
            marginBottom:10
          }}
        >
          <Typography variant="caption"
            style={{
              fontSize: "1.25em",
              fontWeight: 600,
              margin: 0
            }}>
            Featured
            </Typography>
          <br />
          <Typography variant="caption"
            style={{
              fontWeight: 400,
              margin: 0
            }}>
            Choose a minimum 2 duels
            </Typography>
        </Container>


        <Paper elevation={0} style={{  
            

          }} >
            {/* {matches.length > 0 ? viewCombo() : <div />}              */}
          </Paper>
      </HDiv>








 
  
 



    </div> : 
    <div style={{
       textAlign:"center",
       marginTop:"40vh"
    }}>
      <Typography variant="subtitle2" style={{
        color:"grey"
      }}>
        Coming soon
      </Typography>
    </div>

      : <CircularProgress style={{
        position: "fixed",
        top: "50%",
        left: "50%"
      }} disableShrink />
  );

}