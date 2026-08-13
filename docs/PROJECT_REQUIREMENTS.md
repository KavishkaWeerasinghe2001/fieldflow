# FieldFlow – Initial Project Requirements

## 1. Project Overview

FieldFlow is a full-stack Field Service Management System.

The purpose of the system is to help a service company manage customers, technicians, work orders, technician assignments, job progress, completion information, and operational summaries from one web application.

The system will be developed as an individual internship project.

The core workflow is:

**Create Work Order → Assign Technician → Technician Starts Work → Add Progress/Notes → Complete Work Order → Dashboard and History Update**



## 2. Core User Roles

FieldFlow has three required user roles:

1. Administrator
2. Dispatcher
3. Technician

Each role must have different permissions.

Access must be protected on the server side as well as in the user interface.



## 3. Administrator

The Administrator has the highest level of access.

### Main responsibilities

* Manage system users.
* Manage user roles.
* View all customer records.
* View all technician records.
* View all work orders.
* Access the full dashboard.
* Access all main management areas of the system.

### Main pages

* `/login`
* `/dashboard`
* `/users`
* `/customers`
* `/customers/[id]`
* `/technicians`
* `/technicians/[id]`
* `/work-orders`
* `/work-orders/new`
* `/work-orders/[id]`



## 4. Dispatcher

The Dispatcher coordinates field-service jobs.

### Main responsibilities

* Create customer records.
* View and edit customer records.
* Search customers.
* Create technician records.
* View and edit technician information.
* View technician skills and availability.
* Create work orders.
* Assign technicians to work orders.
* Set work-order priority.
* Set scheduled service dates.
* Track work-order status.
* Search and filter work orders.
* View operational dashboard information.

### Restrictions

* A Dispatcher must not manage user accounts or roles.

### Main pages

* `/login`
* `/dashboard`
* `/customers`
* `/customers/[id]`
* `/technicians`
* `/technicians/[id]`
* `/work-orders`
* `/work-orders/new`
* `/work-orders/[id]`



## 5. Technician

The Technician performs assigned field-service work.

### Main responsibilities

* Sign in to the system.
* View jobs assigned to their own account.
* View the details of an assigned work order.
* Start an assigned job.
* Add progress information or work updates.
* Add completion notes.
* Complete the assigned job.
* View completed-job history.

### Restrictions

* A Technician must not see another technician's assigned jobs.
* A Technician must not manage users.
* A Technician must not manage customers.
* A Technician must not manage technician records.
* A Technician must not create or assign work orders.

### Main pages

* `/login`
* `/my-jobs`
* `/work-orders/[id]` for work orders assigned to the signed-in technician



## 6. Initial Page Requirements

### 6.1 Login Page

**Route:** `/login`

**Users:** Administrator, Dispatcher, Technician

The page should provide:

* Email field
* Password field
* Sign-in button
* Clear invalid-login message

After successful authentication, the user should be taken to the correct workspace according to their role.



### 6.2 Dashboard

**Route:** `/dashboard`

**Main users:** Administrator and Dispatcher

The dashboard should show useful operational information such as:

* Open job count
* Assigned job count
* Completed job count
* Recent work orders
* Available technicians
* Busy technicians
* Quick links to commonly used actions
* Useful empty states when no data exists



### 6.3 Users

**Route:** `/users`

**User:** Administrator only

The page should allow the Administrator to manage system accounts and role access.

Other roles must not be allowed to access this area.



### 6.4 Customers

**Route:** `/customers`

**Users:** Administrator and Dispatcher

The customer module should support:

* Create customer
* View customer
* Edit customer
* Search customer

Important customer information includes:

* Name
* Email
* Phone
* Address

Search should support useful fields such as name, email, or phone.



### 6.5 Customer Details

**Route:** `/customers/[id]`

**Users:** Administrator and Dispatcher

The page should show:

* Customer information
* Editable customer details
* Related work-order history when available



### 6.6 Technicians

**Route:** `/technicians`

**Users:** Administrator and Dispatcher

The technician module should support:

* Create technician
* View technician
* Edit technician
* Search or filter technicians
* View skills
* View availability/status

Each technician profile must eventually be connected to a system user account.



### 6.7 Technician Details

**Route:** `/technicians/[id]`

**Users:** Administrator and Dispatcher

The page should show:

* Technician details
* Skills
* Availability
* Assigned work orders



### 6.8 Work Orders

**Route:** `/work-orders`

**Users:** Administrator and Dispatcher

The work-order list should show useful information such as:

* Title
* Customer
* Assigned technician
* Priority
* Status
* Scheduled date

The page should support filters such as:

* Status
* Priority
* Technician



### 6.9 Create Work Order

**Route:** `/work-orders/new`

**Users:** Administrator and Dispatcher

A work order should contain:

* Title
* Description
* Customer
* Assigned technician when available
* Priority
* Status
* Scheduled date and time
* Completion notes when the job is completed



### 6.10 Work Order Details

**Route:** `/work-orders/[id]`

**Users:** Role-dependent

Administrator and Dispatcher may view and manage work orders according to their permissions.

A Technician may access a work order only when it is assigned to that technician.

The page should eventually display:

* Work-order information
* Customer
* Technician
* Priority
* Status
* Scheduled date
* Progress information
* Completion notes
* Activity/history information



### 6.11 My Jobs

**Route:** `/my-jobs`

**User:** Technician

The page should show only work orders assigned to the signed-in Technician.

Useful sections may include:

* Assigned
* In Progress
* Completed

The Technician should be able to open an assigned job and perform the permitted work-order actions.



## 7. Initial Permission Matrix

| Action                           | Administrator           | Dispatcher                   | Technician |
| -------------------------------- | ----------------------- | ---------------------------- | ---------- |
| Sign in                          | Yes                     | Yes                          | Yes        |
| Manage users and roles           | Yes                     | No                           | No         |
| Manage customers                 | Yes                     | Yes                          | No         |
| Manage technician records        | Yes                     | Yes                          | No         |
| Create work orders               | Yes                     | Yes                          | No         |
| Assign technicians               | Yes                     | Yes                          | No         |
| View all work orders             | Yes                     | Yes                          | No         |
| View own assigned work           | Yes                     | Yes                          | Yes        |
| Start assigned technician job    | Not a core Admin action | Not a core Dispatcher action | Yes        |
| Add technician progress          | Not a core Admin action | Not a core Dispatcher action | Yes        |
| Complete assigned technician job | Not a core Admin action | Not a core Dispatcher action | Yes        |
| View full operational dashboard  | Yes                     | Yes                          | No         |



## 8. Core Business Rules

The initial system must enforce the following rules:

1. Only Administrator and Dispatcher users can assign jobs.
2. A Technician can see only work orders assigned to that Technician.
3. A work order cannot start without an assigned Technician.
4. A work order cannot be completed without completion notes.
5. Work-order status updates must record the responsible user and time.
6. Protected actions must be checked on the server side.
7. Hiding a button in the interface is not enough to provide security.



## 9. Mandatory Core Modules

The following six areas form the mandatory core of FieldFlow:

1. Authentication
2. Role Access
3. Customers
4. Technicians
5. Work Orders
6. Dashboard

The core project should be completed before optional features are added.



## 10. Initial Scope Decision

The first development goal is a simple, reliable working system.

Advanced or optional features should not be used to replace unfinished mandatory functionality.

The primary end-to-end flow that must work is:

1. Dispatcher creates a customer or selects an existing customer.
2. Dispatcher creates a work order.
3. Dispatcher assigns a Technician.
4. Technician signs in and sees the job in My Jobs.
5. Technician starts the assigned work.
6. Technician adds progress information.
7. Technician enters completion notes.
8. Technician completes the work order.
9. Saved data updates the dashboard and history.



## 11. Status of This Document

This is the initial Week 1 requirements draft.

It may be refined during development if requirements are clarified by the mentor, but changes should be documented and committed through Git.
