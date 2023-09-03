from flask import Flask, render_template
from models import Lecture
from dummy import lecture_list

app = Flask(__name__)

lectures = lecture_list


@app.get('/')
def index():
    for lecture in lectures:
        print(lecture)
    return render_template("index.html", lectures = lectures, end_time = 22)



app.run("0.0.0.0", debug=True)
