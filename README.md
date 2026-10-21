# StyleNest — Fashion Storefront

A responsive fashion e-commerce storefront inspired by modern fashion marketplaces. Built with **HTML, CSS, and vanilla JavaScript** — no build tools or framework required.

> Portfolio project for learning and demonstrating front-end web development. StyleNest is a fictional brand and is not affiliated with Myntra.

## Features

- Responsive layout for desktop, tablet, and mobile
- Product cards with image, brand, price, discount reference, and rating
- Search products by name, brand, or category
- Filter by Women, Men, and Accessories
- Sort by featured, price, or rating
- Wishlist toggle and wishlist-only view
- Shopping bag with quantity controls, remove action, and subtotal
- Newsletter form with demo confirmation
- Accessible labels, keyboard Escape-to-close, and reduced-motion support

## Tech stack

- HTML5
- CSS3 (Grid, Flexbox, responsive media queries)
- Vanilla JavaScript (DOM events and in-memory state)
- Unsplash images for demo product photography

## Run locally

1. Download or clone this repository.
2. Open `index.html` in your browser.

Optional: use the **Live Server** extension in Visual Studio Code for a local development server.

## Add it to GitHub

1. Sign in to [GitHub](https://github.com/).
2. Click **New repository**.
3. Name it `stylenest-fashion-store`.
4. Choose **Public** if you want recruiters to see it, then create the repository.
5. Upload the files in this folder (`index.html`, `style.css`, `script.js`, and `README.md`) using **Add file → Upload files**, then commit.

### Or upload with Git

```bash
git init
git add .
git commit -m "Build responsive StyleNest fashion store"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/stylenest-fashion-store.git
git push -u origin main
```

Replace `YOUR-USERNAME` with your GitHub username.

## Publish it with GitHub Pages

1. Open the repository on GitHub.
2. Go to **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Select branch `main` and folder `/ (root)`, then click **Save**.
5. Wait for deployment and open the URL shown on the Pages screen.

## Suggested portfolio description

**StyleNest — Responsive Fashion E-commerce Website**  
Designed and developed a modern fashion storefront using HTML, CSS, and JavaScript. Implemented responsive product grids, live search, category filters, sorting, wishlist interactions, and a shopping bag with quantity management and subtotal calculation.

## Next improvements

- Add a product details page and product sizes
- Persist cart and wishlist with `localStorage`
- Connect a backend/API and database
- Add authentication and real checkout through a secure payment provider
- Add automated tests and improve product image loading

## Important notes

- This is a front-end demo. It does not process payments or store newsletter subscriptions.
- Product photos load from Unsplash and require an internet connection.
- Never commit API keys, passwords, or payment secrets to a public repository.
