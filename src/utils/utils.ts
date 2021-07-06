export const getFramePerSecond = (total: number): void => {
  // 60 s
  const frame: HTMLButtonElement = document.querySelector(".frame");
  frame.innerHTML = `FPS : ${Math.floor(60 / total).toString()}`;
};
