import sqlite3


class Database:
    def __init__(self, filepath="./database.db"):
        """
        Given a filepath to a database, create the data access object (DAO) and save it as a member variable.
        """
        # Error fix -> sqlite3.ProgrammingError: SQLITE objects created in a thread can only be used in the same thread.
        # https://stackoverflow.com/questions/48218065/programmingerror-sqlite-objects-created-in-a-thread-can-only-be-used-in-that-sa
        self.dao = sqlite3.connect(filepath, check_same_thread=False)

    def get_dao(self):
        """
        Return the data access object
        :return: sqlite data access object, instantiated by constructor.
        """
        return self.dao, self.dao.cursor()

    def add(self, query, data=None, save=True):
        """
        Use this method to add data to the database
        :param: query the query to execute
        :data: tuple containing data to add to the database
        :save: whether to save to the database. True by default.
        :return: None
        """
        connection, cursor = self.get_dao()

        if data is None:
            cursor.execute(query)
        else:
            cursor.execute(query, data)
        if save:
            connection.commit()

    def query(self, query):
        """
        Use this method to query the database (obtain data from the database
        :param json: Boolean indicating whether to convert the query result to JSON format.
        :param query: The query to be executed.
        :return: Data returned by the database (as a list-of-tuples)
        """
        connection, cursor = self.get_dao()

        cursor.execute(query)
        return cursor.fetchall()


    def get_column_names(self, table_name):
        res = self.query(f"PRAGMA table_info({table_name});")
        return [i[1] for i in res]
