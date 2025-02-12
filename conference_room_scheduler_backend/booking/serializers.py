from rest_framework import serializers

from booking.models import Booking


class BookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = "__all__"

    def to_representation(self, instance):
        representation = super(BookingSerializer, self).to_representation(
            instance
        )
        representation["start_date_time"] = ":".join(
            representation["start_date_time"].split(":")[:2]
        )
        representation["end_date_time"] = ":".join(
            representation["end_date_time"].split(":")[:2]
        )
        return representation
