import { useEffect } from "react";
import Header from "./components/Header";
import RouterWrapper from "./RouterWrapper";
import { BrowserRouter } from "react-router-dom";

function App() {
  // const controlVar = '';
  // useEffect(() => {
  //   console.log('mount');
  //   return(() => {
  //     console.log('unmount');
  //   })
  // }, [controlVar]);
  return (
    <BrowserRouter>
      <Header />
      <RouterWrapper />
    </BrowserRouter>
  )
  // return (<div>app</div>)
}

export default App
