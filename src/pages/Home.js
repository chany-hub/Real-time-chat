import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";

import Chat from "../components/Chat";

const CHAT_QUERY = gql`
  query chats {
    chats {
      id
      body
    }
  }
`;

const NEW_CHAT = gql`
  subscription {
    newChat {
      body
    }
  }
`;

let unsubscribe = null;

export default () => (
  <Query query={CHAT_QUERY}>
    {({ loading, data, subscribeToMore }) => {
      if (loading) {
        return null;
      }
      if (!unsubscribe) {
        unsubscribe = subscribeToMore({
          document: NEW_CHAT,
          updateQuery: (prev, { subscriptionData }) => {
            if (!subscriptionData) return prev;
            const { newChat } = subscriptionData.data;
            return {
              ...prev,
              chats: [...prev.chats, newChat],
            };
          },
        });
      }
      return (
        <div>
          {data.chats.map((x) => (
            <h3 key={x.id}>{x.body}</h3>
          ))}
          <Chat />
        </div>
      );
    }}
  </Query>
);
