import { Keypair } from '@solana/web3.js'; 
import base58 from "bs58"; 
import * as fs from 'fs'; 

const PRIVATE_KEY = "4gJi37ehnUHcSoeT1AUZUwdBAPPKFUgW2vAiCLNsxYPqcvqhuVMK6V2jrQvkdN4WaaLDAhDfPePEugz6rgoCyRLu"; 
const PUBLIC_KEY = "2L6j3wZXEByg8jycytabZitDh9VVMhKiMYv7EeJh6R2H"; 
const secret = base58.decode(PRIVATE_KEY); 

const pair = Keypair.fromSecretKey(secret); 

if (pair.publicKey.toString() == PUBLIC_KEY) {
    fs.writeFileSync(
        'private_key.json', 
        JSON.stringify(Array.from(secret))
    );
}