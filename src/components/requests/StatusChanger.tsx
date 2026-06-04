import { Card, Select, Button, Divider } from 'antd';
import { TRequestStatus, STATUS_LABELS, STATUS_FLOW } from '@/types';

interface StatusChangerProps {
    currentStatus: TRequestStatus;
    selectedStatus: TRequestStatus | undefined;
    isUpdating: boolean;
    onStatusSelect: (status: TRequestStatus) => void;
    onStatusChange: () => void;
}

export function StatusChanger({
    currentStatus,
    selectedStatus,
    isUpdating,
    onStatusSelect,
    onStatusChange
}: StatusChangerProps) {
    const currentStatusIndex = STATUS_FLOW.indexOf(currentStatus);
    const availableStatuses = STATUS_FLOW.slice(currentStatusIndex + 1);

    if (currentStatus === 'ISSUED') {
        return (
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
        );
    }

    if (availableStatuses.length === 0) {
        return null;
    }

    return (
        <Card title="Изменение статуса">
            <div style={{ marginBottom: 16 }}>
                <div style={{ color: '#666', fontSize: 14, marginBottom: 8 }}>
                    Текущий статус: <strong>{STATUS_LABELS[currentStatus]}</strong>
                </div>
            </div>
            
            <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: 250 }}>
                    <div style={{ color: '#666', fontSize: 12, marginBottom: 4 }}>Изменить статус на</div>
                    <Select
                        value={selectedStatus}
                        onChange={onStatusSelect}
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
                    onClick={onStatusChange}
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
    );
}