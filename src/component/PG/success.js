import React,{useEffect} from 'react';
import * as js from '../common/color.json';
import * as api from '../../api/pg'
import {  useContext  } from 'react';
import {HomeContext} from '../home';

 
import Button from '@material-ui/core/Button';
import { Divider, Container, Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Input } from '@material-ui/core';

 
 
export default function Payment() {
 
  
  useEffect(() => {
 
}, []);

 
  return (

    <Container maxWidth={'sm'}
    style={{
      marginTop:10,
      display:'flex',
      flexDirection:'column',
      alignItems:'center'
  }}
    >

            <Paper >
                <Typography variant="caption">
                    Transaction Successfull
                </Typography>

            </Paper>                    

  
      

    </Container>
  );
}