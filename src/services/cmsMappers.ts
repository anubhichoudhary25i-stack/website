import type { BlogItem, PortfolioItem } from '@/types/cms';

function getCell(row: Record<string, unknown>, columnName: string): unknown {
  const key = Object.keys(row).find(
    (candidate) => candidate.toLowerCase() === columnName.toLowerCase()
  );

  return key ? row[key] : undefined;
}

function getString(row: Record<string, unknown>, columnName: string): string {
  const value = getCell(row, columnName);

  if (value === null || value === undefined) {
    return '';
  }

  return String(value).trim();
}

function parseVisible(value: unknown): boolean {
  if (value === true || value === 1) {
    return true;
  }

  if (
    value === false ||
    value === 0 ||
    value === null ||
    value === undefined
  ) {
    return false;
  }

  const normalized = String(value).trim().toLowerCase();

  return (
    normalized === 'true' ||
    normalized === 'yes' ||
    normalized === '1'
  );
}

function parseDisplayOrder(value: unknown): number {
  const parsed = Number(value);
  return Number.isFinite(parsed)
    ? parsed
    : Number.MAX_SAFE_INTEGER;
}

function sortByDisplayOrder<T extends { displayOrder: number }>(
  items: T[]
): T[] {
  return [...items].sort(
    (a, b) => a.displayOrder - b.displayOrder
  );
}

function buildImagePath(
  folder: 'portfolio' | 'blogs',
  image: string
): string | undefined {
  const filename = image.trim();

  if (!filename) {
    return undefined;
  }

  // Allow absolute paths if needed
  if (filename.startsWith('/')) {
    return filename;
  }

  // Allow "blogs/image.jpg" or "portfolio/image.jpg"
  if (filename.includes('/')) {
    return `/${filename}`;
  }

  return `/${folder}/${filename}`;
}

export function mapPortfolioRows(
  rows: Record<string, unknown>[]
): PortfolioItem[] {
  const items = rows
    .filter((row) => parseVisible(getCell(row, 'Visible')))
    .map((row) => {
      const image = getString(row, 'Image');

      return {
        title: getString(row, 'Title'),
        description: getString(row, 'Description'),
        imageUrl: buildImagePath('portfolio', image),
        driveLink: getString(row, 'DriveLink') || undefined,
        displayOrder: parseDisplayOrder(
          getCell(row, 'DisplayOrder')
        ),
      };
    })
    .filter((item) => item.title.length > 0);

  return sortByDisplayOrder(items);
}

export function mapBlogRows(
  rows: Record<string, unknown>[]
): BlogItem[] {
  const items = rows
    .filter((row) => parseVisible(getCell(row, 'Visible')))
    .map((row) => {
      const image = getString(row, 'Image');

      return {
        title: getString(row, 'Title'),
        description: getString(row, 'Description'),
        imageUrl: buildImagePath('blogs', image),
        linkedInUrl:
          getString(row, 'LinkedInURL') || undefined,
        displayOrder: parseDisplayOrder(
          getCell(row, 'DisplayOrder')
        ),
      };
    })
    .filter((item) => item.title.length > 0);

  return sortByDisplayOrder(items);
}