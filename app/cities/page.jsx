
import CityContent from '@/components/CityContent';
import DealContent from '@/components/DealContent';
import MobileNavbar from '@/components/MobileNavbar';
import Navbar from '@/components/Navbar';
//Styles
import styles from '@/styles/pages/CityPage.module.scss'

export default function Cities() {

    return (
        <main className={styles.cityContainer}>
            <Navbar />
            <CityContent />
            <div className={styles.cityContent}>
            </div>
            <MobileNavbar />
        </main>

    )
}

