import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

const CHAT_MUTATION = gql`
  mutation createMessage($body: String) {
    createMessage(body: $body) {
      id
      body
    }
  }
`;

const Chat = () => {
  const [body, setBody] = useState("");

  const [writeChat] = useMutation(CHAT_MUTATION, {
    variables: {
      body: "",
    },
    update: (proxy, result) => {
      console.log(result);
    },
  });

  return (
    <div>
      <input
        name="chat"
        type="text"
        placeholder="내용을 입력하세요"
        onChange={(e) => {
          setBody(e.target.value);
        }}
        onkeyPress={(e) => {
          if (e.key === "Enter") {
            setBody("");
            writeChat();
          }
        }}
        value={body}
      />
      <button
        onClick={(e) => {
          setBody("");
          writeChat();
        }}
      >
        Submit
      </button>
    </div>
  );
};

export default Chat;
