from flask import Flask, jsonify, request
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
CORS(app)

MENU_DB = "DB/menu.db"
ORDERS_DB = "DB/orders.db"
PRODUCTS_DB = "DB/products.db"


def get_menu_db():
    conn = sqlite3.connect(MENU_DB)
    conn.row_factory = sqlite3.Row
    return conn


def get_orders_db():
    conn = sqlite3.connect(ORDERS_DB)
    conn.row_factory = sqlite3.Row
    return conn


@app.route("/api/menu")
def get_menu():
    db = get_menu_db()
    items = db.execute("SELECT * FROM products").fetchall()
    db.close()
    return jsonify([dict(i) for i in items])


@app.route("/api/orders", methods=["POST"])
def create_order():
    data = request.json

    cart = data.get("cart", [])
    payment = data.get("payment")

    if not cart:
        return jsonify({"success": False, "error": "Cart is empty"}), 400

    total = sum(item["price"] * item["qty"] for item in cart)

    db = get_orders_db()
    cur = db.cursor()

    cur.execute(
        "INSERT INTO orders (total, payment_method) VALUES (?, ?)",
        (total, payment)
    )
    order_id = cur.lastrowid

    for item in cart:
        cur.execute(
            """
            INSERT INTO order_items
            (order_id, product_id, title, price, qty)
            VALUES (?, ?, ?, ?, ?)
            """,
            (
                order_id,
                item["id"],
                item["title"],
                item["price"],
                item["qty"]
            )
        )

    db.commit()
    db.close()

    print(f"NEW ORDER #{order_id}") 

    return jsonify({
        "success": True,
        "order_id": order_id
    })

def get_products():
    conn = sqlite3.connect(PRODUCTS_DB)
    conn.row_factory = sqlite3.Row

    rows = conn.execute("SELECT * FROM products").fetchall()
    conn.close()

    return [dict(row) for row in rows]

@app.route("/api/products")
def products():
    return jsonify(get_products())

if __name__ == "__main__":
    app.run(debug=True)
