import React from "react";
import styled from "@emotion/styled";

interface Props {
  src: string;
}

export default function Avatar({ src }: Props) {
  return (
    <Container className="avatar">
      <img src={src} alt="user avatar" />
    </Container>
  );
}

const Container = styled.div`
  display: inline-block;
  width: 50px;
  height: 50px;
  border-radius: 50px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
  }
`;
