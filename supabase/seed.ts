import { faker } from '@faker-js/faker';
import fs from 'fs';
import path from 'path';

// ---------------------------------------------------------------------------
// PATHS
// ---------------------------------------------------------------------------
const DATA_DIR = path.join(process.cwd(), 'supabase', 'data');
const MIGRATIONS_DIR = path.join(process.cwd(), 'supabase', 'migrations');

fs.mkdirSync(DATA_DIR, { recursive: true });
fs.mkdirSync(MIGRATIONS_DIR, { recursive: true });

// ---------------------------------------------------------------------------
// CONFIG
// ---------------------------------------------------------------------------
const CATEGORY_COUNT = 6;
const PRODUCT_COUNT = 50;
const VARIANTS_MIN = 2;
const VARIANTS_MAX = 3;
const IMAGES_PER_VARIANT_MIN = 2;
const IMAGES_PER_VARIANT_MAX = 4;
const ATTRIBUTES = [
  'Color',
  'Size',
  'Storage',
  'Battery',
  'Weight',
  'Material',
  'Connectivity',
  'Display',
  'Camera',
  'Warranty',
];

// ---------------------------------------------------------------------------
// HELPERS
// ---------------------------------------------------------------------------
function saveJson(table: string, rows: any[]) {
  const file = path.join(DATA_DIR, `${table}.json`);
  fs.writeFileSync(file, JSON.stringify(rows, null, 2));
  console.log(`Saved ${rows.length} rows → ${table}.json`);
}

function jsonToSql(tableName: string, rows: any[]): string {
  if (rows.length === 0) return `-- No data for ${tableName}\n`;

  const columns = Object.keys(rows[0]);
  const columnNames = columns.map((col) => `"${col}"`).join(', ');

  let sql = `-- Inserting into ${tableName}\n`;
  sql += `INSERT INTO "${tableName}" (${columnNames}) VALUES\n`;

  const valueRows = rows.map((row) => {
    const values = columns
      .map((col) => {
        const value = row[col];
        if (value === null) return 'NULL';
        if (typeof value === 'string') return `'${value.replace(/'/g, "''")}'`;
        if (typeof value === 'number' || typeof value === 'boolean') return value.toString();
        return `'${JSON.stringify(value).replace(/'/g, "''")}'`;
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
  console.log('Generating fake data...\n');

  // 1. Categories
  const categories = Array.from({ length: CATEGORY_COUNT }).map(() => {
    const name = faker.commerce.department();
    return {
      id: faker.string.uuid(),
      name,
      slug: name.toLowerCase().replace(/\s+/g, '-'),
    };
  });
  saveJson('categories', categories);

  // 2. Attributes
  const attributes = ATTRIBUTES.map((a) => ({
    id: faker.string.uuid(),
    name: a,
    slug: a.toLowerCase().replace(/\s+/g, '-'),
    category_id: faker.helpers.arrayElement(categories).id,
  }));
  saveJson('attributes', attributes);

  // 3. Attribute Values
  const attribute_values: any[] = [];
  for (const attr of attributes) {
    const name = attr.name.toLowerCase();
    let values: string[] = [];

    switch (name) {
      case 'color':
        values = ['Black', 'White', 'Silver', 'Blue', 'Red', 'Green', 'Gold'];
        break;
      case 'size':
        values = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
        break;
      case 'storage':
        values = ['64GB', '128GB', '256GB', '512GB', '1TB'];
        break;
      case 'battery':
        values = ['3000mAh', '4000mAh', '5000mAh', '6000mAh'];
        break;
      case 'weight':
        values = ['120g', '180g', '220g', '300g', '400g'];
        break;
      case 'material':
        values = ['Plastic', 'Aluminum', 'Glass', 'Carbon Fiber'];
        break;
      case 'connectivity':
        values = ['WiFi', 'Bluetooth', '4G', '5G'];
        break;
      case 'display':
        values = ['LCD 1080p', 'OLED 1080p', 'OLED 1440p'];
        break;
      case 'camera':
        values = ['12MP', '24MP', '48MP', '64MP'];
        break;
      case 'warranty':
        values = ['6 months', '12 months', '24 months', '36 months'];
        break;
      default:
        values = Array.from({ length: 5 }).map(() => faker.lorem.word());
    }

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
  const products = Array.from({ length: PRODUCT_COUNT }).map(() => ({
    id: faker.string.uuid(),
    title: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    category_id: faker.helpers.arrayElement(categories).id,
  }));
  saveJson('products', products);

  // 5. Product Variants
  const product_variants: any[] = [];
  for (const p of products) {
    const count = faker.number.int({ min: VARIANTS_MIN, max: VARIANTS_MAX });
    for (let i = 0; i < count; i++) {
      const current_price = parseFloat(faker.commerce.price({ min: 50, max: 2500, dec: 2 }));
      const old_price =
        faker.datatype.boolean() && current_price < 2400
          ? parseFloat(
              faker.commerce.price({
                min: current_price + 10,
                max: current_price + 500,
                dec: 2,
              })
            )
          : null;

      product_variants.push({
        id: faker.string.uuid(),
        product_id: p.id,
        name: i === 0 ? p.title : `${p.title} — Variant ${i + 1}`,
        sku: faker.string.alphanumeric(10).toUpperCase(),
        current_price,
        old_price,
        stock: faker.number.int({ min: 0, max: 200 }),
      });
    }
  }
  saveJson('product_variants', product_variants);

  // 6. Product Images
  const product_images: any[] = [];
  for (const v of product_variants) {
    const count = faker.number.int({
      min: IMAGES_PER_VARIANT_MIN,
      max: IMAGES_PER_VARIANT_MAX,
    });
    for (let i = 0; i < count; i++) {
      product_images.push({
        id: faker.string.uuid(),
        variant_id: v.id,
        url: `https://picsum.photos/seed/${faker.string.alphanumeric(8)}/800/800`,
        alt: `${faker.commerce.productAdjective()} image`,
        position: i + 1,
      });
    }
  }
  saveJson('product_images', product_images);

  // 7. Product Variant Attributes
  const product_variant_attributes: any[] = [];
  for (const v of product_variants) {
    for (const attr of attributes) {
      const possible = attribute_values.filter((av) => av.attribute_id === attr.id);
      if (possible.length === 0) continue;
      const chosen = faker.helpers.arrayElement(possible);
      product_variant_attributes.push({
        variant_id: v.id,
        attribute_value_id: chosen.id,
      });
    }
  }
  saveJson('product_variant_attributes', product_variant_attributes);

  // 8. Discounts
  const discounts = [
    {
      id: faker.string.uuid(),
      code: 'WELCOME10',
      description: '10% off for new customers',
      discount_type: 'percentage',
      value: 10,
      active: true,
    },
    {
      id: faker.string.uuid(),
      code: 'SUMMER50',
      description: '50 USD off on orders over 500',
      discount_type: 'fixed',
      value: 50,
      active: true,
    },
  ];
  saveJson('discounts', discounts);

  // 9. Discount Products
  const sampleProducts = faker.helpers.arrayElements(products, Math.min(8, products.length));
  const discount_products = sampleProducts.map((p) => ({
    discount_id: discounts[0].id,
    product_id: p.id,
  }));
  saveJson('discount_products', discount_products);
}

// ---------------------------------------------------------------------------
// CREATE MIGRATION WITH SQL DIRECTLY
// ---------------------------------------------------------------------------
function createMigration() {
  console.log('\nGenerating SQL and creating migration...\n');

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
  ];

  let fullSql = `-- Auto-generated seed data\n`;
  fullSql += `-- Generated: ${new Date().toISOString()}\n\n`;

  for (const table of tableOrder) {
    const filePath = path.join(DATA_DIR, `${table}.json`);
    if (fs.existsSync(filePath)) {
      const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
      fullSql += jsonToSql(table, data);
    }
  }

  // Create migration file
  const timestamp = new Date()
    .toISOString()
    .replace(/[-:T.]/g, '')
    .slice(0, 14);
  const migrationName = `seed_data_${timestamp}`;
  const fileName = `${timestamp}_${migrationName}.sql`;
  const migrationPath = path.join(MIGRATIONS_DIR, fileName);

  fs.writeFileSync(migrationPath, fullSql);
  console.log(`Migration created: ${migrationPath}`);
  console.log(`\nNext steps:`);
  console.log(`   npx supabase db reset`);
  console.log(`   # or`);
  console.log(`   npx supabase db push`);
}

// ---------------------------------------------------------------------------
// MAIN
// ---------------------------------------------------------------------------
function main() {
  generateData();
  createMigration();
}

main();
