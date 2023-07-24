import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

const Inbox = () => {
  const [inbox, setInbox] = useState([]);
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
        setInbox(data);
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchMails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const composeMailHandler = () => {
    history.push("/ComposeMail");
  };
  return (
    <>
      <button onClick={composeMailHandler}>Compose Mail</button>
      <table>
        <tbody>
          {Object.entries(inbox).map(([key, email]) => {
            return (
              <tr key={key}>
                <td>{email.subject}</td>
                <td>{email.body}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};
export default Inbox;
