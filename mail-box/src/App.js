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
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import { authActions } from "./Components/Store/AuthSlice";
import { unreadMailActions } from "./Components/Store/UnreadMails";
function App() {
  const dispatch = useDispatch();
  const history = useHistory();
  const isLoggedIn = useSelector((state) => state.auth.isAuthenticated);
  useEffect(() => {
    dispatch(unreadMailCount());
  }, [dispatch]);
  function logoutHandler() {
    history.push("/LogIn");
    dispatch(authActions.logout());
    dispatch(unreadMailActions.setToZero());
    localStorage.removeItem("from");
    localStorage.removeItem("token");
    localStorage.removeItem("email");
  }
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
        <button onClick={logoutHandler}>Logout</button>
      </div>
      <Navig />
      <main>
        <Suspense>
          <Switch>
            <Route path="/" exact>
              {isLoggedIn && <Home />}
              {!isLoggedIn && <LogIn />}
            </Route>
            <Route path="/SignUp" exact>
              <SignUp />
            </Route>
            <Route path="/LogIn" exact>
              <LogIn />
            </Route>
            <Route path="/ComposeMail" exact>
              {isLoggedIn && <ComposeMail />}
              {!isLoggedIn && <LogIn />}
            </Route>
            <Route path="/Inbox">
              {isLoggedIn && <Inbox />}
              {!isLoggedIn && <LogIn />}
            </Route>
            <Route path="/ViewMail" exact>
              {isLoggedIn && <ViewMail />}
              {!isLoggedIn && <LogIn />}
            </Route>
            <Route path="/OutBox" exact>
              {isLoggedIn && <OutBox />}
              {!isLoggedIn && <LogIn />}
            </Route>
            <Route path="/ViewSentMail" exact>
              {isLoggedIn && <ViewSentMail />}
              {!isLoggedIn && <LogIn />}
            </Route>
          </Switch>
        </Suspense>
      </main>
    </>
  );
}
export default App;
