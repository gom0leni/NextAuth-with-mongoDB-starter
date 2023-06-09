import { useEffect } from "react";
import Router from "next/router";
import { useSession } from "next-auth/react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

export const DashboardProtectedLayout = ({ children }) => {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") Router.replace("/admin/auth");
  }, [status]);

  if (status !== "authenticated") {
    return (
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={true}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }

  return (
    <>
      <main>{children}</main>
    </>
  );
};
