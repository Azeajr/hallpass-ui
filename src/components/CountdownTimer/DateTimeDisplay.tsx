import React from 'react';

function DateTimeDisplay(props: {
  value: number;
  type: string;
  isDanger: boolean;
}) {
  const { value, type, isDanger } = props;
  return (
    <div className={isDanger ? 'countdown danger' : 'countdown'}>
      <p>{value}</p>
      <span>{type}</span>
    </div>
  );
}

export default DateTimeDisplay;
