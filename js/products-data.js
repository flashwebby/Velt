/* ============================================================
   VELT PRODUCTS DATA SERVICE (SUPABASE-READY ARCHITECTURE)
   ============================================================ */

/**
 * Product Database Schema:
 * @typedef {Object} Product
 * @property {string} id - Unique UUID/slug (Supabase primary key)
 * @property {string} title - Product commercial name
 * @property {string} category - Category slug ('outerwear'|'tailoring'|'tops'|'trousers'|'accessories')
 * @property {number} price - Numerical price in INR
 * @property {string} priceFormatted - Formatted currency string
 * @property {string} image - High-res CDN/Unsplash photography URL
 * @property {string} [secondaryImage] - Optional alternate hover angle
 * @property {string} description - Editorial description
 * @property {string[]} tags - Search & filter tags
 * @property {string} season - Season code ('S04-2026')
 * @property {boolean} isNew - New release flag
 * @property {boolean} inStock - Stock availability flag
 */

const VELT_PRODUCTS = [
  // ----------------- OUTERWEAR (1-14) -----------------
  {
    id: "velt-prod-01",
    title: "THE STRUCTURE COAT",
    category: "outerwear",
    price: 18900,
    priceFormatted: "₹ 18,900",
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=900&q=85",
    description: "Heavyweight bonded wool trench with architectural storm flap and dropped shoulders.",
    tags: ["coat", "wool", "heavyweight", "outerwear"],
    season: "S04-2026",
    isNew: true,
    inStock: true
  },
  {
    id: "velt-prod-02",
    title: "WEIGHT ZIP-UP JACKET",
    category: "outerwear",
    price: 9800,
    priceFormatted: "₹ 9,800",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=85",
    description: "Matte black technical canvas with two-way gunmetal zip and internal storm strap.",
    tags: ["jacket", "zip", "technical", "outerwear"],
    season: "S04-2026",
    isNew: false,
    inStock: true
  },
  {
    id: "velt-prod-03",
    title: "FIELD BOMBER S04",
    category: "outerwear",
    price: 14500,
    priceFormatted: "₹ 14,500",
    image: "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?auto=format&fit=crop&w=900&q=85",
    description: "Cropped tactical bomber in structured olive nylon with geometric sleeve utility pocket.",
    tags: ["bomber", "tactical", "olive", "outerwear"],
    season: "S04-2026",
    isNew: true,
    inStock: true
  },
  {
    id: "velt-prod-04",
    title: "MONOLITH OVERCOAT",
    category: "outerwear",
    price: 24500,
    priceFormatted: "₹ 24,500",
    image: "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=900&q=85",
    description: "Maxi-length midnight charcoal coat with concealed horn buttons and raw hemline.",
    tags: ["overcoat", "maxi", "charcoal", "outerwear"],
    season: "S04-2026",
    isNew: true,
    inStock: true
  },
  {
    id: "velt-prod-05",
    title: "INSULATED SHELL PARKA",
    category: "outerwear",
    price: 21000,
    priceFormatted: "₹ 21,000",
    image: "https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=900&q=85",
    description: "3-layer weatherproof membrane with down-fill chambers and magnetic storm placket.",
    tags: ["parka", "weatherproof", "insulated", "outerwear"],
    season: "S04-2026",
    isNew: false,
    inStock: true
  },
  {
    id: "velt-prod-06",
    title: "LEATHER COLLAR MACKINTOSH",
    category: "outerwear",
    price: 26800,
    priceFormatted: "₹ 26,800",
    image: "https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&w=900&q=85",
    description: "Rubberized bonded cotton coat featuring contrast black nappa calfskin collar.",
    tags: ["mackintosh", "leather", "coat", "outerwear"],
    season: "S04-2026",
    isNew: true,
    inStock: true
  },
  {
    id: "velt-prod-07",
    title: "SCULPTED MOTORCYCLE JACKET",
    category: "outerwear",
    price: 32000,
    priceFormatted: "₹ 32,000",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=900&q=85",
    description: "Heavy full-grain oiled leather with custom matte steel hardware and articulated elbow darts.",
    tags: ["leather", "biker", "jacket", "outerwear"],
    season: "S04-2026",
    isNew: false,
    inStock: true
  },
  {
    id: "velt-prod-08",
    title: "BOXY SHEARLING AVIATOR",
    category: "outerwear",
    price: 38500,
    priceFormatted: "₹ 38,500",
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=900&q=85",
    description: "Vintage treated Spanish merino shearling with buckled throat latch and wide lapels.",
    tags: ["shearling", "aviator", "outerwear", "luxury"],
    season: "S04-2026",
    isNew: true,
    inStock: true
  },
  {
    id: "velt-prod-09",
    title: "MODULAR UTILITY VEST",
    category: "outerwear",
    price: 8900,
    priceFormatted: "₹ 8,900",
    image: "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=900&q=85",
    description: "Layering tactical vest with detachable 3D cargo pockets and MOLLE nylon straps.",
    tags: ["vest", "tactical", "gilet", "outerwear"],
    season: "S04-2026",
    isNew: false,
    inStock: true
  },
  {
    id: "velt-prod-10",
    title: "VENTED COACH JACKET",
    category: "outerwear",
    price: 11200,
    priceFormatted: "₹ 11,200",
    image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=900&q=85",
    description: "Crisp technical poplin coach jacket with rear storm vent and toggle hem drawcord.",
    tags: ["coach", "jacket", "streetwear", "outerwear"],
    season: "S04-2026",
    isNew: false,
    inStock: true
  },
  {
    id: "velt-prod-11",
    title: "ASYMMETRIC QUILTED PUFFER",
    category: "outerwear",
    price: 22400,
    priceFormatted: "₹ 22,400",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=900&q=85",
    description: "90/10 goose down puffer with crossover magnetic closure and interior backpack carry straps.",
    tags: ["puffer", "down", "quilted", "outerwear"],
    season: "S04-2026",
    isNew: true,
    inStock: true
  },
  {
    id: "velt-prod-12",
    title: "OVERSIZED KIMONO JACKET",
    category: "outerwear",
    price: 16200,
    priceFormatted: "₹ 16,200",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=85",
    description: "Japanese raw denim haori kimono coat with contrast selvedge interior binding.",
    tags: ["kimono", "denim", "haori", "outerwear"],
    season: "S04-2026",
    isNew: false,
    inStock: true
  },
  {
    id: "velt-prod-13",
    title: "TECH-FLEECE ANORAK",
    category: "outerwear",
    price: 10500,
    priceFormatted: "₹ 10,500",
    image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=900&q=85",
    description: "High-pile bonded thermal fleece with ripstop nylon hood and front kangaroo pouch.",
    tags: ["anorak", "fleece", "hoodie", "outerwear"],
    season: "S04-2026",
    isNew: false,
    inStock: true
  },
  {
    id: "velt-prod-14",
    title: "MINIMALIST HARRINGTON",
    category: "outerwear",
    price: 13800,
    priceFormatted: "₹ 13,800",
    image: "https://images.unsplash.com/photo-1520975954732-35dd22299614?auto=format&fit=crop&w=900&q=85",
    description: "Matte structured twill harrington jacket with funnel stand collar and clean welt pockets.",
    tags: ["harrington", "jacket", "minimal", "outerwear"],
    season: "S04-2026",
    isNew: true,
    inStock: true
  },

  // ----------------- TAILORING (15-24) -----------------
  {
    id: "velt-prod-15",
    title: "SCULPTED DOUBLE-BREASTED BLAZER",
    category: "tailoring",
    price: 21500,
    priceFormatted: "₹ 21,500",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=900&q=85",
    description: "Strong shoulder silhouette in 380gsm Italian virgin wool with peak lapels.",
    tags: ["blazer", "tailoring", "wool", "formal"],
    season: "S04-2026",
    isNew: true,
    inStock: true
  },
  {
    id: "velt-prod-16",
    title: "COLLARLESS STUDIO JACKET",
    category: "tailoring",
    price: 17800,
    priceFormatted: "₹ 17,800",
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=900&q=85",
    description: "Zenith minimalist suiting jacket with no lapels, clean hidden placket and cupro lining.",
    tags: ["collarless", "blazer", "minimalist", "tailoring"],
    season: "S04-2026",
    isNew: true,
    inStock: true
  },
  {
    id: "velt-prod-17",
    title: "OVERSIZED PLEATED BLAZER",
    category: "tailoring",
    price: 19500,
    priceFormatted: "₹ 19,500",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=85",
    description: "Relaxed drape silhouette cut from fluid wool-gabardine with deep back side vents.",
    tags: ["oversized", "blazer", "tailoring", "editorial"],
    season: "S04-2026",
    isNew: false,
    inStock: true
  },
  {
    id: "velt-prod-18",
    title: "BELTED OPERA COAT",
    category: "tailoring",
    price: 28000,
    priceFormatted: "₹ 28,000",
    image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=900&q=85",
    description: "Tailored longline evening robe coat with self-fabric wrap sash and kimono sleeves.",
    tags: ["coat", "tailoring", "evening", "luxury"],
    season: "S04-2026",
    isNew: true,
    inStock: true
  },
  {
    id: "velt-prod-19",
    title: "CROPPED FORMAL JACKET",
    category: "tailoring",
    price: 16500,
    priceFormatted: "₹ 16,500",
    image: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=900&q=85",
    description: "Bolero-inspired tailored jacket with sharp square shoulders and silver bar closure.",
    tags: ["cropped", "jacket", "tailoring", "formal"],
    season: "S04-2026",
    isNew: false,
    inStock: true
  },
  {
    id: "velt-prod-20",
    title: "CHALK STRIPE POWER BLAZER",
    category: "tailoring",
    price: 22800,
    priceFormatted: "₹ 22,800",
    image: "https://images.unsplash.com/photo-1598554747436-c9293d6a588f?auto=format&fit=crop&w=900&q=85",
    description: "Subtle silver chalk stripe on midnight navy suiting wool with exaggerated 90s silhouette.",
    tags: ["stripe", "pinstripe", "blazer", "tailoring"],
    season: "S04-2026",
    isNew: false,
    inStock: true
  },
  {
    id: "velt-prod-21",
    title: "STRUCTURED WAISTCOAT",
    category: "tailoring",
    price: 9400,
    priceFormatted: "₹ 9,400",
    image: "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=900&q=85",
    description: "Fitted tailoring vest designed to be worn standalone or layered over oversized shirts.",
    tags: ["waistcoat", "vest", "tailoring", "formal"],
    season: "S04-2026",
    isNew: true,
    inStock: true
  },
  {
    id: "velt-prod-22",
    title: "TUXEDO KIMONO BLAZER",
    category: "tailoring",
    price: 25400,
    priceFormatted: "₹ 25,400",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=900&q=85",
    description: "Satin shawl collar with crossover internal tie fastening in heavyweight barathea wool.",
    tags: ["tuxedo", "kimono", "blacktie", "tailoring"],
    season: "S04-2026",
    isNew: false,
    inStock: true
  },
  {
    id: "velt-prod-23",
    title: "TECHNICAL DRAPE BLAZER",
    category: "tailoring",
    price: 18200,
    priceFormatted: "₹ 18,200",
    image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=900&q=85",
    description: "Wrinkle-resistant Japanese triacetate blend blazer with magnetic single-button cuff vents.",
    tags: ["technical", "blazer", "travel", "tailoring"],
    season: "S04-2026",
    isNew: true,
    inStock: true
  },
  {
    id: "velt-prod-24",
    title: "LONG TAILORED GILLET",
    category: "tailoring",
    price: 14800,
    priceFormatted: "₹ 14,800",
    image: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=900&q=85",
    description: "Sleeveless longline tailored coat with structured epaulettes and deep slash pockets.",
    tags: ["gillet", "sleeveless", "tailoring", "vest"],
    season: "S04-2026",
    isNew: false,
    inStock: true
  },

  // ----------------- TOPS & KNITWEAR (25-36) -----------------
  {
    id: "velt-prod-25",
    title: "HEAVYWEIGHT ARCHIVE TEE",
    category: "tops",
    price: 4200,
    priceFormatted: "₹ 4,200",
    image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=85",
    description: "320gsm organic combed jersey tee with ribbed high collar and seamless side construction.",
    tags: ["tee", "tshirt", "heavyweight", "basic"],
    season: "S04-2026",
    isNew: false,
    inStock: true
  },
  {
    id: "velt-prod-26",
    title: "BRUSHED MOHAIR CREWNECK",
    category: "tops",
    price: 12500,
    priceFormatted: "₹ 12,500",
    image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=900&q=85",
    description: "Hand-brushed Italian kid mohair sweater in deep moss tone with relaxed drop hem.",
    tags: ["mohair", "knit", "sweater", "tops"],
    season: "S04-2026",
    isNew: true,
    inStock: true
  },
  {
    id: "velt-prod-27",
    title: "CHUNKY RIBBED TURTLENECK",
    category: "tops",
    price: 14200,
    priceFormatted: "₹ 14,200",
    image: "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?auto=format&fit=crop&w=900&q=85",
    description: "5-gauge pure merino wool rollneck featuring oversized tubular ribbing and thumbholes.",
    tags: ["turtleneck", "wool", "knit", "tops"],
    season: "S04-2026",
    isNew: true,
    inStock: true
  },
  {
    id: "velt-prod-28",
    title: "BOXY POPLIN OVERSHIRT",
    category: "tops",
    price: 8600,
    priceFormatted: "₹ 8,600",
    image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=900&q=85",
    description: "Crisp Egyptian cotton poplin with twin chest patch pockets and mother-of-pearl buttons.",
    tags: ["shirt", "poplin", "overshirt", "tops"],
    season: "S04-2026",
    isNew: false,
    inStock: true
  },
  {
    id: "velt-prod-29",
    title: "SCULPTED HOODIE 480GSM",
    category: "tops",
    price: 8900,
    priceFormatted: "₹ 8,900",
    image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=900&q=85",
    description: "Ultra-heavy double-face french terry hoodie with structured crossover hood and zero drawstrings.",
    tags: ["hoodie", "heavyweight", "streetwear", "tops"],
    season: "S04-2026",
    isNew: true,
    inStock: true
  },
  {
    id: "velt-prod-30",
    title: "DISTRESSED OPEN-KNIT SWEATER",
    category: "tops",
    price: 11800,
    priceFormatted: "₹ 11,800",
    image: "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=900&q=85",
    description: "Loose ladder-stitch cotton knit with intentional raw laddering and extended sleeves.",
    tags: ["knit", "distressed", "grunge", "tops"],
    season: "S04-2026",
    isNew: false,
    inStock: true
  },
  {
    id: "velt-prod-31",
    title: "ASYMMETRIC DRAPE TOP",
    category: "tops",
    price: 6800,
    priceFormatted: "₹ 6,800",
    image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=900&q=85",
    description: "Modal-jersey draped long sleeve with bias-cut neckline and gathered side seam.",
    tags: ["drape", "jersey", "longsleeve", "tops"],
    season: "S04-2026",
    isNew: true,
    inStock: true
  },
  {
    id: "velt-prod-32",
    title: "TACTICAL QUARTER-ZIP SWEAT",
    category: "tops",
    price: 7900,
    priceFormatted: "₹ 7,900",
    image: "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&w=900&q=85",
    description: "Brushed back cotton sweatshirt with nylon collar insert and matte zip closure.",
    tags: ["quarterzip", "sweatshirt", "casual", "tops"],
    season: "S04-2026",
    isNew: false,
    inStock: true
  },
  {
    id: "velt-prod-33",
    title: "CASHMERE CARDIGAN S04",
    category: "tops",
    price: 16800,
    priceFormatted: "₹ 16,800",
    image: "https://images.unsplash.com/photo-1584273143981-41c073dfe8f8?auto=format&fit=crop&w=900&q=85",
    description: "100% grade-A Mongolian cashmere V-neck cardigan with buffalo horn buttons.",
    tags: ["cashmere", "cardigan", "luxury", "tops"],
    season: "S04-2026",
    isNew: true,
    inStock: true
  },
  {
    id: "velt-prod-34",
    title: "RAW EDGE TANK TOP",
    category: "tops",
    price: 3400,
    priceFormatted: "₹ 3,400",
    image: "https://images.unsplash.com/photo-1503342394128-c104d54dba01?auto=format&fit=crop&w=900&q=85",
    description: "Heavy rib cotton tank top with raw armholes and relaxed scoop collar.",
    tags: ["tank", "ribbed", "summer", "tops"],
    season: "S04-2026",
    isNew: false,
    inStock: true
  },
  {
    id: "velt-prod-35",
    title: "SEAMLESS MERINO LONGSLEEVE",
    category: "tops",
    price: 7400,
    priceFormatted: "₹ 7,400",
    image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=900&q=85",
    description: "3D circular-knit ultrafine merino wool base layer with ergonomic thermal zones.",
    tags: ["merino", "base", "seamless", "tops"],
    season: "S04-2026",
    isNew: false,
    inStock: true
  },
  {
    id: "velt-prod-36",
    title: "TEXTURED WAFFLE POLO",
    category: "tops",
    price: 6200,
    priceFormatted: "₹ 6,200",
    image: "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?auto=format&fit=crop&w=900&q=85",
    description: "Substantial thermal waffle knit open-collar polo with split side hems.",
    tags: ["polo", "waffle", "knit", "tops"],
    season: "S04-2026",
    isNew: true,
    inStock: true
  },

  // ----------------- TROUSERS & DENIM (37-46) -----------------
  {
    id: "velt-prod-37",
    title: "WIDE-LEG PLEATED TROUSERS",
    category: "trousers",
    price: 11900,
    priceFormatted: "₹ 11,900",
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=900&q=85",
    description: "Double forward pleats cut in high-twist wool fresco with dramatic 28cm leg opening.",
    tags: ["pleated", "wideleg", "wool", "trousers"],
    season: "S04-2026",
    isNew: true,
    inStock: true
  },
  {
    id: "velt-prod-38",
    title: "RAW JAPANESE SELVEDGE DENIM",
    category: "trousers",
    price: 14500,
    priceFormatted: "₹ 14,500",
    image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=900&q=85",
    description: "14.5oz Kurabo mill indigo denim with pink selvedge ID line and hidden back pocket rivets.",
    tags: ["denim", "selvedge", "jeans", "trousers"],
    season: "S04-2026",
    isNew: true,
    inStock: true
  },
  {
    id: "velt-prod-39",
    title: "3D CARGO FLIGHT PANTS",
    category: "trousers",
    price: 12800,
    priceFormatted: "₹ 12,800",
    image: "https://images.unsplash.com/photo-1517445312882-bc9910d016b7?auto=format&fit=crop&w=900&q=85",
    description: "Heavy cotton ripstop trousers with articulated knee gussets and bungee ankle adjusters.",
    tags: ["cargo", "tactical", "flight", "trousers"],
    season: "S04-2026",
    isNew: false,
    inStock: true
  },
  {
    id: "velt-prod-40",
    title: "RELAXED POPLIN LOUNGE TROUSERS",
    category: "trousers",
    price: 7800,
    priceFormatted: "₹ 7,800",
    image: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?auto=format&fit=crop&w=900&q=85",
    description: "Fluid organic cotton trousers with elasticated drawstring waist and pressed front crease.",
    tags: ["lounge", "relaxed", "poplin", "trousers"],
    season: "S04-2026",
    isNew: false,
    inStock: true
  },
  {
    id: "velt-prod-41",
    title: "HEAVY WOOL UTILITY BOTTOMS",
    category: "trousers",
    price: 15400,
    priceFormatted: "₹ 15,400",
    image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=900&q=85",
    description: "Melton wool field trousers with reinforced seat patch and buttoned waist adjusters.",
    tags: ["wool", "utility", "heavyweight", "trousers"],
    season: "S04-2026",
    isNew: true,
    inStock: true
  },
  {
    id: "velt-prod-42",
    title: "WASHED BLACK BALLOON PANTS",
    category: "trousers",
    price: 9900,
    priceFormatted: "₹ 9,900",
    image: "https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec?auto=format&fit=crop&w=900&q=85",
    description: "Curved-leg balloon silhouette in pigment-dyed cotton canvas with cropped hemline.",
    tags: ["balloon", "tapered", "washed", "trousers"],
    season: "S04-2026",
    isNew: false,
    inStock: true
  },
  {
    id: "velt-prod-43",
    title: "LEATHER MOTORCYCLE TROUSERS",
    category: "trousers",
    price: 27500,
    priceFormatted: "₹ 27,500",
    image: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=900&q=85",
    description: "Straight-cut calf leather trousers with satin knee lining and zip leg hems.",
    tags: ["leather", "pants", "luxury", "trousers"],
    season: "S04-2026",
    isNew: true,
    inStock: true
  },
  {
    id: "velt-prod-44",
    title: "FOLDED BERMUDA SHORTS",
    category: "trousers",
    price: 6900,
    priceFormatted: "₹ 6,900",
    image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&w=900&q=85",
    description: "Wide-cut tailored shorts falling below knee with double waistband pleats.",
    tags: ["shorts", "bermuda", "summer", "trousers"],
    season: "S04-2026",
    isNew: false,
    inStock: true
  },
  {
    id: "velt-prod-45",
    title: "SIDE-TAB TAPERED SUITING PANT",
    category: "trousers",
    price: 10800,
    priceFormatted: "₹ 10,800",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=900&q=85",
    description: "Beltloop-free dress trousers with silver buckle side adjusters and sharp press lines.",
    tags: ["suiting", "tapered", "formal", "trousers"],
    season: "S04-2026",
    isNew: false,
    inStock: true
  },
  {
    id: "velt-prod-46",
    title: "TRACK OVER-PANTS IN NYLON",
    category: "trousers",
    price: 8400,
    priceFormatted: "₹ 8,400",
    image: "https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&w=900&q=85",
    description: "Lightweight matte crinkle nylon track pants with contrast piped side seams and zip cuffs.",
    tags: ["track", "nylon", "active", "trousers"],
    season: "S04-2026",
    isNew: true,
    inStock: true
  },

  // ----------------- ACCESSORIES & FOOTWEAR (47-52) -----------------
  {
    id: "velt-prod-47",
    title: "SCULPTED CALF LEATHER DERBY",
    category: "accessories",
    price: 18500,
    priceFormatted: "₹ 18,500",
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=900&q=85",
    description: "Goodyear-welted square-toe derby shoe with 40mm stacked leather sole and commando tread.",
    tags: ["shoes", "derby", "footwear", "accessories"],
    season: "S04-2026",
    isNew: true,
    inStock: true
  },
  {
    id: "velt-prod-48",
    title: "ARCHITECTURAL WEEKENDER TOTE",
    category: "accessories",
    price: 19800,
    priceFormatted: "₹ 19,800",
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=900&q=85",
    description: "Full-grain matte leather oversized carryall with dual tubular handles and laptop compartment.",
    tags: ["bag", "tote", "leather", "accessories"],
    season: "S04-2026",
    isNew: true,
    inStock: true
  },
  {
    id: "velt-prod-49",
    title: "CHELSEA BOOT S04 VIBRAM",
    category: "accessories",
    price: 22000,
    priceFormatted: "₹ 22,000",
    image: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&w=900&q=85",
    description: "Streamlined pull-on chelsea boots with chunky Vibram lug outsole and tonal elasticated gussets.",
    tags: ["boots", "chelsea", "footwear", "accessories"],
    season: "S04-2026",
    isNew: false,
    inStock: true
  },
  {
    id: "velt-prod-50",
    title: "TITANIUM GEOMETRIC SUNGLASSES",
    category: "accessories",
    price: 12500,
    priceFormatted: "₹ 12,500",
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=900&q=85",
    description: "Handcrafted Japanese titanium frame with flat black Zeiss polarized lenses.",
    tags: ["eyewear", "sunglasses", "titanium", "accessories"],
    season: "S04-2026",
    isNew: true,
    inStock: true
  },
  {
    id: "velt-prod-51",
    title: "OVERSIZED ALPACA BLANKET SCARF",
    category: "accessories",
    price: 6800,
    priceFormatted: "₹ 6,800",
    image: "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?auto=format&fit=crop&w=900&q=85",
    description: "Extra-long brushed baby alpaca scarf with twisted fringe trim in natural ash tone.",
    tags: ["scarf", "alpaca", "knit", "accessories"],
    season: "S04-2026",
    isNew: false,
    inStock: true
  },
  {
    id: "velt-prod-52",
    title: "ESSENTIAL STACK (SET OF 3)",
    category: "accessories",
    price: 5400,
    priceFormatted: "₹ 5,400",
    image: "Assets/Cloth stack-no-bg.png",
    description: "Folded VELT studio essentials pack crafted from organic heavyweight cotton jersey.",
    tags: ["essentials", "pack", "basics", "accessories"],
    season: "S04-2026",
    isNew: true,
    inStock: true
  }
];

/**
 * Supabase-Ready Product Service
 * Currently queries the mock database array, but structured to accept Supabase client methods seamlessly.
 */
const VeltProductService = {
  /**
   * Fetch products with optional filtering and sorting
   * In Supabase, this will be: `let { data } = await supabase.from('products').select('*')...`
   */
  async getProducts({ category = "all", sort = "featured", search = "" } = {}) {
    // Simulate async network latency (like real DB query)
    await new Promise((resolve) => setTimeout(resolve, 60));

    let results = [...VELT_PRODUCTS];

    // Filter by Category
    if (category && category !== "all") {
      results = results.filter((p) => p.category.toLowerCase() === category.toLowerCase());
    }

    // Filter by Search Query
    if (search && search.trim()) {
      const q = search.toLowerCase().trim();
      results = results.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tags.some((tag) => tag.toLowerCase().includes(q)) ||
          p.category.toLowerCase().includes(q)
      );
    }

    // Sorting
    if (sort === "price-asc") {
      results.sort((a, b) => a.price - b.price);
    } else if (sort === "price-desc") {
      results.sort((a, b) => b.price - a.price);
    } else if (sort === "newest") {
      results.sort((a, b) => (b.isNew === a.isNew ? 0 : b.isNew ? 1 : -1));
    } else if (sort === "name") {
      results.sort((a, b) => a.title.localeCompare(b.title));
    }

    return results;
  },

  /**
   * Fetch single product by ID (Supabase: `.eq('id', id).single()`)
   */
  async getProductById(id) {
    await new Promise((resolve) => setTimeout(resolve, 30));
    return VELT_PRODUCTS.find((p) => p.id === id) || null;
  },

  /**
   * Get Category Counts (For dynamic filter badges)
   */
  getCategoryCounts() {
    const counts = {
      all: VELT_PRODUCTS.length,
      outerwear: 0,
      tailoring: 0,
      tops: 0,
      trousers: 0,
      accessories: 0,
    };
    VELT_PRODUCTS.forEach((p) => {
      if (counts[p.category] !== undefined) counts[p.category]++;
    });
    return counts;
  },
};

// Expose globally for browser usage
window.VELT_PRODUCTS = VELT_PRODUCTS;
window.VeltProductService = VeltProductService;

