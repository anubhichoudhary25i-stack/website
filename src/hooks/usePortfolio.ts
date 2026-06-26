import { useQuery } from '@tanstack/react-query';
import { CMS_CONFIG, isCmsConfigured } from '@/config/cms';
import { fetchPublicSheetTab } from '@/services/googleSheets';
import { mapPortfolioRows } from '@/services/cmsMappers';
import type { PortfolioItem } from '@/types/cms';

export function usePortfolio() {
  return useQuery<PortfolioItem[]>({
    queryKey: ['cms', 'portfolio'],
    queryFn: async () => {
      const rows = await fetchPublicSheetTab(CMS_CONFIG.tabs.portfolio);
      return mapPortfolioRows(rows);
    },
    enabled: isCmsConfigured(),
    staleTime: CMS_CONFIG.staleTime,
    refetchInterval: CMS_CONFIG.refetchInterval,
  });
}
