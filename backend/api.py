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
            res = self.handle_login_request(request_body)
            print(res)
            return res

        return {SUCCESS: False, REASON: "Undefined behaviour"}

    def handle_login_request(self, request_body):
        # Checks if id and password fields are in request
        if not ("id" in request_body and "password" in request_body):
            return {SUCCESS: False, REASON: "Missing id or password."}

        id = request_body["id"]
        password = request_body["password"]

        query = f"SELECT password FROM Users WHERE id == {id};"
        res = self.db.query(query)

        # expected res = [(password)]
        if (not res) or (len(res) != 1):
            return {SUCCESS: False, REASON: "This account is not registered."}

        if password != res[0][0]:
            return {SUCCESS: False, REASON: "Incorrect password."}

        return {SUCCESS: True}

    # Fields is fields for user: [id, fname, sname, password, email]
    def add_user(self, fields):
        id, fname, sname, password, email = fields


        self.db.add(f'''INSERT INTO Users VALUES({id}, '{fname}', '{sname}', '{password}', '{email}')''', save=True)


