import { Product, PolishShade, Review, FAQItem } from '../types';

export const HERO_IMAGE = '/src/assets/images/hero_pink_almond_manicure_1791703618198.jpg';
export const MACRO_ALMOND_NAIL_IMAGE = '/src/assets/images/macro_single_almond_nail_1791704081439.jpg';
export const BLUE_CHROME_HERO_IMAGE = '/src/assets/images/hero_press_on_nails_manicure_1791666634266.jpg';
export const SHAPE_SHOWCASE_IMAGE = '/src/assets/images/nail_shape_collection_showcase_1791666647244.jpg';
export const POLISH_STUDIO_IMAGE = '/src/assets/images/nail_polish_bottles_studio_1791666658830.jpg';
export const CUSTOMER_LIFESTYLE_IMAGE = '/src/assets/images/customer_lifestyle_manicure_1791666670126.jpg';
export const OPENING_BOX_IMAGE = '/src/assets/images/acrylic_nail_box_opening_1791702224519.jpg';
export const GINGHAM_BG_IMAGE = '/src/assets/images/sky_blue_gingham_bows_bg_1791702604222.jpg';

export const PRODUCTS: Product[] = [
  {
    id: 'celeste-acrylic-vault-bordeaux',
    name: 'Velvet Bordeaux Keepsake Vault',
    subtitle: 'Luxury 12-grid acrylic showcase with deep wine red, French chrome & swirl art',
    price: 2499,
    originalPrice: 2999,
    shape: 'almond',
    length: 'medium',
    finish: 'glazed-chrome',
    finishLabel: 'High-Gloss Wine & Chrome',
    colors: ['#670D1F', '#F4D9DC', '#E0E5EC'],
    primaryColorName: 'Bordeaux & Blush French',
    image: OPENING_BOX_IMAGE,
    hoverImage: HERO_IMAGE,
    badge: 'Collector Vault',
    description: 'Our signature runway vault as seen in the opening film. Arrives housed in a premium 12-compartment crystal acrylic display box featuring 30 salon press-ons in deep wine red gloss, blush French chrome tips, fluid swirl waves, and pearl inlays.',
    rating: 4.99,
    reviewCount: 428,
    occasion: 'Collector Edition & Gifting',
    features: ['Includes 12-Grid Clear Acrylic Keepsake Box', '30 Salon-Grade UV Nails', 'Pro Glue + 48 Waterproof Tabs', 'Glass Cuticle File & Buffer'],
    inStock: true
  },
  {
    id: 'celeste-glazed-sky',
    name: 'Glazed Sky Chrome',
    subtitle: 'Signature pearlescent sky blue with liquid silver micro-rim',
    price: 1899,
    originalPrice: 2299,
    shape: 'almond',
    length: 'medium',
    finish: 'glazed-chrome',
    finishLabel: 'Glazed Mirror Chrome',
    colors: ['#87CEEB', '#E6F4FA', '#C0C0C0'],
    primaryColorName: 'Sky Blue & Chrome',
    image: HERO_IMAGE,
    hoverImage: SHAPE_SHOWCASE_IMAGE,
    badge: 'Bestseller',
    description: 'Our viral signature manicure. Crafted with five layers of salon-grade gel, bathed in a celestial sky-blue pigment and finished with hand-burnished chrome mirror French tips and micro-pearl studs.',
    rating: 4.95,
    reviewCount: 342,
    occasion: 'Bridal & Daily Luxury',
    features: ['30 Reusable Salon Nails', 'Cruelty-Free Gel Polymer', 'Up to 3 Weeks Wear', 'Waterproof Adhesive Tabs + Pro Glue'],
    inStock: true
  },
  {
    id: 'celeste-cloud-french',
    name: 'Icy Cloud French',
    subtitle: 'Milky translucent base with high-gloss sky blue french smile lines',
    price: 1699,
    originalPrice: 1999,
    shape: 'almond',
    length: 'short',
    finish: 'french-tip',
    finishLabel: 'Modern Micro French',
    colors: ['#FFFFFF', '#87CEEB'],
    primaryColorName: 'Milky White & Sky',
    image: SHAPE_SHOWCASE_IMAGE,
    hoverImage: HERO_IMAGE,
    badge: 'Trending',
    description: 'Clean, subtle editorial elegance. Designed for high-comfort everyday wear with an ultra-natural cuticle curve that blends seamlessly into your natural nail bed.',
    rating: 4.88,
    reviewCount: 218,
    occasion: 'Office & Everyday',
    features: ['Pre-buffed Inner Surface', 'Chip-Proof UV Seal', 'Zero Nail Damage Removal', 'Includes 10 Sizing Tiers'],
    inStock: true
  },
  {
    id: 'celeste-pearl-dew',
    name: 'Pearl Dewdrop Coffin',
    subtitle: 'Iridescent pearl glazed coffin with 3D crystal rain droplets',
    price: 2199,
    originalPrice: 2599,
    shape: 'coffin',
    length: 'long',
    finish: 'pearl',
    finishLabel: '3D Dewdrop Glaze',
    colors: ['#EBF4FA', '#FFFFFF', '#DDF4FF'],
    primaryColorName: 'Iridescent Pearl',
    image: HERO_IMAGE,
    hoverImage: SHAPE_SHOWCASE_IMAGE,
    badge: 'Editorial Pick',
    description: 'A runway-inspired statement piece. Hand-sculpted raised resin dew drops resting on an opalescent glazed base that shifts from soft blue to luminous oyster white in different lights.',
    rating: 4.97,
    reviewCount: 189,
    occasion: 'Evening & Parties',
    features: ['Hand-Sculpted 3D Texture', 'Reinforced Apex Structure', 'Salon Strength', 'Sizing Kit Included'],
    inStock: true
  },
  {
    id: 'celeste-celestial-swirl',
    name: 'Celestial Aura Swirl',
    subtitle: 'Airbrushed soft blue center with negative-space chrome swirls',
    price: 1799,
    originalPrice: 2099,
    shape: 'oval',
    length: 'medium',
    finish: 'glazed-chrome',
    finishLabel: 'Airbrush Aura',
    colors: ['#87CEEB', '#2677A8', '#FFFFFF'],
    primaryColorName: 'Sky Blue Aura',
    image: CUSTOMER_LIFESTYLE_IMAGE,
    hoverImage: HERO_IMAGE,
    badge: 'Fan Favorite',
    description: 'The dreamy aura trend reimagined in sky-blue serenity. Each nail boasts an airbrushed radial gradient surrounded by flowing chrome calligraphy ribbons.',
    rating: 4.92,
    reviewCount: 154,
    occasion: 'Weekend Aesthetic',
    features: ['Double Gel Coated', 'High-Gloss Glass Finish', 'Reusable up to 6 times', 'Travel Pouch Included'],
    inStock: true
  },
  {
    id: 'celeste-minimal-square',
    name: 'Short Square Cerulean',
    subtitle: 'Contemporary squoval in calming monochromatic baby blue glaze',
    price: 1499,
    originalPrice: 1799,
    shape: 'square',
    length: 'short',
    finish: 'gel-gloss',
    finishLabel: 'High-Shine Pure Gel',
    colors: ['#A2D2FF', '#FFFFFF'],
    primaryColorName: 'Pure Cerulean',
    image: SHAPE_SHOWCASE_IMAGE,
    hoverImage: HERO_IMAGE,
    badge: 'Classic',
    description: 'Minimalist perfection for keyboards, workdays, and effortless chic. Crisp square contouring with softened corners for anti-snag durability.',
    rating: 4.85,
    reviewCount: 290,
    occasion: 'Daily Workwear',
    features: ['Typing-Friendly Ergonomics', 'Flexible Cuticle Edge', 'Durable Poly-Resin', 'Complete Prep Tool Kit'],
    inStock: true
  },
  {
    id: 'celeste-holographic-halo',
    name: 'Holographic Stiletto Aura',
    subtitle: 'Sharp stiletto silhouette with prismatic prism-sheen topcoat',
    price: 2399,
    originalPrice: 2799,
    shape: 'stiletto',
    length: 'long',
    finish: 'holographic',
    finishLabel: 'Prism Holo Chrome',
    colors: ['#BEE1E6', '#DFE7FD', '#C77DFF'],
    primaryColorName: 'Holo Sky Prismatic',
    image: HERO_IMAGE,
    hoverImage: CUSTOMER_LIFESTYLE_IMAGE,
    badge: 'Limited Run',
    description: 'Daring and celestial. A dramatic stiletto contour infused with holographic micro-flakes that refract light into pastel rainbows under sunlight or flash.',
    rating: 4.94,
    reviewCount: 112,
    occasion: 'Fashion & Festival',
    features: ['Structural Reinforced Tip', 'Includes Custom Buffing Block', '30 Nail Pieces', 'Precision Application Wand'],
    inStock: true
  },
  {
    id: 'celeste-milk-azure-ombre',
    name: 'Milk & Azure Ombré',
    subtitle: 'Seamless melt from creamy porcelain into vibrant ocean sky',
    price: 1649,
    originalPrice: 1949,
    shape: 'almond',
    length: 'medium',
    finish: 'gel-gloss',
    finishLabel: 'Seamless Ombré',
    colors: ['#FFFFFF', '#72B0D7'],
    primaryColorName: 'Azure Gradient',
    image: CUSTOMER_LIFESTYLE_IMAGE,
    hoverImage: SHAPE_SHOWCASE_IMAGE,
    badge: 'Bestseller',
    description: 'A smooth transition from rich coconut milk white to serene Mediterranean sky blue. Flawlessly smooth finish with zero airbrush graininess.',
    rating: 4.9,
    reviewCount: 176,
    occasion: 'Vacation & Brunch',
    features: ['Fade-Proof Pigments', 'Resistant to Hand Sanitizer', 'Comfort-Fit Tapering', '10-Minute Application'],
    inStock: true
  },
  {
    id: 'celeste-daisy-skies',
    name: 'Wildflower Blue Bloom',
    subtitle: 'Hand-painted miniature white daisy florets on pale pastel sky',
    price: 1999,
    originalPrice: 2399,
    shape: 'oval',
    length: 'medium',
    finish: 'gel-gloss',
    finishLabel: 'Artisan Hand-Painted',
    colors: ['#90E0EF', '#FFFFFF', '#FFD166'],
    primaryColorName: 'Sky Floral',
    image: CUSTOMER_LIFESTYLE_IMAGE,
    hoverImage: HERO_IMAGE,
    badge: 'Artisan Crafted',
    description: 'Inspired by alpine spring mornings. Miniature white daisy blooms with sun-gold centers delicately arranged on a glassy sky-blue foundation.',
    rating: 4.96,
    reviewCount: 164,
    occasion: 'Spring & Garden Events',
    features: ['Artisan Painted Motifs', 'Triple UV Topcoat', 'Salon Manicure Quality', 'Luxury Gift Box Packaging'],
    inStock: true
  }
];

export const POLISH_SHADES: PolishShade[] = [
  {
    id: 'shade-baby-blue',
    name: 'Baby Blue Seraph',
    hex: '#87CEEB',
    finish: 'High-Gloss Gel Finish',
    tagline: 'The signature soft sky hue that started our brand',
    price: 699,
    volume: '15ml / 0.5 fl oz',
    swatchTone: 'cool',
    description: 'A pure, dreamy sky tone inspired by clear Mediterranean noon skies. 1-coat opacity with a glass-like shine.'
  },
  {
    id: 'shade-milky-white',
    name: 'Porcelain Cloud',
    hex: '#F8F9FA',
    finish: 'Milky Glaze',
    tagline: 'The viral glazed-donut sheer milk base',
    price: 699,
    volume: '15ml / 0.5 fl oz',
    swatchTone: 'neutral',
    description: 'Semi-sheer buildable porcelain lacquer. Perfect for negative space nail art or ethereal clean-girl manis.'
  },
  {
    id: 'shade-pearl-pink',
    name: 'Blushing Nacre',
    hex: '#FDE2E4',
    finish: 'Iridescent Pearl',
    tagline: 'Subtle romantic glow with oyster shell luster',
    price: 749,
    volume: '15ml / 0.5 fl oz',
    swatchTone: 'warm',
    description: 'Ultra-fine natural pearl powder blended into a soft petal pink lacquer with baby blue undertones.'
  },
  {
    id: 'shade-icy-silver',
    name: 'Liquid Quicksilver',
    hex: '#D6E2E8',
    finish: 'Mirror Chrome Metal',
    tagline: 'Reflective silver sheen with ice blue undertone',
    price: 799,
    volume: '15ml / 0.5 fl oz',
    swatchTone: 'cool',
    description: 'Non-tarnishing molten silver lacquer designed for razor-sharp French tips and cyber chrome accents.'
  },
  {
    id: 'shade-lavender-mist',
    name: 'Periwinkle Breeze',
    hex: '#C5CAE9',
    finish: 'Pastel Crème',
    tagline: 'A delicate bridge between sky blue and gentle lilac',
    price: 699,
    volume: '15ml / 0.5 fl oz',
    swatchTone: 'cool',
    description: 'Calming periwinkle hue that pairs seamlessly with soft sky press-on styles for mixed accent nails.'
  },
  {
    id: 'shade-sky-chrome',
    name: 'Glazed Stratosphere',
    hex: '#74B9FF',
    finish: 'Duochrome Shimmer',
    tagline: 'Dynamic shifts from glacial cyan to ethereal violet',
    price: 799,
    volume: '15ml / 0.5 fl oz',
    swatchTone: 'cool',
    description: 'Infused with optical interference pigments that catch studio flashes and sunlight with breathtaking depth.'
  },
  {
    id: 'shade-nude-beige',
    name: 'Cashmere Nude',
    hex: '#EAD7C5',
    finish: 'Full Coverage Crème',
    tagline: 'The ultimate warm neutral canvas',
    price: 699,
    volume: '15ml / 0.5 fl oz',
    swatchTone: 'warm',
    description: 'A comforting nude shade formulated to flatter diverse undertones while letting nail art accents sing.'
  },
  {
    id: 'shade-ocean-blue',
    name: 'Midnight Deep Azure',
    hex: '#2677A8',
    finish: 'Rich Jelly Crème',
    tagline: 'Deep abyssal blue for high-contrast statements',
    price: 749,
    volume: '15ml / 0.5 fl oz',
    swatchTone: 'deep',
    description: 'Rich marine pigment offering high-fashion contrast against pale sky and white press-on tips.'
  }
];

export const REVIEWS: Review[] = [
  {
    id: 'rev-1',
    author: 'Aanya Sharma',
    location: 'Mumbai, Maharashtra',
    rating: 5,
    date: '3 days ago',
    productName: 'Glazed Sky Chrome',
    shapePurchased: 'Almond (Medium)',
    verified: true,
    avatarColor: '#87CEEB',
    comment: 'I wore these for a 4-day destination wedding in Udaipur. People genuinely thought I spent ₹6,000 at a high-end salon. The chrome french tips didn’t chip even once, and removing them with warm oil was painless!'
  },
  {
    id: 'rev-2',
    author: 'Rhea Sengupta',
    location: 'Bengaluru, Karnataka',
    rating: 5,
    date: '1 week ago',
    productName: 'Icy Cloud French',
    shapePurchased: 'Almond (Short)',
    verified: true,
    avatarColor: '#DDF4FF',
    comment: 'The short almond shape is a gamechanger for typing 8 hours a day. The curved cuticle edge is so thin it looks like it grew out of my hands. Packing and sizing kit was 10/10.'
  },
  {
    id: 'rev-3',
    author: 'Priya Mehra',
    location: 'New Delhi, Delhi',
    rating: 5,
    date: '2 weeks ago',
    productName: 'Pearl Dewdrop Coffin',
    shapePurchased: 'Coffin (Long)',
    verified: true,
    avatarColor: '#BEE1E6',
    comment: 'The 3D dewdrop texture feels like real water droplets frozen in glass! The blue-white pearlescent shift is unreal under daylight. Reused them twice already.'
  },
  {
    id: 'rev-4',
    author: 'Tanvi Deshmukh',
    location: 'Pune, Maharashtra',
    rating: 5,
    date: '3 weeks ago',
    productName: 'Wildflower Blue Bloom',
    shapePurchased: 'Oval (Medium)',
    verified: true,
    avatarColor: '#72B0D7',
    comment: 'The tiny daisy flowers are so crisp and dainty. It comes with both glue and adhesive tabs — I used the tabs for a Saturday brunch and took them off before bedtime with zero nail damage.'
  }
];

export const FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'sizing',
    question: 'How do I find my exact nail size?',
    answer: 'Every CÉLESTE box contains 30 nail pieces across 10 distinct width sizes (from 8mm pinky to 18mm thumb), ensuring a tailored fit for 99% of hands without measuring. If you prefer tailored custom sizing, place clear tape over the widest part of your natural nail, mark the sidewalls with a pen, and measure against a millimeter ruler.'
  },
  {
    id: 'faq-2',
    category: 'application',
    question: 'What is included in each press-on kit?',
    answer: 'Each kit arrives in a luxury transparent acrylic keepsake box with: 30 Gel Press-On Nails, 48 Waterproof Medical-Grade Adhesive Tabs (for 1-3 day temporary wear), 1 Pro Nail Bond Glue with precision nozzle (for 2-3 week wear), 1 Dual-Grit Glass Nail File, 1 Rosewood Cuticle Pusher, and 2 Lint-Free Prep Alcohol Pads.'
  },
  {
    id: 'faq-3',
    category: 'durability',
    question: 'Are CÉLESTE press-on nails reusable?',
    answer: 'Yes! Our nails are molded from high-density cosmetic acrylic polymers and coated in salon UV gel. When applied with adhesive tabs, they can be worn and gently peeled off infinitely. When applied with glue, gentle soaking in warm water with olive oil dissolves the adhesive without damaging the nail structure.'
  },
  {
    id: 'faq-4',
    category: 'shipping',
    question: 'What are the delivery times and shipping rates across India?',
    answer: 'We provide Free Express Courier delivery across India on all orders over ₹1,999 (flat ₹120 for smaller orders). Metro cities (Mumbai, Delhi-NCR, Bengaluru, Hyderabad, Chennai, Kolkata) typically receive deliveries within 2–3 business days.'
  },
  {
    id: 'faq-5',
    category: 'durability',
    question: 'Can I shower, wash hair, and do chores wearing these?',
    answer: 'Absolutely. After applying with our Pro Nail Bond glue, wait 60 minutes for the polymer matrix to cure fully. After that, they are 100% waterproof and withstand warm showers, dishwashing, and swimming.'
  }
];
