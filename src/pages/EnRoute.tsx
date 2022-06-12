import EnRouteTable from '../components/EnRouteTable/EnRouteTable';
import hallPassData from '../data/hallPassData.json';

function EnRoute() {
  return (
    <EnRouteTable
      currentRows={hallPassData.map((hallPass) => {
        const { id, firstName, lastName, destination, date, timer } = hallPass;

        const startTime: Date = new Date(date);
        const currentTime: Date = new Date('2022-06-11T09:53:00Z');
        const elapsedTime =
          (currentTime.getTime() - startTime.getTime()) / 60000;

        return {
          id,
          firstName,
          lastName,
          destination,
          timer: timer - elapsedTime,
        };
      })}
    />
  );
}

export default EnRoute;
