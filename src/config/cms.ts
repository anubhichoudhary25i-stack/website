export const CMS_CONFIG = {
  sheetId: import.meta.env.VITE_GOOGLE_SHEET_ID ?? '',
  tabs: {
    portfolio: 'Portfolio',
    blogs: 'Blogs',
  },
  /** Cache sheet data for 5 minutes; refetch in background so edits appear without redeploying. */
  staleTime: 5 * 60 * 1000,
  refetchInterval: 10 * 60 * 1000,
} as const;

export function isCmsConfigured(): boolean {
  return CMS_CONFIG.sheetId.length > 0;
}
