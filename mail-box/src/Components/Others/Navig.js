import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import { useSelector } from "react-redux";
const Navig = () => {
  const history = useHistory();
  const count = useSelector((state) => state.count.count);
  const composeMailHandler = () => {
    history.push("/ComposeMail");
  };
  return (
    <>
      <section
        style={{
          marginTop: "100px",
          width: "220px",
          backgroundColor: "#000000",
          height: "100%",
          position: "fixed",
          left: "0",
          top: "0",
          paddingTop: "20px",
          color: "white",
        }}
      >
        <section
          style={{
            width: "100%",
          }}
        >
          <button
            style={{
              marginLeft: "40px",
              backgroundColor: "#36454F",
              borderRadius: "5px",
              color: "white",
              width: "130px",
              height: "40px",
            }}
            onClick={composeMailHandler}
          >
            Compose Mail
          </button>
        </section>
        <nav
          style={{
            justifyContent: "center",
          }}
        >
          <Link to="/">
            <p
              style={{
                marginTop: "30px",
                color: "white",
                marginLeft: "35%",
              }}
            >
              Home
            </p>
          </Link>

          <Link to="/Inbox">
            <p
              style={{
                marginTop: "20px",
                marginLeft: "35%",
                color: "white",
              }}
            >
              Inbox
              <button
                style={{
                  marginLeft: "5px",
                  borderRadius: "50%",
                  backgroundColor: "lightgrey",
                }}
              >
                {count}
              </button>
            </p>
          </Link>
          <Link to="/OutBox">
            <p
              style={{
                marginTop: "20px",
                marginLeft: "35%",
                color: "white",
              }}
            >
              Outbox
            </p>
          </Link>
        </nav>
      </section>
    </>
  );
};
export default Navig;
