import React from 'react'
import Modal, { ModalProps } from '../Modal'
import SelectedDinoInfo, { SelectedDinoInfoProps } from '../SelectedDinoInfo'
import { FaWindowClose } from 'react-icons/fa'

const SelectedDinoInfoModal = ({
  onClose,
  show,
  selectedDino,
  rarityTextStyle,
  dietImg,
}: ModalProps & SelectedDinoInfoProps) => {
  return (
    <Modal onClose={onClose} show={show}>
      <div className="relative flex flex-col gap-3 items-center">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
        >
          <FaWindowClose size="24px" />
        </button>

        {/* Dino Info */}
        <SelectedDinoInfo
          selectedDino={selectedDino}
          rarityTextStyle={rarityTextStyle}
          dietImg={dietImg}
        />
      </div>
    </Modal>
  )
}

export default SelectedDinoInfoModal
