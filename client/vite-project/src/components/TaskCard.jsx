// components/TaskCard.jsx
import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import BasicSelect from "./BasicSelect";
import Box from "@mui/material/Box";

export default function TaskCard({
  items,
  handleDeleteTask,
  handleEditTask,
  handleChangeCategory,
}) {
  if (items.length === 0) return <p>No tasks found.</p>;

  return (
    <Grid container spacing={2}>
      {items.map((item) => (
        <Grid item xs={12} sm={6} md={4} key={item._id}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Typography variant="h6">Todo Name: {item.title}</Typography>
              <Typography variant="body2" sx={{ marginBottom: 1 }}>
                Description: {item.description}
              </Typography>

              <BasicSelect
                value={item.completed ? "Completed" : "Uncompleted"}
                onChange={(e) => handleChangeCategory(item._id, e.target.value)}
                options={["Completed", "Uncompleted"]}
              />

              <Box
                sx={{
                  display: "flex",
                  gap: 1,
                  justifyContent: "space-between",
                  marginTop: 2,
                }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleEditTask(item._id)}
                >
                  Edit
                </Button>

                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleDeleteTask(item._id)}
                >
                  Delete
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}