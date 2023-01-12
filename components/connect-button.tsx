import { Icon } from '@chakra-ui/react';
import { ConnectWalletButton, WalletStatus } from '@cosmology-ui/react';
import { RiRepeatLine, RiShuffleFill, RiLoader2Fill } from 'react-icons/ri';
import { MdImportantDevices } from 'react-icons/md';

function handleStatus(status: WalletStatus) {
  switch (status) {
    case WalletStatus.Disconnected:
      return {
        buttonText: 'Connect Wallet',
        isLoading: false,
        isDisabled: false,
        leftIcon: undefined,
        rightIcon: undefined
      };
    case WalletStatus.NotExist:
      return {
        buttonText: 'Installed Wallet',
        isLoading: false,
        isDisabled: false,
        leftIcon: <Icon as={MdImportantDevices} />,
        rightIcon: undefined
      };
    case WalletStatus.Connecting:
      return {
        buttonText: 'Connecting...',
        isLoading: false,
        isDisabled: false,
        leftIcon: <Icon as={RiLoader2Fill} />,
        rightIcon: undefined
      };
    case WalletStatus.Connected:
      return {
        buttonText: 'My Wallet',
        isLoading: false,
        isDisabled: false,
        leftIcon: false,
        rightIcon: undefined
      };
    case WalletStatus.Rejected:
      return {
        buttonText: 'Reconnect',
        isLoading: false,
        isDisabled: false,
        leftIcon: <Icon as={RiRepeatLine} />,
        rightIcon: undefined
      };
    case WalletStatus.Error:
      return {
        buttonText: 'Change Wallet',
        isLoading: false,
        isDisabled: false,
        leftIcon: <Icon as={RiShuffleFill} />,
        rightIcon: undefined
      };

    default:
      return {
        buttonText: 'Connect Wallet',
        isLoading: false,
        isDisabled: false,
        leftIcon: undefined,
        rightIcon: undefined
      };
  }
}

const DisplayConnectWalletButton = ({
  status,
  onClick
}: {
  status: WalletStatus;
  onClick: () => void;
}) => {
  return (
    <ConnectWalletButton
      buttonText={handleStatus(status).buttonText}
      leftIcon={handleStatus(status).leftIcon}
      loading={handleStatus(status).isLoading}
      disabled={handleStatus(status).isDisabled}
      onClick={onClick}
    />
  );
};

export default DisplayConnectWalletButton;
