let snacks = [];


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
    List.innerHTML = "";

    items.forEach(function (snack) {
        const li = document.createElement("li");
        li.textContent = snack.name + "---" + snack.category + "---" + snack.calories + " cal";

        if(snack.eaten) {
            li.classList.add("eaten");
        }
    })
}

search.addEventListener("input", function() {
    render()
});
