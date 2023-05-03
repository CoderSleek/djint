import React, { useState } from 'react';
import styled from 'styled-components';

const LoginForm = () => {
    const [error_message, setErrorMessage] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confPassword, setConfPassword] = useState('');

    function handleSubmit(event) {
        event.preventDefault();
        fetch('http://localhost:8000/signup/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                'username': username,
                'password': password,
                'confirm_password': confPassword
            }),
        })
            .then(val => val.json()
                .then(json => {
                    if (!json['status']) {
                        setErrorMessage(json['errorMsg']);
                        return;
                    }
                    let seconds = 3;
                    setErrorMessage(`User creation successful redirecting in ${seconds}`);

                    const countdown = setInterval(() => {
                        seconds -= 1;
                        setErrorMessage(`User creation successful redirecting in ${seconds}`);
                    }, 1000);

                    setTimeout(() => {
                        clearInterval(countdown);
                        window.location.href = '/login';
                    }, 3000);
                }).catch(err => console.log(err)))
            .catch(err => console.log(err));
    };

    return (
        <Wrapper>
            {error_message && <ErrorMessage>{error_message}</ErrorMessage>}
            <Form onSubmit={handleSubmit}>
                <InputWrapper>
                    <Label htmlFor="username">Username:</Label>
                    <Input type="text" id="username" name="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                </InputWrapper>
                <InputWrapper>
                    <Label htmlFor="password">Password:</Label>
                    <Input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </InputWrapper>
                <InputWrapper>
                    <Label htmlFor="confpassword">Confrim Password:</Label>
                    <Input type="password" id="confpassword" name="confpassword"
                        value={confPassword} onChange={(e) => setConfPassword(e.target.value)} />
                </InputWrapper>
                <Button type="submit">Log in</Button>
            </Form>
            <Link href='/login'>{'Already Have an Account?'}</Link>
        </Wrapper>
    );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const ErrorMessage = styled.p`
  color: red;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  padding: 20px;
  width: 300px;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`;

const Label = styled.label`
  font-weight: bold;
  margin-bottom: 5px;
`;

const Input = styled.input`
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
`;

const Button = styled.button`
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px;
  cursor: pointer;
`;

const Link = styled.a`
  font-size: 16px;
  color: #007bff;
  text-decoration: none;
  transition: color 0.2s ease-in-out;

  &:hover {
    color: #0056b3;
    text-decoration: underline;
  }
`;
export default LoginForm;