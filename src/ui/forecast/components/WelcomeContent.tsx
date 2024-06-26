import SearchButton from "../../common/SearchButton";
import "./WelcomeContent.css";
type Props = {
  onClickModal: () => void;
  onClickNavBar: () => void;
};

function WelcomeContent({ onClickModal, onClickNavBar }: Props) {
  return (
    <div className="welcome-content pad">
      <h1> Welcome to Open Forecast</h1>
      <div className="welcome-description">
        You don't have any location yet.
        <br /> To get started, please tap on the button "Add Location"
        <br />
        Or select "Current Location" to allow geolocation
      </div>
      <div className="show-only-sm">
        <SearchButton onClick={onClickNavBar} />
      </div>
      <div className="show-only-lg">
        <SearchButton onClick={onClickModal} />
      </div>
    </div>
  );
}

export default WelcomeContent;
