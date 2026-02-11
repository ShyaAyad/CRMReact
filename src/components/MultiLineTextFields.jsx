import { IconButton } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import SendIcon from '@mui/icons-material/Send';

export default function MultilineTextFields() {
  return (
    <Box
      component="form"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-end",
        minHeight: "80vh",
        pb: 2, // padding bottom for some spacing
        "& .MuiTextField-root": { m: 1, width: "90ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        id="filled-multiline-static"
        label="Multiline"
        multiline
        rows={4}
        variant="filled"InputProps={{
        endAdornment: (
          <IconButton 
            type="submit"
            edge="end"
            sx={{ alignSelf: 'flex-end', mb: 1 }}
          >
            <SendIcon />
          </IconButton>
        ),
      }}
      />
    </Box>
  );
}

{
  /* <TextField
          id="filled-multiline-flexible"
          label="Multiline"
          multiline
          maxRows={4}
          variant="filled"
        />
        <TextField
          id="filled-textarea"
          label="Multiline Placeholder"
          placeholder="Placeholder"
          multiline
          variant="filled"
        /> */
}
