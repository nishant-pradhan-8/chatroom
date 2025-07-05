import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { changePassword } from "../service/userService";

export default function ChangePasswordDialog({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [oldPassword, setOldPassword] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [error, setError] = React.useState("");
  const isDirty = oldPassword.length > 0 && newPassword.length > 0;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const response = await changePassword(oldPassword, newPassword);

      if (response.status === "success") {
        onClose();
        setOldPassword("");
        setNewPassword("");
        window.alert("Password changes successfully.");
      } else {
        setError(response.message || "Failed to change password");
      }
    } catch (err: any) {
      setError("Failed to change password. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    onClose();
    setOldPassword("");
    setNewPassword("");
    setError("");
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Change Password</DialogTitle>
      <DialogContent>
        {error && (
          <div className="text-red-500 text-sm mb-4 p-2 bg-red-50 rounded">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <TextField
            autoFocus
            required
            margin="dense"
            id="oldPassword"
            name="oldPassword"
            label="Old Password"
            type="password"
            fullWidth
            variant="standard"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            disabled={isSubmitting}
          />
          <TextField
            required
            margin="dense"
            id="newPassword"
            name="newPassword"
            label="New Password"
            type="password"
            fullWidth
            variant="standard"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            disabled={isSubmitting}
          />
          <DialogActions>
            <Button onClick={handleClose} disabled={isSubmitting}>
              Cancel
            </Button>
            <button
              className="cursor-pointer bg-purple-600 p-2 px-4 disabled:bg-gray-400 text-white rounded-xl"
              type="submit"
              disabled={!isDirty || isSubmitting}
            >
              {isSubmitting ? "Changing..." : "Save"}
            </button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
}
