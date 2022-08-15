// import r from 'rethinkdb';
import { Button } from '@mui/material';
import Axios from 'axios';
import { useEffect, useState } from 'react';
import Dashboard from '../components/Dashboard/Dashboard';
// import teacherData from '../data/teacherData.json';

function Main() {
  const [teacherData, setTeacherData] = useState<any>([]);

  useEffect(() => {
    (async () => {
      const data = await Axios.get('http://localhost:3002/api/getTeacherData');
      setTeacherData(data.data);
    })();
  }, []);

  return <Dashboard dashboardTitle="HallPass" teacherData={teacherData} />;
}

export default Main;
