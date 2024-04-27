import React,{ useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../client'

const PostDetails = ({data}) => {
    const [count, setCount] = useState(0);
    const {id} = useParams();
    const [post, setPost] = useState({id: null, title: "", description: ""});

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const { data, error } = await supabase
                    .from('Posts')
                    .select('*')
                    .eq('id', id)
                    .single();
    
                if (error) {
                    throw error;
                }
    
                if (data) {
                    setPost(data);
                }
            } catch (error) {
                console.error('Error fetching post:', error.message);
            }
        };
        fetchPost();
    }, []);


    const handleChange = (event) => {
        const {name, value} = event.target;
        setPost( (prev) => {
            return {
                ...prev,
                [name]:value,
            }
        })
    }

    const updateCount = async (event) => {
        event.preventDefault();
      
        await supabase
          .from('Posts')
          .update({ upvotes_count: count + 1})
          .eq('id', id)
      
        setCount((count) => count + 1);
      }

    return (
        <div>
            <p className="created-at">{post.created_at}</p>
            <h2 className="title">{post.title}</h2>
            <p className="description">{post.description}</p>
        </div>
    )
}

export default PostDetails