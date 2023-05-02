const { string, object, ref } = require("yup");

const createVendorSchema = object().shape({
  // profile_id: string().uuid().required(),
  name: string().min(2).max(50).required(),
  store_name: string().min(2).max(50).required(),
  phone: string().length(11).required(),
  district: string().min(2).max(50).required(),
  thana: string().min(2).max(50).required(),
  address: string().min(2).max(50).required(),
  about_seller: string().min(10).max(200),
  username: string().min(3).max(30),
  email: string()
    .email("This field should be an valid Email.")
    .required("Email must be required"),
  password: string()
    .min(8, "Password must be at least 8 charecters long.")
    .required("Email must be required"),
  confirmPassword: string()
    .required("Confirm Password must be required")
    .oneOf(
      [ref("password"), null],
      "Password and Confirm password must be same"
    ),
});

const updateVendorSchema = object().shape({
  // profile_id: string().uuid().required(),
  name: string().min(2).max(50).required(),
  store_name: string().min(2).max(50).required(),
  phone: string().length(11).required(),
  district: string().min(2).max(50).required(),
  thana: string().min(2).max(50).required(),
  address: string().min(2).max(50).required(),
  about_seller: string().min(10).max(200),
});

module.exports.createVendorSchema = createVendorSchema;
module.exports.updateVendorSchema = updateVendorSchema;
