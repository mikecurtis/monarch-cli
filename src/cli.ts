#!/usr/bin/env npx tsx

import { Command } from 'commander';
import * as fs from 'fs';
import * as path from 'path';
import { commandSchemas, CommandSchema, ParameterSchema } from './command-schemas.js';
import {
  setToken,
  getAccounts,
  getAccountTypeOptions,
  getRecentAccountBalances,
  getAccountHoldings,
  getAccountHistory,
  getSubscriptionDetails,
  getInstitutions,
  getAccountSnapshotsByType,
  getAggregateSnapshots,
  getBudgetSettings,
  getBudgets,
  getTransactions,
  getTransactionsSummary,
  getRecurringTransactions,
  getCategories,
  getCategoryGroups,
  getTransactionTags,
  getTransactionDetails,
  getTransactionSplits,
  getCashflow,
  getCashflowSummary,
  getCashFlowDashboard,
} from 'monarch-money-api';

// Helper functions
const log = (message: string) => {
  console.error(message);
};

const error = (message: string): never => {
  console.error(`Error: ${message}`);
  process.exit(1);
};

// Format schema information for display in help
const formatSchemaHelp = (commandName: string): string => {
  const schema = commandSchemas[commandName];
  if (!schema) return '';

  let helpText = '';

  // Add description
  if (schema.description) {
    helpText += `\nDescription:\n  ${schema.description}\n`;
  }

  // Add parameters section
  if (schema.parameters && Object.keys(schema.parameters).length > 0) {
    helpText += '\nInput Schema (JSON format):\n';
    helpText += '  Parameters:\n';
    
    for (const [paramName, param] of Object.entries(schema.parameters)) {
      const paramSchema = param as ParameterSchema;
      helpText += `    ${paramName}:\n`;
      helpText += `      Type: ${paramSchema.type}${paramSchema.required ? ' (required)' : ' (optional)'}\n`;
      helpText += `      Description: ${paramSchema.description}\n`;
      
      if (paramSchema.default !== undefined) {
        helpText += `      Default: ${JSON.stringify(paramSchema.default)}\n`;
      }
      
      if (paramSchema.enum) {
        helpText += `      Allowed values: ${paramSchema.enum.join(', ')}\n`;
      }
      
      if (paramSchema.example !== undefined) {
        helpText += `      Example: ${JSON.stringify(paramSchema.example)}\n`;
      }
      
      helpText += '\n';
    }
  } else {
    helpText += '\nInput Schema: No parameters required\n';
  }

  // Add examples section
  if (schema.examples && schema.examples.length > 0) {
    helpText += 'Examples:\n';
    for (const example of schema.examples) {
      helpText += `  ${example}\n`;
    }
  }

  return helpText;
};

const readInput = (filePath: string): any => {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(content);
  } catch (err) {
    error(`Failed to read input file ${filePath}: ${err instanceof Error ? err.message : err}`);
  }
};

const writeOutput = (data: any, outputPath?: string) => {
  const json = JSON.stringify(data, null, 2);
  if (outputPath) {
    try {
      fs.mkdirSync(path.dirname(outputPath), { recursive: true });
      fs.writeFileSync(outputPath, json);
      log(`Output written to ${outputPath}`);
    } catch (err) {
      error(`Failed to write output file ${outputPath}: ${err instanceof Error ? err.message : err}`);
    }
  } else {
    console.log(json);
  }
};

const executeCommand = async (
  fn: (...args: any[]) => Promise<any>,
  options: { input?: string; output?: string },
  ...defaultArgs: any[]
) => {
  // Check for token only when executing a command
  const token = process.env.MONARCH_TOKEN;
  if (!token) {
    error('MONARCH_TOKEN environment variable is not set. Please set it before running this CLI.');
  }
  
  // Set the token for API calls
  setToken(token);
  
  try {
    let args = defaultArgs;
    
    if (options.input) {
      const inputData = readInput(options.input);
      if (typeof inputData === 'object' && !Array.isArray(inputData)) {
        // If input is an object, use it as named parameters
        args = [inputData];
      } else if (Array.isArray(inputData)) {
        // If input is an array, spread it as positional arguments
        args = inputData;
      } else {
        // Single value, use as first argument
        args = [inputData];
      }
    }

    log(`Executing API call...`);
    const result = await fn(...args);
    writeOutput(result, options.output);
  } catch (err) {
    error(`API call failed: ${err instanceof Error ? err.message : err}`);
  }
};

// Initialize Commander
const program = new Command();

program
  .name('monarch-cli')
  .description('CLI for Monarch Money API queries')
  .version('1.0.0');

// Add global options to each command and enhance help with schema information
const addCommonOptions = (cmd: Command): Command => {
  const enhancedCmd = cmd
    .option('-i, --input <file>', 'JSON file with parameters for the API call')
    .option('-o, --output <file>', 'Output file for JSON response (stdout if not specified)');

  // Override the help output to include schema information
  enhancedCmd.addHelpText('after', () => {
    const commandName = cmd.name();
    return formatSchemaHelp(commandName);
  });

  return enhancedCmd;
};

// Define all query commands
addCommonOptions(
  program
    .command('get-accounts')
    .description('Get all accounts')
).action(async (options) => {
  await executeCommand(getAccounts, options);
});

addCommonOptions(
  program
    .command('get-account-type-options')
    .description('Get account type options')
).action(async (options) => {
  await executeCommand(getAccountTypeOptions, options);
});

addCommonOptions(
  program
    .command('get-recent-account-balances')
    .description('Get recent account balances')
).action(async (options) => {
  await executeCommand(async (params: any = {}) => {
    return await getRecentAccountBalances(params.startDate);
  }, options);
});

addCommonOptions(
  program
    .command('get-account-holdings')
    .description('Get holdings for an account')
).action(async (options) => {
  await executeCommand(async (params: any) => {
    if (!params.accountId) {
      error('accountId is required for get-account-holdings');
    }
    return await getAccountHoldings(params.accountId);
  }, options);
});

addCommonOptions(
  program
    .command('get-account-history')
    .description('Get history for an account')
).action(async (options) => {
  await executeCommand(async (params: any) => {
    if (!params.accountId) {
      error('accountId is required for get-account-history');
    }
    return await getAccountHistory(params.accountId);
  }, options);
});

addCommonOptions(
  program
    .command('get-subscription-details')
    .description('Get subscription details')
).action(async (options) => {
  await executeCommand(getSubscriptionDetails, options);
});

addCommonOptions(
  program
    .command('get-institutions')
    .description('Get financial institutions')
).action(async (options) => {
  await executeCommand(getInstitutions, options);
});

addCommonOptions(
  program
    .command('get-account-snapshots-by-type')
    .description('Get account snapshots by type')
).action(async (options) => {
  await executeCommand(async (params: any) => {
    if (!params.startDate || !params.timeframe) {
      error('startDate and timeframe are required for get-account-snapshots-by-type');
    }
    if (params.timeframe !== 'year' && params.timeframe !== 'month') {
      error('timeframe must be either "year" or "month"');
    }
    return await getAccountSnapshotsByType(params.startDate, params.timeframe);
  }, options);
});

addCommonOptions(
  program
    .command('get-aggregate-snapshots')
    .description('Get aggregate snapshots')
).action(async (options) => {
  await executeCommand(async (params: any = {}) => {
    return await getAggregateSnapshots(params.startDate, params.endDate, params.accountType);
  }, options);
});

addCommonOptions(
  program
    .command('get-budget-settings')
    .description('Get budget settings')
).action(async (options) => {
  await executeCommand(getBudgetSettings, options);
});

addCommonOptions(
  program
    .command('get-budgets')
    .description('Get budgets')
).action(async (options) => {
  await executeCommand(async (params: any = {}) => {
    return await getBudgets(
      params.startDate,
      params.endDate,
      params.useLegacyGoals,
      params.useV2Goals
    );
  }, options);
});

addCommonOptions(
  program
    .command('get-transactions')
    .description('Get transactions with optional filters')
).action(async (options) => {
  await executeCommand(async (params: any = {}) => {
    return await getTransactions(params);
  }, options);
});

addCommonOptions(
  program
    .command('get-transactions-summary')
    .description('Get transactions summary')
).action(async (options) => {
  await executeCommand(getTransactionsSummary, options);
});

addCommonOptions(
  program
    .command('get-recurring-transactions')
    .description('Get recurring transactions')
).action(async (options) => {
  await executeCommand(async (params: any = {}) => {
    return await getRecurringTransactions(params.startDate, params.endDate);
  }, options);
});

addCommonOptions(
  program
    .command('get-categories')
    .description('Get transaction categories')
).action(async (options) => {
  await executeCommand(getCategories, options);
});

addCommonOptions(
  program
    .command('get-category-groups')
    .description('Get category groups')
).action(async (options) => {
  await executeCommand(getCategoryGroups, options);
});

addCommonOptions(
  program
    .command('get-transaction-tags')
    .description('Get transaction tags')
).action(async (options) => {
  await executeCommand(getTransactionTags, options);
});

addCommonOptions(
  program
    .command('get-transaction-details')
    .description('Get details for a specific transaction')
).action(async (options) => {
  await executeCommand(async (params: any) => {
    if (!params.transactionId) {
      error('transactionId is required for get-transaction-details');
    }
    return await getTransactionDetails(params.transactionId, params.redirectPosted);
  }, options);
});

addCommonOptions(
  program
    .command('get-transaction-splits')
    .description('Get splits for a transaction')
).action(async (options) => {
  await executeCommand(async (params: any) => {
    if (!params.transactionId) {
      error('transactionId is required for get-transaction-splits');
    }
    return await getTransactionSplits(params.transactionId);
  }, options);
});

addCommonOptions(
  program
    .command('get-cashflow')
    .description('Get cashflow data')
).action(async (options) => {
  await executeCommand(async (params: any = {}) => {
    return await getCashflow({
      limit: params.limit,
      startDate: params.startDate,
      endDate: params.endDate
    });
  }, options);
});

addCommonOptions(
  program
    .command('get-cashflow-summary')
    .description('Get cashflow summary')
).action(async (options) => {
  await executeCommand(async (params: any = {}) => {
    return await getCashflowSummary({
      limit: params.limit,
      startDate: params.startDate,
      endDate: params.endDate
    });
  }, options);
});

addCommonOptions(
  program
    .command('get-cashflow-dashboard')
    .description('Get cashflow dashboard data')
).action(async (options) => {
  await executeCommand(getCashFlowDashboard, options);
});

// Parse command-line arguments
program.parse(process.argv);

// Show help if no command provided
if (!process.argv.slice(2).length) {
  program.outputHelp();
}