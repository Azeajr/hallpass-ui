import { useEffect, useState } from 'react';
import Dashboard from '../components/Dashboard/Dashboard';
import useAuth from '../hooks/useAuth';
import useAxiosPrivate from '../hooks/useAxiosPrivate';

function Main() {
  const [teacherData, setTeacherData] = useState<any>([]);
  const axiosPrivate = useAxiosPrivate();

  const { auth } = useAuth();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    (async () => {
      const data = await axiosPrivate.get(
        `http://localhost:3002/users/${auth.userId}`,
        {
          signal: controller.signal,
        }
      );
      console.log(data);

      isMounted && setTeacherData(data.data);
    })().catch((error) => {
      console.error(error);
    });
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return <Dashboard dashboardTitle="HallPass" teacherData={teacherData} />;
}

export default Main;
