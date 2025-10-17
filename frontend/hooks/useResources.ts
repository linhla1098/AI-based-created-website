'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { resourcesApi, type IdleResource, type ResourceFilters } from '../lib/api';

// Query keys
export const QUERY_KEYS = {
  RESOURCES: 'resources',
  RESOURCE: 'resource',
  DASHBOARD_STATS: 'dashboard-stats',
} as const;

// Hook to fetch all resources with pagination and filters
export function useResources(filters: ResourceFilters = {}) {
  return useQuery({
    queryKey: [QUERY_KEYS.RESOURCES, filters],
    queryFn: () => resourcesApi.getAll(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Hook to fetch single resource by ID
export function useResource(id: number) {
  return useQuery({
    queryKey: [QUERY_KEYS.RESOURCE, id],
    queryFn: () => resourcesApi.getById(id),
    enabled: !!id,
  });
}

// Hook to fetch dashboard statistics
export function useDashboardStats() {
  return useQuery({
    queryKey: [QUERY_KEYS.DASHBOARD_STATS],
    queryFn: resourcesApi.getDashboardStats,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}

// Hook to create new resource
export function useCreateResource() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: resourcesApi.create,
    onSuccess: () => {
      // Invalidate and refetch resources
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.RESOURCES] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.DASHBOARD_STATS] });
    },
  });
}

// Hook to update resource
export function useUpdateResource() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<IdleResource> }) => 
      resourcesApi.update(id, data),
    onSuccess: (data) => {
      // Update the cached resource
      queryClient.setQueryData([QUERY_KEYS.RESOURCE, data.id], data);
      // Invalidate resources list to refetch
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.RESOURCES] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.DASHBOARD_STATS] });
    },
  });
}

// Hook to delete resource
export function useDeleteResource() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: resourcesApi.delete,
    onSuccess: () => {
      // Invalidate and refetch resources
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.RESOURCES] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.DASHBOARD_STATS] });
    },
  });
}