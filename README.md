# monarchcli

A command line interface for Monarch Money API

## Installation

```bash
pnpm install
```

## Setup

You must set the `MONARCH_TOKEN` environment variable before using the CLI:

```bash
export MONARCH_TOKEN="your-token-here"
```

## Usage

### Basic Commands

```bash
# Get all accounts
monarch-cli get-accounts

# Save output to file
monarch-cli get-accounts --output accounts.json

# Get transactions with filters
echo '{"limit": 10, "startDate": "2024-01-01"}' > params.json
monarch-cli get-transactions --input params.json

# Pipe output to jq for processing
monarch-cli get-transactions | jq '.allTransactions.results[0]'
```

### Available Commands

| Command | Description | Required Parameters |
|---------|-------------|---------------------|
| `get-accounts` | Get all accounts | None |
| `get-account-type-options` | Get account type options | None |
| `get-recent-account-balances` | Get recent account balances | Optional: `startDate` |
| `get-account-holdings` | Get holdings for an account | `accountId` |
| `get-account-history` | Get history for an account | `accountId` |
| `get-subscription-details` | Get subscription details | None |
| `get-institutions` | Get financial institutions | None |
| `get-account-snapshots-by-type` | Get account snapshots by type | `startDate`, `timeframe` ("year" or "month") |
| `get-aggregate-snapshots` | Get aggregate snapshots | Optional: `startDate`, `endDate`, `accountType` |
| `get-budget-settings` | Get budget settings | None |
| `get-budgets` | Get budgets | Optional: `startDate`, `endDate`, `useLegacyGoals`, `useV2Goals` |
| `get-transactions` | Get transactions with filters | Optional: many (see below) |
| `get-transactions-summary` | Get transactions summary | None |
| `get-recurring-transactions` | Get recurring transactions | Optional: `startDate`, `endDate` |
| `get-categories` | Get transaction categories | None |
| `get-category-groups` | Get category groups | None |
| `get-transaction-tags` | Get transaction tags | None |
| `get-transaction-details` | Get transaction details | `transactionId`, optional: `redirectPosted` |
| `get-transaction-splits` | Get transaction splits | `transactionId` |
| `get-cashflow` | Get cashflow data | Optional: `limit`, `startDate`, `endDate` |
| `get-cashflow-summary` | Get cashflow summary | Optional: `limit`, `startDate`, `endDate` |
| `get-cashflow-dashboard` | Get cashflow dashboard | None |

### Transaction Filters

The `get-transactions` command accepts these optional parameters:

```json
{
  "limit": 100,
  "offset": 0,
  "startDate": "2024-01-01",
  "endDate": "2024-12-31",
  "search": "coffee",
  "categoryIds": ["id1", "id2"],
  "accountIds": ["id1", "id2"],
  "tagIds": ["id1", "id2"],
  "hasAttachments": true,
  "hasNotes": false,
  "hiddenFromReports": false,
  "isSplit": false,
  "isRecurring": true,
  "importedFromMint": false,
  "syncedFromInstitution": true
}
```

### Examples

```bash
# Get account holdings
echo '{"accountId": "abc-123-def-456"}' > params.json
monarch-cli get-account-holdings --input params.json --output holdings.json

# Get transactions for a date range
echo '{"startDate": "2024-01-01", "endDate": "2024-01-31"}' > dates.json
monarch-cli get-transactions --input dates.json

# Get budget data
echo '{"startDate": "2024-01-01", "endDate": "2024-12-31"}' > budget-params.json
monarch-cli get-budgets --input budget-params.json --output budget.json

# Chain commands with jq
monarch-cli get-categories | jq '[.categories[] | {id: .id, name: .name}]'
```

## Running the CLI

You can run the CLI in several ways:

```bash
# Through npm/pnpm scripts
pnpm start <command>

# Direct with tsx
npx tsx src/cli.ts <command>

# Make it globally available (after pnpm link)
monarch-cli <command>
```

## Error Handling

- All errors are written to stderr
- JSON output is written to stdout (or specified output file)
- Exit code is 1 on error, 0 on success

## Development

TypeScript source is in `src/cli.ts`. The CLI uses:
- Commander.js for command parsing
- tsx for TypeScript execution without compilation
- monarch-money-api for API calls