import styles from './PageHeader.module.scss';

export function PageHeader() {
    return (
        <div className={styles['header']}>
            <div className={styles['header__wrapper']} />
        </div>
    );
}