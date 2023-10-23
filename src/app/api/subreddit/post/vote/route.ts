import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { PostVoteValidator } from "@/lib/validators/vote";

export async function PATCH(req: Request) {
  try {
    const body = req.json();

    const { postId, voteType } = PostVoteValidator.parse(body);

    const session = await getAuthSession();

    if (!session?.user?.id) {
      return new Response("Unauthorized");
    }

    const existingVote = await db.vote.findFirst({
      where: {
        userId: session.user.id,
        postId,
      },
    });

    const post = await db.post.findUnique({
      where: {
        id: postId,
      },
      include: {
        author: true,
        votes: true,
      },
    });

    if (!post) {
      return new Response("Post not found");
    }

    if (existingVote) {
      if (existingVote.type === voteType) {
        await db.vote.deleteMany({
          where: {
            userId: session.user.id,
            postId: postId,
          },
        });
        return new Response("OK");
      }
      await db.vote.updateMany({
        where: {
          postId,
          userId: session.user.id,
        },
        data: {
          type: voteType,
        },
      });
    }
  } catch (error) {}
}
