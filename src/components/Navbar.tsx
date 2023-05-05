import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import React from "react";
import styled from "@emotion/styled";

//images
import Temple from "../assets/temple.svg";

export default function Navbar() {
  const { logout, isPending } = useLogout();
  const { user } = useAuthContext();

  return (
    <NavbarContainer>
      <ul>
        <li className="logo">
          <img src={Temple} alt="dojo" />
          <span>The Dojo</span>
        </li>
        {!user && (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Signup</Link>
            </li>
          </>
        )}
        {user && (
          <li>
            {!isPending && (
              <button className="btn" onClick={logout}>
                Logout
              </button>
            )}
            {isPending && (
              <button disabled className="btn">
                Logging out...
              </button>
            )}
          </li>
        )}
      </ul>
    </NavbarContainer>
  );
}

const NavbarContainer = styled.div`
  width: 100%;
  padding: 30px 0;
  box-sizing: border-box;
  margin-bottom: 80px;

  ul {
    display: flex;
    margin: 0 auto;
    align-items: center;
    justify-content: flex-end;
  }
  .logo {
    font-weight: bold;
    color: var(--heading-color);
    letter-spacing: 1px;
    display: flex;
    align-items: center;
    margin-right: auto;
  }
  .logo img {
    margin-right: 10px;
    filter: invert(25%);
    width: 36px;
    margin-top: -8px;
  }
  a {
    color: #333;
    text-decoration: none;
    margin-right: 20px;
  }
`;
