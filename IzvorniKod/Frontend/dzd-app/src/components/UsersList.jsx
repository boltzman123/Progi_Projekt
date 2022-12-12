import axios from "axios";
import React, { Component, useEffect, useState } from "react";
import { toast } from "react-toastify";
import UserKard from "./UserKard";
import UserListCSS from '../style/components/UserList.module.css'


function UsersList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios({
      method: "get",
      url: "/api/users",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    })
      .then((response) => {
        setUsers(response.data);
      })
      .catch((err) => {
        toast.error("Greška iz baze!");
      });
  }, []);
  if (users.length == 1) {
    return <div>Nema novih korisnika</div>;
  } else {
    return (
      <div className={UserListCSS.userList}>
        {users.map((user) => {
          console.log(user.email);
          if (user.email !== "admin") {
            return <UserKard key={user.email} user={user}></UserKard>;
          }
        })}
      </div>
    );
  }
}
export default UsersList;
