import { useContext } from "react";
import { TaskContext } from "../TaskContext";
import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Switch from '@mui/material/Switch';
import Zoom from '@mui/material/Zoom';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Box } from "@mui/material";
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: '#3f50b5',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
});

export const TaskCompleted = () => {
  const { tasks, setToIncomplete } = useContext(TaskContext);
  const colors = ['red', 'green', 'blue', 'yellow', 'orange'];
  const [checked, setChecked] = React.useState(true);
  const handleChange = () => {
    setChecked((prev) => !prev);
  };

  return (
    <Box sx={{ overflow: 'auto', height: '100%', padding:"20px", margin:"50px"}} >
      <Typography variant="h5" style={{ color: theme.palette.primary.dark, fontWeight: 'bold', textAlign: 'center' , margin:"20px"}}>Completed Tasks:</Typography>
      <FormControlLabel
        control={<Switch checked={checked} onChange={handleChange} />}
        label="Show"
      />
      <Box 
        sx={{ 
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'flex-start',
          p: 1,
          m: 1,
          bgcolor: 'background.paper',
          boxSizing: 'border-box',
         

          
      
        
        }}
      >
        {tasks.map((item, index) =>
          !item.isCompleted ? null : (
            <Zoom in={checked} style={{ transitionDelay: checked ? `${index * 100}ms` : '0ms' }} key={item.id}>
              <Card sx={{ minWidth: 270, m:2 }} key={item.id}>
                <CardMedia style={{backgroundColor: colors[item.id % colors.length], height: 0, paddingTop: '56.25%'}} />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">{item.name}</Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" onClick={() => setToIncomplete(item.id)}>Mark as Incomplete</Button>
                </CardActions>
              </Card>
            </Zoom>
          )
        )}
      </Box>
    </Box>
  );
};
