import { CommentForm } from "~/components/commentForm";
import { Comments } from "./comments";

export const CommentSection: React.FC = () => (
  <div className="bg-clay-400 text-mineral-600 p-2">
    <h2 className="text-lg text-inherit">your thoughts?</h2>
    <CommentForm />

    <div className="my-4 h-[1px] bg-black"></div>

    <h2 className="text-lg text-inherit">
      thoughts of others (enter if you dare)
    </h2>
    <Comments />
  </div>
);
