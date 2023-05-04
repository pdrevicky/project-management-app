import React from "react";
import { useCollection } from "../hooks/useCollection";
import Avatar from "./Avatar";

// styles
import "./OnlineUsers.css";
import { User } from "../types/types";

export default function OnlineUsers() {
  const collection: string = "users";
  const { error, documents } = useCollection<User>({ collection });

  return (
    <div className="user-list">
      <h2>All Users</h2>
      {error && <div className="error">{error}</div>}
      {documents &&
        //@ts-ignore
        documents?.map((user) => (
          <div key={user.id} className="user-list-item">
            {user.online && <span className="online-user"></span>}
            <span>{user.displayName}</span>
            <Avatar src={user.photoURL!} />
          </div>
        ))}
    </div>
  );
}
