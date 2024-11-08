import "./Settings.scss";
import { useContext, useEffect, useState } from "react";
import { BreadCrumbContext } from "../../services/Context/Context";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Api from "../../services/Axios/ApiInstance";
import { SettingsModal } from "../../services/Interface/SettingsModal";
import { errorToast, successToast } from "../../util/util";
import { CircularProgress } from "@mui/material";

const Settings = () => {
  const api = new Api();

  const [apiEndpoint, setApiEndpoint] = useState();
  const [isEditing, setIsEditing] = useState(false);
  const [tempApiEndpoint, setTempApiEndpoint] = useState<any>(apiEndpoint);
  const [controller, setController] = useState({
    page: 0,
    rowsPerPage: 10,
  });
  const [settingsList, setSettingsList] = useState<SettingsModal[]>();
  const [settingsCount, setSettingsCount] = useState();
  const [btnLoader, setBtnLoader] = useState(false);
  const header = {
    Icon: "SettingIconBlack",
    title: "Settings",
    breadCrumbsData: [],
  };

  const BreadCrumbs = useContext(BreadCrumbContext);

  useEffect(() => {
    BreadCrumbs.setBreadCrumb(header);
  }, []);

  useEffect(() => {
    getSettingList();
  }, []);

  const getSettingList = async () => {
    const params = {
      page: controller.page + 1,
      per_page: controller.rowsPerPage,
    };
    try {
      const res = await api.get("/setting/list", true, params);
      setSettingsList(res.data.data);
      setSettingsCount(res.data.meta.total_rows);
    } catch (error) {}
  };

  const editSettings = async () => {
    setBtnLoader(true);
    const payload = {
      end_point: tempApiEndpoint,
    };

    try {
      const res = await api.put("/setting/upsert", payload, true);
      console.log(res);
      setBtnLoader(false);
      getSettingList();
      successToast(
        res?.data?.data?.message
          ? res?.data?.data?.message
          : "Updated successfully!"
      );
    } catch (error) {
      errorToast("Something went worng!");
      setBtnLoader(false);
    }
  };

  const handleEditClick = (data?: string) => {
    setTempApiEndpoint(data);
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    // setApiEndpoint(tempApiEndpoint);
    editSettings();
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTempApiEndpoint(e.target.value);
  };

  return (
    <div>
      <div className="setting-list-title">List of settings</div>
      <div className="setting-list-container">
        {settingsList &&
          settingsList.length > 0 &&
          settingsList.map((data, index) => {
            return (
              <div className="setting-list-item" key={data.uuid}>
                <div className="setting-list-item-title">Api end point :</div>
                {isEditing ? (
                  <div className="list-item-row ">
                    <div className="input-row-container w-50">
                      <TextField
                        className="input-field-50 w-100"
                        id="api-endpoint"
                        name="api-endpoint"
                        value={tempApiEndpoint}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="button-container button-settings">
                      <Button
                        type="button"
                        className="default-btn"
                        onClick={handleSaveClick}
                      >
                        {btnLoader ? "Saving..." : "Save"}
                      </Button>
                      <Button
                        type="button"
                        className="secondary-button w-100"
                        onClick={handleCancelClick}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="list-item-row">
                    <div>{data?.end_point}</div>
                    <div className="button-container button-settings">
                      <Button
                        type="button"
                        className="default-btn"
                        onClick={() => handleEditClick(data?.end_point)}
                      >
                        Edit
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Settings;
