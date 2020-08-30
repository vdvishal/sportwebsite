import React from 'react';
import ReactGA from 'react-ga';

import { useEffect } from 'react';
 
import Container from '@material-ui/core/Container';
import styled from 'styled-components'

 

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';


import { Paper, Divider, Typography } from '@material-ui/core';
 

const Div = styled.div`
display:flex;
flex-direction:row;
ailgn-content:center;
  justify-content:space-between;
  margin:5px;
 
`

export default function PointSystem() {

    const [value, setValue] = React.useState(0)

    useEffect(() => {


    }, []);

    const handleChange = (event, newValue) => {
        setValue(newValue);
 
    
 
      };


    return (
        <div>
            <Container maxWidth="md" style={{
                display: "flex",
                flexDirection: "column",
                flexWrap: "wrap",
 
                marginTop: 10
            }}>

<Paper style={{
          borderRadius:"5px",
          marginTop:10
        }}>
          <Tabs
            value={value}
            indicatorColor="secondary"
            textColor="primary"
            onChange={handleChange}
            variant="fullWidth"
              style={{
                  width:"100%"
              }}
          >
 
            <Tab label="T20" />
            <Tab label="ODi" />
            <Tab label="Test" />

          </Tabs>

        </Paper>

        <div style={value === 0 ? { display: 'block', marginTop: '10px' } : { display: 'none' }}  >
        <Paper elevation={0} style={{
            padding:5,
            marginTop:5
        }}>


            <Div>
                <div>
                    <Typography variant="caption">
                    Starting 11
                    </Typography>
                    
                </div>
                <div>
                <Typography variant="caption">
                    +2
                    </Typography>
                </div>
            </Div>
            <Divider />

            <h6>BATTING</h6>
            <Div>
                <div>
                    <Typography variant="caption">
                    Run
                    </Typography>
                    
                </div>
                <div>
                <Typography variant="caption">
                    +1
                    </Typography>
                </div>
            </Div>
            <Divider />
            <Div>
                <div>
                    <Typography variant="caption">
                    4s bonus
                    </Typography>
                    
                </div>
                <div>
                <Typography variant="caption">
                    +1
                    </Typography>
                </div>
            </Div>
            <Divider />
            <Div>
                <div>
                    <Typography variant="caption">
                    6s bonus
                    </Typography>
                    
                </div>
                <div>
                <Typography variant="caption">
                    +2
                    </Typography>
                </div>
            </Div>
            <Divider />
            <Div>
                <div>
                    <Typography variant="caption">
                    50s bonus
                    </Typography>
                    
                </div>
                <div>
                <Typography variant="caption">
                    +8
                    </Typography>
                </div>
            </Div>
            <Divider />
            <Div>
                <div>
                    <Typography variant="caption">
                    100s bonus
                    </Typography>
                    
                </div>
                <div>
                <Typography variant="caption">
                    +16
                    </Typography>
                </div>
            </Div>
            <Divider />
            <Div>
                <div>
                    <Typography variant="caption">
                    Out for a Duck
                    </Typography>
                    
                </div>
                <div>
                <Typography variant="caption">
                    -2
                    </Typography>
                </div>
            </Div>
            <Divider />

            <h6>BOWLING</h6>
            <Div>
                <div>
                    <Typography variant="caption">
                    Wicket
                    </Typography>
                    
                </div>
                <div>
                <Typography variant="caption">
                    +25
                    </Typography>
                </div>
            </Div>
            <Divider />
            <Div>
                <div>
                    <Typography variant="caption">
                    4 wickets haul Bonus 
                    </Typography>
                    
                </div>
                <div>
                <Typography variant="caption">
                    +8
                    </Typography>
                </div>
            </Div>
            <Divider />
            <Div>
                <div>
                    <Typography variant="caption">
                    5 wickets haul Bonus 
                    </Typography>
                    
                </div>
                <div>
                <Typography variant="caption">
                    +16
                    </Typography>
                </div>
            </Div>
            <Divider />
            <Div>
                <div>
                    <Typography variant="caption">
                    Maiden over
                    </Typography>
                    
                </div>
                <div>
                <Typography variant="caption">
                    +8
                    </Typography>
                </div>
            </Div>
            <Divider />
 
            <h6>FIELDING</h6>
            <Div>
                <div>
                    <Typography variant="caption">
                    Catch
                    </Typography>
                    
                </div>
                <div>
                <Typography variant="caption">
                    +12
                    </Typography>
                </div>
            </Div>
            <Divider />
            <Div>
                <div>
                    <Typography variant="caption">
                    Stumping
                    </Typography>
                    
                </div>
                <div>
                <Typography variant="caption">
                    +12
                    </Typography>
                </div>
            </Div>
            <Divider />
            <Div>
                <div>
                    <Typography variant="caption">
                     Run-out(Stumping)
                    </Typography>
                    
                </div>
                <div>
                <Typography variant="caption">
                    +12
                    </Typography>
                </div>
            </Div>
            <Divider />

        
            <h6 style={{marginBottom:0}}>ECONOMY RATE</h6>
            <Typography variant="caption" style={{marginTop:0,marginBlockEnd: "2.33em"}}>*Minimum 2 overs needs to be bowled</Typography>
             

            <Div>
                <div>
                    <Typography variant="caption">
                    Below 4 runs per over
                    </Typography>
                    
                </div>
                <div>
                <Typography variant="caption">
                    +6
                    </Typography>
                </div>
            </Div>
            <Divider />
            <Div>
                <div>
                    <Typography variant="caption">
                    Between 4.99 - 4 runs per over
                    </Typography>
                    
                </div>
                <div>
                <Typography variant="caption">
                    +4
                    </Typography>
                </div>
            </Div>
            <Divider />
            <Div>
                <div>
                    <Typography variant="caption">
                    Between 5 - 6 runs per over
                    </Typography>
                    
                </div>
                <div>
                <Typography variant="caption">
                    +2
                    </Typography>
                </div>
            </Div>
            <Divider />
            <Div>
                <div>
                    <Typography variant="caption">
                    Between 9 - 9.99 runs per over
                    </Typography>
                    
                </div>
                <div>
                <Typography variant="caption">
                    -2
                    </Typography>
                </div>
            </Div>
            <Divider />
            <Div>
                <div>
                    <Typography variant="caption">
                    Between 10 - 10.99 runs per over
                    </Typography>
                    
                </div>
                <div>
                <Typography variant="caption">
                    -4
                    </Typography>
                </div>
            </Div>
            <Divider />
            <Div>
                <div>
                    <Typography variant="caption">
                    Above 11 runs per over
                    </Typography>
                    
                </div>
                <div>
                <Typography variant="caption">
                    -6
                    </Typography>
                </div>
            </Div>
            <Divider />

            <h6 style={{marginBottom:0}}>STRIKE RATE</h6>
            <Typography variant="caption" style={{marginTop:0,marginBlockEnd: "2.33em"}}>*Minimum 10 balls needs to be played</Typography>

 
            <Div>
                <div>
                    <Typography variant="caption">
                    Between 60-70 runs
                    </Typography>
                    
                </div>
                <div>
                <Typography variant="caption">
                    -2
                    </Typography>
                </div>
            </Div>
            <Divider />
            <Div>
                <div>
                    <Typography variant="caption">
                    Between 50-59.9 runs
                    </Typography>
                    
                </div>
                <div>
                <Typography variant="caption">
                    -4
                    </Typography>
                </div>
            </Div>
            <Divider />
            <Div>
                <div>
                    <Typography variant="caption">
                    Below 50 runs
                    </Typography>
                    
                </div>
                <div>
                <Typography variant="caption">
                    -6
                    </Typography>
                </div>
            </Div>
            <Divider />
            <h6 style={{marginBottom:0}}>OTHERS</h6>
            <Typography variant="caption" style={{marginTop:0,marginBlockEnd: "2.33em"}}>*Only applicable in Fantasy 11 contests</Typography>
     
            <Div>
                <div>
                    <Typography variant="caption">
                    Captain
                    </Typography>
                    
                </div>
                <div>
                <Typography variant="caption">
                    2X points earned
                    </Typography>
                </div>
            </Div>
            <Divider />
            <Div>
                <div>
                    <Typography variant="caption">
                    Vice Captain
                    </Typography>
                    
                </div>
                <div>
                <Typography variant="caption">
                1.5X points earned
                    </Typography>
                </div>
            </Div>
            <Divider />

        </Paper>
        </div>
        
        

        <div style={value === 1 ? { display: 'block', marginTop: '10px' } : { display: 'none' }}  >
        <Paper elevation={0} style={{
            padding:5,
            marginTop:5
        }}>

            
        <Div>
                <div>
                    <Typography variant="caption">
                    Starting 11
                    </Typography>
                    
                </div>
                <div>
                <Typography variant="caption">
                    +2
                    </Typography>
                </div>
            </Div>
            <Divider />

            <h6>BATTING</h6>
            <Div>
                <div>
                    <Typography variant="caption">
                    Run
                    </Typography>
                    
                </div>
                <div>
                <Typography variant="caption">
                    +1
                    </Typography>
                </div>
            </Div>
            <Divider />
            <Div>
                <div>
                    <Typography variant="caption">
                    4s bonus
                    </Typography>
                    
                </div>
                <div>
                <Typography variant="caption">
                    +1
                    </Typography>
                </div>
            </Div>
            <Divider />
            <Div>
                <div>
                    <Typography variant="caption">
                    6s bonus
                    </Typography>
                    
                </div>
                <div>
                <Typography variant="caption">
                    +2
                    </Typography>
                </div>
            </Div>
            <Divider />
            <Div>
                <div>
                    <Typography variant="caption">
                    50s bonus
                    </Typography>
                    
                </div>
                <div>
                <Typography variant="caption">
                    +4
                    </Typography>
                </div>
            </Div>
            <Divider />
            <Div>
                <div>
                    <Typography variant="caption">
                    100s bonus
                    </Typography>
                    
                </div>
                <div>
                <Typography variant="caption">
                    +8
                    </Typography>
                </div>
            </Div>
            <Divider />
            <Div>
                <div>
                    <Typography variant="caption">
                    Out for a Duck
                    </Typography>
                    
                </div>
                <div>
                <Typography variant="caption">
                    -4
                    </Typography>
                </div>
            </Div>
            <Divider />

            <h6>BOWLING</h6>
            <Div>
                <div>
                    <Typography variant="caption">
                    Wicket
                    </Typography>
                    
                </div>
                <div>
                <Typography variant="caption">
                    +25
                    </Typography>
                </div>
            </Div>
            <Divider />
            <Div>
                <div>
                    <Typography variant="caption">
                    4 wickets haul Bonus 
                    </Typography>
                    
                </div>
                <div>
                <Typography variant="caption">
                    +4
                    </Typography>
                </div>
            </Div>
            <Divider />
            <Div>
                <div>
                    <Typography variant="caption">
                    5 wickets haul Bonus 
                    </Typography>
                    
                </div>
                <div>
                <Typography variant="caption">
                    +8
                    </Typography>
                </div>
            </Div>
            <Divider />
            <Div>
                <div>
                    <Typography variant="caption">
                    Maiden over
                    </Typography>
                    
                </div>
                <div>
                <Typography variant="caption">
                    +4
                    </Typography>
                </div>
            </Div>
            <Divider />
 
            <h6 style={{marginBottom:0}}>FIELDING</h6>
            <Typography variant="caption" style={{marginTop:0,marginBlockEnd: "2.33em"}}>*Points are not honored to the thrower in run-outs.</Typography>

            <Div>
                <div>
                    <Typography variant="caption">
                    Catch
                    </Typography>
                    
                </div>
                <div>
                <Typography variant="caption">
                    +12
                    </Typography>
                </div>
            </Div>
            <Divider />
            <Div>
                <div>
                    <Typography variant="caption">
                    Stumping
                    </Typography>
                    
                </div>
                <div>
                <Typography variant="caption">
                    +12
                    </Typography>
                </div>
            </Div>
            <Divider />
            <Div>
                <div>
                    <Typography variant="caption">
                     Run-out(Stumping)
                    </Typography>
                    
                </div>
                <div>
                <Typography variant="caption">
                    +12
                    </Typography>
                </div>
            </Div>
             
            <Divider />

        
            <h6 style={{marginBottom:0}}>ECONOMY RATE</h6>
            <Typography variant="caption" style={{marginTop:0,marginBlockEnd: "2.33em"}}>*Minimum 5 overs needs to be bowled</Typography>
          

            <Div>
                <div>
                    <Typography variant="caption">
                    Below 2.5 runs per over
                    </Typography>
                    
                </div>
                <div>
                <Typography variant="caption">
                    +6
                    </Typography>
                </div>
            </Div>
            <Divider />
            <Div>
                <div>
                    <Typography variant="caption">
                    Between 2.5 - 3.49 runs per over
                    </Typography>
                    
                </div>
                <div>
                <Typography variant="caption">
                    +4
                    </Typography>
                </div>
            </Div>
            <Divider />
            <Div>
                <div>
                    <Typography variant="caption">
                    Between 3.5 - 4.5 runs per over
                    </Typography>
                    
                </div>
                <div>
                <Typography variant="caption">
                    +2
                    </Typography>
                </div>
            </Div>
            <Divider />
            <Div>
                <div>
                    <Typography variant="caption">
                    Between 7 - 7.99 runs per over
                    </Typography>
                    
                </div>
                <div>
                <Typography variant="caption">
                    -2
                    </Typography>
                </div>
            </Div>
            <Divider />
            <Div>
                <div>
                    <Typography variant="caption">
                    Between 8 - 8.99 runs per over
                    </Typography>
                    
                </div>
                <div>
                <Typography variant="caption">
                    -4
                    </Typography>
                </div>
            </Div>
            <Divider />
            <Div>
                <div>
                    <Typography variant="caption">
                    Above 9 runs per over
                    </Typography>
                    
                </div>
                <div>
                <Typography variant="caption">
                    -6
                    </Typography>
                </div>
            </Div>
            <Divider />

            <h6 style={{marginBottom:0}}>STRIKE RATE</h6>
            <Typography variant="caption" style={{marginTop:0,marginBlockEnd: "2.33em"}}>*Minimum 20 balls needs to be played</Typography>
 

 
            <Div>
                <div>
                    <Typography variant="caption">
                    Between 50-60 runs
                    </Typography>
                    
                </div>
                <div>
                <Typography variant="caption">
                    -2
                    </Typography>
                </div>
            </Div>
            <Divider />
            <Div>
                <div>
                    <Typography variant="caption">
                    Between 40-49.9 runs
                    </Typography>
                    
                </div>
                <div>
                <Typography variant="caption">
                    -4
                    </Typography>
                </div>
            </Div>
            <Divider />
            <Div>
                <div>
                    <Typography variant="caption">
                    Below 40 runs
                    </Typography>
                    
                </div>
                <div>
                <Typography variant="caption">
                    -6
                    </Typography>
                </div>
            </Div>
            <Divider />
            <h6 style={{marginBottom:0}}>OTHERS</h6>
            <Typography variant="caption" style={{marginTop:0,marginBlockEnd: "2.33em"}}>*Only applicable in Fantasy 11 contests</Typography>
    
            <Div>
                <div>
                    <Typography variant="caption">
                    Captain
                    </Typography>
                    
                </div>
                <div>
                <Typography variant="caption">
                    2X points earned
                    </Typography>
                </div>
            </Div>
            <Divider />
            <Div>
                <div>
                    <Typography variant="caption">
                    Vice Captain
                    </Typography>
                    
                </div>
                <div>
                <Typography variant="caption">
                1.5X points earned
                    </Typography>
                </div>
            </Div>
            <Divider />

        </Paper>
        </div>
        

        <div style={value === 2 ? { display: 'block', marginTop: '10px' } : { display: 'none' }}  >
        <Paper elevation={0} style={{
            padding:5,
            marginTop:5
        }}>

                <Div>
                <div>
                    <Typography variant="caption">
                    Starting 11
                    </Typography>
                    
                </div>
                <div>
                <Typography variant="caption">
                    +2
                    </Typography>
                </div>
            </Div>
            <Divider />
 

            <h6>BATTING</h6>
            <Div>
                <div>
                    <Typography variant="caption">
                    Run
                    </Typography>
                    
                </div>
                <div>
                <Typography variant="caption">
                    +1
                    </Typography>
                </div>
            </Div>
            <Divider />
            <Div>
                <div>
                    <Typography variant="caption">
                    4s bonus
                    </Typography>
                    
                </div>
                <div>
                <Typography variant="caption">
                    +1
                    </Typography>
                </div>
            </Div>
            <Divider />
            <Div>
                <div>
                    <Typography variant="caption">
                    6s bonus
                    </Typography>
                    
                </div>
                <div>
                <Typography variant="caption">
                    +2
                    </Typography>
                </div>
            </Div>
            <Divider />
            <Div>
                <div>
                    <Typography variant="caption">
                    50s bonus
                    </Typography>
                    
                </div>
                <div>
                <Typography variant="caption">
                    +4
                    </Typography>
                </div>
            </Div>
            <Divider />
            <Div>
                <div>
                    <Typography variant="caption">
                    100s bonus
                    </Typography>
                    
                </div>
                <div>
                <Typography variant="caption">
                    +8
                    </Typography>
                </div>
            </Div>
            <Divider />
            <Div>
                <div>
                    <Typography variant="caption">
                    Out for a Duck
                    </Typography>
                    
                </div>
                <div>
                <Typography variant="caption">
                    -4
                    </Typography>
                </div>
            </Div>
            <Divider />

            <h6>BOWLING</h6>
            <Div>
                <div>
                    <Typography variant="caption">
                    Wicket
                    </Typography>
                    
                </div>
                <div>
                <Typography variant="caption">
                    +20
                    </Typography>
                </div>
            </Div>
            <Divider />
            <Div>
                <div>
                    <Typography variant="caption">
                    4 wickets haul Bonus 
                    </Typography>
                    
                </div>
                <div>
                <Typography variant="caption">
                    +4
                    </Typography>
                </div>
            </Div>
            <Divider />
            <Div>
                <div>
                    <Typography variant="caption">
                    5 wickets haul Bonus 
                    </Typography>
                    
                </div>
                <div>
                <Typography variant="caption">
                    +8
                    </Typography>
                </div>
            </Div>
            <Divider />
            <Div>
                <div>
                    <Typography variant="caption">
                    Maiden over
                    </Typography>
                    
                </div>
                <div>
                <Typography variant="caption">
                    +4
                    </Typography>
                </div>
            </Div>
            <Divider />
 
            <h6>FIELDING</h6>
            <Div>
                <div>
                    <Typography variant="caption">
                    Catch
                    </Typography>
                    
                </div>
                <div>
                <Typography variant="caption">
                    +12
                    </Typography>
                </div>
            </Div>
            <Divider />
            <Div>
                <div>
                    <Typography variant="caption">
                    Stumping
                    </Typography>
                    
                </div>
                <div>
                <Typography variant="caption">
                    +12
                    </Typography>
                </div>
            </Div>
            <Divider />
            <Div>
                <div>
                    <Typography variant="caption">
                     Run-out(Stumping)
                    </Typography>
                    
                </div>
                <div>
                <Typography variant="caption">
                    +12
                    </Typography>
                </div>
            </Div>
            <Divider />
 
            <h6 style={{marginBottom:0}}>OTHERS</h6>
            <Typography variant="caption" style={{marginTop:0,marginBlockEnd: "2.33em"}}>*Only applicable in Fantasy 11 contests</Typography>
      
            <Div>
                <div>
                    <Typography variant="caption">
                    Captain
                    </Typography>
                    
                </div>
                <div>
                <Typography variant="caption">
                    2X points earned
                    </Typography>
                </div>
            </Div>
            <Divider />
            <Div>
                <div>
                    <Typography variant="caption">
                    Vice Captain
                    </Typography>
                    
                </div>
                <div>
                <Typography variant="caption">
                1.5X points earned
                    </Typography>
                </div>
            </Div>
            <Divider />

        </Paper>
        </div>
        
        
            </Container>
        </div>
    );

}