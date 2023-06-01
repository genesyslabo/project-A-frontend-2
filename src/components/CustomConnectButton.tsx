import { Image, useColorMode, useColorModeValue } from '@chakra-ui/react';
import { ConnectButton } from '@rainbow-me/rainbowkit';

export const CustomConnectButton = () => {
  const { colorMode } = useColorMode()
  const colorText = useColorModeValue('darkgreen', '#0084FF')

  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        // Note: If your app doesn't use authentication, you
        // can remove all 'authenticationStatus' checks
        const ready = mounted && authenticationStatus !== 'loading';
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus ||
            authenticationStatus === 'authenticated');
        return (
          <div
            {...(!ready && {
              'aria-hidden': true,
              'style': {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <Image src={
                    colorMode === 'dark' ? '/assets/images/icon-wallet-white.png' : '/assets/images/icon-wallet.png'
                  } className='md:w-14 cursor-pointer' onClick={openConnectModal} />
                );
              }
              if (chain.unsupported) {
                return (
                  <button onClick={openChainModal} type="button">
                    Wrong network
                  </button>
                );
              }
              return (
                <div style={{ display: 'flex', gap: 12 }}>
                  <button
                    onClick={openChainModal}
                    style={{ display: 'flex', alignItems: 'center' }}
                    type="button"
                    className={`text-[${colorMode === 'dark' ? '#0084FF' : '#02715F'}]`}
                  >
                    {chain.hasIcon && (
                      <div
                        style={{
                          background: chain.iconBackground,
                          width: 20,
                          height: 20,
                          borderRadius: 999,
                          overflow: 'hidden',
                          marginRight: 4,
                        }}
                      >
                        {chain.iconUrl && (
                          <img
                            alt={chain.name ?? 'Chain icon'}
                            src={chain.iconUrl}
                            style={{ width: 20, height: 20 }}
                          />
                        )}
                      </div>
                    )}
                    {/* {chain.name} */}
                  </button>
                  <button onClick={openAccountModal} type="button" className={`text-[${colorMode === 'dark' ? '#0084FF' : '#02715F'}]  whitespace-nowrap`}>
                    {account.displayName}
                    <span className='hidden'>
                        {account.displayBalance
                        ? ` (${account.displayBalance})`
                        : ''}
                    </span>
                  </button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};