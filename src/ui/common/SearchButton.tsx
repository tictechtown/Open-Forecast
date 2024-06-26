import Icon from "../../assets/search-magnifying-glass.svg";
import styles from "./SearchButton.module.css";

type Props = {
  onClick: () => void;
};

function SearchButton({ onClick }: Props) {
  return (
    <button className={styles["search-btn"]} onClick={onClick}>
      <img src={Icon} alt="Your SVG" />
      <span className="search-btn-txt">Add Location</span>
    </button>
  );
}

export default SearchButton;
