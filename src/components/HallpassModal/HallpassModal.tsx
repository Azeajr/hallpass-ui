import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material';
import Axios from 'axios';
import { useEffect, useState } from 'react';
import { Student } from '../../common/types';
import DropdownFormInput from '../DropdownFormInput/DropdownFormInput';

interface Props {
  onClose: () => void;
  student: Student;
  // destinations: string[];
}

function HallpassModal({ onClose, student }: Props) {
  const [destinations, setDestinations] = useState<any[]>([]);
  const [selection, setSelection] = useState<string>('');

  useEffect(() => {
    (async () => {
      const data = await Axios.get('http://localhost:3002/api/getDestinations');
      setDestinations(data.data);
    })().catch((error) => {
      console.error(error);
    });
  }, []);

  const handleClose = () => {
    onClose();
  };

  const handleSubmit = () => {
    const data = {
      date: new Date().toISOString().slice(0, 19).replace('T', ' '),
      firstName: student.firstName,
      lastName: student.lastName,
      origin: 'Zea, A.',
      destination: selection,
      // TODO: remove
      timer: 3,
    };

    Axios.post('http://localhost:3002/api/postHallpass', data).catch((error) =>
      console.error(error)
    );

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
