import { desenharProdutoCarrinhoSimples, lerLocalStorage } from "./src/utilidades";

function desenharProdutosCheckout(){
    const idsProdutoCarrinhoQuantidade = lerLocalStorage("carrinho");
    for(const idProduto in idsProdutoCarrinhoQuantidade){
        desenharProdutoCarrinhoSimples(idProduto, "container-produtos-checkout", idsProdutoCarrinhoQuantidade[idProduto]);
    }
}

desenharProdutosCheckout();