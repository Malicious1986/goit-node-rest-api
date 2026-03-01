import User from "./models/User.js";
import Contact from "./models/Contact.js";

User.hasMany(Contact, { foreignKey: "owner" });
Contact.belongsTo(User, { foreignKey: "owner" });
