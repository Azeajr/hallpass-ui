import { Card } from '@mui/material';

function DateTimeDisplay(props: {
  value: number;
  type: string;
  isDanger: boolean;
}) {
  const { value, type, isDanger } = props;
  if (isDanger) {
    return (
      <Card
        sx={{
          color: '#ff0000',
        }}
      >
        <p style={{ margin: 0 }}>{value}</p>
        <span
          style={{
            textTransform: 'uppercase',
            fontSize: '0.75rem',
            lineHeight: '1rem',
          }}
        >
          {type}
        </span>
      </Card>
    );
  }
  return (
    <Card
      sx={{
        lineHeight: '1.25rem',
        padding: '0 0.75rem 0 0.75rem',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <p>{value}</p>
      <span>{type}</span>
    </Card>
  );
}

export default DateTimeDisplay;
