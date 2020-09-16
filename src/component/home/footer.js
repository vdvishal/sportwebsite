import React, { useEffect } from 'react';
import { useHistory } from "react-router-dom";
import styled from 'styled-components'
import * as logo from './logo_transparent.png'

const TopContainer = styled.div`
            background-color: #1A1E23;
            min-height: 175px;color: white;   
`
const Section1 = styled.div`
            display:grid;
            font-size: 14px;

            grid-template-columns: 1fr;
            grid-template-rows: 50px 25px 25px;
`

const Section2 = styled.div`
            display:grid;
            font-size: 14px;
            grid-template-columns: 1fr;
            
`
const Section2Sub = styled.div`
font-size: 1.35em;font-weight: bold;line-height: 30px;padding-top: 15px;
`
const Section1Sub = styled.div`
font-size: 1.35em;font-weight: bold;line-height: 30px;padding-top: 15px;
`

const Section3 = styled.div`
    display:grid;
    font-size: 14px;
    grid-template-columns: 1fr;
    grid-template-rows: 50px  25px;
`
const Section3Sub = styled.div`
font-size: 1.35em;font-weight: bold;line-height: 30px;padding-top: 15px;
`
const TopContainer2 = styled.div`
background-color: #1f2226;min-height: 175px;color: white;
`

export default function Footer(props) {
    return (<div style={{
        marginTop:20
    }}>
          <TopContainer>
                <div className="footer">
                <div style={{padding:10,margin:5,textAlign:"center"}}>
                    <img src={logo} height="90px" alt="logo"></img>

                </div>
                <Section1>
                    <Section1Sub  >
                    Link
                    </Section1Sub>
                    <div>
                    <a href="/" style={{textDecoration: "none",
                    color: "white"}}>
                        Home
                    </a>

                    </div>
            
                    <div>
                    <a href="/faq" style={{textDecoration: "none",
                    color: "white"}}>
                        How to play
                    </a>

                    </div>
                    <div>
                    <a href="/pointsystem" style={{textDecoration: "none",
                    color: "white"}}>
                        Point System
                    </a>

                    </div>
                </Section1>
                <Section2>
                    <Section2Sub>
                    Help & Policy
                    </Section2Sub>
                    <div>
                    <a href="/faq" style={{textDecoration: "none",
                    color: "white"}}>
                        FAQ
                    </a>

                    </div>
                    <div>
                    <a href="/terms" style={{textDecoration: "none",
                    color: "white"}}>
                        Terms of service
                    </a>
                    </div>
                    <div>
                    <a href="/privacypolicy" style={{textDecoration: "none",
                    color: "white"}}>
                        Privacy policy
                    </a>

                    </div>
            
                </Section2>
                <Section3>
                    <Section3Sub>
                    Support
                    </Section3Sub>
                    <div>
                    <a href="mailto:support@Fantasyjustu.com" style={{textDecoration: "none",
                    color: "white"}}>
                        support@fantasyjutsu.com
                    </a>
                    
                    </div>

                </Section3>
                </div>
            </TopContainer>
  <TopContainer2>
    <div className="footer2">
      <div style={{
        fontSize: "1.5em",
        fontWeight: 500
      }}>

      </div>

      <div>
        The operator of this website is <br/>
        Nodestack Private Limited,&nbsp;<br/>
        Karnataka, India.
      </div>
    </div>
  </TopContainer2>
    </div>)
}