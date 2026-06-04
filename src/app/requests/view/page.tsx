'use client';
import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { RequestViewContent } from './RequestViewContent';

export default function RequestViewPage() {
    return (
        <Suspense fallback={<div>Загрузка заявки</div>}>
            <RequestViewContent />
        </Suspense>
    );
}