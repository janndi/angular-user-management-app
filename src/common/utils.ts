import { throwError, Observable } from "rxjs";
import { Users } from "src/app/users/users";

/**
 * Array functions.
 **/

export function singlePushInArray(state: any[], payload: any): any {
  // push object to an entity in store
  return [...state, payload];
}

export function singleRemoveInArray(state: any[], payload: any): any {
  // remove object to an entity in store
  return state.filter((item) => payload !== item.id);
}

export function multipleRemoveArray(state: any[], payload: any[]): any {
  return state.filter((s) => !payload.find((p) => s.id === p));
}

export function singleReplaceInArray(state: any[], payload: any): any {
  // replace object to an entity in store
  return state.map((item) => (payload.id === item.id ? payload : item));
}

/**
 * Mapping for services
 **/

export function mapMe(user: any): Users {
  return {
    ...user,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    password: user.password,
    status: user.status,
    admin: user.admin,
  } as Users;
}

export function mapUser(user: any): Users {
  return {
    ...user,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    password: user.password,
    status: user.status,
    admin: user.admin,
  } as Users;
}

export function mapUsers(users: any): Users[] {
  return users.map(
    (user) =>
      ({
        ...user,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: "**********",
        status: user.status,
        admin: user.admin,
      } as Users)
  );
}

/**
 * Error handler.
 **/

export function handleError(err: any) {
  return throwError(err.message);
}

/**
 * Get id list of Object
 **/

export function getArrayIdOfObjects(data: any) {
  return data.map((data) => data.id);
}

export function getObjectOfArrays(id: any[], data: any) {
  return data.filter((obj) => {
    if (id.includes(obj.id)) {
      return obj;
    }
  });
}

/**
 * Get row in list by id
 */

export function getSelectedRow(id: string, list: any) {
  return list.filter((item: { id: string }) => id === item.id)[0];
}

/**
 * Get drop down selection
 */
export function getDropdownSelection(ids: string[], data: any) {
  return data.filter((data) => {
    if (ids.includes(data.id)) {
      return data;
    }
  });
}

/**
 * Check if id exist on the list
 */
export function isIdExist(id: string, list: any) {
  return list.filter((item: { id: string }) => id === item.id).length == 1;
}
