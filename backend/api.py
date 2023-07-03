from database import Database
import os
from flask import request
from ai_functions import transcribe, generate_questions
import json


SUCCESS = "success"
REASON = "reason"
DATA = "data"
CURR_YEAR = 2023
CURR_SEMESTER = 2
UPLOAD_DIRECTORY = "./videos"
QUESTIONS_FILE = "./questions.json"
# "comp4702-2023-2/lesson2"

REGISTER_FIELDS = ["id", "firstname", "surname", "password", "email"]


class API:
    def __init__(self, db: Database) -> None:
        self.db = db

    def parse_response(self, request_method, request_body, path) -> str:
        """
        Process the request and return the result.
        :param args: The arguments passed to the API.
        :return: The result of the request.
        """
        _path = path.split("/")

        # json {success: bool, reason: str}
        # path = [auth, ]
        print(_path)
        if _path[0] == "auth" and request_method == "POST":
            res = self.handle_login_request(request_body)
            return res
        if _path[0] == "courses" and request_method == "GET":
            return self.get_courses(request_body)
        if _path[0] == "register" and request_method == "POST":
            return self.register(request_body)
        if _path[0] == "availableCourses" and request_method == "GET":
            return self.get_available_courses(request_body)
        if _path[0] == "currentlyEnrolled" and request_method == "GET":
            return self.get_currently_enrolled(request_body)
        if _path[0] == "enrol" and request_method == "POST":
            return self.handle_enrol(request_body)
        if _path[0] == "unenrol" and request_method == "POST":
            return self.unenrol(request_body)
        if _path[0] == "profile" and request_method == "GET":
            return self.get_profile(request_body)
        if _path[0] == "getLessons" and request_method == "GET":
            return self.get_lesson_info(request_body)
        if _path[0] == "lessonData" and request_method == "GET":
            return self.get_lesson_data(request_body)
        if _path[0] == "coordinatorCourses" and request_method == "GET":
            return self.coordinator_courses(request_body)

        # 2 End points, 1) of_id -> lessonNum, date, blurb
        # of_id -> lesson_name, lesson_id, lesson_date
        # of_id, lesson_num -> video_fp, transcript, questions_json
        print(_path[0])

        return {SUCCESS: False, REASON: "Undefined behaviour"}

    def handle_login_request(self, request_body):
        # Checks if id and password fields are in request
        if not ("id" in request_body and "password" in request_body):
            return {SUCCESS: False, REASON: "Missing id or password."}

        try:
            id = int(request_body["id"])
        except ValueError:
            return {SUCCESS: False, REASON: "Invalid id type when converting to integer datatype."}
        password = request_body["password"]

        query = f"SELECT password FROM Users WHERE id == {id}"
        print(query)
        res = self.db.query(query)

        # expected res = [(password)]
        if (not res) or (len(res) != 1):
            return {SUCCESS: False, REASON: "This account is not registered."}

        if password != res[0][0]:
            return {SUCCESS: False, REASON: "Incorrect password."}

        return {SUCCESS: True}

    def register(self, request_body):
        # Checks all fields are found in request
        for field in REGISTER_FIELDS:
            if field not in request_body:
                return {SUCCESS: False, REASON: f"Missing {field} in request."}

        id, fname, sname, password, email = request_body["id"], request_body["firstname"], request_body["surname"], \
            request_body["password"], request_body["email"]

        if not self.student_in_db(id):
            return {SUCCESS: False, REASON: "Student is already registered."}

        self.db.add(
            f'''INSERT INTO Users VALUES({id}, '{fname}', '{sname}', '{password}', '{email}')''', save=True)
        return {SUCCESS: True}

    def handle_enrol(self, request_body):
        fields = ["student_id", "course_name", "year", "semester"]
        for field in fields:
            if field not in request_body:
                return {SUCCESS: False, REASON: "Missing {field} field in request."}

        try:
            student_id = int(request_body["student_id"])
            year = int(request_body["year"])
            semester =  int(request_body["semester"])
        except ValueError:
            return {SUCCESS: False, REASON: "Student or Org id not of integer form."}


        query = f"""
        SELECT Offerings.id
        FROM Offerings
        JOIN Courses ON Offerings.course_id = Courses.id
        WHERE Offerings.year = {year} AND Offerings.semester = {semester} AND Courses.name = "{request_body.get("course_name")}"
        """
        print(query)
        res = self.db.query(query)
        print(f"res = {res}")

        if (not res) or (len(res) != 1) or res == [()]:
            return {SUCCESS: False, REASON: "Year and semester does not uniquely make an offering id."}

        [(offering_id,)] = res
        print(f"{student_id}, {offering_id}.")
        return self.enrol(student_id, offering_id)


    def enrol(self, student_id, offering_id):
        if not self.student_in_db(student_id):
            return {SUCCESS: False, REASON: "Student id not found in database."}

        if not self.offering_in_db(offering_id):
            return {SUCCESS: False, REASON: "Offering id not found in database."}

        if self.is_enrolled(student_id, offering_id):
            return {SUCCESS: False, REASON: "Student is already enrolled."}

        self.db.add(
            f'''INSERT INTO Enrolments VALUES({student_id}, {offering_id})''', save=True)
        return {SUCCESS: True}

    def student_in_db(self, student_id):
        res = self.db.query(
            f"""SELECT id FROM Users WHERE {student_id} == id""")
        return res and res[0]

    def offering_in_db(self, offering_id):
        res = self.db.query(
            f"""SELECT id FROM Offerings WHERE {offering_id} == id""")
        return res and res[0]

    def is_enrolled(self, student_id, offering_id):
        res = self.db.query(
            f"""SELECT * FROM Enrolments WHERE {student_id} == student_id AND {offering_id} == offering_id""")
        return res and res[0]

    def unenrol(self, request_body):
        # Checks if id and password fields are in request
        if not ("student_id" in request_body and "offering_id" in request_body):
            return {SUCCESS: False, REASON: "Missing student or offering id"}

        try:
            student_id = int(request_body["student_id"])
            offering_id = int(request_body["offering_id"])
        except ValueError:
            return {SUCCESS: False, REASON: "Student or Org id not of integer form."}

        if not self.student_in_db(student_id):
            return {SUCCESS: False, REASON: "Student id not found in database."}

        if not self.offering_in_db(offering_id):
            return {SUCCESS: False, REASON: "Offering id not found in database."}

        if not self.is_enrolled(student_id, offering_id):
            return {SUCCESS: False, REASON: "Student is not enrolled"}

        self.db.query(
            f'''DELETE FROM Enrolments WHERE {student_id} == student_id AND {offering_id} == offering_id''')
        return {SUCCESS: True}

    def get_courses(self, request_body):
        # res = self.db.query(f"SELECT Offerings.year, Offerings.semester, Courses.name, Coordinators.firstname, Coordinators.lastname FROM Enrolments \
        #     JOIN Users ON Enrolments.student_id=Users.id \
        #     JOIN Offerings on Offerings.id=Enrolments.offering_id \
        #     JOIN Courses on Courses.id=Offerings.course_id \
        #     JOIN Coordinators on Coordinators.id=Offerings.coordinator_id \
        #     WHERE Enrolments.student_id={request_body['student_id']}")

        if "student_id" not in request_body:
            return {SUCCESS: False, REASON: "Missing student_id field."}

        res = self.db.query(f"""
                            SELECT Offerings.year, Offerings.semester,
            (SELECT Users.fname FROM Users WHERE Users.id=Offerings.coordinator_id AND Users.role>=50) as coordinator_firstname,
            (SELECT Users.sname FROM Users WHERE Users.id=Offerings.coordinator_id AND Users.role>=50) as coordinator_lastname
            FROM Enrolments
            JOIN Offerings on Offerings.id=Enrolments.offering_id
            JOIN Users ON Enrolments.student_id=Users.id
            WHERE Enrolments.student_id={request_body['student_id']}
        """)

        result = list()
        col_names = ["year", "semester", "coordinator_firstname", "coordinator_lastname"]
        for row in res:
            result.append(dict(zip(col_names, row)))

        return {SUCCESS: True, DATA: result}

    def get_available_courses(self, request_body):
        if "student_id" not in request_body:
            return {SUCCESS: False, REASON: "student_id not found in the request."}

        try:
            id = int(request_body["student_id"])
        except ValueError:
            return {SUCCESS: False, REASON: "student_id not of integer form."}

        query = f"""
        SELECT Courses.name, Courses.desc, Offerings.year, Offerings.semester, Offerings.id,
        (SELECT Users.fname FROM Users WHERE Users.id=Offerings.coordinator_id AND Users.role>=50) as coordinator_firstname,
	    (SELECT Users.sname FROM Users WHERE Users.id=Offerings.coordinator_id AND Users.role>=50) as coordinator_lastname,
        Organisations.name as OrganisationName
        FROM Offerings
        JOIN Courses ON Offerings.course_id=Courses.id
        JOIN Organisations ON Organisations.id=Courses.org_id
        WHERE ((Offerings.year = {CURR_YEAR} AND Offerings.semester >= {CURR_SEMESTER}) OR Offerings.year > {CURR_YEAR}) AND Offerings.id NOT IN (
	        SELECT Enrolments.offering_id
	        FROM Enrolments
	        WHERE {id} == Enrolments.student_id
        )
        """
        res = self.db.query(query)
        print(res)

        """
        [
            {
                course_name: Arya,

            },
            {

            }
        ]
        """

        col = ["course_name", "description", "year", "semester", "offering_id",
               "coordinator_firstname", "coordinator_lastname", "organisation_name"]
        _res = list()
        for row in res:
            _res.append(dict(zip(col, row)))
        return {SUCCESS: True, DATA: _res}

    def upload_video(self, request_files):
        """Upload a file."""
        file_name = request_files["video"].filename

        # save video to file
        with open(os.path.join(UPLOAD_DIRECTORY, file_name), "wb") as fp:
            fp.write(request_files["video"].read())

        transcript = transcribe(os.path.join(UPLOAD_DIRECTORY, file_name))

        # save transcript to file
        with open(os.path.join(UPLOAD_DIRECTORY, file_name + ".txt"), "w") as fp:
            fp.write(transcript)

        # generate questions
        questions = generate_questions(transcript)

        return {SUCCESS: True, "data": {"questions": questions, "transcript": transcript}}
        # with open(os.path.join(UPLOAD_DIRECTORY, path), "wb") as fp:
        #     fp.write(request_files["file"].read())
        # return {SUCCESS: True}

    def get_currently_enrolled(self, request_body):
        print(request_body)
        if "student_id" not in request_body:
            return {SUCCESS: False, REASON: "ID not found in the request."}

        try:
            id = int(request_body["student_id"])
        except ValueError:
            return {SUCCESS: False, REASON: "ID not of integer form."}

        print(f"Student id = {id}")

        if not self.student_in_db(id):
            return {SUCCESS: False, REASON: "Student id not found in database."}

        res = self.db.query(f"""
            SELECT
                (SELECT Users.fname FROM Users WHERE Users.id=Offerings.coordinator_id AND Users.role>=50) as Coordinator_fname,
	            (SELECT Users.sname FROM Users WHERE Users.id=Offerings.coordinator_id AND Users.role>=50) as Coordinator_sname,
                Courses.name, Courses.desc, Offerings.id FROM Enrolments
            JOIN Offerings ON Enrolments.offering_id=Offerings.id
            JOIN Courses ON Offerings.course_id=Courses.id
            WHERE Enrolments.student_id={id} AND year={CURR_YEAR} AND semester={CURR_SEMESTER}""")

        cols = ["coordinator_firstname", "coordinator_lastname",
                "course_name", "course_desc", "offering_id"]
        _res = list()
        for row in res:
            print(f"cols = {cols}, row = {row}, adding = {dict(zip(cols, row))}")
            _res.append(dict(zip(cols, row)))
        return {SUCCESS: True, DATA: _res}

    def get_profile(self, request_body):
        if not "student_id" in request_body:
            return {SUCCESS: False, REASON: "Missing student id"}

        res = self.db.query(
            f"SELECT fname, sname, email FROM Users WHERE id={request_body['student_id']}")

        if len(res) != 1:
            return {SUCCESS: False, REASON: "Student id not found in database."}

        cols = ["firstname", "lastname", "email", "phone"]
        return {SUCCESS: True, "data": dict(zip(cols, res[0]))}

    def get_lesson_info(self, request_body):
        if not "offering_id" in request_body:
            return {SUCCESS: False, REASON: "offering_id field not in request"}

        try:
            id = request_body.get('offering_id')
        except ValueError:
            return {SUCCESS: False, REASON: "ID not of integer form."}

        query = f"""
        SELECT Lessons.blurb, Lessons.lesson_num, Lessons.date
        FROM Lessons
        WHERE offering_id = {id}
        """
        res = self.db.query(query)

        data = [{"blurb": desc, "lesson_num": num, "date": date} for (desc, num, date) in res]
        return {SUCCESS: True, DATA: data}

    def get_lesson_data(self, request_body):
        """
        http://localhost:5000/api/lessonData?offering_id=1&lesson_num=1

        {
            SUCCESS = bool
            output = {
                "date": date,
                "video_fp": fp,
                "blurb": blurb,
                "questions": questions
        }
        """
        for field in  ["offering_id", "lesson_num"]:
            if field not in request_body:
                return {SUCCESS: False, REASON: f"{field} field not in request"}

        try:
            offering_id = int(request_body.get('offering_id'))
            lesson_id = int(request_body.get('lesson_num'))
        except ValueError:
            return {SUCCESS: False, REASON: "Offering or lesson ID not of integer form."}

        # Gets JSONbackend/static/COMP4702-2023-2/lesson2/questions.json

        query = f"""
        SELECT Lessons.fp, Lessons.date, Lessons.blurb
        FROM Lessons
        WHERE {offering_id} = offering_id AND {lesson_id} = lesson_num
        """
        res = self.db.query(query)
        # Query = [(lesson_data, lesson_fp)]
        [(fp, date, blurb)] = res
        path = f"{os.path.dirname(__file__)}/static/{fp[2:-1]}/questions.json"
        questions = json.load(open(path))

        output = {
            "date": date,
            "video_fp": fp,
            "blurb": blurb,
            "questions": questions
        }
        return {SUCCESS: True, DATA: output}

    def coordinator_courses(self, request_body):
        if "coordinator_id" not in request_body:
            return {SUCCESS: False, REASON: "coordinator_id field not in request"}

        try:
            id = int(request_body.get('coordinator_id'))
        except ValueError:
            {SUCCESS: False, REASON: "coordinator_id not of integer form."}


        if not self.student_in_db(id):
            {SUCCESS: False, REASON: "coordinator_id not found as a user."}

        query = f"""
        SELECT Offerings.id, Courses.name, Courses.desc
        FROM Offerings
        JOIN Courses ON Courses.id = Offerings.id
        WHERE Offerings.coordinator_id = {id}
        """
        res = self.db.query(query)

        data = [{"offering_id": id, "course_name": course_name, "desc": desc} for (id, course_name, desc) in res]
        return {SUCCESS: True, DATA: data}

    # coordinatir =>
    # {
    #     data:
    #         [
    #             {
    #                 offering_id
    #                 course_name
    #             }
    #         ]
    #
    # }