// catching dom elements
const closeButton = document.querySelector(".close-btn");
const toggler = [...document.querySelectorAll('.toggle')];
const resetButton = document.getElementById('reset');

//event listeners

//hide the alert from UI
closeButton.addEventListener("click", e => {
    e.preventDefault;
    document.querySelector(`${closeButton.dataset.target}`).classList.add('hide');
});

//toggler handler

toggler.forEach(el => {
    el.addEventListener("click", e => {
        console.log(e.target.dataset.target);
        document.querySelector(`${e.target.dataset.target}`).classList.toggle('hide');
    });
})

resetButton.addEventListener("click", e => {
    e.preventDefault;
    //reset form
    document.querySelector('form').reset();
    //hide 2 container
    [...document.querySelectorAll(`.form-container`)].forEach(el => {
        el.classList.remove('hide');
        el.classList.add('hide');
    })
});