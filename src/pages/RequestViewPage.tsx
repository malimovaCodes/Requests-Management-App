'use client';

import { useRouter } from 'next/navigation';
import { Empty } from 'antd';
import { getRequestTabItems } from '@/constants/tabItems';
import { RequestViewLayout } from '@/components/requests/view/RequestViewLayout';
import { useRequestById } from '@/hooks/useRequestById';

export function RequestViewPage() {
    const router = useRouter();
    const { id, request } = useRequestById();

    if (!id) {
        return <Empty description="Не указан ID заявки" />;
    }

    if (!request) {
        return <Empty description="Заявка не найдена" />;
    }

    const tabItems = getRequestTabItems({ request });

    return (
        <RequestViewLayout
            request={request}
            tabItems={tabItems}
            onBack={() => router.push('/requests')}
        />
    );
}
