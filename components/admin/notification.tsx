import Alert, { AlertColor } from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import React, { useEffect } from "react";
import { useState } from "react";

interface Props {
  status: AlertColor;
  message: string;
}

export const AlertNotification = ({ status, message }: Props) => {
  const [open, setOpen] = useState<boolean>(true);

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    console.log("Test")
  }, [message, status]);

  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={status}>
        {message}
      </Alert>
    </Snackbar>
  );
};
