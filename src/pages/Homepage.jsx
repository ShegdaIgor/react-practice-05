import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { fetchPosts } from "services/Api";

function Homepage() {
    const [posts, setPosts] = useState([]);

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getPosts = async () => {
            try {
                setIsLoading(true);
                const posts = await fetchPosts();
                setPosts(posts);
            } catch (error) {
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        };
        getPosts();
    }, []);

    return (
        <div className='mainWrapper'>
            <div className='list'>
                <h2>Posts</h2>
                {isLoading === true && <p>loading ...</p>}
                {Array.isArray(posts) &&
                    posts.map(post => {
                        return (
                            <Link
                                key={post.id}
                                className='postItem'
                                to={`/posts/${post.id}`}
                            >
                                <h3>{post.title}</h3>
                                <p>{post.body}</p>
                            </Link>
                        );
                    })}
            </div>
        </div>
    );
}

export default Homepage;
