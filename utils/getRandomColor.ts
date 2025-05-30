export default function getRandomColor(): string {
  const colors = ["red", "green", "blue"];
  return colors[Math.floor(Math.random() * colors.length)];
}
