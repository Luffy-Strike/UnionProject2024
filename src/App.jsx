import { useEffect } from "react";
import Header from "./components/Header";
import RouterWrapper from "./RouterWrapper";
import { BrowserRouter } from "react-router-dom";

function App() {
  useEffect(() => {
    console.log('mount');
    return(() => {
      console.log('unmount');
    })
  }, []);
  // return (
  //   <BrowserRouter>
  //     <Header />
  //     <RouterWrapper />
  //   </BrowserRouter>
  // )
  return (<div>app</div>)
}

export default App
