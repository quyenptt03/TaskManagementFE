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
      <DialogTitle className="font-semibold">
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
              <FormField
                type="text"
                placeholder="Title"
                name="title"
                register={register}
                error={errors.title}
              />
              <FormField
                type="text"
                placeholder="Description"
                name="description"
                register={register}
                error={errors.description}
              />
              <FormControl fullWidth margin="dense">
                <InputLabel>Category</InputLabel>
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
              {!onCreate && (
                <FormControl fullWidth margin="dense">
                  <InputLabel>Status</InputLabel>
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
              )}
            </>
          )}
        </DialogContent>
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
        {onView && task && <CommentSection taskId={task.id} />}

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
