import React from "react";
import styled from "@emotion/styled";

const filterList = [
  "all",
  "mine",
  "development",
  "design",
  "marketing",
  "sales",
];

interface Props {
  currentFilter: string;
  changeFilter: (newFilter: string) => void;
}

export default function ProjectFilter({ currentFilter, changeFilter }: Props) {
  const handleClick = (newFilter: string) => {
    changeFilter(newFilter);
  };

  return (
    <ProjectFilterContainer>
      <nav>
        <p>Filter by: </p>
        {filterList.map((f) => (
          <button
            key={f}
            onClick={() => handleClick(f)}
            className={currentFilter === f ? "active" : ""}
          >
            {f}
          </button>
        ))}
      </nav>
    </ProjectFilterContainer>
  );
}

const ProjectFilterContainer = styled.div`
  margin: 30px auto;
  nav {
    display: flex;
    padding: 10px;
    background-color: #fff;
    border-radius: 4px;
  }
  p {
    font-size: 0.9em;
    margin-right: 10px;
  }
  button {
    background: transparent;
    border: 0;
    font-family: inherit;
    font-weight: bold;
    color: var(--text-color);
    cursor: pointer;
    border-right: 1px solid #e4e4e4;
    font-size: 0.9em;
  }
  button:last-child {
    border: 0;
  }
  button.active {
    color: var(--primary-color);
  }
`;
