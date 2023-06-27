import type { Chain } from '../types/chain.js'
import type { PublicRpcSchema } from '../types/eip1193.js'
import type { Prettify } from '../types/utils.js'
import { type Client, type ClientConfig, createClient } from './createClient.js'
import { type PublicActions, publicActions } from './decorators/public.js'
import type { Transport } from './transports/createTransport.js'

export type PublicClientConfig<
  TTransport extends Transport = Transport,
  TChain extends Chain | undefined = Chain | undefined,
> = Pick<
  ClientConfig<TTransport, TChain>,
  'batch' | 'chain' | 'key' | 'name' | 'pollingInterval' | 'transport'
>

export type PublicClient<
  TTransport extends Transport = Transport,
  TChain extends Chain | undefined = Chain | undefined,
> = Prettify<
  Client<
    TTransport,
    TChain,
    undefined,
    PublicRpcSchema,
    PublicActions<TTransport, TChain>
  >
>

/**
 * Creates a Public Client with a given [Transport](https://viem.sh/docs/clients/intro.html) configured for a [Chain](https://viem.sh/docs/clients/chains.html).
 *
 * - Docs: https://viem.sh/docs/clients/public.html
 *
 * A Public Client is an interface to "public" [JSON-RPC API](https://ethereum.org/en/developers/docs/apis/json-rpc/) methods such as retrieving block numbers, transactions, reading from smart contracts, etc through [Public Actions](/docs/actions/public/introduction).
 *
 * @param config - {@link PublicClientConfig}
 * @returns A Public Client. {@link PublicClient}
 *
 * @example
 * import { createPublicClient, http } from 'viem'
 * import { mainnet } from 'viem/chains'
 *
 * const client = createPublicClient({
 *   chain: mainnet,
 *   transport: http(),
 * })
 */
export function createPublicClient<
  TTransport extends Transport,
  TChain extends Chain | undefined = undefined,
>({
  batch,
  chain,
  key = 'public',
  name = 'Public Client',
  transport,
  pollingInterval,
}: PublicClientConfig<TTransport, TChain>): PublicClient<TTransport, TChain> {
  return createClient({
    batch,
    chain,
    key,
    name,
    pollingInterval,
    transport,
    type: 'publicClient',
  }).extend(publicActions)
}
