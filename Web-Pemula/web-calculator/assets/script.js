"use strict";
// Nilai dari properti operator dan firstNumber diberikan null dulu 
// karena akan diberikan nilai ketika pengguna melakukan aksi. 

// Properti isWaitForSecondNumber merupakan kondisi di mana kalkulator 
// sedang menunggu pengguna menentukkan angka kedua dalam melakukan perhitungan.

const calculator = {
    displayNumber: '0',
    operator: null,
    firstNumber: null,
    isWaitForSecondNumber: false,
};

// function inputDigit akan memasukkan angka ke dalam nilai displayNumber kalkulator
//  jika displayNumber bernilai ‘0’ di fungsi inputDigit() sehingga angka yang pertama 
// dimasukkan pengguna akan menggantikan keseluruhan nilai displayNumber. 

// Selain itu, lakukan seperti biasanya. 

function inputDigit(digit) {
    if (calculator.displayNumber === '0') {
      calculator.displayNumber = digit;
    } else {
      calculator.displayNumber += digit;
    }
}

// function updateDisplay digunakan untuk mengupdate angka pada layar

function updateDisplay() {
    document.querySelector('#displayNumber').innerText = calculator.displayNumber;
}


// function clear calculator digunakan untuk menjalankan tombol CE yang akan 
// menghilangkana seluruh perhitungan supaya kalkulator kembali ke angka 0 lagi

function clearCalculator() {
    calculator.displayNumber = '0';
    calculator.operator = null;
    calculator.firstNumber = null;
    calculator.isWaitForSecondNumber = false;
}

// Fungsi inverseNumber cukuplah simple. 
// Hanya perlu melakukan perkalian calculator.displayNumber dengan nilai -1. 
// Terkecuali jika displayNumber masih bernilai ‘0’, perkalian tidak akan dilakukan.

function inverseNumber() {
    if (calculator.displayNumber === '0') {
        return;
    }
    calculator.displayNumber = calculator.displayNumber * -1;
}

// HandleOperator digunakan untuk menetapkan sebuah operator, 
// baik itu "+" atau "-" di kalkulator.

// Fungsi membutuhkan satu buah argument, yaitu operator. 
// Nilai operator bersumber dari innerText tombol operator yang menjadi event target. 
// Secara prinsip, fungsi ini bertujuan untuk menyimpan operator dan firstNumber 
// dengan nilai displayNumber saat ini pada object calculator, 
// hanya jika properti isWaitForSecondNumber bernilai false. 

// Namun, jika isWaitForSecondNumber bernilai true, browser akan menampilkan alert 
// dengan pesan “Operator sudah ditetapkan”.

function handleOperator(operator) {
    if (!calculator.isWaitForSecondNumber) {
      calculator.operator = operator;
      calculator.isWaitForSecondNumber = true;
      calculator.firstNumber = calculator.displayNumber;
   
      // mengatur ulang nilai display number supaya tombol selanjutnya dimulai dari angka pertama lagi
      calculator.displayNumber = '0';
    } else {
      alert('Operator sudah ditetapkan');
    }
}

// riabel buttons dengan menginisialisasikan nilai seluruh elemen button lalu
// looping nilainya untuk diberikan event click di setiap elemen button-nya.s

const buttons = document.querySelectorAll('.button');
 
for (const button of buttons) {
  button.addEventListener('click', function (event) {
    // mendapatkan objek elemen yang diklik
    const target = event.target;

    // kondisional jika button yang diklik terdapat class clear,
    // maka jalankan fungsi clean calculator dan update displaynya.
    if (target.classList.contains('clear')) {
        clearCalculator();
        updateDisplay();
        return;
    }

    if (target.classList.contains('negative')) {
        inverseNumber();
        updateDisplay();
        return;
    }
    if (target.classList.contains('equals')) {
        performCalculation();
        updateDisplay();
        return;
    }
    if (target.classList.contains('operator')) {
        handleOperator(target.innerText);
        return;
    }
 
    inputDigit(target.innerText);
    updateDisplay();
  });
}

// performCalculation digunakan untuk melakukan kalkulasi terhadap 
// nilai - nilai yang terdapat pada objek calculator, 
// sehingga pastikan kalkulator sudah memiliki nilai operator dan firstNumber 
// ketika fungsi ini dijalankan.

function performCalculation() {
    if (calculator.firstNumber == null || calculator.operator == null) {
      alert('Anda belum menetapkan operator');
      return;
    }
   
    let result = 0;
    if (calculator.operator === '+') {
      result = parseInt(calculator.firstNumber) + parseInt(calculator.displayNumber);
    } else {
      result = parseInt(calculator.firstNumber) - parseInt(calculator.displayNumber);
    }

       // objek yang akan dikirimkan sebagai argumen fungsi putHistory()
   const history = {
      firstNumber: calculator.firstNumber,
      secondNumber: calculator.displayNumber,
      operator: calculator.operator,
      result: result
    }
    putHistory(history);
    calculator.displayNumber = result;
    renderHistory();
}

// Catatan:
// Aplikasi kalkulator yang telah kita buat tidak bisa melakukan operasi aritmatika 
// secara berkelanjutan, yaitu melakukan kedua secara langsung tepat setelah 
// operasi pertama selesai. Anda bisa mengembangkannya lebih lanjut untuk meningkatkan 
// kemampuan problem solving yang lebih baik.






