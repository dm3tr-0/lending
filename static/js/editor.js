let editorFrame = document.getElementById("editorFrame");
let history = [];
let lastSelected = null;
let templateName = editorFrame.getAttribute("data-template");   // Получаем имя шаблона
// Загружаем шаблон и включаем редактирование после загрузки фрейма
editorFrame.onload = function () {
    let doc = editorFrame.contentDocument;
    enableEditing(doc);
};



// Включаем редактирование
function enableEditing(doc) {
    doc.body.querySelectorAll("*").forEach(el => {
        if (["SCRIPT", "STYLE", "LINK", "META"].includes(el.tagName)) return;

        el.addEventListener("click", e => {
            e.stopPropagation();
            if (lastSelected) lastSelected.style.outline = "";
            lastSelected = el;
            lastSelected.style.outline = "2px solid blue";
            lastSelected.setAttribute("data-editor-outline", "true");
        });
    });

    doc.body.contentEditable = "true";
}
// Применяем CSS из шаблона
function applyCSS(doc) {
    let link = doc.createElement("link");
    link.rel = "stylesheet";
    link.href = `/static/templates/${templateName}/style.css`;
    doc.head.appendChild(link);
}

// Сохраняем текущее состояние перед изменением
function saveState() {
    let doc = editorFrame.contentDocument.documentElement.cloneNode(true);
    history.push(doc);
    if (history.length > 10) history.shift();
}

// Отмена последнего действия
function undo() {
    if (history.length > 0) {
        let lastState = history.pop();
        editorFrame.contentDocument.documentElement.replaceWith(lastState);
        enableEditing(editorFrame.contentDocument);
    }
}

// Добавление текста
function addTextBlock() {
    let doc = editorFrame.contentDocument;
    let newText = doc.createElement("p");
    newText.textContent = "Новый текстовый блок";
    newText.style.outline = "1px dashed red";
    saveState();
    doc.body.appendChild(newText);
}

// Добавление изображения
document.getElementById("imageUpload").addEventListener("change", function (event) {
    let file = event.target.files[0];
    if (!file) return;

    let reader = new FileReader();
    reader.onload = function (e) {
        let doc = editorFrame.contentDocument;
        if (lastSelected && lastSelected.tagName === "IMG") {
            saveState();
            lastSelected.src = e.target.result;
        } else {
            let img = doc.createElement("img");
            img.src = e.target.result;
            img.style.outline = "1px dashed blue";
            saveState();
            doc.body.appendChild(img);
        }
    };
    reader.readAsDataURL(file);
});

// Дублирование элемента
function duplicateElement() {
    if (lastSelected) {
        saveState();
        let clone = lastSelected.cloneNode(true);
        lastSelected.parentNode.insertBefore(clone, lastSelected.nextSibling);
    }
}

// Удаление элемента
function deleteElement() {
    if (lastSelected) {
        saveState();
        lastSelected.remove();
        lastSelected = null;
    }
}

// Перемещение вверх
function moveUp() {
    if (lastSelected && lastSelected.previousElementSibling) {
        saveState();
        lastSelected.parentNode.insertBefore(lastSelected, lastSelected.previousElementSibling);
    }
}

// Перемещение вниз
function moveDown() {
    if (lastSelected && lastSelected.nextElementSibling) {
        saveState();
        lastSelected.parentNode.insertBefore(lastSelected.nextElementSibling, lastSelected);
    }
}

// Функция получения CSS из фрейма
function getCSS(doc) {
    let css = "";
    let stylesheets = doc.styleSheets;

    for (let sheet of stylesheets) {
        try {
            let rules = sheet.cssRules || sheet.rules;
            for (let rule of rules) {
                css += rule.cssText + "\n";
            }
        } catch (e) {
            console.warn("Ошибка доступа к CSS:", e);
        }
    }
    return css;
}

// Сохранение сайта
function saveSite() {
    let doc = editorFrame.contentDocument;
    let html = doc.documentElement.outerHTML.trim();
    let css = getCSS(doc).trim();

    doc.body.removeAttribute("contenteditable");
    doc.querySelectorAll("[style*='outline: blue solid 2px']").forEach(el => {
        // Проверяем, был ли этот outline добавлен редактором
        if (el.getAttribute("data-editor-outline") === "true") {
            el.style.outline = ""; // Очищаем только добавленный редактором outline
        }
    });

    if (!html) {
        alert("Ошибка: HTML не получен!");
        return;
    }

    fetch("/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ site_name: templateName, html: html, css: css })
    })
    .then(res => res.json())
    .then(data => alert(data.message))
    .catch(err => console.error("Ошибка сохранения:", err));
}

// Скачивание ZIP
function downloadSite() {
    window.location.href = `/download/${templateName}`;
}

// Привязка кнопок
document.getElementById("saveBtn").addEventListener("click", saveSite);
document.getElementById("downloadBtn").addEventListener("click", downloadSite);