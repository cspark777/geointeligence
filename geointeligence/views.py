from django.shortcuts import render, redirect
from django.http import HttpResponseRedirect
from django.contrib import messages
from django.http import StreamingHttpResponse
from wsgiref.util import FileWrapper
from .models import Topic, Indicator, Communa

import json
import csv
import io
import zipfile

# Create your views here.

def index(request):    
    return render(request,'geointeligence/index.html',{})

def dashboard(request):
    topics = Topic.objects.order_by('-frequency')[0:10]    

    topic_name = []
    topic_frequency = []

    for t in topics:
        topic_name.append(t.topic)
        topic_frequency.append(t.frequency)

    topic_name_json = json.dumps(topic_name)
    topic_fre_json = json.dumps(topic_frequency)

    indicator = Indicator.objects.first()
    indicator_data = [indicator.indicator_01, indicator.indicator_02, indicator.indicator_03]

    communas = Communa.objects.all().order_by("-id")

    context = {'topic_name': topic_name_json, 'topic_frequency': topic_fre_json, 'indicators': indicator_data, 'communas': communas}

    print(context)

    return render(request,'geointeligence/dashboard.html', context)

header_data = {
    "communa": "communa",        
}

def get_communa_csv_files(communas):
    csv_files = []
        
    for c in communas:
        mem_file = io.StringIO()
        writer = csv.DictWriter(
            mem_file, fieldnames=header_data.keys()
        )
        writer.writerow(header_data)

        '''
        make csv file body

        '''           
            
        mem_file.seek(0)
            
        csv_files.append(mem_file)
            
    return csv_files

def communa_download(request):
    if request.method == 'POST':
        communas = request.POST.getlist('communas[]')
        print("-------------------------", communas)

        csv_files = get_communa_csv_files(communas)

        print(csv_files)

        temp_file = io.BytesIO()
        with zipfile.ZipFile(
             temp_file, "w", zipfile.ZIP_DEFLATED
        ) as temp_file_opened:            
            for i in range(len(communas)):                 
                temp_file_opened.writestr(
                    f"{communas[i]}.csv",
                    csv_files[i].getvalue()
                )

        temp_file.seek(0)
        
        # put them to streaming content response 
        # within zip content_type
        response = StreamingHttpResponse(
            FileWrapper(temp_file),
            content_type="application/zip",
        )

        response['Content-Disposition'] = 'attachment;filename=communa.zip'
        return response

    else:        
        return redirect('/dashboard')

