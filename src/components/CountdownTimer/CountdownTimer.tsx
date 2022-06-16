import React from 'react';
import DateTimeDisplay from './DateTimeDisplay';
import useCountdown from '../../hooks/useCountdown';

function ExpiredNotice() {
  return (
    <div className="expired-notice">
      <span>Expired!!!</span>
      <p>Please select a future date and time.</p>
    </div>
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
    <div className="show-counter">
      <a
        href="https://tapasadhikary.com"
        target="_blank"
        rel="noopener noreferrer"
        className="countdown-link"
      >
        <DateTimeDisplay value={days} type="Days" isDanger={days <= 3} />
        <p>:</p>
        <DateTimeDisplay value={hours} type="Hours" isDanger={false} />
        <p>:</p>
        <DateTimeDisplay value={minutes} type="Mins" isDanger={false} />
        <p>:</p>
        <DateTimeDisplay value={seconds} type="Seconds" isDanger={false} />
      </a>
    </div>
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
