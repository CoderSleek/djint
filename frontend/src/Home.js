import React, { useEffect } from "react";
import PostsList from "./components/Postlist";
import TopBar from "./components/Topbar";

export default function Home(){
    useEffect(()=>{
        fetch('http://localhost:8000/r/')
        .then(val=>val.json()
        .then(val=>console.log(val)))
        .catch(err=>console.log(err));
    }, []);

    return (
        <>
            <TopBar></TopBar>
            <PostsList></PostsList>
        </>
    );
}