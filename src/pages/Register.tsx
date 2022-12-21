import { useState, ChangeEvent, FormEvent } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Alert, AlertTitle, Collapse } from '@mui/material';
import { AxiosError } from 'axios';
import axios from '../api/axios';

const theme = createTheme();

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = '/register';

export default function Register() {
  const [userInput, setUserInput] = useState({
    username: '',
    password: '',
  });
  const [validUsername, setValidUsername] = useState(false);
  const [validPassword, setValidPassword] = useState(false);
  const [success, setSuccess] = useState(false);
  const [userAlert, setUserAlert] = useState<{
    open: boolean;
    title: string;
    message: string;
  }>({ open: false, title: '', message: '' });

  const handleAlert = (title: string, message: string) => {
    setUserAlert({
      open: true,
      title,
      message,
    });
    setTimeout(() => {
      setUserAlert({ open: false, title: '', message: '' });
    }, 5000);
  };

  const usernameChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    // if (!USER_REGEX.test(event.target.value)) {
    //   setValidUsername(false);
    // } else {
    //   setValidUsername(true);
    // }
    setUserInput((prevState) => {
      return { ...prevState, username: event.target.value };
    });
  };

  const passwordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    // if (!PWD_REGEX.test(event.target.value)) {
    //   setValidPassword(false);
    // } else {
    //   setValidPassword(true);
    // }
    setUserInput((prevState) => {
      return { ...prevState, password: event.target.value };
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const v1 = USER_REGEX.test(userInput.username);
    const v2 = PWD_REGEX.test(userInput.password);
    if (!v1 || !v2) {
      handleAlert(
        'Register Error',
        `Invalid Entry ${v1} ${v2} ${userInput.username} ${userInput.password}`
      );
    }

    try {
      const response = await axios.post(
        REGISTER_URL,
        JSON.stringify(userInput),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      );
      handleAlert('Success', 'Sign In Below');
      setSuccess(true);
    } catch (error) {
      const err = error as AxiosError;
      if (!err?.response) {
        handleAlert('Error', 'No Server Response');
      } else if (err.response?.status === 409) {
        handleAlert('Error', 'Username Taken');
      } else {
        handleAlert('Error', 'Registration Failed');
      }
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Collapse in={userAlert.open}>
          <Alert severity="warning">
            <AlertTitle>{userAlert.title}</AlertTitle>
            {userAlert.message}
          </Alert>
        </Collapse>
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {success ? (
            <>
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <ThumbUpIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                You are registered!
              </Typography>
              <Link href="#">Sign in</Link>
            </>
          ) : (
            <>
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign up
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 3 }}
              >
                <Grid container spacing={2}>
                  {/* <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid> */}
                  <Grid item xs={12}>
                    <TextField
                      error={validUsername}
                      required
                      fullWidth
                      id="username"
                      label="Username"
                      name="username"
                      autoComplete="username"
                      value={userInput.username}
                      onChange={usernameChangeHandler}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      error={validPassword}
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="new-password"
                      value={userInput.password}
                      onChange={passwordChangeHandler}
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign Up
                </Button>
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Link href="/" variant="body2">
                      Already have an account? Sign in
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </>
          )}
        </Box>
      </Container>
    </ThemeProvider>
  );
}
