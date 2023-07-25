import { useSelector } from "react-redux";
const ViewMail = () => {
  const vmail = useSelector((state) => state.viewMail.mail);
  console.log(vmail);
  const containData = useSelector((state) => state.viewMail.containData);
  return (
    <>
      {containData && (
        <section
          style={{
            width: "50%",
            height: "50%",
            marginLeft: "25%",
            marginTop: "5%",
          }}
        >
          <fieldset>
            <p>From:</p>
            <div
              style={{
                display: "flex",
              }}
            >
              <button
                disabled
                style={{
                  marginTop: "5px",
                  marginRight: "5px",
                  width: "35px",
                  height: "35px",
                  borderRadius: "50%",
                  color: "white",
                  backgroundColor: "black",
                }}
              >
                p
              </button>
              <p>{`<${vmail[0].from}>`}</p>
            </div>

            <p>{vmail[0].subject}</p>
            <h1>{vmail[0].body}</h1>
          </fieldset>
        </section>
      )}
    </>
  );
};
export default ViewMail;
