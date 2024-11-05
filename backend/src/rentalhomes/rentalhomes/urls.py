from django.contrib import admin
from django.urls import path,include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path("api/v1/auth/",include("api.v1.auth_user.urls")),
    path("api/v1/web/",include("api.v1.web.urls")),
    path("api/v1/houses/",include("api.v1.houses.urls")),
    path("api/v1/house/",include("api.v1.connect.urls")),
    path("api/v1/profile/",include("api.v1.profile.urls")),
    path("api/v1/messenger/",include("api.v1.messenger.urls")),
]


if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)
