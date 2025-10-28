import mysql.connector

def get_table_schema(table_name):

    connection = None
    try:

        connection = mysql.connector.connect(
            host="10.150.3.70", # 10.150.0.113 
            database="ccaas2023",
            user="ccaasdev",
            password="ccAAsdev@435"
        )

        cursor = connection.cursor(dictionary=True)
        cursor.execute(f"SHOW FULL COLUMNS FROM {table_name};")
        columns = cursor.fetchall()

        if not columns:
            print(f"Table '{table_name}' not found or empty.")
            return None

        schema_str = f"{table_name}("
        column_parts = []
        for col in columns:
            col_name = col["Field"]
            col_type = col["Type"]
            key = col["Key"]
            extra = " PRIMARY KEY" if key == "PRI" else ""
            column_parts.append(f"{col_name} {col_type}{extra}")
        schema_str += ", ".join(column_parts) + ")"

        print("Table Schema:")
        print(schema_str)
        return schema_str

    except Exception as e:
        print(f"Error fetching schema for '{table_name}': {e}")
        return None

    finally:
        if connection and connection.is_connected():
            cursor.close()
            connection.close()



if __name__ == "__main__":
    table_name = input("Enter table name: ").strip()
    get_table_schema(table_name)
