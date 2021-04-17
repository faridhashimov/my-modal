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

createModal();

const modalOverlay = document.querySelector(".modal__overlay"),
  modalWindow = document.querySelector(".modal__window");

const openModal = {
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
//   openModal.open();
// }, 1000);

function closeModal() {
  let closeBtn = document.querySelector(".modal__header-close");
  modalOverlay.addEventListener("click", (e) => {
    if (e.target === closeBtn || e.target === modalOverlay) {
      openModal.close();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.code == "Escape") {
      openModal.close();
    }
  });
}

class addElementToPage {
  constructor(img, title, description, parentElement) {
    this.img = img;
    this.title = title;
    this.description = description;
    this.parentElement = parentElement;
  }

  render() {
   let cardWrapper =  document.querySelector(this.parentElement);
   cardWrapper.innerHTML = `
    <div class="card"> 
      <div class="card" style="width: 18rem;">
        <img src="${this.img}" class="card-img-top card__img" alt="...">
        <div class="card-body">
          <h5 class="card-title">${this.title}</h5>
          <p class="card-text">${this.description}</p>
          <a href="#" class="btn btn-primary">Remove food</a>
        </div>
      </div>
    </div>
    `;
  }
}

fetch("db.json")
  .then((res) => res.json())
  .then((data) => {
    let newEl = new addElementToPage(data.potato.img, data.potato.title, data.potato.description, ".main" );
    newEl.render();
    console.log(data.potato.title);
  })
  .catch((err) => console.log(err));

closeModal();
