# FieldFlow

FieldFlow is a full-stack Field Service Management System developed as an individual project for the Codezela Career Accelerator Full-Stack Developer Internship.

The system is designed to help service-based organizations manage customers, technicians, service work orders, technician assignments, job progress, and service history from one web application.

---

## Project Purpose

Many service organizations still manage field-service work using phone calls, messaging applications, spreadsheets, and manual records.

This can create problems such as:

- Missed or delayed service requests
- Unclear technician assignments
- Poor visibility of job progress
- Difficulty finding customer service history
- Difficulty reviewing completed work

FieldFlow aims to provide a simple centralized system for managing this workflow.

---

## Main Users

FieldFlow contains three primary user roles.

### Administrator

The Administrator can:

- Manage users
- Manage user roles
- View all system records
- Access the full dashboard

### Dispatcher

The Dispatcher can:

- Create and manage customers
- Create and manage technicians
- Create work orders
- Assign technicians
- Track work-order status
- Track work-order priority

### Technician

The Technician can:

- View assigned jobs
- Start assigned work
- Update job progress
- Add completion notes
- Complete assigned jobs

Technicians must only be able to access jobs assigned to them.

---

## Core Workflow

The main FieldFlow workflow is:

1. Dispatcher signs in.
2. Dispatcher creates or selects a customer.
3. Dispatcher creates a work order.
4. Dispatcher assigns a technician and scheduled date.
5. Technician signs in.
6. Technician views the assigned job under My Jobs.
7. Technician starts the job.
8. Technician adds progress updates.
9. Technician enters completion notes.
10. Technician completes the job.
11. Dashboard and work-order history update using stored database data.

This workflow is the main acceptance path for the project.

---

## Mandatory Modules

The project contains six mandatory areas:

1. Authentication
2. Role-Based Access Control
3. Customers
4. Technicians
5. Work Orders
6. Dashboard

Optional features will only be considered after the mandatory core system is complete.

---

## Required Technology Stack

The project is planned around the following technology stack:

| Area | Technology |
|---|---|
| Runtime | Node.js LTS and npm |
| Framework | Next.js App Router with React |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Authentication | Better Auth |
| Database | PostgreSQL hosted on Neon |
| ORM | Prisma |
| Validation | Zod |
| Testing | Playwright |
| Deployment | Vercel or another approved Next.js host |
| Version Control | Git and GitHub |

> Note: Some technologies listed above will be configured during later development weeks.

---

## Main Pages

The planned main pages are:

- `/login`
- `/dashboard`
- `/users`
- `/customers`
- `/technicians`
- `/work-orders`
- `/work-orders/new`
- `/work-orders/[id]`
- `/my-jobs`

---

## Initial Data Model

The initial Week 1 data model contains the following entities:

- User
- Customer
- Technician
- WorkOrder
- WorkOrderActivity

Main relationships:

```text
User 1 -------- 0..1 Technician

Customer 1 -------- * WorkOrder

Technician 1 -------- * WorkOrder

WorkOrder 1 -------- * WorkOrderActivity

User 1 -------- * WorkOrderActivity