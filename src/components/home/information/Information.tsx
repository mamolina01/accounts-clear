// import image1 from '@/public/coin.svg'
import image1 from '@/public/images/money.jpg'
import image2 from '@/public/images/friends2.jpg'
import styles from './Information.module.scss'
import { InformationItem } from './InformationItem'

export const Information = () => {
  return (
    <div className={styles.container}>
      <InformationItem image={image1} title="Vacía tu cartera de recibos">
        Todos los gastos se apuntan y todos los miembros del grupo pueden verlos.
      </InformationItem>
      <InformationItem image={image2} title="Una buena contabilidad genera buenos amigos" reverseColumn>
        No más discusiones sobre la cuenta. <span className="text-primary font-semibold">Clear Accounts</span> te dice
        quién es el siguiente en pagar, minimizando las transacciones.
      </InformationItem>
    </div>
  )
}
