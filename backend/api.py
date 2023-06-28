from database import Database

SUCCESS = "success"
REASON = "reason"


class API:
    def __init__(self, db: Database) -> None:
        self.db = db

    def parse_response(self, request_method, request_body, path) -> str:
        """
        Process the request and return the result.
        :param args: The arguments passed to the API.
        :return: The result of the request.
        """
        path = path.split("/")

        # json {success: bool, reason: str}
        # path = [auth, ]
        if path[0] == "auth" and request_method == "POST":
            return self.handle_login_request(request_body)
        if path[0] == "courses" and request_method == "GET":
            return self.get_courses(request_body)
        if path[0] == "register" and request_method == "POST":
            return self.register(request_body)
        if path[0] == "enrol" and request_method == "POST":
            return self.enrol(request_body)
        if path[0] == "unenrol" and request_method == "POST":
            return self.unenrol(request_body)

        return {SUCCESS: False, REASON: "Undefined behaviour"}

    def handle_login_request(self, request_body):
        # Checks if id and password fields are in request
        if not ("id" in request_body and "password" in request_body):
            return {SUCCESS: False, REASON: "Missing id or password."}

        id = int(request_body["id"])
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

    def enrol(self, request_body):
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

        if self.is_enrolled(student_id, offering_id):
            return {SUCCESS: False, REASON: "Student is already enrolled."}

        self.db.add(f'''INSERT INTO Enrolments VALUES({student_id}, {offering_id})''', save=True)
        return {SUCCESS: True}


    def student_in_db(self, student_id):
        res = self.db.query(f"""SELECT id FROM Users WHERE {student_id} == id""")
        return res and res[0]

    def offering_in_db(self, offering_id):
        res = self.db.query(f"""SELECT id FROM Offerings WHERE {offering_id} == id""")
        return res and res[0]

    def is_enrolled(self, student_id, offering_id):
        res = self.db.query(f"""SELECT * FROM Enrolments WHERE {student_id} == student_id AND {offering_id} == offering_id""")
        return res and res[0][0]

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

        self.db.query(f'''DELETE FROM Enrolments WHERE {student_id} == student_id AND {offering_id} == offering_id''')
        return {SUCCESS: True}


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





