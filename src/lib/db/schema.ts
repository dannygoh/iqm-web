import { pgTable, serial, text, varchar } from 'drizzle-orm/pg-core'

// These tables mirror the Payload collections but are used for bulk
// directory queries where Drizzle's raw SQL performance is preferable.

export const members = pgTable('members', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  memberType: varchar('member_type', { length: 50 }).notNull(),
  status: varchar('status', { length: 20 }).notNull().default('Active'),
})

export const auditors = pgTable('auditors', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  grade: varchar('grade', { length: 60 }).notNull(),
  registrationNumber: varchar('registration_number', { length: 50 }),
  status: varchar('status', { length: 20 }).notNull().default('Active'),
})

export const consultants = pgTable('consultants', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  registrationNumber: varchar('registration_number', { length: 50 }),
  status: varchar('status', { length: 20 }).notNull().default('Active'),
})
