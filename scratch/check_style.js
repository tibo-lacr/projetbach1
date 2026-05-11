
const main = document.querySelector('main');
if (main) {
  console.log('OverflowY:', window.getComputedStyle(main).overflowY);
  console.log('Overflow:', window.getComputedStyle(main).overflow);
}
