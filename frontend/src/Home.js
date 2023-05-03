import React, { useState, useEffect } from "react";
import PostsList from "./components/Postlist";
import TopBar from "./components/Topbar";
import Cookies from 'js-cookie';
import NewPost from "./components/NewPost";

export default function Home() {
    const jwtCookie = Cookies.get('token') ? true : false;
    const [postData, setPostData] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8000/getalldata/', { credentials: 'include' })
            .then(res =>{
                if(res.status===401){
                    window.location.href = '/login';
                    return;
                }
                res.json()
                .then(json=>setPostData(json['data']))
            })
            .catch(err => console.log(err));
    }, []);

    return (
        <>
            <TopBar cookie={jwtCookie} postHandler={setPostData}></TopBar>
            {jwtCookie && <NewPost />}
            <PostsList posts={postData}></PostsList>
        </>
    );
}