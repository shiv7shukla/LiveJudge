import dotenv from "dotenv";

dotenv.config();

export const ENV={PORT:ENV.PORT, DB_URL:ENV.DB_URL};