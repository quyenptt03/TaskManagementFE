import { TextField } from "@mui/material";
import { DateTime } from "luxon";
import { useState } from "react";
import {
  useCreateComment,
  useDeleteComment,
  useGetByTask,
} from "../../api/taskComment/query";
import { Button } from "..";
import ConfirmDialog from "../ComfirmDialog";

const CommentList = ({ taskId }: { taskId: any }) => {
  const [newComment, setNewComment] = useState({
    content: "",
    taskId: "",
  });
  const [openConfirm, setOpenConfirm] = useState(false);
  const [commentIdToDelete, setCommentIdToDelete] = useState<number | null>(
    null
  );
  const addComment = useCreateComment();
  const deleteComment = useDeleteComment();
  const taskComments = useGetByTask(taskId);
  const handleAddComment = async (data: any) => {
    if (data) {
      await addComment.mutateAsync(data);
    }
    setNewComment({ content: "", taskId: "" });
  };

  const openDeleteDialog = (commentId: number) => {
    setCommentIdToDelete(commentId);
    setOpenConfirm(true);
  };

  const handleDelete = async () => {
    if (commentIdToDelete) {
      console.log("delete comment" + commentIdToDelete);
      deleteComment.mutate(commentIdToDelete);
    }
    setOpenConfirm(false);
  };
  return (
    <div>
      <h3 className="font-semibold">Comments</h3>
      <div>
        <TextField
          placeholder="Add comment"
          className="w-full"
          value={newComment.content}
          onChange={(e: any) =>
            setNewComment({
              ...newComment,
              taskId: taskId,
              content: e.target.value,
            })
          }
        />
        <Button
          theme="base"
          type="button"
          className="w-1/3 text-sm 3xl:px-10 laptop:py-2"
          onClick={() => handleAddComment(newComment)}
        >
          Add
        </Button>
      </div>
      <div>
        {taskComments.data && taskComments.data.length === 0 ? (
          <p>No comments yet</p>
        ) : (
          taskComments.data?.map((comment) => (
            <div key={comment.id}>
              <div className="flex justify-between">
                <span>{comment.userName}</span>
                <span>{comment.content}</span>
                <span>
                  {DateTime.fromISO(comment.createdAt)
                    .setZone("UTC+14")
                    .toFormat("dd-MM-yyyy HH:mm:ss")}
                </span>
              </div>
              <button
                type="button"
                className="text-xs"
                onClick={() => openDeleteDialog(comment.id)}
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
      <ConfirmDialog
        open={openConfirm}
        title="Delete Confirmation"
        message="Are you sure you want to delete this comment?"
        onConfirm={() => handleDelete()}
        onCancel={() => setOpenConfirm(false)}
      />
    </div>
  );
};

export default CommentList;
