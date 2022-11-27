import characterData from "./data.js";
import Character from "./Character.js";

const attackBtn = document.getElementById("attack-button");
let monstersArray = ["orc", "demon", "goblin"];
let isWaiting = false;

function getNewMonster() {
    const nextMonsterData = characterData[monstersArray.shift()];
    return nextMonsterData ? new Character(nextMonsterData) : {};
}

const wizard = new Character(characterData.hero);
let monster = getNewMonster();

function render() {
    document.getElementById("hero").innerHTML = wizard.getCharacterHtml();
    document.getElementById("monster").innerHTML = monster.getCharacterHtml();
}

function attack() {
    if (!isWaiting) {
        wizard.setDiceHtml();
        monster.setDiceHtml();
        wizard.takeDamage(monster.currentDiceScore);
        monster.takeDamage(wizard.currentDiceScore);
        render();
        if (wizard.dead) {
            endGame();
        } if (monster.dead && monstersArray.length > 0) {
            isWaiting = true;
            setTimeout(() => {
                monster = getNewMonster();
                render();
                isWaiting = false;
            }, 1500);
        } else if (monster.dead) {
            endGame();
        }
    }

}

function endGame() {
    isWaiting = true;
    const endMessage = monster.dead && wizard.dead && monstersArray === []
        ? "No victors - all creatures are dead"
        : wizard.dead
            ? `The ${monster.name} Wins`
            : `The ${wizard.name} Wins`;
    const endEmoji = monster.dead && wizard.dead
        ? "☠"
        : wizard.dead && !monster.dead
            ? "☠"
            : "🔮";
    setTimeout(() => {
        document.querySelector("body").innerHTML =
            `
        <div class="end-game">
            <h2>Game Over</h2>
            <h3>${endMessage}</h3>
            <p class="end-emoji">${endEmoji}</p>
        </div>
        `;
    }, 1500);
}

attackBtn.addEventListener("click", attack);

render();
