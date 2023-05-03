import React from 'react';
import Post from './Post';
import styled from 'styled-components';

function PostsList() {
  const posts = [
    {
      id: 1,
      image: 'https://via.placeholder.com/150',
      title: 'Post 1',
      timings: '1 hr ago',
      cost: '$10',
      liked: false,
    },
    {
      id: 2,
      image: 'https://via.placeholder.com/150',
      title: 'Post 2',
      timings: '2 hrs ago',
      cost: '$20',
      liked: true,
    },
    {
      id: 3,
      image: 'https://via.placeholder.com/150',
      title: 'Post 3',
      timings: '3 hrs ago',
      cost: '$30',
      liked: false,
    },
  ];

  const List = styled.div`
    width: 70%;
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