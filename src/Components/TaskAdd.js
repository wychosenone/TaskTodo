import { useContext } from "react";
import { TaskContext } from "../TaskContext";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';

export const TaskAdd = () => {
  const { addTask, setTask, task } = useContext(TaskContext);

  return (
    <Container>
      <form onSubmit={addTask}>
        <Grid container spacing={0} alignItems="flex-end" justifyContent="center">
          <Grid item xs={8} sm={6} md={4}>
            <TextField
              value={task}
              name="taskName"
              placeholder="Add task here"
              fullWidth
              sx={{ bgcolor: '#f5f5f5',marginLeft:"20px" }}
              onChange={(e) => setTask(e.target.value)}
            />
          </Grid>
          <Grid item xs={2} sm={1}>
            <IconButton color="secondary" type="submit"  sx={{marginLeft:"20px" }}>
              <AddCircleIcon fontSize="large" />
            </IconButton>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};
