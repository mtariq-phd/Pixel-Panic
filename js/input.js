// Tracks current key states
const Input = {
  left: false,
  right: false,
  up: false,
};

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") Input.left = true;
  if (e.key === "ArrowRight") Input.right = true;
  if (e.key === "ArrowUp") Input.up = true;
});

document.addEventListener("keyup", (e) => {
  if (e.key === "ArrowLeft") Input.left = false;
  if (e.key === "ArrowRight") Input.right = false;
  if (e.key === "ArrowUp") Input.up = false;
});
