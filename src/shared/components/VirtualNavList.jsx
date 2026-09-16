import { List } from 'react-window';
import { NavRow } from './NavRow';

export function VirtualNavList({ items, styles, rowHeight, renderItem, renderPath }) {

  return (
    <List rowComponent={NavRow} rowCount={items.length} rowHeight={rowHeight || 25} rowProps={{items, renderItem, customStyles:styles, renderPath}}/>
  );
};