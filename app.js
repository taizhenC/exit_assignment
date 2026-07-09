let snacks = [];

const list = document.getElementById("list")
const search = document.getElementById("search")
const form = document.getElementById("form")
const errorBox = document.getElementById("error")



fetch("./data.json")
    .then(function (response) {
        return response.json();
    })
    .then(function (data){
        snacks = data.snacks;
        render(snacks);
    })
    .catch(function() {
        errorBox.textContent = "fail to load"
    })


function render(items) {
    list.innerHTML = "";

    items.forEach(function (snack) {
        const li = document.createElement("li");
        li.textContent = snack.name + "---" + snack.category + "---" + snack.calories + " cal";

        if(snack.eaten) {
            li.classList.add("eaten");
        }

        li.addEventListener("click", function() {
            snack.eaten = !snack.eaten;
            li.classList.toggle("eaten");
        })

        list.appendChild(li);
    })
}

function getFiltered() {
    const term = search.value.trim().toLowerCase();

    if(term ==="") {
        return snacks;
    }

    return snacks.filter(function(snack) {
        return snack.name.toLowerCase().indexOf(term) !== -1;
    }) 
}

search.addEventListener("input", function() {
    render(getFiltered());
});


form.addEventListener("submit", function(event) {
    event.preventDefault();

    const name = form.elements["name"].value.trim();
    const category = form.elements["category"].value.trim();
    const caloriesText = form.elements["calories"].value.trim();
    const calories = Number(caloriesText);

    if(name === "" || category === "" || caloriesText === "") {
        errorBox.textContent = "fill all";
        return;
    }

    if(isNaN(calories) || calories < 0) {
        errorBox.textContent = "Calories need to be positive"
        return;
    }

    let newId = 1;
    snacks.forEach(function(snack) {
        if(snack.id >= newId) {
            newId = snack.id + 1;
        }
    })


    snacks.push({
        id: newId,
        name: name,
        category: category,
        calories: calories,
        eaten: false
    })

    render(getFiltered());
})