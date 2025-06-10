# 💰 Expense CLI

A simple command-line interface (CLI) tool to help you track and manage your daily expenses,
From [Roadmap.sh](https://roadmap.sh/projects/expense-tracker).

---

## 🚀 Usage

This CLI tool allows you to easily **add**, **delete**, **list**, and view a **summary** of your expenses.

---

### ⚠️ Important Note

You can run this CLI tool like:

```bash
node ./index.js <username>
```

But if you want to use it as a proper CLI command:

1. Add this in your `package.json`:

```json
"bin": {
    "github-activity": "./index.js"
},
"type": "module"
```

2. Then run:

```bash
npm link
```

Now you can use it globally:

```bash
github-activity Ibrahim-Rezq
```

## 🛠️ Commands and Options

| Command        | Description                | Options                                                                                           |
| :------------- | :------------------------- | :------------------------------------------------------------------------------------------------ |
| `add`          | Add a new expense          | `--amount <amount>` (required), `--description <description>` (required), `--category <category>` |
| `delete`       | Delete an expense by ID    | `--id <id>` (required)                                                                            |
| `summary`      | Show a summary of expenses | None                                                                                              |
| `list`         | List all recorded expenses | `--category <category>` (filter by category)                                                      |
| `-h`, `--help` | Show help message          | None                                                                                              |

---

## 📌 Example Commands

### Add an expense

```bash
expense-cli add --amount 50.75 --description "Weekly groceries" --category Food
```

### Delete an expense

First, list expenses to find the ID:

```bash
expense-cli list
```

Then, delete using the ID:

```bash
expense-cli delete --id 1701234567890
```

### Show expense summary

```bash
expense-cli summary
```

### List all expenses

```bash
expense-cli list
```

### List expenses by category

```bash
expense-cli list --category Transport
```

---

## 📝 Example Output

### `expense-cli summary`

```
Total Expenses: $125.75
┌───────────┬────────────┐
│ Category  │ Amount     │
├───────────┼────────────┤
│ Food      │ $75.50     │
│ Transport │ $25.00     │
│ Utilities │ $25.25     │
└───────────┴────────────┘
```

### `expense-cli list`

```
┌─────────────┬────────┬──────────────────────────┬───────────┬────────────────────────────┐
│ id          │ amount │ description              │ category  │ date                       │
├─────────────┼────────┼──────────────────────────┼───────────┼────────────────────────────┤
│ 1701234567890 │ 50.75  │ Weekly groceries         │ Food      │ 2024-01-15T10:30:00.000Z   │
│ 1701234567891 │ 25.00  │ Bus fare                 │ Transport │ 2024-01-16T08:00:00.000Z   │
│ 1701234567892 │ 24.75  │ Dinner with friends      │ Food      │ 2024-01-16T19:45:00.000Z   │
└─────────────┴────────┴──────────────────────────┴───────────┴────────────────────────────┘
```
