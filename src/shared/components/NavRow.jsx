import { Link, useLocation } from 'react-router';
import styles from './NavRow.module.css'

export function NavRow({ index, style, items, renderItem, pathPrefix }) {
  const item = items[index]
  const location = useLocation();
  const path = pathPrefix + item.id
  const isActive = location.pathname === path;

  return (
    <div style={style} className={styles.row}>
      <Link 
        to={path} 
        className={`${styles.link} nav-item ${isActive ? 'active' : ''}`}
      >
        {renderItem ? renderItem(item) : item.name}
      </Link>
    </div>
  );
};
