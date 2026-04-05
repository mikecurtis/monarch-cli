import type { GraphQLClient } from 'graphql-request';

export const SESSION_DIR: string;
export const SESSION_FILE: string;
export const ENV_TOKEN_KEY: "MONARCH_TOKEN";
export const AUTH_HEADER_KEY: "Authorization";
export const CSRF_KEY: "csrftoken";
export const DEFAULT_RECORD_LIMIT: 100;
export const ERRORS_KEY: "error_code";
export const BASE_URL: "https://api.monarch.com";
export const GQL_ENDPOINT: `${typeof BASE_URL}/graphql`;

export const MonarchMoneyEndpoints: {
  getLoginEndpoint(): `http${string}`;
  getGraphQL(): `http${string}`;
  getAccountBalanceHistoryUploadEndpoint(): `http${string}`;
};

export class RequireMFAException extends Error {
  constructor(message?: string);
}

export class LoginFailedException extends Error {
  constructor(message?: string);
}

export class RequestFailedException extends Error {
  constructor(message?: string);
}

export const setToken: (newToken: string) => void;
export const getHeaders: () => Record<string, string>;
export const getToken: () => string | null;

export const createInterface: () => readline.Interface;

export declare function loginUser(
  email: string,
  password: string,
  mfaSecretKey?: string | null
): Promise<void>;

export declare function multiFactorAuthenticate(
  email: string,
  password: string,
  code: string
): Promise<void>;

export declare function interactiveLogin(
  useSavedSession?: boolean,
  saveSessionFlag?: boolean
): Promise<void>;

export interface AccountType {
  name: string;
  display: string;
  group?: string;
  possibleSubtypes?: Array<{ display: string; name: string }>;
}

export interface AccountSubtype {
  name: string;
  display: string;
}

export interface Institution {
  id: string;
  plaidInstitutionId?: string;
  name: string;
  primaryColor?: string;
  url?: string;
  status?: string;
  hasIssuesReported?: boolean;
  hasIssuesReportedMessage?: string;
  plaidStatus?: string;
  balanceStatus?: string;
  transactionsStatus?: string;
}

export interface Credential {
  id: string;
  updateRequired?: boolean;
  disconnectedFromDataProviderAt?: string;
  dataProvider?: string;
  hasSyncInProgress?: boolean;
  canBeForceRefreshed?: boolean;
  institution?: Institution;
}

export interface Account {
  id: string;
  displayName: string;
  syncDisabled?: boolean;
  deactivatedAt?: string | null;
  isHidden?: boolean;
  isAsset?: boolean;
  mask?: string;
  createdAt?: string;
  updatedAt?: string;
  displayLastUpdatedAt?: string;
  currentBalance?: number;
  displayBalance?: string | number;
  includeInNetWorth?: boolean;
  hideFromList?: boolean;
  hideTransactionsFromReports?: boolean;
  includeBalanceInNetWorth?: boolean;
  includeInGoalBalance?: boolean;
  dataProvider?: string;
  dataProviderAccountId?: string;
  isManual?: boolean;
  transactionsCount?: number;
  holdingsCount?: number;
  manualInvestmentsTrackingMethod?: string;
  order?: number;
  icon?: string;
  logoUrl?: string;
  type?: AccountType;
  subtype?: AccountSubtype;
  credential?: Credential;
  institution?: Institution;
  isLiability?: boolean;
  invertSyncedBalance?: boolean;
  canInvertBalance?: boolean;
  hasSyncInProgress?: boolean;
}

export interface HouseholdPreferences {
  id: string;
  accountGroupOrder?: string[];
}

export interface AccountTypeOptions {
  type: AccountType;
  subtype: AccountSubtype;
}

export interface RecentBalance {
  date: string;
  balance: number;
}

export interface Holding {
  id: string;
  quantity: number;
  basis: number;
  totalValue: number;
  securityPriceChangeDollars: number;
  securityPriceChangePercent: number;
  lastSyncedAt: string;
  holdings: {
    id: string;
    type: string;
    typeDisplay: string;
    name: string;
    ticker: string;
    closingPrice: number;
    isManual: boolean;
    closingPriceUpdatedAt: string;
  };
  security: {
    id: string;
    name: string;
    type: string;
    ticker: string;
    typeDisplay: string;
    currentPrice: number;
    currentPriceUpdatedAt: string;
    closingPrice: number;
    closingPriceUpdatedAt: string;
    oneDayChangePercent: number;
    oneDayChangeDollars: number;
  };
}

export interface AggregateHoldings {
  edges: Array<{
    node: Holding;
  }>;
}

export interface Portfolio {
  aggregateHoldings: AggregateHoldings;
}

export interface Snapshot {
  date: string;
  signedBalance: number;
  accountId?: string;
  accountName?: string;
}

export interface Subscription {
  id: string;
  paymentSource: string;
  referralCode: string;
  isOnFreeTrial: boolean;
  hasPremiumEntitlement: boolean;
}

export interface TransactionTag {
  id: string;
  name: string;
  color: string;
  order: number;
  transactionCount?: number;
}

export interface CategoryGroup {
  id: string;
  name: string;
  type: string;
  budgetVariability?: string;
  groupLevelBudgetingEnabled?: boolean;
  __typename?: string;
}

export interface Category {
  id: string;
  name: string;
  icon?: string;
  systemCategory?: string;
  budgetVariability?: string;
  group: CategoryGroup;
  __typename?: string;
}

export interface Merchant {
  id: string;
  name: string;
  transactionsCount?: number;
  logoUrl?: string;
  recurringTransactionStream?: {
    frequency: string;
    isActive: boolean;
  };
}

export interface Attachment {
  id: string;
  publicId?: string;
  extension?: string;
  sizeBytes?: number;
  filename?: string;
  originalAssetUrl?: string;
}

export interface Goal {
  id: string;
  name: string;
}

export interface SavingsGoalEvent {
  id: string;
  goal: Goal;
}

export interface AccountBrief {
  id: string;
  displayName: string;
  icon?: string;
  logoUrl?: string;
}

export interface User {
  id: string;
  displayName: string;
  profilePictureUrl?: string;
  name?: string;
}

export interface BusinessEntity {
  id: string;
  name: string;
  logoUrl: string;
  color: string;
}

export interface Transaction {
  id: string;
  amount: number;
  pending: boolean;
  date: string;
  originalDate?: string;
  hideFromReports: boolean;
  hiddenByAccount?: boolean;
  plaidName?: string;
  notes?: string;
  isRecurring: boolean;
  reviewStatus?: string;
  needsReview: boolean;
  reviewedAt?: string;
  reviewedByUser?: User;
  dataProviderDescription?: string;
  deletedAt?: string;
  deletedByType?: string;
  isSplitTransaction: boolean;
  hasSplitTransactions?: boolean;
  splitTransactions?: SplitTransaction[];
  originalTransaction?: { id: string; date: string; amount: number; merchant: { id: string; name: string } };
  attachments: Attachment[];
  goal?: Goal;
  savingsGoalEvent?: SavingsGoalEvent;
  category: Category;
  merchant: Merchant;
  tags: TransactionTag[];
  account: AccountBrief;
  ownedByUser?: User;
  businessEntity?: BusinessEntity;
  isManual?: boolean;
  needsReviewByUser?: { id: string };
}

export interface SplitTransaction {
  id: string;
  amount: number;
  merchant: { id: string; name: string };
  category: { id: string; name: string };
  notes?: string;
}

export interface TransactionsResult {
  totalCount: number;
  totalSelectableCount?: number;
  results: Transaction[];
}

export interface TransactionsSummary {
  avg: number;
  count: number;
  max: number;
  maxExpense: number;
  sum: number;
  sumIncome: number;
  sumExpense: number;
  first: number;
  last: number;
}

export interface RecurringTransactionStream {
  id: string;
  reviewStatus: string;
  frequency: string;
  amount: number;
  baseDate: string;
  dayOfTheMonth: number;
  isApproximate: boolean;
  name: string;
  logoUrl?: string;
  recurringType: string;
  merchant: { id: string; name: string; logoUrl?: string };
}

export interface RecurringTransactionItem {
  stream: RecurringTransactionStream;
  date: string;
  isPast: boolean;
  transactionId?: string;
  amount: number;
  amountDiff?: number;
  category: { id: string; name: string; budgetVariability: string };
  account: { id: string; displayName: string; logoUrl?: string };
}

export interface CategoryWithRollovers {
  id: string;
  order: number;
  name: string;
  icon: string;
  systemCategory?: string;
  isSystemCategory: boolean;
  isDisabled: boolean;
  updatedAt: string;
  createdAt?: string;
  budgetVariability: string;
  group: CategoryGroup;
  rolloverPeriod?: RolloverPeriod;
}

export interface RolloverPeriod {
  id: string;
  startMonth: string;
  endMonth?: string;
  startingBalance: number;
  frequency?: string;
  targetAmount?: number;
  type: string;
}

export interface BudgetMonthlyAmounts {
  month: string;
  plannedCashFlowAmount: number;
  plannedSetAsideAmount: number;
  actualAmount: number;
  remainingAmount: number;
  previousMonthRolloverAmount: number;
  rolloverType: string;
  cumulativeActualAmount: number;
  rolloverTargetAmount: number;
}

export interface BudgetCategoryMonthlyAmounts {
  category: { id: string };
  monthlyAmounts: BudgetMonthlyAmounts[];
}

export interface BudgetCategoryGroupMonthlyAmounts {
  categoryGroup: { id: string };
  monthlyAmounts: BudgetMonthlyAmounts[];
}

export interface BudgetFlexMonthlyAmounts {
  budgetVariability: string;
  monthlyAmounts: BudgetMonthlyAmounts[];
}

export interface BudgetTotals {
  actualAmount: number;
  plannedAmount: number;
  previousMonthRolloverAmount: number;
  remainingAmount: number;
}

export interface BudgetMonthTotals {
  month: string;
  totalIncome: BudgetTotals;
  totalExpenses: BudgetTotals;
  totalFixedExpenses: BudgetTotals;
  totalNonMonthlyExpenses: BudgetTotals;
  totalFlexibleExpenses: BudgetTotals;
}

export interface GoalV2 {
  id: string;
  name: string;
  archivedAt?: string;
  completedAt?: string;
  priority: number;
  imageStorageProvider: string;
  imageStorageProviderId: string;
  plannedContributions: Array<{ id: string; month: string; amount: number }>;
  monthlyContributionSummaries: Array<{ month: string; sum: number }>;
}

export interface SavingsGoalMonthlyBudgetAmounts {
  id: string;
  savingsGoal: {
    id: string;
    name: string;
    type: string;
    status: string;
    archivedAt?: string;
    completedAt?: string;
    priority: number;
    targetDate?: string;
    imageStorageProvider: string;
    imageStorageProviderId: string;
  };
  monthlyAmounts: Array<{
    id: string;
    month: string;
    plannedAmount: number;
    actualAmount: number;
    remainingAmount: number;
  }>;
}

export interface BudgetData {
  monthlyAmountsByCategory: BudgetCategoryMonthlyAmounts[];
  monthlyAmountsByCategoryGroup: BudgetCategoryGroupMonthlyAmounts[];
  monthlyAmountsForFlexExpense: BudgetFlexMonthlyAmounts[];
  totalsByMonth: BudgetMonthTotals[];
}

export interface BudgetCategoryGroup {
  id: string;
  name: string;
  order: number;
  type: string;
  budgetVariability: string;
  updatedAt: string;
  groupLevelBudgetingEnabled: boolean;
  categories: CategoryWithRollovers[];
  rolloverPeriod?: RolloverPeriod;
}

export interface CashflowByCategory {
  category: { id: string; name: string; group: CategoryGroup };
  summary: { sum: number };
}

export interface CashflowByCategoryGroup {
  categoryGroup: { id: string; name: string; type: string };
  summary: { sum: number };
}

export interface CashflowByMerchant {
  merchant: { id: string; name: string; logoUrl?: string };
  summary: { sumIncome: number; sumExpense: number };
}

export interface CashflowSummary {
  sumIncome: number;
  sumExpense: number;
  savings: number;
  savingsRate: number;
}

export interface PayloadError {
  fieldErrors?: Array<{ field: string; messages: string[] }>;
  message: string;
  code: string;
}

export interface TransactionFilters {
  limit?: number;
  offset?: number;
  startDate?: string | null;
  endDate?: string | null;
  search?: string;
  categoryIds?: string[];
  accountIds?: string[];
  tagIds?: string[];
  hasAttachments?: boolean | null;
  hasNotes?: boolean | null;
  hiddenFromReports?: boolean | null;
  isSplit?: boolean | null;
  isRecurring?: boolean | null;
  importedFromMint?: boolean | null;
  syncedFromInstitution?: boolean | null;
}

export interface GetAccountsResponse {
  accounts: Account[];
  householdPreferences: HouseholdPreferences;
}

export interface GetAccountTypeOptionsResponse {
  accountTypeOptions: AccountTypeOptions[];
}

export interface GetRecentAccountBalancesResponse {
  accounts: Array<{ id: string; recentBalances: RecentBalance[] }>;
}

export interface GetAccountHoldingsResponse {
  portfolio: Portfolio;
}

export interface GetAccountHistoryResponse {
  account: Account;
  transactions: { totalCount: number; results: Transaction[] };
  snapshots: Snapshot[];
}

export interface GetSubscriptionDetailsResponse {
  subscription: Subscription;
}

export interface GetInstitutionsResponse {
  credentials: Credential[];
  accounts: Array<Account & { deletedAt?: string }>;
  subscription: { isOnFreeTrial: boolean; hasPremiumEntitlement: boolean };
}

export interface GetSnapshotsByAccountTypeResponse {
  snapshotsByAccountType: Array<{
    accountType: string;
    month: string;
    balance: number;
  }>;
  accountTypes: Array<{ name: string; group: string }>;
}

export interface GetAggregateSnapshotsResponse {
  aggregateSnapshots: Array<{ date: string; balance: number }>;
}

export interface BudgetSettings {
  budgetSystem: string;
  budgetApplyToFutureMonthsDefault: boolean;
  flexExpenseRolloverPeriod?: RolloverPeriod;
}

export interface GetBudgetsResponse {
  budgetSystem: string;
  budgetData: BudgetData;
  categoryGroups: BudgetCategoryGroup[];
  goalsV2: GoalV2[];
  savingsGoalMonthlyBudgetAmounts: SavingsGoalMonthlyBudgetAmounts[];
}

export interface GetTransactionsResponse {
  allTransactions: TransactionsResult;
  transactionRules: Array<{ id: string }>;
}

export interface GetTransactionsSummaryResponse {
  aggregates: { summary: TransactionsSummary };
}

export interface GetRecurringTransactionsResponse {
  recurringTransactionItems: RecurringTransactionItem[];
}

export interface GetCategoriesResponse {
  categories: CategoryWithRollovers[];
}

export interface GetCategoryGroupsResponse {
  categoryGroups: Array<{
    id: string;
    name: string;
    order: number;
    type: string;
    updatedAt: string;
    createdAt: string;
  }>;
}

export interface GetTransactionTagsResponse {
  householdTransactionTags: TransactionTag[];
}

export interface GetTransactionDetailsResponse {
  getTransaction: Transaction;
  myHousehold: { users: User[] };
}

export interface GetTransactionSplitsResponse {
  getTransaction: Transaction;
}

export interface GetCashflowResponse {
  byCategory: CashflowByCategory[];
  byCategoryGroup: CashflowByCategoryGroup[];
  byMerchant: CashflowByMerchant[];
  summary: { summary: CashflowSummary };
}

export interface GetCashflowSummaryResponse {
  summary: { summary: CashflowSummary };
}

export interface GetCashFlowDashboardResponse {
  byDay: Array<{
    summary: { sumExpense: number };
    groupBy: { day: string };
  }>;
}

export interface DeleteCategoryResponse {
  deleteCategory: {
    errors?: PayloadError[];
    deleted: boolean;
  };
}

export interface CreateCategoryResponse {
  createCategory: {
    errors?: PayloadError[];
    category?: CategoryWithRollovers;
  };
}

export interface CreateTransactionTagResponse {
  createTransactionTag: {
    tag?: TransactionTag;
    errors?: Array<{ message: string }>;
  };
}

export interface SetTransactionTagsResponse {
  setTransactionTags: {
    errors?: PayloadError[];
    transaction?: { id: string; tags: Array<{ id: string }> };
  };
}

export interface UpdateTransactionSplitsResponse {
  updateTransactionSplit: {
    errors?: PayloadError[];
    transaction?: Transaction;
  };
}

export interface UpdateTransactionResponse {
  updateTransaction: {
    transaction?: Transaction;
    errors?: PayloadError[];
  };
}

export interface SetBudgetAmountResponse {
  updateOrCreateBudgetItem: {
    budgetItem?: { id: string; budgetAmount: number };
  };
}

export interface DeleteTransactionResponse {
  deleteTransaction: {
    deleted: boolean;
    errors?: PayloadError[];
  };
}

export interface CreateTransactionResponse {
  createTransaction: {
    errors?: PayloadError[];
    transaction?: { id: string };
  };
}

export interface UploadAccountBalanceHistoryResponse {
  success?: boolean;
}

export interface CreateManualAccountResponse {
  createManualAccount: {
    account?: { id: string };
    errors?: PayloadError[];
  };
}

export interface UpdateAccountResponse {
  updateAccount: {
    account?: Account;
    errors?: PayloadError[];
  };
}

export interface DeleteAccountResponse {
  deleteAccount: {
    deleted: boolean;
    errors?: PayloadError[];
  };
}

export interface RequestAccountsRefreshResponse {
  forceRefreshAccounts: {
    success: boolean;
    errors?: PayloadError[];
  };
}

export interface IsAccountsRefreshCompleteResponse {
  accounts: Array<{ id: string; hasSyncInProgress: boolean }>;
}

export interface GetSchemaResponse {
  __schema?: {
    queryType: { name: string };
  };
}

export interface GetBudgetSettingsResponse extends BudgetSettings {}

export declare function getAccounts(): Promise<GetAccountsResponse>;

export declare function getAccountTypeOptions(): Promise<GetAccountTypeOptionsResponse>;

export declare function getRecentAccountBalances(startDate?: string | null): Promise<GetRecentAccountBalancesResponse>;

export declare function getAccountHoldings(accountId: string): Promise<GetAccountHoldingsResponse>;

export declare function getAccountHistory(accountId: string): Promise<GetAccountHistoryResponse>;

export declare function getSubscriptionDetails(): Promise<GetSubscriptionDetailsResponse>;

export declare function getInstitutions(): Promise<GetInstitutionsResponse>;

export declare function getAccountSnapshotsByType(startDate: string, timeframe: 'year' | 'month'): Promise<GetSnapshotsByAccountTypeResponse>;

export declare function getAggregateSnapshots(
  startDate?: string | null,
  endDate?: string | null,
  accountType?: string | null
): Promise<GetAggregateSnapshotsResponse>;

export declare function getBudgetSettings(): Promise<GetBudgetSettingsResponse>;

export declare function getBudgets(
  startDate?: string | null,
  endDate?: string | null,
  useLegacyGoals?: boolean,
  useV2Goals?: boolean
): Promise<GetBudgetsResponse>;

export interface GetTransactionsOptions {
  limit?: number;
  offset?: number;
  startDate?: string | null;
  endDate?: string | null;
  search?: string;
  categoryIds?: string[];
  accountIds?: string[];
  tagIds?: string[];
  hasAttachments?: boolean | null;
  hasNotes?: boolean | null;
  hiddenFromReports?: boolean | null;
  isSplit?: boolean | null;
  isRecurring?: boolean | null;
  importedFromMint?: boolean | null;
  syncedFromInstitution?: boolean | null;
}

export declare function getTransactions(options?: GetTransactionsOptions): Promise<GetTransactionsResponse>;

export declare function getTransactionsSummary(): Promise<GetTransactionsSummaryResponse>;

export declare function getRecurringTransactions(
  startDate?: string | null,
  endDate?: string | null
): Promise<GetRecurringTransactionsResponse>;

export declare function getCategories(): Promise<GetCategoriesResponse>;

export declare function getCategoryGroups(): Promise<GetCategoryGroupsResponse>;

export interface GetTransactionTagsOptions {
  search?: string;
  limit?: number;
  bulkParams?: Record<string, unknown>;
}

export declare function getTransactionTags(options?: GetTransactionTagsOptions): Promise<GetTransactionTagsResponse>;

export declare function getTransactionDetails(
  transactionId: string,
  redirectPosted?: boolean
): Promise<GetTransactionDetailsResponse>;

export declare function getTransactionSplits(transactionId: string): Promise<GetTransactionSplitsResponse>;

export interface GetCashflowOptions {
  limit?: number;
  startDate?: string | null;
  endDate?: string | null;
}

export declare function getCashflow(options?: GetCashflowOptions): Promise<GetCashflowResponse>;

export declare function getCashflowSummary(options?: GetCashflowOptions): Promise<GetCashflowSummaryResponse>;

export declare function getCashFlowDashboard(): Promise<GetCashFlowDashboardResponse>;

export declare function deleteTransactionCategory(categoryId: string): Promise<boolean>;

export declare function deleteTransactionCategories(categoryIds: string[]): Promise<Array<boolean | Error>>;

export interface CreateTransactionCategoryOptions {
  groupId: string;
  transactionCategoryName: string;
  rolloverStartMonth?: Date;
  icon?: string;
  rolloverEnabled?: boolean;
  rolloverType?: string;
}

export declare function createTransactionCategory(
  options: CreateTransactionCategoryOptions
): Promise<CreateCategoryResponse>;

export declare function createTransactionTag(
  name: string,
  color: string
): Promise<CreateTransactionTagResponse>;

export declare function setTransactionTags(
  transactionId: string,
  tagIds: string[]
): Promise<SetTransactionTagsResponse>;

export interface SplitData {
  id?: string;
  merchantId?: string;
  categoryId?: string;
  amount: number;
  notes?: string;
}

export declare function updateTransactionSplits(
  transactionId: string,
  splitData?: SplitData[] | null
): Promise<UpdateTransactionSplitsResponse>;

export interface UpdateTransactionOptions {
  transactionId: string;
  categoryId?: string | null;
  merchantName?: string | null;
  goalId?: string | null;
  amount?: number | null;
  date?: string | null;
  hideFromReports?: boolean | null;
  needsReview?: boolean | null;
  notes?: string | null;
}

export declare function updateTransaction(
  options: UpdateTransactionOptions
): Promise<UpdateTransactionResponse>;

export interface SetBudgetAmountOptions {
  amount: number;
  categoryId?: string | null;
  categoryGroupId?: string | null;
  timeframe?: string;
  startDate?: string | null;
  applyToFuture?: boolean;
}

export declare function setBudgetAmount(
  options: SetBudgetAmountOptions
): Promise<SetBudgetAmountResponse>;

export declare function deleteTransaction(transactionId: string): Promise<boolean>;

export interface CreateTransactionOptions {
  date: string;
  accountId: string;
  amount: number;
  merchantName: string;
  categoryId: string;
  notes?: string;
  updateBalance?: boolean;
}

export declare function createTransaction(
  options: CreateTransactionOptions
): Promise<CreateTransactionResponse>;

export declare function uploadAccountBalanceHistory(
  accountId: string,
  csvContent: string
): Promise<void>;

export declare function createManualAccount(
  accountType: string,
  accountSubType: string,
  isInNetWorth: boolean,
  accountName: string,
  accountBalance?: number
): Promise<CreateManualAccountResponse>;

export interface UpdateAccountOptions {
  accountId: string;
  accountName?: string | null;
  accountBalance?: number | null;
  accountType?: string | null;
  accountSubType?: string | null;
  includeInNetWorth?: boolean | null;
  hideFromSummaryList?: boolean | null;
  hideTransactionsFromReports?: boolean | null;
}

export declare function updateAccount(
  options: UpdateAccountOptions
): Promise<UpdateAccountResponse>;

export declare function deleteAccount(accountId: string): Promise<DeleteAccountResponse>;

export declare function requestAccountsRefresh(accountIds: string[]): Promise<boolean>;

export declare function isAccountsRefreshComplete(
  accountIds?: string[] | null
): Promise<boolean>;

export declare function requestAccountsRefreshAndWait(
  accountIds?: string[] | null,
  timeout?: number,
  delay?: number
): Promise<boolean>;

export declare function requestAccountsRefreshAndDontWait(
  accountIds?: string[] | null
): Promise<boolean>;

export declare function getSchema(): Promise<GetSchemaResponse>;
