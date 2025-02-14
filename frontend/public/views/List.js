const container = document.getElementById("container");
const OpenModalEdit = document.getElementById("OpenModalEdit");
const ModalEditdiv = document.getElementById("ModalEdit");

async function FetchApiMenu() {
  try {
    const url = "https://api-menu-eg3i.onrender.com/api/menu";
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`API resquest failed, status: ${response.status}`);
    }

    const menu = await response.json();

    menu.forEach((menu) => {
      const menuItens = document.createElement("div");
      menuItens.className = "flex gap-2";

      menuItens.innerHTML = `
        <div class="bg-gray-200 w-full p-4 rounded-lg border border-black">
                <ol class="space-y-3 mb-4 mt-4">
                 <li class="text-gray-700 hover:text-gray-900 transition duration-150 ease-in-out">
                        <span class="font-medium">ID: </span> ${menu.id}
                    </li>
                    <li class="text-gray-700 hover:text-gray-900 transition duration-150 ease-in-out">
                        <span class="font-medium">Nome: </span> ${menu.name}
                    </li>
                    <li class="text-gray-700 hover:text-gray-900 transition duration-150 ease-in-out">
                        <span class="font-medium">Descrição: </span> ${menu.description}
                    </li>
                    <li class="text-gray-700 hover:text-gray-900 transition duration-150 ease-in-out">
                        <span class="font-medium">Preço: </span> ${menu.price}
                    </li>
                    <li class="text-gray-700 hover:text-gray-900 transition duration-150 ease-in-out">
                        <span class="font-medium">Categoria: </span> ${menu.category}
                    </li>
                </ol>


              <!-- Botão para salvar alterações -->
        <div class="mt-4">
            <button type="button" onclick="OpenModal(${menu.id})" id="OpenModalEdit"
            class="w-full bg-blue-500 text-black py-2 px-4 rounded-md shadow hover:bg-bl-700">
            Editar
            </button>
        </div>
        <div class="mt-2">
          <form method="post" action="/cadastro/delete/id">
  <input type="hidden" name="id" value="${menu.id}">
  <button type="submit" class="w-full bg-red-500 text-black py-2 px-4 rounded-md shadow hover:bg-red-700">
    Excluir
  </button>
</form>
</div>
        `;

      container.appendChild(menuItens);
    });
  } catch (error) {
    console.log(error);
  }
}

async function ModalEdit(id) {
  try {
    const url = `https://api-menu-eg3i.onrender.com/api/menu/${id}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`API request failed, status:${response.status}`);
    }

    const menu = await response.json();

    const ModalEdit = document.getElementById("ModalEdit");

    ModalEdit.innerHTML = `
    <div class="fixed inset-0 bg-gray-200  bg-opacity-50 flex items-center justify-center">
    <!-- Conteúdo do Modal -->
    <div class="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
        <h1 class="text-2xl font-bold mb-6">Editar Produto</h1>
        <form id="editMenuForm" method="POST" action="/cadastro/editar/id">
            <!-- Campo ID -->
            <div class="hidden">
                <label for="id">${menu.id}</label>
                <input type="text" name="id" id="menu-id" value="${menu.id}">
            </div>

            <!-- Campo Nome -->
            <div>
                <label for="name" class="block text-sm font-medium text-gray-700">Nome</label>
                <input type="text" name="name" id="menu-name" placeholder="Nome do produto"  value="${menu.name}"
                    class="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
            </div>

            <!-- Campo Descrição -->
            <div>
                <label for="description" class="block text-sm font-medium text-gray-700">Descrição</label>
                <input type="text" name="description" id="menu-description" placeholder="Descrição do produto" value="${menu.description}"
                    class="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
            </div>

            <!-- Campo Preço -->
            <div>
                <label for="price" class="block text-sm font-medium text-gray-700">Preço</label>
                <input type="number" name="price" id="menu-price" placeholder="Preço do produto" value="${menu.price}"
                    class="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
            </div>

            <!-- Campo Categoria -->
            <div>
                <label for="category" class="block text-sm font-medium text-gray-700">Categoria</label>
                <input type="text" name="category" id="menu-category" placeholder="Categoria"  value="${menu.category}"
                    class="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
            </div>

            <!-- Botão de Enviar -->
            <div class="mt-6">
                <button type="submit" class="w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2" onclick="window.location.href='/cadastro/Lista'">
                    Salvar Alterações
                </button>
            </div>
        </form>

        <div class="mt-4">
            <button onclick="CloseModal()"
                class="w-full bg-red-600 text-white py-2 px-4 rounded-md shadow hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
                Fechar
            </button>
        </div>
    </div>
</div>
    `;
  } catch (error) {
    console.error(error);
  }
}

function OpenModal(id) {
  ModalEditdiv.classList.remove("hidden");
  ModalEdit(id);
}

function CadastroDelete(id) {
  CadastroDelete(id);
}

function CloseModal() {
  ModalEditdiv.classList.add("hidden");
}

FetchApiMenu();
