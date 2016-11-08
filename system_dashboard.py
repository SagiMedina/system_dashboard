# coding:utf-8
from __future__ import unicode_literals
import json
import os
import time
import psutil
from flask import Flask, render_template
from flask_cors import CORS, cross_origin

app = Flask(__name__, static_folder='static')

CORS(app)   # Necessary since API is running locally

PERIOD = 1  # 1 sec


@cross_origin()
@app.route('/')
def multiple_routes():
    return render_template('index.html')


@cross_origin()
@app.route('/system_data')
def system_data():

    io_data_start = psutil.net_io_counters()

    time.sleep(PERIOD)

    cpu_data = psutil.cpu_percent(interval=None)
    ram_data = psutil.virtual_memory()
    disk_data = psutil.disk_usage('/')
    user_data = psutil.users()
    io_data = psutil.net_io_counters()

    try:
        user_name = user_data[0].name
    except IndexError:
        user_name = 'root'

    data = {
        'cpu': {
            'percent': cpu_data
        },
        'ram': {
            'percent': ram_data.percent,
            'total': ram_data.total >> 20,
            'used': ram_data.total - ram_data.available >> 20
        },
        'disk': {
            'total': disk_data.total >> 30,
            'used': disk_data.used >> 30,
        },
        'user': {
            'name': user_name
        },
        'io': {
            'sent_bytes_sec': (io_data.bytes_sent - io_data_start.bytes_sent),
            'received_bytes_sec': (io_data.bytes_recv - io_data_start.bytes_recv)
        }
    }

    return json.dumps(data)

if __name__ == "__main__":
    PORT = int(os.getenv('PORT', 5002))
    HOST = '0.0.0.0'
    print("System Dashboard up at http://localhost:"+str(PORT))
    app.run(host=HOST, port=PORT, threaded=True)
