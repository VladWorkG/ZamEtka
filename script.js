
let notes = JSON.parse(localStorage.getItem('notes')) || [];
function getRandomColor() {
    let colors = ["white", "red", "blue", "yellow", "pink", "green"];
    let i = Math.round(Math.random() * (colors.length - 1) + 1);
    return colors[i - 1]; // Генератор цветов
}

function displayNotes() {

    
    const notesList = document.getElementById('notes-list');
    notesList.innerHTML = ''; // Очистка списка при первом запуске

    const noteInput = document.createElement('div');
    noteInput.id = 'note-input';
    noteInput.classList.add('fixed-note');
    noteInput.innerHTML = '<div><span>+</span></div>';
    notesList.appendChild(noteInput); // Создание кнопки добавления

    notes.forEach((note, index) => {
        const newNote = document.createElement('div');
        newNote.classList.add('note');
        newNote.classList.add(note.color); // Загрузка цвета

        const noteContent = document.createElement('div');
        noteContent.classList.add('note-content');
        noteContent.setAttribute('contenteditable', 'true');
        noteContent.innerText = note.content;
        
        const deleteZone = document.createElement('div');
        deleteZone.classList.add('deleteZone');
        const deleteButton = document.createElement('div');
        deleteButton.innerText = 'Delete';
        deleteButton.classList.add('delete-button');
        deleteButton.classList.add('delete');
        deleteZone.appendChild(deleteButton); // Создание кнопки удаления
        
        deleteButton.addEventListener('click', function() {
            notes.splice(index, 1);
            localStorage.setItem('notes', JSON.stringify(notes));
            displayNotes();
        });  // Функция удаления заметки

        newNote.appendChild(noteContent);
        newNote.appendChild(deleteZone);
        newNote.appendChild(deleteButton);
        notesList.insertBefore(newNote, noteInput); // Сохранение кнопки удаления

        noteContent.addEventListener('input', (event) => {
            const content = noteContent.innerText;  // Отслеживание написания текста
            console.log("Текущий контент: ", content);
            console.log(note);
            
            let index = notes.indexOf(note)
            note.content = content;
            notes[index] = note

            localStorage.setItem('notes', JSON.stringify(notes));

        });
    });

    document.getElementById('note-input').addEventListener('click', function() {
        console.log("gay");
        const newNote = {
            content: "To do: ",
            color: getRandomColor(),
        };   // Добавление новой заметки
    
        notes.push(newNote);
        localStorage.setItem('notes', JSON.stringify(notes));
        displayNotes();
    });

}
    
displayNotes();

