const baseUrl = "https://localhost:4000/";

const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const email = document.getElementById('email');
const addUserButton = document.getElementById('addUserButton');

addUserButton.addEventListener('click', function() {
    console.log('ads')
    addUser({
        first_name: firstName.value,
        last_name: lastName.value,
        email: email.value
    })
})

async function addUser(data) {
    await fetch(baseUrl, {
        method: 'POST',
        body: JSON.stringify(data)
    })
}