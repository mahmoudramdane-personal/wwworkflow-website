# WWWorkflows Website

A modern e-learning platform for architecture and design workflows, built with Next.js and integrated with Shopify and Gumroad for course sales.

[![Vercel](https://img.shields.io/badge/Vercel-deployed-success?style=flat&logo=vercel)](https://vercel.com)
[![Next.js](https://img.shields.io/badge/Next.js-12.3.0-black?style=flat&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18.2.0-blue?style=flat&logo=react)](https://reactjs.org/)

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [Deployment](#deployment)
- [API Integration](#api-integration)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)

## Overview

WWWorkflows is an educational platform offering courses in architectural design workflows, particularly focused on Grasshopper and parametric design. The website features:

- Course catalog and detailed course pages
- E-commerce functionality via Shopify integration
- Additional product sales via Gumroad
- Contact forms with email integration
- Blog section
- Responsive design with Tailwind CSS

**Live Site:** [flowdraft.vercel.app](https://flowdraft.vercel.app) *(Update with your domain)*

**Repository:** https://github.com/mahmoudramdane-personal/wwworkflow-website

## Features

### Core Features
- 🎓 **Course Catalog** - Browse and view detailed course information
- 🛒 **Shopify Integration** - Full e-commerce functionality with cart and checkout
- 📦 **Gumroad Integration** - Alternative product sales platform
- 📧 **Contact Forms** - Email integration via Nodemailer
- 📱 **Responsive Design** - Mobile-first approach with Tailwind CSS
- 🎨 **Animations** - Smooth animations with Framer Motion and GSAP
- 🔍 **SEO Optimized** - Meta tags and Open Graph support

### Additional Features
- 📰 Blog section for articles and updates
- 💬 Testimonials carousel
- 🤝 Client logos/trust badges
- 📅 Calendly integration for bookings
- 🖼️ Image optimization with Next.js Image component
- ⚡ Fast page loads with static generation

## Tech Stack

### Frontend
- **Framework:** Next.js 12.3.0 (Pages Router)
- **UI Library:** React 18.2.0
- **Styling:** Tailwind CSS 3.1.8 + Chakra UI 2.5.1
- **Animations:** Framer Motion 10.0.1, GSAP 3.8.0
- **Icons:** Heroicons React
- **Carousel:** Swiper 8.4.7

### Backend & APIs
- **API Routes:** Next.js API Routes
- **E-commerce:** Shopify Storefront API
- **Digital Products:** Gumroad API
- **Email:** Nodemailer with Gmail
- **Form Handling:** EmailJS

### Build Tools
- **Bundler:** Next.js built-in
- **CSS Processor:** PostCSS + Autoprefixer
- **Linting:** ESLint with Next.js config
- **Package Manager:** Yarn (primary) / npm

## Getting Started

### Prerequisites

- Node.js 16.x or higher
- Yarn or npm
- Git

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/mahmoudramdane-personal/wwworkflow-website.git
   cd wwworkflow-website
   ```

2. **Install dependencies:**
   ```bash
   yarn install
   # or
   npm install
   ```

3. **Set up environment variables:**
   - Copy `.env.local.example` to `.env.local` (create the example file if it doesn't exist)
   - Fill in your environment variables (see [Environment Variables](#environment-variables) section)

4. **Run the development server:**
   ```bash
   yarn dev
   # or
   npm run dev
   ```

5. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
yarn build
# or
npm run build
```

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

### Required Variables

```env
# Shopify Configuration
SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
SHOPIFY_STOREFRONT_ACCESSTOKEN=your_storefront_access_token

# Gumroad Configuration (for /shop page)
ACCESS_TOKEN=your_gumroad_access_token
APPLICATION_ID=your_gumroad_app_id
APPLICATION_SECRET=your_gumroad_app_secret

# Email Configuration (Contact Form)
EMAIL_ADDRESS=your_email@gmail.com
APP_PASSWORD=your_gmail_app_password
```

### How to Obtain These Credentials

#### Shopify
1. Go to your Shopify Admin → Settings → Apps and sales channels
2. Click "Develop apps" → "Create an app"
3. Enable Storefront API access
4. Copy the Storefront access token

#### Gumroad
1. Go to [Gumroad Settings](https://app.gumroad.com/settings)
2. Navigate to "Advanced" tab
3. Generate API credentials

#### Gmail App Password
1. Go to Google Account → Security
2. Enable 2-Step Verification
3. Generate an App Password for "Mail"
4. Use this password in `APP_PASSWORD`

## Project Structure

```
wwworkflow-website/
├── assets/                    # Static assets (images, logos)
│   ├── data/                 # JSON data files (courses, hero sections)
│   └── trustUs/              # Client logo images
│
├── components/               # React components
│   ├── Layout.js            # Page layout wrapper
│   ├── Nav.js               # Navigation component
│   ├── Footer.js            # Footer component
│   ├── Hero.js              # Homepage hero section
│   ├── CoursesSection.js    # Featured courses section
│   ├── CourseList.js        # Course listing grid
│   ├── Testimonials.js      # Testimonials carousel
│   ├── TrustUs.js           # Client logos section
│   └── ... (25+ components)
│
├── context/
│   └── shopContext.js       # Shopping cart state management
│
├── lib/
│   ├── shopify.js           # Shopify API functions
│   ├── Data.js              # Data utilities
│   └── contactApi.js        # Contact form API
│
├── pages/                    # Next.js routes (file-based)
│   ├── _app.js              # App wrapper
│   ├── index.js             # Homepage
│   ├── courses.js           # Courses listing
│   ├── course.js            # Individual course page
│   ├── shop.js              # Shopify/Gumroad shop
│   ├── blog.js              # Blog page
│   ├── contact.js           # Contact page
│   ├── login.js             # Login page
│   └── api/                 # API routes
│       ├── available.js     # Shopify product availability
│       ├── gumroad.js       # Gumroad products
│       ├── send-mail.js     # Contact form handler
│       └── ...
│
├── public/                   # Public static files
│   └── coursesMedia/        # Course images
│
├── styles/                   # CSS styles
│   ├── globals.css          # Global styles
│   └── Home.module.css      # Homepage module styles
│
├── utils/                    # Utility functions
│   ├── helpers.js           # Helper functions
│   └── page-wrapper.js      # Page animation wrapper
│
├── next.config.js           # Next.js configuration
├── tailwind.config.js       # Tailwind CSS configuration
├── package.json             # Dependencies
└── README.md                # This file
```

## Deployment

### Deploying to Vercel

1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Import to Vercel:**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Import your GitHub repository
   - Vercel will auto-detect Next.js settings

3. **Configure Environment Variables:**
   - In Vercel Dashboard → Project Settings → Environment Variables
   - Add all variables from [Environment Variables](#environment-variables) section
   - Set for Production, Preview, and Development

4. **Deploy:**
   - Click "Deploy"
   - Vercel will build and deploy automatically

### Custom Domain Setup

1. **In Vercel:**
   - Go to Project Settings → Domains
   - Add your custom domain

2. **In Namecheap (or your registrar):**
   
   **Option A - Nameservers (Easiest):**
   - Set nameservers to:
     - `ns1.vercel-dns.com`
     - `ns2.vercel-dns.com`
   
   **Option B - DNS Records:**
   - A Record: `@` → `76.76.21.21`
   - CNAME Record: `www` → `cname.vercel-dns.com`

3. **Wait for DNS propagation** (up to 48 hours, usually faster)

## API Integration

### Shopify
The site uses Shopify Storefront API for:
- Fetching products and collections
- Creating checkout sessions
- Managing cart state

**Key files:**
- `lib/shopify.js` - API functions
- `context/shopContext.js` - Cart state management
- `pages/api/available.js` - Product availability check

### Gumroad
Used for selling digital products and courses.

**Key files:**
- `pages/api/gumroad.js` - Gumroad API functions
- `pages/shop.js` - Shop page (includes error handling for missing env vars)

### Email
Contact form uses Nodemailer with Gmail SMTP.

**Key files:**
- `pages/api/send-mail.js` - Email handler
- `lib/contactApi.js` - Contact API utilities

## Troubleshooting

### Common Issues

#### Build Error: "SyntaxError: Unexpected end of JSON input"
**Cause:** `/shop` page trying to fetch Gumroad API without environment variables
**Solution:** Add Gumroad environment variables OR the page now handles this gracefully (returns empty array)

#### Images Not Loading
**Cause:** Missing image files or incorrect paths
**Solution:** 
- Ensure images are in `public/` or `assets/` directories
- Use correct relative paths in components

#### Shopify Products Not Loading
**Cause:** Invalid credentials or Storefront API not enabled
**Solution:**
- Verify `SHOPIFY_STORE_DOMAIN` and `SHOPIFY_STOREFRONT_ACCESSTOKEN`
- Check Storefront API permissions in Shopify Admin

#### Contact Form Not Sending
**Cause:** Gmail authentication issues
**Solution:**
- Use App Password (not regular password)
- Enable "Less secure app access" (deprecated) OR use App Password
- Check `EMAIL_ADDRESS` and `APP_PASSWORD` env vars

#### Styles Not Applied
**Cause:** Tailwind CSS not building
**Solution:**
```bash
rm -rf node_modules .next
yarn install
yarn dev
```

### Development Tips

1. **Check environment variables** are loaded:
   ```bash
   console.log(process.env.SHOPIFY_STORE_DOMAIN)
   ```

2. **Clear cache** if experiencing weird issues:
   ```bash
   rm -rf .next
   yarn dev
   ```

3. **Check build locally** before deploying:
   ```bash
   yarn build
   yarn start
   ```

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit changes: `git commit -m 'Add your feature'`
4. Push to branch: `git push origin feature/your-feature`
5. Open a Pull Request

## License

This project is private and proprietary. All rights reserved.

## Support

For issues or questions:
- Check the [Troubleshooting](#troubleshooting) section
- Review [PROGRESS.md](./PROGRESS.md) for recent changes
- Create an issue in the GitHub repository

## Credits

- Original template: [3anfarite/flowdraft](https://github.com/3anfarite/flowdraft)
- Icons: [Heroicons](https://heroicons.com/)
- UI Components: [Chakra UI](https://chakra-ui.com/)
- Animation: [Framer Motion](https://www.framer.com/motion/)

---

**Last Updated:** February 2026
**Maintainer:** Mahmoud Ramdane
