import Axios from 'axios';
import { useEffect, useState } from 'react';
import EnRouteTable from '../components/EnRouteTable/EnRouteTable';
import { hallPass } from '../common/types';

function Hallway() {
  const [hallpasses, setHallpasses] = useState<hallPass[]>([]);

  useEffect(() => {
    (async () => {
      const data = await Axios.get('http://localhost:3002/api/getHallPasses');
      setHallpasses(data.data);
    })().catch((error) => {
      console.error(error);
    });
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
