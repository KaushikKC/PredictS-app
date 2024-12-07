import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  BetPlaced,
  MarketActivated,
  MarketCreated,
  MarketResolved,
  OwnershipTransferred,
  PrizeDistributed
} from "../generated/MarketCoreContract/MarketCoreContract"

export function createBetPlacedEvent(
  user: Address,
  marketId: BigInt,
  amount: BigInt,
  outcome: boolean
): BetPlaced {
  let betPlacedEvent = changetype<BetPlaced>(newMockEvent())

  betPlacedEvent.parameters = new Array()

  betPlacedEvent.parameters.push(
    new ethereum.EventParam("user", ethereum.Value.fromAddress(user))
  )
  betPlacedEvent.parameters.push(
    new ethereum.EventParam(
      "marketId",
      ethereum.Value.fromUnsignedBigInt(marketId)
    )
  )
  betPlacedEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )
  betPlacedEvent.parameters.push(
    new ethereum.EventParam("outcome", ethereum.Value.fromBoolean(outcome))
  )

  return betPlacedEvent
}

export function createMarketActivatedEvent(marketId: BigInt): MarketActivated {
  let marketActivatedEvent = changetype<MarketActivated>(newMockEvent())

  marketActivatedEvent.parameters = new Array()

  marketActivatedEvent.parameters.push(
    new ethereum.EventParam(
      "marketId",
      ethereum.Value.fromUnsignedBigInt(marketId)
    )
  )

  return marketActivatedEvent
}

export function createMarketCreatedEvent(
  marketId: BigInt,
  title: string,
  creator: Address
): MarketCreated {
  let marketCreatedEvent = changetype<MarketCreated>(newMockEvent())

  marketCreatedEvent.parameters = new Array()

  marketCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "marketId",
      ethereum.Value.fromUnsignedBigInt(marketId)
    )
  )
  marketCreatedEvent.parameters.push(
    new ethereum.EventParam("title", ethereum.Value.fromString(title))
  )
  marketCreatedEvent.parameters.push(
    new ethereum.EventParam("creator", ethereum.Value.fromAddress(creator))
  )

  return marketCreatedEvent
}

export function createMarketResolvedEvent(
  marketId: BigInt,
  winningOutcome: boolean
): MarketResolved {
  let marketResolvedEvent = changetype<MarketResolved>(newMockEvent())

  marketResolvedEvent.parameters = new Array()

  marketResolvedEvent.parameters.push(
    new ethereum.EventParam(
      "marketId",
      ethereum.Value.fromUnsignedBigInt(marketId)
    )
  )
  marketResolvedEvent.parameters.push(
    new ethereum.EventParam(
      "winningOutcome",
      ethereum.Value.fromBoolean(winningOutcome)
    )
  )

  return marketResolvedEvent
}

export function createOwnershipTransferredEvent(
  previousOwner: Address,
  newOwner: Address
): OwnershipTransferred {
  let ownershipTransferredEvent = changetype<OwnershipTransferred>(
    newMockEvent()
  )

  ownershipTransferredEvent.parameters = new Array()

  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam(
      "previousOwner",
      ethereum.Value.fromAddress(previousOwner)
    )
  )
  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return ownershipTransferredEvent
}

export function createPrizeDistributedEvent(
  marketId: BigInt,
  winner: Address,
  amount: BigInt
): PrizeDistributed {
  let prizeDistributedEvent = changetype<PrizeDistributed>(newMockEvent())

  prizeDistributedEvent.parameters = new Array()

  prizeDistributedEvent.parameters.push(
    new ethereum.EventParam(
      "marketId",
      ethereum.Value.fromUnsignedBigInt(marketId)
    )
  )
  prizeDistributedEvent.parameters.push(
    new ethereum.EventParam("winner", ethereum.Value.fromAddress(winner))
  )
  prizeDistributedEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return prizeDistributedEvent
}
