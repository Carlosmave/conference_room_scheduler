import json

from rest_framework import status
from rest_framework.test import APITestCase


class BookingTestCase(APITestCase):
    fixtures = ["booking_BookingTestData.json"]

    # Tests if the user can save a booking with
    # the same start and end date time
    def test_same_start_end_date_time(self):
        data = {
            "name": "Test 2",
            "start_date_time": "2025-03-12 05:00:00",
            "end_date_time": "2025-03-12 05:00:00",
        }
        response = self.client.post(
            "/api/booking/bookings/", data, format="json"
        )
        response.render()
        self.assertEqual(
            json.loads(response.content),
            {
                "success": False,
                "error": "The start and end date times can't be the same.",
            },
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    # Tests if the user can save a booking that overlaps
    # with a previously saved booking
    def test_booking_overlap(self):
        data = {
            "name": "Test 2",
            "start_date_time": "2025-03-12 05:30:00",
            "end_date_time": "2025-03-12 06:30:00",
        }
        response = self.client.post(
            "/api/booking/bookings/", data, format="json"
        )
        response.render()
        self.assertEqual(
            json.loads(response.content),
            {
                "success": False,
                "error": (
                    "The booking you are trying to create "
                    "conflicts with an existing one."
                ),
            },
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    # Tests if the user can save a booking with incomplete data
    def test_incomplete_data(self):
        data = {
            "name": "Test 2",
            "start_date_time": "2025-03-12 05:30:00",
        }
        response = self.client.post(
            "/api/booking/bookings/", data, format="json"
        )
        response.render()
        self.assertEqual(
            json.loads(response.content),
            {
                "success": False,
                "error": ("'end_date_time'"),
            },
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    # Tests if the user can save a booking when all the data is correct
    def test_save_booking(self):
        data = {
            "name": "Test 2",
            "start_date_time": "2025-03-12 06:00:00",
            "end_date_time": "2025-03-12 07:30:00",
        }
        response = self.client.post(
            "/api/booking/bookings/", data, format="json"
        )
        response.render()
        self.assertEqual(
            json.loads(response.content)["success"],
            True,
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
