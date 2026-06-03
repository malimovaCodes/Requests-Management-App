'use client'
import { Form, Input, Button, Select, Checkbox, Tabs, Space, Card, message } from "antd";
import { useState } from "react";

export default function CreateNewRequestPage() {
    const [form] = Form.useForm();
    const [isNewDepartment, setIsNewDepartment] = useState(false);

    const mainContent = (
        <Form>
            <Form.Item
                name="creatorName"
                label="ФИО создающего"
                rules={[{ required: true, message: 'Введите ФИО' }]}
            >
                <Input placeholder="Фамилия Имя Отчество" />
            </Form.Item>

            <Form.Item
                label="Отдел"
            >
                <Space orientation="vertical">
                    {!isNewDepartment && (
                        <Form.Item
                            name="departmentId"
                            rules={[{ required: true, message: 'Выберите отдел' }]}
                        >
                            <Select
                                placeholder="Выберите отдел из списка"
                                options={[
                                    { value: '1', label: 'Отдел продаж' },
                                    { value: '2', label: 'Отдел маркетинга' }
                                ]}
                            />
                        </Form.Item>
                    )
                    }
                    <Checkbox
                        checked={isNewDepartment}
                        onChange={(e) => {
                            setIsNewDepartment(e.target.checked);
                            if (e.target.checked) {
                                form.setFieldValue('departmentId', undefined);
                            } else {
                                form.setFieldValue('newDepartmentName', undefined);
                            }
                        }
                        }
                    >
                        Создать новый отдел
                    </Checkbox>
                    {isNewDepartment && (
                        <Form.Item
                            name="newDepartmentName"
                            rules={[{ required: true, message: 'Введите название нового отдела' }]}
                        >
                            <Input placeholder="Название нового отдела" />
                        </Form.Item>
                    )}
                </Space>
            </Form.Item>
            <Form.Item name="isApproved" valuePropName="checked">
                <Checkbox>Заявка согласована</Checkbox>
            </Form.Item>
        </Form>
    );

    return (
        <div>
            <h1>Создание новой заявки</h1>
            <Tabs
                defaultActiveKey="1"
                items={[
                    {
                        key: '1',
                        label: 'Основные данные',
                        children: mainContent,
                    }
                ]}
            />
            <div style={{ marginTop: 20 }}>
                <Space>
                    <Button>Отменить</Button>
                    <Button type="primary">Готово</Button>
                </Space>
            </div>
        </div>
    )
}

