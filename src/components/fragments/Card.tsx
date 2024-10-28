import Button from "../elements/Button";
import styles from "./Card.module.css";

interface CardProps {
  img: string;
  title: string;
  description: string;
  deletedProduct: () => void;
  editProduct: () => void;
}

function Card(props: CardProps) {
  const {
    img, title, description, deletedProduct, editProduct
  } = props;

  return (
    <div className={styles.cardContainer}>
      {img ? <div className={styles.cardHeader}>
          <img src={img} alt="img" />
        </div> : null}
      <div className={styles.cardBody}>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      <div className="card-footer">
        <Button onClick={() => {}}type="button">
          Detail
        </Button>
        <Button type="button" onClick={editProduct}>
          Edit
        </Button>
        <Button type="button" onClick={deletedProduct}>
          Delete
        </Button>
      </div>
    </div>
  )
}

export default Card;