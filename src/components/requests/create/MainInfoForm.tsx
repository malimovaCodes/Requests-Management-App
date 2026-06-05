 'use client';
import { Form, Input, Select, Checkbox, Space, Card } from 'antd';
import { FormInstance } from 'antd';
import { TDepartment } from '@/types';
import styles from './MainInfoForm.module.scss';

interface MainInfoFormProps {
    form: FormInstance;
    isNewDepartment: boolean;
    setIsNewDepartment: (value: boolean) => void;
    departments: TDepartment[];
}

export function MainInfoForm({
    form,
    isNewDepartment,
    setIsNewDepartment,
    departments,
}: MainInfoFormProps) {
    return (
        <Card>
            <Form.Item
                name="creatorName"
                label={<span className={styles.labelRequired}>* ФИО создающего</span>}
                rules={[{ required: true, message: 'Введите ФИО' }]}
            >
                <Input
                    placeholder="Фамилия Имя Отчество"
                    size="large"
                    className={styles.highlightedInput}
                />
            </Form.Item>

            <Form.Item
                label={<span className={styles.labelRequired}>* Отдел</span>}
                rules={[{ required: true, message: 'Выберите отдел' }]}
            >
                <Space orientation="vertical" className={styles.spaceFullWidth}>
                    {!isNewDepartment && (
                        <Form.Item
                            name="departmentId"
                            noStyle
                            rules={[{ required: true, message: 'Выберите отдел' }]}
                        >
                            <Select
                                placeholder="Выберите отдел из списка"
                                size="large"
                                options={departments.map((d) => ({ value: d.id, label: d.name }))}
                                className={styles.selectFullWidth}
                            />
                        </Form.Item>
                    )}

                    <Checkbox
                        checked={isNewDepartment}
                        onChange={(e) => {
                            setIsNewDepartment(e.target.checked);
                            if (e.target.checked) {
                                form.setFieldValue('departmentId', undefined);
                            } else {
                                form.setFieldValue('newDepartmentName', undefined);
                            }
                        }}
                    >
                        Создать новый отдел
                    </Checkbox>

                    {isNewDepartment && (
                        <Form.Item
                            name="newDepartmentName"
                            noStyle
                            rules={[{ required: true, message: 'Введите название нового отдела' }]}
                        >
                            <Input
                                placeholder="Название нового отдела"
                                size="large"
                                className={styles.newDepartmentInput}
                            />
                        </Form.Item>
                    )}
                </Space>
            </Form.Item>

            <Form.Item name="isApproved" valuePropName="checked" className={styles.mb2}>
                <Checkbox>Заявка согласована</Checkbox>
            </Form.Item>

            <div className={styles.infoBox}>
                <span className={styles.textBold}>Без флага</span> — статус{' '}
                <strong>«На согласовании»</strong>.<span className={styles.spacer}></span>
                <span className={styles.textBold}>С флагом</span> — статус{' '}
                <strong>«Согласовано»</strong>.
            </div>
        </Card>
    );
}
