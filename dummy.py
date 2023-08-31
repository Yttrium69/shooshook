from models import Lecture

lecture_list = [
    Lecture(name="lecture1", subject="시스템 프로그래밍", id=1, room="하이테크 001", color="blue", position_facs={
                       "x_factor": "tue", "y_factor": "0", "length_factor": "3"}),
    Lecture(name="lecture1", subject="시스템 프로그래밍", id=2, room="하이테크 222", color="blue", position_facs={
                       "x_factor": "thr", "y_factor": "0", "length_factor": "3"}),
    Lecture("lecture2", subject="리눅스 프로그래밍", id=3, room="하이테크 222", color="blue", position_facs={
                       "x_factor": "mon", "y_factor": "3", "length_factor": "4"}),
    Lecture("lecture3", subject="리눅스 프로그래밍", id=4, room="하이테크 324", color="purple", position_facs={
                       "x_factor": "tue", "y_factor": "3", "length_factor": "4"}),
    Lecture("lecture4", subject="피지컬 컴퓨팅", id=5, room="서호관 121", color="purple", position_facs={
                       "x_factor": "thr", "y_factor": "3", "length_factor": "6"}),
    Lecture("lecture5", subject="컴퓨터기반 선형대수", id=6, room="하이테크 001", color="blue", position_facs={
                       "x_factor": "mon", "y_factor": "9", "length_factor": "3"}),
    Lecture("lecture5", subject="컴퓨터기반 선형대수", id=7, room="하이테크 001", color="blue", position_facs={
                       "x_factor": "tue", "y_factor": "9", "length_factor": "3"}),
    Lecture("lecture6", subject="프로네시스 세미나", id="8", room="60주년 108", color="green", position_facs={
                       "x_factor": "tue", "y_factor": "12", "length_factor": "4"}),
                       Lecture("lecture6", subject="프로네시스 세미나", id="8", room="60주년 108", color="green", position_facs={
                       "x_factor": "tue", "y_factor": "12", "length_factor": "4"}),
    Lecture("lecture7", subject="감성 UI디자인", id="9", room="5남 132", color="coral", position_facs={
                       "x_factor": "thr", "y_factor": "9", "length_factor": "6"}),
]