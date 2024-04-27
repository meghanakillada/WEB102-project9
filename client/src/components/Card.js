import React, { useState } from 'react'
import more from './more.png'
import './Card.css'
import { supabase } from '../client'

import { Link } from 'react-router-dom'


const Card = (props) =>  {
  const [count, setCount] = useState(0);

  const date = new Date(props.created_at);
  const formattedDate = date.toLocaleString();

  const updateCount = async (event) => {
    event.preventDefault();
  
    await supabase
      .from('Posts')
      .update({ upvotes_count: count + 1})
      .eq('id', props.id)
  
    setCount((count) => count + 1);
  }

  return (
      <div className="Card">
          <Link to={'edit/'+ props.id}><img className="moreButton" alt="edit button" src={more} /></Link>
          <p className="created-at">{formattedDate}</p>
          <h2 className="title">{props.title}</h2>
          <p className="upvotes-count">{props.upvotes_count}</p>
      </div>
  );
};

export default Card;