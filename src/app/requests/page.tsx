'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Table, Typography } from 'antd';
import { AppDispatch, RootState } from '@/store/store';
import { loadRequestsFromStorage } from '@/store/requestSlice';
import { requestsColumns } from '@/constants/tableColumns';
import { RequestFilters } from '@/components/requests/RequestFilters';
import { useRequestFilters } from '@/hooks/useRequestFilters';

const { Title } = Typography;

export default function RequestsListPage() {
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();
    const { requests, isLoading } = useSelector((state: RootState) => state.requests);

    const { filters, setFilters, filteredRequests, uniqueDepartments } = useRequestFilters(requests);

    useEffect(() => {
        dispatch(loadRequestsFromStorage());
    }, [dispatch]);

    return (
        <>
            {/* <div style={{ padding: '24px', maxWidth: 1200, margin: '0 auto' }}> */}
                <Title>Список заявок</Title>
                
                <RequestFilters
                    filters={filters}
                    onFilterChange={setFilters}
                    departments={uniqueDepartments}
                />

                <div style={{ marginBottom: 16 }}>
                    <Button
                        type="primary"
                        size="large"
                        onClick={() => router.push('/requests/new')}
                    >
                        Создать заявку
                    </Button>
                </div>

                <Table
                    columns={requestsColumns}
                    dataSource={filteredRequests}
                    loading={isLoading}
                    rowKey="id"
                    onRow={(record) => ({
                        onClick: () => {
                            router.push(`/requests/view?id=${record.id}`);
                        },
                        style: { cursor: 'pointer' }
                    })}
                />
            {/* </div> */}
        </>
    );
}