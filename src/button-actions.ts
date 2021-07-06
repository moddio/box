export const menuHelper = () => {
  const button: any = document.querySelector(".button");

  let state: boolean = true;

  button.addEventListener("click", () => {
    const buttonClose: any = document.querySelector(".button_close");
    const buttonHelp: any = document.querySelector(".button_help");
    const helper: any = document.querySelector(".helper");

    // open helper
    buttonClose.style.display = state ? "inherit" : "none";
    helper.style.display = state ? "inherit" : "none";

    // close helper
    buttonHelp.style.display = state ? "none" : "";

    state = !state;
  });
};
