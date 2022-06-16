import EnRouteTable from '../components/EnRouteTable/EnRouteTable';
import hallPassData from '../data/hallPassData.json';

function EnRoute(props: { dashboardStatus: any }) {
  const { dashboardStatus } = props;
  let viewHallpassData: any[] = [];

  if (dashboardStatus.Arrivals) {
    viewHallpassData = hallPassData.filter(
      (hallPass) => hallPass.destination === 'Zea, A.'
    );
  } else if (dashboardStatus.Departures) {
    viewHallpassData = hallPassData.filter(
      (hallPass) => hallPass.origin === 'Zea, A.'
    );
  }

  return (
    <EnRouteTable
      currentRows={viewHallpassData.map((hallPass) => {
        const { id, firstName, lastName, origin, destination, date, timer } =
          hallPass;

        const startTime: Date = new Date(date);
        const currentTime: Date = new Date('2022-06-11T09:53:00Z');
        const elapsedTime =
          (currentTime.getTime() - startTime.getTime()) / 60000;

        return {
          id,
          firstName,
          lastName,
          origin,
          destination,
          timer: timer - elapsedTime,
        };
      })}
    />
  );
}

export default EnRoute;
