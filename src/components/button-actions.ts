export const menuHelper = () => {
  const button: HTMLButtonElement = document.querySelector(".button");

  let state: boolean = true;

  button.addEventListener("click", () => {
    const buttonClose: HTMLButtonElement = document.querySelector(".button_close");
    const buttonHelp: HTMLButtonElement = document.querySelector(".button_help");
    const helper: HTMLDivElement = document.querySelector(".helper");

    // open helper
    buttonClose.style.display = state ? "inherit" : "none";
    helper.style.display = state ? "inherit" : "none";

    // close helper
    buttonHelp.style.display = state ? "none" : "";

    state = !state;
  });
};
