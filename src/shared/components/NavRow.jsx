import { Link, useLocation } from 'react-router';

export function NavRow({ index, style, items, pathPrefix }) {
  const item = items[index]
  const location = useLocation();
  const path = pathPrefix + item.id
  const isActive = location.pathname === path;

  return (
    <div style={style}>
      <Link 
        to={path} 
        className={`nav-item ${isActive ? 'active' : ''}`}
      >
        {item.name}
      </Link>
    </div>
  );
};