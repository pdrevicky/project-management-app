import { useParams } from "react-router-dom";
import { useDocument } from "../../hooks/useDocument";
import React from "react";
import ProjectSummary from "./ProjectSummary";
import ProjectComments from "./ProjectComments";
import styled from "@emotion/styled";

export default function Project() {
  const { id } = useParams<{ id: string }>();
  const { document, error } = useDocument("projects", id);

  if (error) {
    return <div className="error">{error}</div>;
  }
  if (!document) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <ProjectDedails>
      <ProjectSummary project={document} />
      <ProjectComments project={document} />
    </ProjectDedails>
  );
}

const ProjectDedails = styled.div`
  display: grid;
  grid-template-columns: 3fr 2fr;
  align-items: start;
  grid-gap: 60px;
`;
