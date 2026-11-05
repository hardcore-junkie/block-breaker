// ============================================================
// bricks.js: where the bricks are, and how they are drawn
// ============================================================

const BRICK_COLUMNS = 8;
const BRICK_ROWS = 4;
const BRICK_WIDTH = 60;
const BRICK_HEIGHT = 20;
const BRICK_GAP = 6;     // empty space between bricks
const BRICKS_TOP = 50;   // how far down the first row starts

function stayStill(brick) {}

function slide(brick) {
  brick.x += brick.speed;
  if (Math.abs(brick.x - brick.startX) > 30) {
    brick.speed *= -1;
  }
}

// Builds the list of bricks. Each brick is an object with an
// x, y, width, and height.
function makeBricks() {
  const list = [];

  // Center the whole block of bricks on the screen.
  const totalWidth = BRICK_COLUMNS * BRICK_WIDTH + (BRICK_COLUMNS - 1) * BRICK_GAP;
  const left = (WIDTH - totalWidth) / 2;

  for (let row = 0; row < BRICK_ROWS; row++) {
    for (let col = 0; col < BRICK_COLUMNS; col++) {
      const x = left + col * (BRICK_WIDTH + BRICK_GAP);
      list.push({
        x,
        y: BRICKS_TOP + row * (BRICK_HEIGHT + BRICK_GAP),
        width: BRICK_WIDTH,
        height: BRICK_HEIGHT,
        move: row === 0 ? slide : stayStill,
        speed: row === 0 ? 2 : 0,
        startX: x,
        blockBreaker: createBlockBreakerComponent(row < BRICK_ROWS - 1 ? 2 : 1)
      });
    }
  }

  return list;
}

// Draws every brick in the list.
function drawBricks() {
  for (const brick of bricks) {
    if (fryslanMode && fryslanImage.complete && fryslanImage.naturalWidth > 0) {
      ctx.drawImage(fryslanImage, brick.x, brick.y, brick.width, brick.height);
    } else {
      ctx.fillStyle = rainbowMode
        ? rainbowColor(brick.x + brick.y)
        : brick.blockBreaker.maxHits === 2
          ? brick.blockBreaker.hitsLeft === 2 ? "#555" : "#333"
          : brick.blockBreaker.hitsLeft === 1 ? "#ccc" : "white";
      ctx.fillRect(brick.x, brick.y, brick.width, brick.height);
    }
  }
}

// Applies one hit to a brick and removes it when its component reaches zero.
function hitBrickSystem(brick) {
  brick.blockBreaker.hitsLeft -= 1;
  if (brick.blockBreaker.hitsLeft === 0) {
    bricks.splice(bricks.indexOf(brick), 1);
  }
}
