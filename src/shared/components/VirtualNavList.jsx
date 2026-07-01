import { List } from 'react-window';
import { NavRow } from './NavRow';

export function VirtualNavList({ items, rowHeight, pathPrefix = "" }) {

  return (
    <List rowComponent={NavRow} rowCount={items.length} rowHeight={rowHeight || 25} rowProps={{items, pathPrefix}}/>
  );
};