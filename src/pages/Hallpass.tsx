import {
  Box,
  Container,
  createTheme,
  CssBaseline,
  ThemeProvider,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { HallPass } from '../common/types';
import CountdownTimer from '../components/CountdownTimer/CountdownTimer';
import useAuth from '../hooks/useAuth';
import useAxiosPrivate from '../hooks/useAxiosPrivate';

const theme = createTheme();

export default function Hallpass(props: { hallpassId: any }) {
  const { hallpassId } = props;
  const [hallpass, setHallpass] = useState<HallPass>();

  const axiosPrivate = useAxiosPrivate();

  const { auth } = useAuth();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    (async () => {
      const data = await axiosPrivate.get(
        `http://localhost:3002/hallpasses/${hallpassId}`,
        {
          signal: controller.signal,
        }
      );
      console.log(data.data);

      isMounted &&
        setHallpass({
          // eslint-disable-next-line no-underscore-dangle
          id: data.data._id,
          date: data.data.date,
          firstName: data.data.student.firstName,
          lastName: data.data.student.lastName,
          origin: data.data.origin,
          destination: data.data.destination,
          timer: data.data.timer,
        });
    })().catch((error) => {
      console.error(error);
    });
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  const clockTime = (date: string, timer: number) => {
    const startTime: Date = new Date(date);
    const currentTime: Date = new Date(Date.now());

    const elapsedTime = (currentTime.getTime() - startTime.getTime()) / 60000;
    console.log('date', date);
    console.log('currentTime.getTime()', currentTime.getTime());
    console.log('startTime.getTime()', startTime.getTime());
    console.log('elapsedTime', elapsedTime);

    const timerInMS = new Date().getTime() + (timer - elapsedTime) * 60 * 1000;
    console.log('timerInMS', timerInMS);

    return timerInMS;
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box sx={{ mt: 1 }}>
            <Typography variant="h1">
              {hallpass?.firstName} {hallpass?.lastName}
            </Typography>
            <Typography>{hallpass?.date}</Typography>
            <Typography>From: {hallpass?.origin}</Typography>
            <Typography>To: {hallpass?.destination}</Typography>
            <CountdownTimer
              targetDate={clockTime(
                hallpass?.date as string,
                hallpass?.timer as number
              )}
            />
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
