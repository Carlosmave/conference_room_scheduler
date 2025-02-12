import { IBooking } from '../apis';

export default interface IFormModal {
  isOpen: boolean;
  toggle: any;
  editData: IBooking | null;
}
