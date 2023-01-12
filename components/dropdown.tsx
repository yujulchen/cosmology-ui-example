import {
  ChangeChainDropdown,
  DataType,
  handleSelectChainDropdown
} from '@cosmology-ui/react';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { chainList } from './utils/config';

const Dropdown = ({
  selectedChain,
  setSelectedChain
}: {
  selectedChain?: DataType;
  setSelectedChain: Dispatch<SetStateAction<DataType | undefined>>;
}) => {
  const [demoData, setDemoData] = useState<DataType[]>([]);
  const handleChange: handleSelectChainDropdown = (value) => {
    console.log('selected chain', value);
    if (value) setSelectedChain(value);
    if (!value) setSelectedChain(undefined);
  };

  useEffect(() => {
    const formatChainsData = chainList.map((props) => {
      return {
        name: props?.chainName,
        label: props?.label,
        value: props?.value,
        icon: props?.icon
      };
    });
    setDemoData([
      {
        name: 'disabled',
        label: 'disabled option',
        value: 'disabled',
        icon: {
          png: 'https://dummyimage.com/400x400/5c5c5c/ffffff.png&text=D'
        },
        disabled: true
      },
      ...formatChainsData
    ]);
  }, []);

  return (
    <ChangeChainDropdown
      data={demoData}
      selectedItem={selectedChain}
      onChange={handleChange}
    />
  );
};

export default Dropdown;
