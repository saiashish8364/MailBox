import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { viewMailActions } from "../Store/ViewMailSlice";
import { unreadMailActions } from "../Store/UnreadMails";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

const Inbox = () => {
  const [inbox, setInbox] = useState([]);
  const dispacth = useDispatch();
  const history = useHistory();

  async function fetchMails() {
    try {
      const response = await fetch(
        `https://mail-box-39d58-default-rtdb.asia-southeast1.firebasedatabase.app/Mails/${String(
          localStorage.getItem("email")
        )}/inbox.json`
      );
      if (response.ok) {
        const data = await response.json();
        const inboxData = Object.entries(data).map(([key, email]) => ({
          id: key,
          body: email.body,
          from: email.from,
          subject: email.subject,
          state: email.state,
        }));
        setInbox(inboxData);
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchMails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  async function markAsRead(id, updatedData) {
    try {
      await fetch(
        `https://mail-box-39d58-default-rtdb.asia-southeast1.firebasedatabase.app/Mails/${String(
          localStorage.getItem("email")
        )}/inbox/${String(id)}.json`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        }
      );
    } catch (error) {
      console.log(error);
    }
  }
  async function tableRowOnClickHandler(id) {
    try {
      const response = await fetch(
        `https://mail-box-39d58-default-rtdb.asia-southeast1.firebasedatabase.app/Mails/${String(
          localStorage.getItem("email")
        )}/inbox/${String(id)}.json`
      );
      if (response.ok) {
        const data = await response.json();
        dispacth(viewMailActions.seeMail(data));
        history.push("/ViewMail");
        if (data.state === "unread") {
          const updatedData = {
            body: data.body,
            from: data.from,
            state: "read",
            subject: data.subject,
          };
          markAsRead(id, updatedData);
          dispacth(unreadMailActions.removeReadMails(1));
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
  function getDot(status) {
    return status.state === "unread" ? "blue" : "white";
  }
  async function deleteMailHandler(e) {
    try {
      let em = String(localStorage.getItem("email"));
      let id = String(e.target.id);
      const response = await fetch(
        `https://mail-box-39d58-default-rtdb.asia-southeast1.firebasedatabase.app/Mails/${String(
          em
        )}/inbox/${String(id)}.json`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        console.log("deleted");
        fetchMails();
      } else {
        console.error("Failed to delete mail");
      }
    } catch (error) {
      console.error("Error deleting mail:", error);
    }
  }
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
            }}
          >
            <tbody>
              {/* {Object.entries(inbox).map(([key, email]) => {
            return (
              <tr key={key}>
                <td>{email.subject}</td>
                <td>{email.body}</td>
              </tr>
            );
          })} */}
              {inbox.map((mail) => {
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
                      <span
                        style={{
                          display: "inline-block",
                          width: "8.5px",
                          height: "8.5px",
                          backgroundColor: getDot(mail),
                          borderRadius: "50%",
                          marginLeft: "5px",
                          marginRight: "5px",
                        }}
                      />
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
                    <td>
                      <button
                        id={mail.id}
                        onClick={deleteMailHandler}
                        style={{
                          marginRight: "20px",
                          backgroundColor: "#343434",
                          color: "white",
                          height: "30px",
                          width: "75px",
                          marginBottom: "10px",
                          borderRadius: "15px",
                        }}
                      >
                        Delete
                      </button>
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
export default Inbox;
