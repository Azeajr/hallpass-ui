import { Paper, Grid, Card, Typography } from '@mui/material';
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
  return (
    <Paper>
      {courseTitle} Roster
      <Grid container spacing={2}>
        {students.map((student) => (
          <Grid item xs={3} key={student.lastName + student.firstName}>
            <Card raised>
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
    </Paper>
  );
}

export default CourseRoster;
