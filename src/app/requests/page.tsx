'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import { loadRequestsFromStorage } from '@/store/requestSlice';
import { useRequestFilters } from '@/hooks/useRequestFilters';
import { RequestsListLayout } from '@/components/requests/list/RequestsListLayout';

export default function RequestsListPage() {
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();
    const { requests, isLoading } = useSelector((state: RootState) => state.requests);

    const { filters, setFilters, filteredRequests, uniqueDepartments } = useRequestFilters(requests);

    useEffect(() => {
        dispatch(loadRequestsFromStorage());
    }, [dispatch]);

    return (
        <div style={{ padding: '24px', maxWidth: 1200, margin: '0 auto' }}>
            <RequestsListLayout
                requests={filteredRequests}
                isLoading={isLoading}
                filters={filters}
                onFilterChange={setFilters}
                departments={uniqueDepartments}
                onCreateClick={() => router.push('/requests/new')}
                onRowClick={(record) => router.push(`/requests/view?id=${record.id}`)}
            />
        </div>
    );
}