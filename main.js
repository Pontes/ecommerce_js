import { renderizarCatalogo } from "./src/cartaoProduto";
import { inicializarFiltros } from "./src/filtrosCatalogos";
import { atualizarPrecoCarrinho, inicializarCarrinho, renderizarProdutoCarrinho } from "./src/menuCarrinho";


renderizarCatalogo();
inicializarCarrinho();
renderizarProdutoCarrinho();
atualizarPrecoCarrinho();
inicializarFiltros();

