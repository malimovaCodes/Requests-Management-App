import { Card } from 'antd';
import { TRequest, STATUS_LABELS } from '@/types';
import { formatDateTime } from '@/utils/formatDate';
import styles from './RequestInfoCard.module.scss';

interface RequestInfoCardProps {
    request: TRequest;
}

export function RequestInfoCard({ request }: RequestInfoCardProps) {
    return (
        <Card className="mb-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                    <div className={styles.label}>Номер заявки</div>
                    <div className="text-base font-semibold">№{request.number}</div>
                </div>

                <div>
                    <div className={styles.label}>Дата создания</div>
                    <div className={styles.value}>{formatDateTime(request.createdAt)}</div>
                </div>

                <div>
                    <div className={styles.label}>ФИО создающего</div>
                    <div className="text-base font-semibold">{request.creatorName}</div>
                </div>

                <div>
                    <div className={styles.label}>Отдел</div>
                    <div className={styles.value}>{request.department.name}</div>
                </div>

                <div>
                    <div className={styles.label}>Текущий статус</div>
                    <div className={styles.valueHighlighted}>{STATUS_LABELS[request.status]}</div>
                </div>

                <div>
                    <div className={styles.label}>Итоговая сумма</div>
                    <div className={styles.valueTotal}>
                        {request.totalPrice.toLocaleString('ru-RU')} руб.
                    </div>
                </div>
            </div>
        </Card>
    );
}
