import { ReactNode } from "react";
import SearchButton from "../../common/SearchButton";
import "./ErrorContent.css";
type Props = {
  onClickModal: () => void;
  onClickNavBar: () => void;
} & { children?: ReactNode };

function ErrorContent({ children, onClickModal, onClickNavBar }: Props) {
  return (
    <div className="error-content pad">
      <div className="error-description">{children}</div>
      <div className="show-only-sm">
        <SearchButton onClick={onClickNavBar} />
      </div>
      <div className="show-only-lg">
        <SearchButton onClick={onClickModal} />
      </div>
    </div>
  );
}

export default ErrorContent;
