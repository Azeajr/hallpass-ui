import { useEffect, useState } from 'react';
import EnRouteTable from './EnRouteTable/EnRouteTable';
import { hallPass } from '../common/types';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import useAuth from '../hooks/useAuth';

function EnRoute(props: { dashboardStatus: any }) {
  const { dashboardStatus } = props;

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

  let viewHallpassData: hallPass[] = [];

  if (dashboardStatus.Arrivals) {
    viewHallpassData = hallpasses.filter(
      (pass) => pass.destination === auth.username
    );
  } else if (dashboardStatus.Departures) {
    viewHallpassData = hallpasses.filter(
      (pass) => pass.origin === auth.username
    );
  }

  return (
    <EnRouteTable
      currentRows={viewHallpassData.map((pass) => {
        const { id, firstName, lastName, origin, destination, date, timer } =
          pass;

        const startTime: Date = new Date(date);
        const currentTime: Date = new Date(Date.now());

        const elapsedTime =
          (currentTime.getTime() - startTime.getTime()) / 60000;
        console.log('date', date);
        console.log('currentTime.getTime()', currentTime.getTime());
        console.log('startTime.getTime()', startTime.getTime());
        console.log('elapsedTime', elapsedTime);

        const timerInMS =
          new Date().getTime() + (timer - elapsedTime) * 60 * 1000;
        console.log('timerInMS', timerInMS);

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

export default EnRoute;
