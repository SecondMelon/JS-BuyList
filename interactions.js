document.addEventListener("DOMContentLoaded", () => {
const form = document.querySelector(".create-form");
const input = form.querySelector("input");

form.addEventListener("submit", (event) => {
    event.preventDefault();

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
    boughtButton.classList.add("bought-button");
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

    updateSecondGridElement();
}

document.addEventListener("click", (event) => {
    const button = event.target;
    if (button.closest(".cancel")) {
        button.closest(".cancel").closest("tr").remove();
        updateSecondGridElement();
    }
    else if (button.closest(".bought-button") || button.closest(".not-bought-button")) toggleBought(button.closest("tr"));
    else if (button.closest(".item-name")) substitudeWithNameInputField(button.closest(".item-name"));
    else if (button.closest(".button-less")) decItemNumber(button.closest(".button-less"));
    else if (button.closest(".button-more")) incItemNumber(button.closest(".button-more"));
})
/* Старий варіант, який не підтримував оновлення сторінки
document.querySelectorAll(".cancel").forEach(button => {
    button.addEventListener("click", () => {
        button.closest("tr").remove();
    });
})*/

// Дуже страшна функція. Міг розбити її на дві, але вирішив, що якщо написав "toggle", то треба йти до кінця
function toggleBought(itemObject) {
    if (itemObject.lastElementChild.firstElementChild.firstElementChild.closest("button").classList.contains("bought-button")) {
        itemObject.firstElementChild.nextElementSibling.firstElementChild.remove();
        itemObject.lastElementChild.previousElementSibling.firstElementChild.remove();

        itemObject.lastElementChild.lastElementChild.remove();
        
        const notBoughtButton = document.createElement("button");
        notBoughtButton.classList.add("not-bought-button");
        notBoughtButton.setAttribute("data-tooltip", "Скасувати покупку");
        notBoughtButton.textContent = "Не куплено";

        itemObject.lastElementChild.firstElementChild.firstElementChild.remove();
        itemObject.lastElementChild.firstElementChild.appendChild(notBoughtButton);

        itemObject.firstElementChild.classList.add("bought");
    } else {
        itemObject.firstElementChild.classList.remove("bought");

        itemObject.lastElementChild.firstElementChild.remove();

        const buttonLess = document.createElement("button");
        buttonLess.setAttribute("data-tooltip", "Зменшити кількість товару");
        buttonLess.textContent = "-";

        const buttonLessLabel = document.createElement("label");
        buttonLessLabel.appendChild(buttonLess);

        itemObject.firstElementChild.nextElementSibling.classList.add("button-less");
        if (itemObject.firstElementChild.nextElementSibling.nextElementSibling.textContent == "1")
            itemObject.firstElementChild.nextElementSibling.classList.add("inactive");
        itemObject.firstElementChild.nextElementSibling.appendChild(buttonLessLabel);


        const buttonMore = document.createElement("button");
        buttonMore.setAttribute("data-tooltip", "Збільшити кількість товару");
        buttonMore.textContent = "+";

        const buttonMoreLabel = document.createElement("label");
        buttonMoreLabel.appendChild(buttonMore);

        itemObject.lastElementChild.previousElementSibling.classList.add("button-more");
        itemObject.lastElementChild.previousElementSibling.appendChild(buttonMoreLabel);


        const boughtButton = document.createElement("button");
        boughtButton.classList.add("bought-button");
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

        itemObject.lastElementChild.appendChild(boughtButtonLabel);
        itemObject.lastElementChild.appendChild(cancelButtonLabel);
    }

    updateSecondGridElement();
}

function substitudeWithNameInputField(nameObject) {
    const oldTextContent = nameObject.textContent;

    const nameInput = document.createElement("input");
    nameInput.setAttribute("type", "text");
    nameInput.setAttribute("name", "Нова назва товару")

    const nameLabel = document.createElement("label");
    nameLabel.appendChild(nameInput);

    nameObject.textContent = "";
    nameObject.appendChild(nameLabel);

    nameInput.focus();

    nameInput.addEventListener("change", (event) => {
        const newName = nameInput.value.trim();
        nameObject.textContent = newName.length > 0 ? newName : oldTextContent;
        updateSecondGridElement();
    })
}

function decItemNumber(button) {
    if (button.classList.contains("inactive") || !button.firstElementChild) return;
    button.nextElementSibling.textContent--;
    if (button.nextElementSibling.textContent == 1) button.classList.add("inactive");
    updateSecondGridElement();
}

function incItemNumber(button) {
    if (!button.firstElementChild) return;
    button.previousElementSibling.textContent++;
    if (button.previousElementSibling.textContent == 2) button.previousElementSibling.previousElementSibling.classList.remove("inactive");
    updateSecondGridElement();
}

function updateSecondGridElement() {
    const src = document.querySelector(".first-main-box").lastElementChild;
    const itemsLeftList = document.querySelector(".items-left-list").firstElementChild;
    const itemsBoughtList = document.querySelector(".items-bought-list").firstElementChild;

    itemsLeftList.textContent = "";
    itemsBoughtList.textContent = "";

    src.querySelectorAll("tr").forEach(o => {
        const amountSpan = document.createElement("span");
        amountSpan.classList.add("amount");
        amountSpan.textContent = o.lastElementChild.previousElementSibling.previousElementSibling.textContent;

        const singleItemSpan = document.createElement("span");
        singleItemSpan.classList.add("single-item");
        singleItemSpan.textContent = o.querySelector(".item-name").textContent;
        singleItemSpan.appendChild(amountSpan);

        if (!o.firstElementChild.classList.contains("bought")) {
            amountSpan.classList.add("result-number");
            singleItemSpan.classList.add("left");
            itemsLeftList.appendChild(singleItemSpan);
        } else {
            amountSpan.classList.add("result-bought-number");
            singleItemSpan.classList.add("bought");
            itemsBoughtList.appendChild(singleItemSpan);
        }
    })
}
});