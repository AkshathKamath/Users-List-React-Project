import React, { useState } from "react";
import Card from "../UI/Card";
import Button from "../UI/Button";
import classes from "./AddUser.module.css";
import ErrorModal from "../UI/ErrorModal";
import Wrapper from "../Helpers/Wrapper";

const AddUser = (props) => {
  const [userName, setUserName] = useState("");
  const [age, setAge] = useState("");
  const [error, setError] = useState();

  const userNameChangeHandler = (event) => {
    setUserName(event.target.value);
  };
  const ageChangeHandler = (event) => {
    setAge(event.target.value);
  };

  const addUserHandler = (event) => {
    event.preventDefault();

    if (userName.trim().length === 0 || age.trim().length === 0) {
      setError({
        title: "Invalid Input",
        message: "Please enter a valid name & age (Non-Empty values)",
      });
      return;
    }

    if (+age < 1) {
      setError({
        title: "Invalid Age",
        message: "Please enter correct age (Greater than 0)",
      });
      return;
    }

    props.onAddUser(userName, age);

    setUserName("");
    setAge("");
  };

  const ErrorHandler = () => {
    setError(null);
  };

  return (
    <Wrapper>
      {error && (
        <ErrorModal
          onConfirm={ErrorHandler}
          title={error.title}
          message={error.message}
        ></ErrorModal>
      )}
      <Card className={classes.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="username">UserName</label>
          <input
            id="username"
            type="text"
            onChange={userNameChangeHandler}
            value={userName}
          />
          <label htmlFor="age">Age(Years)</label>
          <input
            id="age"
            type="number"
            onChange={ageChangeHandler}
            value={age}
          />
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </Wrapper>
  );
};

export default AddUser;
