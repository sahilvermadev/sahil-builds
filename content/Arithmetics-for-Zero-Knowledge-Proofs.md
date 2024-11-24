---
title: Arithmetics for Zero Knowledge Proofs
date: 2024-11-10
description: 
tags:
  - ZKP
---
# Arithmetic
It is computationally difficult to find the factors of a paticular number and much easier to multiply.

Extended euclidian algorithm - Used for fidning the gcd for 2 numbers



# Binary and Hexadecimal Positional Systems

## Binary Positional System

- The **binary positional system** (or binary representation) represents every integer as a sequence of elements from the set of binary digits $\{0, 1\}$.
- For a non-negative integer $n$ in decimal representation:
  - Let $b = b_{k-1}b_{k-2} \ldots b_0$ be a sequence of bits $b_j \in \{0, 1\}$, where $k \in \mathbb{N}$ is some positive integer.
  - The sequence $b$ is the **binary representation** of $n$ if the following equation holds:

$$
n = \sum_{j=0}^{k-1} b_j \cdot 2^j
$$

- The notation **Bits**($n$) is used as follows:
  - $\text{Bits}(n) := b_{k-1}b_{k-2} \ldots b_0$.
  - $n$ is called a **k-bit number**, and $k$ is the **bit length** of $n$.

- Key Properties:
  - The binary representation of any non-negative integer is **unique**.
  - $b_0$ is the **least significant bit (LSB)**.
  - $b_{k-1}$ is the **most significant bit (MSB)**.
  - The **Hamming weight** of an integer is the **number of 1s** in its binary representation.

## Hexadecimal Positional System

- Another commonly used representation is the **hexadecimal positional system**, which uses a set of 16 digits:
  - The set of digits is $\{0, 1, 2, 3, 4, 5, 6, 7, 8, 9, a, b, c, d, e, f\}$.
- Hexadecimal representation is often preferred in cryptographic systems dealing with large integers because it requires **fewer digits** than the decimal representation.

## Decimal System

- By default, the **decimal positional system** is used to represent numbers, unless stated otherwise.
- Decimal representation is typically used for integers or rational numbers in mathematical contexts.

> **Note**: Hexadecimal representations are commonly used in cryptography due to their compactness when dealing with large numbers.

## Conversion Between Positional Systems - 
Given a positional system with a **base** $k$ and a digit set $\{d_0, d_1, \ldots, d_{k-1}\}$, an integer representation $d_h \cdots d_1 d_0$ in that system can be transformed into an integer representation $n$ in the **decimal system** using the formula: $$ n = \sum_{i=0}^{h} j_i \cdot k^i $$ - This equation allows conversion from any positional system to the decimal system. - The decimal system is not inherently special but is the most commonly used in everyday contexts. 
## Prefix Notations for Positional Systems - 
To avoid ambiguity, many computer systems use **prefixes** to specify the positional system of a number: - `0x`: Indicates a **hexadecimal** number (base 16). - `0b`: Indicates a **binary** number (base 2). > 

**Example**: > - `0x1A` represents the hexadecimal value $1A$, which is equal to $26$ in decimal. > - `0b1010` represents the binary value $1010$, which is equal to $10$ in decimal.

# Modular Arithmetic

## Overview

- **Modular arithmetic** is a system of arithmetic where numbers "wrap around" when they reach a certain value, similar to the way hours on a clock wrap around after 12.
  - For example, if the clock shows 11 o’clock, then 20 hours later it will be 7 o’clock, not 31 o’clock.

- The value at which the "wrap around" occurs is called the **modulus**.
  - Modular arithmetic generalizes this concept to arbitrary moduli and is essential in cryptography, as it provides algebraic structures for one-way functions.

## Congruence

- Given a natural number $n \ge 2$, called the **modulus**, two integers $a$ and $b$ are said to be **congruent modulo $n$** if:

$$
a \mod n = b \mod n
$$

- This is written using the congruence notation:

$$
a \equiv b \ (\text{mod} \ n)
$$

- **Example**:
  - For $n = 12$, the integers $-7, 5, 17$, and $29$ are all congruent modulo $12$ because they all have a remainder of $5$ when divided by $12$.

## Important Properties of Congruence

- If $a \equiv b \ (\text{mod} \ n)$, then:
  - **Compatibility with Addition**:
    - $a_1 \equiv b_1 \ (\text{mod} \ n)$ and $a_2 \equiv b_2 \ (\text{mod} \ n) \implies a_1 + a_2 \equiv b_1 + b_2 \ (\text{mod} \ n)$
  - **Compatibility with Subtraction**:
    - $a_1 \equiv b_1 \ (\text{mod} \ n)$ and $a_2 \equiv b_2 \ (\text{mod} \ n) \implies a_1 - a_2 \equiv b_1 - b_2 \ (\text{mod} \ n)$
  - **Compatibility with Multiplication**:
    - $a_1 \equiv b_1 \ (\text{mod} \ n)$ and $a_2 \equiv b_2 \ (\text{mod} \ n) \implies a_1 \cdot a_2 \equiv b_1 \cdot b_2 \ (\text{mod} \ n)$

## Fermat's Little Theorem

- **Fermat’s Little Theorem**: For a prime number $p$ and an integer $k$ that is not divisible by $p$:

$$
k^{p-1} \equiv 1 \ (\text{mod} \ p)
$$

- This theorem is useful in cryptography for computing modular inverses.

## Example Problem

Solve the congruence:

$$
7 \cdot (2x + 21) + 11 \equiv -102 \ (\text{mod} \ 6)
$$

- We simplify and transform the equation step by step using the properties of congruence:
  - Rewrite: $14x + 158 \equiv -102 \ (\text{mod} \ 6)$
  - Simplify: $14x \equiv -20 \ (\text{mod} \ 6)$
  - The solution is $x \equiv 4 \ (\text{mod} \ 6)$.

- The general solution is:

$$
x = 4 + k \cdot 6, \text{ for any integer } k
$$

## Key Takeaways

- Modular arithmetic simplifies calculations by using the "wrap-around" concept.
- Congruences can be manipulated similarly to regular equations using properties like compatibility with addition, subtraction, and multiplication.
- The **modulus** plays a crucial role in determining equivalence classes of integers.
- **Fermat’s Little Theorem** is a fundamental tool in cryptographic applications.

> **Note**: Modular arithmetic becomes simpler and more intuitive once you get familiar with its rules and properties.

# Chinese Remainder Theorem (CRT)

## Overview

- The **Chinese Remainder Theorem (CRT)** helps solve systems of congruences with different moduli.
- It guarantees a solution if the moduli are **pairwise coprime**, meaning they have no common factors other than 1.

## Statement of the Theorem

Given integers $n_1, n_2, \ldots, n_k$ (pairwise coprime) and integers $a_1, a_2, \ldots, a_k$, there exists a unique integer $x$ such that:

$x \equiv a_1 \ (\text{mod} \ n_1)$

$x \equiv a_2 \ (\text{mod} \ n_2)$

$\ldots$

$x \equiv a_k \ (\text{mod} \ n_k)$

- The unique solution $x$ is taken modulo $N$, where $N = n_1 \times n_2 \times \ldots \times n_k$.

## Example

Solve the system of congruences:

$x \equiv 2 \ (\text{mod} \ 3)$

$x \equiv 3 \ (\text{mod} \ 5)$

$x \equiv 2 \ (\text{mod} \ 7)$

### Solution Steps

1. **Calculate the Product**:
   - $N = 3 \times 5 \times 7 = 105$

2. **Find Partial Products**:
   - $N_1 = \frac{N}{3} = 35$
   - $N_2 = \frac{N}{5} = 21$
   - $N_3 = \frac{N}{7} = 15$

3. **Find Inverses**:
   - Inverse of $35 \mod 3$ is $2$.
   - Inverse of $21 \mod 5$ is $1$.
   - Inverse of $15 \mod 7$ is $1$.

4. **Combine the Results**:
   - $x = a_1 \times N_1 \times \text{inverse}(N_1, n_1) + a_2 \times N_2 \times \text{inverse}(N_2, n_2) + a_3 \times N_3 \times \text{inverse}(N_3, n_3)$
   - $x = 2 \times 35 \times 2 + 3 \times 21 \times 1 + 2 \times 15 \times 1$
   - $x = 140 + 63 + 30 = 233$

5. **Reduce Modulo $N$**:
   - $x \mod 105 = 233 \mod 105 = 23$

### Final Solution

$x \equiv 23 \ (\text{mod} \ 105)$

## Why It Works

- The theorem works because the moduli are coprime. This allows us to construct a solution using the **Extended Euclidean Algorithm**, which helps find the coefficients needed to combine the congruences.

## Applications

- The CRT is widely used in:
  - Cryptography (e.g., RSA algorithm)
  - Efficient computations in modular arithmetic
  - Solving simultaneous linear congruences

> **Note**: The Chinese Remainder Theorem simplifies complex modular calculations by breaking them down into smaller, more manageable congruences.

## Algorithm (Simplified)

1. Compute the product $N = n_1 \times n_2 \times \ldots \times n_k$.
2. For each $n_i$, find $N_i = \frac{N}{n_i}$.
3. Compute the modular inverses of each $N_i$ modulo $n_i$.
4. Combine the results using the formula:
   $x = \sum_{i=1}^{k} a_i \times N_i \times \text{inverse}(N_i, n_i)$
5. Return $x \mod N$ as the unique solution.

# Polynomial Arithmetic

## Univariate Polynomials

- A **univariate polynomial** $P(x)$ in $R[x]$ is expressed as:

  $P(x) = \sum_{j=0}^{m} a_j x^j = a_m x^m + a_{m-1} x^{m-1} + \ldots + a_1 x + a_0$

- Here:
  - $x$ is the **variable**.
  - $a_j$ are the **coefficients**.
  - The **degree** of $P(x)$, denoted as $\deg(P)$, is the highest power $m$ with a non-zero coefficient.

- The **leading coefficient** of $P(x)$ is the coefficient of the term with the highest degree:

  $\text{Lc}(P) = a_m$

## Polynomial Operations

### Addition and Multiplication

- Polynomials can be added by summing the coefficients of terms with the same degree.
- The product of two polynomials $P(x)$ and $Q(x)$ is given by:

  $(P \cdot Q)(x) = \sum_{n=0}^{m_1 + m_2} \left( \sum_{i+j=n} a_i b_j \right) x^n$

### Euclidean Division with Polynomials

- The **Euclidean Division** of polynomials is similar to integer division:
  - Given polynomials $A(x)$ and $B(x)$ with $B(x) \neq 0$, there exist unique polynomials $Q(x)$ (quotient) and $R(x)$ (remainder) such that:

    $A(x) = Q(x) \cdot B(x) + R(x), \quad \deg(R) < \deg(B)$

## Prime Factorization of Polynomials

- A polynomial can be factored into irreducible polynomials (analogous to prime numbers):

  $P(x) = F_1(x) \cdot F_2(x) \cdots F_k(x)$

- This factorization is unique (up to the order of factors).

## Roots of a Polynomial

- A **root** $x_0$ of a polynomial $P(x)$ is a value where $P(x_0) = 0$.
- If $x_0$ is a root, $(x - x_0)$ is a factor of $P(x)$.

## Lagrange Interpolation

- **Lagrange Interpolation** is a method to find a polynomial of degree $m$ that passes through $m + 1$ given points $(x_0, y_0), (x_1, y_1), \ldots, (x_m, y_m)$.
- https://www.youtube.com/watch?v=bzp_q7NDdd4
- The interpolating polynomial $P(x)$ is constructed as:

  $P(x) = \sum_{j=0}^{m} y_j \ell_j(x)$

  where:

  $\ell_j(x) = \prod_{i \neq j} \frac{x - x_i}{x_j - x_i}$

- Example:
  - Given points $(0, 4), (-2, 1), (2, 3)$, the interpolating polynomial can be computed step-by-step using the formula above.

## Polynomial Long Division

- The **Polynomial Euclidean Algorithm** can be used to perform long division on polynomials, similar to the method used for integers.
- For polynomials $A(x)$ and $B(x)$ with $\deg(A) \ge \deg(B)$:
  - Compute quotient $Q(x)$ and remainder $R(x)$ such that:

    $A(x) = Q(x) \cdot B(x) + R(x)$

- This method is fundamental for finding factors and simplifying polynomial expressions.

## Modular Arithmetic with Polynomials

- Polynomials can also be defined over modular rings like $\mathbb{Z}_n[x]$.
- Operations like addition, multiplication, and division follow the rules of modular arithmetic, using the modulus $n$.

### Example:

Consider polynomials $P(x) = 5x^2 - 4x + 2$ and $Q(x) = x^3 - 2x^2 + 5$ in $\mathbb{Z}_6[x]$:

- Sum:

  $(P + Q)(x) = x^3 + 3x^2 + 2x + 1$

- Product:

  $(P \cdot Q)(x) = 5x^5 + 4x^4 + 3x^3 + 2x^2 + 4x + 4$



