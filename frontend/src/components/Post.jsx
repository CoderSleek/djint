import React, { useState } from 'react';
import styled from "styled-components";
// import { FaHeart } from "react-icons/fa";
<FontAwesomeIcon icon="fa-light fa-heart" style={{color: "#000000",}} />

// function Post({ post }) {
//   const [liked, setLiked] = useState(post.liked);

//   const handleLike = () => {
//     setLiked(!liked);

//     // Update database here
//   };

//   return (
//     <div className="post">
//       <div className="post-image">
//         <img src={post.image} alt={post.title} />
//       </div>
//       <div className="post-content">
//         <h2>{post.title}</h2>
//         <p>{post.timings}</p>
//         <p>{post.cost}</p>
//         <button onClick={handleLike}>
//           {liked ? 'Unlike' : 'Like'}
//         </button>
//       </div>
//     </div>
//   );
// }


const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #ddd;
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

const HeartIcon = styled(FaHeart)`
  color: ${(props) => (props.liked ? "#ff69b4" : "#ccc")};
  cursor: pointer;
  margin-left: auto;
`;

const Post = ({ post }) => {
  const [liked, setLiked] = useState(false);

  const toggleLiked = () => {
    setLiked(!liked);
    // Make a call to the backend to update the like status in the database
  };

  return (
    <Container>
      <Image src={post.image} alt={post.title} />
      <div>
        <Title>{post.title}</Title>
        <Timings>{post.timings}</Timings>
        <Cost>{post.cost}</Cost>
      </div>
      <HeartIcon onClick={toggleLiked} liked={liked} />
    </Container>
  );
};

export default Post;

