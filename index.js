#!/usr/bin/env node

import { program } from 'commander'
// helper functions
import fs from 'fs'

const EXPENSES_FILE = 'expenses.json'

// File Operations
export const readExpensesFile = () => {
    try {
        if (!fs.existsSync(EXPENSES_FILE)) {
            fs.writeFileSync(EXPENSES_FILE, '[]')
            return []
        }
        return JSON.parse(fs.readFileSync(EXPENSES_FILE, 'utf8'))
    } catch (err) {
        console.error('Error reading expenses file:', err.message)
        return []
    }
}

export const saveExpensesFile = (expenses) => {
    try {
        fs.writeFileSync(EXPENSES_FILE, JSON.stringify(expenses, null, 2))
        console.log('Expenses saved successfully.')
    } catch (err) {
        console.error('Error saving expenses file:', err.message)
    }
}

// Expense Operations
export const addNewExpense = (amount, description, category) => {
    if (!amount || !description || !category) {
        console.error(
            'Please provide amount, description, and category for the expense.'
        )
        return
    }

    const expenses = readExpensesFile()
    const newExpense = {
        id: Date.now(), // Using timestamp as ID for better uniqueness
        amount: parseFloat(amount),
        description,
        category,
        date: new Date().toISOString(),
    }

    expenses.push(newExpense)
    saveExpensesFile(expenses)
    console.log(`Expense added: ${description} - $${amount} (${category})`)
}

export const deleteExpense = (id) => {
    if (!id) {
        console.error('Please provide an ID to delete the expense.')
        return
    }

    const expenses = readExpensesFile()
    const filteredExpenses = expenses.filter(
        (expense) => expense.id !== parseInt(id)
    )

    if (filteredExpenses.length === expenses.length) {
        console.error(`Expense with ID ${id} not found.`)
        return
    }

    saveExpensesFile(filteredExpenses)
    console.log(`Expense with ID ${id} deleted successfully.`)
}

// Reporting Functions
export const showExpensesSummary = () => {
    const expenses = readExpensesFile()
    if (expenses.length === 0) {
        console.log('No expenses found.')
        return
    }

    const total = expenses.reduce((sum, expense) => sum + expense.amount, 0)
    const categories = expenses.reduce(
        (acc, expense) => ({
            ...acc,
            [expense.category]: (acc[expense.category] || 0) + expense.amount,
        }),
        {}
    )

    console.log(`Total Expenses: $${total.toFixed(2)}`)
    console.table(
        Object.entries(categories).map(([category, amount]) => ({
            Category: category,
            Amount: `$${amount.toFixed(2)}`,
        }))
    )
}

export const listExpenses = (category) => {
    const expenses = readExpensesFile()
    if (expenses.length === 0) {
        console.log('No expenses found.')
        return
    }

    const expensesToShow = category
        ? expenses.filter((expense) => expense.category === category)
        : expenses

    if (category && expensesToShow.length === 0) {
        console.log(`No expenses found in category: ${category}`)
        return
    }

    console.table(expensesToShow)
}

// Command Line Interface
program
    .name('expense-cli')
    .description('A simple expense tracker CLI')
    .version('1.0.0')

program
    .command('add')
    .description('Add a new expense')
    .requiredOption('-a, --amount <amount>', 'Amount of the expense')
    .requiredOption(
        '-d, --description <description>',
        'Description of the expense'
    ) // Made description required
    .option('-c, --category <category>', 'Category of the expense')
    .action(({ amount, description, category }) => {
        addNewExpense(amount, description, category)
    })

program
    .command('delete')
    .description('Delete an expense by ID')
    .requiredOption('-i, --id <id>', 'ID of the expense to delete')
    .action(({ id }) => {
        deleteExpense(id)
    })

program
    .command('summary')
    .description('Show summary of expenses')
    .action(showExpensesSummary)

program
    .command('list')
    .description('List all expenses')
    .option('-c, --category <category>', 'Filter expenses by category')
    .option('-d, --date <date>', 'Filter expenses by date (YYYY-MM-DD)')
    .action(({ category }) => {
        listExpenses(category)
    })

program.parse(process.argv)
