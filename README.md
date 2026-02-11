# 🍽 Role-Based Food Ordering Application

A full-stack backend system implementing Role-Based Access Control (RBAC) and Country-Based Relational Access Control (ReBAC) using NestJS, GraphQL, Prisma, and PostgreSQL.

---

# 🚀 Tech Stack

Backend:
- NestJS
- GraphQL (Code First)
- Prisma ORM
- PostgreSQL
- JWT Authentication
- Passport

---

# 🔐 Role-Based Access Control (RBAC)

| Feature | Admin | Manager | Member |
|----------|--------|----------|----------|
| View restaurants | ✅ | ✅ | ✅ |
| Create order | ✅ | ✅ | ✅ |
| Checkout order | ✅ | ✅ | ❌ |
| Cancel order | ✅ | ✅ | ❌ |
| Add payment method | ✅ | ❌ | ❌ |

---

# 🌍 Country-Based Restriction (ReBAC)

Users can only:
- View restaurants from their assigned country
- Create orders within their country
- Access data related to their country

Countries supported:
- INDIA
- AMERICA

---

# 🛠 Setup Instructions

## 1️⃣ Clone Repository

