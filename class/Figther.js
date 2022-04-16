class Fighter extends Sprite {
    constructor ({
        position, 
        velocity, 
        color, 
        imageSrc, 
        scale = 1, 
        framesMax =1,
        offset = { x: 0, y: 0 }, 
        sprites,
        attackBox = { offset: {}, widht: undefined, height: undefined }
    }) {
        super({
            position,
            imageSrc,
            scale,
            framesMax,
            offset,
        }); 

        this.velocity = velocity;
        this.height = 150;
        this.width = 50;
        this.lastKey;
        this.attackBox = {
            position: {
                x: this.position.x,
                y: this.position.y
            },
            offset: attackBox.offset,
            widht: attackBox.widht,
            height: attackBox.height,
        }
        this.color = color;
        this.isAttacking;
        this.health = 100;
        this.timeCooldown = 0;
        this.frameCurrent = 0;
        this.framesElapsed = 0;
        this.framesHold = 10;
        this.offset = offset;
        this.sprites = sprites;
        this.dead = false;

        for (const sprite in this.sprites) {
            sprites[sprite].image = new Image();
            sprites[sprite].image.src = sprites[sprite].imageSrc;
        }
    }



    update() {
        this.draw();
        if(!this.dead) {
            this.animatedFrames();
        }

        this.attackBox.position.x = this.position.x + this.attackBox.offset.x;
        this.attackBox.position.y = this.position.y + this.attackBox.offset.y;

        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        if (this.position.y + this.height + this.velocity.y >= canvas.height - 96) {
            this.position.y = 330;
            this.velocity.y = 0;
        } else this.velocity.y += gravity;

        if (this.position.x <= 0) {
            this.position.x = 0;
        }

        if (this.position.x >= canvas.width - this.width) {
            this.position.x = canvas.width - this.width;
        }
    }

    jump() {
        if (this.position.y + this.height + this.velocity.y >= canvas.height - 96) {
            this.velocity.y = -20;
        }
    }

    attack() {
        if(this.timeCooldown === 0) {
            this.timeCooldown = 3;
            this.switchSprites('attack1');
            this.isAttacking = true;

            this.cooldown();
        }
    }

    cooldown() {
        if(this.timeCooldown > 0) {
            setTimeout(() => this.cooldown());
            this.timeCooldown--;
            console.log(this.timeCooldown);
        }
    }

    takeHit() {
        this.health -= 10;

        if(this.health <= 0) {
            this.switchSprites("death");
        } else {
            this.switchSprites("takeHit");
        }
    }
 
    switchSprites(sprite) {
        if(this.image === this.sprites.death.image) {
            if(this.frameCurrent === this.sprites.death.framesMax -1) {
                this.dead = true;
            }
            return;
        } 

        if(this.image === this.sprites.attack1.image && 
            this.frameCurrent < this.sprites.attack1.framesMax - 1
        ) return

        if(this.image === this.sprites.takeHit.image && 
            this.frameCurrent < this.sprites.takeHit.framesMax - 1
        ) return

        switch(sprite) {
            case "idle":
                if (this.image !== this.sprites.idle.image) {
                    this.image = this.sprites.idle.image;
                    this.framesMax = this.sprites.idle.framesMax;
                    this.frameCurrent = 0;
                }
                break;

            case "run":
                if (this.image !== this.sprites.run.image) {
                    this.image = this.sprites.run.image;
                    this.framesMax = this.sprites.run.framesMax;
                    this.frameCurrent = 0;
                }
                break;
            
            case "jump":
                if(this.image !== this.sprites.jump.image) {
                    this.image = this.sprites.jump.image;
                    this.framesMax = this.sprites.jump.framesMax;
                    this.frameCurrent = 0;
                }
                break;

            case "fall":
                if(this.image !== this.sprites.fall.image) {
                    this.image = this.sprites.fall.image;
                    this.framesMax = this.sprites.fall.framesMax;
                    this.frameCurrent = 0;
                }
                break;

            case "attack1":
                if(this.image !== this.sprites.attack1.image) {
                    this.image = this.sprites.attack1.image;
                    this.framesMax = this.sprites.attack1.framesMax;
                    this.frameCurrent = 0;
                }
                break;

            case "takeHit":
                if(this.image !== this.sprites.takeHit.image) {
                    this.image = this.sprites.takeHit.image;
                    this.framesMax = this.sprites.takeHit.framesMax;
                    this.frameCurrent = 0;
                }
                break;
            
            case "death":
                if(this.image !== this.sprites.death.image) {
                    this.image = this.sprites.death.image;
                    this.framesMax = this.sprites.death.framesMax;
                    this.frameCurrent = 0;
                }
                break;
        }
    }
}