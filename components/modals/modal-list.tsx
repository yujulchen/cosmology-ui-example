import { SimpleDisplayWalletList, Wallet } from '@cosmology-ui/utils';
import { RefObject } from 'react';

const WalletList = ({
  initialFocus,
  walletsData
}: {
  initialFocus: RefObject<HTMLButtonElement>;
  walletsData: Wallet[];
}) => {
  return (
    <SimpleDisplayWalletList
      initialFocus={initialFocus}
      walletsData={walletsData}
    />
  );
};

export default WalletList;
