// querySelector will select 1st element 
// querySelectorAll will select all elements and return a list
const button = document.querySelector("button")
const input_field = document.querySelector("#input-field")
const res_banner = document.querySelector("#response")
// adding eventlistner
button.addEventListener('click', () => {
    console.log("Hello Wold Just click")
    console.log(input_field.value)
    let tip = (input_field.value  * 0.15).toFixed(2) //to round off
    res_banner.textContent = `You Should Tip $ ${tip}`
})