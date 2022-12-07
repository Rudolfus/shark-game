class Game {
  constructor() {
    this.shark = null;
    this.surfers = []; // holds instances of surfers
    this.helicopters = []; // holds instances of helicopters
    this.shark = new Shark();
    this.counter = 0;
    // this.newLevel = 0;
  }

  start() {
    this.setTimer();
    this.addEventListener();

    // new surfers
    setInterval(() => {
      const newSurfer = new Surfer();
      this.surfers.push(newSurfer);
    }, 1750);

    // new helicopters
    setInterval(() => {
      const newHeli = new Helicopter();
      this.helicopters.push(newHeli);
    }, 3000);

    // updating surfers & helicopters
    setInterval(() => {
      // let time = 0;
      // time++;

      // creating new surfers
      // if (time % 10 === 0) {
      //     const newSurfer = new Surfer();
      //     this.surfers.push(newSurfer);
      // // creating new helicopters
      // } else if (time % 20 === 0) {
      //     const newHeli = new Helicopter();
      //     this.helicopters.push(newHeli);
      // }

      // calling all the other methods
      this.surfers.forEach((surfer) => {
        //move current surfer
        surfer.moveDown();

        // detect collisison with current obstacle
        this.detectCollisionSurfer(surfer);

        // check if we need to remove the obstacle
        this.removeSurferIfOutside(surfer);
      });

      this.helicopters.forEach((helicopter) => {
        //move current surfer
        helicopter.moveRight();

        // detect collisison with current obstacle
        this.detectCollisionHelicopter(helicopter);

        // check if we need to remove the obstacle
        this.removeHelicopterIfOutside(helicopter);
      });
    }, 50);
  }

  addEventListener() {
    document.addEventListener("keydown", (event) => {
      if (event.key === "ArrowLeft") {
        this.shark.moveLeft();
      } else if (event.key === "ArrowRight") {
        this.shark.moveRight();
      } else if (event.key === "ArrowUp") {
        this.shark.moveUp();
      } else if (event.key === "ArrowDown") {
        this.shark.moveDown();
      }
    });
  }

  detectCollisionSurfer(surfer) {
    const isCollision =
      this.shark.posX < surfer.posX + surfer.width &&
      this.shark.posX + this.shark.width > surfer.posX &&
      this.shark.posY < surfer.posY + surfer.height &&
      this.shark.height + this.shark.posY > surfer.posY;

    const snackSound = new Audio('./audio/snack-sound.mp3');
    
    if (isCollision) {
      this.counter += 1;
      surfer.domElm.remove();
      this.surfers.shift();
      
      document.querySelector("#counter");
      counter.innerText = this.counter;
      snackSound.play()
    }
  
  }

  detectCollisionHelicopter(helicopter) {
    const isCollision =
      this.shark.posX < helicopter.posX + helicopter.width &&
      this.shark.posX + this.shark.width > helicopter.posX &&
      this.shark.posY < helicopter.posY + helicopter.height &&
      this.shark.height + this.shark.posY > helicopter.posY;

    if (isCollision) {
      console.log("collision");
      location.href = "./gameover.html";
    }
  }

  removeSurferIfOutside(surfer) {
    // ckecking if obstacle has moved out of screen
    if (surfer.posY <= 0 - surfer.height) {
      surfer.domElm.remove();
      this.surfers.shift();
    }
  }

  removeHelicopterIfOutside(helicopter) {
    // ckecking if obstacle has moved out of screen
    if (helicopter.posX > 100) {
      helicopter.domElm.remove();
      this.helicopters.shift();
    }
  }
  
  setTimer() {
    let playtime = 30;
    setInterval(() => {
      playtime -= 1;

      document.querySelector("#time");
      time.innerText = playtime;

      if (playtime === 0) {
        location.href = "./timeout.html";
        let feedback = "";

        if (this.counter === 0) {
          feedback = "Weren't you hungry?";
          // alert(feedback);
        } else if (this.counter <= 5) {
          feedback = "The swell wasn't good, hey?";
          // alert(feedback);
        } else if (this.counter <= 10) {
          feedback = "Nice catch dude! 🏄‍♂️ 🦈 ";
          // alert(feedback);
        } else if (this.counter <= 20) {
          feedback = "Wow! You were on FIRE! 🔥 ⚡️ ";
          // alert(feedback);
        }
      }
    }, 1000);
  }
}

class Shark {
  constructor() {
    this.width = 5;
    this.height = 5;
    
    this.posX = 50 - this.width * 0.5;
    this.posY = 1;

    this.domElm = null;

    this.createDomElm();
  }

  createDomElm() {
    this.domElm = document.createElement("div");

    this.domElm.id = "shark";
    this.domElm.style.width = this.width + "vh";
    this.domElm.style.height = this.height + "vh";
    this.domElm.style.bottom = this.posY + "vh";
    this.domElm.style.left = this.posX + "vh";

    const playground = document.getElementById("playground");
    playground.appendChild(this.domElm);
  }

  moveLeft() {
    if (this.posX > 1) {
      this.posX -= 1;
      this.domElm.style.left = this.posX + "vh";
    }
  }

  moveRight() {
    if (this.posX < 94) {
      this.posX += 1;
      this.domElm.style.left = this.posX + "vh";
    }
  }

  moveUp() {
    if (this.posY < 65 - this.height) {
      this.posY += 1;
      this.domElm.style.bottom = this.posY + "vh";
    }
  }

  moveDown() {
    if (this.posY > 1) {
      this.posY -= 1;
      this.domElm.style.bottom = this.posY + "vh";
    }
  }
}

class Surfer {
  constructor() {
    this.width = 5;
    this.height = 5;

    // random startin point
    function randomIntFromInterval(min, max) {
      const rndInt = Math.floor(Math.random() * (max - min + 1) + min);
      return rndInt;
    }

    this.posX = randomIntFromInterval(30, 70);
    this.posY = 65;

    this.domElm = null;

    this.createDomElm();
  }

  createDomElm() {
    this.domElm = document.createElement("div");

    this.domElm.className = "surfer";
    this.domElm.style.width = this.width + "vh";
    this.domElm.style.height = this.height + "vh";
    this.domElm.style.bottom = this.posY + "vh";
    this.domElm.style.left = this.posX + "vh";

    const playground = document.getElementById("playground");
    playground.appendChild(this.domElm);
  }

  moveDown() {
    this.posY -= 0.75;
    this.domElm.style.bottom = this.posY + "vh";
  }
}

class Helicopter {
  constructor() {
    this.width = 8;
    this.height = 8;

    // random startin point
    function randomIntFromInterval(min, max) {
      const rndInt = Math.floor(Math.random() * (max - min + 1) + min);
      return rndInt;
    }

    this.posX = 0; /*randomIntFromInterval(1, 2);*/
    this.posY = randomIntFromInterval(0, 50);

    this.domElm = null;

    this.createDomElm();
  }

  createDomElm() {
    this.domElm = document.createElement("div");

    this.domElm.className = "helicopter";
    this.domElm.style.width = this.width + "vh";
    this.domElm.style.height = this.height + "vh";
    this.domElm.style.bottom = this.posY + "vh";
    this.domElm.style.left = this.posX + "vh";

    const playground = document.getElementById("playground");
    playground.appendChild(this.domElm);
  }

  moveRight() {
    this.posX += 1.35;
    this.domElm.style.left = this.posX + "vh";
  }
  // moveLeft() {
  //     this.posX -= 1;
  //     this.domElm.style.left = this.posX + "vh";
  //   }
}
////////////////////////////////////// global scope //////////////////////////////////////

const bondiBite = new Game();
bondiBite.start();