---
title: Divide and conquer
date: 2024-09-15
description: 
tags:
---

Idea - 
1. To find a base case to the problem where is solution is trivial.
2. To reduce the size of the problem will you reach that base case.

These algorithms make use of the above idea and recursion.

## Quick Sort:

1. Sorting any array of size 1 or lower is trivial. Thus this becomes our base case.
2. We shall reduce the size of the array by selecting a pivot and moving all the smaller elements to the left and the larger elements to the right. We thereby find the correct position for the pivot element and end up with 2 smaller arrays.
3. We shall repeat step 2 till we reach the base case.

Big(O) Calculation:
In Quick sort, at each level you are going through all of the elements at least once thus the that operation is  O(n). Moreover in the best case where you choose the middle point of the array as the pivot each time you get log(n) levels.
*Best case complexity = O(n*log(n))

While in the worst case where you always take a pivot on the extremes you end up having n levels.
*Worst case complexity = O(n^2)*

The constant in Big O notation can matter sometimes. That’s why Quick sort is faster than merge sort(even though the best case for merge sort is *O(n*log(n)).

The constant almost never matters for simple search versus binary search, because O(log n) is so much faster than O(n) when your list gets big.

!

## Links





## Links

