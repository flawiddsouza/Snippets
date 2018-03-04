from flask import Flask, render_template, redirect, g, request
import os
import sqlite3
from datetime import datetime, timezone
import markdown2

app = Flask(__name__)

app.database = 'store.db'
app.database = os.path.join(os.path.dirname(__file__), app.database)
app.debug = True

app.jinja_env.filters['markdown'] = markdown2.markdown

@app.route('/')
def index():
    g.db = connect_db()
    code_snippets = g.db.execute('SELECT * FROM code_snippets ORDER BY updated_at DESC')
    code_snippets = [dict(id=row[0], title=row[1], snippet=row[2], format=row[3], language=row[4], created_at=utc_to_local(row[5]), updated_at=utc_to_local(row[6])) for row in code_snippets.fetchall()]
    command_snippets = g.db.execute('SELECT * FROM command_snippets ORDER BY updated_at DESC')
    command_snippets = [dict(id=row[0], title=row[1], snippet=row[2], format=row[3], platform=row[4], created_at=utc_to_local(row[5]), updated_at=utc_to_local(row[6])) for row in command_snippets.fetchall()]
    g.db.close()
    return render_template('index.html', code_snippets=code_snippets, command_snippets=command_snippets)

@app.route('/add-code-snippet', methods=['POST'])
def add_code_snippet():
    title = request.form.get('title')
    snippet = request.form.get('snippet')
    format = request.form.get('format')
    language = request.form.get('language')
    g.db = connect_db()
    g.db.execute('INSERT into code_snippets(title, snippet, format, language) VALUES(?,?,?,?)', (title, snippet, format, language))
    g.db.commit()
    g.db.close()
    return redirect('/')

@app.route('/add-command-snippet', methods=['POST'])
def add_command_snippet():
    title = request.form.get('title')
    snippet = request.form.get('snippet')
    format = request.form.get('format')
    platform = request.form.get('platform')
    g.db = connect_db()
    g.db.execute('INSERT into command_snippets(title, snippet, format, platform) VALUES(?,?,?,?)', (title, snippet, format, platform))
    g.db.commit()
    g.db.close()
    return redirect('/')

@app.route('/edit-code-snippet', methods=['POST'])
def edit_code_snippet():
    title = request.form.get('title')
    snippet = request.form.get('snippet')
    format = request.form.get('format')
    language = request.form.get('language')
    id = request.form.get('id')
    g.db = connect_db()
    g.db.execute('UPDATE code_snippets SET title=?, snippet=?, format=?, language=?, updated_at=CURRENT_TIMESTAMP WHERE id=?', (title, snippet, format, language, id))
    g.db.commit()
    g.db.close()
    return redirect('/')

@app.route('/edit-command-snippet', methods=['POST'])
def edit_command_snippet():
    title = request.form.get('title')
    snippet = request.form.get('snippet')
    format = request.form.get('format')
    platform = request.form.get('platform')
    id = request.form.get('id')
    g.db = connect_db()
    g.db.execute('UPDATE command_snippets SET title=?, snippet=?, format=?, platform=?, updated_at=CURRENT_TIMESTAMP WHERE id=?', (title, snippet, format, platform, id))
    g.db.commit()
    g.db.close()
    return redirect('/')

@app.route('/delete-code-snippet', methods=['POST'])
def delete_code_snippet():
    id = request.form.get('id')
    g.db = connect_db()
    g.db.execute('DELETE FROM code_snippets WHERE id=?', [id])
    g.db.commit()
    g.db.close()
    return redirect('/')
    
@app.route('/delete-command-snippet', methods=['POST'])
def delete_command_snippet():
    id = request.form.get('id')
    g.db = connect_db()
    g.db.execute('DELETE FROM command_snippets WHERE id=?', [id])
    g.db.commit()
    g.db.close()
    return redirect('/')

def connect_db():
    return sqlite3.connect(app.database)

def utc_to_local(utc_dt):
    utc_dt = datetime.strptime(utc_dt, '%Y-%m-%d %H:%M:%S')
    return utc_dt.replace(tzinfo=timezone.utc).astimezone(tz=None).strftime('%Y-%m-%d %H:%M:%S')

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=9878, threaded=True)