from flask import Flask, render_template, request, jsonify, send_file
import os
import shutil

app = Flask(__name__)

TEMPLATES_DIR = "static/templates"
SAVED_SITES_DIR = "saved_sites"

# Создаём папку для сохранённых сайтов, если её нет
os.makedirs(SAVED_SITES_DIR, exist_ok=True)

@app.route("/")
def index():
    templates = os.listdir(TEMPLATES_DIR)
    return render_template("index.html", templates=templates)

@app.route("/editor/<template_name>")
def editor(template_name):
    return render_template("editor.html", template_name=template_name)

@app.route("/save", methods=["POST"])
def save():
    data = request.json
    template_name = data.get("site_name")
    html_content = data.get("html")
    css_content = data.get("css", "")

    if not template_name or not html_content:
        return jsonify({"message": "Ошибка: пустые данные!"}), 400

    save_path = os.path.join(SAVED_SITES_DIR, template_name)
    os.makedirs(save_path, exist_ok=True)

    html_file = os.path.join(save_path, "index.html")
    css_file = os.path.join(save_path, "style.css")

    try:
        # Убираем редакторские стили (обводку)
        html_content = html_content.replace('outline: 2px solid blue;', '')
        html_content = html_content.replace('outline: 1px dashed red;', '')
        html_content = html_content.replace('outline: 1px dashed blue;', '')

        with open(html_file, "w", encoding="utf-8") as f:
            f.write(html_content)

        if css_content:
            with open(css_file, "w", encoding="utf-8") as f:
                f.write(css_content)

        return jsonify({"message": "Сайт сохранён!"})
    except Exception as e:
        return jsonify({"message": f"Ошибка сохранения: {str(e)}"}), 500

@app.route("/download/<template_name>")
def download(template_name):
    save_path = os.path.join(SAVED_SITES_DIR, template_name)
    zip_path = f"{template_name}.zip"

    if not os.path.exists(save_path):
        return jsonify({"message": "Ошибка: сайт не найден!"}), 404

    try:
        shutil.make_archive(template_name, "zip", save_path)
        return send_file(zip_path, as_attachment=True)
    except Exception as e:
        return jsonify({"message": f"Ошибка скачивания: {str(e)}"}), 500

if __name__ == "__main__":
    app.run(debug=True)
