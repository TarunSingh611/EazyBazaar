import style from "./ProductPage.module.css";
import load from "../../api/getHomeProduct";
import { useEffect, useState } from "react";
import AppendProd from "../../component/ProdHome";
import getProd from "../../api/getProdDet";
import GenPop from "../../component/GenPop";
import { toast } from "react-toastify";

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [prodload, setLoad] = useState(true);

  const [pop, setPop] = useState(false);
  function loadMore() {
    load(products.length)
      .then((result) => {
        if (result.length == 0) {
          setLoad(false);
          toast.info("End of product List");
        }

        setProducts([...products, ...result]);
      })
      .catch((error) => {
        console.error("An error occurred:", error);
      });
  }

  useEffect(() => {
    load(products.length)
      .then((result) => {
        setProducts([...products, ...result]);
      })
      .catch((error) => {
        console.error("An error occurred:", error);
      });
    // eslint-disable-next-line
  }, []);

  const showDetails = async (item) => {
    try {
      const prod = await getProd(item.id);

      setPop(prod);
    } catch (error) {
      // Handle any errors that occurred during the request
      console.error(error);
    }
  };
  // genPop function

  function funPop() {
    setPop(false);
  }

  return (
    <div className={style.homeBody}>
      <div className={style.productList}>
        {products.map((item) => {
          return (
            <AppendProd item={item} key={item.id} showDetails={showDetails} />
          );
        })}
      </div>

      {pop ? <GenPop item={pop} funPop={funPop} /> : null}

      {prodload && (
        <button
          className={style.loadMore}
          onClick={() => {
            loadMore();
          }}
        >
          load more
        </button>
      )}
    </div>
  );
};

export default ProductPage;
