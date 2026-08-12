import dotenv from "dotenv";

dotenv.config({
    path: ".env.qa"
});

console.log("Loaded Env File");
console.log("BASE_URL =", process.env.BASE_URL);
console.log("API_URL =", process.env.API_URL);