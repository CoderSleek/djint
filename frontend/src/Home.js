import React, { useEffect } from "react";
import PostsList from "./components/Postlist";
import TopBar from "./components/Topbar";
import Cookies from 'js-cookie';
import NewPost from "./components/NewPost";

export default function Home() {
    const jwtCookie = Cookies.get('token') ? true : false;

    useEffect(() => {
        fetch('http://localhost:8000/getalldata/', { credentials: 'include' })
            .then(val => val.json()
                .then(val => console.log(val)))
            .catch(err => console.log(err));
    }, []);

    return (
        <>
            <TopBar cookie={jwtCookie}></TopBar>
            {jwtCookie && <NewPost />}
            <PostsList></PostsList>
        </>
    );
}