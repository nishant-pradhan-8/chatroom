import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import AccountMenu from "../AccountMenu";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Sidebar from "./Sidebar";
import { useState } from "react";

export default function Header() {
  
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "#9810fa",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div className="flex items-center">
            {/* Hamburger menu for mobile */}
            <IconButton
              color="inherit"
              aria-label="open sidebar"
              edge="start"
              onClick={() => setSidebarOpen((open) => !open)}
              className="md:hidden"
              sx={{ mr: 2, display: { md: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <h1 className="text-[1rem] md:text-2xl font-bold">Public Chatroom</h1>
          </div>

       

          <AccountMenu />
        </Toolbar>
      </AppBar>
      {/* Sidebar as temporary drawer for mobile */}
      <Sidebar
        variant="temporary"
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        className="md:hidden"
      />
    </>
  );
}
