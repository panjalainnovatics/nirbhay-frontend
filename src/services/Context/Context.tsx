import { createContext, useState } from "react";

interface setBreadCrumbModal {
  title?: string;
  breadCrumbsData?: [];
}

// Create Breadcrumb context
export const BreadCrumbContext = createContext<any>({});

// Breadcrumb provider component
export const BreadCrumbProvider = ({ children }: any) => {
  const [breadCrumb, setBreadCrumb] = useState<setBreadCrumbModal>({});

  return (
    // Provide the Breadcrumb and setBreadcrumb values to the consuming components
    <BreadCrumbContext.Provider value={{ breadCrumb, setBreadCrumb }}>
      {children}
    </BreadCrumbContext.Provider>
  );
};
