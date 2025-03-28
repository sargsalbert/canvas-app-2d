# Canvas App 2D

This is a high-performance React project using **Vite**, with a CI/CD pipeline set up via GitHub Actions. The project follows best practices for linting, testing, and optimization.

## Installation & Setup

1. **Clone the repository**:

   ```sh
   git clone https://github.com/sargsalbert/canvas-app-2d.git
   cd canvas-app-2d
   ```

2. **Install dependencies**:

   ```sh
   npm install
   ```

3. **Run the development server**:

   ```sh
   npm run dev
   ```

4. **Run tests**:

   ```sh
   npm run test
   ```

5. **Build for production**:

   ```sh
   npm run build
   ```

## Performance Optimizations  

This project is optimized for speed and efficiency using:

- **Vite's native optimizations**: Fast cold starts, hot module replacement (HMR), and optimized builds.
- **Tree-shaking & dead code elimination**: Reducing bundle size by removing unused code.
- **Minification & Compression**:
  - Uses **Terser** for minification.
  - Supports **gzip compression** for smaller asset sizes.
- **ESLint & Prettier**: Ensures clean and consistent code.
- **CI/CD pipeline**: Automates linting, testing, and build checks before merging.

## CI/CD Pipeline (GitHub Actions)  

The CI/CD pipeline ensures code quality before merging by running:

1. **Linting & formatting checks** (ESLint & Prettier)
2. **Unit tests** (Vitest)
3. **Production build verification** (Vite)

The workflow is defined in `.github/workflows/ci.yml` and runs on **every pull request**.

## Deployment  

This project is deployed on **Vercel**.  
🔗 [Canvas App 2D](https://canvas-app-2d.vercel.app/)