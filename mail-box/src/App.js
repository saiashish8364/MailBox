import { Suspense } from "react";
import LogIn from "./Components/Pages/LogIn";
import SignUp from "./Components/Pages/SignUp";
import Home from "./Components/Pages/Home";
import { Switch } from "react-router-dom/cjs/react-router-dom.min";
import { Route } from "react-router-dom/cjs/react-router-dom";
import ComposeMail from "./Components/Pages/ComposeMail";
import Inbox from "./Components/Pages/Inbox";
import Navig from "./Components/Others/Navig";
import ViewMail from "./Components/Pages/ViewMail";

function App() {
  return (
    <>
      <div
        style={{
          display: "flex",
          width: "100%",
          backgroundColor: "black",
          height: "100px",

          color: "white",
        }}
      >
        <p
          style={{
            marginLeft: "20%",
            fontSize: "2rem",
          }}
        >
          Firebase Mail Box
        </p>
      </div>
      <Navig />
      <main>
        <Suspense>
          <Switch>
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="/SignUp" exact>
              <SignUp />
            </Route>
            <Route path="/LogIn" exact>
              <LogIn />
            </Route>
            <Route path="/ComposeMail" exact>
              <ComposeMail />
            </Route>
            <Route path="/Inbox">
              <Inbox />
            </Route>
            <Route path="/ViewMail">
              <ViewMail />
            </Route>
          </Switch>
        </Suspense>
      </main>
    </>
  );
}
export default App;
