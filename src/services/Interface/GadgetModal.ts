export interface GadgetModal
 {
    uuid?: string ;
    email?: string ;
    mobile_no?: string ;
    created_at?: string ;
    files?: {
      uuid?: string ;
      file_name?: string ;
      created_at?: string ;
    };
    first_name?: string ;
    last_name?: string ;
    id?: string ;
    modified_by?: string ;
    subscription_details?: string ;
    organization_details?: string ;
    verification_details?: string ;
    gadget_name:string;
    name?:string;
    gadget_id?:string
  }

  export interface GadgetFormModal {
    customer?: string;
    name?: string;
    description?: string;
    mobile_no?: string;
    imei?: string;
    notes?:string
  }