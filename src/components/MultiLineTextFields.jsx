import { IconButton } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import SendIcon from "@mui/icons-material/Send";

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
        variant="filled"
        InputProps={{
          endAdornment: (
            <IconButton
              type="submit"
              edge="end"
              sx={{ alignSelf: "flex-end", mb: 1 }}
            >
              <SendIcon />
            </IconButton>
          ),
        }}
      />
    </Box>
  );
}

/*

to design the text and response after implementing the functionalityas

{messages.map((message) => (
          <Box
            key={message.id}
            sx={{
              display: 'flex',
              justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start',
            }}
          >
            <Paper
              elevation={2}
              sx={{
                p: 2,
                maxWidth: '70%',
                backgroundColor: message.sender === 'user' ? '#1976d2' : '#f5f5f5',
                color: message.sender === 'user' ? 'white' : 'black',
                borderRadius: 2,
              }}
*/
