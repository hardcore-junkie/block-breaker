// ============================================================
// bricks.js: where the bricks are, and how they are drawn
// ============================================================

const BRICK_COLUMNS = 8;
const BRICK_ROWS = 4;
const BRICK_WIDTH = 60;
const BRICK_HEIGHT = 20;
const BRICK_GAP = 6;     // empty space between bricks
const BRICKS_TOP = 50;   // how far down the first row starts

// Builds the list of bricks. Each brick is an object with an
// x, y, width, and height.
function makeBricks() {
  const list = [];

  // Center the whole block of bricks on the screen.
  const totalWidth = BRICK_COLUMNS * BRICK_WIDTH + (BRICK_COLUMNS - 1) * BRICK_GAP;
  const left = (WIDTH - totalWidth) / 2;

  for (let row = 0; row < BRICK_ROWS; row++) {
    for (let col = 0; col < BRICK_COLUMNS; col++) {
      list.push({
        x: left + col * (BRICK_WIDTH + BRICK_GAP),
        y: BRICKS_TOP + row * (BRICK_HEIGHT + BRICK_GAP),
        width: BRICK_WIDTH,
        height: BRICK_HEIGHT,
        blockBreaker: createBlockBreakerComponent()
      });
    }
  }

  return list;
}

// Draws every brick in the list.
function drawBricks() {
  for (const brick of bricks) {
    ctx.fillStyle = rainbowMode
      ? rainbowColor(brick.x + brick.y)
      : brick.blockBreaker.hitsLeft === 1 ? "#ccc" : "white";
    ctx.fillRect(brick.x, brick.y, brick.width, brick.height);
  }
}

// Applies one hit to a brick and removes it when its component reaches zero.
function hitBrickSystem(brick) {
  brick.blockBreaker.hitsLeft -= 1;
  if (brick.blockBreaker.hitsLeft === 0) {
    bricks.splice(bricks.indexOf(brick), 1);
  }
}
