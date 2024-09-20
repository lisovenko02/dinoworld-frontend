import React from 'react'
import Modal, { ModalProps } from '../Modal'
import SelectedDinoInfo, { SelectedDinoInfoProps } from '../SelectedDinoInfo'

const SelectedDinoInfoModal = ({
  onClose,
  show,
  selectedDino,
  rarityTextStyle,
  dietImg,
}: ModalProps & SelectedDinoInfoProps) => {
  return (
    <Modal onClose={onClose} show={show}>
      <div className="flex flex-col gap-3 items-center">
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
