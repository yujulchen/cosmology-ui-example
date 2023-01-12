import { Text, useColorMode } from '@chakra-ui/react';
import {
  Astronaut,
  ConnectWalletButton,
  CopyAddressButton,
  Downloads,
  InstallWalletButton,
  LogoStatus,
  Wallet,
  WalletStatus,
  SimpleDisplayModalContent,
  handleChangeColorModeValue,
  DataType
} from '@cosmology-ui/react';
import NextLink from 'next/link';
import { UserDeviceInfoType } from '../utils/types';

function handleDownloadData(
  downloads: Downloads,
  browserInfo: UserDeviceInfoType
) {
  switch (browserInfo.device) {
    case 'desktop': {
      const data = downloads.desktop.find(
        (item) => item.browser === browserInfo.browser
      );
      return data;
    }
    case 'tablet': {
      const data = downloads[browserInfo.device].find(
        (item) => item.os === browserInfo.os
      );
      return data;
    }
    case 'mobile': {
      const data = downloads[browserInfo.device].find(
        (item) => item.os === browserInfo.os
      );
      return data;
    }
    default:
      return undefined;
  }
}

function handleContentStatus(
  status: WalletStatus,
  selectedItem: Wallet,
  browserInfo: UserDeviceInfoType
) {
  const installInfo = selectedItem.downloads
    ? handleDownloadData(selectedItem.downloads, browserInfo)
    : undefined;

  switch (status) {
    case WalletStatus.Disconnected:
      return {
        logo: selectedItem.logo,
        logoStatus: LogoStatus.Warning,
        contentHeader: 'Wallet is Disconnected',
        contentDesc: undefined,
        buttonText: 'Connect Wallet'
      };
    case WalletStatus.NotExist:
      return {
        logo: selectedItem.logo,
        logoStatus: LogoStatus.Error,
        contentHeader: 'Wallet Not Installed',
        contentDesc: 'Please install wallet',
        installLink: installInfo?.link,
        installIcon: installInfo?.icon,
        buttonText: `Install ${selectedItem.prettyName}`
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
        contentDesc: undefined,
        buttonText: 'Disconnect'
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
        contentDesc:
          'Seems something went wrong :(\n\nLorem ipsum, dolor sit amet consectetur adipisicing elit. Eaque repellat exercitationem, obcaecati, ipsa deleniti iure consequuntur excepturi optio quas nihil perferendis suscipit pariatur nulla amet beatae itaque unde fuga! Laboriosam, veniam? Beatae, rem rerum perspiciatis placeat obcaecati earum itaque laboriosam fugiat et ipsa praesentium non repellendus officia dolore quos ullam sint voluptates eligendi debitis magnam? Voluptas quis error, facere aspernatur velit suscipit cumque voluptate excepturi accusantium cum architecto rem, totam harum minus odio voluptatum illo veritatis voluptates nulla repellat culpa! At repellendus nemo harum, vitae enim autem natus quaerat possimus, eum, mollitia neque dolore accusantium! Officiis repellat itaque quae qui.',
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

const WalletContent = ({
  status,
  selectedItem,
  selectedChain,
  browserInfo
}: {
  status: WalletStatus;
  selectedItem: Wallet;
  selectedChain?: DataType;
  browserInfo: UserDeviceInfoType;
}) => {
  const { colorMode } = useColorMode();
  const statusContent = handleContentStatus(status, selectedItem, browserInfo);
  return (
    <SimpleDisplayModalContent
      logo={statusContent.logo}
      status={statusContent.logoStatus}
      contentHeader={statusContent.contentHeader}
      contentDesc={statusContent.contentDesc}
      username={status === WalletStatus.Connected ? 'Rex Barkshire' : undefined}
      walletIcon={
        status === WalletStatus.Connected
          ? (selectedItem.logo as string)
          : undefined
      }
      addressButton={
        status === WalletStatus.Connected ? (
          <CopyAddressButton
            address={
              selectedChain
                ? `${selectedChain?.name}yIzwCKqnmaYVR14skgZ83lL`
                : undefined
            }
          />
        ) : undefined
      }
      bottomButton={
        status === WalletStatus.Connecting ? undefined : status ===
          WalletStatus.NotExist ? (
          <InstallWalletButton
            disabled={false}
            icon={statusContent.installIcon}
            buttonText={statusContent.buttonText}
            onClick={() => {
              window.open(statusContent.installLink);
            }}
          />
        ) : (
          <ConnectWalletButton buttonText={statusContent.buttonText} />
        )
      }
      bottomLink={
        status === WalletStatus.Disconnected ? (
          <NextLink href="/" target="_blank">
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
          </NextLink>
        ) : undefined
      }
    />
  );
};

export default WalletContent;
