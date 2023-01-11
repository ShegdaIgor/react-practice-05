import React, { useEffect, useState } from "react";
import { Link, Route, Routes, useParams } from "react-router-dom";
import { fetchPostDetails } from "services/Api";
import PostComments from "./PostComments";

function PostDetails() {
    const [postDetails, setPostDetails] = useState(null);

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const { postId } = useParams();

    useEffect(() => {
        const getPostsDetails = async postId => {
            try {
                setIsLoading(true);
                const post = await fetchPostDetails(postId);
                setPostDetails(post);
            } catch (error) {
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        };
        getPostsDetails(postId);
    }, [postId]);
    return (
        <div>
            {isLoading === true && <p>loading ...</p>}
            {postDetails !== null && (
                <div>
                    <p>
                        <b>userId</b>: {postDetails.userId}
                    </p>
                    <p>
                        <b>id</b>: {postDetails.id}
                    </p>
                    <p>
                        <b>title</b>: {postDetails.title}
                    </p>
                    <p>
                        <b>body</b>: {postDetails.body}
                    </p>
                </div>
            )}
            <Link to='comments'>Comments</Link>
            <Routes>
                <Route path='comments' element={<PostComments />} />
            </Routes>
        </div>
    );
}

export default PostDetails;
