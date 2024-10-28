import { createContext, useReducer, useState, ReactNode } from 'react';
import initialProduct from '../data/ProductData';

// Tipe produk
interface Product {
  id: number;
  name: string;
  description: string;
  image: string;
}

// Tipe action
interface ProductAction {
  type: string;
  payload?: Product | number;
}

// Aksi
const ADD_PRODUCT = 'ADD_PRODUCT';
const EDIT_PRODUCT = 'EDIT_PRODUCT';
const DELETE_PRODUCT = 'DELETE_PRODUCT';

// Reducer function
function productReducer(state: Product[], action: ProductAction): Product[] {
  switch (action.type) {
    case ADD_PRODUCT:
      return [...state, action.payload as Product];
    case EDIT_PRODUCT:
      return state.map((product) =>
        product.id === (action.payload as Product).id ? (action.payload as Product) : product
      );
    case DELETE_PRODUCT:
      return state.filter((product) => product.id !== (action.payload as number));
    default:
      return state;
  }
}

// Tipe Context
const ProductContext = createContext<{
  products: Product[];
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  addProduct: (product: Product) => void;
  editProduct: (product: Product) => void;
  deleteProduct: (productId: number) => void;
} | undefined>(undefined);

interface ProductProviderProps {
  children: ReactNode; 
}

function ProductProvider({ children }: ProductProviderProps) {
  const [products, dispatch] = useReducer(productReducer, initialProduct);
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  // Actions
  const addProduct = (newProduct: Product) => {
    dispatch({ type: ADD_PRODUCT, payload: newProduct });
  };

  const editProduct = (updatedProduct: Product) => {
    dispatch({ type: EDIT_PRODUCT, payload: updatedProduct });
  };

  const deleteProduct = (productId: number) => {
    dispatch({ type: DELETE_PRODUCT, payload: productId });
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        isModalOpen,
        openModal,
        closeModal,
        addProduct,
        editProduct,
        deleteProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export { ProductContext };
export default ProductProvider;