'use client'
import { Provider } from 'react-redux';
import { ConfigProvider } from 'antd';
import ruRU from 'antd/locale/ru_RU';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { makeStore } from '@/store/store';
import './globals.css';
import '../styles/variables.css';
import { PageHeader } from '@/components/common/Header/PageHeader';

export default function RootLayout(
  {
    children,
  }:
    {
      children: React.ReactNode;
    }
) {
  const store = makeStore();
  return (
    <html lang="ru">
      <body style={{ margin: 0, backgroundColor: '#f5f5f5' }}>
        <Provider store={store}>
          <AntdRegistry>
            <ConfigProvider locale={ruRU}>
              <PageHeader />
              <main style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
                {children}
              </main>
            </ConfigProvider>
          </AntdRegistry>
        </Provider>
      </body>
    </html>
  )
}
