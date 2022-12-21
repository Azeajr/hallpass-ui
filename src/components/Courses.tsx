import { Box } from '@mui/material';
import CourseRoster from './CourseRoster/CourseRoster';

function Courses(props: { teacherData: any; dashboardStatus: any }) {
  const { teacherData, dashboardStatus } = props;

  return (
    <Box sx={{ padding: 1, marginTop: 8, flexGrow: 1 }}>
      {teacherData.map(
        (course: {
          courseTitle: string;
          students: {
            firstName: string;
            lastName: string;
            id: string;
          }[];
        }) =>
          dashboardStatus[course.courseTitle] && (
            <CourseRoster
              key={course.courseTitle}
              courseTitle={course.courseTitle}
              students={course.students}
            />
          )
      )}
    </Box>
  );
}

export default Courses;
