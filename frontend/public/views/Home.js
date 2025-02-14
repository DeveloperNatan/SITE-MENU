const menu = document.getElementById("menu");
const cartBtn = document.getElementById("cart-btn");
const cartModal = document.getElementById("cart-modal");
const cartItemsContainer = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const checkoutBtn = document.getElementById("checkout-btn");
const closemodalBtn = document.getElementById("close-modal-btn");
const cartCounter = document.getElementById("cart-count");
const addressInput = document.getElementById("address");
const addressWarn = document.getElementById("address-warn");
const addressWarnOrder = document.getElementById("address-warn-order");
const addressWarnname = document.getElementById("address-warn-name");
const nomeinput = document.getElementById("nomeinput");
const cartobservation = document.getElementById("cart-observation");
let cart = [];

async function FetchApiDisplayProducts() {
  try {
    const url = "https://api-menu-eg3i.onrender.com/api/menu";
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`API request failed, status: ${response.status}`);
    }

    const menu = await response.json();

    const menuBurguer = document.getElementById("menu-burguers");
    const menuCombos = document.getElementById("menu-combos");
    const menuPorcoes = document.getElementById("menu-porcoes");
    const menuBebidas = document.getElementById("menu-bebidas");

    menu.forEach((item) => {
      const menuItens = document.createElement("div");
      menuItens.className = "flex gap-2 flex justify-center";

      menuItens.innerHTML = `
        <div class="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg bg-gray-200 p-4 rounded-lg shadow-md">
 <img src="./assets/${item.category}.png" alt="${item.name}"
  class="w-32 sm:w-40 md:w-48 lg:w-56 xl:w-64 rounded-md hover:scale-105 hover:rotate-1 duration-300 shadow-sm mx-auto" />
  <p class="font-bold text-gray-800 text-lg mt-2">${item.name}</p>
  <p class="text-sm text-gray-600">${item.description}</p>
  
  <div class="flex flex-col mt-3">
    <label for="cart-observation-${item.id}" class="font-bold text-red-500">Observação:</label>
    <input type="text" id="cart-observation-${item.id}" name="observation" placeholder="Ex: sem cebola, hambúrguer mal passado"
      class="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-300">
  </div>

  <div class="flex items-center gap-2 justify-between mt-2">
        <p class="font-bold text-lg">R$ ${item.price}</p>
        <button
            class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-md transition add-to-cart-btn"
            data-name="${item.name}" data-price="${item.price}" data-id="${item.id}">
            <i class="fa fa-cart-plus text-lg"></i>
        </button>
    </div>

      `;

      switch (item.category) {
        case "burguer":
          menuBurguer.appendChild(menuItens);
          break;
        case "drink":
          menuBebidas.appendChild(menuItens);
          break;
        case "combo":
          menuCombos.appendChild(menuItens);
          break;
        case "porcao":
          menuPorcoes.appendChild(menuItens);
          break;
      }
    });
  } catch (error) {
    console.error("Error fetching products", error);
  }
}

// abrir carrinho
cartBtn.addEventListener("click", function () {
  updatecartmodal();
  cartModal.style.display = "flex";
});

// fechar carrinho
cartModal.addEventListener("click", function (event) {
  if (event.target === cartModal) {
    cartModal.style.display = "none";
  }
});

closemodalBtn.addEventListener("click", function () {
  cartModal.style.display = "none";
});

menu.addEventListener("click", function (event) {
  let parentbutton = event.target.closest(".add-to-cart-btn");

  if (parentbutton) {
    const name = parentbutton.getAttribute("data-name");
    const price = parseFloat(parentbutton.getAttribute("data-price"));
    const id = parseInt(parentbutton.getAttribute("data-id"));
    const obs = document.getElementById(`cart-observation-${id}`).value;
    addtocart(name, price, obs);
  }
});

function updatecartmodal() {
  cartItemsContainer.innerHTML = "";
  let total = 0;

  cart.forEach((item) => {
    const cartItemElement = document.createElement("div");
    cartItemElement.classList.add(
      "flex",
      "justify-between",
      "mb-4",
      "flex-col"
    );

    cartItemElement.innerHTML = `
    <div class="flex items-center justify-between mb-2">
      <div>
        <p class="font-medium">${item.name}</p>
        <p>Quantidade: ${item.quantity}</p>
        <p class="font-medium mt-2">R$ ${item.price.toFixed(2)}</p>
        <p class="font-medium mt-2">${item.observation}</p>
        </div>
      <button class="remove-from-cart-btn" data-name="${item.name}">
        Remover
      </button>
    </div>
    `;

    total += item.price * item.quantity;

    cartItemsContainer.appendChild(cartItemElement);
  });

  document
    .getElementById("delivery")
    .addEventListener("change", updatecartmodal);

  const delivery = parseFloat(document.getElementById("delivery").value);
  total += delivery;

  cartTotal.textContent = total.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  cartCounter.innerHTML = cart.length;
}

// funcao para adicionar no carrinho
function addtocart(name, price, obs) {
  const existingItem = cart.find((item) => item.name === name);

  if (existingItem) {
    // se o item ja existe a quantidade aumenta +1
    existingItem.quantity += 1;
  } else {
    cart.push({
      name,
      obs,
      price,
      quantity: 1,
    });
    console.log(cart);
  }

  updatecartmodal();
}

// funcao para remover item do carrinho
cartItemsContainer.addEventListener("click", function (event) {
  if (event.target.classList.contains("remove-from-cart-btn")) {
    const name = event.target.getAttribute("data-name");

    removeItemCart(name);
  }
});

function removeItemCart(name) {
  const index = cart.findIndex((item) => item.name === name);

  if (index !== -1) {
    const item = cart[index];

    if (item.quantity > 1) {
      item.quantity -= 1;
      updatecartmodal();
      return;
    }
    cart.splice(index, 1);
    updatecartmodal();
  }
}

addressInput.addEventListener("input", function (event) {
  let inputvalue = event.target.value;

  if (inputvalue !== "") {
    addressWarn.classList.add("hidden");
  }
});

nomeinput.addEventListener("input", function (event) {
  let inputvalue = event.target.value;

  if (inputvalue !== "") {
    addressWarnname.classList.add("hidden");
  }
});

cartTotal.addEventListener("click", function (event) {
  let inputvalue = event.target.value;

  if (inputvalue !== 0.0 || null || "" || undefined) {
    addressWarnOrder.classList.add("hidden");
  }
});

checkoutBtn.addEventListener("click", function () {
  const isOpen = checkrestauranteopen();

  if (!isOpen) {
    Toastify({
      text: "O restaurante está fechado no momento!",
      duration: 3000,
      close: true,
      gravity: "top", // `top` or `bottom`
      position: "left", // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        background: "#ef4444",
      },
    }).showToast();
    return;
  }

  if (cart.length === 0) {
    addressWarnOrder.classList.remove("hidden");
    return;
  }

  if (addressInput.value === "") {
    addressWarn.classList.remove("hidden");
    addressInput.classList.add("border-red-500");
    return;
  }

  if (nomeinput.value === "") {
    addressWarnname.classList.remove("hidden");
    nomeinput.classList.add("border-red-500");
    return;
  }

  const payment = document.getElementById("payment");
  const select = document.getElementById("delivery");
  const bairro = select.options[select.selectedIndex].textContent;
  const troco = document.getElementById("troco");

  const cartItems = cart
    .map((item) => {
      return `
      - ${item.name}
        Preço: R$${item.price.toFixed(2)}
        Qtd: ${item.quantity}
        Observação: ${item.obs}
       `;
    })
    .join("");

  let total = 0;
  cart.forEach((item) => {
    total += item.price * item.quantity;
  });
  const delivery = parseFloat(document.getElementById("delivery").value);
  total += delivery;

  const ordercart = `
    *Pedido de Cliente:*
    Nome: ${nomeinput.value}
    Forma de Pagamento: ${payment.value}
    Endereço: ${addressInput.value}, ${bairro}
    
    *Itens do Carrinho:*
    ${cartItems}

    *Total:*
    R$${total.toFixed(2)}

    *Troco*
    Precisa de troco para: R$${troco.value}

    *Obrigado por seu pedido! Entraremos em contato em breve para confirmar os detalhes.*
`;

  const encodedMessage = encodeURIComponent(ordercart);

  const phone = "47996202485";
  window.open(`https://wa.me/${phone}?text=${encodedMessage}`, "_blank");

  cart = [];
  updatecartmodal();
});

function checkrestauranteopen() {
  const data = new Date();
  const hours = data.getHours();
  const minutos = data.getMinutes();

  if (hours > 16 && hours < 22) {
    return true;
  } else if (hours === 18 && minutos >= 30) {
    return true;
  } else if (hours === 22 && minutos === 0) {
    return true;
  } else {
    return false;
  }
}

const spanItem = document.getElementById("data-span");
const isOpen = checkrestauranteopen();

if (spanItem) {
  if (isOpen) {
    spanItem.classList.remove("bg-red-600");
    spanItem.classList.add("bg-green-500");
  } else {
    spanItem.classList.remove("bg-green-500");
    spanItem.classList.add("bg-red-600");
  }
}

FetchApiDisplayProducts();
