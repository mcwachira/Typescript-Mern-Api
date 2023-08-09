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
MIIEowIBAAKCAQEApmx7qEMVNXwfLr9QTXFY6ta0vIdS4nERUKY/V1xJ4joybx9d
ca0REBAophKPKDxHdYBGl8PzsCf/zUxa54hSiIKgcUID6lyTwl57bF0fw3adhCAD
PIjHHNxYH6D8knT1itz1bbZtEdFASUNQD9RJCoEvVaFSLiJy3mmjw0VdHflui+Cx
VqVqW1qkiZBu7YBKapUhsCG9yCSxu/zfXdV92dZaIe6tEq6aMUc1WzrIw6jBv5AM
O1LqraVbvhprtbVLUJrDU+VXGKCEYOJZ3CZPJcrOvEATxrZCivW86Lr+TkTrK1AH
6j5t061xApP9JtAGmr7uR9Fb5pstZSUtNPNq2QIDAQABAoIBAFhMCFOeu9rzrsur
n1xnPeji32ODXLtdh/VFLygXg++uNuH0Pyy3yOy/1gE+qYuMZ9F0rH+K7HjS0ApJ
b5WWI0vgGmXcw50NXyvp2wwEYHzhKvNV1MHCQ/oRAgRN8pN10GzLjL+X4Uhpv/Te
7NRpKhOTtNx2ydZGWrGcVNGetKfYtlFM1pLYeLN85MW/9O8GmFr2MPSGsa0QBy0i
zbQf+LZwwwWrHiboFbNo9P0tP6LHKEb+/dotOJPDevMn0cUGCTp+LSEbyUUlIik9
mikarjHb0fvFOU1b5nvgVT97H+CfMw9NvTldcpyXzolm5Aa45Em7rEbmt8HzCE9j
o6l4OO0CgYEA/ck+klHI8jCTJltMijFupn29FXCTPo9v65/nLJHfDFb422J5iKnb
rYRtqyfpjBDsR3jv8Zz4DkHCYWG6+eXtUQVv8RJF9uDMan0fQtZHscURxiOSeyMg
FDt3aKvm0+wlA32zZjct6ez+89lDmAvbhPYNwOEN11KvtyKEmePIYeMCgYEAp+Ak
D+YZvFnjIxKsNug7fjuPLqXS4MLZoOnSSBX3EgZCblVzr49KgEYrCC2wz39+vFSp
48oDhaIFuThyG+SWwgD1RQNK6TRX1dfWLYZWmTivhb8YCOXAZfywc6Wwg48q5kSr
Oj3P+8Ta+rJ1cI6IFFXvqZZNnFL95yr1EvHH7RMCgYBXA1bmyA/Dqg/pyMfXYdd0
Ugwwe6agfoF7Ihoa1/DHxFISthLBXqupNIx9cHPMyEiawMZT6uPJz5Yb2WxIHiNd
8iVNXFyMpsqvgDLlsZ5nPxA3BR9GBOcMyM7KHpZH9uFB7ylBVI3zdIR9ivJ4ASjE
z7Arf35FY15Hxhf8w3KCzQKBgAwMAqp9abVhgfI/Ycpi6foKDiFb1wE4GmP4w5VW
ti898cB3M2ES2FbSMj5ZAQoy7QZY0QQ+t/f8A4siKNYllkf/x5oXPWX00qTO41jK
/iXqsnXXm8Lvsdnfw03ZQwx91qdFoEACtY0suEYrTlAwekVzUUqLNbCVKBFRvNqK
LT2vAoGBAJngJ/DZtHy1+x9UhodHnzoesF5Pf554tKlZTfSDzX3iLZY9BDf7izzr
51r+A8rctd4caU/pUSFhCs7lYPpJt/nNufYHpIlQKf3+MU+HmYsi1+YJdbjf69OR
kA5OqZIAC5Ez1Gs0odPfwTc2pj6g2XvnTlAypas70dG6leh//bie
-----END RSA PRIVATE KEY-----`,

    accessTokenPublicKey: `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEApmx7qEMVNXwfLr9QTXFY
6ta0vIdS4nERUKY/V1xJ4joybx9dca0REBAophKPKDxHdYBGl8PzsCf/zUxa54hS
iIKgcUID6lyTwl57bF0fw3adhCADPIjHHNxYH6D8knT1itz1bbZtEdFASUNQD9RJ
CoEvVaFSLiJy3mmjw0VdHflui+CxVqVqW1qkiZBu7YBKapUhsCG9yCSxu/zfXdV9
2dZaIe6tEq6aMUc1WzrIw6jBv5AMO1LqraVbvhprtbVLUJrDU+VXGKCEYOJZ3CZP
JcrOvEATxrZCivW86Lr+TkTrK1AH6j5t061xApP9JtAGmr7uR9Fb5pstZSUtNPNq
2QIDAQAB
-----END PUBLIC KEY-----`,
    refreshTokenPrivateKey: ``,
    refreshTokenPublicKey: ``,
};
