import { ExtendedPost } from "@/types/db";

interface PostFeedProps {
  initialPosts: ExtendedPost[];
  subredditName?: string;
}

export const PostFeed: React.FC<PostFeedProps> = ({
  initialPosts,
  subredditName,
}) => {
  return <div></div>;
};
