// src/components/LikeButton.tsx
import { useState } from 'react';
import { actions } from 'astro:actions';

export default function LikeButton({ postId, initialLikes, disabled = false }: { postId: string, initialLikes: number, disabled: boolean }) {

  console.log(`The value of disabled is ${disabled}`)
  const [likes, setLikes] = useState(initialLikes);
  
  const [liked, setLiked] = useState(() => {
    const savedValue = typeof window !== 'undefined' ? localStorage.getItem(postId) : null;
    if (savedValue) {
      return JSON.parse(savedValue);
    }
    return false;
  });

  const handleLikeClick = async () => {
    if (liked) {
      return
    }

    // Call the Astro action from the client
    const { data, error } = await actions.incrementUpvote({ post: postId });

    if (!error) {
      // Update the local state with the result from the server
      setLikes(data);
      if (typeof window !== 'undefined') {
        localStorage.setItem(postId, "true");
      }
      setLiked(!liked);
    } else {
      console.log(error)
    }
  };

  return (
    disabled ? 
    <p><i>Upvoting temporarily disabled</i> 🤍</p> : 
    <button onClick={handleLikeClick}>
      {likes > 0 ? `${likes} ${likes === 1 ? 'person': 'people' } liked this!` : `Like this?`} {liked ? '❤️' : '🤍'}
    </button>
  );
}