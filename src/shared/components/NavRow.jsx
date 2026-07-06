import { Link, useLocation } from 'react-router';

export function NavRow({ index, style, items, renderItem, customStyles, pathPrefix }) {
  const item = items[index]
  const location = useLocation();
  const path = pathPrefix + item.id
  const isActive = location.pathname === path;

  return (
    <div style={style} className={customStyles.row}>
      <Link
        to={path} 
        className={`${customStyles.link} nav-item ${isActive ? 'active' : ''}`}
      >
        {renderItem ? renderItem(item) : item.name}
      </Link>
    </div>
  );
};
