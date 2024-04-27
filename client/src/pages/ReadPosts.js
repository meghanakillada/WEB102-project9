import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import { supabase } from '../client'

const ReadPosts = (props) => {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        setPosts(props.data);
        // READ all post from table
        const fetchPosts = async () => {
            const {data} = await supabase
            .from('Posts')
            .select();
        
            // set state of posts
            setPosts(data)
        }
        fetchPosts();
    }, [props]);
    
    return (
        <div className="ReadPosts">
            {
                posts && posts.length > 0 ?
                posts.map((post,index) => 
                   <Card id={post.id} title={post.title} description={post.description} upvotes_count={post.upvotes_count} created_at={post.created_at}/>
                ) : <h2>{'No Challenges Yet 😞'}</h2>
            }
        </div>  
    )
}

export default ReadPosts;