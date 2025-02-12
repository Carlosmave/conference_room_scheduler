import { IBooking } from '../apis';

export default interface IBookingFormComponent {
  setFormSubmitted: (value: boolean) => void;
  editData: IBooking | null;
}
