let numbers = [1, 2, 3, 4, 5]

function triple(element, array, index) {
    index[array] = element * 3;
}
function display(element) {
    console.log(element);
}
numbers.forEach(triple);
numbers.forEach(display);
numbers.for