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

  const commonState = `inline-flex items-center gap-x-1 rounded-lg border border-border px-2 py-1 transition-all rounded-xl`
  const preClicked = `${commonState} bg-primary-foreground active:scale-95 hover:bg-input`
  const clicked = `${commonState} hover:bg-input bg-input`

  return (
    disabled ? 
    <p><i>Upvoting temporarily disabled</i></p> : 
    <button onClick={handleLikeClick} className={liked ? clicked : preClicked} disabled={liked}>
      {liked ? '❤️' : '🤍'} {likes}
    </button>
  );
}