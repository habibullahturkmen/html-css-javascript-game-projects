let playerState = "idle";
const dropdown = document.getElementById("animations");
dropdown.addEventListener("change", function (e) {
   playerState = e.target.value;
});

const canvas = document.getElementById("canvas1");
const context = canvas.getContext("2d");

const CANVAS_WIDTH = canvas.width = 600;
const CANVAS_HEIGHT = canvas.height = 600;

const playerImage = new Image();
playerImage.src = "shadow_dog.png";
// spriteWidth: 6876px, 12 columns, 1 frame (6876 / 23) = 573
const spriteWidth = 575;
// spriteHeight: 5230px, 10 rows, 1 frame (5230 / 10) = 523
const spriteHeight = 523;

let gameFrame = 0;
const staggerFrames = 3;
const spriteAnimations = [];
const animationStates = [
    {
        name: "idle",
        frames: 7,
    },
    {
        name: "jump",
        frames: 7,
    },
    {
        name: "fall",
        frames: 7,
    },
    {
        name: "run",
        frames: 9,
    },
    {
        name: "dizzy",
        frames: 11,
    },
    {
        name: "sit",
        frames: 5,
    },
    {
        name: "roll",
        frames: 7,
    },
    {
        name: "bite",
        frames: 7,
    },
    {
        name: "ko",
        frames: 12,
    },
    {
        name: "gethit",
        frames: 4,
    },
];
animationStates.forEach((state, index) => {
    let frames = {
        location: [],
    }
    for (let j = 0; j < state.frames; j++) {
        let positionX = j * spriteWidth;
        let positionY = index * spriteHeight;
        frames.location.push({x: positionX, y: positionY});
    }
    spriteAnimations[state.name] = frames;
});
console.log(spriteAnimations)

function animate() {
    context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    let position = Math.floor(gameFrame / staggerFrames) % spriteAnimations[playerState].location.length;
    let frameX = spriteWidth * position;
    let frameY = spriteAnimations[playerState].location[position].y;
    // s: source, d: destionation
    // context.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh);
    context.drawImage(playerImage, frameX, frameY, spriteWidth, spriteHeight, 0, 0, spriteWidth, spriteHeight);

    gameFrame++;
    requestAnimationFrame(animate);
}

animate();
