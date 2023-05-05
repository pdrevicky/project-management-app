import React, { useState, useEffect } from "react";
import Select, { MultiValue } from "react-select";
import { useCollection } from "../../hooks/useCollection";
import { timestamp } from "../../firebase/config";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useFirestore } from "../../hooks/useFirestore";
import { useHistory } from "react-router-dom";
import { User } from "../../types/types";
import styled from "@emotion/styled";

type CategoryOption = {
  value: string;
  label: string;
};

const categories: CategoryOption[] = [
  { value: "development", label: "Development" },
  { value: "design", label: "Design" },
  { value: "sales", label: "Sales" },
  { value: "marketing", label: "Marketing" },
];

export default function Create() {
  const history = useHistory();
  const collection: string = "users";
  const { documents } = useCollection<User[]>({ collection });
  const [users, setUsers] = useState<User[]>([]);
  const { user } = useAuthContext();
  // useFirestore(collection)
  const { addDocument, response } = useFirestore("projects");

  useEffect(() => {
    if (documents) {
      const options = documents.map((user) => {
        return { value: user, label: user.displayName };
      });
      //@ts-ignore
      setUsers(options);
    }
  }, [documents]);

  // form field values
  const [name, setName] = useState("");
  const [details, setDetails] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [category, setCategory] = useState<CategoryOption | null>();
  const [assignedUsers, setAssignedUsers] = useState<MultiValue<User>>([]);
  const [formError, setFormError] = useState("");

  const handleChange = (option: MultiValue<User>) => {
    setAssignedUsers(option);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    if (!category) {
      setFormError("Please select a project category");
      return;
    }
    if (assignedUsers.length < 1) {
      setFormError("Please assign the project to at least 1 user");
      return;
    }

    const createdBy: User = {
      displayName: user?.displayName ?? "",
      photoURL: user?.photoURL ?? "",
      id: user?.uid ?? "",
    };

    const assignedUsersList = assignedUsers.map((u) => {
      return {
        //@ts-ignore
        displayName: u.value.displayName,
        //@ts-ignore
        photoURL: u.value.photoURL,
        //@ts-ignore
        id: u.value.id,
      };
    });

    const project = {
      name,
      details,
      category: category.value,
      dueDate: timestamp.fromDate(new Date(dueDate)),
      comments: [],
      createdBy,
      assignedUsersList,
    };

    await addDocument(project);
    if (!response.error) {
      history.push("/");
    }
  };

  return (
    <CreateForm>
      <h2 className="page-title">Create a new Project</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Project name:</span>
          <input
            required
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </label>
        <label>
          <span>Project Details:</span>
          <textarea
            required
            onChange={(e) => setDetails(e.target.value)}
            value={details}
          ></textarea>
        </label>
        <label>
          <span>Set due date:</span>
          <input
            required
            type="date"
            onChange={(e) => setDueDate(e.target.value)}
            value={dueDate}
          />
        </label>
        <label>
          <span>Project category:</span>
          <Select
            options={categories}
            // this does not have to be called option
            onChange={(option) => setCategory(option)}
          />
        </label>
        <label>
          <span>Assign to:</span>
          <Select
            options={users}
            // this does not have to be called option
            onChange={(option) => handleChange(option)}
            // this allow multiple-select on component
            isMulti
          />
        </label>
        <button className="btn">Add Project</button>
        {formError && <p className="error">{formError}</p>}
      </form>
    </CreateForm>
  );
}

const CreateForm = styled.div`
  max-width: 600px;
`;
