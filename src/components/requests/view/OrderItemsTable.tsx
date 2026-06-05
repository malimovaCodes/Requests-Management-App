import { Card, Divider, Table } from 'antd';
import { TRequest } from '@/types';
import { detailsColumns } from '@/constants/tableColumns';
import styles from '@/components/requests/view/OrderItemsTable.module.scss';

interface ItemsTabContentProps {
    request: TRequest;
}

export function OrderItemsTable({ request }: ItemsTabContentProps) {
    return (
        <div>
            <Card>
                <Table
                    columns={detailsColumns}
                    dataSource={request.items}
                    rowKey="id"
                    pagination={false}
                    className="mb-4"
                />
                <Divider />
                <div className="text-right text-lg font-bold">
                    Итоговая сумма:{' '}
                    <span className={styles.totalPrice}>
                        {request.totalPrice.toLocaleString('ru-RU')} руб.
                    </span>
                </div>
            </Card>
        </div>
    );
}
