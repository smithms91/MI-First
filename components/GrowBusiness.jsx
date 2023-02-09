import styles from '../styles/GrowBusiness.module.css'


export default function GrowBusiness({ status }) {
    return (
        <div className={styles.grow_container}>
            <h1>Let MI-First.com</h1>
            <h1>Help Your Business Grow</h1>
            {status.getStarted &&
                <>
                    <h3>Get Your Business Listed</h3>
                    <p>Reach more customers in more ways. Let us create a custom-tailored program to help your business grow.</p>
                    <button>Let&apos;s Get Started</button>
                </>
            }
            {status.update &&
                <>
                    <h3>Update Your Current Website</h3>
                    <p>Need help with your current site? Let us help get your website working properly for your business.</p>
                    <button>We Can Help</button>
                </>
            }
        </div>

    )
}

