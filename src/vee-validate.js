import { required, confirmed, length, email } from "vee-validate/dist/rules";
import PhoneNumber from "awesome-phonenumber";

import { extend } from "vee-validate";

extend("required", {
  ...required,
  message: "This field is required"
});

extend("email", {
  ...email,
  message: "This field must be a valid email"
});

extend("confirmed", {
  ...confirmed,
  message: "This field confirmation does not match"
});

extend("length", {
  ...length,
  message: "This field must have 2 options"
});

const phoneNumber = {
  getMessage: `Please enter a valid phone number (ie. +4100000000)`,
  validate(value) {
    return new Promise(resolve => {
      let phone = new PhoneNumber(value);
      resolve({ valid: phone.isValid() });
    });
  }
};

extend("phoneNumber", phoneNumber);
