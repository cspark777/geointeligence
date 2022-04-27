import psycopg2
  
import csv

conn = psycopg2.connect(database="geointeligence",
                        user='postgres', password='password', 
                        host='localhost', port='5432'
)
  
conn.autocommit = True
cursor = conn.cursor()
  
file = open("Topics.csv")
csvreader = csv.reader(file)
header = next(csvreader)
print(header)
rows = []

i = 0
postgres_insert_query = """ INSERT INTO topic (topic, frequency, date) VALUES (%s,%s,%s)"""

for row in csvreader:
    record_to_insert = (row[0], row[1], row[2])
    cursor.execute(postgres_insert_query, record_to_insert)
    if i > 9:
        break
    else:
        i = i + 1

  
conn.commit()
conn.close()
file.close()