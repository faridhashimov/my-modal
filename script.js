let createModal = () => {
  let modal = document.createElement("div");
  modal.classList.add("vmodal");
  modal.innerHTML = `
    <div class="modal__overlay">
      <div class="modal__window">
        <div class="modal__header">
          <h1> Welcome to our community </h1>
          <span class="modal__header-close">&times;</span>
        </div>
        <div class="modal__body">
          <p>Lisicing elit. Deleniti, dolorum.</p>
          <p>Lorem ipsum dolor sit amet consectetur.</p>
        </div>
        <div class="modal__footer">
          <button class="btn btn-success">OK</button>
          <button class="btn btn-danger">Cancel</button>
        </div>
      </div>
    </div>
  `;
  document.body.append(modal);
  return modal;
};

// createModal();

const modalOverlay = document.querySelector(".modal__overlay"),
  modalWindow = document.querySelector(".modal__window");

const modal = {
  open() {
    modalWindow.classList.add("open");
    modalWindow.classList.remove("hide");
    modalOverlay.classList.add("open");
    modalOverlay.classList.remove("hide");
  },
  close() {
    modalWindow.classList.add("hide");
    modalWindow.classList.remove("open");
    modalOverlay.classList.add("hide");
    modalOverlay.classList.remove("open");
  },
};

// let modalID = setTimeout(() => {
//   modal.open();
// }, 1000);

function closeModal() {
  let closeBtn = document.querySelector(".modal__header-close");
  modalOverlay.addEventListener("click", (e) => {
    if (e.target === closeBtn || e.target === modalOverlay) {
      modal.close();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.code == "Escape") {
      modal.close();
    }
  });
}

class addElementToPage {
  constructor(img, title, description, parentSelector) {
    this.img = img;
    this.title = title;
    this.description = description;
    this.parent = document.querySelector(parentSelector);
  }

  render() {
    let cardWrapper = document.createElement("div");
    cardWrapper.classList.add("card");
    cardWrapper.innerHTML = `
        <img src="${this.img}" class="card__img" alt="...">
        <div class="card-body">
          <h5 class="card-title">${this.title}</h5>
          <p class="card-text">${this.description}</p>
        </div>
        <a href="#" class="btn">Remove food?</a>
    `;
    this.parent.append(cardWrapper);
  }
}

const getResources = async (url) => {
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Could not fetch ${url}, status ${res.status}`);
  }
  return await res.json();
};

getResources("http://localhost:3000/foods").then((data) => {
  console.log(data);
  data.forEach(({ img, title, description }) => {
    new addElementToPage(img, title, description, ".main").render();
  });
});

closeModal();
