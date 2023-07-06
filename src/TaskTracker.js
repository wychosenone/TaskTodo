import { TaskAdd } from "./Components/TaskAdd";
import { TaskCompleted } from "./Components/TaskCompleted";
import { TaskList } from "./Components/TaskList";
import { Paper, Grid, Select, MenuItem, Box, Typography } from "@mui/material";
import { useContext } from "react";
import { TaskContext } from "./TaskContext";

export const TaskTracker = () => {
  const {selectedFilter,handleFilterChange} = useContext(TaskContext);

  return (
    <Paper elevation={24} sx={{ m: 3, p: 3, minHeight: "100vh",}}>
      <Grid container sx={{ height: "100%" ,display: 'flex', justifyContent: 'center', alignItems: 'center'  }}>
      <Typography variant="h1" style={{ color: 'blue', fontWeight: 'bold', textAlign: 'center' , margin:"20px"}}>Task Todo</Typography>

        <Grid item xs={12}>
          <Box sx={{ mb: 3 }}>
            <TaskAdd />
          </Box>
        </Grid>
        <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center' }}>
          <Select
            value={selectedFilter}
            onChange={handleFilterChange}
            size="medium"
            style={{
              marginRight: "8px",
              width: "100px",
              height: "30px",
              paddingRight: "10px",
            }}
            renderValue={(selected) => {
              return selected;
            }}
          >
            <MenuItem value="Incomplete">Incomplete</MenuItem>
            <MenuItem value="Completed">Completed</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={12} container direction="row" style={{ height: 'calc(100% - 180px)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          {selectedFilter && selectedFilter === "Incomplete" ? <TaskList /> : <TaskCompleted />}
        </Grid>
      </Grid>
    </Paper>
  );
};
