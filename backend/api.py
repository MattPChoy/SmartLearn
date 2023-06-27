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
            return self.handle_get_courses(request_body)

        return {SUCCESS: False, REASON: "Undefined behaviour"}

    def handle_login_request(self, request_body):
        # Checks if id and password fields are in request
        if not ("id" in request_body and "password" in request_body):
            return {SUCCESS: False, REASON: "Missing id or password."}

        id = request_body["id"]
        password = request_body["password"]

        query = f"SELECT password FROM Users WHERE id == {id}"
        res = self.db.query(query)
        
        # expected res = [(password)]
        if (not res) or (len(res) != 1):
            return {SUCCESS: False, REASON: "This account is not registered."}

        if password != res[0][0]:
            return {SUCCESS: False, REASON: "Incorrect password."}

        return {SUCCESS: True}

    def handle_get_courses(self, request_body):
        if not ("student_id" in request_body):
            return {SUCCESS: False, REASON: "Missing id."}
        
        id = request_body["student_id"]
        query = f"SELECT * FROM enrolments WHERE student_id == {id}"
        res = self.db.query(query)

        if len(res) == 0:
            return {SUCCESS: False, REASON: "Student id not found in enrolments table."}

        columns = self.db.get_column_names("enrolments")
        print(res)
        result = list()
        for row in res:
            result.append(dict(zip(columns, row)))
        return {SUCCESS: True, "data": result}
    
