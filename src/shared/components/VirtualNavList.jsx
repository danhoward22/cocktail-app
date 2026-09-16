import { List } from 'react-window';
import { NavRow } from './NavRow';

export function VirtualNavList({ items, rowClassName, rowHeight, renderItem, renderPath, disableLinks = false }) {

  return (
    <List rowComponent={NavRow} rowCount={items.length} rowHeight={rowHeight || 25}
      rowProps={{items, renderItem, className:rowClassName, renderPath, disableLinks}}
    />
  )
}