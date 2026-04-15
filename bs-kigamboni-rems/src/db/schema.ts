// src/db/schema.ts
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('users', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').unique(), 
  passwordHash: text('password_hash'), 
  role: text('role').notNull().default('TENANT'),
  isOffline: integer('is_offline', { mode: 'boolean' }).default(false),
  status: text('status').notNull().default('PENDING_APPROVAL'), 
  phone: text('phone')
});

export const units = sqliteTable('units', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  type: text('type').notNull(), 
  minLeaseDays: integer('min_lease_days').notNull().default(90), 
  status: text('status').notNull().default('VACANT')
});

export const agreementTemplates = sqliteTable('agreement_templates', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  markdownContent: text('markdown_content').notNull() 
});

export const agreements = sqliteTable('agreements', {
  id: text('id').primaryKey(),
  unitId: text('unit_id').notNull(),
  tenantId: text('tenant_id').notNull(),
  startDate: text('start_date').notNull(),
  endDate: text('end_date').notNull(),
  rentAmount: integer('rent_amount').notNull(),
  renderedMarkdown: text('rendered_markdown').notNull(), 
  status: text('status').notNull().default('ACTIVE') 
});

export const invoices = sqliteTable('invoices', {
  id: text('id').primaryKey(),
  agreementId: text('agreement_id').notNull(),
  monthYear: text('month_year').notNull(), 
  amountExpected: integer('amount_expected').notNull(),
  status: text('status').notNull().default('UNPAID')
});

export const payments = sqliteTable('payments', {
  id: text('id').primaryKey(),
  invoiceId: text('invoice_id').notNull(),
  amountPaid: integer('amount_paid').notNull(),
  paymentDate: text('payment_date').notNull(),
  method: text('method').notNull(), 
  status: text('status').notNull().default('VERIFIED'), 
  receiptUrls: text('receipt_urls', { mode: 'json' }) 
});

export const expenses = sqliteTable('expenses', {
  id: text('id').primaryKey(),
  category: text('category').notNull(),
  amount: integer('amount').notNull(),
  expenseDate: text('expense_date').notNull(),
  description: text('description'),
  paidBy: text('paid_by').notNull().default('BUSINESS') 
});

export const shareholders = sqliteTable('shareholders', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  equityPercentage: integer('equity_percentage').notNull() 
});

export const withdrawals = sqliteTable('withdrawals', {
  id: text('id').primaryKey(),
  shareholderId: text('shareholder_id').notNull(),
  amount: integer('amount').notNull(),
  date: text('date').notNull(),
  notes: text('notes')
});