import sqlite3


def load_distros_from_db():
    conn = sqlite3.connect('database.db')
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM distributions")
    rows = cursor.fetchall()

    all_distros = [dict(row) for row in rows]
    conn.close()
    return all_distros