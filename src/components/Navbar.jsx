import React from 'react';
import { Link, useLocation } from 'react-router-dom';



//  BreadCrumb component
const Navbar = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);

  return (
    <div
    className="container"
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: '5px 10px',
        // backgroundColor: '#f8f8f8',
        // boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
      }}
    >
      {/* <Logo name={appName} /> */}
      <ol style={{ display: 'flex', listStyle: 'none', padding: 0, margin: 0 }}>
        <li>
          <Link to="/">Home</Link>
        </li>
        {pathnames.map((name, index) => {
          const routeTo = '/' + pathnames.slice(0, index + 1).join('/');
          const isLast = index === pathnames.length - 1;
          return (
            <li key={index} style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ margin: '0 8px' }}>{'>'}</span>
              {isLast ? (
                <span style={{ color: '#888' }}>{name}</span>
              ) : (
                <Link to={routeTo}>{name}</Link>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
};

export default Navbar;
