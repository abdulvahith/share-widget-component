import { useState } from "react";
import "./App.css";
import Share from "./Components/Share";
import { ChakraProvider } from "@chakra-ui/react";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className='App'>
      <ChakraProvider>
        <Share />
      </ChakraProvider>
    </div>
  );
}

export default App;
