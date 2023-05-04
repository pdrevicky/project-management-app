import React from "react";
import { Link } from "react-router-dom";
import Avatar from "./Avatar";

// styles
import "./ProjectList.css";
import { Project } from "../types/types";

interface Props {
  projects: Project[];
}

export default function ProjectList({ projects }: Props) {
  return (
    <div className="project-list">
      {projects.length === 0 && <p>No projects yet!</p>}
      {projects.map((project) => (
        <Link key={project.id} to={`/projects/${project.id}`}>
          <h4>{project.name}</h4>
          <p>Due by {project.dueDate?.toDate().toDateString()}</p>
          <div className="assigned-to">
            <ul>
              {project.assignedUsersList?.map((user) => (
                <li key={user.photoURL}>
                  <Avatar src={user.photoURL!} />
                </li>
              ))}
            </ul>
          </div>
        </Link>
      ))}
    </div>
  );
}
