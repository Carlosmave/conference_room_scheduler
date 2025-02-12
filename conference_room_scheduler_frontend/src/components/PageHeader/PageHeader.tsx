import './PageHeader.scss';
import { IPageHeader } from '../../interfaces/components';

export const PageHeader = ({ title }: IPageHeader) => {
  return (
    <div className="page-header">
      <h2 className="media-h2">{title}</h2>
    </div>
  );
};
