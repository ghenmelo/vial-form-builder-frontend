# 🧩 Vial Form Builder – Frontend

The **Vial Form Builder Frontend** is a modern form builder interface developed using **Next.js**, with UI powered by [**shadcn/ui**](https://ui.shadcn.com/) and styling handled by [**Tailwind CSS**](https://tailwindcss.com/).

The application supports a **dark theme**, is fully responsive, and highly componentized for maintainability and scalability.

---

## 🌐 Live Demo

The frontend is deployed on **Vercel** and can be accessed here:

🔗 https://vial-form-builder-frontend.vercel.app/form-reply

---

## 🧭 Pages Overview

### `/form-viewer`

This page displays a table with all existing forms and provides the following features:

- **Form Name** displayed in a clear table layout
- **Actions per form**:
  - 📝 View form responses via the `/form-reply` page
  - 🗑️ Delete form
- A large button for **creating new forms**, which navigates to `/form-builder`

---

### `/form-builder`

This is the **form creation/editing interface**, featuring:

- **Drag-and-drop interface** to manage input components dynamically
- Editable **form title**
- On-click **input customization**:
  - Edit question title
  - Change placeholder text
  - Toggle "required" status
  - Add selectable options (for dropdowns, radios, etc.)
- After saving, the user is redirected to the form viewer

---

### `/form-reply` ⚠️

A dedicated page for:

- **Submitting responses** to a form
- **Viewing all previous responses** in a structured table
- Includes a button to **submit a new entry**
- Utilizes **Zod** for dynamic schema validation based on the form structure

---

## ✨ Additional Features

- 🎯 **Tooltips** on action icons for better UX
- ✅ **Toast notifications** for success, errors, and warnings
- 🧱 **Component-based architecture** for scalability

---

## 🚀 Running Locally

To run the frontend locally, follow these steps:

### 1. Clone the Repository

```bash
git clone https://github.com/seu-usuario/vial-form-builder-frontend.git

docker compose build
docker compose up