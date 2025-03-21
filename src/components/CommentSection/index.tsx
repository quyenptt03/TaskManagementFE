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
import { AccountCircle } from "@mui/icons-material";

const CommentSection = ({ taskId }: { taskId: any }) => {
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
      deleteComment.mutate(commentIdToDelete);
    }
    setOpenConfirm(false);
  };
  return (
    <div>
      <h3 className="font-semibold">Comments</h3>
      <div className="flex">
        <TextField
          placeholder="Add comment"
          className="w-full mr-2"
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
          className="text-sm 3xl:px-10 laptop:py-2 mt-0 mb-0 w-fit"
          onClick={() => handleAddComment(newComment)}
        >
          Add
        </Button>
      </div>
      <ul>
        {taskComments.data && taskComments.data.length === 0 ? (
          <p>No comments yet</p>
        ) : (
          taskComments.data?.map((comment) => (
            // <li key={comment.id}>
            //   <div className="flex justify-between">
            //     <div>
            //       <AccountCircle style={{ color: "gray"   }} />
            //     </div>
            //     <span>{comment.userName}</span>
            //     <span>{comment.content}</span>
            //     <span>
            //       {DateTime.fromISO(comment.createdAt)
            //         .setZone("UTC+14")
            //         .toFormat("dd-MM-yyyy HH:mm:ss")}
            //     </span>
            //   </div>
            //   <button
            //     type="button"
            //     className="text-xs"
            //     onClick={() => openDeleteDialog(comment.id)}
            //   >
            //     Delete
            //   </button>
            // </li>
            <li className="mb-4 border-top border-bottom border-solid border-black py-2">
              <div className="flex justify-between">
                <div className="flex ">
                  <AccountCircle className="text-gray-200 text-4xl mr-2" />
                  <div>
                    <p className="font-medium">{comment.userName}</p>
                    <p className="text-gray-800">{comment.content}</p>
                  </div>
                </div>
                <p className="text-xs text-gray-500">
                  {DateTime.fromISO(comment.createdAt)
                    .setZone("UTC+14")
                    .toFormat("dd-MM-yyyy HH:mm:ss")}
                </p>
              </div>
            </li>
          ))
        )}
      </ul>
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

export default CommentSection;
