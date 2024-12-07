// import {
//   BetPlaced as BetPlacedEvent,
//   MarketActivated as MarketActivatedEvent,
//   MarketCreated as MarketCreatedEvent,
//   MarketResolved as MarketResolvedEvent,
//   OwnershipTransferred as OwnershipTransferredEvent,
//   PrizeDistributed as PrizeDistributedEvent
// } from "../generated/MarketCoreContract/MarketCoreContract"
// import {
//   BetPlaced,
//   MarketActivated,
//   MarketCreated,
//   MarketResolved,
//   OwnershipTransferred,
//   PrizeDistributed
// } from "../generated/schema"

// export function handleBetPlaced(event: BetPlacedEvent): void {
//   let entity = new BetPlaced(
//     event.transaction.hash.concatI32(event.logIndex.toI32())
//   )
//   entity.user = event.params.user
//   entity.marketId = event.params.marketId
//   entity.amount = event.params.amount
//   entity.outcome = event.params.outcome

//   entity.blockNumber = event.block.number
//   entity.blockTimestamp = event.block.timestamp
//   entity.transactionHash = event.transaction.hash

//   entity.save()
// }

// export function handleMarketActivated(event: MarketActivatedEvent): void {
//   let entity = new MarketActivated(
//     event.transaction.hash.concatI32(event.logIndex.toI32())
//   )
//   entity.marketId = event.params.marketId

//   entity.blockNumber = event.block.number
//   entity.blockTimestamp = event.block.timestamp
//   entity.transactionHash = event.transaction.hash

//   entity.save()
// }

// export function handleMarketCreated(event: MarketCreatedEvent): void {
//   let entity = new MarketCreated(
//     event.transaction.hash.concatI32(event.logIndex.toI32())
//   )
//   entity.marketId = event.params.marketId
//   entity.title = event.params.title
//   entity.creator = event.params.creator

//   entity.blockNumber = event.block.number
//   entity.blockTimestamp = event.block.timestamp
//   entity.transactionHash = event.transaction.hash

//   entity.save()
// }

// export function handleMarketResolved(event: MarketResolvedEvent): void {
//   let entity = new MarketResolved(
//     event.transaction.hash.concatI32(event.logIndex.toI32())
//   )
//   entity.marketId = event.params.marketId
//   entity.winningOutcome = event.params.winningOutcome

//   entity.blockNumber = event.block.number
//   entity.blockTimestamp = event.block.timestamp
//   entity.transactionHash = event.transaction.hash

//   entity.save()
// }

// export function handleOwnershipTransferred(
//   event: OwnershipTransferredEvent
// ): void {
//   let entity = new OwnershipTransferred(
//     event.transaction.hash.concatI32(event.logIndex.toI32())
//   )
//   entity.previousOwner = event.params.previousOwner
//   entity.newOwner = event.params.newOwner

//   entity.blockNumber = event.block.number
//   entity.blockTimestamp = event.block.timestamp
//   entity.transactionHash = event.transaction.hash

//   entity.save()
// }

// export function handlePrizeDistributed(event: PrizeDistributedEvent): void {
//   let entity = new PrizeDistributed(
//     event.transaction.hash.concatI32(event.logIndex.toI32())
//   )
//   entity.marketId = event.params.marketId
//   entity.winner = event.params.winner
//   entity.amount = event.params.amount

//   entity.blockNumber = event.block.number
//   entity.blockTimestamp = event.block.timestamp
//   entity.transactionHash = event.transaction.hash

//   entity.save()
// }

import { BigInt } from "@graphprotocol/graph-ts";
import { MarketCreated, MarketActivated, BetPlaced, MarketResolved, PrizeDistributed } from "../generated/MarketCore/MarketCore";
import { Market, Bet } from "../generated/schema";

export function handleMarketCreated(event: MarketCreated): void {
  let market = new Market(event.params.marketId.toString());
  market.title = event.params.title;
  market.creator = event.params.creator;
  market.description = ""; // Fetch if possible or leave empty
  market.resolutionDate = event.block.timestamp.plus(event.params.resolutionDate);
  market.totalPool = BigInt.fromI32(0);
  market.yesPool = BigInt.fromI32(0);
  market.noPool = BigInt.fromI32(0);
  market.winningOutcome = null;
  market.save();
}

export function handleBetPlaced(event: BetPlaced): void {
  let market = Market.load(event.params.marketId.toString());
  if (market == null) return;

  let bet = new Bet(event.transaction.hash.toHex() + "-" + event.logIndex.toString());
  bet.market = market.id;
  bet.user = event.params.user;
  bet.amount = event.params.amount;
  bet.outcome = event.params.outcome;
  bet.save();

  market.totalPool = market.totalPool.plus(event.params.amount);
  if (event.params.outcome) {
    market.yesPool = market.yesPool.plus(event.params.amount);
  } else {
    market.noPool = market.noPool.plus(event.params.amount);
  }
  market.save();
}
