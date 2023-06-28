from database import Database
import os
from flask import request

SUCCESS = "success"
REASON = "reason"
CURR_YEAR = 2023
CURR_SEMESTER = 2
UPLOAD_DIRECTORY = "./videos"


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
        if _path[0] == "auth" and request_method == "POST":
            res = self.handle_login_request(request_body)
            print(res)
            return res
        if _path[0] == "courses" and request_method == "GET":
            return self.get_courses(request_body)
        if _path[0] == "register" and request_method == "POST":
            return self.register(request_body)
        if _path[0] == "availableCourses" and request_method == "GET":
            return self.get_available_courses()
        if _path[0] == "currentlyEnrolled" and request_method == "GET":
            return self.get_currently_enrolled(request_body)
        if _path[0] == "uploadVideo" and request_method == "POST":
            return self.upload_video(request_body, path)
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
        id, fname, sname, password, email = request_body["id"], request_body["firstname"], request_body["surname"], \
            request_body["password"], request_body["email"]
        self.db.add(f'''INSERT INTO Users VALUES({id}, '{fname}', '{sname}', '{password}', '{email}')''', save=True)

    def get_courses(self, request_body):
        res = self.db.query(f"SELECT Offerings.year, Offerings.semester, Courses.name, Coordinators.firstname, Coordinators.lastname FROM Enrolments \
            JOIN Users ON Enrolments.student_id=Users.id \
            JOIN Offerings on Offerings.id=Enrolments.offering_id \
            JOIN Courses on Courses.id=Offerings.course_id \
            JOIN Coordinators on Coordinators.id=Offerings.coordinator_id \
            WHERE Enrolments.student_id={request_body['student_id']}")
        
        result = list()
        col_names = ["year", "semester", "course_name", "coordinator_firstname", "coordinator_lastname"]
        for row in res:
            result.append(dict(zip(col_names, row)))

        return {SUCCESS: True, "data": result}
    
    def get_available_courses(self):
        query=f"""
            SELECT Courses.name, Offerings.year, Offerings.semester, Coordinators.firstname as CoordinatorFirstName, 
        Coordinators.lastname as CoordinatorLastName, Organisations.name as OrganisationName
        FROM Offerings
        JOIN Courses ON Offerings.course_id=Courses.id
        JOIN Coordinators ON Coordinators.id=Offerings.coordinator_id
        JOIN Organisations ON Organisations.id=Courses.org_id
        WHERE year={CURR_YEAR} AND semester={CURR_SEMESTER}"""
        print(query)
        res = self.db.query(query)
        print(res)

        col = ["course_name", "year", "semester", "coordinator_firstname", "coordinator_lastname", "organisation_name"]
        _res = list()
        for row in res:
            _res.append(dict(zip(col, row)))
        return _res

    def upload_video(self, request_body, path):
        """Upload a file."""

        if "/" in path:
            # Return 400 BAD REQUEST
            return {SUCCESS: False, REASON: "no slashes allowed in the filename"}
        with open(os.path.join(UPLOAD_DIRECTORY, path), "wb") as fp:
            fp.write(request.data)
        return {SUCCESS: True}

    def get_currently_enrolled(self, request_body):

        if not ("student_id" in request_body):
            return {SUCCESS: False, REASON: "Missing student_id."}
        id = request_body["student_id"]
        res = self.db.query(f"""
            SELECT Coordinators.firstname, Coordinators.lastname, Courses.name, Courses.desc FROM Enrolments 
            JOIN Offerings ON Enrolments.offering_id=Offerings.id
            JOIN Coordinators ON Coordinators.id=Offerings.coordinator_id
            JOIN Courses ON Offerings.course_id=Courses.id
            WHERE Enrolments.student_id={id} AND year={CURR_YEAR} AND semester={CURR_SEMESTER}""")
        
        cols = ["coordinator_firstname", "coordinator_lastname", "course_name", "course_desc"]
        _res = list()
        for row in res:
            _res.append(dict(zip(cols, row)))
        return {SUCCESS:True, "data":_res}