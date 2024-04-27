import React,{ useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './EditPost.css'
import { supabase } from '../client'

const EditPost = ({data}) => {

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

    // UPDATE post
    const updatePost = async (event) => {
        event.preventDefault();
    
        await supabase
        .from('Posts')
        .update({title: post.title, description: post.description})
        .eq('id', id);
    
        window.location = "/";
    }

    // DELETE post
    const deletePost = async (event) => {
        event.preventDefault();
    
        await supabase
        .from('Posts')
        .delete()
        .eq('id', id); 
    
        window.location = "/";
    }

    return (
        <div>
            <form>
                <label for="title">Title</label> <br />
                <input type="text" id="title" name="title" value={post.title} onChange={handleChange} /><br />
                <br/>

                <label for="description">Description</label><br />
                <input type="text" id="description" name="description" value={post.description} onChange={handleChange} /><br />
                <br/>

                <input type="submit" value="Submit" onClick={updatePost} />
                <button className="deleteButton" onClick={deletePost}>Delete</button>
            </form>
        </div>
    )
}

export default EditPost