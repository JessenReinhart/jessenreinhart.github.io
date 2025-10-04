# Linting and Code Quality Setup

This project uses ESLint and Husky to enforce code quality standards.

## Features

- **ESLint**: Configured to catch unused imports and prevent comments
- **Husky**: Git hooks for pre-commit and pre-push validation
- **TypeScript**: Strict type checking

## Rules Enforced

- No unused variables or imports
- No comments allowed in code (enforced by custom rules)
- No console.log statements (warnings)
- Proper TypeScript patterns

## Scripts

- `npm run lint` - Fix linting issues automatically
- `npm run lint:check` - Check for linting issues without fixing
- `npm run check-comments` - Verify no comments exist in TypeScript files

## Git Hooks

- **pre-commit**: Runs linting and comment checks
- **pre-push**: Runs build to ensure code compiles

## Comment Policy

This project enforces a strict no-comments policy. Code should be self-documenting through:
- Clear variable and function names
- Proper TypeScript types
- Well-structured code organization