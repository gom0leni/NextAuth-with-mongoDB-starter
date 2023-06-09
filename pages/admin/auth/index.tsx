import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Head from "next/head";
import Button from "@mui/material/Button";
import { NextPage } from "next";
import { FormEventHandler, useEffect, useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

interface Props {
  username: string;
  password: string;
}

const AdminLogin: NextPage = (Props): JSX.Element => {
  const { status } = useSession();
  const router = useRouter();
  const [userInfo, setUserInfo] = useState<Props>({
    username: "",
    password: "",
  });
  const [disabled, setDisabled] = useState<boolean>(false);

  useEffect(() => {
    if (status === "authenticated" && router.pathname === "/admin/auth"){
      signOut();
    }
  }, []);

  const handleChange = (key, value) => {
    setUserInfo({
      ...userInfo,
      [key]: value,
    });
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    setDisabled(true);
    await signIn("credentials", {
      username: userInfo.username,
      password: userInfo.password,
      redirect: false,
    })
      .then((res) => {
        if (res.ok) {
          toast.success("Login successfully");
          router.push("/admin");
        } else {
          toast.error(res.error ?? "Login failed");
        }
      })
      .catch((err) => {
        toast.error("Login failed");
      })
      .finally(() => {
        setDisabled(false);
      });
  };
  return (
    <>
      <Head>
        <title>Admin Login</title>
      </Head>
      <Stack
        sx={{
          height: "100vh",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="h3" align="center" gutterBottom>
          CMS
        </Typography>
        <Paper sx={{ maxWidth: "360px", width: "100%", padding: 2 }}>
          <Typography variant="h4" align="center" gutterBottom>
            Login
          </Typography>
          <Stack
            flexDirection="column"
            component="form"
            gap={3}
            marginTop={3}
            onSubmit={handleSubmit}
          >
            <TextField
              id="username"
              label="Username"
              type="string"
              variant="outlined"
              required
              onChange={(e) => handleChange("username", e.target.value)}
              disabled={disabled}
            />
            <TextField
              id="password"
              label="Password"
              type="password"
              variant="outlined"
              required
              onChange={(e) => handleChange("password", e.target.value)}
              disabled={disabled}
            />
            <Button
              variant="contained"
              size="large"
              sx={{ height: "56px" }}
              type="submit"
              disabled={disabled}
            >
              Log In
            </Button>
          </Stack>
        </Paper>
      </Stack>
    </>
  );
};

export default AdminLogin;
