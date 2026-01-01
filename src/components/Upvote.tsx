// src/components/LikeButton.tsx
import { useEffect, useState } from 'react';
import { actions } from 'astro:actions';

export default function LikeButton({ postId }: { postId: string }) {

  const [disabled, setDisabled] = useState(true);
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const hasUpvoted = async () => {
      const { data, error } = await actions.hasUpvoted({ post: postId })
      if (!error) {
        setDisabled(false)
      }

      if (data) {
        setLiked(true)
      }
    }

    const fetchUpvotes = async () => {
      const { data, error } = await actions.getUpvotes({ post: postId })
      if (!error  && data) {
        setLikes(data)
      }
    }

    fetchUpvotes();
    hasUpvoted();
  }, [])

  const handleLikeClick = async () => {
    if (liked) {
      return
    }

    const { data, error } = await actions.upvote({ post: postId });
    if (error) {
      console.error(error)
      setDisabled(true)
      return
    }

    setLikes(data);
    setLiked(true);
  };

  return (
    disabled ? 
    <p><i>Upvoting temporarily disabled</i> 🤍</p> : 
    <button onClick={handleLikeClick}>
      {likes > 0 ? `${likes} ${likes === 1 ? 'person': 'people' } liked this!` : `Like this?`} {liked ? '❤️' : '🤍'}
    </button>
  );
}