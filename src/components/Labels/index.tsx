import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Chip,
  Box,
} from "@mui/material";
import { Button } from "..";

const AddLabelsSection: React.FC<{
  labels: any[];
  selectedLabels: any[];
  onAddLabels: (selected: any[]) => void;
}> = ({ labels, selectedLabels, onAddLabels }) => {
  const [open, setOpen] = useState(false);
  const [tempSelectedLabels, setTempSelectedLabels] = useState(
    selectedLabels || []
  );

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSave = () => {
    console.log({ tempSelectedLabels, selectedLabels });
    onAddLabels(tempSelectedLabels);
    handleClose();
  };

  const handleChange = (event: any) => {
    const selectedIds = event.target.value;
    const updatedLabels = labels.filter((label: any) =>
      selectedIds.includes(label.id)
    );
    setTempSelectedLabels(updatedLabels);
  };

  return (
    <div>
      <Button type="button" onClick={handleOpen} theme="noBg">
        + Add Labels
      </Button>
      <Box>
        {tempSelectedLabels.map((label: any) => (
          <Chip
            key={label.id}
            label={label.name}
            style={{
              marginRight: "5px",
              marginBottom: "5px",
              borderRadius: "8px",
            }}
          />
        ))}
      </Box>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Select Labels</DialogTitle>
        <DialogContent>
          <label
            htmlFor="labels"
            className="text-base font-medium capitalize mt-3"
          >
            Labels
          </label>

          <FormControl fullWidth margin="dense">
            <Select
              multiple
              value={tempSelectedLabels.map((label: any) => label.id)}
              onChange={handleChange}
              renderValue={(selected) =>
                labels
                  .filter((label: any) => selected.includes(label.id))
                  .map((label: any) => label.name)
                  .join(", ")
              }
            >
              {labels.map((label: any) => (
                <MenuItem key={label.id} value={label.id}>
                  {label.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} theme="base">
            Cancel
          </Button>
          <Button onClick={handleSave} theme="filled">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddLabelsSection;
