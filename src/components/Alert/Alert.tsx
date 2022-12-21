import { useState } from 'react';
import { Alert, AlertTitle, Collapse } from '@mui/material';

export default function CustomAlert(title: string, message: string) {
  const [userAlert, setUserAlert] = useState<{
    open: boolean;
    title: string;
    message: string;
  }>({ open: false, title: '', message: '' });

  setUserAlert({
    open: true,
    title,
    message,
  });
  setTimeout(() => {
    setUserAlert({ open: false, title: '', message: '' });
  }, 5000);

  return (
    <Collapse in={userAlert.open}>
      <Alert severity="warning">
        <AlertTitle>{userAlert.title}</AlertTitle>
        {userAlert.message}
      </Alert>
    </Collapse>
  );
}
