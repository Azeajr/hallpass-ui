import { Card, Paper } from '@mui/material';
import DateTimeDisplay from './DateTimeDisplay';
import useCountdown from '../../hooks/useCountdown';

function ExpiredNotice() {
  return (
    <Card>
      <span>Expired!!!</span>
      <p>Please select a future date and time.</p>
    </Card>
  );
}

function ShowCounter(props: {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}) {
  const { days, hours, minutes, seconds } = props;
  return (
    <Paper>
      <DateTimeDisplay value={days} type="Days" isDanger={days <= 3} />
      <p>:</p>
      <DateTimeDisplay value={hours} type="Hours" isDanger={false} />
      <p>:</p>
      <DateTimeDisplay value={minutes} type="Mins" isDanger={false} />
      <p>:</p>
      <DateTimeDisplay value={seconds} type="Seconds" isDanger={false} />
    </Paper>
  );
}

function CountdownTimer(props: { targetDate: string }) {
  const { targetDate } = props;
  const [days, hours, minutes, seconds] = useCountdown(targetDate);

  if (days + hours + minutes + seconds <= 0) {
    return <ExpiredNotice />;
  }
  return (
    <ShowCounter
      days={days}
      hours={hours}
      minutes={minutes}
      seconds={seconds}
    />
  );
}

export default CountdownTimer;
