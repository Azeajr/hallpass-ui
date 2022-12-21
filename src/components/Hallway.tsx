import { useEffect, useState } from 'react';
import EnRouteTable from './EnRouteTable/EnRouteTable';
import { hallPass } from '../common/types';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import useAuth from '../hooks/useAuth';

function Hallway() {
  const [hallpasses, setHallpasses] = useState<hallPass[]>([]);

  const axiosPrivate = useAxiosPrivate();

  const { auth } = useAuth();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    (async () => {
      const data = await axiosPrivate.get('http://localhost:3002/hallpasses', {
        signal: controller.signal,
      });

      isMounted &&
        setHallpasses(
          data.data.map((pass: any) => {
            return {
              // eslint-disable-next-line no-underscore-dangle
              id: pass._id.toString(),
              date: pass.date,
              firstName: pass.student.firstName,
              lastName: pass.student.lastName,
              origin: pass.origin,
              destination: pass.destination,
              timer: pass.timer,
            };
          })
        );
    })().catch((error) => {
      console.error(error);
    });
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return (
    <EnRouteTable
      currentRows={hallpasses.map((pass) => {
        const { id, firstName, lastName, origin, destination, date, timer } =
          pass;

        const startTime: Date = new Date(date);
        const currentTime: Date = new Date();
        const elapsedTime =
          (currentTime.getTime() - startTime.getTime()) / 60000;

        const timerInMS =
          new Date().getTime() + (timer - elapsedTime) * 60 * 1000;

        return {
          id: id.toString(),
          date,
          firstName,
          lastName,
          origin,
          destination,
          timer: timerInMS,
        };
      })}
    />
  );
}

export default Hallway;
