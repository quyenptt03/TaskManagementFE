import React, { useState } from "react";
import { useGetAllAttachments } from "../../api/taskAttachment/query";
import ConfirmDialog from "../ComfirmDialog";

const AttachmentSection = ({
  taskId,
  onUpload,
  onRemove,
}: {
  taskId: number;
  onUpload: (files: File[]) => void;
  onRemove: (attachmentId: number) => void;
}) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const { data: existingAttachments, isLoading } = useGetAllAttachments(taskId);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files ? Array.from(event.target.files) : [];
    setSelectedFiles((prevFiles) => [...prevFiles, ...files]);
  };

  const handleUpload = () => {
    if (selectedFiles.length > 0) {
      onUpload(selectedFiles);
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
      onRemove(attachmentToRemove);
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
      <h3 className="font-semibold">Attachments</h3>

      {isLoading ? (
        <p>Loading attachments...</p>
      ) : existingAttachments && existingAttachments.length > 0 ? (
        <ul className="mt-4">
          {existingAttachments.map((attachment: any) => (
            <li
              key={attachment.id}
              className="flex items-center justify-between"
            >
              <a
                href={attachment.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                {attachment.fileName}
              </a>
              <button
                type="button"
                onClick={() => handleRemoveAttachment(attachment.id)}
                className="text-red-500 ml-4"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No attachments</p>
      )}

      {/* File input for uploading new attachments */}
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

      {/* Display selected files */}
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
// import React, { useState } from "react";
// import {
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   Box,
//   List,
//   ListItem,
//   ListItemText,
//   IconButton,
// } from "@mui/material";
// import { Button } from "..";

// const AddAttachmentSection: React.FC<{
//   selectedAttachments: File[];
//   onAddAttachments: (selected: File[]) => void;
// }> = ({ selectedAttachments, onAddAttachments }) => {
//   const [open, setOpen] = useState(false);
//   const [tempSelectedAttachments, setTempSelectedAttachments] = useState<
//     File[]
//   >(selectedAttachments || []);

//   const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);

//   const handleSave = () => {
//     onAddAttachments(tempSelectedAttachments);
//     handleClose();
//   };

//   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     if (event.target.files) {
//       setTempSelectedAttachments([
//         ...tempSelectedAttachments,
//         ...Array.from(event.target.files),
//       ]);
//     }
//   };

//   const handleRemoveAttachment = (index: number) => {
//     setTempSelectedAttachments(
//       tempSelectedAttachments.filter((_, i) => i !== index)
//     );
//   };

//   return (
//     <div>
//       <Button type="button" onClick={handleOpen} theme="base">
//         + Add Attachments
//       </Button>
//       <Box mt={2}>
//         {tempSelectedAttachments.length > 0 && (
//           <List>
//             {tempSelectedAttachments.map((file, index) => (
//               <ListItem
//                 key={index}
//                 secondaryAction={
//                   <IconButton
//                     edge="end"
//                     onClick={() => handleRemoveAttachment(index)}
//                   >
//                     X
//                   </IconButton>
//                 }
//               >
//                 <ListItemText primary={file.name} />
//               </ListItem>
//             ))}
//           </List>
//         )}
//       </Box>
//       <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
//         <DialogTitle>Select Attachments</DialogTitle>
//         <DialogContent>
//           <input type="file" multiple onChange={handleFileChange} />
//           <List>
//             {tempSelectedAttachments.map((file, index) => (
//               <ListItem
//                 key={index}
//                 secondaryAction={
//                   <IconButton
//                     edge="end"
//                     onClick={() => handleRemoveAttachment(index)}
//                   >
//                     X
//                   </IconButton>
//                 }
//               >
//                 <ListItemText primary={file.name} />
//               </ListItem>
//             ))}
//           </List>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleClose} theme="base">
//             Cancel
//           </Button>
//           <Button onClick={handleSave} theme="filled">
//             Save
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// };

// export default AddAttachmentSection;
