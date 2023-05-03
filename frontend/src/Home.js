import React from "react";
import PostsList from "./components/Postlist";
import TopBar from "./components/Topbar";

export default function Home(){
    return (
        <>
            <TopBar></TopBar>
            <PostsList></PostsList>
        </>
    );
}