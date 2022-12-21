import { useState, useContext, ChangeEvent } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AxiosError } from 'axios';
import { Alert, AlertTitle, Collapse } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthProvider';
import axios from '../api/axios';

const theme = createTheme();
const LOGIN_URL = '/auth';

export default function Login() {
  const { setAuth } = useContext(AuthContext);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const [userInput, setUserInput] = useState({
    username: '',
    password: '',
  });
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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    try {
      const response = await axios.post(LOGIN_URL, JSON.stringify(userInput), {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      });
      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.roles;
      setAuth?.({
        username: userInput.username,
        password: userInput.password,
        roles,
        accessToken,
      });
      setUserInput({
        username: '',
        password: '',
      });
      navigate(from, { replace: true });
    } catch (error) {
      const err = error as AxiosError;
      if (!err?.response) {
        handleAlert('Error', 'No Server Response');
      } else if (err.response?.status === 400) {
        handleAlert('Error', 'Missing Username or Password');
      } else if (err.response?.status === 401) {
        handleAlert('Error', 'Unauthorized');
      } else {
        handleAlert('Error', 'Login Failed');
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
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              value={userInput.username}
              onChange={usernameChangeHandler}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={userInput.password}
              onChange={passwordChangeHandler}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/register" variant="body2">
                  Don&apos;t have an account? Sign Up
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
