import styles from './Products.module.css';
import Phones from "./Phones";
import Tablets from "./Tablets";
import Computers from "./Computers";
import Displays from "./Displays";
import Watches from "./Watches";

export default function Products() {
  
  return (
    <div id="products" className={styles.proarea}>
      <Phones />
      <Tablets />
      <Computers />
      <Displays />
      <Watches />
    </div>
  );
}