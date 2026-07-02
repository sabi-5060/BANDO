export const products = [
  // GEORGE STINNEY MEMORIAL COLLECTION
  {
    id: 'gs-legacy-polo',
    name: 'The Legacy Polo — George Stinney 1944',
    description: 'A polo that carries history, speaks truth, and builds legacy. Designed in honor of George Stinney Jr., the youngest person wrongfully convicted in modern U.S. history. This piece represents strength, resilience, and the fight for justice.',
    price: 45000,
    category: 'george-stinney',
    images: [
      'https://images.unsplash.com/photo-1625910513413-5fc7e3c5662c?w=800&h=1000&fit=crop',
      'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=800&h=1000&fit=crop',
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Midnight Black', hex: '#0a0a0a' },
      { name: 'Cream', hex: '#f5f5f0' },
    ],
    inStock: true,
    stockCount: 44,
    isGeorgeStinney: true,
    isBestseller: true,
    details: [
      'Asymmetrical front cut line symbolizing a life divided by injustice but united in purpose',
      'Embroidered "BANDO 1944" legacy mark',
      'The 44 detail — represents 1944 and the 44 years of fighting for justice',
      'Hidden back message: "WE REMEMBER. WE RISE. WE NEVER FORGET."',
      'Built-in collar stay system for structure & elevation',
      'Premium fabric blend for comfort & durability',
    ],
    material: '95% Cotton, 5% Elastane — Premium Pique',
    care: ['Machine wash cold', 'Do not bleach', 'Hang dry', 'Iron on low heat'],
  },
  {
    id: 'gs-challenge-cup-polo',
    name: 'Challenge Cup Polo — George Stinney Jr.',
    description: 'The Challenge Cup represents the ongoing fight for justice. Featuring intricate embroidery of a bullet shield, laurel wreaths, and the number 14 — honoring George\'s age at execution.',
    price: 52000,
    category: 'george-stinney',
    images: [
      'https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=800&h=1000&fit=crop',
      'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&h=1000&fit=crop',
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Olive', hex: '#556b2f' },
      { name: 'Black', hex: '#0a0a0a' },
    ],
    inStock: true,
    stockCount: 30,
    isGeorgeStinney: true,
    details: [
      'Intricate bullet shield embroidery with laurel wreath detailing',
      'Number 14 on sleeve — George\'s age at wrongful execution',
      '"Kun Faya Kun" inscription — "Be, and it is"',
      'Crown emblem representing dignity and royalty',
      'Premium heavyweight cotton pique',
    ],
    material: '100% Heavyweight Cotton Pique',
    care: ['Machine wash cold', 'Do not bleach', 'Hang dry', 'Iron inside out'],
  },
  {
    id: 'gs-memory-tee',
    name: 'Memory Tee — George Stinney',
    description: 'A tribute tee featuring the anatomical heart, mirror, and eagle motifs. Every purchase contributes directly to feeding and clothing children in underserved communities.',
    price: 25000,
    category: 'george-stinney',
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&h=1000&fit=crop',
      'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=800&h=1000&fit=crop',
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Black', hex: '#0a0a0a' },
      { name: 'White', hex: '#fafafa' },
    ],
    inStock: true,
    stockCount: 100,
    isGeorgeStinney: true,
    isNew: true,
    details: [
      'Anatomical heart embroidery — representing life and compassion',
      'Mirror motif — self-reflection and truth',
      'Eagle — freedom and rising above injustice',
      '100% of profits donated to street children initiatives',
      'Heavyweight 280gsm cotton',
    ],
    material: '100% Heavyweight Cotton — 280gsm',
    care: ['Machine wash cold', 'Tumble dry low', 'Do not iron print'],
  },
  
  // REGULAR COLLECTION — T-SHIRTS
  {
    id: 'bando-classic-tee',
    name: 'BANDO Classic Tee',
    description: 'The foundation of every wardrobe. Clean lines, premium fabric, and the iconic BANDO crown.',
    price: 18000,
    category: 'tshirts',
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&h=1000&fit=crop',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&h=1000&fit=crop',
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Black', hex: '#0a0a0a' },
      { name: 'White', hex: '#fafafa' },
      { name: 'Forest', hex: '#228b22' },
    ],
    inStock: true,
    stockCount: 75,
    isBestseller: true,
    details: [
      'Signature BANDO crown embroidery',
      'Relaxed fit with dropped shoulders',
      '280gsm heavyweight cotton',
      'Pre-shrunk and garment-washed',
    ],
    material: '100% Organic Cotton — 280gsm',
    care: ['Machine wash cold', 'Tumble dry low'],
  },
  {
    id: 'bando-renegade-tee',
    name: 'BANDO Renegade Tee',
    description: 'For those who refuse to conform. Bold graphics, statement patches, and unapologetic energy.',
    price: 22000,
    category: 'tshirts',
    images: [
      'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=800&h=1000&fit=crop',
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&h=1000&fit=crop',
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Black', hex: '#0a0a0a' },
      { name: 'Red', hex: '#8b0000' },
    ],
    inStock: true,
    stockCount: 50,
    isNew: true,
    details: [
      'Multi-patch design with embroidered details',
      '"EXPECT BANDO LIFE" statement patches',
      'Oversized fit',
      'Limited edition release',
    ],
    material: '100% Cotton — 300gsm',
    care: ['Machine wash cold', 'Hang dry'],
  },
  
  // POLOS
  {
    id: 'bando-kun-faya-polo',
    name: 'Kun Faya Kun Polo',
    description: 'Spiritual elegance meets street pride. Featuring the sacred phrase "Be, and it is" in flowing script.',
    price: 35000,
    category: 'polos',
    images: [
      'https://images.unsplash.com/photo-1625910513413-5fc7e3c5662c?w=800&h=1000&fit=crop',
      'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=800&h=1000&fit=crop',
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Black', hex: '#0a0a0a' },
      { name: 'Navy', hex: '#000080' },
    ],
    inStock: true,
    stockCount: 40,
    details: [
      'Gold embroidered eagle and heart motifs',
      '"Kun Faya Kun" script embroidery',
      'Number 0 detail on sleeve',
      'Premium pique cotton with stretch',
    ],
    material: '95% Cotton, 5% Elastane Pique',
    care: ['Machine wash cold', 'Do not bleach', 'Iron on low'],
  },
  {
    id: 'bando-heritage-polo',
    name: 'Heritage Long-Sleeve Polo',
    description: 'A modern take on vintage rugby style. Bold stripes, denim collar, and statement patches.',
    price: 42000,
    category: 'polos',
    images: [
      'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&h=1000&fit=crop',
      'https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=800&h=1000&fit=crop',
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Maroon/Gold', hex: '#800000' },
    ],
    inStock: true,
    stockCount: 25,
    isNew: true,
    details: [
      'Denim collar with button placket',
      'Gold and maroon rugby stripes',
      'Multiple embroidered patches',
      'Oversized vintage fit',
    ],
    material: 'Heavyweight Cotton Jersey',
    care: ['Machine wash cold', 'Hang dry'],
  },
  
  // JACKETS
  {
    id: 'bando-commander-jacket',
    name: 'Commander Jacket',
    description: 'Military precision meets street aesthetics. Structured, commanding, and built to last.',
    price: 65000,
    category: 'jackets',
    images: [
      'https://images.unsplash.com/photo-1551028919-ac76c9028d1e?w=800&h=1000&fit=crop',
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&h=1000&fit=crop',
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Olive', hex: '#556b2f' },
      { name: 'Black', hex: '#0a0a0a' },
    ],
    inStock: true,
    stockCount: 20,
    details: [
      'Heavy-duty cotton canvas',
      'Multiple utility pockets',
      'BANDO crown patch on sleeve',
      'Brass hardware',
    ],
    material: '100% Cotton Canvas',
    care: ['Dry clean only'],
  },
  
  // ACCESSORIES
  {
    id: 'bando-crown-cap',
    name: 'Crown Dad Cap',
    description: 'Low profile, high status. The essential BANDO crown embroidered cap.',
    price: 12000,
    category: 'accessories',
    images: [
      'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800&h=800&fit=crop',
    ],
    sizes: ['One Size'],
    colors: [
      { name: 'Black', hex: '#0a0a0a' },
      { name: 'Cream', hex: '#f5f5f0' },
    ],
    inStock: true,
    stockCount: 60,
    details: [
      'Gold embroidered crown',
      'Adjustable strap',
      'Premium cotton twill',
    ],
    material: '100% Cotton Twill',
    care: ['Spot clean'],
  },
  {
    id: 'bando-chain-bracelet',
    name: 'Link Chain Bracelet',
    description: 'Stainless steel with gold PVD coating. A subtle statement of allegiance.',
    price: 28000,
    category: 'accessories',
    images: [
      'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&h=800&fit=crop',
    ],
    sizes: ['One Size'],
    colors: [
      { name: 'Gold', hex: '#c9a96e' },
      { name: 'Silver', hex: '#c4c4c4' },
    ],
    inStock: true,
    stockCount: 35,
    details: [
      '316L stainless steel',
      'Gold PVD coating',
      'Lobster clasp closure',
      'Water resistant',
    ],
    material: '316L Stainless Steel',
    care: ['Wipe with soft cloth'],
  },
];

export const georgeStinneyStory = `
George Junius Stinney Jr. was born on October 21, 1929, in Alcolu, South Carolina. 

On March 24, 1944, two young white girls — Betty June Binnicker, 11, and Mary Emma Thames, 7 — went missing while picking flowers. George and his sister Aime had spoken with them earlier that day. When the girls' bodies were found the next morning, George was arrested.

Despite no physical evidence, a coerced confession, and a trial that lasted less than three hours with no witnesses called for the defense, 14-year-old George was convicted by an all-white jury after just 10 minutes of deliberation. On June 16, 1944, he was executed in the electric chair — the youngest person executed in the United States in the 20th century. He weighed just 95 pounds. The mask was too big for his face.

In December 2014, his conviction was vacated. Judge Carmen Mullen ruled that George had been denied due process, his attorney failed him, and the trial was fundamentally unfair.

BANDO honors George Stinney Jr. not just as a victim of injustice, but as a symbol of resilience, truth, and the ongoing fight for justice. Every item in this collection carries his memory forward — and 100% of profits are donated to organizations supporting children in underserved communities.

WE REMEMBER. WE RISE. WE NEVER FORGET.
`;