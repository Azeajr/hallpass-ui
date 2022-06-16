import { Card, Paper } from '@mui/material';
import DateTimeDisplay from './DateTimeDisplay';
import useCountdown from '../../hooks/useCountdown';

function ExpiredNotice() {
  return (
    <Card
      sx={{
        textAlign: 'center',
        padding: '2rem',
        border: '1px solid #ebebeb',
        borderRadius: '0.25rem',
        margin: '0.5rem',
      }}
    >
      <span
        style={{
          fontSize: '2.5rem',
          fontWeight: 'bold',
          color: 'red',
        }}
      >
        Expired!!!
      </span>
      <p style={{ fontSize: '1.5rem' }}>
        Please select a future date and time.
      </p>
    </Card>
  );
}

function ShowCounter(props: { minutes: number; seconds: number }) {
  const { minutes, seconds } = props;
  return (
    <Paper
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        fontWeight: '700',
        fontSize: '1.25rem',
        lineHeight: '1.75rem',
        padding: '0.5rem',
        border: '1px solid #ebebeb',
        borderRadius: '0.25rem',
        textDecoration: 'none',
        color: '#000',
      }}
    >
      <DateTimeDisplay value={minutes} type="Mins" isDanger={false} />
      <p>:</p>
      <DateTimeDisplay value={seconds} type="Seconds" isDanger={false} />
    </Paper>
  );
}

function CountdownTimer(props: { targetDate: number }) {
  const { targetDate } = props;
  const [days, hours, minutes, seconds] = useCountdown(targetDate);

  if (days + hours + minutes + seconds <= 0) {
    return <ExpiredNotice />;
  }
  return <ShowCounter minutes={minutes} seconds={seconds} />;
}

export default CountdownTimer;
