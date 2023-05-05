import React from "react";
import { useCollection } from "../hooks/useCollection";
import Avatar from "./Avatar";
import styled from "@emotion/styled";
import { User } from "../types/types";

export default function OnlineUsers() {
  const collection: string = "users";
  const { error, documents } = useCollection<User>({ collection });

  return (
    <UserList>
      <h2>All Users</h2>
      {error && <div className="error">{error}</div>}
      {documents &&
        //@ts-ignore
        documents?.map((user) => (
          <UserListItem key={user.id}>
            {user.online && <OnlineUser></OnlineUser>}
            <span>{user.displayName}</span>
            <Avatar src={user.photoURL!} />
          </UserListItem>
        ))}
    </UserList>
  );
}

const UserList = styled.div`
  width: 250px;
  min-width: 250px;
  padding: 30px;
  box-sizing: border-box;
  background: #fbfbfb;
  color: var(--heading-color);

  h2 {
    text-align: right;
    margin-bottom: 40px;
    padding-bottom: 10px;
    border-bottom: 1px solid #eee;
    font-size: 1.2em;
  }

  .avatar {
    margin-left: 10px;
    width: 40px;
    height: 40px;
  }
`;

const UserListItem = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin: 20px auto;
`;

const OnlineUser = styled.span`
  display: inline-block;
  margin-right: 10px;
  width: 12px;
  height: 12px;
  background: #0ebb50;
  border-radius: 50%;
  margin-top: 2px;
`;
