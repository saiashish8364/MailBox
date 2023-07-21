import { useRef, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

const LogIn = () => {
  const [email, setEmail] = useState(false);
  const [pass, setpass] = useState(false);
  const mailInputRef = useRef();
  const passwordInputRef = useRef();
  const history = useHistory();

  function mailChangeHandler() {
    setEmail(true);
  }
  function passChangeHandler() {
    setpass(true);
  }
  function navToSignUp() {
    console.log("nva call");
  }

  const loginSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC6DNQiZJtzBZkQEXEDCHYEu-dgj_wwNoA",
        {
          method: "POST",
          body: JSON.stringify({
            email: mailInputRef.current.value,
            password: passwordInputRef.current.value,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        const res = await response.json();
        //dispatch(authActions.login(String(res.idToken)));
        history.push("/");
        localStorage.setItem("token", res.idToken);
        let re = mailInputRef.current.value;
        let mail = "";
        for (let i = 0; i < re.length; i++) {
          if (re[i] !== "@" && re[i] !== ".") {
            mail = mail + re[i];
          }
        }
        localStorage.setItem("email", mail);

        console.log("user Logged in successfully.");
      } else {
        alert("Login failed!!!");
      }
    } catch (error) {
      alert(error);
      console.log(error);
    }
    mailInputRef.current.value = "";
    passwordInputRef.current.value = "";
    setEmail(false);
    setpass(false);
  };
  const forgotPasswordHandler = () => {
    //history.push("/PassReset");
    console.log("forgot password");
  };
  return (
    <>
      <section
        style={{
          justifyContent: "center",
          display: "flex",
          marginTop: "2.5rem",
          marginLeft: "25%",
          width: "47.5%",
          height: "60%",
        }}
      >
        <form
          onSubmit={loginSubmitHandler}
          style={{ width: "50%", justifyContent: "center", height: "100%" }}
        >
          <fieldset>
            <legend
              style={{
                fontFamily: "Trebuchet MS",
                justifyContent: "center",
                display: "flex",
                marginTop: "4rem",
                color: "black",
                fontSize: "2.25rem",
                fontWeight: "bold",
              }}
            >
              Log In
            </legend>
            <label>E-Mail:</label>
            <br />
            <input
              type="text"
              ref={mailInputRef}
              onChange={mailChangeHandler}
              style={{
                width: "90%",
              }}
            />
            <br />
            <label>Password:</label>
            <br />
            <input
              type="password"
              ref={passwordInputRef}
              onChange={passChangeHandler}
              style={{
                width: "90%",
              }}
            />
            <br />
            <br />
            <button
              type="submit"
              disabled={email && pass ? false : true}
              style={{
                width: "40%",
                height: "20%",
                justifyContent: "center",
                backgroundColor: "black",
                color: "white",
                marginLeft: "30%",
              }}
            >
              Log In
            </button>
          </fieldset>
        </form>
      </section>
      <section
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <button
          style={{
            width: "23.5%",
            marginTop: "1rem",
            backgroundColor: "lightgray",
            color: "black",
            height: "10%",
            marginLeft: "-2.5%",
          }}
          onClick={navToSignUp}
        >
          Don't Have an Account? SignUp
        </button>
      </section>
      <button
        onClick={forgotPasswordHandler}
        style={{
          display: "flex",
          justifyContent: "center",
          width: "30%",
          marginTop: "0.5rem",
          color: "blue",
          height: "10%",
          padding: "1px",
          border: "none",
          background: "none",
          marginLeft: "33%",
        }}
      >
        <u>Forgot password</u>
      </button>
    </>
  );
};
export default LogIn;
