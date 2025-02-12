import { FormModal, LoadingSpinner, PageHeader } from '../../components';
import { Table, Button } from 'reactstrap';
import {
  useGetBookingsQuery,
  useDeleteBookingMutation,
} from '../../app/services/bookingServerApi';
import { Fragment, useState } from 'react';
import Swal from 'sweetalert2';
import errorIcon from '../../assets/error.svg';
import noDataIcon from '../../assets/nodata.svg';
import { IBooking } from '../../interfaces/apis';
import './Home.scss';

export const Home = () => {
  const [currentSearchParams, setCurrentSearchParams] = useState({ page: 1 });
  const changePage = (value: number) => {
    const new_obj = {
      page: currentSearchParams.page + value,
    };
    setCurrentSearchParams(new_obj);
  };
  const [openFormModal, setOpenFormModal] = useState(false);
  const [editData, setEditData] = useState<IBooking | null>(null);
  const toggleFormModal = () => {
    setOpenFormModal(!openFormModal);
    if (openFormModal) {
      setEditData(null);
    }
  };

  const editBooking = (item: IBooking) => {
    setEditData(item);
    toggleFormModal();
  };

  const toggleDeleteModal = (item: IBooking) => {
    Swal.fire({
      title: 'Are you sure you want to delete this booking?',
      text: "You won't be able to revert this",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteBooking(item.id).then(function (result: any) {
          if (result && result.data) {
            Swal.fire({
              title: 'Deleted!',
              text: 'Your booking has been deleted.',
              icon: 'success',
            });
          }
        });
      }
    });
  };

  const { data, isLoading, isFetching, isError } =
    useGetBookingsQuery(currentSearchParams);
  const [deleteBooking] = useDeleteBookingMutation();

  const renderPaginationButtons = () => {
    if (data) {
      if (data.totalPages === 1) {
        return null;
      } else if (data.currentPage < data.totalPages && data.currentPage > 1) {
        return (
          <Fragment>
            <Button color={'primary'} onClick={() => changePage(-1)}>
              Previous Page
            </Button>
            <Button color={'primary'} onClick={() => changePage(1)}>
              Next Page
            </Button>
          </Fragment>
        );
      } else if (data.currentPage < data.totalPages) {
        return (
          <Button color={'primary'} onClick={() => changePage(1)}>
            Next Page
          </Button>
        );
      } else if (data.currentPage === data.totalPages) {
        return (
          <Button color={'primary'} onClick={() => changePage(-1)}>
            Previous Page
          </Button>
        );
      }
    }
  };

  const processDateTime = (dateTime: string) => {
    const dateTimeParts = dateTime.split('T');
    const dateParts = dateTimeParts[0].split('-');
    return `${dateParts[2]}/${dateParts[1]}/${dateParts[0]} ${dateTimeParts[1]}`;
  };

  return (
    <>
      <PageHeader title={'Bookings'} />
      <div className={'create-booking-button-container'}>
        <Button
          onClick={toggleFormModal}
          className={'create-booking-button'}
          color={'success'}
        >
          Create Booking
        </Button>
      </div>
      <FormModal
        isOpen={openFormModal}
        toggle={toggleFormModal}
        editData={editData}
      />
      <div className="container">
        {isLoading || isFetching ? (
          <div className="list-no-item-single">
            <LoadingSpinner />
          </div>
        ) : isError && !data?.results ? (
          <div className="list-no-item-single">
            <img src={errorIcon} alt="error-icon" />
            <p>{'An error ocurred while retrieving the data'}</p>
          </div>
        ) : data?.results.length === 0 ? (
          <div className="list-no-item-single">
            <img src={noDataIcon} alt="no-item-icon" />
            <p>{'No Bookings'}</p>
          </div>
        ) : (
          <Fragment>
            <Table borderless dark responsive hover>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Start Date/Time</th>
                  <th>End Date/Time</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {data &&
                  data.results.length > 0 &&
                  data?.results?.map((item: any, index: number) => (
                    <tr key={index}>
                      <th scope="row" className="table-row">
                        {item.name}
                      </th>
                      <td className="table-row">
                        {processDateTime(item.startDateTime)}
                      </td>
                      <td className="table-row">
                        {processDateTime(item.endDateTime)}
                      </td>
                      <td className="table-row">
                        <div className="table-buttons">
                          <Button
                            color={'warning'}
                            onClick={() => editBooking(item)}
                          >
                            Edit
                          </Button>
                          <Button
                            color={'danger'}
                            onClick={() => toggleDeleteModal(item)}
                          >
                            Delete
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>

            <div className="pagination-buttons">
              {renderPaginationButtons()}
            </div>
          </Fragment>
        )}
      </div>
    </>
  );
};
