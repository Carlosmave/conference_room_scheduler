from rest_framework import routers

from booking.views import BookingViewSet

router = routers.DefaultRouter()
router.register(r"bookings", BookingViewSet, basename="bookings")

urlpatterns = []

urlpatterns += router.urls
