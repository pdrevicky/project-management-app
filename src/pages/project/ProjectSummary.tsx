import Avatar from "../../components/Avatar";
import { useFirestore } from "../../hooks/useFirestore";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useHistory } from "react-router-dom";
import React from "react";
import { Project } from "../../types/types";
import styled from "@emotion/styled";
interface Props {
  project: Project;
}

export default function ProjectSummary({ project }: Props) {
  const { deleteDocument } = useFirestore("projects");
  const { user } = useAuthContext();
  const history = useHistory();

  const handleClick = (e: React.FormEvent) => {
    deleteDocument(project.id);
    history.push("/");
  };

  return (
    <div>
      <ProjectSummaryContainer>
        <h2 className="page-title">{project.name}</h2>
        <p>By {project?.createdBy?.displayName}</p>
        <DueDate>
          Project due by {project?.dueDate?.toDate().toDateString()}
        </DueDate>
        <Details>{project.details}</Details>
        <h4>Project assigned to:</h4>
        <AssignedUsers>
          {project?.assignedUsersList?.map((user) => (
            <div key={user.id}>
              <Avatar src={user.photoURL!} />
            </div>
          ))}
        </AssignedUsers>
      </ProjectSummaryContainer>
      {user?.uid === project?.createdBy?.id && (
        <button className="btn" onClick={handleClick}>
          Mark as Complete
        </button>
      )}
    </div>
  );
}

const ProjectSummaryContainer = styled.div`
  background-color: #fff;
  padding: 30px;
  border-radius: 4px;

  h4 {
    color: var(--text-color);
    font-size: 0.9em;
  }

  .project-summary .assigned-users + .btn {
    margin-top: 20px;
  }
`;

const DueDate = styled.p`
  margin: 10px 0;
  font-size: 0.9em;
  color: var(--title-color);
`;

const Details = styled.p`
  margin: 30px 0;
  color: var(--text-color);
  line-height: 1.8em;
  font-size: 0.9em;
`;

const AssignedUsers = styled.div`
  display: flex;
  margin-top: 20px;
  .avatar {
    margin-right: 10px;
  }
`;
