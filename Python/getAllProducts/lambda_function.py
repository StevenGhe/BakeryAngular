import mysql.connector
import json
import datetime 

# Function to connect to MySQL DB
def connect_to_db():
    try:
        connection = mysql.connector.connect(
            host='bakery2.c1wm68sgk2d2.eu-central-1.rds.amazonaws.com',
            user='admin',
            password='rUt3ULv2xI',
            database='initial_name_bakery2'
        )
        return connection
    except mysql.connector.Error as e:
        print("MySQL DB error:", e)
        raise

# Lambda handler function
def lambda_handler(event, context):
    try:
        # Connect to MySQL DB
        connection = connect_to_db()

        # Create a cursor
        cursor = connection.cursor(dictionary=True)

        # Execute the query to select products and their linked categories
        query = """
            SELECT p.id, p.product_name, p.price, p.description, p.photo, pc.category_name, p.photo_small, p.discount, p.allergies, p.creation_date
            FROM product p
            JOIN product_category pc ON p.category_id = pc.id
        """
        cursor.execute(query)

        # Fetch all rows
        rows = cursor.fetchall()

        # Close cursor and connection
        cursor.close()
        connection.close()

        # Convert results to JSON format
        result = []
        for row in rows:
            row['discount'] = row['discount'] or "0"
            row['price'] = row['price'] or "0"
            
            product = {
                "id": row['id'],
                "product_name": row['product_name'],
                "price": json.dumps(float(row['price'])),
                "description": row['description'],
                "imageUrl": row['photo'],
                "smallImageUrl": row['photo_small'],
                "category_name": row['category_name'],
                "discount": json.dumps(float(row['discount'])),
                "allergies": row['allergies'],
                "creationDate": row['creation_date'].strftime("%Y-%m-%d") 
            }
            result.append(product)

        # Return JSON response
        return {
            "statusCode": 200,
            "body": json.dumps(result)
        }

    except Exception as e:
        print("Error:", str(e))
        return {
            "statusCode": 500,
            "body": json.dumps({"error": "Internal Server Error"})
        }
