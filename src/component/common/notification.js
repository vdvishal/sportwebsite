 
import React from 'react';
 


import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
 
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
  

const Notification = (props) => {
    switch (props.type) {
      case "error":
        return(           
          <Snackbar
                 open={props.open}
                 autoHideDuration={1500}
                 anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                 key={`top,right`}
                 onClose={props.close}
                 style={{zIndex:99999999999999999}}
                 // message={props.message}
         >
             <Alert  onClose={props.close} severity="error">
             {props.message}
             </Alert>
         </Snackbar>
        )

      default:
          return(           
            <Snackbar
                   open={props.open}
                   autoHideDuration={6000}
                   anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                   key={`top,right`}
                   onClose={props.close}
                   // message={props.message}
           >
               <Alert onClose={props.close} severity={props.type} >
               {props.message}
               </Alert>
           </Snackbar>
          )
    }

}


export default Notification