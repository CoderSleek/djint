import React, { useState } from 'react';
import styled from "styled-components";

const Post = ({ post }) => {
  const [liked, setLiked] = useState(false);
  const date = new Date(post.timing);
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear().toString();

  const formattedDate = `${hours}:${minutes} ${day}-${month}-${year}`;
  const toggleLiked = () => {
    setLiked(!liked);
  };

  return (
    <Container>
      <Image src={`data:image/jpeg;base64,${post.image}`} alt={post.title} />
      <div style={{ 'marginLeft': '20px' }}>
        <Title>{post.title}</Title>
        <Timings>{formattedDate}</Timings>
        <Cost>{post.cost}</Cost>
        <Timings>{post.description}</Timings>
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

