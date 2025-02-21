"use client"

import { getProducts } from '@/actions/admin/product';
import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import axios from "axios";

export const useAdminProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
    initialData: [],
  });
};

