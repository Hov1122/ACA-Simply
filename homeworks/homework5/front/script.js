function updateData({target}, setComplete = false) {
    let id = target.dataset.id;
    let body = {};

    if (!setComplete) {
        id = target.parentElement.dataset.id;
        if (target.classList.contains('ul-title'))
            body.title = target.value;
        else
            body.reminder = target.value
    }

    fetch("http://localhost:5000/todo/updateData/" + id, {
        method: "PATCH",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(body)
    })
}

let date = new Date();
document.querySelector('.date').value = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().slice(0, 16)

// Create a "close" button and append it to each list item
const myNodelist = document.getElementsByTagName("LI");
for (let i = 0; i < myNodelist.length; i++) {
    const span = document.createElement("SPAN");
    const txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    myNodelist[i].appendChild(span);
}

// Add a "checked" symbol when clicking on a list item
const list = document.querySelector('ul');
list.addEventListener('click', function(ev) {
    if (ev.target.tagName === 'LI') {
        // setStatus(ev.target.dataset.id)
        updateData(ev, true)
        ev.target.classList.toggle('checked');
    }
}, false);

// Create a new list item when clicking on the "Add" button
function newElement({title, reminder, id, completed} = {}) {
    const li = document.createElement("li");
    li.dataset.id = id;
    let inputValue = "";
    let reminderVal = "";
    if (title) {
        inputValue = title
        reminderVal = reminder;
        if (completed)
            li.classList.toggle('checked')
    }

    else
    {
        inputValue = document.getElementById("myInput").value;
        reminderVal = document.querySelector(".date").value;
    }
    const t = document.createElement("INPUT");
    t.value = inputValue;
    t.addEventListener('change', updateData);
    t.className = 'ul-title'
    li.appendChild(t);
    if (inputValue === '' || reminderVal === '') {
        // alert();
        return;
    } else {
        document.getElementById("myUL").appendChild(li);
    }
    document.getElementById("myInput").value = "";

    let close = document.createElement("SPAN");
    let txt = document.createTextNode("\u00D7");
    close.className = "close";
    close.appendChild(txt);
    li.appendChild(close);

    const input = document.createElement("input");
    input.addEventListener('change', updateData);
    input.type = 'datetime-local'
    input.style.background = 'transparent';
    const date = new Date(reminderVal)
    input.value = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().slice(0, 16)
    input.className = 'reminder'
    li.appendChild(input);

    close.onclick = function() {
        const div = this.parentElement;
        div.style.display = "none";

        fetch("http://localhost:5000/todo/" + div.dataset.id, {
            method: "DELETE"
        })
    }

    if (arguments.length === 0) {
        fetch("http://localhost:5000/todo", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({title: inputValue, reminder: new Date(reminderVal).toISOString()})
        })
    }
}


fetch("http://localhost:5000/todo")
    .then(response => response.json())
    .then(data => {
        data.forEach(todo => newElement(todo))
    })