import {
  Box,
  Container,
  useDisclosure,
  Radio,
  RadioGroup,
  Stack,
  Text
} from '@chakra-ui/react';
import {
  ConnectWalletButton,
  DataType,
  WalletStatus
} from '@cosmology-ui/react';
import { useState } from 'react';
import Dropdown from '../components/dropdown';
import Modal from '../components/modal';

export default function Home() {
  const [selectedItem, setSelectedItem] = useState<DataType>();
  const [walletStatus, setWalletStatus] = useState(WalletStatus.Connecting);
  const { isOpen, onOpen, onClose } = useDisclosure();

  function handleDropdown(value: DataType) {
    setSelectedItem(value);
  }

  return (
    <Container py={16}>
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
          <Radio value={WalletStatus.Connected}>{WalletStatus.Connected}</Radio>
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
      <Box w="full" maxW={72} mx="auto" mb={8}>
        <Dropdown
          selectedItem={selectedItem}
          setSelectedItem={handleDropdown}
        />
      </Box>
      <Box w="full" maxW={48} mx="auto">
        <ConnectWalletButton onClick={onOpen} />
      </Box>
      <Modal
        isOpen={isOpen}
        walletStatus={walletStatus}
        onClose={onClose}
        selectedChain={selectedItem?.label || ''}
      />
    </Container>
  );
}
