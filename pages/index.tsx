import {
  Box,
  Container,
  useDisclosure,
  Radio,
  RadioGroup,
  Stack,
  Text,
  Button,
  useColorMode,
  ChakraProvider
} from '@chakra-ui/react';
import {
  DataType,
  defaultTheme,
  QRCodeStatus,
  ThemeContext,
  themeList,
  Themes,
  useTheme,
  WalletStatus
} from '@cosmology-ui/react';
import { MouseEventHandler, useContext, useEffect, useState } from 'react';
import DisplayConnectWalletButton from '../components/connect-button';
import Dropdown from '../components/dropdown';
import Modal from '../components/modal';

const ThemeButton = ({
  name,
  displayColor,
  onClick
}: {
  name: string;
  displayColor: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
}) => {
  return (
    <Button
      variant="outline"
      display="flex"
      justifyContent="center"
      alignItems="center"
      h="fit-content"
      paddingInlineEnd={2}
      paddingInlineStart={2}
      py={2}
      onClick={onClick}
    >
      <Box
        w={4}
        h={4}
        borderRadius="full"
        bg={displayColor}
        border={`1px solid var(--chakra-colors-gray-200)`}
        mr={1.5}
      />
      {name}
    </Button>
  );
};

export default function Home() {
  const {
    isOpen: modalOpen,
    onOpen: onModalOpen,
    onClose: onModalClose
  } = useDisclosure();
  const { setColorMode } = useColorMode();
  const { setTheme } = useTheme();
  const [walletStatus, setWalletStatus] = useState(WalletStatus.Connecting);
  const [qrStatus, setQRStatus] = useState(QRCodeStatus.Pending);
  const [selectedChain, setSelectedChain] = useState<DataType | undefined>(
    undefined
  );
  const handleThemeChange = (name: Themes, colorMode: string) => {
    setColorMode(colorMode);
    setTheme(name);
  };

  useEffect(() => {
    const current = localStorage.getItem('cosmology-ui-theme');
    if (current === Themes.Light) {
      console.log(`log:light`);
      setTheme(Themes.Light);
    }
    if (current === Themes.Dark) {
      console.log(`log:dark`);
      setTheme(Themes.Dark);
    }
    if (!current) {
      setTheme(localStorage.getItem('chakra-ui-color-mode') as Themes);
    }
  }, []);

  return (
    <ChakraProvider theme={defaultTheme}>
      <Container py={16}>
        <Stack isInline={true} justify="end" mb={10}>
          {themeList.map(({ name, colorMode, displayColor }, i) => (
            <ThemeButton
              key={i}
              name={name}
              displayColor={displayColor}
              onClick={() => handleThemeChange(name, colorMode)}
            />
          ))}
        </Stack>
        <Text fontSize="3xl" fontWeight="bold" textAlign="center" mb={8}>
          DEMO
        </Text>
        <Text fontSize="xl" fontWeight="medium" textAlign="center" mb={2}>
          Select a status
        </Text>
        <RadioGroup
          onChange={(v) => setWalletStatus(v as WalletStatus)}
          value={walletStatus}
        >
          <Stack direction="row" mb={10}>
            <Radio value={WalletStatus.Connected}>
              {WalletStatus.Connected}
            </Radio>
            <Radio value={WalletStatus.Connecting}>
              {WalletStatus.Connecting}
            </Radio>
            <Radio value={WalletStatus.Disconnected}>
              {WalletStatus.Disconnected}
            </Radio>
            <Radio value={WalletStatus.Error}>{WalletStatus.Error}</Radio>
            <Radio value={WalletStatus.NotExist}>{WalletStatus.NotExist}</Radio>
            <Radio value={WalletStatus.Rejected}>{WalletStatus.Rejected}</Radio>
          </Stack>
        </RadioGroup>
        <RadioGroup
          onChange={(v) => setQRStatus(v as QRCodeStatus)}
          value={qrStatus}
        >
          <Stack
            justifyContent="center"
            alignItems="center"
            direction="row"
            mb={10}
          >
            <Radio value={QRCodeStatus.Pending}>{QRCodeStatus.Pending}</Radio>
            <Radio value={QRCodeStatus.Done}>{QRCodeStatus.Done}</Radio>
            <Radio value={QRCodeStatus.Error}>{QRCodeStatus.Error}</Radio>
            <Radio value={QRCodeStatus.Expired}>{QRCodeStatus.Expired}</Radio>
          </Stack>
        </RadioGroup>
        <Box w="full" maxW={72} mx="auto" mb={8}>
          <Dropdown
            selectedChain={selectedChain}
            setSelectedChain={setSelectedChain}
          />
        </Box>
        <Box w="full" maxW={48} mx="auto">
          <DisplayConnectWalletButton
            status={walletStatus}
            onClick={onModalOpen}
          />
        </Box>
        <Modal
          qrStatus={qrStatus}
          walletStatus={walletStatus}
          selectedChain={selectedChain}
          isOpen={modalOpen}
          onClose={onModalClose}
        />
      </Container>
    </ChakraProvider>
  );
}
