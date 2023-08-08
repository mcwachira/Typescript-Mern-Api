import dotenv from "dotenv"

dotenv.config()

//const key =  process.env.ACCESS_TOKEN_PRIVATE_KEY.replace(/\n/g, '\n'),
// const { privateKey } = JSON.parse(process.env.ACCESS_TOKEN_PRIVATE_KEY || '{}')
// console.log(privateKey)

export default {
    port:process.env.PORT,
    dbUri: process.env.MONGO_URI,
    saltWorkFactor: 10,
    accessTokenTtl: "15m",
    refreshTokenTtl: "1y",
    accessTokenPrivateKey:`-----BEGIN RSA PRIVATE KEY-----
MIICWwIBAAKBgQCDTxYEFNmoLAp3fD6uTzbR8t6qfVOphW623NuXx9eLKmwvbTrG
/hqg8S5e8m8x0i3tXNsoa3Pp9aWEdym30osgW9+dsIC4u36flCo/r3PIg0UKijYy
hV7avXZeaK8cw3RN5UKK6/obJBQ67JdcsxZOkrLmKzqmrbbz/C4tr/Z2gQIDAQAB
AoGATW0w2i9BOLzfXx1QCJCFDr9bNMS5tFgNtJ3+jj00h8b4C+8onXXwVb5hTXM+
xe3dTv1V7TuPGgHTG4z4eIAZsJ6ukeUiNuOmHMiKU7lCQmN1fpKiw9V1NlesXgyn
zEJ/Xn5oBl0GqCbm3A2mKv0atm/3V5nctr8LGQ/f/T1JAcECQQC8a9FwQSzMcxBY
sJgc4vgosptCBAUd9i6MfDq/9F+tH5C6BQzKedmMPp2qwLdxl/w+hxsgoj9PFuo9
SWvWXIeFAkEAsmdrWUMLU0FLkIpmViLthFxPzRpCcS4IgWhwtZhq0kJlQybHT+tT
+PvU7T2/BFnByhOhKoYQHMPBz0M3XIp9zQJAalPRma490JXyGIp3HH38mkLIGIXa
OWEuPXrxUFdgEnsomcC1yiDe4iSHps8f9gtVfheR+GV2onQE9VbUcuA+XQJAKEDD
bOF+tas+5H8FthutYbb+XnW1Vhof2yr4e1DHkWdft7YRNIwRZ1VS5rCO3+lsmy6w
p4qWKhdVLHGrFRs+ZQJARoFKCDGyUe7Xc06jq++bKYuykN8G1t/eIzDYxdpmj3qp
/oJMSa1nl5MJVksokyefCY6ZNXWHuSxJQD/61QgNRg==
-----END RSA PRIVATE KEY-----`,

    accessTokenPublicKey: `-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCDTxYEFNmoLAp3fD6uTzbR8t6q
fVOphW623NuXx9eLKmwvbTrG/hqg8S5e8m8x0i3tXNsoa3Pp9aWEdym30osgW9+d
sIC4u36flCo/r3PIg0UKijYyhV7avXZeaK8cw3RN5UKK6/obJBQ67JdcsxZOkrLm
Kzqmrbbz/C4tr/Z2gQIDAQAB
-----END PUBLIC KEY-----`,
    refreshTokenPrivateKey: ``,
    refreshTokenPublicKey: ``,
};
