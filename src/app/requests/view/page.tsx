'use client';

import { Suspense } from 'react';
import { RequestViewPage } from '@/pages/RequestViewPage';

export default function Page() {
    return (
        <Suspense fallback={<div>Загрузка заявки</div>}>
            <RequestViewPage />
        </Suspense>
    );
}