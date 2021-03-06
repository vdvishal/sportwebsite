import React from 'react';
import ReactGA from 'react-ga';

 import { useEffect } from 'react';
 
import * as pg from '../../api/pg'
 
import { Container, Paper, Typography, Divider } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import Pagination from '@material-ui/lab/Pagination';

import styled from 'styled-components'

 
const Div = styled.div`
  display: grid;
  grid-template-columns: 1fr;
   grid-gap: 2px;
   padding:10px;
  align-items: center;
    text-align:start;
   
`


export default function Transaction() {
    const [transaction, setTransaction] = React.useState(null);
    const [pages, setPage] = React.useState(1);

    

    useEffect(() => {
        window.scrollTo(0, 0)
        pg.transaction(1).then(response => {            
            setTransaction(response.data.data);
            setPage(response.data.page)
        }).catch(error => {
            console.log(error);
 
        })
    },[])

    const getPageCustom = (event,page) => {
        
        setTransaction(null)
        pg.transaction(page).then(response => {            
            setTransaction(response.data.data);
            
        }).catch(error => {
            setTransaction([])
            console.log(error);
 
        })
    }


    const viewList = () => transaction.map(orders => 
             <Paper style={{marginTop:10}} elevation={1} key={orders._id}>
                    <Div>
                        <Typography style={{padding:1.5,fontSize:12}} variant="caption" >
                            {new Date(orders.createdAt).toLocaleString()}
                        </Typography>
                        <Typography style={{padding:2.5,fontSize:12}} variant="caption" >
                             
                        </Typography>
                         
                        <Typography style={{padding:2.5,fontSize:14}} variant="caption" >
                           bank account verified
                        </Typography>
 

                         
                </Div>
                <Divider />
            </Paper>
     )

    return (
       
         <Container maxWidth="sm" style={{
            minHeight:"80vh",
            display:"flex",
            flexDirection:"column",
                            justifyContent:"space-between",
                            alignContent:"center"
        }} >
            <div>

           
 
             
                 
                    { transaction !== null ? transaction.length > 0 ? viewList() :  <div style={{
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
                }} disableShrink />}


           
            
            </div>
            <div
            style={{
                marginTop:15,
              width: "100%",
              textAlign: "center",
              alignItems: "center",
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              
            }}>
            <Pagination 
             onChange={getPageCustom}
            
             count={pages} color="secondary"  />
                </div>
              
        
        </Container>
        
    )
}