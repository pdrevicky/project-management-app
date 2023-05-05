import React from "react";
import { Link } from "react-router-dom";
import Avatar from "./Avatar";
import styled from "@emotion/styled";
import { Project } from "../types/types";

interface Props {
  projects: Project[];
}

export default function ProjectList({ projects }: Props) {
  return (
    <ProjectListContainer>
      {projects.length === 0 && <p>No projects yet!</p>}
      {projects.map((project) => (
        <Link key={project.id} to={`/projects/${project.id}`}>
          <h4>{project.name}</h4>
          <p>Due by {project.dueDate?.toDate().toDateString()}</p>
          <AssignedTo>
            <ul>
              {project.assignedUsersList?.map((user) => (
                <li key={user.photoURL}>
                  <Avatar src={user.photoURL!} />
                </li>
              ))}
            </ul>
          </AssignedTo>
        </Link>
      ))}
    </ProjectListContainer>
  );
}

const ProjectListContainer = styled.div`
  margin-top: 40px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  grid-gap: 20px;
  a {
    background-color: #fff;
    padding: 16px;
    border-radius: 6px;
    box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.05);
    text-decoration: none;
    color: inherit;
  }
  p {
    color: var(--text-color);
    font-size: 0.9em;
  }
  h4 {
    font-size: 0.9em;
    color: var(--heading-color);
  }
  ul {
    margin: 10px 0;
    display: flex;
  }
  li {
    margin-right: 10px;
  }
  .avatar {
    width: 30px;
    height: 30px;
  }
`;

const AssignedTo = styled.div`
  margin-top: 20px;
  padding-top: 10px;
  border-top: 1px solid #eee;
`;
