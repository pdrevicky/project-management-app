import React, { useState } from "react";
import { timestamp } from "../../firebase/config";
import { useAuthContext } from "../../hooks/useAuthContext";
import uuid from "react-uuid";
import { useFirestore } from "../../hooks/useFirestore";
import Avatar from "../../components/Avatar";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { Project } from "../../types/types";
import styled from "@emotion/styled";

interface Props {
  project: Project;
}

export default function ProjectComments({ project }: Props) {
  const [newComment, setNewComment] = useState("");
  const { user } = useAuthContext();
  const { updateDocument, response } = useFirestore("projects");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const commentToAdd = {
      displayName: user?.displayName,
      photoURL: user?.photoURL,
      content: newComment,
      createdAt: timestamp.fromDate(new Date()),
      id: uuid(),
    };

    // add new comment to specific project
    await updateDocument(project.id, {
      comments: [...project.comments, commentToAdd],
    });
    if (!response.error) {
      setNewComment("");
    }
  };

  return (
    <ProjectCommentsContainer>
      <h4>Project Comments</h4>

      <ul>
        {project.comments.length > 0 &&
          project.comments.map((comment) => (
            <li key={comment.id}>
              <CommentAuthor>
                <Avatar src={comment.photoURL!} />
                <p>{comment.displayName}</p>
              </CommentAuthor>
              <CommentDate>
                <p>
                  {formatDistanceToNow(comment.createdAt.toDate(), {
                    addSuffix: true,
                  })}
                </p>
              </CommentDate>
              <CommentContent>
                <p>{comment.content}</p>
              </CommentContent>
            </li>
          ))}
      </ul>

      <form className="add-comment" onSubmit={handleSubmit}>
        <label>
          <span>Add new comment:</span>
          <textarea
            required
            onChange={(e) => setNewComment(e.target.value)}
            value={newComment}
          ></textarea>
        </label>
        <button className="btn">Add Comment</button>
      </form>
    </ProjectCommentsContainer>
  );
}

const ProjectCommentsContainer = styled.div`
  label {
    margin-bottom: 0px;
  }
  textarea {
    min-height: 40px;
    font-size: 1.5em;
  }

  h4 {
    color: var(--heading-color);
  }
  li {
    padding: 16px;
    border-radius: 4px;
    border: 1px solid #f2f2f2;
    margin-top: 20px;
    box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.05);
    background: #fff;
  }
`;

const CommentAuthor = styled.div`
  display: flex;
  align-items: center;
  color: var(--title-color);
  .avatar {
    width: 30px;
    height: 30px;
    margin-right: 10px;
  }
`;
const CommentDate = styled.div`
  color: var(--text-color);
  font-size: 0.9em;
  margin: 4px 0 10px;
`;
const CommentContent = styled.div`
  color: var(--text-color);
  font-size: 0.9em;
`;
