import sqlite3
import os
from datetime import datetime

DATABASE_FOLDER = '/Specialized/backend/prompts/'
DATABASE_FILENAME = 'prompts.db'
DATABASE_PATH = os.path.join(DATABASE_FOLDER, DATABASE_FILENAME)

def get_db_connection():
    conn = sqlite3.connect(DATABASE_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def read_item(data, version_number = None):
    conn = get_db_connection()
    if version_number is None:
        query = f'SELECT {data} FROM items WHERE id = 1 LIMIT 1'
        item = conn.execute(query).fetchone()
        conn.close()
        if item is not None:
            readable_string = ', '.join(map(str, item))
        else:
            return "No data found"
    else:
        query = f'SELECT {data} FROM item_versions WHERE version_number = {version_number} LIMIT 1'
        item = conn.execute(query).fetchone()
        conn.close()
        if item is not None:
            readable_string = ', '.join(map(str, item))
        else:
            return "No data found"
    return readable_string

# USED TO DELETE A VERSION FROM DATABASE
class DeletePrompts:
    def __init__(self, column_name, version_to_delete):
        self.column_name = column_name
        self.version_to_delete = version_to_delete

    def delete_single_entry_by_version_number(self, cursor, version_number, column_name):
        # Delete only one entry where 'age' is not NULL for the specified version number
        cursor.execute(f"DELETE FROM item_versions WHERE id = (SELECT id FROM item_versions WHERE version_number = ? AND {column_name} IS NOT NULL LIMIT 1)", (version_number,))

    def delete_item(self):
        # Connect to the SQLite database
        conn = sqlite3.connect(DATABASE_PATH)
        cursor = conn.cursor()
        # Delete one entry with the specified version number
        self.delete_single_entry_by_version_number(cursor, self.version_to_delete, self.column_name)
        conn.commit()

        # Close the connection
        conn.close()

        return f"Version {self.version_to_delete} has been deleted from the {self.column_name} column."

# USED FOR LOADING NUMBER OF PROMPT VERSIONS
class LoadPrompts:
    def __init__(self, column_name= "age"):
        self.column_name = column_name
    
    def get_max_version_number_for_column(self, cursor, column_name):
        # Find the highest version number for the specified column where it is not null
        cursor.execute(f"SELECT MAX(version_number) FROM item_versions WHERE {column_name} IS NOT NULL")
        max_version = cursor.fetchone()[0]
        return max_version if max_version is not None else 0

    def load_prompts(self):
        # Connect to the SQLite database
        conn = sqlite3.connect(DATABASE_PATH)
        cursor = conn.cursor()

        # Get the max version number for the 'age' column
        max_version = self.get_max_version_number_for_column(cursor, self.column_name)

        # Close the connection
        conn.close()

        return {self.column_name:max_version}

# USED FOR SAVING NEW PROMPTS
class SavePrompts:
    def __init__(self, new_prompt, column_name):
        self.column_name = column_name
        self.new_prompt = new_prompt
        
    def get_next_version_number(self,cursor, column_name):
        # Find the highest version number for the specified column
        cursor.execute(f"SELECT MAX(version_number) FROM item_versions WHERE {column_name} IS NOT NULL")
        max_version = cursor.fetchone()[0]

        # Check if there are any entries for this column
        if max_version is None:
            return 1

        # Find the next available version number
        for version in range(1, max_version + 2):
            cursor.execute(f"SELECT COUNT(*) FROM item_versions WHERE version_number = ? AND {column_name} IS NOT NULL", (version,))
            if cursor.fetchone()[0] == 0:
                return version

        return max_version + 1

    def insert_new_version(self, cursor, column_name, version_number, value):
        # Insert a new entry with the specified version number
        cursor.execute(f"INSERT INTO item_versions (version_number, {column_name}, version_date) VALUES (?, ?, ?)", (version_number, value, datetime.now()))

    def create_versions(self):
        # Connect to the SQLite database
        conn = sqlite3.connect(DATABASE_PATH)
        cursor = conn.cursor()

        # Get the next version number for the 'age' column
        next_version = self.get_next_version_number(cursor, self.column_name)

        # Insert a new entry with the next version number (example value for 'age' is 30)
        self.insert_new_version(cursor, self.column_name, next_version, self.new_prompt)

        # Commit the changes and close the connection
        conn.commit()
        conn.close()

        return "Saved"