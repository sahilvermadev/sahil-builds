---
title: Hedera Core Concepts
date: 2024-09-28
description: 
tags:
---


# Accounts Keys and Signatures
## Asymmetric encryption 
It uses 2 different keys a public key(used for encryption) and a private key(used for decryption). Both keys work in tandem.

![[Pasted image 20240928171729.png]]

## Types of Asymmetric encryption algorithms
1. DSA: Weak algorithm strength source
2. RSA: OG public key signature algorithm, key size too big, takes time
3. ECDSA: New epilliptic curve implementation of DSA, Faster but dont use a bad random number generator
4. ED25519: Best so far. Uses a different epilliptic curve than ECDSA. But not compatible with EVM tools or wallets.
## Digital signature
based on asymmetric cryptogrpahy and serve the purpose of authentication and verification of documents. Private key signs the document and the public key decrypts it there by showing that the correct private key has been used.

## Hedera account
Accounts are stored in the public ledger and hold Hbars which are used to pay for transaction and query fees. 
It has the following features:
1. AccountID: *format*: x.y.z (0.0.13) => (shardID.realmID.AccountNumber)
2. Keys: An account can either have 1 key or a set of keys. And in order to sign a transaction it can require eaither all keys  to sign or a certain threshold of keys to sign.
3. Token balances
4. Automatic association
5. Alias
6. Staked NodeID

# Transactions
Request sent by a client to the network (always with a certain transaction fee). It must include the following information:
1. TransactionID: 
		Composed of the payer accountID and the timeStamp (seconds since epoc + nano-seconds) (0.0.9401@1286312137.2137123324). Child transactionIDs further have a number at the end.
1. Transaction Valid Duration (no longer than 3 minutes)
2. Signatures
3. Transaction Detail

Flow of transactions and queries
1. Creates and signs a transaction through a wallet and submit it to then network
2. Network will verify the transaction and create an event to distribute through gossip protocol
3. Through virtual voting (an asynchronous Byzantine Fault Tolerant Consensus) the network will create a transaction receipt that will be available for 3 minutes.
4. Then it creates output files for the Mirror Nodes which you can query as a user

## MultiSig Transactions
Hedera natively supports multiSig transactions. In the event of an account, having a list or threshold key, each key must sign the transaction. The transaction is generated using the SDK and shared with other signatores so that they can be added to the transaction.

All signatures must be collected within 3 minutes of the valid start time. 

Alternatively you can set the startTime for the transaction in the future. Collect the signatures and when the valid start time start submit them all at once within the 3 minute mark.

### Scheduled Transaction

You can also use scheduled transactions that are valid for 30 minutes before they expire. When Hedera sees that sufficient signatures have been collected it executes the transaction. If not, the transaction is deleted.
1. ScheduleID: 0.0.xxx
2. ScheduleCreate
3. ScheduleSign
4. ScheduleDelete
5. ScheduleGetInfo

Example transaction:
```
const txSchedule = await (
    await new TransferTransaction()
        .addHbarTransfer(multiSigAccountId, Hbar.fromTinybars(-1))
        .addHbarTransfer(client.operatorAccountId, Hbar.fromTinybars(1))
        .schedule() // create schedule
        .freezeWith(client)
        .sign(alicePrivateKey)
).execute(client);

const txScheduleReceipt = await txSchedule.getReceipt(client);

const scheduleId = txScheduleReceipt.scheduleId;
console.log(`Schedule ID: ${scheduleId.toString()}`);

const scheduledTxId = txScheduleReceipt.scheduledTransactionId;
console.log(`Scheduled tx ID: ${scheduledTxId.toString()}`);

```
exmaple of a signature call:
```
const txScheduleSign1 = await (
    await new ScheduleSignTransaction()
        .setScheduleId(scheduleId)
        .freezeWith(client)
        .sign(privateKey)
).execute(client);

```

## Queries
They are requests sent to a Hedera Node to retrieve information from the network. A client can query infromation from both consensus node and mirror node because querying state information from consensus node will incur transaction fees. The mirror node on the other hand needs no transaction fees and supports complex queries. Moreover Transaction history and HCS Topic Messages are only available on the mirror node.

The network has 2 types of data:
1. Network state - (account balances, token information, smart contract states, etc.)
2. Transaction HIstory (a history of all transactions submitted on the network)

## Confirmation
these are mehtods used to confirm the successful processing of a request.
There are 3 types:
1. Receipts: Miimal info such as consenus time stamo
2. Records - contain more info example: results of a smart contract function execution
3. State Proofs - cryptogrpahically signed state changes that may be permissable in law.

# Technology Ecosystem

![[Pasted image 20240928190030.png]]
## Links

