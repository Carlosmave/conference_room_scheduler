import { useRef, useEffect, MutableRefObject } from 'react';
import { Link } from 'react-router-dom';
import './Header.scss';

export const Header = () => {
  const headerRef = useRef() as MutableRefObject<HTMLDivElement>;

  useEffect(() => {
    const shrinkHeader = () => {
      if (
        document.body.scrollTop > 100 ||
        document.documentElement.scrollTop > 100
      ) {
        headerRef.current.classList.add('shrink');
      } else {
        headerRef.current.classList.remove('shrink');
      }
    };
    window.addEventListener('scroll', shrinkHeader);
    return () => {
      window.removeEventListener('scroll', shrinkHeader);
    };
  }, []);

  return (
    <div ref={headerRef} className="media-header">
      <div className="media-header__wrap container">
        <div className="media-logo-header">
          <Link className="media-a" to="/">
            Conference Room Scheduler
          </Link>
        </div>
      </div>
    </div>
  );
};
