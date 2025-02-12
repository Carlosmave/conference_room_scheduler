import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import {
  Form,
  FormGroup,
  Button,
  Label,
  Input,
  FormFeedback,
  Row,
  Col,
} from 'reactstrap';
import {
  useCreateBookingMutation,
  useUpdateBookingMutation,
} from '../../app/services/bookingServerApi';
import { useState } from 'react';
import Swal from 'sweetalert2';
import { IBookingFormComponent } from '../../interfaces/components';
import { IBookingForm } from '../../interfaces/forms';
import './BookingForm.scss';

export const BookingForm = (props: IBookingFormComponent) => {
  const [dateTimeError, setDateTimeError] = useState<string | null>(null);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IBookingForm>({
    defaultValues: props.editData ?? {},
  });

  const [
    createBooking,
    {
      isLoading: isLoadingCreateBooking,
      isError: isErrorCreateBooking,
      isSuccess: isSuccessCreateBooking,
      error: errorCreateBooking,
    },
  ] = useCreateBookingMutation();

  const [
    updateBooking,
    {
      isLoading: isLoadingUpdateBooking,
      isError: isErrorUpdateBooking,
      isSuccess: isSuccessUpdateBooking,
      error: errorUpdateBooking,
    },
  ] = useUpdateBookingMutation();

  const onSubmit: SubmitHandler<IBookingForm> = (data) => {
    props.setFormSubmitted(false);
    setDateTimeError(null);
    let formError = false;
    if (data.endDateTime < data.startDateTime) {
      setDateTimeError(
        'The end date time must be greater than the start date time',
      );
      formError = true;
    } else if (data.startDateTime === data.endDateTime) {
      setDateTimeError(
        'The start date time and the end date time must be different',
      );
      formError = true;
    }

    if (!formError) {
      if (props.editData) {
        updateBooking(data);
      } else {
        createBooking(data);
      }
    }
  };

  {
    (isLoadingCreateBooking || isLoadingUpdateBooking) &&
      Swal.fire({
        title: 'Loading',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
  }

  {
    (isSuccessCreateBooking || isSuccessUpdateBooking) &&
      props.setFormSubmitted(true);
  }
  {
    (isErrorCreateBooking || isErrorUpdateBooking) &&
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
        confirmButtonColor: 'green',
        didOpen: () => {
          Swal.hideLoading();
        },
        footer:
          (errorCreateBooking as any)?.data?.error ??
          (errorUpdateBooking as any)?.data?.error ??
          'An error ocurred',
      });
  }

  return (
    <div className="big-form-container">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col md={12}>
            <FormGroup>
              <Label for="name">Name *</Label>
              <Controller
                name="name"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Input
                    id="name"
                    placeholder="Enter the booking's name"
                    type="text"
                    invalid={!!errors.name}
                    {...field}
                  />
                )}
              />
              <FormFeedback>{"The booking's name is required"}</FormFeedback>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label for="startDateTime">Start Date/Time *</Label>
              <Controller
                name="startDateTime"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Input
                    id="startDateTime"
                    placeholder="Enter the booking's start date/time"
                    type="datetime-local"
                    invalid={!!errors.startDateTime}
                    {...field}
                  />
                )}
              />
              <FormFeedback>
                {"The booking's start date/time is required"}
              </FormFeedback>
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="endDateTime">End Date/Time *</Label>
              <Controller
                name="endDateTime"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Input
                    id="endDateTime"
                    placeholder="Enter the booking's end date/time"
                    type="datetime-local"
                    invalid={!!errors.endDateTime}
                    {...field}
                  />
                )}
              />
              <FormFeedback>
                {"The booking's end date/time is required"}
              </FormFeedback>
            </FormGroup>
          </Col>
          {dateTimeError && (
            <div className="invalid-message">{dateTimeError}</div>
          )}
        </Row>
        <div className="submit-button">
          <Button
            color={'success'}
            type={'submit'}
            disabled={isLoadingCreateBooking || isLoadingUpdateBooking}
          >
            Submit
          </Button>
        </div>
      </Form>
    </div>
  );
};
