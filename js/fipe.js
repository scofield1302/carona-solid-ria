let tipoVeiculo = "carros"; // Pode ser "motos", "caminhoes", ou "carros"

async function carregarMarcasBrasilAPI() {
  const select = document.getElementById("vehicleAssembler");
  select.innerHTML = "<option value=''>Carregando marcas...</option>";

  try {
    // Faz a requisição para buscar as marcas
    const response = await fetch("https://brasilapi.com.br/api/fipe/marcas/v1/carros");
    const marcas = await response.json();

    // Limpa as opções e adiciona a primeira opção "Selecione uma marca"
    select.innerHTML = "<option value=''>Selecione uma marca</option>";

    marcas.forEach(marca => {
      const option = document.createElement("option");
      option.value = marca.valor;  // Usa o valor da marca (código único da marca)
      option.textContent = marca.nome;  // Nome da marca
      select.appendChild(option);
    });
  } catch (error) {
    console.error("Erro ao carregar marcas:", error);
    select.innerHTML = "<option value=''>Erro ao carregar marcas</option>";
  }
}

async function carregarModelosBrasilAPI(codigoMarca) {
  const selectModel = document.getElementById("vehicleModel");

  if (!codigoMarca) {
    selectModel.innerHTML = "<option value=''>Selecione uma marca primeiro</option>";
    return;
  }

  selectModel.innerHTML = "<option value=''>Carregando modelos...</option>";

  try {
    // Faz a requisição para buscar os modelos da marca escolhida
    const url = `https://brasilapi.com.br/api/fipe/veiculos/v1/${tipoVeiculo}/${codigoMarca}`;
    console.log("URL da requisição para modelos:", url);  // Verificando a URL que está sendo chamada

    const response = await fetch(url);
    const data = await response.json();

    console.log("Resposta da API de modelos:", data);  // Exibindo a resposta completa para diagnóstico

    if (data && data.length > 0) {
      selectModel.innerHTML = "<option value=''>Selecione um modelo</option>";

      data.forEach(item => {
        const option = document.createElement("option");
        option.value = item.modelo;  // Nome do modelo
        option.textContent = item.modelo;  // Nome do modelo
        selectModel.appendChild(option);
      });
    } else {
      selectModel.innerHTML = "<option value=''>Nenhum modelo encontrado</option>";
      console.log("Nenhum modelo encontrado para a marca", codigoMarca);
    }
  } catch (error) {
    console.error("Erro ao carregar modelos:", error);
    selectModel.innerHTML = "<option value=''>Erro ao carregar modelos</option>";
  }
}

// Detectar mudança na marca
document.addEventListener("DOMContentLoaded", () => {
  carregarMarcasBrasilAPI();

  const selectMarca = document.getElementById("vehicleAssembler");
  selectMarca.addEventListener("change", async (event) => {
    const codigoMarcaSelecionada = event.target.value;  // Obtendo o código da marca selecionada
    console.log("Código da marca selecionada:", codigoMarcaSelecionada); // Verificando o código da marca selecionada

    if (codigoMarcaSelecionada) {
      // Carregar os modelos baseados no código da marca selecionada
      carregarModelosBrasilAPI(codigoMarcaSelecionada);
    } else {
      // Limpar o campo de modelos se a marca não for selecionada
      document.getElementById("vehicleModel").innerHTML = "<option value=''>Selecione uma marca primeiro</option>";
    }
  });

  const selectModelo = document.getElementById("vehicleModel");
  selectModelo.addEventListener("change", (event) => {
    const codigoModeloSelecionado = event.target.value;  // Pegando o código do modelo selecionado
    console.log("Código do modelo selecionado:", codigoModeloSelecionado);
  });
});
