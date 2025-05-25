import { gql } from "@apollo/client";

export const GET_TASKS = gql`
  query GetTasks {
    tasks {
      id
      title
      content
      completed
      dueDate
    }
  }
`;

export const CREATE_TASK = gql`
  mutation CreateTask($title: String!, $content: String, $dueDate: String) {
    createTask(title: $title, content: $content, dueDate: $dueDate) {
      id
      title
      content
      completed
      dueDate
    }
  }
`;

export const UPDATE_TASK = gql`
  mutation UpdateTask(
    $id: ID!
    $title: String
    $content: String
    $dueDate: String
    $completed: Boolean
  ) {
    updateTask(
      id: $id
      title: $title
      content: $content
      dueDate: $dueDate
      completed: $completed
    ) {
      id
      title
      content
      completed
      dueDate
    }
  }
`;

export const DELETE_TASK = gql`
  mutation DeleteTask($id: ID!) {
    deleteTask(id: $id) {
      id
    }
  }
`;

export const LOGIN_USER = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      userId
    }
  }
`;

export const REGISTER_USER = gql`
  mutation Register($name: String!, $email: String!, $password: String!) {
    register(name: $name, email: $email, password: $password) {
      token
      userId
    }
  }
`;
