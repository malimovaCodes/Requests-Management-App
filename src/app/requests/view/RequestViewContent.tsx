'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { Empty } from 'antd';
import { getRequestTabItems } from '@/constants/tabItems';
import { RequestViewLayout } from '@/components/requests/view/RequestPageLayout';

export function RequestViewContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const id = searchParams.get('id');

    const { requests } = useSelector((state: RootState) => state.requests);
    const request = requests.find((r) => r.id === id);

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