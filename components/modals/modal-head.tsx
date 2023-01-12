import { Wallet } from '@cosmology-ui/react';
import { SimpleModalHead } from '@cosmology-ui/utils';

const ModalHead = ({
  selectedItem,
  onBack,
  onClose
}: {
  selectedItem?: Wallet;
  onBack?: () => void;
  onClose: () => void;
}) => {
  return (
    <SimpleModalHead
      title={
        selectedItem
          ? selectedItem.prettyName || selectedItem.name
          : 'Select a wallet'
      }
      backButton={onBack ? true : false}
      onBack={onBack}
      onClose={onClose}
    />
  );
};

export default ModalHead;
