export default (text = "Hello crazy world!") => {
  const element = document.createElement("div");
  element.innerHTML = text;
  element.className = "rounded bg-red-100 border border-indigo-600 m-4 p-4";
  return element;
};
