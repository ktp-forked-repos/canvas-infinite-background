const canvas = document.getElementById('my-canvas');
const ctx = canvas.getContext('2d');
const efps = document.getElementById('fps');
const eframes = document.getElementById('frames');
let fpsControl = performance.now();
let frames = 0;

function updateInfo() {
  eframes.textContent = frames;
  if (frames % 100 === 0) {
    efps.textContent = (100 * 1000 / (performance.now() - fpsControl)).toFixed(2);
    fpsControl = performance.now();
  }
}

function Background() {
  this.x = 0;
  this.y = 0;
  this.speed = 1;
  this.img = new Image();
  this.img.src = 'bg4.jpg';
}

Background.prototype.infiniteDown = function() {
  ctx.drawImage(this.img, this.x, this.y);
  ctx.drawImage(this.img, this.x, this.y - canvas.height);
  if (this.y >= canvas.height) {
    this.y = 0;
  }
  this.moveDown();
}

Background.prototype.infiniteRight = function() {
  ctx.drawImage(this.img, this.x, this.y);
  ctx.drawImage(this.img, this.x - canvas.width, this.y);
  if (this.x >= canvas.width) {
    this.x = 0;
  }
  this.moveRight();
}

Background.prototype.infiniteLeft = function() {
  ctx.drawImage(this.img, this.x, this.y);
  ctx.drawImage(this.img, this.x + canvas.width, this.y);
  if (canvas.width + this.x <= 0) {
    this.x = 0;
  }
  this.moveLeft();
}

Background.prototype.infiniteUp = function() {
  ctx.drawImage(this.img, this.x, this.y);
  ctx.drawImage(this.img, this.x, this.y + canvas.width);
  if (canvas.height + this.y <= 0) {
    this.y = 0;
  }
  this.moveUp();
}

Background.prototype.moveDown = function() {
  this.y += this.speed;
}

Background.prototype.moveRight = function() {
  this.x += this.speed;
}

Background.prototype.moveLeft = function() {
  this.x -= this.speed;
}

Background.prototype.moveUp = function() {
  this.y -= this.speed;
}

const bg = new Background();

function animate() {
  ctx.clearRect(0, 0, 500, 500);
  bg.infiniteDown();
  frames += 1;
  // updateInfo();
  window.requestAnimationFrame(animate);
}

animate();