import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { viewMailActions } from "../Store/ViewMailSlice";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

const OutBox = () => {
  const [outbox, setOutbox] = useState([]);
  const dispacth = useDispatch();
  const history = useHistory();
  async function tableRowOnClickHandler(id) {
    try {
      const response = await fetch(
        `https://mail-box-39d58-default-rtdb.asia-southeast1.firebasedatabase.app/Mails/${String(
          localStorage.getItem("email")
        )}/sent/${String(id)}.json`
      );
      if (response.ok) {
        const data = await response.json();
        dispacth(viewMailActions.seeMail(data));
        history.push("/ViewSentMail");
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchMails() {
    try {
      const response = await fetch(
        `https://mail-box-39d58-default-rtdb.asia-southeast1.firebasedatabase.app/Mails/${String(
          localStorage.getItem("email")
        )}/sent.json`
      );
      if (response.ok) {
        const data = await response.json();
        const outboxData = Object.entries(data).map(([key, email]) => ({
          id: key,
          body: email.body,
          to: email.to,
          subject: email.subject,
        }));
        setOutbox(outboxData);
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchMails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <section
        style={{
          marginLeft: "220px",
        }}
      >
        <section
          style={{
            width: "100%",
            marginLeft: "2.5px",
            justifyContent: "space-around",
            marginTop: "1%",
          }}
        >
          <table
            style={{
              borderCollapse: "collapse",
              fontFamily: "Trebuchet MS",
              marginLeft: "10px",
            }}
          >
            <tbody>
              {outbox.map((mail) => {
                return (
                  <tr
                    key={String(mail.id)}
                    id={mail.id}
                    style={{
                      borderBottom: "1pt solid black",
                      borderBottomColor: "gray",
                      height: "35px",
                      fontSize: "1.1rem",
                      cursor: "pointer",
                    }}
                  >
                    <td
                      style={{
                        width: "350px",
                      }}
                      onClick={() => tableRowOnClickHandler(mail.id)}
                    >
                      {mail.subject}
                    </td>
                    <td
                      style={{
                        width: "1400px",
                      }}
                      onClick={() => tableRowOnClickHandler(mail.id)}
                    >
                      {mail.body}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </section>
      </section>
    </>
  );
};
export default OutBox;
