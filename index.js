const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');
const gravity = 0.7;

const background = new Sprite({
    position: {
        x: 0,
        y: 0,
    },
    imageSrc: "./assets/background.png",
});

const shop = new Sprite({
    position: {
        x: 600,
        y: 128,
    },
    imageSrc: "./assets/shop.png",
    scale: 2.75,
    framesMax: 6,
})

canvas.width = 1024;
canvas.height = 576;

context.fillRect(0, 0, canvas.width, canvas.height);

const player = new Fighter({
    position: {
        x: 100,
        y: 0,
    },
    velocity: {
        x: 0,
        y: 0,
    },
    color: "red",
    imageSrc: "./assets/samuraiMack/Idle.png",
    framesMax: 8,
    scale: 2.75,
    offset: {
        x: 215,
        y: 180,
    },
    sprites: {
        idle: {
            imageSrc: "./assets/samuraiMack/Idle.png",
            framesMax: 10,
        },
        run: {
            imageSrc: "./assets/samuraiMack/Run.png",
            framesMax: 8,
        },
        jump: {
            imageSrc: "./assets/samuraiMack/Jump.png",
            framesMax: 2,
        },
        fall: {
            imageSrc: "./assets/samuraiMack/Fall.png",
            framesMax: 2,
        },
        attack1: {
            imageSrc: "./assets/samuraiMack/Attack1.png",
            framesMax: 6,
        },
        takeHit: {
            imageSrc: "./assets/samuraiMack/Take Hit - white silhouette.png",
            framesMax: 4,
        },
        death: {
            imageSrc: "./assets/samuraiMack/Death.png",
            framesMax: 6,
        },
    },
    attackBox: {
        offset: {
            x: 100,
            y: 0,
        },
        widht: 140,
        height: 50,
    }
});

const enemy = new Fighter({
    position: {
        x: 850,
        y: 0,
    },
    velocity: {
        x: 0,
        y: 0,
    },
    imageSrc: "./assets/kenji/Idle.png",
    framesMax: 4,
    scale: 2.75,
    offset: {
        x: 215,
        y: 194,
    },
    sprites: {
        idle: {
            imageSrc: "./assets/kenji/Idle.png",
            framesMax: 4,
        },
        run: {
            imageSrc: "./assets/kenji/Run.png",
            framesMax: 8,
        },
        jump: {
            imageSrc: "./assets/kenji/Jump.png",
            framesMax: 2,
        },
        fall: {
            imageSrc: "./assets/kenji/Fall.png",
            framesMax: 2,
        },
        attack1: {
            imageSrc: "./assets/kenji/Attack1.png",
            framesMax: 4,
        },
        takeHit: {
            imageSrc: "./assets/kenji/Take hit.png",
            framesMax: 3,
        },
        death: {
            imageSrc: "./assets/kenji/Death.png",
            framesMax: 7,
        },
    },
    attackBox: {
        offset: {
            x: -170,
            y: 50,
        },
        widht: 190,
        height: 50,
    }
});

const keys = {
    a: {
        pressed: false,
    },
    d: {
        pressed: false,
    },
    w: {
        pressed: false,
    },
    ArrowRight: {
        pressed: false,
    },
    ArrowLeft: {
        pressed: false,
    },
}

function rectangularCollision({ player1, player2, }) {
    return (
        player1.attackBox.position.x + player1.attackBox.widht >= player2.position.x &&
        player1.attackBox.position.x <= player2.position.x + player2.width &&
        player1.attackBox.position.y + player1.attackBox.height >= player2.position.y &&
        player1.attackBox.position.y <= player2.position.y + player2.height
    )
}

function determineWinner({ player, enemy }) {
    isAnimated = false;
    if (player.health === enemy.health) {
        document.querySelector("#winsMessage").innerHTML = "Tie";
    } else if (player.health > enemy.health) {
        document.querySelector("#winsMessage").innerHTML = "Player 1 Wins";
        clearTimeout(timerId);
    } else if (player.health < enemy.health) {
        document.querySelector("#winsMessage").innerHTML = "Player 2 Wins";
        clearTimeout(timerId);
    }
}

decreaseTimer();

animate();

window.addEventListener("keydown", async (event) => {
    if (!player.dead) {
        switch (event.key) {
            case "d":
                keys.d.pressed = true;
                player.lastKey = "d";
                break;

            case "a":
                keys.a.pressed = true;
                player.lastKey = "a";
                break;

            case "w":
                player.jump();
                break;

            case " ":
                player.attack();
                break;
        }
    }

    if (!enemy.dead) {
        switch (event.key) {
            case "ArrowRight":
                keys.ArrowRight.pressed = true;
                enemy.lastKey = "ArrowRight";
                break;

            case "ArrowLeft":
                keys.ArrowLeft.pressed = true;
                enemy.lastKey = "ArrowLeft";
                break;

            case "ArrowUp":
                enemy.jump();
                break;

            case "ArrowDown":
                enemy.attack();
                break;
        }
    }
})

window.addEventListener("keyup", (event) => {
    switch (event.key) {
        case "d":
            keys.d.pressed = false;
            break;

        case "a":
            keys.a.pressed = false;

        case "w":
            keys.w.pressed = false;

        case "ArrowRight":
            keys.ArrowRight.pressed = false;
            break

        case "ArrowLeft":
            keys.ArrowLeft.pressed = false;
            break
    }
})

