# app.py
from flask import Flask, request, redirect, url_for
import mysql.connector
from werkzeug.security import generate_password_hash

app = Flask(__name__)

# Configure MySQL database connection
db_config = {
    'user': 'Lead',           # Use your MySQL username
    'password': 'Cdog2772!',  # Replace with your MySQL password
    'host': 'localhost',
    'database': 'user_data'
}

def save_to_database(data):
    """Save form data to MySQL database."""
    conn = None
    cursor = None
    try:
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor()
        sql = ("INSERT INTO professionals (username, reg_no, email, mobile_number, password) "
               "VALUES (%s, %s, %s, %s, %s)")
        hashed_password = generate_password_hash(data['password'])  # Hash password before saving
        values = (data['username'], data['reg_no'], data['email'], data['mobile_number'], hashed_password)
        cursor.execute(sql, values)
        conn.commit()
    except mysql.connector.Error as err:
        print("Error: {}".format(err))
    finally:
        if cursor is not None:
            cursor.close()
        if conn is not None:
            conn.close()


@app.route('/submit_form', methods=['POST'])
def submit_form():
    """Handle form submission."""
    # Capture form data
    data = {
        'username': request.form.get('cname'),
        'reg_no': request.form.get('regno'),
        'email': request.form.get('mail'),
        'mobile_number': request.form.get('pno'),
        'password': request.form.get('pwd1')
    }
    save_to_database(data)
    return redirect(url_for('thank_you'))

@app.route('/')
def main_page():
    """Thank you page after form submission."""
    return "<h1>Thank you for signing up!</h1>"

if __name__ == '__main__':
    app.run(debug=True)
