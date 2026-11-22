/**
 * Strapi API client + response transformers.
 *
 * All data fetching from Strapi goes through this file.
 * Image keys (productsCategoryImages / productsImages / ourTeamImages) are
 * kept as-is for now — Milestone 4 will migrate all images into Strapi.
 */

import {
  IProductsCategoryData,
} from "../utils/models/productsCategory.model";
import { IProductsData } from "../utils/models/products.model";
import {
  IProductDetailData,
} from "../utils/models/product-detail.model";
import { INewsArticle } from "../utils/models/news.model";
import { IOurTeamDetails } from "../utils/models/our-team.model";

export const STRAPI_URL =
  process.env.REACT_APP_STRAPI_URL || "http://localhost:1337";

// ── Base fetcher ──────────────────────────────────────────────────────────────

async function strapiGet(endpoint: string, qs: string = ""): Promise<any[]> {
  const url = `${STRAPI_URL}/api/${endpoint}?pagination[pageSize]=200${qs}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Strapi GET ${endpoint} failed: ${res.status}`);
  const json = await res.json();
  return json.data;
}

// ── Image-key lookup (title → imageKey) ──────────────────────────────────────
// Loaded once from the legacy JSON files (which remain as a static image registry
// until Milestone 4 uploads all images into Strapi).

let _catImageKeys: Record<string, string> | null = null;
let _prodImageKeys: Record<string, string> | null = null;
let _teamImageKeys: Record<string, string> | null = null;

async function getCatImageKeys(): Promise<Record<string, string>> {
  if (_catImageKeys) return _catImageKeys;
  const data: { title: string; image: string }[] = await fetch(
    "/data/products-category.json"
  ).then((r) => r.json());
  _catImageKeys = Object.fromEntries(data.map((d) => [d.title, d.image]));
  return _catImageKeys;
}

async function getProdImageKeys(): Promise<Record<string, string>> {
  if (_prodImageKeys) return _prodImageKeys;
  const data: { title: string; image: string }[] = await fetch(
    "/data/products.json"
  ).then((r) => r.json());
  _prodImageKeys = Object.fromEntries(data.map((d) => [d.title, d.image]));
  return _prodImageKeys;
}

async function getTeamImageKeys(): Promise<Record<string, string>> {
  if (_teamImageKeys) return _teamImageKeys;
  const data: { name: string; image: string }[] = await fetch(
    "/data/our-team.json"
  ).then((r) => r.json());
  _teamImageKeys = Object.fromEntries(data.map((d) => [d.name, d.image]));
  return _teamImageKeys;
}

// ── Product Categories ────────────────────────────────────────────────────────

export async function getProductCategories(): Promise<IProductsCategoryData[]> {
  const [items, imageKeys] = await Promise.all([
    strapiGet("product-categories", "&sort=createdAt:asc"),
    getCatImageKeys(),
  ]);
  return items.map((c: any) => ({
    id: c.attributes.slug,
    image: imageKeys[c.attributes.title] || c.attributes.slug,
    title: c.attributes.title,
    info: c.attributes.info || "",
  }));
}

// ── Products ──────────────────────────────────────────────────────────────────

export async function getProductsByCategory(
  categorySlug: string
): Promise<{ data: IProductsData[]; productCategory: string }> {
  const [items, imageKeys] = await Promise.all([
    strapiGet(
      "products",
      `&populate=category&filters[category][slug][$eq]=${categorySlug}&sort=createdAt:asc`
    ),
    getProdImageKeys(),
  ]);

  const categoryTitle =
    items.length > 0
      ? items[0].attributes.category?.data?.attributes?.title ?? ""
      : categorySlug
          .split("-")
          .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
          .join(" ");

  const data: IProductsData[] = items.map((p: any) => ({
    id: p.attributes.slug,
    productCategoryId: categorySlug,
    productCategory:
      p.attributes.category?.data?.attributes?.title ?? categoryTitle,
    title: p.attributes.name,
    info: "",
    image: imageKeys[p.attributes.name] || p.attributes.slug,
    company: p.attributes.company?.name ?? "",
  }));

  return { data, productCategory: categoryTitle };
}

// ── All products (for search) ─────────────────────────────────────────────────

export async function getAllProducts(): Promise<IProductsData[]> {
  const [items, imageKeys] = await Promise.all([
    strapiGet("products", "&populate=category&sort=createdAt:asc"),
    getProdImageKeys(),
  ]);
  return items.map((p: any) => ({
    id: p.attributes.slug,
    productCategoryId:
      p.attributes.category?.data?.attributes?.slug ?? "",
    productCategory:
      p.attributes.category?.data?.attributes?.title ?? "",
    title: p.attributes.name,
    info: "",
    image: imageKeys[p.attributes.name] || p.attributes.slug,
    company: p.attributes.company?.name ?? "",
  }));
}

// ── Product Detail ────────────────────────────────────────────────────────────

export async function getProductDetail(slug: string): Promise<IProductDetailData | null> {
  const items = await strapiGet(
    "products",
    `&populate=category,downloadFile&filters[slug][$eq]=${slug}`
  );
  if (!items.length) return null;
  const p = items[0];
  const a = p.attributes;

  // Build the downloadFile URL — full Strapi URL so components can open it directly
  const downloadFile: string =
    a.downloadFile?.data?.attributes?.url
      ? `${STRAPI_URL}${a.downloadFile.data.attributes.url}`
      : "";

  return {
    id: a.slug,
    image: a.slug,
    productName: a.name,
    categoryName:
      a.category?.data?.attributes?.title ?? "",
    Specification: a.specifications ?? [],
    detail: [],
    company: a.company ? [a.company.name ?? a.company] : [],
    companyImg: [],
    description: a.description ?? [],
    detailDescription: a.detailDescription ?? [],
    detailDescriptionAfterTable: a.detailDescriptionAfterTable ?? [],
    productDetailTableData: a.productDetailTableData ?? [],
    customerReviews: a.customerReviews ?? [],
    downloadFile,
    viewManufacturersCatalogue: "",
    downloadFiles: {},
  };
}

// ── News Articles ─────────────────────────────────────────────────────────────

export async function getNewsArticles(): Promise<INewsArticle[]> {
  const items = await strapiGet(
    "news-articles",
    "&populate=mainImage,images&sort=date:desc"
  );
  return items.map((n: any) => {
    const a = n.attributes;
    return {
      id: a.slug ?? String(n.id),
      title: a.title,
      tagline: a.tagline ?? "",
      date: a.date ?? "",
      content: a.content ?? "",
      images: (a.images?.data ?? []).map(
        (img: any) => `${STRAPI_URL}${img.attributes.url}`
      ),
      mainImage: a.mainImage?.data
        ? `${STRAPI_URL}${a.mainImage.data.attributes.url}`
        : "",
    };
  });
}

// ── Team Members ──────────────────────────────────────────────────────────────

export async function getTeamMembers(): Promise<IOurTeamDetails[]> {
  const [items, imageKeys] = await Promise.all([
    strapiGet("team-members", "&populate=photo&sort=createdAt:asc"),
    getTeamImageKeys(),
  ]);
  return items.map((t: any, i: number) => {
    const a = t.attributes;
    // Use Strapi photo URL if available; otherwise fall back to local image key
    const photoUrl = a.photo?.data?.attributes?.url
      ? `${STRAPI_URL}${a.photo.data.attributes.url}`
      : imageKeys[a.name] ?? "";
    return {
      id: i,
      image: photoUrl,
      altTextForImg: a.name,
      name: a.name,
      position: a.position ?? "",
      bio: a.bio ?? "",
    };
  });
}

// ── Partners ──────────────────────────────────────────────────────────────────

export interface IPartner {
  id: number;
  name: string;
  logoUrl: string;
}

export async function getPartners(): Promise<IPartner[]> {
  const items = await strapiGet("partners", "&populate=logo&sort=createdAt:asc");
  return items.map((p: any) => ({
    id: p.id,
    name: p.attributes.name,
    logoUrl: p.attributes.logo?.data?.attributes?.url
      ? `${STRAPI_URL}${p.attributes.logo.data.attributes.url}`
      : "",
  }));
}

// ── Site Settings ─────────────────────────────────────────────────────────────

export interface ISiteSettings {
  companyName: string;
  tagline: string;
  dubaiPhone: string;
  omanPhone: string;
  bahrainPhone: string;
  email: string;
  navigationLinks: { label: string; path: string }[];
  socialLinks: { linkedin?: string; instagram?: string };
}

export async function getSiteSettings(): Promise<ISiteSettings | null> {
  const res = await fetch(`${STRAPI_URL}/api/site-setting`);
  if (!res.ok) return null;
  const json = await res.json();
  const a = json.data?.attributes;
  if (!a) return null;
  return {
    companyName: a.companyName ?? "",
    tagline: a.tagline ?? "",
    dubaiPhone: a.dubaiPhone ?? "",
    omanPhone: a.omanPhone ?? "",
    bahrainPhone: a.bahrainPhone ?? "",
    email: a.email ?? "",
    navigationLinks: a.navigationLinks ?? [],
    socialLinks: a.socialLinks ?? {},
  };
}
