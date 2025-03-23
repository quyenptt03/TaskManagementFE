import React, { useState } from "react";
import { useGetAllAttachments } from "../../api/taskAttachment/query";
import ConfirmDialog from "../ComfirmDialog";
import { AttachFile, Clear } from "@mui/icons-material";

const AttachmentSection = ({
  taskId,
  onUpload,
  onRemove,
}: {
  taskId: number;
  onUpload?: (files: File[]) => void;
  onRemove?: (attachmentId: number) => void;
}) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const { data: existingAttachments, isLoading } = useGetAllAttachments(taskId);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files ? Array.from(event.target.files) : [];
    setSelectedFiles((prevFiles) => [...prevFiles, ...files]);
  };

  const handleUpload = () => {
    if (selectedFiles.length > 0) {
      onUpload?.(selectedFiles);
      setSelectedFiles([]);
    }
  };

  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [attachmentToRemove, setAttachmentToRemove] = useState<number | null>(
    null
  );

  const handleRemoveAttachment = (attachmentId: number) => {
    setAttachmentToRemove(attachmentId);
    setIsConfirmDialogOpen(true);
  };

  const handleConfirmRemove = () => {
    if (attachmentToRemove !== null) {
      onRemove?.(attachmentToRemove);
      setAttachmentToRemove(null);
    }
    setIsConfirmDialogOpen(false);
  };

  const handleCancelRemove = () => {
    setAttachmentToRemove(null);
    setIsConfirmDialogOpen(false);
  };

  return (
    <div>
      <h3 className="font-semibold">+ Attachments</h3>

      {isLoading ? (
        <p>Loading attachments...</p>
      ) : existingAttachments && existingAttachments.length > 0 ? (
        <ul className="mt-4 ">
          {existingAttachments.map((attachment: any) => (
            <li
              key={attachment.id}
              className="flex items-center justify-between p-2 mr-5 border border-gray-200 rounded my-2"
            >
              <a
                href={attachment.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-700"
              >
                <span className="hover:text-[#4D55CC]">
                  <AttachFile />
                  {attachment.fileName}
                </span>
              </a>
              <button
                type="button"
                onClick={() => handleRemoveAttachment(attachment.id)}
                className="text-red-500 ml-4 hover:text-primary-dark"
              >
                <Clear />
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No attachments</p>
      )}
      {onUpload && onRemove && (
        <div className="mt-4">
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            className="mb-2"
          />
          <button
            onClick={handleUpload}
            className="bg-blue-500  px-4 py-2 rounded"
            disabled={selectedFiles.length === 0}
          >
            Upload
          </button>
        </div>
      )}
      {selectedFiles.length > 0 && (
        <div className="mt-4">
          <h4 className="font-semibold">Selected Files</h4>
          <ul>
            {selectedFiles.map((file, index) => (
              <li key={index}>{file.name}</li>
            ))}
          </ul>
        </div>
      )}
      <ConfirmDialog
        open={isConfirmDialogOpen}
        title="Confirm Removal"
        message="Are you sure you want to remove this attachment?"
        onConfirm={() => handleConfirmRemove()}
        onCancel={() => handleCancelRemove()}
      />
    </div>
  );
};

export default AttachmentSection;
