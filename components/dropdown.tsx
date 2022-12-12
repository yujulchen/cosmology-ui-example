import { ChangeChainDropdown, DataType } from '@cosmology-ui/utils';
import { useEffect, useState } from 'react';
import { chainList } from './utils/config';

export default function Dropdown({
  selectedItem,
  setSelectedItem
}: {
  selectedItem?: DataType;
  setSelectedItem: (value: DataType) => void;
}) {
  const [demoData, setDemoData] = useState<DataType[]>([]);

  useEffect(() => {
    const formatChainsData = chainList.map((props) => {
      return {
        chainName: props?.chainName,
        label: props?.label,
        value: props?.value,
        icon: props?.icon
      };
    });
    setDemoData([
      {
        chainName: 'disabled',
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
      selectedItem={selectedItem}
      onChange={(v) => {
        if (v) setSelectedItem(v);
      }}
    />
  );
}
