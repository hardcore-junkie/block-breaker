// Creates the data-only component attached to each brick.
function createBlockBreakerComponent(maxHits = 1) {
  return { hitsLeft: maxHits, maxHits };
}