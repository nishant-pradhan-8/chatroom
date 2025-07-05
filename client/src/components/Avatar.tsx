import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";

const StyledBadge = styled(Badge, {
  shouldForwardProp: (prop) => prop !== "online",
})<{ online: boolean }>(({ theme, online }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: online ? "#44b700" : "#b0b0b0", // green if online, gray if offline
    color: online ? "#44b700" : "#b0b0b0",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

export default function UserAvatar({
  username,
  online,
}: {
  username: string;
  online: boolean;
}) {
  return (
    <StyledBadge
      sx={{ cursor: "default" }}
      overlap="circular"
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      variant="dot"
      online={online}
    >
      <Avatar>{username.split(" ")[0].split("")[0].toUpperCase()}</Avatar>
    </StyledBadge>
  );
}
