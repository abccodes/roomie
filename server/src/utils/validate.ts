/*
  ===============================================================
    The validatorjs package gives us a Validator constructor function
    with the following signature:
  ===============================================================
*/
import Validator from "validatorjs";

const validator = async (body, rules, customMessages, callback) => {
  const validation = new Validator(body, rules, customMessages);
  validation.passes(() => callback(null, true));
  validation.fails(() => callback(validation.errors, false));
};
export default validator;
