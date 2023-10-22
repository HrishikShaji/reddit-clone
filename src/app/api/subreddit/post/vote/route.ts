import { getAuthSession } from "@/lib/auth";
import { PostVoteValidator } from "@/lib/validators/vote";

export async function PATCH(req: Request) {
  try {
    const body = req.json();

    const { postId, voteType } = PostVoteValidator.parse(body);

    const session = await getAuthSession();

    if (!session?.user) {
      return new Response("Unauthorized");
    }
  } catch (error) {}
}