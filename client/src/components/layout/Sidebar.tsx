import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import UserAvatar from "../Avatar";
import { useAppContext } from "../../store/store";
import Toolbar from "@mui/material/Toolbar";
import type { DrawerProps } from "@mui/material/Drawer";
const drawerWidth = 240;

interface SidebarProps {
  variant?: DrawerProps["variant"];
  open?: boolean;
  onClose?: () => void;
  // className for conditional display (md:block, hidden, etc)
  className?: string;
}

export default function Sidebar({ variant = "permanent", open, onClose, className }: SidebarProps) {
  const { userList, user } = useAppContext();
  if (!user) return null;
  return (
    <Drawer
      className={className}
      variant={variant}
      open={open}
      onClose={onClose}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: "border-box" },
        display: className,
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: "auto" }}>
        <List>
          <ListItem disablePadding>
            <div className="flex flex-row w-full border-b-[1px] border-gray-300 p-2 px-4 items-center justify-between">
              <ListItemIcon>
                <UserAvatar username={user.username} online={user.online} />
              </ListItemIcon>
              <ListItemText primary={user.username} />
              <p className="text-gray-400 text-[0.8rem]">You</p>
            </div>
          </ListItem>

          <p className="p-2 px-4 text-purple-600 mt-2 font-semibold">Members</p>
          {userList ? (
            userList.map((u) => (
              <ListItem key={u._id} disablePadding>
                <div className="flex flex-row p-2 px-4">
                  <ListItemIcon>
                    <UserAvatar username={u.username} online={u.online} />
                  </ListItemIcon>
                  <ListItemText primary={u.username} />
                </div>
              </ListItem>
            ))
          ) : (
            <p>No Registered Users</p>
          )}
        </List>
      </Box>
    </Drawer>
  );
}
