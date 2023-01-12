import { useDisclosure } from '@chakra-ui/react';
import {
  ButtonShape,
  DataType,
  QRCode,
  SimpleConnectModal,
  Wallet,
  WalletMode,
  WalletStatus
} from '@cosmology-ui/react';
import Bowser from 'bowser';
import { ReactNode, useEffect, useRef, useState } from 'react';
import ModalContent from './modals/modal-content';
import ModalHead from './modals/modal-head';
import WalletList from './modals/modal-list';
import { WalletData } from './utils/config';
import { UserDeviceInfoType } from './utils/types';

const Modal = ({
  walletStatus,
  selectedChain,
  isOpen,
  onClose
}: {
  walletStatus: WalletStatus;
  selectedChain?: DataType;
  isOpen: boolean;
  onClose: () => void;
}) => {
  const initialRef = useRef<HTMLButtonElement>(null);
  const [modalHead, setModalHead] = useState<ReactNode>();
  const [modalContent, setModalContent] = useState<ReactNode>();
  const [walletList, setWalletList] = useState<Wallet[]>([]);
  const [selectedItem, setSelectedItem] = useState<Wallet>();
  const [browserInfo, setBrowserInfo] = useState<UserDeviceInfoType>();

  function handleClear() {
    setModalHead(undefined);
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
      setModalHead(<ModalHead onBack={handleClear} onClose={handleClose} />);
      if (selectedItem.mode === WalletMode.Extension && browserInfo) {
        setModalContent(
          <ModalContent
            status={walletStatus}
            selectedItem={selectedItem}
            selectedChain={selectedChain}
            browserInfo={browserInfo}
          />
        );
      }
      if (selectedItem.mode === WalletMode.WalletConnect) {
        setModalContent(
          <QRCode
            link={selectedItem.downloads ? selectedItem.downloads.default : ''}
            description={`Use ${selectedItem.prettyName} App to scan`}
          />
        );
      }
    }
    if (!selectedItem) {
      setModalHead(<ModalHead onClose={handleClose} />);
      setModalContent(
        <WalletList initialFocus={initialRef} walletsData={walletList} />
      );
    }
  }, [selectedItem, walletList, walletStatus, browserInfo]);

  return (
    <SimpleConnectModal
      initialRef={initialRef}
      modalHead={modalHead}
      modalContent={modalContent}
      modalOpen={isOpen}
      modalOnClose={onClose}
    />
  );
};

export default Modal;
