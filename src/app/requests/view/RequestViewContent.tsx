'use client';
import { useSearchParams, useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/store/store';
import { TRequestStatus, STATUS_LABELS, STATUS_FLOW } from '@/types';
import { Tabs, TabsProps, Table, Button, Empty, Divider, message, Modal, Card } from 'antd';
import { useState, useEffect } from 'react';
import { updateRequestStatus } from '@/store/requestSlice';
import { loadRequestsFromStorage } from '@/store/requestSlice';
import { Typography } from 'antd';
import { detailsColumns } from '@/constants/tableColumns';
import { RequestInfoCard } from '@/components/requests/RequestInfoCard';
import { StatusChanger } from '@/components/requests/StatusChanger';
import { useStatusChanger } from '@/hooks/useStatusChanger';
import { getRequestTabItems } from '@/constants/tabItems';


export function RequestViewContent() {
    const { Title } = Typography;

    const searchParams = useSearchParams();
    const router = useRouter();
    const id = searchParams.get('id');

    const { requests } = useSelector((state: RootState) => state.requests);
    const request = requests.find((r) => r.id === id);

    const { selectedStatus, setSelectedStatus, isUpdating, handleStatusChange } = useStatusChanger(request?.id || '', request?.status || 'ON_APPROVAL');

    if (!id) {
        return <Empty description="Не указан ID заявки" />;
    }

    if (!request) {
        return <Empty description="Заявка не найдена" />;
    }

    const mainInfoTab = (
        <div>
            <RequestInfoCard request={request} />
            <StatusChanger
                currentStatus={request.status}
                selectedStatus={selectedStatus}
                isUpdating={isUpdating}
                onStatusSelect={setSelectedStatus}
                onStatusChange={handleStatusChange}
            />
        </div>
    );

    const itemsTab = (
        <div>
            <Card>
                <Table
                    columns={detailsColumns}
                    dataSource={request.items}
                    rowKey="id"
                    pagination={false}
                    style={{ marginBottom: 16 }}
                />
                <Divider />
                <div style={{ textAlign: 'right', fontSize: 18, fontWeight: 'bold' }}>
                    Итоговая сумма: <span style={{ color: '#1890ff', fontSize: 22 }}>{request.totalPrice.toLocaleString('ru-RU')} руб.</span>
                </div>
            </Card>
        </div>
    );

    const tabItems = getRequestTabItems({
        request,
        mainInfoTab,
        itemsTab,
    });

    return (
        <div style={{ padding: '24px' }}>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 24
            }}>
                <div>
                    <Title level={2}>Заявка №{request.number}</Title>
                    <div style={{
                        marginTop: 8,
                        display: 'inline-block',
                        padding: '4px 12px',
                        backgroundColor: '#e6f7ff',
                        borderRadius: 4,
                        color: '#1890ff',
                        fontSize: 14
                    }}>
                        {STATUS_LABELS[request.status]}
                    </div>
                </div>
                <Button
                    size="large"
                    onClick={() => router.push('/requests')}
                    style={{
                        borderColor: '#d9d9d9',
                        color: '#666'
                    }}
                >
                    - К списку заявок
                </Button>
            </div>

            <Tabs defaultActiveKey="1" items={tabItems} />
        </div>
    );
}