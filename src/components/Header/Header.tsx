import { Suspense } from "react";
import Logo from "../../elements/Logo/Logo";
import styles from './Header.module.css';
import HeaderActions from "./HeaderActions";

interface HeaderProps {
    router: string,
}

export default function Header({ router }: HeaderProps) {

    return (
        <div className={styles.header}>
            <Logo />
            <div className={styles.space}>
                <div>
                    <Suspense fallback={<div></div>}>
                        <HeaderActions Router={router} />
                    </Suspense>
                </div>
            </div>
        </div>
    );
}