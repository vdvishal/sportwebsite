import React,{useEffect} from 'react';
import qs from 'querystring';
import { useHistory } from 'react-router-dom';

 
import { Divider, Container, Typography } from '@material-ui/core';
 
import Paper from '@material-ui/core/Paper';
 
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
});
 
 
export default function Success(props) {
  console.log('props: ', props);
  let ss = props.location.search.split('?')
  let order = qs.parse(ss[1])

  const [progress, setProgress] = React.useState(0);
  const [count, secount] = React.useState(5);

  const {orderId,paymentMode,orderAmount,txMsg,txStatus}  = order

  const classes = useStyles();
   console.log('order: ', order);

  const history = useHistory()

  useEffect(() => {
    setInterval(() => {
      secount((prevProgress) => (prevProgress - 1));

   setProgress((prevProgress) => (prevProgress + 20));

 }, 1000);

 

 setTimeout(() => {
   history.push('/')
 }, 5000);
}, []);

 if(txStatus === "SUCCESS"){
  return (

    <Container maxWidth={'sm'}
    style={{
      marginTop:10,
      display:'flex',
      flexDirection:'column',
      alignItems:'center'
  }}>
      <Paper elevation={0} style={{backgroundColor:"rgba(0,0,0,0)",margin:"100px 0 10px 0"}}>
    <Typography variant="h6">
    SUCCESS
    </Typography>
  </Paper>
 
      <Paper elevation={0} style={{
        display:'grid',
        backgroundColor:"rgba(0,0,0,0)",
        gridTemplateColumns:"1fr 1fr",
        gridGap:10,
        padding:10,
        margin:10
      }}>
        <Typography variant="caption">
          OrderId        
        </Typography>
        <Typography variant="caption">
          {orderId}        
        </Typography>
        <Typography variant="caption">
        Payment Mode        
        </Typography>
        <Typography variant="caption">
        {paymentMode}
        </Typography>
        <Typography variant="caption">
        Order Amount        
        </Typography>

        <Typography variant="caption">
        {orderAmount}     
        </Typography>
        <Typography variant="caption">
        Message     
        </Typography>
        <Typography variant="caption">
        {txMsg}     
        </Typography>
      </Paper>
      
      
      <div className={classes.root}>
      <Paper elevation={0} style={{
        display:'grid',
        backgroundColor:"rgba(0,0,0,0)",}}>

            
            <Typography variant="caption">
            Redirecting {count} sec   
            </Typography>
        </Paper>
        <LinearProgress  variant="determinate" color="secondary" value={progress}/>

      </div>
    </Container>
  );
 }else{
  return (

    <Container maxWidth={'sm'}
    style={{
      marginTop:10,
      display:'flex',
      flexDirection:'column',
      alignItems:'center'
  }}>
      <Paper elevation={0} style={{backgroundColor:"rgba(0,0,0,0)",margin:"100px 0 10px 0"}}>
    <Typography variant="h6">
      FAILED
    </Typography>
  </Paper>
 
      <Paper elevation={0} style={{
        display:'grid',
        backgroundColor:"rgba(0,0,0,0)",
        gridTemplateColumns:"1fr 1fr",
        gridGap:10,
        padding:10,
        margin:10
      }}>
        <Typography variant="caption">
          OrderId        
        </Typography>
        <Typography variant="caption">
          {orderId}        
        </Typography>
        <Typography variant="caption">
        Payment Mode        
        </Typography>
        <Typography variant="caption">
        {paymentMode}
        </Typography>
        <Typography variant="caption">
        Order Amount        
        </Typography>

        <Typography variant="caption">
        {orderAmount}     
        </Typography>
        <Typography variant="caption">
        Message     
        </Typography>
        <Typography variant="caption">
        {txMsg}     
        </Typography>
      </Paper>
      
      
      <div className={classes.root}>
      <Paper elevation={0} style={{
        display:'grid',
        backgroundColor:"rgba(0,0,0,0)",}}>

            
            <Typography variant="caption">
            Redirecting {count} sec   
            </Typography>
        </Paper>
        <LinearProgress  variant="determinate" color="secondary" value={progress}/>

      </div>
    </Container>
  );
 }

}
 