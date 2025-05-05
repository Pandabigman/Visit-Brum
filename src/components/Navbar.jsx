import React from 'react';
import { Link, useLocation } from 'react-router-dom';

// Utility to create a random color
const getRandomColor = () => {
  const colors = ['#FF6B6B', '#6BCB77', '#4D96FF', '#FFD93D', '#6A4C93'];
  return colors[Math.floor(Math.random() * colors.length)];
};

// Generate a simple random logo (circle with initials)
const Logo = ({ name = "BrumGem" }) => {
  const initials = name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  const bgColor = getRandomColor();

  return (
    <div
      style={{
        backgroundColor: bgColor,
        borderRadius: '50%',
        width: '40px',
        height: '40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        fontWeight: 'bold',
        fontSize: '18px',
        marginRight: '10px',
      }}
    >
      {initials}
    </div>
  );
};

//  BreadCrumb component
const Navbar = ({ appName = "Brum Explorer" }) => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);

  return (
    <nav
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: '10px 20px',
        backgroundColor: '#f8f8f8',
        boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
      }}
    >
      <Logo name={appName} />
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
    </nav>
  );
};

export default Navbar;
