import React, { useContext } from "react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

import { useForm } from "../utils/hooks";
import { AuthContext } from "../context/auth";

const Login = (props) => {
  const context = useContext(AuthContext);

  const { onChange, onSubmit, values } = useForm(loginCallback, {
    username: "",
    password: "",
  });

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    variables: values,
    update: (proxy, { data: { login: userData } }) => {
      context.login(userData);
      props.history.push("/");
    },
  });

  function loginCallback() {
    loginUser();
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          name="username"
          placeholder="Username"
          type="text"
          onChange={onChange}
          value={values.username}
        />
        <input
          name="password"
          placeholder="Password"
          type="password"
          onChange={onChange}
          value={values.password}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

const LOGIN_USER = gql`
  mutation login($username: String, $password: String) {
    login(username: $username, password: $password) {
      id
      token
      username
      email
      createdAt
    }
  }
`;

export default Login;
