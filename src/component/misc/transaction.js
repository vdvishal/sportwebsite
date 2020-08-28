import React from 'react';
import ReactGA from 'react-ga';

import { useHistory } from "react-router-dom";
import { useEffect } from 'react';
import * as js from '../common/color.json';
import Pagination from '@material-ui/lab/Pagination';
import * as api from '../../api/pg'
import { Container, Paper, Typography } from '@material-ui/core';

export default function Transaction(props) {
    const [count, setcount] = React.useState(0);
    const [logs, setlog] = React.useState([]);

    useEffect(() => {
        api.transaction(0).then(response => {
            setlog(response.data.data.logs);
            setcount(response.data.data.count)
            

        })
 
      },[]);

      const changePage = (page) => {
        api.transaction(page-1).then(response => {
             setlog(response.data.data.logs);

        })
      }

      return(
          <Container maxWidth={'sm'}>
                <Paper>
                  <Typography variant='h6' style={{
                      height:100,margin:'10px'
                  }}>
                        Transaction
                  </Typography>
                  </Paper>
                  <Paper
                        style={{
                            padding:'10px'
                        }}
                  >
                    {logs && logs.length > 0 ? logs.map(log => 
                            <Paper
                            elevation={0}
                                style={{
                                    margin:'10px'
                                }}
                            >
                                Transaction type: {log.type === 2 ? <span style={{color:'red'}}>Contest</span>:<span style={{color:'green'}}>Deposit</span>}
                                        <br/>
                                        {log.type === 2 ? <span style={{color:'red'}}>-${log.amount}</span>:<span style={{color:'green'}}>+${log.amount}</span>}
                                <br/>
                                {log.type === 2 ? <span>{new Date(log.created).toTimeString()}</span>:<span>{new Date(log.created).toString()}</span>}
                            </Paper>):
                            <Paper>
                                No transaction made    
                            </Paper>}
                  </Paper>
            {logs && logs.length > 0 ? <div>
                            <Pagination count={Math.ceil(count/25)} onChange={(event,page) => changePage(page)} />
                </div>: <div></div>}
          </Container>

    )
    }