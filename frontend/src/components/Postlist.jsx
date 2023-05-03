import React from 'react';
import Post from './Post';
import styled from 'styled-components';

function PostsList(props) {
  const posts = props.posts;
  const List = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
    max-width: 900px;
    width: 60%;
    margin-left: auto;
    margin-right: auto;
  `;

  return (
    <List className='posts-list'>
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </List>
  );
}

export default PostsList;