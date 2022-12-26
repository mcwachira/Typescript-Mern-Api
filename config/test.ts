export default {
	port: 1337,
	dbUri:
		'mongodb+srv://mcwachira:nokia100@cluster0.mpmvza2.mongodb.net/?retryWrites=true&w=majority',
	saltWorkFactor: 10,
	jwtSecret: 'theworld123@#',
	accessTokenTtl: '15m',
	refreshTokenTtl: '1y',
	publicKey: `-----BEGIN PUBLIC KEY-----
MIGeMA0GCSqGSIb3DQEBAQUAA4GMADCBiAKBgHQ8ndO75by3Ot85KOokSx0D4h+f
NcyuZsFAZUhb1SnhFlxj3HRkZeY+LdGM6ygWw9GwdkUHXde/9a+m+DVdSH87WnCe
8Ecxgv6PIK8NtjBE3sEtpNQeSiuGwkkcy0r07/EbOZZ9dMfQzZ83JiOFEuPWEcxc
FPC8NNwTrJoNZAvtAgMBAAE=
-----END PUBLIC KEY-----`,
	privateKey: `-----BEGIN RSA PRIVATE KEY-----
MIICWwIBAAKBgHQ8ndO75by3Ot85KOokSx0D4h+fNcyuZsFAZUhb1SnhFlxj3HRk
ZeY+LdGM6ygWw9GwdkUHXde/9a+m+DVdSH87WnCe8Ecxgv6PIK8NtjBE3sEtpNQe
SiuGwkkcy0r07/EbOZZ9dMfQzZ83JiOFEuPWEcxcFPC8NNwTrJoNZAvtAgMBAAEC
gYAQGkGnDnWyIhQWzn1binGZcGtIBC9YzqRPi1M8pfQu3A7T98WXnjz7m4uPZx1A
rX6tMuv/fhjDBcXMcq4Z/nVHcft1zLE8kVR5qbJNFaSdCG5gNJbpeBQFEigLRzIh
aZyt2LsLZEZi9zojZHqgRXkqALm0i2LsT0dB+CCJWaCqhQJBANfCufCNx+W15JEe
OfuEUcbzim7Hy0UuZxWtk1ysu/4gU86Ctsha8Ev+4jh86HJN5BDbtRLSAzmG7xcR
C/poHU8CQQCJ6jlXbKQMhqpwtzvq3lvh5MRZ/+mbLJjCe3KFrwz0jXrNokIpgRBn
JDbCi28CX/S/m7u6Zw5+xbBTBFl7dAwDAkB0GWs2fwRenibU07/9kHD0rl4CSG4f
1t1Pc+xExQoPr9OI3xt96jk9m3SdUtE9mJ4tWBwyeWGU1f/XmKuqXdXPAkEAhd/g
s7WY9TPPxUSJHC+m33uTAo5BtMiwrLDqdUx8dfPUTkKAmQtY4dYsdeKl6pc83LaO
n54kWvkJdTyWpBj9AwJAFY7cdypiXrjzRDvvHD10ypuZDvQ/7tjc6xJJgRGi2WyY
PqM83D7vMcuPbZP6EAZxgEoNrWTqgmUrs5sOWLSBeg==
-----END RSA PRIVATE KEY-----`,
};
