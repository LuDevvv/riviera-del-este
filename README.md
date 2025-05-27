# Riviera del Este - Real Estate Landing Page

A modern, multilingual real estate landing page built with Next.js 15, showcasing luxury residential properties in San Pedro de Macorís, Dominican Republic.

## 🏗️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS 4
- **Internationalization**: next-intl
- **Animations**: Framer Motion
- **Forms**: React Hook Form + Zod validation
- **Email**: Resend API
- **Image Optimization**: Next.js Image + Cloudinary
- **Smooth Scrolling**: Lenis
- **Carousel**: Swiper.js

## 🌟 Features

- **Multilingual Support** (English/Spanish)
- **Responsive Design** - Mobile-first approach
- **Property Showcase** - 6 distinct apartment types
- **Interactive Gallery** - Filtered image carousel
- **Contact Form** - With email notifications
- **Smooth Animations** - Intersection Observer based
- **SEO Optimized** - Static generation & metadata
- **Performance First** - Image optimization & lazy loading

## 🏠 Property Types

1. **Tipo A - 1er Piso**: 2bed/2bath, 85m² + patio
2. **Tipo A - 3er Piso**: 2bed/2bath, 75m²
3. **Tipo A - 4to Piso**: 2bed/2bath, 100m² + terraza
4. **Tipo B**: 3bed/2bath, 115m²
5. **Tipo D - 1er Piso**: 3bed/3bath, 115m² + patio
6. **Penthouse Premium**: 3bed/3bath, 200m² + terraza + studio

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm/yarn/pnpm

### Installation

```bash
# Clone repository
git clone <repository-url>
cd riviera-del-este

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
```

### Environment Variables

```env
# Email Configuration (Resend)
RESEND_API_KEY=your_resend_api_key
EMAIL_FROM=noreply@rivieradeleste.com
EMAIL_TO=info@casalinainmobiliaria.com

# Optional: Analytics
NEXT_PUBLIC_GA_ID=your_google_analytics_id
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── [locale]/          # Internationalized routes
│   ├── api/contact/       # Contact form API
│   └── globals.css        # Global styles
├── components/
│   ├── sections/          # Page sections
│   ├── ui/               # Reusable UI components
│   └── landing/          # Layout components
├── hooks/                # Custom React hooks
├── i18n/                 # Internationalization
│   ├── messages/         # Translation files
│   └── routing.ts        # Locale routing
├── lib/                  # Utilities & types
└── services/             # API services
```

## 🎨 Key Components

### Property Cards

- Dynamic property data from real specifications
- Responsive layout with consistent heights
- Multi-language support
- Reservation CTA ($1,000 USD)

### Image Slider

- Infinite loop navigation
- Auto-play with pause on hover
- Responsive previews
- Touch/swipe support

### Contact Form

- Zod validation
- Email notifications via Resend
- Event-specific date selection
- Success/error states

## 🌐 Internationalization

Supports English (`en`) and Spanish (`es`) with:

- URL-based locale switching (`/en`, `/es`)
- Language switcher component
- Translated content for all sections
- Locale-aware routing

## 📧 Email Integration

Uses Resend API for contact form submissions:

- Professional HTML email templates
- Agent photo and contact info
- Form data sanitization
- Error handling & validation

## 🚀 Deployment

### Build

```bash
npm run build
npm start
```

### Vercel (Recommended)

```bash
# Deploy to Vercel
vercel --prod
```

Configure environment variables in Vercel dashboard.

## 📱 Performance Optimizations

- **Images**: Next.js Image with Cloudinary CDN
- **Fonts**: Google Fonts with display swap
- **Bundle**: Code splitting & tree shaking
- **Animations**: Hardware acceleration & reduced motion
- **Loading**: Lazy loading & prefetching

## 🎯 Special Features

### Property Showcase Event

- June 6-8, 2025 promotional event
- Special offer: Free appliances with $1,000 reservation
- Countdown timer component
- Event-specific contact form

### Location Integration

- Embedded Google Maps
- Real coordinates: 18°27'00.7"N 69°19'24.0"W
- Property details overlay
- Mobile-responsive design

## 🔧 Available Scripts

```bash
npm run dev          # Development server
npm run build        # Production build
npm run start        # Production server
npm run lint         # ESLint check
```

## 📄 License

© 2025 Riviera del Este. All rights reserved.

## 🤝 Contact

**Real Estate Agent**: Rufy Castor  
**Phone**: +1 (809) 299-5767  
**Email**: info@casalinainmobiliaria.com  
**Address**: Calle Santos Alcalá, San Pedro de Macorís 21000
