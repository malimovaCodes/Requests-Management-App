'use client';

import { Card, Select, Button, Divider } from 'antd';
import { TRequestStatus, STATUS_LABELS, STATUS_FLOW } from '@/types';
import styles from './StatusChanger.module.scss'; 

interface StatusChangerProps {
    currentStatus: TRequestStatus;
    selectedStatus: TRequestStatus | undefined;
    isUpdating: boolean;
    onStatusSelect: (status: TRequestStatus) => void;
    onStatusChange: () => void;
}

export function StatusChanger({
    currentStatus,
    selectedStatus,
    isUpdating,
    onStatusSelect,
    onStatusChange
}: StatusChangerProps) {
    const currentStatusIndex = STATUS_FLOW.indexOf(currentStatus);
    const availableStatuses = STATUS_FLOW.slice(currentStatusIndex + 1);

    if (currentStatus === 'ISSUED') {
        return (
            <Card>
                <div className={styles.issuedWarning}>
                    <strong>Заявка закрыта</strong>
                    <div className={styles.issuedText}>
                        Изменение статуса недоступно (товар выдан)
                    </div>
                </div>
            </Card>
        );
    }

    if (availableStatuses.length === 0) {
        return null;
    }

    return (
        <Card title="Изменение статуса">
            <div className={styles.currentStatusWrapper}>
                <div className={styles.currentStatusText}>
                    Текущий статус: <strong>{STATUS_LABELS[currentStatus]}</strong>
                </div>
            </div>
            
            <div className={styles.controlsWrapper}>
                <div className={styles.selectWrapper}>
                    <div className={styles.selectLabel}>Изменить статус на</div>
                    <Select
                        className={styles.selectComponent}
                        value={selectedStatus}
                        onChange={onStatusSelect}
                        placeholder="Выберите следующий статус"
                        options={availableStatuses.map(status => ({
                            value: status,
                            label: STATUS_LABELS[status]
                        }))}
                        disabled={isUpdating}
                    />
                </div>
                
                <Button 
                    className={styles.saveButton}
                    type="primary" 
                    onClick={onStatusChange}
                    disabled={!selectedStatus || isUpdating}
                    loading={isUpdating}
                >
                    Сохранить
                </Button>
            </div>
            
            <Divider className={styles.customDivider} />
            
            <div className={styles.flowWrapper}>
                <div className={styles.flowTitle}>Доступные статусы для перехода:</div>
                <div className={styles.flowItems}>
                    {availableStatuses.map((status, index) => (
                        <span key={status}>
                            <span className={styles.statusBadge}>
                                {STATUS_LABELS[status]}
                            </span>
                            {index < availableStatuses.length - 1 && (
                                <span className={styles.flowArrow}>→</span>
                            )}
                        </span>
                    ))}
                </div>
            </div>
        </Card>
    );
}