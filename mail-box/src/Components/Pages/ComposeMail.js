import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import React, { useRef, useState } from "react";
import { EditorState, ContentState } from "draft-js";
const ComposeMail = () => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createWithContent(ContentState.createFromText(""))
  );
  const toInputRef = useRef();
  const subjectInputRef = useRef();

  const handleSendMail = async () => {
    let to = "";
    const toMail = String(toInputRef.current.value);
    for (let i = 0; i < toMail.length; i++) {
      if (toMail[i] !== "@" && toMail[i] !== ".") {
        to = String(to) + String(toMail[i]);
      }
    }
    // You can implement the logic to send the mail using the editorState content
    const content = editorState.getCurrentContent();
    const emailBody = content.getPlainText();
    const data = {
      from: String(localStorage.getItem("email")),
      subject: subjectInputRef.current.value,
      body: emailBody,
    };
    try {
      const response = await fetch(
        `https://mail-box-39d58-default-rtdb.asia-southeast1.firebasedatabase.app/Mails/${to}/inbox.json`,
        {
          method: "POST",
          body: JSON.stringify(data),
        }
      );
      if (response.ok) {
        console.log("received ok");
      }
    } catch (error) {
      alert(error);
    }
    const data1 = {
      to: toMail,
      subject: subjectInputRef.current.value,
      body: emailBody,
    };
    try {
      const response = await fetch(
        `https://mail-box-39d58-default-rtdb.asia-southeast1.firebasedatabase.app/Mails/${String(
          localStorage.getItem("email")
        )}/sent.json`,
        {
          method: "POST",
          body: JSON.stringify(data1),
        }
      );
      if (response.ok) {
        console.log("sent ok");
      }
    } catch (error) {
      alert(error);
    }
    toInputRef.current.value = "";
    subjectInputRef.current.value = "";
    setEditorState("");
  };
  return (
    <>
      <section
        style={{
          width: "85%",
          marginLeft: "5%",
          marginTop: "5%",
          justifyContent: "center",
        }}
      >
        <label>To</label>
        <input
          style={{
            width: "99%",
            border: "none",
            borderBottom: "1px solid ",
            padding: "5px 0",
            backgroundColor: "transparent",
            outline: "none",
          }}
          ref={toInputRef}
        />
        <label>Subject</label>
        <input
          style={{
            width: "99%",
            border: "none",
            borderBottom: "1px solid ",
            padding: "5px 0",
            backgroundColor: "transparent",
            outline: "none",
          }}
          ref={subjectInputRef}
        />
        <fieldset
          style={{
            marginTop: "15px",
          }}
        >
          <Editor
            editorState={editorState}
            onEditorStateChange={(newEditorState) =>
              setEditorState(newEditorState)
            }
          />
        </fieldset>
        <button onClick={handleSendMail}>submit</button>
      </section>
    </>
  );
};
export default ComposeMail;
