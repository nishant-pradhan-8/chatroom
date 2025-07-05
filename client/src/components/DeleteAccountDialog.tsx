import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { deleteAccount } from "../service/userService";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../store/store";

export default function DeleteAccountDialog({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [password, setPassword] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [error, setError] = React.useState("");
  const navigate = useNavigate();
  const { setUser } = useAppContext();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const response = await deleteAccount(password);

      if (response.status === "success") {
        setUser(null);
        navigate("/login");
        window.alert("Account deleted successfully");
      } else {
        setError(response.message || "Failed to delete account");
      }
    } catch (err: any) {
      setError("Failed to delete account. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    onClose();
    setPassword("");
    setError("");
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Delete Account</DialogTitle>
      <DialogContent>
        <div className="mb-4 text-sm text-gray-600">
          This action cannot be undone. All your data will be permanently
          deleted.
        </div>
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
            id="password"
            name="password"
            label="Enter your password to confirm"
            type="password"
            fullWidth
            variant="standard"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isSubmitting}
          />
          <DialogActions>
            <Button onClick={handleClose} disabled={isSubmitting}>
              Cancel
            </Button>
            <button
              className="cursor-pointer bg-red-600 p-2 px-4 disabled:bg-gray-400 text-white rounded-xl hover:bg-red-700"
              type="submit"
              disabled={!password || isSubmitting}
            >
              {isSubmitting ? "Deleting..." : "Delete Account"}
            </button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
}
