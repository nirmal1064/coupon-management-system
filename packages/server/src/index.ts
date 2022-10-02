import dotenv from "dotenv";
dotenv.config();
import app from "./app";

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Server started and running in ${PORT}`));
