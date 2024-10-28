import styles from "./Product.module.css";
import Card from "../fragments/Card";
import { useContext, useState } from "react";
import { ProductContext } from "../../context/ProductContext";
import Button from "../elements/Button";
import Modal from "../fragments/Modal";

function Product() {
  
  const context = useContext(ProductContext);

  if (!context) {
    throw new Error("ProductContext must be used within a ProductProvider");
  }

  const { products, isModalOpen, openModal, closeModal, addProduct, editProduct, deleteProduct } = context;
  const [addNew, setAddNew] = useState(false);
  const [editProductData, setEditProductData] = useState<{ id: number; name: string; description: string; image: string } | null>(null);

  const handleAddNewClick = () => {
    setAddNew(true);
    setEditProductData(null);
    openModal();
  };

  const handleEditClick = (product: { id: number; name: string; description: string; image: string }) => {
    setAddNew(false);
    setEditProductData(product);
    openModal();
  };
  
  const handleSubmit = (productData: { id: number; name: string; description: string; image: string }) => {
    if (addNew) {
      addProduct(productData);
    } else {
      editProduct(productData);
    }
    closeModal();
  };
  
  return (
    <>
      <Button type="button" onClick={handleAddNewClick}>Add new</Button>
      <div className={styles.productContainer}>
        {isModalOpen && (
          <Modal
            condition={addNew ? "Add Product" : "Edit Product"}
            product={editProductData}
            onClose={closeModal}
            onSubmit={handleSubmit}
          />
        )}
        {products.map((product) => (
          <Card
            key={product.id}
            title={product.name}
            description={product.description}
            img={product.image}
            deletedProduct={() => deleteProduct(product.id)}
            editProduct={() => handleEditClick(product)}
          />
        ))}
      </div>
    </>
  );
}

export default Product;
