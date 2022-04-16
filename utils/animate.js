function animate() {
    window.requestAnimationFrame(animate);
    context.fillStyle = "black";
    context.fillRect(0, 0, canvas.width, canvas.height);
    background.update();
    shop.update();
    player.update();
    enemy.update();

    player.velocity.x = 0;

    enemy.velocity.x = 0;

    // player1 movement
    if(keys.a.pressed && player.lastKey === "a") {
            player.velocity.x = -10;
            player.switchSprites("run");

    } else if (keys.d.pressed && player.lastKey === "d") {
        // if(player.position.x < enemy.position.x - 50){
        //     player.velocity.x = 10;
        // }
        player.switchSprites("run");
        player.velocity.x = 10;
    } else {
        player.switchSprites("idle");
    }

    // jumping
    if(player.velocity.y < 0) {
        player.switchSprites("jump");
    } else if (player.velocity.y > 0){
        player.switchSprites("fall");
    }

    // player2 movemente
    if(keys.ArrowLeft.pressed && enemy.lastKey === "ArrowLeft") {
        // if(enemy.position.x > player.position.x + 50){
        //     enemy.velocity.x = -10;
        // }

        enemy.velocity.x = -10;
        enemy.switchSprites("run");
    } else if (keys.ArrowRight.pressed && enemy.lastKey === "ArrowRight") {
        enemy.velocity.x = 10;
        enemy.switchSprites("run");
    } else {
        enemy.switchSprites("idle");
    }

    // jumping
    if(enemy.velocity.y < 0) {
        enemy.switchSprites("jump");
    } else if (enemy.velocity.y > 0){
        enemy.switchSprites("fall");
    }

    // detect for collision
    if( rectangularCollision({
        player1: player,
        player2: enemy,
        }) 
        &&
        player.isAttacking && player.frameCurrent === 4
    ){
        enemy.takeHit();
        document.querySelector("#player2Health").style.width = `${enemy.health}%`
        player.isAttacking = false;
    }

    if(player.isAttacking && player.frameCurrent === 4){
        player.isAttacking = false;
    }

    if( rectangularCollision({
        player1: enemy,
        player2: player,
        }) 
        &&
        enemy.isAttacking && enemy.frameCurrent === 2
    ){
        player.takeHit();
        document.querySelector("#player1Health").style.width = `${player.health}%`
        enemy.isAttacking = false;
    }

    if(enemy.isAttacking && enemy.frameCurrent === 2){
        enemy.isAttacking = false;
    }

    // detect winner
    if (enemy.health <= 0 || player.health <= 0) {
        determineWinner({ player, enemy });
    } 
}