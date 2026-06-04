import { TRequestStatus } from '@/types';

export const STATUS_FLOW: TRequestStatus[] = [
    'ON_APPROVAL',
    'APPROVED',
    'ORDERED',
    'ARRIVED',
    'ISSUED'
];

export const getAvailableStatuses = (currentStatus: TRequestStatus): TRequestStatus[] => {
    const currentIndex = STATUS_FLOW.indexOf(currentStatus);
    
    if (currentIndex === -1 || currentStatus === 'ISSUED') {
        return [];
    }
    
    return STATUS_FLOW.slice(currentIndex + 1);
};