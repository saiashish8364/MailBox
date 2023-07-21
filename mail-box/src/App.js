import { Suspense } from "react";
import LogIn from "./Components/Pages/LogIn";
import SignUp from "./Components/Pages/SignUp";
import Home from "./Components/Pages/Home";
import { Switch } from "react-router-dom/cjs/react-router-dom.min";
import { Route } from "react-router-dom/cjs/react-router-dom";

function App() {
  return (
    <>
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
          </Switch>
        </Suspense>
      </main>
    </>
  );
}
export default App;
