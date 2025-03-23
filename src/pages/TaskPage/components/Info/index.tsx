import React, { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Skeleton,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useUpdateTask } from "../../../../api/task/query";
import {
  useAssignLabel,
  useRemoveLabel,
} from "../../../../api/taskLabel/query";
import { CreateTaskSchema, FormData } from "../../../../types/task";
import {
  Button,
  CommentSection,
  FormField,
  AddLabelsSection,
  AttachmentSection,
} from "../../../../components";
import {
  useDeleteAttachment,
  useUploadAttachments,
} from "../../../../api/taskAttachment/query";

interface CreateTaskDialogBaseProps {
  data?: any;
  open: boolean;
  onClose: () => void;
}

interface CreateTaskDialogViewProps extends CreateTaskDialogBaseProps {
  onView: (task: any) => void;
  onCreate?: never;
  onUpdate?: never;
  task: any;
}

interface CreateTaskDialogCreateProps extends CreateTaskDialogBaseProps {
  onCreate: (task: any) => void;
  onView?: never;
  onUpdate?: never;
  task?: never;
}

interface CreateTaskDialogUpdateProps extends CreateTaskDialogBaseProps {
  onUpdate: (task: any) => void;
  onView?: never;
  onCreate?: never;
  task: any;
}

type CreateTaskDialogProps =
  | CreateTaskDialogCreateProps
  | CreateTaskDialogUpdateProps
  | CreateTaskDialogViewProps;

const Info: React.FC<CreateTaskDialogProps> = ({
  open,
  onClose,
  onView,
  onCreate,
  onUpdate,
  data,
  task,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    clearErrors,
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(CreateTaskSchema),
  });

  const updateTask = useUpdateTask();
  const assignLabel = useAssignLabel();
  const removeLabel = useRemoveLabel();
  const uploadAttachments = useUploadAttachments();
  const deleteAttachment = useDeleteAttachment();

  useEffect(() => {
    if (task) {
      setValue("title", task.title);
      setValue("description", task.description);
      setValue("categoryId", task.categoryId);
      setValue("isCompleted", task.isCompleted.toString());
      setValue(
        "labels",
        task.labels.map((label: any) => label)
      );
    } else {
      reset();
    }
  }, [task, setValue, reset]);

  const handleClose = () => {
    if (onCreate) {
      clearErrors();
      reset();
    }
    clearErrors();
    onClose();
  };

  const onSubmit = async (data: any) => {
    if (data.isCompleted) {
      data.isCompleted = JSON.parse(data.isCompleted);
    }

    const selectedLabels = data.labels || [];
    const existingLabels = task ? task.labels.map((label: any) => label) : [];

    const newLabels = selectedLabels.filter(
      (label: any) =>
        !existingLabels.some(
          (existingLabel: any) => existingLabel.id === label.id
        )
    );

    const labelsToRemove = existingLabels.filter(
      (label: any) =>
        !selectedLabels.some(
          (selectedLabel: any) => selectedLabel.id === label.id
        )
    );

    if (task && onUpdate) {
      await updateTask.mutateAsync({ ...task, ...data });
      onUpdate(data);

      newLabels.forEach((label: any) => {
        assignLabel.mutate({ taskId: task.id, labelId: label.id });
      });

      labelsToRemove.forEach((label: any) => {
        removeLabel.mutate({ taskId: task.id, labelId: label.id });
      });
    } else if (onCreate) {
      const createdTask = await onCreate(data);
      console.log(createdTask);
      // console.log({ data });
      // onCreate(data);

      // if (createdTask && createdTask.id) {
      //   assignLabel.mutate({ taskId: createdTask.id, labelIds });
      // }

      reset();
    }

    onClose();
  };

  const handleUploadAttachments = (files: File[]) => {
    console.log("Uploading files:", files);
    uploadAttachments.mutate({ files, taskId: task?.id });
  };

  const handleDeleteAttachments = (id: number) => {
    console.log("Removing attachment with ID:", id);
    deleteAttachment.mutate(id);
  };

  const isLoading = (onUpdate || onView) && !task;

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle className="font-semibold text-center">
        {onCreate ? "Create task" : onUpdate ? "Update Task" : "View Task"}
      </DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          {isLoading ? (
            <>
              <Skeleton variant="text" width="100%" height={40} />
              <Skeleton variant="text" width="100%" height={40} />
              <Skeleton variant="rectangular" width="100%" height={56} />
              <Skeleton variant="rectangular" width="100%" height={56} />
            </>
          ) : (
            <>
              <div className="mb-3">
                <label
                  htmlFor="title"
                  className="text-base font-medium capitalize mt-3"
                >
                  Title
                </label>
                <FormField
                  type="text"
                  placeholder="Title"
                  name="title"
                  register={register}
                  error={errors.title}
                />
              </div>
              <div className="mb-3">
                <label
                  htmlFor="description"
                  className="text-base font-medium capitalize mt-3"
                >
                  Description
                </label>
                <FormControl
                  fullWidth
                  margin="dense"
                  error={!!errors.description}
                >
                  <textarea
                    placeholder="Description"
                    {...register("description")}
                    className={`w-full h-24 p-3 text-sm border border-black rounded resize-none`}
                    rows={4}
                  />
                  <p style={{ color: "red", fontSize: "0.875rem" }}>
                    {errors.description && errors.description.message}
                  </p>
                </FormControl>
              </div>
              <div className="mb-3">
                <label
                  htmlFor="category"
                  className="text-base font-medium capitalize mt-3"
                >
                  Category
                </label>
                <FormControl fullWidth margin="dense">
                  <Select
                    {...register("categoryId")}
                    defaultValue={task ? task.categoryId : ""}
                    error={!!errors.categoryId}
                  >
                    <MenuItem value="">Choose category</MenuItem>
                    {data.categories?.map((category: any) => (
                      <MenuItem key={category.id} value={category.id}>
                        {category.name}
                      </MenuItem>
                    ))}
                  </Select>
                  <p>{errors.categoryId && errors.categoryId.message}</p>
                </FormControl>
              </div>
              {!onCreate && (
                <div>
                  <label
                    htmlFor="status"
                    className="text-base font-medium capitalize mt-3"
                  >
                    Status
                  </label>
                  <FormControl fullWidth margin="dense">
                    <Select
                      {...register("isCompleted")}
                      defaultValue={task ? task.isCompleted.toString() : ""}
                      error={!!errors.isCompleted}
                    >
                      <MenuItem value="false">In progress</MenuItem>
                      <MenuItem value="true">Completed</MenuItem>
                    </Select>
                    <p>{errors.isCompleted && errors.isCompleted.message}</p>
                  </FormControl>
                </div>
              )}
            </>
          )}
          <AddLabelsSection
            {...register("labels")}
            labels={data.labels}
            selectedLabels={task ? task.labels : []}
            onAddLabels={(selected) => setValue("labels", selected)}
          />

          {!onCreate && (
            <AttachmentSection
              // {...register("attachments")}
              taskId={task?.id}
              onUpload={handleUploadAttachments}
              onRemove={handleDeleteAttachments}
            />
          )}
          {onView && task && (
            <div className="mt-2">
              <CommentSection taskId={task.id} />
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button type="button" onClick={handleClose} theme="base">
            {onView ? "Close" : "Cancel"}
          </Button>
          {(onCreate || onUpdate) && (
            <Button theme="filled" type="submit">
              Save
            </Button>
          )}
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default Info;
