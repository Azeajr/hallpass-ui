import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from '@mui/material';
import { Student } from '../../common/types';
import DropdownFormInput from '../DropdownFormInput/DropdownFormInput';

interface Props {
  onClose: () => void;
  student: Student;
  destinations: string[];
}

function HallpassModal({ onClose, student, destinations }: Props) {
  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog open={!!student} onClose={onClose}>
      <DialogTitle>Hallpass</DialogTitle>
      <DialogContent>
        <Typography>{`${student.firstName} ${student.lastName}`}</Typography>
        <DropdownFormInput name="Destination" selections={destinations} />
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Submit</Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
}

export default HallpassModal;
