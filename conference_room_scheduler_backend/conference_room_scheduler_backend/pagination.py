import math

from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response

DEFAULT_PAGE = 1
DEFAULT_PAGE_SIZE = 10


class CustomPagination(PageNumberPagination):
    page = DEFAULT_PAGE
    page_size = DEFAULT_PAGE_SIZE
    page_size_query_param = "page_size"

    def get_paginated_response(self, data):
        return Response(
            {
                "next": self.get_next_link(),
                "previous": self.get_previous_link(),
                "count": self.page.paginator.count,
                "current_page": int(
                    self.request.GET.get("page", DEFAULT_PAGE)
                ),
                "total_pages": math.ceil(
                    int(self.page.paginator.count)
                    / int(self.request.GET.get("page_size", self.page_size))
                ),
                "page_size": int(
                    self.request.GET.get("page_size", self.page_size)
                ),
                "results": data,
            }
        )
