import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { useAppContext } from "../../store/store";
import AccountMenu from "../AccountMenu";

export default function Header() {
  const { userList, messageCount } = useAppContext();
  return (
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
        <h1 className="text-[1rem] md:text-2xl font-bold">Public Chatroom</h1>

        {/* Stats - hidden on mobile, visible on tablet and desktop */}
        <div className="hidden md:flex flex-row gap-4 text-sm lg:text-base">
          <p className="whitespace-nowrap">
            <span className="font-semibold">Total Users:</span>{" "}
            {(userList?.length || 0) + 1}
          </p>
          <p className="whitespace-nowrap">
            <span className="font-semibold">Total Messages:</span>{" "}
            {messageCount}
          </p>
        </div>

        {/* Mobile stats - visible only on mobile */}
        <div className="md:hidden flex flex-col text-xs">
          <p className="whitespace-nowrap">
            <span className="font-semibold">Users:</span>{" "}
            {(userList?.length || 0) + 1}
          </p>
          <p className="whitespace-nowrap">
            <span className="font-semibold">Messages:</span> {messageCount}
          </p>
        </div>

        <AccountMenu />
      </Toolbar>
    </AppBar>
  );
}
