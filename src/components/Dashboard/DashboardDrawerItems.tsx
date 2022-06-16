import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

function DashboardDrawerItems(props: {
  items: { title: string; icon: any; onClick: any; disabled: boolean }[];
}) {
  const { items } = props;

  return (
    <div>
      {items.map((item) => (
        <ListItem
          button
          key={item.title}
          onClick={item.onClick}
          disabled={item.disabled}
        >
          <ListItemIcon sx={{ pointerEvents: 'none' }}>
            {item.icon}
          </ListItemIcon>
          <ListItemText primary={item.title} />
        </ListItem>
      ))}
    </div>
  );
}

export default DashboardDrawerItems;
