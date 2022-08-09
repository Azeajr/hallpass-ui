// import r from 'rethinkdb';
import { Button } from '@mui/material';
import Axios from 'axios';
import Dashboard from '../components/Dashboard/Dashboard';
import teacherData from '../data/teacherData.json';

function Main() {
  return (
    <>
      <Dashboard dashboardTitle="HallPass" teacherData={teacherData} />
      <Button
        onClick={async () => {
          const data = await Axios.get('http://localhost:3002/api/get');
          console.log(data);
        }}
      >
        apiTest
      </Button>
    </>
  );
}

export default Main;
