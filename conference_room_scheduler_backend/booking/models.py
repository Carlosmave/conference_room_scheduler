from django.db import models


class Booking(models.Model):
    name = models.CharField(max_length=250, blank=False, null=False)
    start_date_time = models.DateTimeField(
        blank=False, null=False, unique=True
    )
    end_date_time = models.DateTimeField(blank=False, null=False, unique=True)

    class Meta:
        verbose_name = "Booking"
        verbose_name_plural = "Bookings"
        ordering = ["-id"]

    def __str__(self):
        return self.name
