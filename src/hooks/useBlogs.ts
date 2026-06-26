import { useQuery } from '@tanstack/react-query';
import { CMS_CONFIG, isCmsConfigured } from '@/config/cms';
import { fetchPublicSheetTab } from '@/services/googleSheets';
import { mapBlogRows } from '@/services/cmsMappers';
import type { BlogItem } from '@/types/cms';

export function useBlogs() {
  return useQuery<BlogItem[]>({
    queryKey: ['cms', 'blogs'],
    queryFn: async () => {
      const rows = await fetchPublicSheetTab(CMS_CONFIG.tabs.blogs);
      return mapBlogRows(rows);
    },
    enabled: isCmsConfigured(),
    staleTime: CMS_CONFIG.staleTime,
    refetchInterval: CMS_CONFIG.refetchInterval,
  });
}
