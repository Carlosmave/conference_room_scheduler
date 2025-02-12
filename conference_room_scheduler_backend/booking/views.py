from django.shortcuts import get_object_or_404
from rest_framework import status, viewsets
from rest_framework.response import Response

from booking.models import Booking
from booking.serializers import BookingSerializer


class BookingViewSet(viewsets.ModelViewSet):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer

    def retrieve(self, request, pk=None):
        booking = get_object_or_404(self.queryset, id=pk)
        serializer = self.get_serializer(booking)
        return Response(serializer.data)

    def list(self, request, *args, **kwargs):
        page = self.paginate_queryset(self.queryset)
        serializer = self.get_serializer(page, many=True)
        return self.get_paginated_response(serializer.data)

    def create(self, request, format=None):
        try:
            booking_data = request.data
            if (
                booking_data["start_date_time"]
                == booking_data["end_date_time"]
            ):
                return Response(
                    {
                        "success": False,
                        "error": (
                            "The start and end date "
                            "times can't be the same."
                        ),
                    },
                    status=status.HTTP_400_BAD_REQUEST,
                )
            overlapping_bookings = Booking.objects.filter(
                end_date_time__gt=booking_data["start_date_time"],
                start_date_time__lt=booking_data["end_date_time"],
            )
            if not overlapping_bookings:
                booking = Booking()
                booking.name = booking_data["name"]
                booking.start_date_time = booking_data["start_date_time"]
                booking.end_date_time = booking_data["end_date_time"]
                booking.save()
                return Response(
                    {
                        "success": True,
                        "booking_id": str(booking.id),
                    },
                    status=status.HTTP_201_CREATED,
                )
            else:
                raise Exception(
                    (
                        "The booking you are trying to "
                        "create conflicts with an existing one."
                    )
                )
        except Exception as e:
            content = {"success": False, "error": str(e)}
            return Response(content, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, pk=None):
        try:
            booking_data = request.data
            if (
                booking_data["start_date_time"]
                == booking_data["end_date_time"]
            ):
                return Response(
                    {
                        "success": False,
                        "error": (
                            "The start and end date "
                            "times can't be the same."
                        ),
                    },
                    status=status.HTTP_400_BAD_REQUEST,
                )
            overlapping_bookings = Booking.objects.filter(
                end_date_time__gt=booking_data["start_date_time"],
                start_date_time__lt=booking_data["end_date_time"],
            ).exclude(id=pk)
            if not overlapping_bookings:
                booking = Booking.objects.get(id=pk)
                booking.name = booking_data["name"]
                booking.start_date_time = booking_data["start_date_time"]
                booking.end_date_time = booking_data["end_date_time"]
                booking.save()
                return Response(
                    {
                        "success": True,
                        "booking_id": str(booking.id),
                    },
                    status=status.HTTP_200_OK,
                )
            else:
                raise Exception(
                    (
                        "The booking you are trying to "
                        "update conflicts with an existing one."
                    )
                )
        except Exception as e:
            content = {"success": False, "error": str(e)}
            return Response(content, status=status.HTTP_400_BAD_REQUEST)
