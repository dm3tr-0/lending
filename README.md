# lending

## Описание проекта
Веб-приложение мини-лендинг

🌐 **Демо**: [https://dm3tr0lending.pythonanywhere.com/](https://dm3tr0lending.pythonanywhere.com/)

📋 **ТЗ**: [Паспорт проекта](https://github.com/user-attachments/files/19212442/-25391.pdf)

## 🚀 Возможности
- Выбор шаблона сайта
- Редактирование шаблона и экспорт в zip
- Интуитивно понятный веб-интерфейс

## 🛠 Установка

### Клонирование репозитория
```bash
git clone https://github.com/dm3tr-0/lending.git
cd lending
```

### Создание виртуального окружения
```bash
python -m venv venv
source venv/bin/activate  # Для Windows: venv\Scripts\activate
```

### Установка зависимостей
```bash
pip install -r requirements.txt
```

### 🖥 Запуск приложения
```bash
flask run  #либо просто через python main.py
```

## 📂 Структура проекта
```bash
lending/
│── main.py                  # Главный файл Flask
│── static/                 # Статические файлы (CSS, JS, изображения)
│   ├── css/
│   ├── js/
│── templates/              # HTML-шаблоны
│   ├── editor.html         # Страница редактора
│   ├── index.html          # Главная страница (выбор шаблона)
│── saved_sites/            # Сохраненные версии сайтов (перед скачиванием)
│── requirements.txt        # Список зависимостей
│── README.md               # Документация
```

## 🔑 Основные библиотеки
<p> -Flask: Веб-фреймворк</p>
