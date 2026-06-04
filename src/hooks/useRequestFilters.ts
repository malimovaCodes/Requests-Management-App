import { useState, useMemo } from 'react';
import { TRequest, TRequestStatus } from '@/app/types';
import { isDateInRange } from '@/utils/formatDate';

export function useRequestFilters(requests: TRequest[]) {
    const [filters, setFilters] = useState({
        department: undefined as string | undefined,
        status: undefined as TRequestStatus | undefined,
        dateRange: null as [Date, Date] | null,
    });

    const uniqueDepartments = Array.from(new Set(requests.map(r => r.department.name)));

    const filteredRequests = useMemo(() => {
        return requests.filter((request) => {
            const matchDepartment = !filters.department || request.department.name === filters.department;
            const matchStatus = !filters.status || request.status === filters.status;

            let matchDate = true;
            if (filters.dateRange && filters.dateRange.length === 2) {
                matchDate = isDateInRange(
                    request.createdAt,
                    filters.dateRange[0],
                    filters.dateRange[1]
                );
            }

            return matchDepartment && matchStatus && matchDate;
        });
    }, [requests, filters]);

    return {
        filters,
        setFilters,
        filteredRequests,
        uniqueDepartments,
    };
}