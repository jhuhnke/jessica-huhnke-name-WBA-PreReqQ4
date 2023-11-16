import { Transaction, SystemProgram, Connection, Keypair, LAMPORTS_PER_SOL, sendAndConfirmTransaction, PublicKey } from "@solana/web3.js"
import wallet from "./dev-wallet.json"

// Dev Wallet Keypair 
const from = Keypair.fromSecretKey(new Uint8Array(wallet)); 

// WBA public key 
const to = new PublicKey("2L6j3wZXEByg8jycytabZitDh9VVMhKiMYv7EeJh6R2H"); 

// Devnet connection 
const connection = new Connection("https://api.devnet.solana.com"); 

// Send 0.1 devnet solami to WBA wallet 
(async () => {
    try {
        const balance = await connection.getBalance(from.publicKey)
        const transaction = new Transaction().add(
            SystemProgram.transfer({
                fromPubkey: from.publicKey,
                toPubkey: to,
                lamports: LAMPORTS_PER_SOL/100,
        })
    );
    transaction.recentBlockhash = (await
    
    connection.getLatestBlockhash('confirmed')).blockhash;
    
    transaction.feePayer = from.publicKey;

    const fee = (await
        connection.getFeeForMessage(transaction.compileMessage(),
        'confirmed')).value || 0;
    
    transaction.instructions.pop(); 

    transaction.add(
        SystemProgram.transfer({
            fromPubkey: from.publicKey, 
            toPubkey: to, 
            lamports: balance - fee,
        })
    );

    // Sign transaction, broadcast, and confirm
    const signature = await sendAndConfirmTransaction(
        connection,
        transaction,
        [from]
    
    );
        console.log(`Success! Check out your TX here:
        https://explorer.solana.com/tx/${signature}?cluster=devnet`);
    } catch(e) {
        console.error(`Oops, something went wrong: ${e}`)
    }
})();