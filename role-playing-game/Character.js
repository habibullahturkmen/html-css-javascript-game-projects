import { getDiceRollArray, getDicePlaceholderHtml, getPercentage } from "./utils.js";

class Character {
    constructor(data) {
        // Object.assign(this, data);
        this.name = data.name;
        this.avatar = data.avatar;
        this.health = data.health;
        this.diceCount = data.diceCount;
        this.currentDiceScore = data.currentDiceScore;
        this.maxHealth = this.health;
        this.diceHtml = getDicePlaceholderHtml(this.diceCount);
    }

    setDiceHtml(){
        this.currentDiceScore = getDiceRollArray(this.diceCount);
        this.diceHtml = this.currentDiceScore.map(num => `<div class="dice">${num}</div>`).join("\n");
    }

    takeDamage(attackScoreArray) {
        const totalAttackScore = attackScoreArray.reduce((total, currentNum) => total + currentNum);
        this.health -= totalAttackScore;
        if (this.health <= 0) {
            this.dead = true;
            this.health = 0;
        }
    }

    getHealthBarHtml() {
        const percent = getPercentage(this.health, this.maxHealth);
        return (
            `<div class="health-bar-outer">
                <div 
                    class="health-bar-inner ${percent <= 25 ? "danger" : ""} "
                    style="width:${percent}%;">
                </div>
            </div>`
        );
    }

    getCharacterHtml() {
        const healthBar = this.getHealthBarHtml();
        return `
            <div class="character-card">
                <h4 class="name"> ${this.name} </h4>
                <img class="avatar" src="${this.avatar}" alt="Avatar"/>
                <p class="health">health: <b> ${this.health} </b></p>
                ${healthBar}
                <div class="dice-container">${this.diceHtml}</div>
            </div>
        `;
    }

}

export default Character;
