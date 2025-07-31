import { useContext } from "react";
import { CarrinhoContext } from "@/context/CarrinhoContext";

export const useCarrinhoContext = () => {
  const { carrinho, setCarrinho } = useContext(CarrinhoContext);

  function adicionarProduto(novoProduto) {
    const temOProduto = carrinho.some((itemDoCarrinho) => {
      itemDoCarrinho.id === novoProduto.id;
    });

    if (!temOProduto) {
      novoProduto.quantidade = 1;
      return setCarrinho([...carrinho, novoProduto]);
    } else {
      setCarrinho((carrinhoAnterior) =>
        carrinhoAnterior.map((itemDoCarrinho) => {
          if (itemDoCarrinho.id === novoProduto.id) itemDoCarrinho.quantidade++;
          return itemDoCarrinho;
        })
      );
    }
  };

  function removerProduto(id) {
    const produto = carrinho.find((itemDoCarrinho) => itemDoCarrinho.id === id);
    const ehOUltimo = produto.quantidade === 1;
    if (ehOUltimo) {
      return setCarrinho((carrinhoAnterior) => carrinhoAnterior.filter((itemDoCarrinho) => itemDoCarrinho.id !== id));
    }
  }

  setCarrinho((carrinhoAnterior) =>
    carrinhoAnterior.map((itemDoCarrinho) => {
      if (itemDoCarrinho.id === id) itemDoCarrinho.quantidade--;
      return itemDoCarrinho;
    })
  );

  return {
    carrinho,
    setCarrinho,
    adicionarProduto,
    removerProduto,
  };
};
