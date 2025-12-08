import express from "express";
import { ENV } from "./lib/env";

const app=express();

app.listen(ENV.PORT);
