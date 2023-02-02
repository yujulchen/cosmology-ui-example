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
  DataType,
  WalletMode,
  QRCode
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

export const WalletContent = (
  status: WalletStatus,
  selectedItem: Wallet,
  selectedChain: DataType | undefined,
  browserInfo: UserDeviceInfoType | undefined
) => {
  const installInfo =
    selectedItem.downloads && browserInfo
      ? handleDownloadData(selectedItem.downloads, browserInfo)
      : undefined;

  if (selectedItem.mode === WalletMode.WalletConnect) {
    return (
      <QRCode
        link={selectedItem.downloads ? selectedItem.downloads.default : ''}
        description={`Use ${selectedItem.prettyName} App to scan`}
      />
    );
  }
  if (selectedItem.mode === WalletMode.Extension && browserInfo) {
    switch (status) {
      case WalletStatus.Disconnected:
        return (
          <SimpleDisplayModalContent
            logo={selectedItem.logo}
            status={LogoStatus.Warning}
            contentHeader="Wallet is Disconnected"
            bottomButton={<ConnectWalletButton buttonText="Connect Wallet" />}
            bottomLink={
              <NextLink href="/" target="_blank">
                <Text
                  fontSize="sm"
                  opacity={0.7}
                  transition="all 0.2s ease-in"
                  textDecoration="none"
                  _hover={{
                    opacity: 0.8
                  }}
                >
                  Don&apos;t have a wallet?
                </Text>
              </NextLink>
            }
          />
        );
      case WalletStatus.NotExist:
        return (
          <SimpleDisplayModalContent
            logo={selectedItem.logo}
            status={LogoStatus.Error}
            contentHeader="Wallet Not Installed"
            contentDesc="Please install wallet"
            bottomButton={
              <InstallWalletButton
                buttonText={`Install ${selectedItem.prettyName}`}
                icon={installInfo?.icon}
                disabled={false}
              />
            }
          />
        );
      case WalletStatus.Connecting:
        return (
          <SimpleDisplayModalContent
            logo={selectedItem.logo}
            status={LogoStatus.Loading}
            contentHeader="Connecting Wallet"
            contentDesc="Open browser extension/app to connect your wallet."
          />
        );
      case WalletStatus.Connected:
        return (
          <SimpleDisplayModalContent
            logo={Astronaut}
            status={undefined}
            username="Rex Barkshire"
            walletIcon={selectedItem.logo as string}
            addressButton={
              <CopyAddressButton
                address={
                  selectedChain
                    ? `${selectedChain.label}MediBlocLCpH`
                    : undefined
                }
              />
            }
            bottomButton={<ConnectWalletButton buttonText="Disconnect" />}
          />
        );
      case WalletStatus.Rejected:
        return (
          <SimpleDisplayModalContent
            logo={selectedItem.logo}
            status={LogoStatus.Error}
            contentHeader="Request Rejected"
            contentDesc="Connection permission is denied."
            bottomButton={<ConnectWalletButton buttonText="Reconnect" />}
          />
        );
      case WalletStatus.Error:
        return (
          <SimpleDisplayModalContent
            logo={selectedItem.logo}
            status={LogoStatus.Error}
            contentHeader="Oops! Something wrong..."
            contentDesc="Seems something went wrong :(\n\nLorem ipsum, dolor sit amet consectetur adipisicing elit. Eaque repellat exercitationem, obcaecati, ipsa deleniti iure consequuntur excepturi optio quas nihil perferendis suscipit pariatur nulla amet beatae itaque unde fuga! Laboriosam, veniam? Beatae, rem rerum perspiciatis placeat obcaecati earum itaque laboriosam fugiat et ipsa praesentium non repellendus officia dolore quos ullam sint voluptates eligendi debitis magnam? Voluptas quis error, facere aspernatur velit suscipit cumque voluptate excepturi accusantium cum architecto rem, totam harum minus odio voluptatum illo veritatis voluptates nulla repellat culpa! At repellendus nemo harum, vitae enim autem natus quaerat possimus, eum, mollitia neque dolore accusantium! Officiis repellat itaque quae qui."
            bottomButton={<ConnectWalletButton buttonText="Change Wallet" />}
          />
        );

      default:
        return (
          <SimpleDisplayModalContent
            bottomButton={<ConnectWalletButton buttonText="Change Wallet" />}
          />
        );
    }
  }
};
