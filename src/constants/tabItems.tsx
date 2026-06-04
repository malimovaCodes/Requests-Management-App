import { TabsProps } from 'antd';
import { TRequest } from '@/types';

interface GetRequestTabItemsArgs {
    request: TRequest;
    mainInfoTab: React.ReactNode;
    itemsTab: React.ReactNode;
}

export const getRequestTabItems = ({
    request,
    mainInfoTab,
    itemsTab,
}: GetRequestTabItemsArgs): TabsProps['items'] => [
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
        children: itemsTab,
    },
];