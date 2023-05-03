import React, { useState } from 'react';
import styled from "styled-components";

const Post = ({ post }) => {
  const [liked, setLiked] = useState(false);

  const toggleLiked = () => {
    setLiked(!liked);
    // Make a call to the backend to update the like status in the database
  };

  return (
    <Container>
      <Image src={post.image} alt={post.title} />
      <div style={{ 'marginLeft': '20px' }}>
        <Title>{post.title}</Title>
        <Timings>{post.timings}</Timings>
        <Cost>{post.cost}</Cost>
      </div>
      <HeartIcon className={liked ? 'fa fa-heart' : 'fa fa-heart-o'}
        liked={liked}
        onClick={toggleLiked} />
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-columns: 100px 1fr auto;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #ddd;
  & > *:last-child {
    justify-self: end;
  }
`;

const Image = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  margin-right: 20px;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: 600;
  margin-top: 0;
  margin-bottom: 5px;
`;

const Timings = styled.div`
  font-size: 16px;
  color: #777;
  margin-bottom: 5px;
`;

const Cost = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: #333;
`;

const HeartIcon = styled.i`
  color: ${(props) => (props.liked ? "hotpink" : "#ccc")};
  cursor: pointer;
  margin-left: auto;
  &:hover {color: ${({ liked }) => (liked ? 'pink' : 'gray')}};
`;

export default Post;

