import { Paper, Grid, Card, Typography } from '@mui/material';
import { useState } from 'react';
import { Student } from '../../common/types';
import HallpassModal from '../HallpassModal/HallpassModal';
import destinations from '../../data/destinations.json';

function CourseRoster(props: { courseTitle: string; students: Student[] }) {
  const { courseTitle, students } = props;

  const [studentHallpassModals, setStudentHallpassModals] = useState<Student>();

  const handleClose = () => {
    setStudentHallpassModals(undefined);
  };

  return (
    <Paper>
      {courseTitle} Roster
      <Grid container spacing={2}>
        {students.map((student) => (
          <Grid item xs={3} key={student.lastName + student.firstName}>
            <Card
              raised
              onClick={() => {
                setStudentHallpassModals(student);
              }}
            >
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                align="center"
              >
                {student.firstName}
              </Typography>
              <Typography
                sx={{ mb: 1.5 }}
                color="text.secondary"
                align="center"
              >
                {student.lastName}
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>
      {studentHallpassModals && (
        <HallpassModal student={studentHallpassModals} onClose={handleClose} />
      )}
    </Paper>
  );
}

export default CourseRoster;
