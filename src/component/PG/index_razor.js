import React,{useEffect} from 'react';
import * as js from '../common/color.json';
import * as api from '../../api/pg'
import {  useContext  } from 'react';
import {HomeContext} from '../home';

 
import Button from '@material-ui/core/Button';
import { Divider, Container } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Input } from '@material-ui/core';

let options = {}
 
export default function Payment() {
  const [amount, setamount] = React.useState(0);
  const [wait, setwait] = React.useState(false);
  const [balance, setWallet] = useContext(HomeContext)
  
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
}, []);

const handleClick = async (event) => {
    setwait(true)
 
    api.stripe(amount).then(response => {
       
      setwait(false)
      options = {
        key: 'rzp_test_XUhylBt5ecsoht',
        amount: response.data.amount, //  = INR 1
        name: 'Fanway',
        order_id:response.data.id,
        description: 'some description',
        handler: function(response) {
            alert(response.razorpay_payment_id);
        },
        prefill: {
            name: 'Gaurav',
            contact: '9999999999',
            email: 'demo@demo.com'
        },
        notes: {
            address: 'some address'
        },
     
      };

      var rzp1 = new window.Razorpay(options);
      rzp1.open();
    })



  };


 

  const setAmount = (amount) => {
      setamount(amount)
  }



  return (

    <Container maxWidth={'sm'}
    style={{
      marginTop:10,
      display:'flex',
      flexDirection:'column',
      alignItems:'center'
  }}
    >
      <Paper
            style={{
              width:'100%',
              height:100,
              display:'flex',
              justifyContent:'center',
              alignItems:'center',
              backgroundColor: js.buttonGreen,
              color: 'white'
          }}
      >
                                <h4>
                                DEPOSIT
                        </h4>
        
      </Paper>

      
       <TextField
                      
                        autoFocus
                        margin="dense"
                        id="name"
                         label="Amount"
                        fullWidth
                        onChange={(event) => setAmount(event.target.value)}
                        value={amount}
                    />
                    <div
                       style={{
                        justifyContent:'center',
                        display:'flex',
                        flexDirection:'row',
                        flexWrap:'wrap',
                        alignItems:'center'
                    }}
                    >
                    <Button  size="medium" variant="contained" style={{
                                    backgroundColor: js.buttonGreen,
                                    color: 'white',
                                    width:200
                                }} onClick={handleClick}>
        Deposit
      </Button>
                     </div>

 
 
      {wait? (
        <div style={{
          position:'fixed',
          zIndex:999
        }}>
          <CircularProgress style={{
        position: "fixed",
        top: "50%",
        left: "50%"
    }} disableShrink />
        </div>
      ):<div style={{
        position:'fixed',
        zIndex:999,display:'none'
      }}></div>}                            

 
      

    </Container>
  );
}