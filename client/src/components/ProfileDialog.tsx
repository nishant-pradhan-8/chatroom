import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useAppContext } from "../store/store";
import ChangePasswordDialog from "./ChangePasswordDialog";
import { updateProfile } from "../service/userService";

type ProfileDialogProps = {
  open: boolean;
  onClose: () => void;
};

export default function ProfileDialog({ open, onClose }: ProfileDialogProps) {
  const { user, setUser } = useAppContext();
  const [formState, setFormState] = React.useState({ email: "", username: "" });
  const [isDirty, setIsDirty] = React.useState(false);
  const [changePasswordOpen, setChangePasswordOpen] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    if (user && open) {
      setFormState({ email: user.email || "", username: user.username });
      setIsDirty(false);
      setError("");
    }
  }, [user, open]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => {
      const updated = { ...prev, [name]: value };
      setIsDirty(
        updated.email !== (user?.email || "") ||
          updated.username !== (user?.username || "")
      );
      return updated;
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const response = await updateProfile(formState.email, formState.username);

      if (response.data) {
        console.log(response.data);
        setUser({ ...response.data, online: true });
        window.alert("Profile Updated Successfully!");
        onClose();
      } else {
        setError(response.message || "Failed to update profile");
      }
    } catch (err: any) {
      setError("Failed to update profile. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Account Details</DialogTitle>
        <DialogContent sx={{ paddingBottom: 0 }}>
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
              id="email"
              name="email"
              label="Email Address"
              type="email"
              fullWidth
              variant="standard"
              value={formState.email}
              onChange={handleChange}
              disabled={isSubmitting}
            />
            <TextField
              required
              margin="dense"
              id="username"
              name="username"
              label="Username"
              type="text"
              fullWidth
              variant="standard"
              value={formState.username}
              onChange={handleChange}
              disabled={isSubmitting}
            />
            <DialogActions
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Button
                className="!text-purple-800 !text-[12px] sm:!text-[1rem]"
                sx={{ padding: 0 }}
                onClick={() => setChangePasswordOpen(true)}
                disabled={isSubmitting}
              >
                Change Password
              </Button>
              <div className="flex flex-row items-center gap-2">
                <Button
                  className="!text-purple-800 !text-[12px] sm:!text-[1rem]"
                  onClick={onClose}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <button
                  className="cursor-pointer !text-[12px]  sm:!text-[1rem]  bg-purple-600 p-2 px-4 disabled:bg-gray-400 text-white rounded-xl"
                  type="submit"
                  disabled={!isDirty || isSubmitting}
                >
                  {isSubmitting ? "Saving..." : "Save"}
                </button>
              </div>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
      <ChangePasswordDialog
        open={changePasswordOpen}
        onClose={() => setChangePasswordOpen(false)}
      />
    </>
  );
}
