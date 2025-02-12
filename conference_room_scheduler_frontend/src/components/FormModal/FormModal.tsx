import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { useEffect, useState } from 'react';
import { BookingForm } from '../../components/BookingForm';
import Swal from 'sweetalert2';
import { IFormModal } from '../../interfaces/components';
import './FormModal.scss';

export const FormModal = (props: IFormModal) => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  useEffect(() => {
    if (formSubmitted) {
      Swal.fire({
        title: 'Booking succesfully saved',
        text: 'Your booking is now confirmed',
        icon: 'success',
        timer: 1500,
        showConfirmButton: false,
      });
      props.toggle();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formSubmitted]);
  return (
    <>
      <Modal
        isOpen={props.isOpen}
        toggle={props.toggle}
        centered={true}
        className="modal-dialog modal-xl"
      >
        <div>
          <ModalHeader className="modal-background">
            <div
              className="media-modal__content__close"
              role="button"
              tabIndex={0}
              onKeyDown={props.toggle}
              onClick={props.toggle}
            >
              <i className="bi bi-x"></i>
            </div>
            <div>Create Booking</div>
          </ModalHeader>
          <ModalBody className="modal-background">
            <BookingForm
              setFormSubmitted={setFormSubmitted}
              editData={props.editData}
            />
          </ModalBody>
        </div>
      </Modal>
    </>
  );
};
