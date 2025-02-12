from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.shortcuts import redirect
from django.urls import include, path, re_path
from django.views.static import serve
from rest_framework import routers

from booking.urls import router as booking_router

router = routers.DefaultRouter()
router.registry.extend(booking_router.registry)

urlpatterns = [
    path("", lambda req: redirect("api/")),
    path("api/", include(router.urls)),
    path("api/booking/", include("booking.urls")),
    path("admin/", admin.site.urls),
    path("api-auth/", include("rest_framework.urls")),
    re_path(
        r"^static/(?P<path>.*)$",
        serve,
        {"document_root": settings.STATIC_ROOT},
    ),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
