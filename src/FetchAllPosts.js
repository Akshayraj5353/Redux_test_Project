// FetchAllPosts.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { fetchPosts, createPost, updatePost, deletePost ,increment, decrement} from '../src/redux/actions';

const PostContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const PostCard = styled.div`
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  padding: 20px;
  margin: 10px;
  width: 300px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Button = styled.button`
  margin-top: 10px;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const Form = styled.form`
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Input = styled.input`
  margin: 5px;
  padding: 10px;
  width: 300px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const CounterContainer = styled.div`
  margin: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CounterButton = styled(Button)`
  background-color: #28a745;

  &:hover {
    background-color: #218838;
  }
`;

const FetchAllPosts = () => {
  const dispatch = useDispatch();
  const posts = useSelector(state => state.posts.posts);
  const count = useSelector(state => state.counter.count);

  const [newTitle, setNewTitle] = useState('');
  const [newBody, setNewBody] = useState('');

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const handleCreatePost = (e) => {
    e.preventDefault();
    if (newTitle && newBody) {
      dispatch(createPost({ title: newTitle, body: newBody }));
      setNewTitle('');
      setNewBody('');
    }
  };

  const handleEdit = (post) => {
    const updatedTitle = prompt('Enter new title', post.title);
    const updatedBody = prompt('Enter new body', post.body);

    if (updatedTitle && updatedBody) {
      const updatedPost = { ...post, title: updatedTitle, body: updatedBody };
      dispatch(updatePost(updatedPost));
    }
  };

  const handleDelete = (postId) => {
    dispatch(deletePost(postId));
  };

  const handleIncrement = () => {
    dispatch(increment());
  };

  const handleDecrement = () => {
    dispatch(decrement());
  };

  return (
    <div>
      <Form onSubmit={handleCreatePost}>
        <Input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="Title"
          required
        />
        <Input
          type="text"
          value={newBody}
          onChange={(e) => setNewBody(e.target.value)}
          placeholder="Body"
          required
        />
        <Button type="submit">Create Post</Button>
      </Form>
      <CounterContainer>
        <CounterButton onClick={handleIncrement}>Increment</CounterButton>
        <p style={{ margin: '0 20px' }}>{count}</p>
        <CounterButton onClick={handleDecrement}>Decrement</CounterButton>
      </CounterContainer>
      <PostContainer>
        {posts.map(post => (
          <PostCard key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
            <Button onClick={() => handleEdit(post)}>Edit</Button>
            <Button onClick={() => handleDelete(post.id)} style={{ backgroundColor: '#d9534f', marginLeft: '10px' }}>Delete</Button>
          </PostCard>
        ))}
      </PostContainer>
    </div>
  );
};

export default FetchAllPosts;
