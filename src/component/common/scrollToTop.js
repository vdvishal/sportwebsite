import { useEffect } from "react";
  
function ScrollToTop({ children }) {
  
  useEffect(() => {
    window.scrollTo(0, 0);
    console.log("windo");
    
  }, []);
 
  return children;
}
 
export default ScrollToTop;