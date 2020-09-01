import React from 'react';
import ReactGA from 'react-ga';

 import { useEffect } from 'react';
 
import * as pg from '../../api/pg'
 
import { Container, Paper, Typography, Divider } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';

import styled from 'styled-components'

 
const Div = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr  1fr;
   grid-gap: 2px;
  align-items: center;
    text-align:center;
    width:100%
`


export default function Transaction() {
    const [transaction, setTransaction] = React.useState(undefined);
 

    useEffect(() => {
        pg.transaction(0).then(response => {            
            setTransaction(response.data)
        }).catch(error => {
            console.log(error);
 
        })
    },[])


    const viewList = () => transaction.map(orders => 
             <Paper square elevation={0} key={orders._id}>
                    <Div>
                        <Typography style={{padding:2.5,fontSize:12}} variant="caption" >
                            {new Date(orders.createdAt).toLocaleString()}
                        </Typography>
                        <Typography style={{padding:2.5,fontSize:10}} variant="caption" >
                            {orders.orderId && orders.status === 'paid' ? `Deposit: ${orders.orderId}` : orders.orderId }
                        </Typography>
 
                        <Typography style={{padding:2.5,
                            fontSize:15,
                            display:"flex",
                            justifyContent:"center",
                            alignContent:"center"
                        }} 
                        variant="caption" >
                        {orders.status === 'paid' || orders.status === 'bonus' || orders.status === 'contest_credit' ? <span style={{color:"#77BC37"}}>+{(orders.amount/100).toFixed(2)} INR</span>: <span style={{color:"red"}}>-{(orders.amount/100).toFixed(2)} INR</span>}
                          {/* {orders.status === 'paid' ?   <ImportExportIcon color="secondary" />    : <ImportExportIcon style={{color:"red"}} />} */}
                        </Typography>
                </Div>
                <Divider />
            </Paper>
     )

    return (
        transaction ? transaction.length > 0 ? <Container maxWidth="md" >
            
            <Paper square elevation={0}>
                <Div>
                    <Typography style={{fontWeight:700,padding:10,fontSize:15}} variant="caption" >
                            Date
                        </Typography>
                        <Typography style={{fontWeight:700,padding:10,fontSize:15}} variant="caption" >
                            Type
                        </Typography>
 
                        <Typography style={{fontWeight:700,padding:10,fontSize:15}} variant="caption" >
                            Amount
                        </Typography>
                </Div>    
            </Paper>
            <Paper square>
                 
                    {viewList()}
              
            </Paper> 
        </Container>
        :  <div style={{
            display:"flex",
            justifyContent:"center",
            padding:10,
            height:'80vh',

        }}>
            <Typography style={{padding:2.5,fontSize:15}} variant="caption" >
                You haven't made any transactions yet
            </Typography>
            </div> :  <CircularProgress style={{
                    position: "fixed",
                    top: "50%",
                    left: "50%"
                }} disableShrink />
    )
}