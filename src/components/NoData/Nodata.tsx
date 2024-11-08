import IconRenderer from "../Icon/IconRenderer";
import "./NoData.scss";

const NoData = () => {
  return (
    <div className="no-data-container">
      <IconRenderer name="nodata" />
      <span className="text">No Data found!!</span>
    </div>
  );
};

export default NoData;
