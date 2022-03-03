const ul = document.querySelector("ul");
const input = document.querySelector("input");
const form = document.querySelector("form");
const apiAdress = "http://localhost:3000";

load();

async function load() {
  const res = await fetch(apiAdress).then((data) => data.json());
  res.urls.map((item) => addElement(item));
}

function addElement({ name, url }) {
  const li = document.createElement("li");
  const a = document.createElement("a");
  const trash = document.createElement("span");

  a.href = url;
  a.innerHTML = name;
  a.target = "_blank";

  trash.innerHTML = "x";
  trash.onclick = () => removeElement(trash);

  li.append(a);
  li.append(trash);
  ul.append(li);
}

function removeElement(el) {
  const name = el.parentNode.firstChild.innerHTML;
  const url = el.parentNode.firstChild.origin;

  if (confirm("Tem certeza que deseja deletar?")) {
    el.parentNode.remove();
  }
  fetch(`${apiAdress}/?name=${name}&url=${url}&del=1`);
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  let { value } = input;

  if (!value) return alert("Preencha o campo");

  const [name, url] = value.split(",");

  if (!url) return alert("formate o texto da maneira correta");

  if (!/^http/.test(url)) return alert("Digite a url da maneira correta");

  addElement({ name, url });

  input.value = "";

  fetch(`${apiAdress}/?name=${name}&url=${url}`);
});
