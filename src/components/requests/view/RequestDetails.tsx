import { TRequest } from '@/types';
import { RequestInfoCard } from './RequestInfoCard';
import { StatusChanger } from './StatusChanger';
import { useStatusChanger } from '@/hooks/useStatusChanger';

interface MainInfoTabContentProps {
    request: TRequest;
}

export function MainInfoTabContent({ request }: MainInfoTabContentProps) {
    const { selectedStatus, setSelectedStatus, isUpdating, handleStatusChange } = 
        useStatusChanger(request.id, request.status);

    return (
        <div>
            <RequestInfoCard request={request} />
            <StatusChanger
                currentStatus={request.status}
                selectedStatus={selectedStatus}
                isUpdating={isUpdating}
                onStatusSelect={setSelectedStatus}
                onStatusChange={handleStatusChange}
            />
        </div>
    );
}