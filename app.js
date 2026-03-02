import app from "./server.js";

import {connectDatabase} from "./db/connectDatabase.js";

const port = Number(process.env.PORT) || 3000;

await connectDatabase();
app.listen(port, ()=> console.log(`Server running on ${port} port`));
