import { useEffect, useState } from 'react';
import { actions } from 'astro:actions';

export default function Upvote({ postId }: { postId: string }) {
  const [disabled, setDisabled] = useState(true);
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const fetchUpvotes = async () => {
      const { data, error } = await actions.getUpvotes({ post: postId });
      if (!error && data) setLikes(data);
    };
    const hasUpvoted = async () => {
      const { data, error } = await actions.hasUpvoted({ post: postId });
      if (!error) setDisabled(false);
      if (data) setLiked(true);
    };
    fetchUpvotes();
    hasUpvoted();
  }, [postId]);

  const handleClick = async () => {
    if (liked) return;
    const { data, error } = await actions.upvote({ post: postId });
    if (!error) {
      setLikes(data);
      setLiked(true);
    } else {
      setFailed(true);
      setTimeout(() => setFailed(false), 2000);
    }
  };

  if (disabled) return null;

  return (
    <span className='upvote'>
      <button
        onClick={handleClick}
        disabled={liked}
        className={liked ? 'upvote-btn upvote-btn--voted' : 'upvote-btn'}
        aria-pressed={liked}
        aria-label={`Upvote this post. ${likes} upvotes.`}
      >
        {liked ? '[^ upvoted]' : failed ? '[^ failed]' : '[^ upvote]'}
      </button>
      {' '}{likes}
    </span>
  );
}
