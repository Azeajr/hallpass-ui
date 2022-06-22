import { Paper, Grid, Card, Typography } from '@mui/material';
import { useState } from 'react';
import HallpassModal from '../HallpassModal/HallpassModal';
// import teacherData from '../../data/teacherData.json';

function CourseRoster(props: {
  courseTitle: string;
  students: {
    firstName: string;
    lastName: string;
  }[];
}) {
  // const students;
  const { courseTitle, students } = props;

  const [studentHallpassModals, setStudentHallpassModals] = useState(
    students.reduce((acc: { [key: string]: boolean }, student) => {
      acc[student.lastName + student.firstName] = false;
      return acc;
    }, {})
  );

  // const [studentHallpassModals, setStudentHallpassModals] = useState<{
  //   [key: string]: boolean;
  // }>({});

  // console.log(studentHallpassModals);

  const handleClose = (student: string) => {
    console.log(studentHallpassModals, student);

    setStudentHallpassModals({ [student]: false });
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
                setStudentHallpassModals({
                  [student.lastName + student.firstName]: true,
                });
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
              <HallpassModal
                open={
                  studentHallpassModals[student.lastName + student.firstName]
                }
                student={{ ...student }}
                onClose={handleClose}
              />
            </Card>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
}

export default CourseRoster;
