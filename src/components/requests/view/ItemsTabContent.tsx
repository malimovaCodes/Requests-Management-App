import { Card, Divider, Table } from 'antd';
import { TRequest } from '@/types';
import { detailsColumns } from '@/constants/tableColumns';

interface ItemsTabContentProps {
    request: TRequest;
}

export function ItemsTabContent({ request }: ItemsTabContentProps) {
    return (
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
                    Итоговая сумма:{' '}
                    <span style={{ color: '#1890ff', fontSize: 22 }}>
                        {request.totalPrice.toLocaleString('ru-RU')} руб.
                    </span>
                </div>
            </Card>
        </div>
    );
}