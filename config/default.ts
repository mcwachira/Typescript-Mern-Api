import dotenv from "dotenv"

dotenv.config()

export default {
    port:process.env.PORT,
    dbUri: process.env.MONGO_URI,
    saltWorkFactor: 10,
    accessTokenTtl: "15m",
    refreshTokenTtl: "1y",
    accessTokenPrivateKey: ``,
    accessTokenPublicKey: ``,
    refreshTokenPrivateKey: ``,
    refreshTokenPublicKey: ``,
};
