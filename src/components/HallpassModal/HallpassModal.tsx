import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from '@mui/material';

interface HallpassModalProps {
  open: boolean;
  onClose: (student: string) => void;
  student: { firstName: string; lastName: string };
}

function HallpassModal(props: HallpassModalProps) {
  const { open, onClose, student } = props;

  const handleClose = () => {
    console.log('Close modal');
    onClose(student.lastName + student.firstName);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Hallpass</DialogTitle>
      <DialogContent>
        <Typography>{`${student.firstName} ${student.lastName}`}</Typography>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Email Address"
          type="email"
          fullWidth
          variant="standard"
        />
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Submit</Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
}

export default HallpassModal;
