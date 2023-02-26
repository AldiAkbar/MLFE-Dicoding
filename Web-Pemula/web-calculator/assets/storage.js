// definisikan CACHE_KEY untuk digunakan sebagai \
// key untuk mengakses dan menyimpan data pada localStorage
const CACHE_KEY = "calculation_history";

// fungsi checkForStorage() dengan mengembalikan nilai boolean 
// dari pengecekan fitur Storage pada browser.

// Fungsi ini akan digunakan dalam pengkondisian
// pada fungsi transaksi pada localStorage
function checkForStorage() {
    return typeof(Storage) !== "undefined"
}


// fungsi putHistory digunakan untuk menyimpan riwayat
// perhitungan pada localStorage

// Fungsi tersebut memiliki satu argumen yang merupakan data 
// dari hasil kalkulasi yang nantinya akan dimasukkan ke dalam localStorage.
function putHistory(data) {
    if (checkForStorage()) {
        let historyData = null;
        if (localStorage.getItem(CACHE_KEY) === null) {
            historyData = [];
        } else {
            // JSON.parse() digunakan untuk mengubah nilai string menjadi objek JavaScript.
            // JSON.stringify() merupakan kebalikan dari JSON.parse()
            historyData = JSON.parse(localStorage.getItem(CACHE_KEY));
        }
  
        //  fungsi ini digunakan untuk menambahkan nilai baru pada index awal array
        // sekaligus mengembalikan nilai panjang array setelah ditambahkan dengan nilai baru.
        historyData.unshift(data);
  
        if (historyData.length > 5) {
            // fungsi pop digunakan untuk menghapus nilai index terakhir pada array, 
            // sehingga ukuran array historyData tidak akan pernah lebih dari 5. 
            historyData.pop();
        }
  
        localStorage.setItem(CACHE_KEY, JSON.stringify(historyData));
    }
}

// fugnsi showHistory digunakan untuk mengambil data yang disimpan di localStorage
function showHistory() {
    if (checkForStorage()) {
        return JSON.parse(localStorage.getItem(CACHE_KEY)) || [];
    } else {
        return [];
    }
 }

//  fungsi renderHistory digunakan untuk menampilkan data yang berhasil diambil lewat \
// fungsi showHistory dan menampilkannya kedalam tabel HTML.
function renderHistory() {
    const historyData = showHistory();
    let historyList = document.querySelector("#historyList");
  
  
    // selalu hapus konten HTML pada elemen historyList agar tidak menampilkan data ganda
    historyList.innerHTML = "";
  
  
    for (let history of historyData) {
        let row = document.createElement('tr');
        row.innerHTML = "<td>" + history.firstNumber + "</td>";
        row.innerHTML += "<td>" + history.operator + "</td>";
        row.innerHTML += "<td>" + history.secondNumber + "</td>";
        row.innerHTML += "<td>" + history.result + "</td>";
  
  
        historyList.appendChild(row);
    }
}

renderHistory();