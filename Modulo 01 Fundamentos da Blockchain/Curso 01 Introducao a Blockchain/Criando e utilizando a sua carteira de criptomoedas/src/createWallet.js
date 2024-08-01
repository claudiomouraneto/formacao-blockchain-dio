//Importando as dependencias

const bip32 = require('bip32')
const bip39 = require('bip39')
const bitcoin = require('bitcoinjs-lib')

//definir a rede
//bitcoin na rede principal (mainnet), trocar testnet por mainnet
//bitcoin.networks.mainnet
// Para testnet
const network = bitcoin.networks.testnet

//derivaçao de carteiras mainnet - 
//`'m/49',0'/0'/0`

//derivação de carteiras testnet - HD (hierarkical deterministic)
const path = `m/49'/1'/0'/0`
//Geraçao do mneumonico (seed)
let mneumonic = bip39.generateMnemonic()
const seed = bip39.mnemonicToSeedSync(mneumonic)

//criando a raiz da carteira HD
let root = bip32.fromSeed(seed, network)

//criando uma conta (chave privada e chave publica)
let account = root.derivePath(path)
let node = account.derive(0).derive(0)

let btcAdress = bitcoin.payments.p2pkh({
    pubkey: node.publicKey,
    network: network,
}).address

//Escrita na tela (Saída)
console.log("Carteira gerada")
console.log("----")
console.log("Endereço", btcAdress)
console.log("Chave privada", node.toWIF())
console.log("Seed", mneumonic)