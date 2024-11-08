export interface EmergencyContactmodal
 {
  whatsapp_mobile_no?: string ,
  mobile_no?: string ,
  created_at?: string,
  last_name?: string ,
  first_name?: string ,
  uuid?: string ,
  gadget_uuid?: string ,
  email?: string ,
  gadget_name?: string ,
  description?: string ,
  updated_at?:string,
  gadget_id?:string
  }

  export interface EmergencyFormModal {
    email?: string;
    mobilenumber?: string;
    firstname?: string;
    lastname?: string;
    whatsappnumber?: string;
    emergency_contact_uuid?:string;
    gadget?:string 
  }

  export interface EmergencyContactDetailsModal {
    name?: string;
    description?: any;
    email?: string;
    mobile_no?: string;
    website?: string;
    gst_no?: string;
    pan_no?: string;
    status?: string;
    created_at?: string;
    last_login_at?: string;
    files?: Files;
    address_details?: any;
    company_type?: string;
    active_plan?: any;
  }
  export interface Files {
    uuid?: any;
    name?: string;
    content_type?: any;
    created_at?: any;
  }
