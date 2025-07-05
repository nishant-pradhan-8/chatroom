import Box from "@mui/material/Box";
import MessageInput from "../../features/message/components/MessageInput";
import MessageList from "../messageList";
import Toolbar from "@mui/material/Toolbar";
export default function MainContent() {
  return (
    <Box
      component="main"
      sx={{
        display: "flex",
        gap: 2,
        flexDirection: "column",
        justifyContent: "flex-end",
        flexGrow: 1,
        p: 3,
      }}
    >
      <Toolbar />
      <MessageList />

      <MessageInput />
    </Box>
  );
}
