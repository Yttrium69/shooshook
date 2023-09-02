

class Lecture:
    name = "None"
    subject = "과목명"
    room = " "
    color = "blue"

    def __init__(self, name, id, subject, room, color, position_facs):
        self.name = name
        self.subject = subject
        self.room = room
        self.color = color
        self.position_facs = position_facs
        self.position_facs['y_factor'] = int(self.position_facs['y_factor'])
        self.position_facs['length_factor'] = int(self.position_facs['length_factor'])
