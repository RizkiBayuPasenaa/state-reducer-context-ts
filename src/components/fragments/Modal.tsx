// Modal.jsx
import Button from "../elements/Button";
import styles from "./Modal.module.css";
import Input from "../elements/Input";
import React, { useState, useEffect, useMemo } from "react";

const {modalContainer} = styles;

interface ModalProps {
  condition: string;
  product?: {
    id: number;
    name: string;
    description: string;
    image: string;
  } | null;
  onClose: () => void;
  onSubmit: (product: {
    id: number;
    name: string;
    description: string;
    image: string;
  }) => void;
}

function Modal({ condition, product, onClose, onSubmit }: ModalProps) {

  const initialState = useMemo(() => ({
    title: "",
    description: "",
    image: "",
  }), []);

  const [state, setState] = useState(initialState);

  useEffect(() => {
    if (product) {
      setState({
        title: product.name || "",
        description: product.description || "",
        image: product.image || "",
      });
    } else {
      setState(initialState); 
    }
  }, [product, initialState]); 

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newProductData = {
      id: product ? product.id : Date.now(), 
      name: state.title,
      description: state.description,
      image: state.image,
    };
    onSubmit(newProductData);
  };

  return (
    <div className={modalContainer}>
      <h3>{condition}</h3>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Title"
          name="title"
          value={state.title}
          onChange={handleChange}
        />
        <Input
          type="text"
          placeholder="Description"
          name="description"
          value={state.description}
          onChange={handleChange}
        />
        <Input
          type="text"
          placeholder="Image"
          name="image"
          value={state.image}
          onChange={handleChange}
        />
        <Button type="submit">Submit</Button>
        <Button type="button" onClick={onClose}>Cancel</Button>
      </form>
    </div>
  );
}


export default Modal;