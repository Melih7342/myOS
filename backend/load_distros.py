import sqlite3
import os


def load_distros_from_db():
    base_dir = os.path.dirname(os.path.abspath(__file__))
    db_path = os.path.join(base_dir, 'instance', 'database.db')

    conn = sqlite3.connect(db_path)
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()

    try:
        cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
        tables = [t[0] for t in cursor.fetchall()]

        if "distribution" not in tables:
            print("Error: The table doesn't exist in the database")
            return []

        cursor.execute("SELECT * FROM distribution")
        rows = cursor.fetchall()
        return [dict(row) for row in rows]
    except Exception as e:
        print(f"DB Error: {e}")
        return []
    finally:
        conn.close()