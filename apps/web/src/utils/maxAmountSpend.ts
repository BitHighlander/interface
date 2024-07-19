import { Currency, CurrencyAmount } from '@uniswap/sdk-core'
import JSBI from 'jsbi'
const TAG = ' | utils | '

const MIN_NATIVE_CURRENCY_FOR_GAS: JSBI = JSBI.exponentiate(JSBI.BigInt(10), JSBI.BigInt(16)) // .01 ETH
/**
 * Given some token amount, return the max that can be spent of it
 * @param currencyAmount to return max of
 */
export function maxAmountSpend(currencyAmount?: CurrencyAmount<Currency>): CurrencyAmount<Currency> | undefined {
  const tag = TAG + ' | maxAmountSpend | '
  if (!currencyAmount) {
    //console.log(tag, ' currencyAmount is undefined')
    return undefined
  }
  if (currencyAmount.currency.isNative) {
    if (JSBI.greaterThan(currencyAmount.quotient, MIN_NATIVE_CURRENCY_FOR_GAS)) {
      //console.log(tag, 'MIN_NATIVE_CURRENCY_FOR_GAS: ', MIN_NATIVE_CURRENCY_FOR_GAS)
      return CurrencyAmount.fromRawAmount(
        currencyAmount.currency,
        JSBI.subtract(currencyAmount.quotient, MIN_NATIVE_CURRENCY_FOR_GAS)
      )
    } else {
      //console.log(tag, 'Not native balance: ', currencyAmount.currency, JSBI.BigInt(0))
      return CurrencyAmount.fromRawAmount(currencyAmount.currency, JSBI.BigInt(0))
    }
  }
  return currencyAmount
}
