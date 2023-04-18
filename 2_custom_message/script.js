const button = document.querySelector("button")
const username = document.querySelector('[aria-label="Username"]')
const out = document.querySelector('[aria-label="display-message"]')


button.addEventListener('click', () => {
    let _username = username.value
    out.textContent = `Welcome ${_username} :)`
})
