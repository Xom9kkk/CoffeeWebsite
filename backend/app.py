from flask import Flask, jsonify
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
CORS(app)

DB_PATH = "DB/menu.db"

def get_db():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

@app.route("/api/menu")
def get_menu():
    db = get_db()
    items = db.execute("SELECT * FROM products").fetchall()
    db.close()
    return jsonify([dict(i) for i in items])

if __name__ == "__main__":
    app.run(debug=True)
