import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { message, Modal } from 'antd';
import { AppDispatch } from '@/store/store';
import { updateRequestStatus } from '@/store/requestSlice';
import { TRequestStatus, STATUS_LABELS } from '@/types';

export function useStatusChanger(requestId: string, currentStatus: TRequestStatus) {
    const dispatch = useDispatch<AppDispatch>();
    const [selectedStatus, setSelectedStatus] = useState<TRequestStatus | undefined>();
    const [isUpdating, setIsUpdating] = useState(false);

    const handleStatusChange = () => {
        if (!selectedStatus) {
            message.error('Выберите статус');
            return;
        }

        Modal.confirm({
            title: 'Подтверждение изменения статуса',
            content: (
                <div>
                    <p>Вы уверены, что хотите изменить статус?</p>
                    <div style={{ marginTop: 12, padding: 12, backgroundColor: '#f5f5f5', borderRadius: 4 }}>
                        <div><strong>Текущий:</strong> {STATUS_LABELS[currentStatus]}</div>
                        <div style={{ marginTop: 8 }}>
                            <strong>Новый:</strong>{' '}
                            <span style={{ color: '#1890ff', fontWeight: 600 }}>
                                {STATUS_LABELS[selectedStatus]}
                            </span>
                        </div>
                    </div>
                </div>
            ),
            okText: 'Да, изменить',
            cancelText: 'Отмена',
            okButtonProps: { type: 'primary' },
            onOk: async () => {
                setIsUpdating(true);
                try {
                    dispatch(updateRequestStatus({
                        id: requestId,
                        status: selectedStatus,
                    }));

                    message.success(`Статус изменён на "${STATUS_LABELS[selectedStatus]}"`);
                    setSelectedStatus(undefined);
                } catch (error) {
                    message.error('Ошибка при изменении статуса');
                } finally {
                    setIsUpdating(false);
                }
            },
        });
    };

    return {
        selectedStatus,
        setSelectedStatus,
        isUpdating,
        handleStatusChange,
    };
}