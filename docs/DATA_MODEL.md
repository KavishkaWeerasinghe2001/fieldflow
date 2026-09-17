# FieldFlow – Initial Data Model

## 1. Purpose

This document records the initial Week 1 database model and
relationships for the FieldFlow Field Service Management System.

This is a planning model. The final Prisma schema may be refined
during Week 2 when PostgreSQL, Prisma and Better Auth are configured.

## 2. Main Entities

The initial core entities are:

1. User
2. Customer
3. Technician
4. WorkOrder
5. WorkOrderActivity

## 3. User

Purpose:
Represents a person who can authenticate into FieldFlow.

Initial fields:

- id
- name
- email
- role
- createdAt
- updatedAt

Roles:

- ADMIN
- DISPATCHER
- TECHNICIAN

A User with the TECHNICIAN role may be linked to one Technician profile.

## 4. Customer

Purpose:
Stores information about a customer receiving field service.

Initial fields:

- id
- name
- email
- phone
- address
- createdAt
- updatedAt

Relationship:

One Customer can have many WorkOrders.

## 5. Technician

Purpose:
Stores field-worker information separate from authentication data.

Initial fields:

- id
- userId
- name
- email
- phone
- skills
- status
- createdAt
- updatedAt

Possible status values:

- AVAILABLE
- BUSY
- INACTIVE

Relationships:

- A Technician is linked to a User account.
- One Technician can be assigned many WorkOrders.

## 6. WorkOrder

Purpose:
Represents a field-service job.

Initial fields:

- id
- title
- description
- customerId
- technicianId
- priority
- status
- scheduledAt
- completionNotes
- createdAt
- updatedAt

Priority values:

- LOW
- MEDIUM
- HIGH
- URGENT

Status values:

- OPEN
- ASSIGNED
- IN_PROGRESS
- COMPLETED
- CANCELLED

Relationships:

- A WorkOrder belongs to one Customer.
- A WorkOrder may be assigned to one Technician.
- A WorkOrder can contain many WorkOrderActivity records.

## 7. WorkOrderActivity

Purpose:
Stores important work-order updates and provides activity history.

Initial fields:

- id
- workOrderId
- userId
- type
- note
- createdAt

Relationships:

- A WorkOrderActivity belongs to one WorkOrder.
- A WorkOrderActivity records the User responsible for the update.

## 8. Initial Relationships

User 1 ---- 0..1 Technician

Customer 1 ---- * WorkOrder

Technician 1 ---- * WorkOrder

WorkOrder 1 ---- * WorkOrderActivity

User 1 ---- * WorkOrderActivity

## 9. Important Business Rules

1. Only Administrator and Dispatcher users can assign technicians.
2. A Technician can see only WorkOrders assigned to them.
3. A WorkOrder cannot start without an assigned Technician.
4. A WorkOrder cannot be completed without completion notes.
5. Important status updates must record the responsible User and time.
6. Protected actions must also be checked on the server side.

## 10. Week 1 Design Status

This document is an initial relational data-model draft.

The exact database schema will be refined during Week 2 before the
first Prisma migration.