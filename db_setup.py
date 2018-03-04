import sqlite3, os.path

if not os.path.isfile('store.db'):
    with sqlite3.connect('store.db') as connection:
        c = connection.cursor()
        c.execute('''
            CREATE TABLE code_snippets(
                id INTEGER,
                title TEXT,
                snippet TEXT,
                type TEXT,
                language TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                PRIMARY KEY(id)
            )
        ''')
        c.execute('''
            CREATE TABLE command_snippets(
                id INTEGER,
                title TEXT,
                snippet TEXT,
                type TEXT,
                platform TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                PRIMARY KEY(id)
            )
        ''')