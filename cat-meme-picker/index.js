import catsData from "./catsData";

const emotionRadios = document.getElementById("emotion-radios");
const getImageBtn = document.getElementById("get-image-btn");
const gifsOnlyOption = document.getElementById("gifs-only-option");
const memeModal = document.getElementById('meme-modal');
const memeModalInner = document.getElementById('meme-modal-inner');
const memeModalCloseBtn = document.getElementById("meme-modal-close-btn");

emotionRadios.addEventListener("change", highlightCheckedOption);

memeModalCloseBtn.addEventListener("click", closeModal);

getImageBtn.addEventListener("click", renderCat);

function highlightCheckedOption(event){
    const radio = document.getElementsByClassName("radio");
    for (let radioElement of radio) {
        radioElement.classList.remove("highlight");
    }
    document.getElementById(event.target.id).parentElement.classList.add("highlight");
}

function closeModal() {
    memeModal.style.display = "none";
}

function renderCat() {
    const catObject = getSingleCatObject();
    memeModal.style.display = "flex";
    memeModalInner.innerHTML = `
    <img
        class="cat-img"
        src="./images/${catObject.image}"
        alt="${catObject.alt}"
    >
    `;
    console.log(catObject)
}

function getSingleCatObject() {
    const catsArray = getMatchingCatsArray();
    if (catsArray.length === 1) {
        return catsArray[0];
    } else {
        const randomNumber = Math.floor(Math.random() * catsArray.length);
        return catsArray[randomNumber];
    }
}

function getMatchingCatsArray() {
    if (document.querySelector("input[type='radio']:checked")) {
        const selectedEmotion = document.querySelector("input[type='radio']:checked").value;
        const isGif = gifsOnlyOption.checked;
        return catsData.filter(cat => {
            return isGif
                ? cat.emotionTags.includes(selectedEmotion) && cat.isGif
                : cat.emotionTags.includes(selectedEmotion);
        });
    }
}

function getEmotionsArray(cats) {
    const emotionsArray = [];
    for (let cat of cats) {
        for (let emotion of cat.emotionTags) {
            if (!emotionsArray.includes(emotion)) {
                emotionsArray.push(emotion);
            }
        }
    }
    return emotionsArray;
}

function renderEmotionsRadios(cats) {
    const emotions = getEmotionsArray(cats);
    let radioItems = "";
    for (let emotion of emotions) {
        radioItems += `
        <div class="radio">
            <label for=${emotion}>${emotion}</label>
            <input 
                type="radio"
                id="${emotion}"
                value=${emotion}
                name="emotions">
        </div>
        `;
    }
    emotionRadios.innerHTML = radioItems;
}

renderEmotionsRadios(catsData);
