import { Card } from '@mui/material';

function DateTimeDisplay(props: {
  value: number;
  type: string;
  isDanger: boolean;
}) {
  const { value, type, isDanger } = props;
  return (
    <Card>
      <p>{value}</p>
      <span>{type}</span>
    </Card>
  );
}

export default DateTimeDisplay;
