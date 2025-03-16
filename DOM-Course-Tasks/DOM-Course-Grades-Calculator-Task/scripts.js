const gradesList = [];
const gradesField = document.querySelector("#student-grade-input");
const gradesDisplayArea = document.querySelector("#grades-display-area");
const meanResultField = document.querySelector("#mean-result-field");

function clearInput(inputField) {
    inputField.value = '';
    return;
}

function updateGradesList() {
    gradesDisplayArea.value += `A nota ${gradesList.length} foi ${gradesList.at(-1)}\n`;
}

document.querySelector('#add-grade-button').addEventListener("click", () => {
    let inputValue = gradesField.value;
    if (inputValue === "") {
        alert("Por favor, insira uma nota.");
        return;
    }
    
    inputValue = inputValue.replace(",", ".");
    inputValue = Number(inputValue);
    if (isNaN(inputValue)) {
        alert("A nota digitada é inválida, por favor, insira uma nota válida.");
        return;
    }

    inputValue = Number(inputValue.toFixed(2));
    if (inputValue < 0 || inputValue > 10) {
        alert("A nota digitada é inválida, por favor, insira uma nota válida.");
        return;
    }

    gradesList.push(inputValue);

    updateGradesList();
    
    clearInput(gradesField);
});

document.querySelector('#evaluate-mean').addEventListener("click", () => {
    let totalSum = 0;
    gradesList.forEach(elem => totalSum += elem);
    meanResultField.innerText = `A Média é: ${(totalSum / gradesList.length).toFixed(2)}`;
});
