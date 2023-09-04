import { catalogo } from "./utilidades";

const idsProdutoCarrinhoQuantidade = { };

function abrirCarrinho() {
  document.getElementById("carrinho").classList.add("right-[0px]");
  document.getElementById("carrinho").classList.remove("right-[-360px]");
}

function fecharCarrinho() {
  document.getElementById("carrinho").classList.remove("right-[0px]");
  document.getElementById("carrinho").classList.add("right-[-360px]");
}

export function inicializarCarrinho() {
  const botaoFecharCarrinho = document.getElementById("fechar-carrinho");
  const botaoAbrirCarrinho = document.getElementById("abrir-carrinho");

  botaoFecharCarrinho.addEventListener("click", fecharCarrinho);
  botaoAbrirCarrinho.addEventListener("click", abrirCarrinho);
}

function renderizarProdutoCarrinho(){
    const  containerProdutosCarrinho = document.getElementById("produtos-carrinho");
    containerProdutosCarrinho.innerHTML = "";
    for(const idProduto in idsProdutoCarrinhoQuantidade){
        desenharProdutoCarrinho(idProduto);
    }
    
}

function removerCarrinho(idProduto){
    delete idsProdutoCarrinhoQuantidade[idProduto];
    renderizarProdutoCarrinho();
}

function incrementarQtdProduto(idProduto){
    idsProdutoCarrinhoQuantidade[idProduto]++;
    atualizarInformacaoQuantidade(idProduto);
}

function decrementarQtdProduto(idProduto){
    if(idsProdutoCarrinhoQuantidade[idProduto] === 1){
        removerCarrinho(idProduto);
        return;
    }
    idsProdutoCarrinhoQuantidade[idProduto]--;
    atualizarInformacaoQuantidade(idProduto);
}

function atualizarInformacaoQuantidade(idProduto){
    document.getElementById(`quantidade-${idProduto}`).innerText = idsProdutoCarrinhoQuantidade[idProduto];
}

function desenharProdutoCarrinho(idProduto){
    
    const produto = catalogo.find((p) => p.id === idProduto);

    const containerProdutosCarrinho = document.getElementById("produtos-carrinho");

    const elementoArticle = document.createElement('Article');
    const articleClasses = ["flex","bg-slate-100","rounded-lg","p-1","relative"];

    for(const articleClass of articleClasses){
        elementoArticle.classList.add(articleClass);
    }
    const cartaoProdutoCarrinho = `<button id="remover-item-${produto.id}" class="absolute top-0 right-2">
        <i class="fa-solid fa-circle-xmark text-slate-500 hover:text-slate-800"> </i>
        </button>
        <img src="./assets/img/${produto.imagem}" alt="Carrinho: ${produto.nome}" class="h-24 rounded-lg"
        />
        <div class="p-2 flex flex-col justify-between">
        <p class="text-slate-900 text-sm"> ${produto.nome}</p>
        <p class="text-slate-400 text-xs">Tamanho: M</p>
        <p class="text-green-700 text-lg">R$ ${produto.preco},00</p>
        </div>

        <div class="flex text-slate-950 items-end absolute bottom-0 right-2 text-lg">
            <button id='decrementar-produto-${produto.id}'> <i class="fa-solid fa-circle-minus"></i> </button>
            <p id='quantidade-${produto.id}' class="ml-2">${idsProdutoCarrinhoQuantidade[produto.id]}</p>
            <button id='incrementar-produto-${produto.id}'class="ml-2"> <i class="fa-solid fa-circle-plus"></i> </button>
        </div>`;
    elementoArticle.innerHTML = cartaoProdutoCarrinho;
    containerProdutosCarrinho.appendChild(elementoArticle);

    document.getElementById(`decrementar-produto-${produto.id}`).addEventListener('click',() => decrementarQtdProduto(produto.id));
    
    document.getElementById(`incrementar-produto-${produto.id}`).addEventListener('click',() => incrementarQtdProduto(produto.id));
    
    document.getElementById(`remover-item-${produto.id}`).addEventListener('click',() => removerCarrinho(produto.id));
}

export function adicionarCarrinho(idProduto) {

    if(idProduto in idsProdutoCarrinhoQuantidade){
        incrementarQtdProduto(idProduto);
        return;
    }

    idsProdutoCarrinhoQuantidade[idProduto] = 1;
    desenharProdutoCarrinho(idProduto);
   
}
