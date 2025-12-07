import fs from 'fs';
import path from 'path';
import { faker } from '@faker-js/faker';

// ---------------------------------------------------------------------------
// PATHS
// ---------------------------------------------------------------------------
// Зберігаємо все (і JSON, і SQL) в папці data
const DATA_DIR = path.join(process.cwd(), 'supabase', 'data');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// ---------------------------------------------------------------------------
// CONFIG
// ---------------------------------------------------------------------------
const CATEGORY_COUNT = 8;
const PRODUCT_COUNT = 50;
const VARIANTS_MIN = 1;
const VARIANTS_MAX = 3;
const IMAGES_PER_VARIANT_MIN = 1;
const IMAGES_PER_VARIANT_MAX = 3;

const ATTRIBUTES = [
  'Color',
  'Size',
  'Storage',
  'RAM',
  'Material',
  'Screen Size'
] as const;

// ---------------------------------------------------------------------------
// HELPERS
// ---------------------------------------------------------------------------
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}

function saveJson(table: string, rows: unknown[]) {
  const file = path.join(DATA_DIR, `${table}.json`);
  fs.writeFileSync(file, JSON.stringify(rows, null, 2));
  // console.log(`✅ Saved ${rows.length} rows to ${table}.json`);
}

function jsonToSql(tableName: string, rows: unknown[]): string {
  if (rows.length === 0) return `-- No data for ${tableName}\n`;

  const columns = Object.keys(rows[0] as object);
  const columnNames = columns.map((col) => `"${col}"`).join(', ');

  let sql = `-- Inserting into ${tableName}\n`;
  sql += `INSERT INTO "public"."${tableName}" (${columnNames}) VALUES\n`;

  const valueRows = rows.map((row) => {
    const values = columns
      .map((col) => {
        const value = (row as any)[col];
        if (value === null || value === undefined) return 'NULL';
        if (typeof value === 'number') return value.toString();
        if (typeof value === 'boolean') return value ? 'TRUE' : 'FALSE';
        const strVal = typeof value === 'string' ? value : JSON.stringify(value);
        return `'${strVal.replace(/'/g, "''")}'`;
      })
      .join(', ');
    return `  (${values})`;
  });

  sql += valueRows.join(',\n');
  sql += ';\n\n';
  return sql;
}

// ---------------------------------------------------------------------------
// GENERATE FAKE DATA
// ---------------------------------------------------------------------------
function generateData() {
  console.log('🚀 Generating data...');

  // 1. Categories
  const categories = Array.from({ length: CATEGORY_COUNT }).map(() => {
    const name = faker.commerce.department();
    return {
      id: faker.string.uuid(),
      name,
      slug: slugify(name) + '-' + faker.string.alphanumeric(3),
    };
  });
  saveJson('categories', categories);

  // 2. Attributes
  const attributes = ATTRIBUTES.map((a) => ({
    id: faker.string.uuid(),
    name: a,
    slug: slugify(a),
    category_id: faker.helpers.arrayElement(categories).id,
  }));
  saveJson('attributes', attributes);

  // 3. Attribute Values
  const attribute_values: any[] = [];
  const attrMap: Record<string, string[]> = {
    'color': ['Black', 'White', 'Midnight Blue', 'Space Gray', 'Silver', 'Gold', 'Red'],
    'size': ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    'storage': ['64GB', '128GB', '256GB', '512GB', '1TB'],
    'ram': ['8GB', '16GB', '32GB', '64GB'],
    'material': ['Cotton', 'Polyester', 'Leather', 'Metal', 'Plastic'],
    'screen-size': ['13"', '14"', '15"', '16"', '24"', '27"']
  };

  for (const attr of attributes) {
    const key = attr.slug;
    const values = attrMap[key] || Array.from({ length: 5 }).map(() => faker.word.adjective());
    for (const v of values) {
      attribute_values.push({
        id: faker.string.uuid(),
        attribute_id: attr.id,
        value: v,
      });
    }
  }
  saveJson('attribute_values', attribute_values);

  // 4. Products
  const products = Array.from({ length: PRODUCT_COUNT }).map(() => {
    const title = faker.commerce.productName();
    return {
      id: faker.string.uuid(),
      title,
      description: faker.commerce.productDescription(),
      category_id: faker.helpers.arrayElement(categories).id,
      slug: slugify(title) + '-' + faker.string.alphanumeric(4),
      average_rating: faker.number.float({ min: 3.5, max: 5.0, fractionDigits: 2 }),
      reviews_count: faker.number.int({ min: 5, max: 500 }),
    };
  });
  saveJson('products', products);

  // 5. Product Variants
  const product_variants: any[] = [];
  for (const p of products) {
    const count = faker.number.int({ min: VARIANTS_MIN, max: VARIANTS_MAX });
    for (let i = 0; i < count; i++) {
      const current_price = parseFloat(faker.commerce.price({ min: 20, max: 2000, dec: 2 }));
      const hasDiscount = faker.datatype.boolean(0.3);
      const old_price = hasDiscount ? parseFloat((current_price * 1.2).toFixed(2)) : null;

      product_variants.push({
        id: faker.string.uuid(),
        product_id: p.id,
        name: i === 0 ? 'Standard' : faker.commerce.productAdjective(),
        sku: faker.string.alphanumeric(10).toUpperCase(),
        current_price,
        old_price,
        stock: faker.number.int({ min: 0, max: 150 }),
      });
    }
  }
  saveJson('product_variants', product_variants);

  // 6. Product Images
  const product_images: any[] = [];
  for (const v of product_variants) {
    const count = faker.number.int({ min: IMAGES_PER_VARIANT_MIN, max: IMAGES_PER_VARIANT_MAX });
    for (let i = 0; i < count; i++) {
      product_images.push({
        id: faker.string.uuid(),
        variant_id: v.id,
        // picsum.photos дає рандомні зображення, які не зникають
        url: `https://picsum.photos/seed/${v.id}-${i}/800/800`,
        alt: `${faker.commerce.productName()} image`,
        position: i,
      });
    }
  }
  saveJson('product_images', product_images);

  // 7. Variant Attributes
  const product_variant_attributes: any[] = [];
  for (const v of product_variants) {
    const randomAttrs = faker.helpers.arrayElements(attributes, { min: 1, max: 3 });
    for (const attr of randomAttrs) {
      const possibleValues = attribute_values.filter(av => av.attribute_id === attr.id);
      if (possibleValues.length > 0) {
        const chosenValue = faker.helpers.arrayElement(possibleValues);
        product_variant_attributes.push({
          variant_id: v.id,
          attribute_value_id: chosenValue.id,
        });
      }
    }
  }
  saveJson('product_variant_attributes', product_variant_attributes);

  // 8. Discounts
  const discounts = [
    {
      id: faker.string.uuid(),
      code: 'WELCOME2025',
      description: 'New Year Sale',
      discount_type: 'percentage',
      value: 15,
      active: true,
      starts_at: new Date().toISOString(),
      ends_at: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString()
    }
  ];
  saveJson('discounts', discounts);

  // 9. Discount Products
  const discount_products: any[] = [];
  const onSaleProducts = faker.helpers.arrayElements(products, 10);
  onSaleProducts.forEach(p => {
    discount_products.push({
      discount_id: discounts[0].id,
      product_id: p.id
    });
  });
  saveJson('discount_products', discount_products);
}

// ---------------------------------------------------------------------------
// CREATE SQL FILE
// ---------------------------------------------------------------------------
function createSeedSql() {
  console.log('📝 Creating seed.sql...');

  const tableOrder = [
    'categories',
    'attributes',
    'attribute_values',
    'products',
    'product_variants',
    'product_images',
    'product_variant_attributes',
    'discounts',
    'discount_products',
  ] as const;

  let fullSql = `-- Auto-generated seed data\n`;
  fullSql += `-- Generated at: ${new Date().toISOString()}\n`;
  fullSql += `-- Run this in Supabase SQL Editor to populate your DB\n\n`;

  for (const table of tableOrder) {
    const filePath = path.join(DATA_DIR, `${table}.json`);
    if (fs.existsSync(filePath)) {
      const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
      fullSql += jsonToSql(table, data);
    }
  }

  // Зберігаємо як supabase/data/seed.sql
  const seedPath = path.join(DATA_DIR, 'seed.sql');
  fs.writeFileSync(seedPath, fullSql);
  
  console.log(`🎉 Seed SQL created at: ${seedPath}`);
}

// ---------------------------------------------------------------------------
// MAIN
// ---------------------------------------------------------------------------
function main() {
  try {
    generateData();
    createSeedSql();
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

main();