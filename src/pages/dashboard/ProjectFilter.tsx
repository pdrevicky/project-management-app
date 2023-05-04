import React from "react";

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
    <div className="project-filter">
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
    </div>
  );
}
