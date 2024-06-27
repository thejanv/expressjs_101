export const createUserValidationSchema = {
  username: {
    isLength: {
      options: {
        min: 5,
        max: 32,
      },
      errorMessage: "Usename at least 5-32",
    },
    notEmpty: {
      errorMessage: "Usename cannot be empty",
    },
    isString: {
      errorMessage: "Usename must be string",
    },
  },
  displayname: {
    notEmpty: {
      errorMessage: "displayname must be string",
    },
  },
};
