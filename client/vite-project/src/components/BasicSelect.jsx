import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function BasicSelect({ value, onChange, options }) {
  return (
    <Box sx={{ minWidth: 150 }}>
      <FormControl fullWidth>
        <InputLabel>Status</InputLabel>
        <Select value={value} onChange={onChange} label="Status">
          {options.map((opt, index) => (
            <MenuItem key={index} value={opt}>
              {opt}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}