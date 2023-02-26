// Regular function menggunakan keyword 'new', maka nilainya akan menjadi object
// function People(name, age, hobby) {
//     this.name = name;
//     this.age = age;
//     this.hobby = hobby;
// }

// // menambahkan introMyself ke People
// People.prototype.introMyself = function () {
//     // this -> People
//     setTimeout(function() {
//        // this -> ??
//         console.log(`Hello! Nama saya ${this.name}, umur saya ${this.age}.`)
//         console.log(`Hobby saya adalah ${this.hobby}`)
//     }, 300)
// }

// const programmer = new People("John", 18, ["Coding", "Read book", "Ping-pong"]);
// programmer.introMyself();


/* output:
Hello! Nama saya undefined, umur saya undefined.
Hobby saya adalah undefined
*/


// Dengan arrow function hal ini bisa diatasi
function People(name, age, hobby) {
    this.name = name;
    this.age = age;
    this.hobby = hobby;
}

// menambahkan introMyself ke People
People.prototype.introMyself = function () {
    // this -> People
    setTimeout(() => {
        // this -> People
        console.log(`Hello! Nama saya ${this.name}, umur saya ${this.age}.`)
        console.log(`Hobby saya adalah ${this.hobby}`)
    }, 300)
}

const programmer = new People("John", 18, ["Coding", "Read book", "Ping-pong"]);
programmer.introMyself();


/* output:
Hello! Nama saya John, umur saya 18.
Hobby saya adalah Coding,Read book,Ping-pong
*/


// arrow function tidak bisa menggunakan this karena, 
// arrow function expressions are best suited for non-method functions.

// non-method functions


// method functions
// const obj = { // does not create a new scope
//     i: 10,
//     b: () => console.log(this.i, this),
//     c() {
//       console.log(this.i, this);
//     },
//   }
  
//   obj.b(); // prints undefined, Window { /* … */ } (or the global object)
//   obj.c(); // prints 10, Object { /* … */ }