---
title: Privacy-preserving token transfer using stealth addresses
date: 2024-11-07
description: 
tags:
  - blockchain
---
###   1. Alice starts the process by creating a transfer request

a) Retrieve Bob's Meta-Address:

- Alice retrieves Bob's meta-address from the Stealth Meta-Address Registry. This meta-address, publicly available on the registry, contains Bob's public viewing key and Bob's public spending key.

b) Generate stealth address:

- Alice combines her private ephemeral key (generated only for this transaction) with Bob's public spending key from his meta-address. This cryptographic operation creates a unique stealth address that can only be controlled by Bob using his private spending key.

c) Create transfer request:

- Alice creates a transferRequest (on-chain function) with the newly generated stealth address to signal her intent to transfer tokens and includes relevant transaction details (, e.g., amount, type of token, etc.).
- During this action, Alice shares the real identity (Bob’s meta-address) of the stealth address with the platform off-chain, which is stored against the transfer request’s request ID. When the platform processes the transfer request event containing the request ID, the platform uses Bob's private viewing key (which it has access to for compliance purposes) to verify that the stealth address Alice created belongs to Bob. (The public viewing key does not grant control over the funds but allows the platform to identify Bob as the recipient.)

### 2. Platform approves/rejects the transfer request

a) Conduct off-chain compliance checks:

- The platform conducts compliance checks for the transaction off-chain, validating both Alice's and Bob's compliance statuses as needed (which can be done since the platform has stored the identities against the stealth addresses off-chain). Based on these results, the platform either approves or rejects the transfer request on-chain.

b) Approve the transfer and update records:

- If the transaction passes compliance, the on-chain approval raises the transfer event with the stealth addresses and amount.
- The platform then updates the off-chain balance records:
- It deducts tokens from Alice's balance and credits the balance for Bob's newly created stealth address.

d) Publish the ephemeral public key:

- Upon approval, Alice’s ephemeral public key (derived from her private ephemeral key for this transaction) is published to the Ephemeral Public Key Registry. This publication allows Bob to later identify which stealth addresses belong to him.


### 3. Bob receives the transferred tokens

a) Scan ephemeral public key registry (wallet features):

- Bob’s wallet periodically scans the Ephemeral Public Key Registry for newly published ephemeral public keys.

- For each ephemeral public key found, Bob’s wallet uses his private viewing key to regenerate the stealth addresses associated with him without needing his private spending key. This allows him to recognize which stealth addresses belong to him.
   
- Once Bob’s wallet identifies a stealth address that belongs to him, it checks for any tokens in that address.


b) Accessing the stealth address:

- Bob then uses his private root spending key to derive the specific private key for that stealth address, allowing him to access and control the tokens.
   

  

|   |   |
|---|---|
|Pros|Cons|
|1.  All balances of all tokens are maintained on-chain, but ownership cannot be traced to a participant.<br><br>  <br><br>The following are the benefits over a solution that simply generates a new address  for each transaction:<br><br>  <br><br>2. No information needs to be shared privately back and forth between senders and receivers.<br><br>  <br><br>3. All participants only need to maintain two private keys (viewing and spending) - all other keys can be generated from these.<br><br>  <br><br>4. Receivers (and senders) do not need to take actions to prove identity of the stealth address to the platform, since the viewing key can be used for this.|1. Lack of wallet support for stealth addresses and increase in complexity (for example, if Alice didn’t share the identities (meta-addresses) off-chain during the transfer request action, the platform would have to parse through all viewing keys during event processing to maintain balances against participants)<br><br>  <br><br>2. Does not allow for automated checks for participant attributes (like compliance checks, freezing, etc.). However, the generic/anonymous attributes can be submitted during transfer approval for compliance checks.<br><br>  <br><br>3. Lack of access management/validation for stealth addresses. The contract cannot distinguish between a stealth address of a valid participant and a random address.|

  
  
**

## Links

