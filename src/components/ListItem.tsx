interface ListItemProps {
  label: string;
  value: string;
}

const ListItem = ({ label, value }: ListItemProps) => (
  <li>
    <strong className="font-semibold">{label}:</strong> {value}
  </li>
);

export default ListItem;
