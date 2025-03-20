import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  LinearProgress,
  Typography,
  Chip,
  TextField,
  Button,
  List,
  ListItem,
  IconButton,
} from "@mui/material";
// import DeleteIcon from "@mui/icons-material/Delete";

const tasks = [
  {
    id: 1,
    name: 'Search Enhancement "Black Shirt"',
    description: "Stabilization Backlog",
    status: "Off Track",
    dueDate: "02/02/21",
    effort: "-",
    progress: 59,
    comments: [],
  },
  {
    id: 2,
    name: "Demo of XYZ",
    description: "Office Refresh",
    status: "Off Track",
    dueDate: "02/08/21",
    effort: "17.78 Hours",
    progress: 10,
    comments: [],
  },
  {
    id: 3,
    name: "System testing",
    description: "Implementation of Application for XYZ",
    status: "On Track",
    dueDate: "02/16/21",
    effort: "96 Hours",
    progress: 98,
    comments: [],
  },
  {
    id: 4,
    name: "Remove Debris from XYZ",
    description: "Services Project",
    status: "At Risk",
    dueDate: "02/18/21",
    effort: "1 Hour",
    progress: 0,
    comments: [],
  },
];

const statusColors = {
  "Off Track": "error",
  "On Track": "success",
  "At Risk": "warning",
};

export default function CommentTable() {
  const [selected, setSelected] = useState([]);
  const [taskComments, setTaskComments] = useState(
    tasks.reduce((acc, task) => ({ ...acc, [task.id]: [] }), {})
  );
  const [newComments, setNewComments] = useState(
    tasks.reduce((acc, task) => ({ ...acc, [task.id]: "" }), {})
  );

  const handleSelectAll = (event) => {
    setSelected(event.target.checked ? tasks.map((task) => task.id) : []);
  };

  const handleSelect = (id) => {
    setSelected((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((taskId) => taskId !== id)
        : [...prevSelected, id]
    );
  };

  const handleAddComment = (taskId) => {
    if (newComments[taskId].trim()) {
      setTaskComments((prev) => ({
        ...prev,
        [taskId]: [...prev[taskId], newComments[taskId]],
      }));
      setNewComments((prev) => ({ ...prev, [taskId]: "" }));
    }
  };

  const handleDeleteComment = (taskId, index) => {
    setTaskComments((prev) => ({
      ...prev,
      [taskId]: prev[taskId].filter((_, i) => i !== index),
    }));
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox">
              <Checkbox
                indeterminate={
                  selected.length > 0 && selected.length < tasks.length
                }
                checked={selected.length === tasks.length}
                onChange={handleSelectAll}
              />
            </TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Due Date</TableCell>
            <TableCell>Actual Effort</TableCell>
            <TableCell>% Complete</TableCell>
            <TableCell>Comments</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tasks.map((task) => (
            <TableRow key={task.id} selected={selected.includes(task.id)}>
              <TableCell padding="checkbox">
                <Checkbox
                  checked={selected.includes(task.id)}
                  onChange={() => handleSelect(task.id)}
                />
              </TableCell>
              <TableCell>
                <Typography variant="subtitle1" fontWeight="bold">
                  {task.name}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {task.description}
                </Typography>
              </TableCell>
              <TableCell>
                <Chip label={task.status} color={statusColors[task.status]} />
              </TableCell>
              <TableCell>{task.dueDate}</TableCell>
              <TableCell>{task.effort}</TableCell>
              <TableCell>
                <LinearProgress variant="determinate" value={task.progress} />
                <Typography variant="body2" align="center">
                  {task.progress}%
                </Typography>
              </TableCell>
              <TableCell>
                <TextField
                  size="small"
                  value={newComments[task.id]}
                  onChange={(e) =>
                    setNewComments((prev) => ({
                      ...prev,
                      [task.id]: e.target.value,
                    }))
                  }
                  placeholder="Add a comment"
                />
                <Button
                  variant="contained"
                  size="small"
                  onClick={() => handleAddComment(task.id)}
                  sx={{ ml: 1 }}
                >
                  Add
                </Button>
                <List>
                  {taskComments[task.id].map((comment, index) => (
                    <ListItem
                      key={index}
                      secondaryAction={
                        <IconButton
                          edge="end"
                          onClick={() => handleDeleteComment(task.id, index)}
                        >
                          {/* <DeleteIcon /> */}X
                        </IconButton>
                      }
                    >
                      {comment}
                    </ListItem>
                  ))}
                </List>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
