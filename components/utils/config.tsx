import { ButtonShape, WalletMode, shuffledArray } from '@cosmology-ui/react';
import { assets, chains } from 'chain-registry';
import { FaFirefox } from 'react-icons/fa';
import { GrAndroid } from 'react-icons/gr';
import { RiAppStoreFill, RiChromeFill } from 'react-icons/ri';

import { ChainListType, UserDeviceInfoType } from './types';

const defaultStringArray = [
  ...[...Array(26)].map((_, i) => String.fromCharCode('A'.charCodeAt(0) + i)),
  ...[...Array(26)].map((_, i) => String.fromCharCode('a'.charCodeAt(0) + i)),
  ...[...Array(10)].map((_, i) => i.toString())
];

const handleShuffledLetters = (name: string, maxLength: number = 32) => {
  const randomLetter = shuffledArray(defaultStringArray)
    .toString()
    .replaceAll(',', '');
  // eslint-disable-next-line
  return (name.replaceAll(/[\-[\s[\.]/g, '') + randomLetter).slice(
    0,
    maxLength
  );
};

export const chainList = assets
  .filter((list) => {
    const chain = chains.find((chain) => chain.chain_name === list.chain_name);
    if (!chain) return false;
    if (chain.network_type !== 'mainnet') return false;
    return true;
  })
  .map(({ assets }) => assets.values())
  .map((iterator) => {
    for (const value of iterator) {
      return {
        chainName: value.base,
        label: value.name,
        value: value.name,
        icon: {
          png: value.logo_URIs?.png,
          jpeg: value.logo_URIs?.jpeg,
          svg: value.logo_URIs?.svg
        },
        ibc: value.ibc,
        address:
          value.base.slice(0, 1) === 'u'
            ? handleShuffledLetters(value.name, 12)
            : handleShuffledLetters(value.name)
      };
    }
  })
  .filter((a) => (a ? a.icon : null)) // only images
  .sort(
    () => (Math.random() > 0.5 ? 1 : -1) // random
  ) as ChainListType[];

export const WalletIcons = {
  keplr:
    'https://user-images.githubusercontent.com/545047/202085372-579be3f3-36e0-4e0b-b02f-48182af6e577.svg',
  cosmostation:
    'https://user-images.githubusercontent.com/74940804/202999324-fa2faf40-5ead-4896-b865-e97f052fc6f9.png',
  metamask:
    'https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg',
  walletConnectFill:
    'https://raw.githubusercontent.com/WalletConnect/walletconnect-assets/7ecce5fd1974a06a031720f07304c8704db738ab/Icon/Blue%20(Default)/Icon.svg',
  walletConnect:
    'https://user-images.githubusercontent.com/545047/202090621-bb110635-f6ce-4aa0-a4e5-a03beac29bd1.svg',
  leap: 'https://pbs.twimg.com/profile_images/1608364336363474946/pCnD8K1C_400x400.jpg',
  vectis:
    'https://pbs.twimg.com/profile_images/1585558896239955968/VJargLiw_400x400.jpg'
};

export const WalletData = [
  {
    name: 'Keplr',
    prettyName: 'Keplr',
    logo: WalletIcons.keplr,
    mode: WalletMode.Extension,
    mobileDisabled: true,
    rejectMessage: 'Request Rejected!',
    downloads: {
      desktop: [
        {
          browser: 'chrome',
          icon: RiChromeFill,
          link: 'https://chrome.google.com/webstore/detail/keplr/dmkamcknogkgcdfhhbddcghachkejeap?hl=en'
        },
        {
          browser: 'firefox',
          icon: FaFirefox,
          link: 'https://addons.mozilla.org/en-US/firefox/addon/keplr/'
        }
      ],
      tablet: [
        {
          os: 'android',
          icon: GrAndroid,
          link: 'https://play.google.com/store/apps/details?id=com.chainapsis.keplr'
        },
        {
          os: 'ios',
          icon: RiAppStoreFill,
          link: 'https://apps.apple.com/us/app/keplr-wallet/id1567851089'
        }
      ],
      mobile: [
        {
          os: 'android',
          icon: GrAndroid,
          link: 'https://play.google.com/store/apps/details?id=com.chainapsis.keplr'
        },
        {
          os: 'ios',
          icon: RiAppStoreFill,
          link: 'https://apps.apple.com/us/app/keplr-wallet/id1567851089'
        }
      ],
      default: 'https://www.keplr.app/download'
    }
  },
  {
    name: 'cosmostation',
    prettyName: 'Cosmostation',
    logo: WalletIcons.cosmostation,
    mode: WalletMode.Extension,
    mobileDisabled: true,
    rejectMessage: 'Request Rejected!',
    downloads: {
      desktop: [
        {
          browser: 'chrome',
          icon: RiChromeFill,
          link: 'https://chrome.google.com/webstore/detail/cosmostation/fpkhgmpbidmiogeglndfbkegfdlnajnf'
        }
      ],
      tablet: [
        {
          os: 'android',
          icon: GrAndroid,
          link: 'https://play.google.com/store/apps/details?id=wannabit.io.cosmostaion'
        },
        {
          os: 'ios',
          icon: RiAppStoreFill,
          link: 'https://apps.apple.com/app/cosmostation/id1459830339'
        }
      ],
      mobile: [
        {
          os: 'android',
          icon: GrAndroid,
          link: 'https://play.google.com/store/apps/details?id=wannabit.io.cosmostaion'
        },
        {
          os: 'ios',
          icon: RiAppStoreFill,
          link: 'https://apps.apple.com/app/cosmostation/id1459830339'
        }
      ],
      default: 'https://wallet.cosmostation.io/cosmos'
    }
  },
  {
    name: 'leap',
    prettyName: 'Leap',
    logo: WalletIcons.leap,
    mode: WalletMode.Extension,
    mobileDisabled: true,
    rejectMessage: 'Request Rejected!',
    downloads: {
      desktop: [
        {
          browser: 'chrome',
          icon: RiChromeFill,
          link: 'https://chrome.google.com/webstore/detail/leap-cosmos-wallet/fcfcfllfndlomdhbehjjcoimbgofdncg/?utm_source=website&utm_medium=permanent-website&utm_campaign=permanent'
        }
      ],
      tablet: [
        {
          os: 'android',
          icon: GrAndroid,
          link: 'https://play.google.com/store/apps/details?id=io.leapwallet.cosmos&hl=zh_TW&gl=US'
        },
        {
          os: 'ios',
          icon: RiAppStoreFill,
          link: 'https://apps.apple.com/us/app/leap-cosmos/id1642465549'
        }
      ],
      mobile: [
        {
          os: 'android',
          icon: GrAndroid,
          link: 'https://play.google.com/store/apps/details?id=io.leapwallet.cosmos&hl=zh_TW&gl=US'
        },
        {
          os: 'ios',
          icon: RiAppStoreFill,
          link: 'https://apps.apple.com/us/app/leap-cosmos/id1642465549'
        }
      ],
      default: 'https://www.leapwallet.io/'
    }
  },
  {
    name: 'vectis',
    prettyName: 'Vectis',
    logo: WalletIcons.vectis,
    mode: WalletMode.Extension,
    mobileDisabled: true,
    rejectMessage: 'Request Rejected!',
    downloads: {
      desktop: [
        {
          browser: 'chrome',
          icon: RiChromeFill,
          link: 'https://github.com/nymlab/vectis'
        }
      ],
      tablet: [],
      mobile: [],
      default: 'https://nymlab.github.io/vectis/vectis_wallet/'
    }
  },
  {
    name: 'WalletConnectKeplr',
    prettyName: 'Keplr Mobile',
    logo: WalletIcons.keplr,
    mode: WalletMode.WalletConnect,
    mobileDisabled: false,
    modalListType: ButtonShape.Rectangle,
    subLogo: WalletIcons.walletConnect,
    rejectMessage: 'Request Rejected!',
    downloads: {
      desktop: [
        {
          browser: 'chrome',
          icon: RiChromeFill,
          link: 'https://chrome.google.com/webstore/detail/keplr/dmkamcknogkgcdfhhbddcghachkejeap?hl=en'
        },
        {
          browser: 'firefox',
          icon: FaFirefox,
          link: 'https://addons.mozilla.org/en-US/firefox/addon/keplr/'
        }
      ],
      tablet: [
        {
          os: 'android',
          icon: GrAndroid,
          link: 'https://play.google.com/store/apps/details?id=com.chainapsis.keplr'
        },
        {
          os: 'ios',
          icon: RiAppStoreFill,
          link: 'https://apps.apple.com/us/app/keplr-wallet/id1567851089'
        }
      ],
      mobile: [
        {
          os: 'android',
          icon: GrAndroid,
          link: 'https://play.google.com/store/apps/details?id=com.chainapsis.keplr'
        },
        {
          os: 'ios',
          icon: RiAppStoreFill,
          link: 'https://apps.apple.com/us/app/keplr-wallet/id1567851089'
        }
      ],
      default: 'https://www.keplr.app/download'
    }
  },
  {
    name: 'WalletConnectCosmostation',
    prettyName: 'Cosmostation mobile',
    logo: WalletIcons.cosmostation,
    mode: WalletMode.WalletConnect,
    modalListType: ButtonShape.Rectangle,
    mobileDisabled: false,
    subLogo: WalletIcons.walletConnect,
    rejectMessage: 'Request Rejected!',
    downloads: {
      desktop: [
        {
          browser: 'chrome',
          icon: RiChromeFill,
          link: 'https://chrome.google.com/webstore/detail/cosmostation/fpkhgmpbidmiogeglndfbkegfdlnajnf'
        }
      ],
      tablet: [
        {
          os: 'android',
          icon: GrAndroid,
          link: 'https://play.google.com/store/apps/details?id=wannabit.io.cosmostaion'
        },
        {
          os: 'ios',
          icon: RiAppStoreFill,
          link: 'https://apps.apple.com/app/cosmostation/id1459830339'
        }
      ],
      mobile: [
        {
          os: 'android',
          icon: GrAndroid,
          link: 'https://play.google.com/store/apps/details?id=wannabit.io.cosmostaion'
        },
        {
          os: 'ios',
          icon: RiAppStoreFill,
          link: 'https://apps.apple.com/app/cosmostation/id1459830339'
        }
      ],
      default: 'https://wallet.cosmostation.io/cosmos'
    }
  }
];

export function handleDevice({ browser, device, os }: UserDeviceInfoType) {
  switch (device) {
    case 'desktop':
      return WalletData[0].downloads.desktop.find(
        (key) => key.browser === browser
      );
    case 'tablet':
      return WalletData[0].downloads.tablet.find((key) => key.os === os);
    case 'mobile':
      return WalletData[0].downloads.mobile.find((key) => key.os === os);
    default:
      return WalletData[0].downloads.default;
  }
}
