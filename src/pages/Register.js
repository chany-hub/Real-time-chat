import React from "react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

import { useForm } from "../utils/hooks";

const Register = (props) => {
  const { values, onChange, onSubmit } = useForm(registerUser, {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    variables: values,
    update: (proxy, result) => {
      console.log(result);
      props.history.push("/");
    },
  });

  function registerUser() {
    addUser();
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          name="username"
          type="text"
          placeholder="Username"
          onChange={onChange}
          value={values.username}
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={onChange}
          value={values.email}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={onChange}
          value={values.password}
        />
        <input
          name="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          onChange={onChange}
          value={values.confirmPassword}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

const REGISTER_USER = gql`
  mutation register(
    $username: String
    $email: String
    $password: String
    $confirmPassword: String
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      token
      username
      email
      createdAt
    }
  }
`;

export default Register;
