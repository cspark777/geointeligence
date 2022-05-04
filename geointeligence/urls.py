from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('dashboard', views.dashboard, name='dashboard'),
    path('communa_download', views.communa_download, name='communa_download'),
    path('export_data', views.export_data, name='export_data'),
]