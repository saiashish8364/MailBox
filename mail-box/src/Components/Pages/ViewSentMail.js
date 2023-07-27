import { useSelector } from "react-redux";
const ViewSentMail = () => {
  const vmail = useSelector((state) => state.viewMail.mail);

  const containData = useSelector((state) => state.viewMail.containData);
  return (
    <>
      {containData && (
        <section
          style={{
            width: "70%",
            height: "70%",
            marginLeft: "275px",
            marginTop: "5%",
          }}
        >
          <p>to:</p>
          <div
            style={{
              display: "flex",
            }}
          >
            <button
              disabled
              style={{
                marginRight: "5px",
                width: "35px",
                height: "35px",
                borderRadius: "50%",
                color: "white",
                backgroundColor: "black",
              }}
            >
              {`${String(vmail[0].to[0])}`}
            </button>
            <p
              style={{
                marginTop: "7.5px",
              }}
            >{`<${vmail[0].to}>`}</p>
          </div>
          <div style={{ display: "flex" }}>
            <p style={{ marginRight: "10px" }}>Subject:</p>
            <p>{vmail[0].subject}</p>
          </div>

          <div
            style={{
              width: "60%",
              height: "60%",
              fontSize: "1.15rem",
              marginLeft: "45px",
            }}
          >
            {vmail[0].body}
          </div>
        </section>
      )}
    </>
  );
};
export default ViewSentMail;
