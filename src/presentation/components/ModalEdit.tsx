import React from 'react'
import { Modal, ModalProps, StyleSheet } from 'react-native'

type PROPS = ModalProps & {
  isOpen: boolean
  withInput?: boolean
}

export const ModalEdit = ({ isOpen, withInput, children, ...rest }: PROPS) => {
  return (
    <Modal style={styles.container} visible={isOpen} transparent animationType="fade" statusBarTranslucent>
      {children}
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#a33131',
    //width: 500,
    height: 500
  }
})
