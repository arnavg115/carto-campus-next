import { SETSCHOOL } from "./actionTypes";

const SetSchool = (payload: string) => ({
  type: SETSCHOOL,
  payload,
});

export { SetSchool };
