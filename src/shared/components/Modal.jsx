import { useEffect, useRef } from "react"
import styles from "./Modal.module.css"

export default function Modal({ isOpen, onClose, title, children }) {
  const dialogRef = useRef(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (isOpen) {
      dialog.showModal()
    } else {
      dialog.close()
    }
  }, [isOpen])

  const handleCancel = (event) => {
    event.preventDefault()
    onClose()
  }

  return (
    <dialog ref={dialogRef} onCancel={handleCancel} className={styles.box}>
      <div className={styles.content}>
        <div className={styles.header}>
          <h1 className={styles.title}>{title}</h1>
          <button className={styles.close} onClick={onClose}>Close</button>
        </div>
        {children}
      </div>
    </dialog>
  )
}

// export default function App() {
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   return (
//     <div className="app-container">
//       <button onClick={() => setIsModalOpen(true)}>Open Modal</button>

//       <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
//         <h2>Modal Header</h2>
//         <p>This is a highly accessible, native HTML dialog modal built in React!</p>
//         <button onClick={() => setIsModalOpen(false)}>Confirm</button>
//       </Modal>
//     </div>
//   );
// }