import { Typography, Table, Button } from 'antd';
import { TRequest, TRequestStatus } from '@/types';
import { requestsColumns } from '@/constants/tableColumns';
import { RequestFilters } from '@/components/requests/list/RequestFilters';

const { Title } = Typography;

interface RequestsListLayoutProps {
    requests: TRequest[];
    isLoading: boolean;
    filters: {
        department: string | undefined;
        status: TRequestStatus | undefined;
        dateRange: [Date, Date] | null;
    };
    onFilterChange: (filters: RequestsListLayoutProps['filters']) => void;
    departments: string[];
    onCreateClick: () => void;
    onRowClick: (record: TRequest) => void;
}

export function RequestsListLayout({
    requests,
    isLoading,
    filters,
    onFilterChange,
    departments,
    onCreateClick,
    onRowClick,
}: RequestsListLayoutProps) {
    return (
        <>
            <Title>Список заявок</Title>

            <RequestFilters
                filters={filters}
                onFilterChange={onFilterChange}
                departments={departments}
            />

            <div style={{ marginBottom: 16 }}>
                <Button
                    type="primary"
                    size="large"
                    onClick={onCreateClick}
                >
                    Создать заявку
                </Button>
            </div>

            <Table
                columns={requestsColumns}
                dataSource={requests}
                loading={isLoading}
                rowKey="id"
                onRow={(record) => ({
                    onClick: () => onRowClick(record),
                    style: { cursor: 'pointer' }
                })}
            />
        </>
    );
}