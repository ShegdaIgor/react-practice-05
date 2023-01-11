import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchPostComments } from "services/Api";

function PostComments() {
    const [postComments, setPostComments] = useState([]);

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const { postId } = useParams();

    useEffect(() => {
        const getPostComments = async postId => {
            try {
                setIsLoading(true);
                const comments = await fetchPostComments(postId);
                setPostComments(comments);
            } catch (error) {
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        };
        getPostComments(postId);
    }, [postId]);
    return (
        <div>
            <div className='details'>
                <h3>Comments</h3>
                {Array.isArray(postComments) &&
                    postComments.map(({ id, name, email, body }) => {
                        return (
                            <div key={id} className='comment'>
                                <h4>Name: {name}</h4>
                                <p>
                                    <b>Email:</b> {email}
                                </p>
                                <p>
                                    <b>Body:</b> {body}
                                </p>
                            </div>
                        );
                    })}
            </div>
        </div>
    );
}

export default PostComments;
