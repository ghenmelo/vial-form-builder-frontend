## 💻 Frontend – Vial Form Builder

The frontend of **Vial Form Builder** was built using [**Next.js**](https://nextjs.org/), with UI components powered by [**shadcn/ui**](https://ui.shadcn.com/) and styling handled entirely via [**Tailwind CSS**](https://tailwindcss.com/).

The application features a consistent **dark theme**

---

### 🧭 Pages Overview

#### `/form-viewer`

This page lists all existing forms in a clean, paginated table.

Each form entry includes:

- The **form name**
- Two action buttons:
  - **View** (eye icon): navigates to the form reply page (`/form-reply`)
  - **Delete**: deletes the selected form
- A large **"Create New Form"** button redirects to the form creation interface

---

#### `/form-builder`

This is the main page for **creating and editing forms**.

**Features include:**

- **Drag-and-drop interface** for adding and rearranging input components
- Dynamic **form title editing**
- On-click **input configuration**, allowing:
  - Edit question title
  - Set placeholder text
  - Mark question as required
  - Add selectable options (for `select`, `radio`, etc.)

When the form is saved, the user is redirected to the form viewer.

---

#### `/form-reply` ⚠️


This screen allows users to **respond to a form** and **view previously submitted responses**.

**Functionality:**

- Table displays all past responses for the form
- Button to **submit a new response**
- **Dynamic validation** using [**Zod**](https://zod.dev/) — schema is generated on the fly based on the form structure

---

### ✨ Additional Details

- **Tooltips** on icons for better user experience
- **Toast notifications** for success, errors, and warnings
