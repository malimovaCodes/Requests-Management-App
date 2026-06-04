import { Card } from 'antd';
import { TRequest, STATUS_LABELS } from '@/types';
import { formatDateTime } from '@/utils/formatDate';

interface RequestInfoCardProps {
    request: TRequest;
}

export function RequestInfoCard({ request }: RequestInfoCardProps) {
    return (
        <Card style={{ marginBottom: 16 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div>
                    <div style={{ color: '#666', fontSize: 12, marginBottom: 4 }}>Номер заявки</div>
                    <div style={{ fontSize: 16, fontWeight: 600 }}>#{request.number}</div>
                </div>
                
                <div>
                    <div style={{ color: '#666', fontSize: 12, marginBottom: 4 }}>Дата создания</div>
                    <div style={{ fontSize: 16 }}>{formatDateTime(request.createdAt)}</div>
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
    );
}