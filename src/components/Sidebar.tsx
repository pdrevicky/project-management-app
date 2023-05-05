import { NavLink } from "react-router-dom";
import React from "react";
import Avatar from "./Avatar";
import { useAuthContext } from "../hooks/useAuthContext";
import styled from "@emotion/styled";

//images
import DashboardIcon from "../assets/dashboard_icon.svg";
import AddIcon from "../assets/add_icon.svg";

export default function Sidebar() {
  const { user } = useAuthContext();

  return (
    <SidebarContainer>
      <SidebarContent>
        <User>
          <Avatar src={user?.photoURL!} />
          <p>{user?.displayName}</p>
        </User>
        <Links>
          <ul>
            <li>
              {/* Navlink has active class so when we are on that route it will add some style if we define it */}
              <NavLink exact to="/">
                <img src={DashboardIcon} alt="dashboard icon" />
                <span>Dashboard</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/create">
                <img src={AddIcon} alt="add icon" />
                <span>New Project</span>
              </NavLink>
            </li>
          </ul>
        </Links>
      </SidebarContent>
    </SidebarContainer>
  );
}

const SidebarContainer = styled.div`
  width: 300px;
  min-width: 300px;
  background: var(--primary-color);
  min-height: 100vh;
  box-sizing: border-box;
  position: relative;
  color: #fff;
`;

const SidebarContent = styled.div`
  position: fixed;
  width: inherit;
`;

const User = styled.div`
  font-weight: bold;
  text-align: center;
  letter-spacing: 1px;
  padding: 40px 30px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
`;

const Links = styled.nav`
  margin-top: 80px;
  margin-left: 20px;
  li {
    margin-top: 10px;
  }
  a {
    display: flex;
    padding: 10px;
    text-decoration: none;
    width: 100%;
    color: #fff;
    box-sizing: border-box;
  }
  img {
    margin-right: 10px;
    filter: invert(100%);
  }
  a.active {
    color: #555;
    background: var(--bg-color);
    border-radius: 20px 0 0 20px;
  }
  .active img {
    filter: invert(40%);
  }
`;
