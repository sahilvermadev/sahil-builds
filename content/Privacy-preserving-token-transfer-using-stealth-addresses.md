---
title: Privacy-preserving token transfer using stealth addresses
date: 2024-11-07
description: 
tags:
  - blockchain
---
### 1. Alice starts the process by creating a transfer request

**1. Retrieve Bob's Meta-Address:**

- Alice retrieves Bob's meta-address from the Stealth Meta-Address Registry. This meta-address, publicly available on the registry, contains Bob's public viewing key and Bob's public spending key.

**2. Generate stealth address:**

- Alice combines her private ephemeral key (generated only for this transaction) with Bob's public spending key from his meta-address. This cryptographic operation creates a unique stealth address that can only be controlled by Bob using his private spending key.

**3. Create transfer request:**

- Alice creates a `transferRequest` (on-chain function) with the newly generated stealth address to signal her intent to transfer tokens and includes relevant transaction details (e.g., amount, type of token, etc.).
- During this action, Alice shares the real identity (Bob's meta-address) of the stealth address with the platform off-chain, which is stored against the transfer request's request ID. When the platform processes the transfer request event containing the request ID, the platform uses Bob's private viewing key (which it has access to for compliance purposes) to verify that the stealth address Alice created belongs to Bob. (The public viewing key does not grant control over the funds but allows the platform to identify Bob as the recipient.)

### 2. Platform approves/rejects the transfer request

**1. Conduct off-chain compliance checks:**

- The platform conducts compliance checks for the transaction off-chain, validating both Alice's and Bob's compliance statuses as needed (which can be done since the platform has stored the identities against the stealth addresses off-chain). Based on these results, the platform either approves or rejects the transfer request on-chain.

**2. Approve the transfer and update records:**

- If the transaction passes compliance, the on-chain approval raises the transfer event with the stealth addresses and amount.
- The platform then updates the off-chain balance records:
    - It deducts tokens from Alice's balance and credits the balance for Bob's newly created stealth address.

**3. Publish the ephemeral public key:**

- Upon approval, Alice's ephemeral public key (derived from her private ephemeral key for this transaction) is published to the Ephemeral Public Key Registry. This publication allows Bob to later identify which stealth addresses belong to him.

### 3. Bob receives the transferred tokens

**1. Scan ephemeral public key registry (wallet features):**

- Bob's wallet periodically scans the Ephemeral Public Key Registry for newly published ephemeral public keys.
- For each ephemeral public key found, Bob's wallet uses his private viewing key to regenerate the stealth addresses associated with him without needing his private spending key. This allows him to recognize which stealth addresses belong to him.
- Once Bob's wallet identifies a stealth address that belongs to him, it checks for any tokens in that address.

**2. Accessing the stealth address:**

- Bob then uses his private root spending key to derive the specific private key for that stealth address, allowing him to access and control the tokens.
### Pros

1. **On-chain Balance Management**: All balances of all tokens are maintained on-chain, but ownership cannot be traced to a participant. This provides benefits over a solution that simply generates a new address for each transaction.
2. **No Private Information Exchange**: No information needs to be shared privately back and forth between senders and receivers.
3. **Simplified Key Management**: All participants only need to maintain two private keys (viewing and spending), with all other keys being derivable from these.
4. **Identity Proof via Viewing Key**: Receivers (and senders) do not need to take actions to prove the identity of the stealth address to the platform, since the viewing key can be used for this.

### Cons

1. **Lack of Wallet Support and Increased Complexity**: Stealth addresses lack wallet support and increase complexity. For example, if Alice did not share the identities (meta-addresses) off-chain during a transfer request, the platform would need to parse through all viewing keys during event processing to maintain balances against participants.
2. **No Automated Participant Attribute Checks**: Automated checks for participant attributes (like compliance checks, freezing, etc.) are not possible. However, generic/anonymous attributes can be submitted during transfer approval for compliance checks.
3. **Access Management Issues**: There is a lack of access management or validation for stealth addresses. The contract cannot distinguish between a stealth address of a valid participant and a random address.