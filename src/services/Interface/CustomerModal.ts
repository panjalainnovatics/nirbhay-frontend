export interface CustomerModal {
  uuid?: string;
  email?: string;
  mobile_no?: string;
  whatsapp_mobile_no?: string;
  gadget_count?: string;
  created_at?: string;
  first_name?: string;
  last_name?: string;
  id?: string;
  modified_by?: string;
  status?: string;
  gadget_id?:string
}

export interface CustomerDetailsModal {
  whatsapp_mobile_no?: string,
  created_at?: string,
  last_name?: string,
  first_name?: string,
  status?: string,
  uuid?: string,
  email?: string,
  gender?: string,
  gadget_count?: any,
  mobile_no?:string
  gadget_id?:string
}


export interface CustomerFormModal {
  email?: string;
  mobilenumber?: string;
  firstname?: string;
  lastname?: string;
  whatsappnumber?: string;
  notes?: string;
  gender?: string;
  password?: string;
  confirmPassword?: string;
  mobile_no?:any;
  whatsapp_mobile_no?:any;
}
