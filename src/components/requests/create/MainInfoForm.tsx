import { Form, Input, Select, Checkbox, Space, Card } from 'antd';
import { FormInstance } from 'antd';
import { TDepartment } from '@/types';

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
                label={<span style={{ fontWeight: 600, color: '#333' }}>* ФИО создающего</span>}
                rules={[{ required: true, message: 'Введите ФИО' }]}
            >
                <Input
                    placeholder="Фамилия Имя Отчество"
                    size="large"
                    style={{
                        backgroundColor: '#f0f5ff',
                        border: '1px solid #d6e4ff'
                    }}
                />
            </Form.Item>

            <Form.Item
                label={<span style={{ fontWeight: 600, color: '#333' }}>* Отдел</span>}
                rules={[{ required: true, message: 'Выберите отдел' }]}
            >
                <Space direction="vertical" style={{ width: '100%' }}>
                    {!isNewDepartment && (
                        <Form.Item
                            name="departmentId"
                            noStyle
                            rules={[{ required: true, message: 'Выберите отдел' }]}
                        >
                            <Select
                                placeholder="Выберите отдел из списка"
                                size="large"
                                options={departments.map(d => ({ value: d.id, label: d.name }))}
                                style={{
                                    width: '100%',
                                    backgroundColor: '#fff',
                                }}
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
                                style={{
                                    backgroundColor: '#f0f5ff',
                                    border: '1px solid #d6e4ff',
                                    marginTop: 8
                                }}
                            />
                        </Form.Item>
                    )}
                </Space>
            </Form.Item>

            <Form.Item
                name="isApproved"
                valuePropName="checked"
                style={{ marginBottom: 8 }}
            >
                <Checkbox>Заявка согласована</Checkbox>
            </Form.Item>

            <div style={{
                marginTop: 16,
                padding: '12px 16px',
                backgroundColor: '#e6f7ff',
                border: '1px solid #91d5ff',
                borderRadius: 6,
                fontSize: 13,
                color: '#1890ff'
            }}>
                <span style={{ fontWeight: 600 }}>Без флага</span> — статус <strong>«На согласовании»</strong>.
                <span style={{ marginLeft: 8 }}></span>
                <span style={{ fontWeight: 600 }}>С флагом</span> — статус <strong>«Согласовано»</strong>.
            </div>
        </Card>
    );
}