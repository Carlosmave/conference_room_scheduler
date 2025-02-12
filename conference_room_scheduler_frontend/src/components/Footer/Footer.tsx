import './Footer.scss';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <div className="media-footer">
      <div className="media-footer__content detail-container">
        <div className="media-footer__content__logo">
          <div className="media-logo-footer">
            <Link className="media-a" to="/">
              Conference Room Scheduler
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
