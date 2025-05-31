# Challenges in Building a Modern Portfolio with Rezact

## Introduction
Building a modern portfolio website using Rezact presented unique challenges, particularly when implementing features that are commonly available in more established frameworks like React. One of the most significant challenges was implementing section visibility animations without a built-in ref system.

## The Section Visibility Challenge

### The Problem
In React, implementing scroll-based animations is relatively straightforward thanks to the `useRef` hook and the `IntersectionObserver` API. However, Rezact doesn't have a built-in ref system like React's `useRef`, which required a different approach to handle DOM element references and visibility tracking.

### Our Solution

#### 1. Data Attributes Based Approach
Instead of using refs, we implemented a data-attributes based system in our Section component:

```tsx
<section
  data-observe-visibility="true"
  data-visibility-threshold={threshold}
  data-visibility-root-margin={rootMargin}
>