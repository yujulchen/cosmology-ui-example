import { Box, useColorMode, Text } from '@chakra-ui/react';
import Bowser from 'bowser';
import {
  Astronaut,
  ConnectWalletButton,
  CopyAddressButton,
  DownloadInfo,
  handleChangeColorModeValue,
  InstallWalletButton,
  LogoStatus,
  QRCode,
  SimpleConnectModal,
  SimpleDisplayModalContent,
  SimpleDisplayWalletList,
  SimpleModalHead,
  Wallet,
  WalletMode,
  WalletStatus
} from '@cosmology-ui/react';
import { ReactNode, useEffect, useRef, useState } from 'react';
import { WalletData } from '../components/utils/config';
import { UserDeviceInfoType } from '../components/utils/types';

export default function Modal({
  isOpen,
  onClose,
  walletStatus,
  selectedChain
}: {
  isOpen: boolean;
  selectedChain: string;
  onClose: () => void;
  walletStatus: WalletStatus;
}) {
  const { colorMode } = useColorMode();

  const initialFocus = useRef<HTMLButtonElement>(null);
  const [selectedItem, setSelectedItem] = useState<Wallet>();
  const [walletList, setWalletList] = useState<Wallet[]>([]);
  const [modalContent, setModalContent] = useState<ReactNode>();
  const [modalHead, setModalHead] = useState<ReactNode>();
  const [browserInfo, setBrowserInfo] = useState<UserDeviceInfoType>();
  const [downloadData, setDownloadData] = useState<DownloadInfo>();

  function handleClear() {
    setSelectedItem(undefined);
  }

  function handleClose() {
    handleClear();
    onClose();
  }

  function handleContentStatus(status: WalletStatus, selectedItem: Wallet) {
    switch (status) {
      case WalletStatus.Disconnected:
        return {
          logo: selectedItem.logo,
          logoStatus: LogoStatus.Warning,
          contentHeader: 'Wallet is Disconnected',
          contentDesc: undefined
        };
      case WalletStatus.NotExist:
        return {
          logo: selectedItem.logo,
          logoStatus: LogoStatus.Error,
          contentHeader: 'Wallet Not Installed',
          contentDesc: 'Please install wallet'
        };
      case WalletStatus.Connecting:
        return {
          logo: selectedItem.logo,
          logoStatus: LogoStatus.Loading,
          contentHeader: 'Connecting Wallet',
          contentDesc: 'Open browser extension/app to connect your wallet.'
        };
      case WalletStatus.Connected:
        return {
          logo: Astronaut,
          logoStatus: undefined,
          contentHeader: undefined,
          contentDesc: undefined
        };
      case WalletStatus.Rejected:
        return {
          logo: selectedItem.logo,
          logoStatus: LogoStatus.Error,
          contentHeader: 'Request Rejected',
          contentDesc: 'Connection permission is denied.',
          buttonText: 'Reconnect'
        };
      case WalletStatus.Error:
        return {
          logo: selectedItem.logo,
          logoStatus: LogoStatus.Error,
          contentHeader: 'Oops! Something wrong...',
          contentDesc: 'Seems something went wrong :(',
          buttonText: 'Change Wallet'
        };

      default:
        return {
          logo: undefined,
          logoStatus: undefined,
          contentHeader: undefined,
          contentDesc: undefined,
          buttonText: 'Connect Wallet'
        };
    }
  }

  function handleDisplayBottomButton(
    status: WalletStatus,
    selectedItem: Wallet,
    downloadData: DownloadInfo
  ) {
    switch (status) {
      case WalletStatus.Disconnected:
        return (
          <Box px={5}>
            <ConnectWalletButton buttonText="Connect Wallet" />
          </Box>
        );
      case WalletStatus.Connecting:
        return undefined;
      case WalletStatus.Connected:
        return (
          <Box px={5}>
            <ConnectWalletButton buttonText="Disconnected" />
          </Box>
        );
      case WalletStatus.NotExist: {
        return (
          <InstallWalletButton
            buttonText={`Install ${selectedItem.name}`}
            icon={downloadData.icon}
            onClick={() => window.open(downloadData.link)}
            disabled={false}
          />
        );
      }
      case WalletStatus.Rejected:
        return (
          <Box px={5}>
            <ConnectWalletButton buttonText="Reconnect" />
          </Box>
        );
      case WalletStatus.Error:
      default:
        return (
          <Box px={5}>
            <ConnectWalletButton buttonText="Connect Wallet" />
          </Box>
        );
    }
  }

  useEffect(() => {
    const browser = Bowser.getParser(window.navigator.userAgent);
    setBrowserInfo({
      browser: browser.getBrowserName(true),
      device: browser.getPlatformType(true),
      os: browser.getOSName(true)
    });
    setWalletList(
      WalletData.map((item) => ({
        ...item,
        onClick: () => setSelectedItem(item)
      }))
    );
  }, []);

  useEffect(() => {
    setModalContent(
      <SimpleDisplayWalletList
        initialFocus={initialFocus}
        walletsData={walletList}
      />
    );
  }, [walletList]);

  useEffect(() => {
    if (selectedItem?.downloads && browserInfo) {
      switch (browserInfo.device) {
        case 'desktop': {
          const data = selectedItem.downloads[browserInfo.device].find(
            (item) => item.browser === browserInfo.browser
          );
          setDownloadData(data);
          break;
        }
        case 'tablet': {
          const data = selectedItem.downloads[browserInfo.device].find(
            (item) => item.os === browserInfo.os
          );
          setDownloadData(data);
          break;
        }
        case 'mobile': {
          const data = selectedItem.downloads[browserInfo.device].find(
            (item) => item.os === browserInfo.os
          );
          setDownloadData(data);
          break;
        }
        default:
          setDownloadData(undefined);
          break;
      }
    }
  }, [selectedItem, browserInfo]);

  useEffect(() => {
    if (selectedItem) {
      setModalHead(
        <SimpleModalHead
          title={
            selectedItem.prettyName
              ? selectedItem.prettyName
              : selectedItem.name
          }
          backButton={true}
          onBack={handleClear}
          onClose={handleClose}
        />
      );
      if (selectedItem.mode === WalletMode.Extension) {
        const statusContent = handleContentStatus(walletStatus, selectedItem);
        setModalContent(
          <SimpleDisplayModalContent
            logo={statusContent.logo}
            status={statusContent.logoStatus}
            contentHeader={statusContent.contentHeader}
            contentDesc={statusContent.contentDesc}
            username={
              walletStatus === WalletStatus.Connected
                ? 'Rex Barkshire'
                : undefined
            }
            walletIcon={
              walletStatus === WalletStatus.Connected
                ? (selectedItem.logo as string)
                : undefined
            }
            addressButton={
              walletStatus === WalletStatus.Connected ? (
                <CopyAddressButton address={`${selectedChain}BlocLCpH`} />
              ) : undefined
            }
            bottomButton={
              downloadData
                ? handleDisplayBottomButton(
                    walletStatus,
                    selectedItem,
                    downloadData
                  )
                : undefined
            }
            bottomLink={
              walletStatus === WalletStatus.Disconnected ? (
                <Text
                  fontSize="sm"
                  opacity={0.7}
                  transition="all 0.2s ease-in"
                  textDecoration="none"
                  _hover={{
                    color: handleChangeColorModeValue(
                      colorMode,
                      'primary.500',
                      'primary.200'
                    ),
                    opacity: 0.8,
                    textDecoration: handleChangeColorModeValue(
                      colorMode,
                      'underline #4657d1',
                      'underline #6674d9'
                    )
                  }}
                >
                  Don&apos;t have a wallet?
                </Text>
              ) : undefined
            }
          />
        );
      }
      if (selectedItem.mode === WalletMode.WalletConnect) {
        if (downloadData)
          setModalContent(
            <QRCode
              link={downloadData.link}
              description={`Use ${selectedItem.prettyName} App to scan`}
            />
          );
        if (!downloadData) setModalContent(<></>);
      }
    }
    if (!selectedItem) {
      setModalHead(
        <SimpleModalHead
          title="Select a wallet"
          backButton={false}
          onClose={handleClose}
        />
      );
      setModalContent(
        <SimpleDisplayWalletList
          initialFocus={initialFocus}
          walletsData={walletList}
        />
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    colorMode,
    selectedItem,
    walletList,
    walletStatus,
    downloadData,
    selectedChain
  ]);

  return (
    <SimpleConnectModal
      initialRef={initialFocus}
      modalHead={modalHead}
      modalContent={modalContent}
      modalOpen={isOpen}
      modalOnClose={onClose}
    />
  );
}
