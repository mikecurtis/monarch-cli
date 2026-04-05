/**
 * Command schemas defining the input format for each CLI command
 */

export interface CommandSchema {
  description: string;
  parameters?: {
    [key: string]: ParameterSchema;
  };
  examples?: string[];
}

export interface ParameterSchema {
  type: string;
  required: boolean;
  description: string;
  default?: any;
  enum?: any[];
  example?: any;
}

export const commandSchemas: { [key: string]: CommandSchema } = {
  'get-accounts': {
    description: 'Get all accounts in your Monarch Money household',
    parameters: {},
    examples: [
      'monarch-cli get-accounts',
      'monarch-cli get-accounts -o accounts.json'
    ]
  },

  'get-account-type-options': {
    description: 'Get available account type and subtype options',
    parameters: {},
    examples: [
      'monarch-cli get-account-type-options'
    ]
  },

  'get-recent-account-balances': {
    description: 'Get recent balance history for accounts',
    parameters: {
      startDate: {
        type: 'string',
        required: false,
        description: 'Start date for balance history (ISO 8601 format)',
        example: '2024-01-01'
      }
    },
    examples: [
      'monarch-cli get-recent-account-balances',
      'monarch-cli get-recent-account-balances -i \'{"startDate": "2024-01-01"}\''
    ]
  },

  'get-account-holdings': {
    description: 'Get investment holdings for a specific account',
    parameters: {
      accountId: {
        type: 'string',
        required: true,
        description: 'The ID of the account to get holdings for',
        example: '123456'
      }
    },
    examples: [
      'monarch-cli get-account-holdings -i \'{"accountId": "123456"}\''
    ]
  },

  'get-account-history': {
    description: 'Get transaction history and snapshots for a specific account',
    parameters: {
      accountId: {
        type: 'string',
        required: true,
        description: 'The ID of the account to get history for',
        example: '123456'
      }
    },
    examples: [
      'monarch-cli get-account-history -i \'{"accountId": "123456"}\''
    ]
  },

  'get-subscription-details': {
    description: 'Get details about your Monarch Money subscription',
    parameters: {},
    examples: [
      'monarch-cli get-subscription-details'
    ]
  },

  'get-institutions': {
    description: 'Get connected financial institutions and credentials',
    parameters: {},
    examples: [
      'monarch-cli get-institutions'
    ]
  },

  'get-account-snapshots-by-type': {
    description: 'Get account balance snapshots grouped by account type',
    parameters: {
      startDate: {
        type: 'string',
        required: true,
        description: 'Start date for snapshots (ISO 8601 format)',
        example: '2024-01-01'
      },
      timeframe: {
        type: 'string',
        required: true,
        description: 'Timeframe for grouping snapshots',
        enum: ['month', 'year'],
        example: 'month'
      }
    },
    examples: [
      'monarch-cli get-account-snapshots-by-type -i \'{"startDate": "2024-01-01", "timeframe": "month"}\''
    ]
  },

  'get-aggregate-snapshots': {
    description: 'Get aggregate balance snapshots across accounts',
    parameters: {
      startDate: {
        type: 'string',
        required: false,
        description: 'Start date for snapshots (ISO 8601 format)',
        example: '2024-01-01'
      },
      endDate: {
        type: 'string',
        required: false,
        description: 'End date for snapshots (ISO 8601 format)',
        example: '2024-12-31'
      },
      accountType: {
        type: 'string',
        required: false,
        description: 'Filter by account type',
        example: 'checking'
      }
    },
    examples: [
      'monarch-cli get-aggregate-snapshots',
      'monarch-cli get-aggregate-snapshots -i \'{"startDate": "2024-01-01", "endDate": "2024-12-31"}\''
    ]
  },

  'get-budget-settings': {
    description: 'Get budget configuration settings',
    parameters: {},
    examples: [
      'monarch-cli get-budget-settings'
    ]
  },

  'get-budgets': {
    description: 'Get budget data for a date range',
    parameters: {
      startDate: {
        type: 'string',
        required: false,
        description: 'Start date for budget data (ISO 8601 format)',
        example: '2024-01-01'
      },
      endDate: {
        type: 'string',
        required: false,
        description: 'End date for budget data (ISO 8601 format)',
        example: '2024-12-31'
      },
      useLegacyGoals: {
        type: 'boolean',
        required: false,
        description: 'Include legacy goals in response',
        default: false
      },
      useV2Goals: {
        type: 'boolean',
        required: false,
        description: 'Include V2 goals in response',
        default: false
      }
    },
    examples: [
      'monarch-cli get-budgets',
      'monarch-cli get-budgets -i \'{"startDate": "2024-01-01", "endDate": "2024-01-31"}\''
    ]
  },

  'get-transactions': {
    description: 'Get transactions with optional filters',
    parameters: {
      limit: {
        type: 'number',
        required: false,
        description: 'Maximum number of transactions to return',
        default: 100,
        example: 50
      },
      offset: {
        type: 'number',
        required: false,
        description: 'Number of transactions to skip (for pagination)',
        default: 0,
        example: 0
      },
      startDate: {
        type: 'string',
        required: false,
        description: 'Start date for transaction range (ISO 8601 format)',
        example: '2024-01-01'
      },
      endDate: {
        type: 'string',
        required: false,
        description: 'End date for transaction range (ISO 8601 format)',
        example: '2024-12-31'
      },
      search: {
        type: 'string',
        required: false,
        description: 'Search term to filter transactions',
        example: 'coffee'
      },
      categoryIds: {
        type: 'array',
        required: false,
        description: 'Filter by category IDs',
        example: ['cat_123', 'cat_456']
      },
      accountIds: {
        type: 'array',
        required: false,
        description: 'Filter by account IDs',
        example: ['acc_123', 'acc_456']
      },
      tagIds: {
        type: 'array',
        required: false,
        description: 'Filter by tag IDs',
        example: ['tag_123', 'tag_456']
      },
      hasAttachments: {
        type: 'boolean',
        required: false,
        description: 'Filter transactions with/without attachments'
      },
      hasNotes: {
        type: 'boolean',
        required: false,
        description: 'Filter transactions with/without notes'
      },
      hiddenFromReports: {
        type: 'boolean',
        required: false,
        description: 'Filter transactions hidden/visible in reports'
      },
      isSplit: {
        type: 'boolean',
        required: false,
        description: 'Filter split transactions'
      },
      isRecurring: {
        type: 'boolean',
        required: false,
        description: 'Filter recurring transactions'
      },
      importedFromMint: {
        type: 'boolean',
        required: false,
        description: 'Filter transactions imported from Mint'
      },
      syncedFromInstitution: {
        type: 'boolean',
        required: false,
        description: 'Filter transactions synced from institution'
      }
    },
    examples: [
      'monarch-cli get-transactions',
      'monarch-cli get-transactions -i \'{"limit": 50, "startDate": "2024-01-01", "endDate": "2024-01-31"}\'',
      'monarch-cli get-transactions -i \'{"search": "coffee", "categoryIds": ["cat_123"]}\''
    ]
  },

  'get-transactions-summary': {
    description: 'Get summary statistics for transactions',
    parameters: {},
    examples: [
      'monarch-cli get-transactions-summary'
    ]
  },

  'get-recurring-transactions': {
    description: 'Get recurring transaction items',
    parameters: {},
    examples: [
      'monarch-cli get-recurring-transactions'
    ]
  },

  'get-categories': {
    description: 'Get all transaction categories',
    parameters: {},
    examples: [
      'monarch-cli get-categories'
    ]
  },

  'get-category-groups': {
    description: 'Get category groups',
    parameters: {},
    examples: [
      'monarch-cli get-category-groups'
    ]
  },

  'get-transaction-tags': {
    description: 'Get all transaction tags',
    parameters: {},
    examples: [
      'monarch-cli get-transaction-tags'
    ]
  },

  'get-transaction-details': {
    description: 'Get detailed information for a specific transaction',
    parameters: {
      transactionId: {
        type: 'string',
        required: true,
        description: 'The ID of the transaction to get details for',
        example: 'txn_123456'
      }
    },
    examples: [
      'monarch-cli get-transaction-details -i \'{"transactionId": "txn_123456"}\''
    ]
  },

  'get-transaction-splits': {
    description: 'Get split details for a transaction',
    parameters: {
      transactionId: {
        type: 'string',
        required: true,
        description: 'The ID of the transaction to get splits for',
        example: 'txn_123456'
      }
    },
    examples: [
      'monarch-cli get-transaction-splits -i \'{"transactionId": "txn_123456"}\''
    ]
  },

  'get-cashflow': {
    description: 'Get cashflow data',
    parameters: {
      startDate: {
        type: 'string',
        required: false,
        description: 'Start date for cashflow data (ISO 8601 format)',
        example: '2024-01-01'
      },
      endDate: {
        type: 'string',
        required: false,
        description: 'End date for cashflow data (ISO 8601 format)',
        example: '2024-12-31'
      }
    },
    examples: [
      'monarch-cli get-cashflow',
      'monarch-cli get-cashflow -i \'{"startDate": "2024-01-01", "endDate": "2024-12-31"}\''
    ]
  },

  'get-cashflow-summary': {
    description: 'Get cashflow summary statistics',
    parameters: {
      startDate: {
        type: 'string',
        required: false,
        description: 'Start date for cashflow summary (ISO 8601 format)',
        example: '2024-01-01'
      },
      endDate: {
        type: 'string',
        required: false,
        description: 'End date for cashflow summary (ISO 8601 format)',
        example: '2024-12-31'
      },
      groupBy: {
        type: 'string',
        required: false,
        description: 'Grouping period for cashflow summary',
        enum: ['day', 'week', 'month', 'quarter', 'year'],
        example: 'month'
      }
    },
    examples: [
      'monarch-cli get-cashflow-summary',
      'monarch-cli get-cashflow-summary -i \'{"startDate": "2024-01-01", "endDate": "2024-12-31", "groupBy": "month"}\''
    ]
  },

  'get-cashflow-dashboard': {
    description: 'Get cashflow dashboard data for reporting periods',
    parameters: {
      startDate: {
        type: 'string',
        required: false,
        description: 'Start date for cashflow dashboard (ISO 8601 format)',
        example: '2024-01-01'
      },
      endDate: {
        type: 'string',
        required: false,
        description: 'End date for cashflow dashboard (ISO 8601 format)',
        example: '2024-12-31'
      },
      budgetStrategy: {
        type: 'string',
        required: false,
        description: 'Budget strategy for cashflow calculation',
        enum: ['budget', 'actual', 'average'],
        example: 'budget'
      }
    },
    examples: [
      'monarch-cli get-cashflow-dashboard',
      'monarch-cli get-cashflow-dashboard -i \'{"startDate": "2024-01-01", "endDate": "2024-12-31", "budgetStrategy": "actual"}\''
    ]
  }
};