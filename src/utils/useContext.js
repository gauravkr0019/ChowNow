import { createContext } from "react";

const UserContext = createContext({
  user: {
    name: "dummyy",
    email: "dummy@123.com",
  },
});

export default UserContext;
