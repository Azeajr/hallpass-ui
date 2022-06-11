// import r from 'rethinkdb';
import Dashboard from '../components/dashboard/Dashboard';
import teacherData from '../data/teacherData.json';

function Main() {
  return <Dashboard dashboardTitle="HallPass" teacherData={teacherData} />;
}

export default Main;
