import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { BigInt, Address } from "@graphprotocol/graph-ts"
import { ProposalCreated } from "../generated/schema"
import { ProposalCreated as ProposalCreatedEvent } from "../generated/GovernanceContract/GovernanceContract"
import { handleProposalCreated } from "../src/governance-contract"
import { createProposalCreatedEvent } from "./governance-contract-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let proposalId = BigInt.fromI32(234)
    let marketId = BigInt.fromI32(234)
    let newProposalCreatedEvent = createProposalCreatedEvent(
      proposalId,
      marketId
    )
    handleProposalCreated(newProposalCreatedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("ProposalCreated created and stored", () => {
    assert.entityCount("ProposalCreated", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "ProposalCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "proposalId",
      "234"
    )
    assert.fieldEquals(
      "ProposalCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "marketId",
      "234"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
