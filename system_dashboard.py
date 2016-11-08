# coding:utf-8
from __future__ import unicode_literals

import json
import os
import time
# import logging

import psutil
from flask import Flask, render_template
from flask_cors import CORS, cross_origin

app = Flask(__name__, static_folder='static')

CORS(app)   # Necessary since API is running locally

# Should match the period (in seconds) in Freeboard
PERIOD = 1

# Disable Flask console messages: http://stackoverflow.com/a/18379764
# log = logging.getLogger('werkzeug')
# log.setLevel(logging.ERROR)


@cross_origin()
@app.route('/')
def multiple_routes():
    return render_template('index.html')


@cross_origin()
@app.route('/system_data')
def system_data():

    disk_write_data_start = psutil.disk_io_counters(perdisk=False)
    io_data_start = psutil.net_io_counters()

    # Some metrics are only reported in values since uptime,
    # so sample over a period (in seconds) to get rate.

    time.sleep(PERIOD)

    cpu_data = psutil.cpu_percent(interval=None)
    ram_data = psutil.virtual_memory()
    disk_data = psutil.disk_usage('/')
    user_data = psutil.users()
    io_data = psutil.net_io_counters()

    try:
        user_name = user_data[0].name
    except IndexError:
        user_name = 'No User'

    data = {
        'cpu': {
            'percent': cpu_data
        },
        'ram': {
            'percent': ram_data[2],
            'total': ram_data[0] >> 20,
            'used': ram_data[0] - ram_data[1] >> 20
        },
        'disk': {
            'total': disk_data[0] >> 30,
            'used': disk_data[1] >> 30,
        },
        'user': {
            'name': user_name
        },
        'io': {
            'sent_bytes_sec': (io_data[0] - io_data_start[0]) / PERIOD,
            'received_bytes_sec': (io_data[1] - io_data_start[1]) / PERIOD
        }
    }

    return json.dumps(data)

if __name__ == "__main__":
    PORT = int(os.getenv('PORT', 5002))
    HOST = '0.0.0.0'
    print("System API up at http://localhost:"+str(PORT))
    app.run(host=HOST, port=PORT, threaded=True)
