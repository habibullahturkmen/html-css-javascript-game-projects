const seedColor = document.getElementById("seed-color");
const colorMode = document.getElementById("mode");
const getColorSchemeBtn = document.getElementById("get-color-scheme");
const colorContainer = document.querySelector(".color-container");
const footerContainer = document.querySelector(".footer-container");

let hex = seedColor.value.replace("#", "");
let mode = colorMode.value;
let colorsArray = [
    {hex: {value: "#C01010"}},
    {hex: {value: "#ED1515"}},
    {hex: {value: "#F24444"}},
    {hex: {value: "#F67373"}},
    {hex: {value: "#F9A2A2"}},
]

function renderColors(colorsArray) {
    let colorsHTML = "";
    let footerHTML = "";
    for (const color of colorsArray) {
        colorsHTML += `<div style="background-color: ${color["hex"]["value"]}"></div>`;
        footerHTML +=`<div>${color["hex"]["value"]}</div>`;
    }
    colorContainer.innerHTML = colorsHTML;
    footerContainer.innerHTML = footerHTML;
}

seedColor.addEventListener("input", function () {
    hex = seedColor.value.replace("#", "");
});

colorMode.addEventListener("input", function () {
    mode = colorMode.value;
});

getColorSchemeBtn.addEventListener("click", function () {
    fetch(`https://www.thecolorapi.com/scheme?hex=${hex}&mode=${mode}&count=5`, {method: "GET"})
        .then(response => response.json())
        .then(data => {
            renderColors(data["colors"]);
        });
});

renderColors(colorsArray);
