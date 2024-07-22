const TAG = ' | multicall | ';
import { ChainId } from '@uniswap/sdk-core';
import { useWeb3React } from '@web3-react/core';
import useBlockNumber, { useMainnetBlockNumber } from 'lib/hooks/useBlockNumber';
import multicall from 'lib/state/multicall';
import { SkipFirst } from 'types/tuple';

export { NEVER_RELOAD } from '@uniswap/redux-multicall'; // re-export for convenience
export type { CallStateResult } from '@uniswap/redux-multicall'; // re-export for convenience

type SkipFirstTwoParams<T extends (...args: any) => any> = SkipFirst<Parameters<T>, 2>;

function useCallContext() {
  const { chainId } = useWeb3React();
  const latestBlock = useBlockNumber();
  return { chainId, latestBlock };
}

export function useMultipleContractSingleData(
  ...args: SkipFirstTwoParams<typeof multicall.hooks.useMultipleContractSingleData>
) {
  const tag = TAG + ' | useMultipleContractSingleData | ';
  //console.log(tag, 'args: ', args);
  const { chainId, latestBlock } = useCallContext();
  //console.log(tag, 'chainId: ', chainId, 'latestBlock: ', latestBlock);
  const result = multicall.hooks.useMultipleContractSingleData(chainId, latestBlock, ...args);
  //console.log(tag, 'result: ', result);
  return result;
}

export function useSingleCallResult(...args: SkipFirstTwoParams<typeof multicall.hooks.useSingleCallResult>) {
  const tag = TAG + ' | useSingleCallResult | ';
  //console.log(tag, 'args: ', args);
  const { chainId, latestBlock } = useCallContext();
  //console.log(tag, 'chainId: ', chainId, 'latestBlock: ', latestBlock);
  const result = multicall.hooks.useSingleCallResult(chainId, latestBlock, ...args);
  //console.log(tag, 'result: ', result);
  return result;
}

export function useMainnetSingleCallResult(...args: SkipFirstTwoParams<typeof multicall.hooks.useSingleCallResult>) {
  const tag = TAG + ' | useMainnetSingleCallResult | ';
  //console.log(tag, 'args: ', args);
  const latestMainnetBlock = useMainnetBlockNumber();
  //console.log(tag, 'latestMainnetBlock: ', latestMainnetBlock);
  const result = multicall.hooks.useSingleCallResult(ChainId.MAINNET, latestMainnetBlock, ...args);
  //console.log(tag, 'result: ', result);
  return result;
}

export function useSingleContractMultipleData(
  ...args: SkipFirstTwoParams<typeof multicall.hooks.useSingleContractMultipleData>
) {
  const tag = TAG + ' | useSingleContractMultipleData | ';
  //console.log(tag, 'args: ', args);
  const { chainId, latestBlock } = useCallContext();
  //console.log(tag, 'chainId: ', chainId, 'latestBlock: ', latestBlock);
  const result = multicall.hooks.useSingleContractMultipleData(chainId, latestBlock, ...args);
  //console.log(tag, 'result: ', result);
  return result;
}
