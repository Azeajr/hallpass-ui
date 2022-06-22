import { useState } from 'react';
import {
  Box,
  createTheme,
  CssBaseline,
  ThemeProvider,
  styled,
  Toolbar,
  IconButton,
  Typography,
  List,
  Divider,
  Button,
  Grid,
  Container,
} from '@mui/material';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FlightLandIcon from '@mui/icons-material/FlightLand';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import MuiDrawer from '@mui/material/Drawer';
import DashboardDrawerItems from './DashboardDrawerItems';
import Courses from '../../pages/Courses';
import EnRoute from '../../pages/EnRoute';
import Hallway from '../../pages/Hallway';

const drawerWidth = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop: string) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop: string) => prop !== 'open',
})(({ theme, open }) => ({
  '& .MuiDrawer-paper': {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: 'border-box',
    ...(!open && {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const mdTheme = createTheme();

function Dashboard(props: { dashboardTitle: string; teacherData: any }) {
  const [open, setOpen] = useState(true);
  const [appBarStatus, setAppBarStatus] = useState({
    courses: true,
    enRoute: false,
    hallway: false,
  });

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const { dashboardTitle, teacherData } = props;

  const routes: string[] = ['Arrivals', 'Departures'];
  const courses: string[] = [];
  // const students = [];

  teacherData.forEach(
    (course: {
      courseTitle: string;
      students: {
        firstName: string;
        lastName: string;
      }[];
    }) => {
      courses.push(course.courseTitle);
      // students.push(course.students);
    }
  );

  // const courseStatus: any = {};
  // courses.forEach((course) => {
  //   courseStatus[course] = false;
  // });

  const courseStatus = courses.reduce(
    (acc: { [key: string]: boolean }, course, index) => {
      if (index === 0) {
        acc[course] = true;
      } else {
        acc[course] = false;
      }

      return acc;
    },
    {}
  );

  const routeStatus = routes.reduce(
    (acc: { [key: string]: boolean }, route, index) => {
      if (index === 0) {
        acc[route] = true;
      } else {
        acc[route] = false;
      }

      return acc;
    },
    {}
  );

  const [dashboardStatus, setDashboardStatus] = useState({
    ...courseStatus,
    ...routeStatus,
  });

  const onDashboardDrawerItemClicked = (course: any) => {
    setDashboardStatus({
      [`${course.target.textContent}`]: true,
    });
  };

  const items = courses.map((course) => ({
    title: course,
    icon: <AccountBoxIcon />,
    onClick: onDashboardDrawerItemClicked,
    disabled: dashboardStatus[course],
  }));

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              marginRight={5}
              // noWrap
              sx={{ flexGrow: 1 }}
            >
              {dashboardTitle}
            </Typography>
            <Grid container spacing={2}>
              <Grid item>
                <Button
                  disabled={appBarStatus.courses}
                  variant="outlined"
                  sx={{
                    color: 'white',
                    borderColor: 'white',
                  }}
                  onClick={() => {
                    setAppBarStatus((prevState) => {
                      return {
                        ...prevState,
                        courses: true,
                        hallway: false,
                        enRoute: false,
                      };
                    });
                  }}
                >
                  Courses
                </Button>
              </Grid>
              <Grid item>
                <Button
                  disabled={appBarStatus.enRoute}
                  variant="outlined"
                  sx={{
                    color: 'white',
                    borderColor: 'white',
                  }}
                  onClick={() => {
                    setAppBarStatus((prevState) => {
                      return {
                        ...prevState,
                        enRoute: true,
                        courses: false,
                        hallway: false,
                      };
                    });
                  }}
                >
                  En Route
                </Button>
              </Grid>
              <Grid item>
                <Button
                  disabled={appBarStatus.hallway}
                  variant="outlined"
                  sx={{
                    color: 'white',
                    borderColor: 'white',
                  }}
                  onClick={() => {
                    setAppBarStatus((prevState) => {
                      return {
                        ...prevState,
                        hallway: true,
                        enRoute: false,
                        courses: false,
                      };
                    });
                  }}
                >
                  Hallway
                </Button>
              </Grid>
            </Grid>
            <IconButton color="inherit">
              <AccountCircleIcon sx={{ fontSize: 50 }} />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List>
            {appBarStatus.courses && <DashboardDrawerItems items={items} />}
            {appBarStatus.enRoute && (
              <DashboardDrawerItems
                items={[
                  {
                    title: 'Arrivals',
                    icon: <FlightLandIcon />,
                    onClick: onDashboardDrawerItemClicked,
                    disabled: dashboardStatus.Arrivals,
                  },
                  {
                    title: 'Departures',
                    icon: <FlightTakeoffIcon />,
                    onClick: onDashboardDrawerItemClicked,
                    disabled: dashboardStatus.Departures,
                  },
                ]}
              />
            )}
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Container maxWidth="xl" sx={{ mt: 8, mb: 8 }}>
            {appBarStatus.courses && (
              <Courses
                teacherData={teacherData}
                dashboardStatus={dashboardStatus}
              />
            )}
            {appBarStatus.enRoute && (
              <EnRoute dashboardStatus={dashboardStatus} />
            )}
            {appBarStatus.hallway && <Hallway />}
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default Dashboard;
