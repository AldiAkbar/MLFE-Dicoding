const toggleButton = document.querySelector('.toggle-button input');
const nav = document.querySelector('nav ul');

toggleButton.addEventListener('click', function() {
    // toggle digunakan untuk menambahkan class jika tidak ada class pada item yang dimaksud
    // serta menghilangkan class jika class sudah ada pada item yang dimakusd
    nav.classList.toggle('slide');
});