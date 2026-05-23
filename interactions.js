document.addEventListener("DOMContentLoaded", () => {
const form = document.querySelector("form");
const input = form.querySelector("input");

form.addEventListener("submit", (event) => {
    event.preventDefault();

    console.log(form);
    console.log(input);
    const text = input.value.trim();
    if (!text) return;

    addNewListElement(text);
    input.value = "";
})

function addNewListElement(text) {
    const nameTd = document.createElement("td");
    nameTd.textContent = text;
    nameTd.classList.add("item-name");
    

    const buttonLess = document.createElement("button");
    buttonLess.setAttribute("data-tooltip", "Зменшити кількість товару");
    buttonLess.textContent = "-";

    const buttonLessLabel = document.createElement("label");
    buttonLessLabel.appendChild(buttonLess);

    const buttonLessTd = document.createElement("td");
    buttonLessTd.classList.add("button-less");
    buttonLessTd.classList.add("inactive");
    buttonLessTd.appendChild(buttonLessLabel);


    const itemNumber = document.createElement("td");
    itemNumber.classList.add("item-number");
    itemNumber.textContent = "1";


    const buttonMore = document.createElement("button");
    buttonMore.setAttribute("data-tooltip", "Збільшити кількість товару");
    buttonMore.textContent = "+";

    const buttonMoreLabel = document.createElement("label");
    buttonMoreLabel.appendChild(buttonMore);

    const buttonMoreTd = document.createElement("td");
    buttonMoreTd.classList.add("button-more");
    buttonMoreTd.appendChild(buttonMoreLabel);


    const boughtButton = document.createElement("button");
    boughtButton.setAttribute("data-tooltip", "Купити");
    boughtButton.textContent = "Куплено";

    const boughtButtonLabel = document.createElement("label");
    boughtButtonLabel.appendChild(boughtButton);


    const cancelButton = document.createElement("button");
    cancelButton.classList.add("cancel");
    cancelButton.setAttribute("data-tooltip", "Видалити пункт")
    cancelButton.textContent = "X";

    const cancelButtonLabel = document.createElement("label");
    cancelButtonLabel.appendChild(cancelButton);


    const buttonBoughtTd = document.createElement("td");
    buttonBoughtTd.classList.add("button-bought");
    buttonBoughtTd.appendChild(boughtButtonLabel);
    buttonBoughtTd.appendChild(cancelButtonLabel);


    const itemBlockTr = document.createElement("tr");
    itemBlockTr.appendChild(nameTd);
    itemBlockTr.appendChild(buttonLessTd);
    itemBlockTr.appendChild(itemNumber);
    itemBlockTr.appendChild(buttonMoreTd);
    itemBlockTr.appendChild(buttonBoughtTd);

    const path = document.querySelector(".first-main-box tbody")
    path.appendChild(itemBlockTr);
}
});