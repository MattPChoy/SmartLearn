from database import Database


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

        # path = [auth, ]
        if path[0] == "auth" and request_method == "POST":
            handle_login_request()



        return {"success": False, "message": "Undefined behaviour"}

# Handles user trying to authenticate
def handle_login_request():
    pass