import { useContext } from "react";
import "./BredCrumbs.scss";
import IconRenderer from "../Icon/IconRenderer";
import { BreadCrumbContext } from "../../services/Context/Context";
import { Link } from "react-router-dom";

export const Breadcrumbs = () => {
  const breadCrumbs = useContext(BreadCrumbContext);
  const crumb = breadCrumbs.breadCrumb;

  return (
    <div className="bread-crumbs">
      {crumb &&
        crumb?.breadCrumbsData &&
        crumb?.breadCrumbsData?.length > 0 &&
        crumb.breadCrumbsData.map((crumb: any, index: number) => {
          return (
            <div key={crumb.url || index} className="crumb">
              {index > 0 && <IconRenderer name={"breadcrumbsLayers"} />}
              {crumb.url ? (
                <Link to={crumb.url}>{crumb.label}</Link>
              ) : (
                // <span className="crumb-active">{crumb.label}</span>
                <div className="crumb-active">{crumb.label}</div>
              )}
            </div>
          );
        })}
    </div>
  );
};
