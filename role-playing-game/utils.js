const getDiceRollArray = diceCount => {
    return new Array(diceCount).fill(0).map(() => Math.floor(Math.random() * 6) + 1);
}

const getDicePlaceholderHtml = diceCount => {
    return new Array(diceCount).fill("").map(() => `<div class="placeholder-dice"></div>`).join("\n");
}

const getPercentage = (remainingHealth, maximumHealth) => 100 * remainingHealth / maximumHealth;

export { getDiceRollArray, getDicePlaceholderHtml, getPercentage };
