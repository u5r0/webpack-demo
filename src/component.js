export default (text = "Hello crazy world!") => {
  const element = document.createElement("div");
  element.innerHTML = text;
  return element;
};
