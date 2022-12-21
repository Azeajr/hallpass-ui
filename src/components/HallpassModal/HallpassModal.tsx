import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { Student } from '../../common/types';
import useAuth from '../../hooks/useAuth';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import DropdownFormInput from '../DropdownFormInput/DropdownFormInput';

interface Props {
  onClose: () => void;
  student: Student;
  // destinations: string[];
}

function HallpassModal({ onClose, student }: Props) {
  const [destinations, setDestinations] = useState<any[]>([]);
  const [selection, setSelection] = useState<string>('');

  const axiosPrivate = useAxiosPrivate();

  const { auth } = useAuth();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    (async () => {
      const data = await axiosPrivate.get(
        'http://localhost:3002/destinations',
        {
          signal: controller.signal,
        }
      );
      isMounted && setDestinations(data.data);
    })().catch((error) => {
      console.error(error);
    });
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  const handleClose = () => {
    onClose();
  };

  const handleSubmit = () => {
    const data = {
      date: new Date(),
      studentId: student.id,
      origin: auth.username,
      destination: selection,
      // TODO: remove
      timer: 3,
      // open, closed
      state: 'open',
    };
    console.log('Hallpass created: ', data);

    axiosPrivate
      .post('http://localhost:3002/hallpasses', data)
      .catch((error) => console.error(error));

    onClose();
  };

  return (
    <Dialog open={!!student} onClose={onClose}>
      <DialogTitle>Hallpass</DialogTitle>
      <DialogContent>
        <Typography>{`${student.firstName} ${student.lastName}`}</Typography>
        <DropdownFormInput
          name="Destination"
          selections={destinations}
          getSelection={setSelection}
        />
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
}

export default HallpassModal;
