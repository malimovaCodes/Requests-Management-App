'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { Form, Input, Button, Select, Checkbox, Tabs, Space, message, Divider, Badge } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, SaveOutlined } from "@ant-design/icons";

import { TRequest, TDepartment } from '@/app/types';
import { addRequest } from '@/store/requestSlice';
import { AppDispatch } from '@/store/store';

const MOCK_DEPARTMENTS: TDepartment[] = [
    { id: '1', name: 'Отдел продаж' },
    { id: '2', name: 'Отдел маркетинга' },
    { id: '3', name: 'Бухгалтерия' },
];

export default function CreateNewRequestPage() {
    const [form] = Form.useForm();
    const [isNewDepartment, setIsNewDepartment] = useState(false);

    const [newItem, setNewItem] = useState({
        name: '',
        link: '',
        unit: '',
        quantity: 0,
        price: 0
    });

    const [editingIndex, setEditingIndex] = useState<number | null>(null);

    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();

    const items = Form.useWatch('items', form) || [];
    const grandTotal = items.reduce((sum: number, item: any) => {
        return sum + (Number(item.quantity) * Number(item.price) || 0);
    }, 0);

    const onFinish = async (values: any) => {
        const itemsFromForm = form.getFieldValue('items') || [];

        console.log("Items из формы:", itemsFromForm);

        if (itemsFromForm.length === 0) {
            message.error('Нельзя создать заявку без позиций.');
            return;
        }

        try {
            await form.validateFields();
        } catch (error) {
            message.error('Пожалуйста, заполните все обязательные поля!');
            return;
        }

        const department: TDepartment = isNewDepartment
            ? { id: crypto.randomUUID(), name: values.newDepartmentName }
            : MOCK_DEPARTMENTS.find(d => d.id === values.departmentId) || { id: '0', name: 'Неизвестно' };

        const initialStatus = values.isApproved ? 'APPROVED' : 'ON_APPROVAL';

        const newRequest: TRequest = {
            id: crypto.randomUUID(),
            number: Date.now(),
            creatorName: values.creatorName,
            department: department,
            isApproved: values.isApproved || false,
            status: initialStatus,
            items: itemsFromForm.map((item: any) => ({
                id: item.id || crypto.randomUUID(),
                name: item.name,
                link: item.link,
                unit: item.unit,
                quantity: Number(item.quantity),
                price: Number(item.price),
                totalPrice: Number(item.quantity) * Number(item.price)
            })),
            totalPrice: grandTotal,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };

        dispatch(addRequest(newRequest));
        message.success('Заявка создана!');
        router.push('/requests');
    };

    const handleAddItem = () => {
        if (!newItem.name || newItem.quantity <= 0) {
            message.error('Заполните наименование и количество (> 0)');
            return;
        }

        const currentItems = form.getFieldValue('items') || [];

        if (editingIndex !== null) {
            const updatedItems = [...currentItems];
            updatedItems[editingIndex] = {
                ...updatedItems[editingIndex],
                name: newItem.name,
                link: newItem.link,
                unit: newItem.unit || 'шт.',
                quantity: newItem.quantity,
                price: newItem.price,
                totalPrice: newItem.quantity * newItem.price
            };

            form.setFieldValue('items', updatedItems);
            message.success('Позиция обновлена');
        } else {
            form.setFieldValue('items', [
                ...currentItems,
                {
                    id: crypto.randomUUID(),
                    name: newItem.name,
                    link: newItem.link,
                    unit: newItem.unit || 'шт.',
                    quantity: newItem.quantity,
                    price: newItem.price,
                    totalPrice: newItem.quantity * newItem.price
                }
            ]);
            message.success('Позиция добавлена');
        }

        setNewItem({
            name: '',
            link: '',
            unit: '',
            quantity: 0,
            price: 0
        });
        setEditingIndex(null);
    };

    const handleCancelEdit = () => {
        setEditingIndex(null);
        setNewItem({
            name: '',
            link: '',
            unit: '',
            quantity: 0,
            price: 0
        });
    };

    const handleEditItem = (index: number) => {
        const itemsList = form.getFieldValue('items') || [];
        const itemToEdit = itemsList[index];

        if (itemToEdit) {
            setNewItem({
                name: itemToEdit.name,
                link: itemToEdit.link || '',
                unit: itemToEdit.unit,
                quantity: itemToEdit.quantity,
                price: itemToEdit.price
            });

            setEditingIndex(index);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const mainContent = (
        <div style={{
            padding: 24,
            backgroundColor: '#fafafa',
            borderRadius: 8,
            border: '1px solid #e8e8e8'
        }}>
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
                <Space orientation="vertical" style={{ width: '100%' }}>
                    {!isNewDepartment && (
                        <Select
                            placeholder="Выберите отдел из списка"
                            size="large"
                            options={MOCK_DEPARTMENTS.map(d => ({ value: d.id, label: d.name }))}
                            style={{
                                width: '100%',
                                backgroundColor: '#fff',
                            }}
                        />
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
                        <Input
                            placeholder="Название нового отдела"
                            size="large"
                            style={{
                                backgroundColor: '#f0f5ff',
                                border: '1px solid #d6e4ff',
                                marginTop: 8
                            }}
                        />
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
        </div>
    );

    const itemsContent = (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div style={{
                padding: 24,
                backgroundColor: editingIndex !== null ? '#fff7e6' : '#f5f5f5',
                borderRadius: 8,
                border: editingIndex !== null ? '2px solid #faad14' : 'none'
            }}>
                <h3 style={{
                    margin: '0 0 16px 0',
                    color: editingIndex !== null ? '#fa8c16' : 'inherit'
                }}>
                    {editingIndex !== null
                        ? 'Редактирование позиции'
                        : 'Добавление новой позиции'}
                </h3>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '16px 24px',
                    marginBottom: 16
                }}>
                    <Form.Item label={<span style={{ fontWeight: 600 }}>* Наименование</span>}>
                        <Input
                            placeholder="Наименование позиции"
                            value={newItem.name}
                            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                        />
                    </Form.Item>

                    <Form.Item label="Ссылка">
                        <Input
                            placeholder="Ссылка на товар"
                            value={newItem.link}
                            onChange={(e) => setNewItem({ ...newItem, link: e.target.value })}
                        />
                    </Form.Item>

                    <Form.Item label={<span style={{ fontWeight: 600 }}>Единицы измерения</span>}>
                        <Select
                            style={{ width: 100 }}
                            options={[{ value: 'шт.', label: 'шт.' }, { value: 'кг.', label: 'кг.' }, { value: 'уп.', label: 'уп.' }]}
                            value={newItem.unit}
                            onChange={(value) => setNewItem({ ...newItem, unit: value })}
                        />
                    </Form.Item>

                    <Form.Item label={<span style={{ fontWeight: 600 }}>Количество</span>}>
                        <Input
                            type="number"
                            placeholder="0"
                            value={newItem.quantity}
                            onChange={(e) => setNewItem({ ...newItem, quantity: Number(e.target.value) })}
                        />
                    </Form.Item>

                    <Form.Item label={<span style={{ fontWeight: 600 }}>Цена (за 1 шт.)</span>}>
                        <Space.Compact>
                            <Input
                                type="number"
                                placeholder="0"
                                value={newItem.price}
                                onChange={(e) => setNewItem({ ...newItem, price: Number(e.target.value) })}
                            />
                            <span className="ant-input-group-addon">руб.</span>
                        </Space.Compact>

                    </Form.Item>

                    <Form.Item label="Общая стоимость">
                        <Input
                            disabled
                            value={`${(newItem.quantity * newItem.price).toFixed(2)} руб.`}
                            style={{ backgroundColor: '#fff' }}
                        />
                    </Form.Item>
                </div>

                <Space>
                    <Button
                        type="primary"
                        onClick={handleAddItem}
                        icon={editingIndex !== null ? <SaveOutlined /> : <PlusOutlined />}
                        disabled={!newItem.name || newItem.quantity <= 0}
                    >
                        {editingIndex !== null ? 'Сохранить изменения' : 'Добавить позицию'}
                    </Button>

                    {editingIndex !== null && (
                        <Button onClick={handleCancelEdit}>
                            Отмена
                        </Button>
                    )}
                </Space>
            </div>

            <Form.List name="items">
                {(fields, { remove }) => (
                    <>
                        {fields.length > 0 && fields.map(({ key, name, ...restField }, index) => {
                            const item = form.getFieldValue(['items', name]);
                            const quantity = item?.quantity || 0;
                            const price = item?.price || 0;
                            const total = quantity * price;

                            return (
                                <div
                                    key={key}
                                    style={{
                                        padding: 16,
                                        backgroundColor: editingIndex === index ? '#fff7e6' : '#fff',
                                        border: editingIndex === index
                                            ? '2px solid #faad14'
                                            : '1px solid #e8e8e8',
                                        borderRadius: 8,
                                        marginBottom: 12
                                    }}
                                >
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        marginBottom: 8
                                    }}>
                                        <div style={{ fontWeight: 600, fontSize: 14 }}>
                                            <span style={{ color: '#1890ff', marginRight: 8 }}>
                                                {index + 1}
                                            </span>
                                            {item?.name || `Позиция ${index + 1}`}
                                        </div>
                                        <Space>
                                            <Button
                                                type="link"
                                                icon={<EditOutlined />}
                                                size="small"
                                                onClick={() => handleEditItem(index)}
                                                disabled={editingIndex !== null}
                                            >
                                                Редактировать
                                            </Button>
                                            <Button
                                                type="link"
                                                icon={<DeleteOutlined />}
                                                size="small"
                                                danger
                                                onClick={() => remove(name)}
                                                disabled={editingIndex === index}
                                            >
                                                Удалить
                                            </Button>
                                        </Space>
                                    </div>

                                    <div style={{
                                        display: 'flex',
                                        gap: 24,
                                        fontSize: 12,
                                        color: '#666',
                                        marginTop: 8
                                    }}>
                                        <div>
                                            <div style={{ fontSize: 10, color: '#999', marginBottom: 4 }}>
                                                ЕД. ИЗМ.
                                            </div>
                                            <div>{item?.unit || '-'}</div>
                                        </div>
                                        <div>
                                            <div style={{ fontSize: 10, color: '#999', marginBottom: 4 }}>
                                                КОЛ-ВО
                                            </div>
                                            <div>{quantity}</div>
                                        </div>
                                        <div>
                                            <div style={{ fontSize: 10, color: '#999', marginBottom: 4 }}>
                                                ЦЕНА
                                            </div>
                                            <div>{price} ₽</div>
                                        </div>
                                        <div>
                                            <div style={{ fontSize: 10, color: '#999', marginBottom: 4 }}>
                                                СТОИМОСТЬ
                                            </div>
                                            <div style={{ color: '#1890ff', fontWeight: 600 }}>
                                                {total.toFixed(2)} ₽
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </>
                )}
            </Form.List>

            {items.length > 0 && (
                <div style={{
                    padding: 16,
                    backgroundColor: '#e6f7ff',
                    borderRadius: 8,
                    textAlign: 'right',
                    fontSize: 16
                }}>
                    <span style={{ color: '#666', marginRight: 16 }}>Итоговая сумма:</span>
                    <span style={{ color: '#1890ff', fontWeight: 700, fontSize: 20 }}>
                        {grandTotal.toFixed(2)} руб.
                    </span>
                </div>
            )}
        </div>
    );

    return (
        <div style={{ padding: '20px' }}>
            <h1>Создание новой заявки</h1>

            <Form form={form} onFinish={onFinish} layout="vertical">
                <Tabs
                    defaultActiveKey="1"
                    items={[
                        {
                            key: '1',
                            label: 'Основные данные',
                            children: mainContent
                        },
                        {
                            key: '2',
                            label: (
                                <span>
                                    Состав заказа
                                    {items.length > 0 && (
                                        <Badge
                                            count={items.length}
                                            style={{
                                                backgroundColor: '#1890ff',
                                                marginLeft: 8,
                                                fontSize: 12
                                            }}
                                        />
                                    )}
                                </span>
                            ),
                            children: itemsContent
                        },
                    ]}
                />

                <Divider />
                <Space>
                    <Button onClick={() => router.back()}>Отменить</Button>
                    <Button type="primary" htmlType="submit">Готово</Button>
                </Space>
            </Form>
        </div>
    );
}