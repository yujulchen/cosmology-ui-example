import { useDisclosure } from '@chakra-ui/react';
import {
  ButtonShape,
  DataType,
  QRCode,
  QRCodeStatus,
  SimpleConnectModal,
  SimpleModalView,
  Wallet,
  WalletMode,
  WalletStatus
} from '@cosmology-ui/react';
import Bowser from 'bowser';
import { ReactNode, useEffect, useRef, useState } from 'react';
import { WalletContent } from './modals/modal-content';
import ModalHead from './modals/modal-head';
import WalletList from './modals/modal-list';
import { WalletData } from './utils/config';
import { UserDeviceInfoType } from './utils/types';

const Modal = ({
  qrStatus,
  walletStatus,
  selectedChain,
  isOpen,
  onClose
}: {
  qrStatus: QRCodeStatus;
  walletStatus: WalletStatus;
  selectedChain?: DataType;
  isOpen: boolean;
  onClose: () => void;
}) => {
  const initialRef = useRef<HTMLButtonElement>(null);
  const [modalContent, setModalContent] = useState<ReactNode>();
  const [walletList, setWalletList] = useState<Wallet[]>([]);
  const [selectedItem, setSelectedItem] = useState<Wallet>();
  const [browserInfo, setBrowserInfo] = useState<UserDeviceInfoType>();

  function handleClear() {
    setModalContent(undefined);
    setSelectedItem(undefined);
  }

  function handleClose() {
    onClose();
    setSelectedItem(undefined);
  }

  useEffect(() => {
    const browser = Bowser.getParser(window.navigator.userAgent);
    setBrowserInfo({
      browser: browser.getBrowserName(true),
      device: browser.getPlatformType(true),
      os: browser.getOSName(true)
    });
    setWalletList(
      WalletData.map((item, i) => ({
        ...item,
        buttonShape: i < 2 ? ButtonShape.Square : ButtonShape.Rectangle,
        onClick: () => {
          setTimeout(() => {
            setSelectedItem(item);
          }, 100);
          setSelectedItem((pre) => pre);
        }
      }))
    );
  }, []);

  useEffect(() => {
    if (selectedItem) {
      setModalContent(
        <SimpleModalView
          modalHead={<ModalHead onBack={handleClear} onClose={handleClose} />}
          modalContent={WalletContent(
            walletStatus,
            selectedItem,
            selectedChain,
            browserInfo,
            qrStatus
          )}
        />
      );
    }
    if (!selectedItem) {
      setModalContent(
        <SimpleModalView
          modalHead={<ModalHead onClose={handleClose} />}
          modalContent={
            <WalletList initialFocus={initialRef} walletsData={walletList} />
          }
        />
      );
    }
  }, [selectedItem, walletList, walletStatus, browserInfo]);

  return (
    <SimpleConnectModal
      initialRef={initialRef}
      modalView={modalContent}
      modalOpen={isOpen}
      modalOnClose={onClose}
    />
  );
};

export default Modal;
