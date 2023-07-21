import { useRef, useState } from "react";
const SignUp = () => {
  const [email, setEmail] = useState(false);
  const [pass, setpass] = useState(false);
  const [con, setCon] = useState(false);
  const mailInputRef = useRef();
  const passwordInputRef = useRef();
  const conformInputRef = useRef();
  function mailChangeHandler() {
    setEmail(true);
  }
  function passChangeHandler() {
    setpass(true);
  }
  function conChangeHandler() {
    setCon(true);
  }
  function navToLogin() {
    console.log("move to login");
  }

  const loginSubmitHandler = async (e) => {
    e.preventDefault();

    if (
      String(passwordInputRef.current.value) ===
      String(conformInputRef.current.value)
    ) {
      try {
        const response = await fetch(
          "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC6DNQiZJtzBZkQEXEDCHYEu-dgj_wwNoA",
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
          alert("user created successfully.Proceed to Login");
          console.log("user created successfully.");
        }
      } catch (error) {
        alert(error);
        console.log(error);
      }
    } else {
      alert("Password does not match!!");
    }

    mailInputRef.current.value = "";
    passwordInputRef.current.value = "";
    conformInputRef.current.value = "";
    setEmail(false);
    setpass(false);
    setCon(false);
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
                justifyContent: "center",
                display: "flex",
                marginTop: "4rem",
                color: "black",
                fontSize: "2.25rem",
                fontWeight: "bold",
              }}
            >
              Sign Up
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
            <label>Conform password:</label>
            <br />
            <input
              type="password"
              ref={conformInputRef}
              onChange={conChangeHandler}
              style={{
                width: "90%",
              }}
            />
            <br />
            <br />
            <button
              type="submit"
              disabled={email && pass && con ? false : true}
              style={{
                width: "40%",
                height: "20%",
                justifyContent: "center",
                backgroundColor: "black",
                color: "white",
                marginLeft: "30%",
              }}
            >
              Sign Up
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
          onClick={navToLogin}
        >
          Have an Account? Login
        </button>
      </section>
    </>
  );
};
export default SignUp;
