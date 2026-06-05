import { TabsProps } from 'antd';
import { TRequest } from '@/types';
import { MainInfoTabContent } from '@/components/requests/view/RequestDetails';
import { OrderItemsTable } from '@/components/requests/view/OrderItemsTable';

interface GetRequestTabItemsArgs {
    request: TRequest;
}

export const getRequestTabItems = ({
    request,
}: GetRequestTabItemsArgs): TabsProps['items'] => [
    {
        key: '1',
        label: 'Основная информация',
        children: <MainInfoTabContent request={request} />,
    },
    {
        key: '2',
        label: (
            <span>
                Состав заказа
                {request.items.length > 0 && (
                    <span
                        style={{
                            marginLeft: 8,
                            backgroundColor: '#1890ff',
                            color: '#fff',
                            borderRadius: 10,
                            padding: '2px 8px',
                            fontSize: 12,
                        }}
                    >
                        {request.items.length}
                    </span>
                )}
            </span>
        ),
        children: <OrderItemsTable request={request} />,
    },
];