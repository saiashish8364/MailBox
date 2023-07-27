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
import { useEffect } from "react";
import { unreadMailCount } from "./Components/Store/UnreadMails";
import { useDispatch } from "react-redux";
import OutBox from "./Components/Pages/Outbox";
import ViewSentMail from "./Components/Pages/ViewSentMail";
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(unreadMailCount());
  }, [dispatch]);
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
            <Route path="/ViewMail" exact>
              <ViewMail />
            </Route>
            <Route path="/OutBox" exact>
              <OutBox />
            </Route>
            <Route path="/ViewSentMail" exact>
              <ViewSentMail />
            </Route>
          </Switch>
        </Suspense>
      </main>
    </>
  );
}
export default App;
