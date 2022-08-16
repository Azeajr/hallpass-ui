import Axios from 'axios';
import { useEffect, useState } from 'react';
import EnRouteTable from '../components/EnRouteTable/EnRouteTable';
import hallPassData from '../data/hallPassData.json';
import { hallPass } from '../common/types';

function EnRoute(props: { dashboardStatus: any }) {
  const { dashboardStatus } = props;

  const [hallpasses, setHallpasses] = useState<hallPass[]>([]);

  useEffect(() => {
    (async () => {
      const data = await Axios.get('http://localhost:3002/api/getHallPasses');
      setHallpasses(data.data);
    })().catch((error) => {
      console.error(error);
    });
  }, []);

  let viewHallpassData: hallPass[] = [];

  if (dashboardStatus.Arrivals) {
    viewHallpassData = hallpasses.filter(
      (pass) => pass.destination === 'Zea, A.'
    );
  } else if (dashboardStatus.Departures) {
    viewHallpassData = hallpasses.filter((pass) => pass.origin === 'Zea, A.');
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

export default EnRoute;
