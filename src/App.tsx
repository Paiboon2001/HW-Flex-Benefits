import { useState } from "react";
import Splash from "./pages/Splash";
import FlexBenefits from "./pages/FlexBenefits";

function App() {
  const [showSplash, setShowSplash] = useState(true);

  if (showSplash) {
    return <Splash onFinish={() => setShowSplash(false)} />;
  }

  return <FlexBenefits />;
}

export default App;
