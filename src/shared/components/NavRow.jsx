import { Link, useLocation } from 'react-router';

export function NavRow({ index, style, items, renderItem, className, renderPath, disableLinks = false }) {
  const item = items[index]
  const location = useLocation()
  const path = renderPath(item.id)
  const isActive = location.pathname === path
  const content = renderItem ? renderItem(item) : item.name

  return (
    <div style={style}>
      {!disableLinks && <Link
        to={path} 
        className={`${className} ${isActive ? 'active' : ''}`}
      >
        {content}
      </Link>}
      {disableLinks && <div className={className}>
        {content}
      </div>}
    </div>
  );
};
