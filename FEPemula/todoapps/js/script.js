// Variabel todos ini berisikan data-data Todo user. 
const todos = [];

// Variabel RENDER_EVENT bertujuan untuk mendefinisikan Custom Event dengan nama 'render-todo'.
// Custom event ini digunakan sebagai patokan dasar ketika ada perubahan data pada variabel 
// todos, seperti perpindahan todo (dari incomplete menjadi complete, dan sebaliknya), 
// menambah todo, maupun menghapus todo. 
const RENDER_EVENT = 'render-todo';

// Fungsi generateId() berfungsi untuk menghasilkan id pada setiap item todo. 
// Dengan memanfaatkan +new Date() untuk mendapatkan timestamp pada JavaScript.
function generateId() {
    return +new Date();
}

// Fungsi generateTodoObject() untuk membuat object baru dari data yang sudah diinputkan
function generateTodoObject(id, task, timestamp, isCompleted) {
    return {
        id,
        task,
        timestamp,
        isCompleted
    }
}

const SAVED_EVENT = 'saved-todo';
const STORAGE_KEY = 'TODO_APPS';

function isStorageExist() /* boolean */ {
    if (typeof (Storage) === undefined) {
        alert('Browser kamu tidak mendukung local storage');
        return false;
    }
    return true;
}

// function saveData digunakan untuk menyimpan data pada array todos jika ada perubahan, 
// maka diharapkan perubahan tersebut dapat tersimpan pada storage secara langsung.
function saveData() {
    if (isStorageExist()) {
        const parsed = JSON.stringify(todos);
        localStorage.setItem(STORAGE_KEY, parsed);
        document.dispatchEvent(new Event(SAVED_EVENT));
    }
}

// event listener untuk debugging apakah perubahan data 
// bisa secara sukses memperbarui data pada storage,
document.addEventListener(SAVED_EVENT, function () {
    console.log(localStorage.getItem(STORAGE_KEY));
});

// buat function addTodo untuk menambahkan todo
function addTodo() {
    // mengambil data inputan dengan id title dan date dari html
    const textTodo = document.getElementById('title').value;
    const timestamp = document.getElementById('date').value;
   
    // Setelah nilai input user disimpan dalam variabel textTodo dan timestamp, 
    // kita akan membuat sebuah object dari todo dengan memanggil helper generateTodoObject() 
    // untuk membuat object baru. Kemudian, object tersebut disimpan pada array todos 
    // menggunakan metode push().
    const generatedID = generateId();
    const todoObject = generateTodoObject(generatedID, textTodo, timestamp, false);
    todos.push(todoObject);
   
    // kita panggil sebuah custom event RENDER_EVENT menggunakan method dispatchEvent().
    // Custom event ini diterapkan untuk me-render data yang telah disimpan pada array todos.
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
}

function loadDataFromStorage() {
    const serializedData = localStorage.getItem(STORAGE_KEY);
    let data = JSON.parse(serializedData);
   
    if (data !== null) {
      for (const todo of data) {
        todos.push(todo);
      }
    }
   
    document.dispatchEvent(new Event(RENDER_EVENT));
}

document.addEventListener('DOMContentLoaded', function () {
    const submitForm = document.getElementById('form');
    submitForm.addEventListener('submit', function (event) {
      event.preventDefault();
      addTodo();
    });

    if (isStorageExist()) {
        loadDataFromStorage();
    }
});

// Kode di atas adalah sebuah listener yang akan menjalankan kode yang ada didalamnya ketika 
// event DOMContentLoaded dibangkitkan alias ketika semua elemen HTML sudah dimuat menjadi DOM 
// dengan baik.

// Lalu mempersiapkan elemen form untuk menangani event submit, di mana aksi tersebut dibungkus 
// dan dijalankan oleh fungsi addTodo(), untuk menambahkan todo baru.
// method preventDefault() digunakan sebelum function AddTodo supaya data yang disimpan 
// dalam memory akan terjaga dengan baik dan tidak akan hilang ketika dimuat ulang.

// fungsi dibawah digunakan untuk mencari todo dengan ID yang sesuai pada array todos. 
function findTodo(todoId) {
    for (const todoItem of todos) {
      if (todoItem.id === todoId) {
        return todoItem;
      }
    }
    return null;
}

// function addTaskToCompleted simpelnya adalah merubah state isCompleted dari sebelumnya false 
// ke true, kemudian panggil event RENDER_EVENT untuk memperbarui data yang ditampilkan.
function addTaskToCompleted (todoId) {
    const todoTarget = findTodo(todoId);
   
    if (todoTarget == null) return;
   
    todoTarget.isCompleted = true;
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
}

//  fungsi dibawah digunakan untuk mencari todo berdasarkan index todo 
// dengan ID yang sesuai pada array todos. 
function findTodoIndex(todoId) {
    for (const index in todos) {
      if (todos[index].id === todoId) {
        return index;
      }
    }
   
    return -1;
  }

// function removeTaskFromCompleted menghapus Todo berdasarkan index 
// yang didapatkan dari pencarian Todo dengan menggunakan findTodoIndex()
function removeTaskFromCompleted(todoId) {
    const todoTarget = findTodoIndex(todoId);
   
    if (todoTarget === -1) return;
   
    todos.splice(todoTarget, 1);
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
}

// function undoTaskFromCompleted merupakan kebalikan dari function addTaskToCompleted,
// simpelnya adalah merubah state isCompleted dari sebelumnya true menjadi false,
// kemudian panggil event RENDER_EVENT untuk memperbarui data yang ditampilkan.
function undoTaskFromCompleted(todoId) {
    const todoTarget = findTodo(todoId);
   
    if (todoTarget == null) return;
   
    todoTarget.isCompleted = false;
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
}

// function makeTodo digunakan untuk menampilkan todo yang telah di submit kedalam elemen html.
function makeTodo(todoObject) {
    // Method createElement() berfungsi untuk membuat objek DOM, yakni elemen HTML. 
    // method classList() berfungsi untuk menambahkan class pada elemen HTML.
    // method setAttribure berfungsi untuk menambahkan attribut pada elemen HTML.
    const textTitle = document.createElement('h2');
    textTitle.innerText = todoObject.task;
   
    const textTimestamp = document.createElement('p');
    textTimestamp.innerText = todoObject.timestamp;
   
    const textContainer = document.createElement('div');
    textContainer.classList.add('inner');
    textContainer.append(textTitle, textTimestamp);
   
    const container = document.createElement('div');
    container.classList.add('item', 'shadow');
    container.append(textContainer);
    container.setAttribute('id', `todo-${todoObject.id}`);
   
    if (todoObject.isCompleted) {
        const undoButton = document.createElement('button');
        undoButton.classList.add('undo-button');
     
        undoButton.addEventListener('click', function () {
            undoTaskFromCompleted(todoObject.id);
        });
    
        const trashButton = document.createElement('button');
        trashButton.classList.add('trash-button');
     
        trashButton.addEventListener('click', function () {
            removeTaskFromCompleted(todoObject.id);
        });
     
        container.append(undoButton, trashButton);
    } else {
        const checkButton = document.createElement('button');
        checkButton.classList.add('check-button');
        
        checkButton.addEventListener('click', function () {
            addTaskToCompleted(todoObject.id);
        });
        
        container.append(checkButton);
    }
    
    return container;
}

// AddEventListener dengan event handler dari custom event RENDER_EVENT 
// untuk mengeksekusi function makeTodo
document.addEventListener(RENDER_EVENT, function () {
    // console.log(todos);
    const uncompletedTODOList = document.getElementById('todos');
    const completedTODOList = document.getElementById('completed-todos');

    // kode dibawah berfungsi memastikan agar container dari todo bersih sebelum diperbarui. 
    uncompletedTODOList.innerHTML = '';
    completedTODOList.innerHTML = '';
    
    // iterasi pada variabel todos untuk mengambil beberapa data todo yang telah tersimpan.
    for (const todoItem of todos) {
        const todoElement = makeTodo(todoItem);
        // menambahkan kondisional kika isCompleted nya masih false, 
        // maka todoItem diappend ke container uncompletedTODOList
        // namun, jika isCompleted nya sudah true,
        // maka todoItem diappend ke container completedTODOList
        if (!todoItem.isCompleted) {
            uncompletedTODOList.append(todoElement);
        } else {
            completedTODOList.append(todoElement);
        }
    }
});



