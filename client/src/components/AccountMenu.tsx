import * as React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Logout from "@mui/icons-material/Logout";
import { useAppContext } from "../store/store";
import ProfileDialog from "./ProfileDialog";
import DeleteAccountDialog from "./DeleteAccountDialog";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import { logout } from "../service/authService";
import { useNavigate } from "react-router-dom";

export default function AccountMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { user, setUser } = useAppContext();
  const navigate = useNavigate();

  const [profileDialogOpen, setProfileDialogOpen] = React.useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProfileClick = () => {
    setProfileDialogOpen(true);
    handleClose();
  };

  const handleProfileDialogClose = () => {
    setProfileDialogOpen(false);
  };

  const handleDeleteClick = () => {
    setDeleteDialogOpen(true);
    handleClose();
  };

  const handleDeleteDialogClose = () => {
    setDeleteDialogOpen(false);
  };

  const handleLogout = async () => {
    try {
      const response = await logout();
      if (response.status === "success") {
        setUser(null);
        navigate("/login");
      } else {
        console.error("Logout failed:", response.message);
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
    handleClose();
  };

  return (
    <React.Fragment>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar sx={{ width: 32, height: 32 }}>
              {(user?.username.split(" ")[0].split("")[0] || "A").toUpperCase()}
            </Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&::before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 16,
                height: 16,
                bgcolor: "#e0aaff",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={handleProfileClick}>
          <Avatar /> My account Details
        </MenuItem>

        <Divider />

        <MenuItem
          className="flex flex-row justify-start items-center gap-2"
          onClick={handleDeleteClick}
        >
          <div className="bg-[#bdbdbd] flex items-center justify-center p-1 rounded-full">
            <PersonRemoveIcon className="text-white" />
          </div>{" "}
          Delete Account
        </MenuItem>

        <Divider />

        <MenuItem
          className="flex flex-row justify-start items-center gap-2"
          onClick={handleLogout}
        >
          <div className="bg-[#bdbdbd] flex items-center justify-center p-[0.4rem] rounded-full">
            <Logout className="text-white" fontSize="small" />
          </div>
          Logout
        </MenuItem>
      </Menu>
      <ProfileDialog
        open={profileDialogOpen}
        onClose={handleProfileDialogClose}
      />
      <DeleteAccountDialog
        open={deleteDialogOpen}
        onClose={handleDeleteDialogClose}
      />
    </React.Fragment>
  );
}
