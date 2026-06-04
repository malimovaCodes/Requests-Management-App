'use client';
import { useSearchParams, useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/store/store';
import { TRequest, TRequestStatus, STATUS_LABELS, STATUS_FLOW } from '@/app/types';
import { 
    Tabs, 
    TabsProps, 
    Table, 
    Button, 
    Empty, 
    Select, 
    Space, 
    Divider,
    message,
    Modal,
    Card
} from 'antd';
import { useState, useEffect } from 'react';
import { updateRequestStatus } from '@/store/requestSlice';
import { loadRequestsFromStorage } from '@/store/requestSlice';

export function RequestViewContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const id = searchParams.get('id');

    const [selectedStatus, setSelectedStatus] = useState<TRequestStatus | undefined>();
    const [isUpdating, setIsUpdating] = useState(false);

    const dispatch = useDispatch<AppDispatch>();
    
    const { requests } = useSelector((state: RootState) => state.requests);
    const request = requests.find((r) => r.id === id);
    
    useEffect(() => {
        dispatch(loadRequestsFromStorage());
    }, [dispatch]);

    if (!id) {
        return <Empty description="Не указан ID заявки" />;
    }

    if (!request) {
        return <Empty description="Заявка не найдена" />;
    }

    const currentStatusIndex = STATUS_FLOW.indexOf(request.status);
    const availableStatuses = STATUS_FLOW.slice(currentStatusIndex + 1);

    const handleStatusChange = () => {
        if (!selectedStatus) {
            message.error('Выберите статус');
            return;
        }

        Modal.confirm({
            title: 'Подтверждение изменения статуса',
            content: (
                <div>
                    <p>Вы уверены, что хотите изменить статус?</p>
                    <div style={{ marginTop: 12, padding: 12, backgroundColor: '#f5f5f5', borderRadius: 4 }}>
                        <div><strong>Текущий:</strong> {STATUS_LABELS[request.status]}</div>
                        <div style={{ marginTop: 8 }}><strong>Новый:</strong> <span style={{ color: '#1890ff', fontWeight: 600 }}>{STATUS_LABELS[selectedStatus]}</span></div>
                    </div>
                </div>
            ),
            okText: 'Да, изменить',
            cancelText: 'Отмена',
            okButtonProps: { type: 'primary' },
            onOk: async () => {
                setIsUpdating(true);
                try {
                    dispatch(updateRequestStatus({ 
                        id: request.id, 
                        status: selectedStatus 
                    }));
                    
                    message.success(`Статус изменён на "${STATUS_LABELS[selectedStatus]}"`);
                    setSelectedStatus(undefined);
                } catch (error) {
                    message.error('Ошибка при изменении статуса');
                } finally {
                    setIsUpdating(false);
                }
            },
        });
    };


    const mainInfoTab = (
        <div>
            <Card style={{ marginBottom: 16 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    <div>
                        <div style={{ color: '#666', fontSize: 12, marginBottom: 4 }}>Номер заявки</div>
                        <div style={{ fontSize: 16, fontWeight: 600 }}>#{request.number}</div>
                    </div>
                    
                    <div>
                        <div style={{ color: '#666', fontSize: 12, marginBottom: 4 }}>Дата создания</div>
                        <div style={{ fontSize: 16 }}>{new Date(request.createdAt).toLocaleString('ru-RU')}</div>
                    </div>

                    <div>
                        <div style={{ color: '#666', fontSize: 12, marginBottom: 4 }}>ФИО создающего</div>
                        <div style={{ fontSize: 16, fontWeight: 600 }}>{request.creatorName}</div>
                    </div>

                    <div>
                        <div style={{ color: '#666', fontSize: 12, marginBottom: 4 }}>Отдел</div>
                        <div style={{ fontSize: 16 }}>{request.department.name}</div>
                    </div>

                    <div>
                        <div style={{ color: '#666', fontSize: 12, marginBottom: 4 }}>Текущий статус</div>
                        <div style={{ fontSize: 16, color: '#1890ff', fontWeight: 600 }}>
                            {STATUS_LABELS[request.status]}
                        </div>
                    </div>

                    <div>
                        <div style={{ color: '#666', fontSize: 12, marginBottom: 4 }}>Итоговая сумма</div>
                        <div style={{ fontSize: 20, color: '#1890ff', fontWeight: 700 }}>
                            {request.totalPrice.toLocaleString('ru-RU')} руб.
                        </div>
                    </div>
                </div>
            </Card>

            {request.status !== 'ISSUED' && availableStatuses.length > 0 && (
                <Card title="Изменение статуса">
                    <div style={{ marginBottom: 16 }}>
                        <div style={{ color: '#666', fontSize: 14, marginBottom: 8 }}>
                            Текущий статус: <strong>{STATUS_LABELS[request.status]}</strong>
                        </div>
                    </div>
                    <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
                        <div style={{ flex: 1, minWidth: 250 }}>
                            <div style={{ color: '#666', fontSize: 12, marginBottom: 4 }}>Изменить статус на</div>
                            <Select
                                value={selectedStatus}
                                onChange={setSelectedStatus}
                                placeholder="Выберите следующий статус"
                                style={{ width: '100%' }}
                                options={availableStatuses.map(status => ({
                                    value: status,
                                    label: STATUS_LABELS[status]
                                }))}
                                disabled={isUpdating}
                            />
                        </div>
                        <Button 
                            type="primary" 
                            onClick={handleStatusChange}
                            disabled={!selectedStatus || isUpdating}
                            loading={isUpdating}
                            style={{ marginTop: 20 }}
                        >
                            Сохранить
                        </Button>
                    </div>
                    
                    <Divider style={{ margin: '16px 0' }} />
                    <div style={{ fontSize: 13, color: '#666' }}>
                        <div style={{ marginBottom: 8, fontWeight: 500 }}>Доступные статусы для перехода:</div>
                        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                            {availableStatuses.map((status, index) => (
                                <span key={status}>
                                    <span style={{ 
                                        display: 'inline-block',
                                        padding: '4px 12px',
                                        backgroundColor: '#e6f7ff',
                                        borderRadius: 4,
                                        color: '#1890ff',
                                        border: '1px solid #91d5ff'
                                    }}>
                                        {STATUS_LABELS[status]}
                                    </span>
                                    {index < availableStatuses.length - 1 && (
                                        <span style={{ margin: '0 4px' }}>→</span>
                                    )}
                                </span>
                            ))}
                        </div>
                    </div>
                </Card>
            )}

            {request.status === 'ISSUED' && (
                <Card>
                    <div style={{ 
                        padding: '16px',
                        backgroundColor: '#fff7e6', 
                        borderRadius: 4,
                        color: '#fa8c16',
                        textAlign: 'center',
                        border: '1px solid #ffd591'
                    }}>
                        <strong>Заявка закрыта</strong>
                        <div style={{ marginTop: 8, fontSize: 14 }}>
                            Изменение статуса недоступно (товар выдан)
                        </div>
                    </div>
                </Card>
            )}
        </div>
    );

    const itemsColumns = [
        { 
            title: '№', 
            key: 'index',
            width: 60,
            render: (_: any, __: any, index: number) => index + 1
        },
        { title: 'Наименование', dataIndex: 'name', key: 'name' },
        { title: 'Ссылка', dataIndex: 'link', key: 'link', render: (link: string) => link ? <a href={link} target="_blank" rel="noopener noreferrer">Открыть</a> : '-' },
        { title: 'Ед. изм.', dataIndex: 'unit', key: 'unit', width: 100 },
        { title: 'Кол-во', dataIndex: 'quantity', key: 'quantity', width: 100 },
        { title: 'Цена', dataIndex: 'price', key: 'price', width: 120, render: (price: number) => `${price} руб.` },
        { title: 'Сумма', dataIndex: 'totalPrice', key: 'totalPrice', width: 120, render: (total: number) => <b>{total} руб.</b> },
    ];

    const itemsTab = (
        <div>
            <Card>
                <Table 
                    columns={itemsColumns} 
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

    const tabItems: TabsProps['items'] = [
        {
            key: '1',
            label: 'Основная информация',
            children: mainInfoTab,
        },
        {
            key: '2',
            label: (
                <span>
                    Состав заказа
                    {request.items.length > 0 && (
                        <span style={{ 
                            marginLeft: 8, 
                            backgroundColor: '#1890ff', 
                            color: '#fff',
                            borderRadius: 10,
                            padding: '2px 8px',
                            fontSize: 12
                        }}>
                            {request.items.length}
                        </span>
                    )}
                </span>
            ),
            children: itemsTab,
        },
    ];

    return (
        <div style={{ padding: '24px' }}>
            <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                marginBottom: 24 
            }}>
                <div>
                    <h1 style={{ margin: 0, fontSize: 24 }}>Заявка №{request.number}</h1>
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