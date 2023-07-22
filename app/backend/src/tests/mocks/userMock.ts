const user = {
  id: 1,
  username: "Admin",
  role: "admin",
  email: "admin@admin.com",
  password: "$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW",
};

const invalidPasswordLoginBody = {
  email: "admin@admin.com",
  password: "secret_ad",
};

const invalidEmailLoginBody = {
  email: "abc",
  password: "secret_admin",
};

const validLoginBody = {
  email: "admin@admin.com",
  password: "secret_admin",
};

const noFields = {
  email: "",
  password: "",
};

const usersArray = [
  {
    id: 1,
    username: "Admin",
    role: "admin",
    email: "admin@admin.com",
    password: "$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW",
  },
];

export {
  invalidEmailLoginBody,
  invalidPasswordLoginBody,
  noFields,
  user,
  usersArray,
  validLoginBody
};

