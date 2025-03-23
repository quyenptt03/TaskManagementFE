import { Clear } from "@mui/icons-material";
import { Chip, Dialog } from "@mui/material";
import { useState } from "react";
import { useUserStore } from "../../store/useUserStore";
import Avt from "../../assets/avt.jpeg";
import AttachmentSection from "../AttachmentSection";
import CommentSection from "../CommentSection";

interface DialogViewProps {
  data?: any;
  open: boolean;
  onClose: () => void;
  onView: (task: any) => void;
  task: any;
}

const TaskDetails = ({
  open,
  onClose,
  onView,
  data,
  task,
}: DialogViewProps) => {
  const [comment, setComment] = useState("");
  const { user } = useUserStore();
  //@ts-ignore
  const profile: User = user?.user;

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <div className="bg-white p-6">
        <div className="flex justify-between items-center border-b pb-4">
          <h2 className="text-xl font-semibold">{task.title}</h2>
          <button className="text-gray-400 hover:text-gray-600">
            <button className="text-lg" onClick={onClose}>
              <Clear />
            </button>
          </button>
        </div>
        <div className="flex">
          <div className="w-3/4 mr-4 border-r pr-4">
            <div className="grid grid-cols-4 mt-4 text-sm">
              <div className="col-span-1">
                <p className="font-medium mb-2">Status</p>
                {task.isCompleted ? (
                  <span className="text-success-dark font-medium text-sm">
                    Completed
                  </span>
                ) : (
                  <span className="text-error-dark font-medium text-sm">
                    In progress
                  </span>
                )}
              </div>
              <div className="col-span-2">
                <p className="font-medium mb-2">Assignee</p>
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-lg">
                    <img
                      className="w-full h-full rounded-lg"
                      src={Avt}
                      alt="avatar"
                    />
                  </div>
                  <span className="ml-2">{profile?.email || "Guest"}</span>
                </div>
              </div>
              <div className="col-span-1">
                <p className="font-medium mb-2">Dates</p>
                <span>
                  {new Date(task.createdAt).toLocaleDateString("en-US")}
                </span>
              </div>
            </div>

            <div className="mt-6">
              <p className="font-medium">Description</p>
              <p className="mt-2 text-sm">
                {task.description || "No description provided"}
              </p>
            </div>
            <div className="mt-6">
              <CommentSection taskId={task.id} />
            </div>
          </div>

          <div className="w-1/3">
            <div className="flex justify-between items-center mt-6">
              <div>
                <h4 className="font-semibold mb-3">+ Labels</h4>
                {task.labels.map((label: any, index: number) => (
                  <Chip
                    key={index}
                    label={label.name}
                    style={{
                      backgroundColor: "#ebebeb",
                      color: "black",
                      marginRight: "5px",
                      borderRadius: "8px",
                    }}
                  />
                ))}
              </div>
            </div>

            <div className="flex justify-between items-center mt-6">
              <div>
                <AttachmentSection
                  // {...register("attachments")}
                  taskId={task?.id}
                  // onUpload={handleUploadAttachments}
                  // onRemove={handleDeleteAttachments}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default TaskDetails;
