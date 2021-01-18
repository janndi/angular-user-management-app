import { LABELS } from "src/assets/assests.config";
import { environment } from "src/environments/environment";

/**
 * Constant global variable.
 **/

export const IS_DEFAULT = environment.LABEL === LABELS.main;
export const ENDPOINT = `${environment.END_POINT}/${environment.VERSION}`;
export const AUTH_ENDPOINT = `${environment.END_POINT}/auth`;
export const SITE = environment.SITE;
export const SECURE = environment.SECURE;
export const dateFormat = "MM/dd/yyyy";

export const TWO_FACTOR_AUTH: string = "User 2FA Enabled";

/**
 * Cookie Name
 **/

export const COOKIES = {
  token: "token",
  refreshToken: "refreshToken",
  userId: "__user",
  tenantId: "__tenant",
  companyId: "__company",
  groupId: "__group",
  roleId: "__role",
  productId: "__product",
  me: "___me",
  meTenant: "___tenant",
  documentTypeId: "__documentType",
  metaDataId: "__metaData",
  companyDocTypeId: "__companyDocType",
};

export const STORAGE = {
  productCompanyId: "productCompanyId",
  companyId: "companyId",
};

/**
 * Routing Name
 **/

export const ROUTING = {
  maintenance: "maintenance",
  login: "login",
  company: "companies",
  companyUpdate: "companies/edit",
  groups: "groups",
  groupCreate: "groups/create",
  groupUpdate: "groups/edit",
  tenants: "tenants",
  tenantUpdate: "tenants/edit",
  users: "users",
  userUpdate: "users/edit",
  userAssignModules: "users/assignModules",
  roles: "roles",
  roleUpdate: "roles/edit",
  modules: "modules",
  products: "products",
  productUpdate: "products/edit",
  documentTypes: "document-types",
  documentTypesUpdate: "document-types/edit",
  metaData: "meta-data",
  metaDataUpdate: "meta-data/edit",
  companyDocType: "company-document-type",
  companyDocTypeUpdate: "company-document-type/edit",
};

/**
 * Dropdown
 **/

export const DROPDOWN = {
  status: [
    {
      label: "Active",
      value: 1,
    },
    {
      label: "In-active",
      value: 0,
    },
  ],
  language: [{ label: "English - US", value: 1 }],
  country: [
    { label: "Netherland", value: 1 },
    { label: "Belgium", value: 2 },
    { label: "France", value: 3 },
  ],
  gender: [
    { label: "Male", value: "m" },
    { label: "Female", value: "f" },
  ],
  paymentMethod: [
    { label: "CASH", value: "CASH" },
    { label: "DEBIT CARD", value: "DEBIT CARD" },
    { label: "CREDIT CARD", value: "CREDIT CARD" },
  ],
};

export const BOOK_YEAR = () => {
  const date = new Date();
  let yearDropdown = [];

  for (let year = date.getFullYear(); year > 2014; year--) {
    yearDropdown = [...yearDropdown, year.toString()];
  }

  return yearDropdown;
};

/**
 * Regex
 **/

export class InfivexRegex {
  static emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  static fileExtRegex = /^[a-zA-Z|]/;
  /**
   * VATNumber Regex
   */

  static NLVATRegex = /^(NL)\d{9}(B)\d{2}$/;
  static BEVATRegex = /^(BE)\d{10}$/;

  /**
   * KVK Regex
   */
  static NLKVKRegex = /^\d{8}$/;
}
