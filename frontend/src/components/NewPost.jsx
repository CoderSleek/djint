import React, { useState } from 'react';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function NewPost() {
    const [showModal, setShowModal] = useState(false);
    const [selectedDateTime, setSelectedDateTime] = useState(null);
    function handleChange(date) {
        setSelectedDateTime(date);
      }

    const handleNewPost = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    async function handleSubmit(e) {
        e.preventDefault();
        const selectedFile = e.target.elements.image.files[0];
        const formData = new FormData();
        formData.append("title", e.target.elements.title.value);
        formData.append("description", e.target.elements.description.value);
        formData.append("cost", e.target.elements.cost.value);
        formData.append("timing", e.target.elements.timing.value);
        formData.append("image", selectedFile);

        try {
            const response = await fetch("http://localhost:8000/newevent/", {
                method: "POST",
                credentials: 'include',
                body: formData,
            });
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error(error);
        }
        setShowModal(false);
    };

    function handleImageChange(e) {
        const selectedFile = e.target.files[0];
        const fileSize = selectedFile.size / 1024 / 1024; // Convert from bytes to MB
        const fileType = selectedFile.type;

        if (fileType !== "image/jpeg") {
            alert("Please select a JPG image");
            e.target.value = null;
        } else if (fileSize > 10) {
            alert("Please select an image smaller than 10MB");
            e.target.value = null;
        }
    };

    return (
        <>
            <Button onClick={handleNewPost}>New Post</Button>
            {showModal && (
                <Modal>
                    <Form onSubmit={handleSubmit}>
                        <Label htmlFor="title">Title</Label>
                        <Input id="title" name="title" type="text" />
                        <Label htmlFor="description">Description</Label>
                        <Input id="description" name="description" type="text" />
                        <Label htmlFor="cost">Cost of Admission</Label>
                        <Input id="cost" name="cost" type="number" />
                        <Label htmlFor="timing">Timing of Event</Label>
                        <DateTime selected={selectedDateTime}
                            onChange={handleChange}
                            showTimeSelect
                            dateFormat="yyyy-MM-dd HH:mm"
                            timeFormat="HH:mm"
                            id="timing"
                            name="timing"
                        />
                        <Label htmlFor="image">Event Image</Label>
                        <Input id="image" name="image" type="file" accept=".jpg" onChange={handleImageChange} />
                        <ButtonWrapper>
                            <SubmitButton type="submit">Create Post</SubmitButton>
                            <SubmitButton onClick={handleCloseModal} style={{ 'backgroundColor': 'red' }}>Cancel</SubmitButton>
                        </ButtonWrapper>
                    </Form>
                </Modal>
            )}
        </>
    );
};

const Button = styled.button`
    margin-left: 50%;
    transform: translate(-50%);
    margin-top: 60px;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 12px 24px;
    font-size: 16px;
    cursor: pointer;
`;

const Modal = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 100;
`;

const Form = styled.form`
    background-color: white;
    border-radius: 4px;
    padding: 24px;
    width: 40%;
`;

const Input = styled.input`
    display: block;
    width: 100%;
    margin-bottom: 16px;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
`;

const Label = styled.label`
    display: block;
    margin-bottom: 8px;
    font-weight: bold;
`;

const SubmitButton = styled.button`
height: min-content;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 12px 24px;
    font-size: 16px;
    cursor: pointer;
`;

const ButtonWrapper = styled.div`
display: flex;
justify-content: space-around;
`;

const DateTime = styled(DatePicker)`
    display: block;
    width: 100%;
    margin-bottom: 16px;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
`;
export default NewPost;