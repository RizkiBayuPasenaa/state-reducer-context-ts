import Product from "./components/layouts/Product";
import ProductProvider from "./context/ProductContext";

function App() {
  return (
    <ProductProvider>
      <Product />
    </ProductProvider>
  );
}

export default App;