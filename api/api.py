import time
from flask import Flask

app = Flask(__name__)

@app.route('/time', methods=['GET'])
def get_current_time():
    return {'time': time.time()}
