import React, { useContext, useEffect, useState } from "react";
import "./LocateGadget.scss";
import { BreadCrumbContext } from "../../services/Context/Context";
import {
  Autocomplete,
  Button,
  Checkbox,
  CircularProgress,
  MenuItem,
  TextField,
} from "@mui/material";
import Api from "../../services/Axios/ApiInstance";
import {
  CustomerDetailsModal,
  CustomerModal,
} from "../../services/Interface/CustomerModal";
import { GadgetModal } from "../../services/Interface/GadgetModal";
import IconRenderer from "../../components/Icon/IconRenderer";
import { EmergencyContactmodal } from "../../services/Interface/EmergencyContactModal";
import { errorToast, successToast } from "../../util/util";
import { useFormik } from "formik";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { useNavigate } from "react-router-dom";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
const LocateGadget: React.FC = () => {
  const header = {
    Icon: "LocateIconBlack",
    title: "Locate Gadget",
    breadCrumbsData: [],
  };
  const [userDataFromLocalStorage, setUserDataFromLocalStorage] =
    useState<any>();
  const BreadCrumbs = useContext(BreadCrumbContext);
  useEffect(() => {
    BreadCrumbs.setBreadCrumb(header);
    const userData = localStorage.getItem("user");
    if (userData) {
      setUserDataFromLocalStorage(JSON.parse(userData));
    }
  }, []);

  const api = new Api();
  const [customerList, setCustomerList] = useState<CustomerModal[]>();
  const [customerAutoList, setCustomerAutoList] = useState<any>();
  const [gadgetList, setgadgetList] = useState<GadgetModal[]>();
  const [Location, setLocationList] = useState<any>();
  const [selectedCustomer, setSelectedCustomer] = useState<any>();
  const [selectedGadget, setSelectedGadget] = useState<any>();
  const [selectedContact, setSelectedContact] = useState<any>();
  const [addressList, setAddressList] = useState<any>();
  const [showGadgetField, setShowGadgetField] = useState<any>(false);
  const [emergencyContactList, setemergencyContactList] = useState<
    EmergencyContactmodal[]
  >([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [emergencyGadget, setEmergencyGadget] = useState<any>();
  const [selectedGadgetUuid, setSelectedGadgetUuid] = useState<any>();

  useEffect(() => {
    // fetchCustomerList();
  }, []);

  // const fetchCustomerList = async () => {
  //   isAdmin && setShowGadgetField(true);
  //   try {
  //     const params = {
  //       dropdown: true,
  //     };
  //     const res = await api.get("/customer/list", true, params);
  //     setCustomerList(res.data.data);
  //     console.log(
  //       res.data.data.map((data: any) => {
  //         return `${data.first_name} ${data.last_name}`;
  //       })
  //     );
  //     setCustomerAutoList(
  //       res.data.data.map((data: any) => {
  //         return `${data.first_name} ${data.last_name}`;
  //       })
  //     );
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const handleKeyPress = async (e: React.KeyboardEvent) => {
    isAdmin && setShowGadgetField(true);
    if (e.key === "Enter") {
      e.preventDefault();
      try {
        const params: any = {};
        if (formik.values.mobile_no) {
          params.mobile_no = formik.values.mobile_no;
        }
        if (formik.values.gadget_id) {
          params.gadget_id = formik.values.gadget_id;
        }
        const res = await api.get("/gadget_location/list", true, params);
        // fetchContactList()
        setLocationList(res.data.data);
        // setgadgetList(res.data.data);
        setemergencyContactList(res?.data?.data);
        // setAddressList(res.data.data.gadget_location);
        if (res.data.data.gadget_location) {
          // Sort the gadget_location array by created_at before setting it to state
          const sortedAddressList = res.data.data.gadget_location.sort(
            (a: any, b: any) =>
              new Date(b.created_at).getTime() -
              new Date(a.created_at).getTime()
          );
          setAddressList(sortedAddressList);
        }
        fetchContactList(res?.data?.data?.uuid);
      } catch (error) {
        errorToast(
          `${
            formik.values.gadget_id
              ? "Incorrect Gadget IMEI..!"
              : "Incorrect Gadget Number..!"
          }`
        );
        console.error(error);
        // setShowGadgetField(true);
      }
    }
  };

  const fetchGadgetList = async (id: any) => {
    try {
      const params = {
        dropdown: true,
        customer_uuid: id,
      };
      const res = await api.get("/gadget/list", true, params);
      setgadgetList(res.data.data);

      !isAdmin && setSelectedGadget(res?.data?.data[0]?.gadget_id);

      // fetchLocationList(res?.data?.data[0]?.gadget_id, id);
      !isAdmin && fetchLocationList(res?.data?.data[0]?.gadget_id);
      !isAdmin && setShowGadgetField(true);
    } catch (error) {
      console.error(error);
      setShowGadgetField(true);
    }
  };

  const fetchLocationList = async (id?: any, customerId?: any) => {
    try {
      const params = {
        gadget_id: id,
      };
      const res = await api.get("/gadget_location/list", true, params);

      // setAddressList(res.data.data.gadget_location);
      if (res.data.data.gadget_location) {
        // Sort the gadget_location array by created_at before setting it to state
        const sortedAddressList = res.data.data.gadget_location.sort(
          (a: any, b: any) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
        setAddressList(sortedAddressList);
      }
      setLocationList(res.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  // const handleCustomerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   console.log("evebt", event);

  //   setSelectedCustomer(event.target.value);
  //   setSelectedGadget(null);
  //   setAddressList(null);
  //   setLocationList(null);
  //   fetchGadgetList(event.target.value);
  // };

  const handleCustomerChange = (
    event: React.SyntheticEvent,
    value: CustomerModal | null
  ) => {
    if (value) {
      setSelectedCustomer(value.uuid);
      setSelectedGadget(null);
      setAddressList(null);
      setLocationList(null);
      fetchGadgetList(value.uuid);
    } else {
      setSelectedCustomer(null);
      setSelectedGadget(null);
      setAddressList(null);
      setLocationList(null);
    }
  };

  const handleGadgetChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSelectedGadget(event.target.value);
    setAddressList(null);
    setLocationList(null);
    isAdmin
      ? await fetchLocationList(event.target.value)
      : await fetchLocationList(
          event.target.value,
          userDataFromLocalStorage?.uuid
        );

    // fetchContactList(event.target.value);
    const selectedGadget =
      gadgetList &&
      gadgetList.find((gadget) => gadget.gadget_id == event.target.value);

    // Check if the gadget was found
    if (selectedGadget) {
      // Pass the UUID to the fetchContactList function
      fetchContactList(selectedGadget.uuid);
    } else {
      console.error("Gadget not found!");
    }
  };

  const [selectedLocation, setSelectedLocation] = useState({
    latitude: 40.73061,
    longitude: -73.935242,
  });

  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(
    null
  );

  const handleSelectAddress = (
    latitude: number,
    longitude: number,
    id: number
  ) => {
    setSelectedLocation({ latitude, longitude });
    setSelectedAddressId(id);
  };
  const userRoles = userDataFromLocalStorage?.role;
  const isAdmin = userRoles?.includes("super_admin");

  useEffect(() => {
    if (!isAdmin) {
      customerFlow();
    }
  }, []);

  const customerFlow = async () => {
    let getMe;
    try {
      getMe = await api.get("/user/me", true);
    } catch (error) {
      console.error(error);
    }
    fetchGadgetList(getMe?.data?.data?.uuid);
  };
  /**
   * Date formate handler
   * @param {*} inputDate
   * @returns DD/MM/YYY Date formate
   */
  const formatDate = (inputDate: any) => {
    const date = new Date(inputDate);
    const day = String(date.getUTCDate()).padStart(2, "0");
    const month = String(date.getUTCMonth() + 1).padStart(2, "0");
    const year = date.getUTCFullYear();
    return `${day}/${month}/${year}`;
  };
  /**
   * Time format handler
   * @param {*} inputDate
   * @returns HH:MM:SS Time format
   */
  const formatTime = (inputDate: any) => {
    const date = new Date(inputDate);
    const hours = String(date.getUTCHours()).padStart(2, "0");
    const minutes = String(date.getUTCMinutes()).padStart(2, "0");
    const seconds = String(date.getUTCSeconds()).padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  /**
   * Get Contact Api call
   */
  const fetchContactList = async (id?: any) => {
    const params: any = {
      // gadget_uuid: selectedGadgetUuid,
      gadget_uuid: id,
      dropdown: true,
    };

    // params["gadget_uuid"] = id;

    try {
      const res = await api.get("/emergency_contact/list", true, params);
      setemergencyContactList(res.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const cleardata = () => {
    setLocationList(null);
    setAddressList(null);
  };
  const handleSend = async () => {
    if (selectedContact && selectedContact?.length > 0) {
      try {
        const payload = {
          emergency_contact_uuid: selectedContact,
          gadget_uuid: Location?.uuid,
        };
        setLoading(true);
        const res = await api.post("/alert/send", payload, true);
        setLoading(false);
        successToast(res?.message);
        setSelectedContact(null);
      } catch (error) {
        errorToast("Something went wrong!");
        setLoading(false);
      }
    } else {
      errorToast("Please select at least one emergency contact");
    }
  };
  const validate = (values: CustomerDetailsModal) => {
    const errors: CustomerDetailsModal = {};
  };

  const formik = useFormik({
    initialValues: {
      gadget_id: "",
      gadget_count: "",
      mobile_no: "",
    },
    validate,

    onSubmit: async (values) => {
      const params = {
        gadget_id: values.gadget_id,
        mobile_no: values.mobile_no,
      };
    },
  });

  return (
    <>
      <div className="locate-gadget-container">
        <div className="address-list">
          {/* {isAdmin && (
            <TextField
              className="input-field-locate"
              select
              id="customer"
              name="customer"
              label="Customer*"
              value={selectedCustomer}
              onChange={handleCustomerChange}
            >
              {customerList && customerList.length > 0 ? (
                customerList.map((data, index) => {
                  return (
                    <MenuItem
                      value={data.uuid}
                      key={data.uuid}
                      className="customer-li"
                    >
                      <div>
                        {data?.first_name
                          ? `${data?.first_name} ${data?.last_name}`
                          : "-"}
                      </div>
                      <div className="email">
                        {data?.email ? `${data?.email} ` : "Email"}
                      </div>
                    </MenuItem>
                  );
                })
              ) : (
                <MenuItem value="No Data Available" key="1" disabled>
                  No customer available
                </MenuItem>
              )}
            </TextField>
          )} */}

          {isAdmin && (
            <>
              <form>
                <div className="input-row-container">
                  <TextField
                    className="input-field-50 input-width"
                    id="gadget_id"
                    name="gadget_id"
                    label="Gadget IMEI*"
                    value={formik.values.gadget_id}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    onFocus={() => {
                      // formik.setFieldValue("mobile_no", "");
                      if(formik.values.mobile_no){
                        cleardata();
                      }
                    }}
                    error={
                      formik.touched.gadget_id &&
                      Boolean(formik.errors.gadget_id)
                    }
                    helperText={
                      formik.touched.gadget_id && formik.errors.gadget_id
                    }
                    onKeyDown={(e) => handleKeyPress(e)}
                  />
                </div>
                <div className="OR-btn">OR</div>
                <div className="input-row-container">
                  <TextField
                    className="input-field-50 input-width"
                    id="mobile_no"
                    name="mobile_no"
                    label="Gadget Number*"
                    value={formik.values.mobile_no}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    onFocus={() => {
                      // formik.setFieldValue("gadget_id", "");
                      if(formik.values.gadget_id){
                        cleardata();
                      }
                    }}
                    error={
                      formik.touched.mobile_no &&
                      Boolean(formik.errors.mobile_no)
                    }
                    helperText={
                      formik.touched.mobile_no && formik.errors.mobile_no
                    }
                    onKeyDown={(e) => handleKeyPress(e)}
                  />
                </div>
              </form>
            </>
          )}

          {/* {isAdmin && customerList && (
            <Autocomplete
              // disablePortal
              id="combo-box-demo"
              options={customerList}
              className="input-field-locate"
              autoHighlight
              // getOptionLabel={(option) =>
              //   `${option.first_name} ${option.last_name} `
              // }
              getOptionLabel={(option) => `${option.first_name}`}
              onChange={handleCustomerChange}
              renderOption={(props, customerList) => {
                return (
                  <ListItem
                    {...props}
                    className="custom-autocomplete"
                    key={customerList.uuid}
                  >
                    <Typography className="custom-option-text">
                      {`${customerList.first_name} ${customerList.last_name}`}
                    </Typography>
                    <Typography className="custom-option-email">
                      {customerList.email}
                    </Typography>
                  </ListItem>
                );
              }}
              renderInput={(params) => (
                <TextField {...params} label="Customer" />
              )}
            />
          )} 
           */}

          {!isAdmin && (
            <div className="addresslist-title">Locate Gadget Request </div>
          )}
          {!isAdmin && (
            <div className="customer-gadget-details">
              <div className="customer-details">
                <div>
                  <strong>Send message:</strong>{" "}
                  {
                    "Locate/IMEI number/Gadget Number on 8889994589 or 7842797014 to locate gadget request"
                  }
                </div>
                <div className="customer-locate">
                  <strong>Example:</strong>{" "}
                  {
                    "Locate/864654434356236/57474582378428 to 8889994589 or 7842797014"
                  }
                </div>
              </div>
            </div>
          )}

          {!isAdmin && showGadgetField && (
            <TextField
              className="input-field-locate mb-locate-gadget-05"
              select
              id="gadget"
              name="gadget"
              label="Gadget*"
              disabled={isAdmin ? !selectedCustomer : false}
              value={selectedGadget}
              onChange={handleGadgetChange}
            >
              {gadgetList && gadgetList.length > 0 ? (
                gadgetList.map((data, index) => {
                  return (
                    <MenuItem
                      value={data.gadget_id}
                      key={data.gadget_id}
                      onClick={() => {
                        setSelectedGadgetUuid(data.uuid);
                      }}
                    >
                      {data?.name ? data?.name : "-"}
                    </MenuItem>
                  );
                })
              ) : (
                <MenuItem value="No Data Available" key="1" disabled>
                  No gadget available
                </MenuItem>
              )}
            </TextField>
          )}

          {Location && (
            <div className="customer-gadget-details">
              {/* <div className="customer-details">
                <div>
                  <strong>Customer Name:</strong>{" "}
                  {Location.customer_detail.first_name}{" "}
                  {Location.customer_detail.last_name}
                </div>
                <div>
                  <strong>Email:</strong> {Location.customer_detail.email}
                </div>
              </div> */}
              <div className="gadget-details">
                <div>
                  <strong>Gadget Name:</strong> {Location.name}
                </div>
                <div>
                  <strong>Gadget Number:</strong> {Location.mobile_no}
                </div>
                <div>
                  <strong>Description:</strong>{" "}
                  {Location.description ? Location.description : "-"}
                </div>
                <div>
                  <strong>Gadget IMEI:</strong> {Location.gadget_id}
                </div>
                <div>
                  <strong>Gadget last updated date:</strong>{" "}
                  {Location?.updated_at
                    ? formatDate(Location?.updated_at)
                    : formatDate(Location?.created_at)}
                </div>
                <div>
                  <strong>Gadget last updated time:</strong>{" "}
                  {Location?.updated_at
                    ? formatTime(Location?.updated_at)
                    : formatTime(Location?.created_at)}
                </div>
              </div>
            </div>
          )}

          {Location && isAdmin && (
            <div className="emergency-contact-container">
              {/*
               <TextField
                className="input-field-locate mb-locate-gadget-05 width-70"
                select
                id="gadget"
                name="gadget"
                label="Send Last Location to*"
                value={selectedContact}
                onChange={(e) => setSelectedContact(e.target.value)}
              >
                {emergencyContactList && emergencyContactList.length > 0 ? (
                  emergencyContactList.map((data, index) => {
                    return (
                      <MenuItem
                        value={data.uuid}
                        key={data.whatsapp_mobile_no}
                        onClick={() => setEmergencyGadget(data.gadget_uuid)}
                      >
                        {data?.first_name ? data?.first_name : "-"}{" "}
                        {data?.last_name ? data?.last_name : "-"} -{" "}
                        {data?.whatsapp_mobile_no
                          ? data?.whatsapp_mobile_no
                          : "-"}
                      </MenuItem>
                    );
                  })
                ) : (
                  <MenuItem value="No Data Available" key="1" disabled>
                    No contacts available
                  </MenuItem>
                )}
              </TextField> 
              */}
              <Autocomplete
                multiple
                id="checkboxes-tags-demo"
                className="checkbox-width"
                onChange={(e, value) =>
                  setSelectedContact(
                    value.map((x) => {
                      return x.uuid;
                    })
                  )
                }
                options={emergencyContactList}
                disableCloseOnSelect
                getOptionLabel={(option) => `${option.first_name}`}
                renderOption={(props, option, { selected }) => {
                  const { ...optionProps } = props;
                  return (
                    <li {...optionProps} key={option?.uuid}>
                      <Checkbox
                        icon={icon}
                        // key={option.gadget_id}
                        checkedIcon={checkedIcon}
                        style={{ marginRight: 8 }}
                        checked={selected}
                        onClick={() => setEmergencyGadget(option.gadget_uuid)}
                      />
                      {option?.first_name ? option?.first_name : "-"}{" "}
                      {option?.last_name ? option?.last_name : "-"} -{" "}
                      {option?.whatsapp_mobile_no
                        ? option?.whatsapp_mobile_no
                        : "-"}
                    </li>
                  );
                }}
                renderInput={(params) => (
                  <TextField {...params} label="Send Last Location to*" />
                )}
              />
              <Button className="default-btn" onClick={handleSend}>
                {loading ? (
                  <>
                    <CircularProgress
                      className="button-loader"
                      size={14}
                      color="inherit"
                    />
                    {"Sending..."}
                  </>
                ) : (
                  " Send"
                )}
              </Button>
            </div>
          )}

          {Location && (
            <div className="addresslist-title">List of Addresses</div>
          )}

          <ul>
            {addressList &&
              addressList.length > 0 &&
              addressList.map((address: any, index: number) => {
                return (
                  <li
                    key={address.uuid}
                    onClick={() =>
                      handleSelectAddress(
                        address.latitude,
                        address.longitude,
                        address.uuid
                      )
                    }
                    className={`li-class ${
                      selectedAddressId === address.uuid ? "selected" : ""
                    }`}
                  >
                    <div className="address-card-name">
                      {address.device_name}
                    </div>
                    <div className="address-card-lat-long">
                      <div>
                        Latitude: <span>{address.latitude}</span>
                      </div>
                      <div>
                        Longitude: <span>{address.longitude}</span>
                      </div>
                    </div>
                  </li>
                );
              })}
            {addressList && addressList.length <= 0 && (
              <>
                <IconRenderer name="nodata" />
                <div className="text locate-align-center">No Alert found!!</div>
              </>
            )}
          </ul>
          {/* <ul>
            {addressList &&
              addressList
                .sort(
                  (a: any, b: any) =>
                    new Date(b.created_at).getTime() -
                    new Date(a.created_at).getTime()
                ) // Sort by created_at descending
                .map((address: any, index: number) => {
                  return (
                    <li
                      key={address.uuid}
                      onClick={() =>
                        handleSelectAddress(
                          address.latitude,
                          address.longitude,
                          address.uuid
                        )
                      }
                      className={`li-class ${
                        selectedAddressId === address.uuid ? "selected" : ""
                      }`}
                    >
                      <div className="address-card-name">
                        {address.device_name}
                      </div>
                      <div className="address-card-lat-long">
                        <div>
                          Latitude: <span>{address.latitude}</span>
                        </div>
                        <div>
                          Longitude: <span>{address.longitude}</span>
                        </div>
                      </div>
                    </li>
                  );
                })}
            {addressList && addressList.length <= 0 && (
              <>
                <IconRenderer name="nodata" />
                <div className="text locate-align-center">No Alert found!!</div>
              </>
            )}
          </ul> */}
        </div>
        <div className="map-container">
          <iframe
            width="100%"
            height="100%"
            frameBorder="0"
            style={{ border: 0 }}
            src={`https://www.google.com/maps?q=${selectedLocation.latitude},${selectedLocation.longitude}&z=15&output=embed`}
            allowFullScreen
            title="Google Map"
          />
        </div>
      </div>
    </>
  );
};

export default LocateGadget;
