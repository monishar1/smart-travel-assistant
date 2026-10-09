import { useEffect, useState } from "react";
import "./Budget.css";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

import { Doughnut } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

function Budget() {

  const [budget, setBudget] = useState("");
  const [expense, setExpense] = useState("");
  const [category, setCategory] = useState("Food");
  const [description, setDescription] = useState("");
  const [expenses, setExpenses] = useState([]);

  // Load saved data
  useEffect(() => {

    const savedBudget =
      JSON.parse(
        localStorage.getItem("travelBudget")
      ) || 0;

    const savedExpenses =
      JSON.parse(
        localStorage.getItem("travelExpenses")
      ) || [];

    setBudget(savedBudget);
    setExpenses(savedExpenses);

  }, []);


  // Save Budget
  const saveBudget = () => {

    if (!budget || Number(budget) <= 0) {
      alert("Please enter a valid budget.");
      return;
    }

    localStorage.setItem(
      "travelBudget",
      JSON.stringify(Number(budget))
    );

    alert("Budget saved successfully! 💰");
  };


  // Add Expense
  const addExpense = (e) => {

    e.preventDefault();

    if (!expense || Number(expense) <= 0) {
      alert("Please enter a valid expense amount.");
      return;
    }

    const newExpense = {

      id: Date.now(),

      amount: Number(expense),

      category: category,

      description: description
    };


    const updatedExpenses = [
      ...expenses,
      newExpense
    ];


    setExpenses(updatedExpenses);


    localStorage.setItem(
      "travelExpenses",
      JSON.stringify(updatedExpenses)
    );


    setExpense("");

    setDescription("");
  };


  // Delete Expense
  const deleteExpense = (id) => {

    const updatedExpenses =
      expenses.filter(
        (item) => item.id !== id
      );


    setExpenses(updatedExpenses);


    localStorage.setItem(
      "travelExpenses",
      JSON.stringify(updatedExpenses)
    );
  };


  // Total Spent
  const totalSpent = expenses.reduce(
    (total, item) =>
      total + item.amount,
    0
  );


  // Remaining Budget
  const remaining =
    Number(budget || 0) - totalSpent;

    const budgetAmount = Number(budget || 0);

const progressPercentage =
  budgetAmount > 0
    ? Math.min(
        (totalSpent / budgetAmount) * 100,
        100
      )
    : 0;

const isOverBudget =
  budgetAmount > 0 &&
  totalSpent > budgetAmount;

  // Category-wise calculation
  const categoryTotals = {};


  expenses.forEach((item) => {

    if (categoryTotals[item.category]) {

      categoryTotals[item.category] +=
        item.amount;

    } else {

      categoryTotals[item.category] =
        item.amount;
    }

  });


  // Chart Data
  const chartData = {

    labels:
      Object.keys(categoryTotals),

    datasets: [
      {
        data:
          Object.values(categoryTotals),

        backgroundColor: [
          "#d4af37",
          "#4f7cac",
          "#7b9e89",
          "#c17c74",
          "#8e7dbe",
          "#6f8294"
        ],

        borderWidth: 0
      }
    ]
  };


  // Chart Options
  const chartOptions = {

    responsive: true,

    maintainAspectRatio: false,

    plugins: {

      legend: {

        position: "bottom",

        labels: {

          color: "#ffffff",

          padding: 20,

          font: {
            size: 13
          }
        }
      },

      tooltip: {

        callbacks: {

          label: function (context) {

            return (
              " ₹" +
              context.raw.toLocaleString()
            );
          }
        }
      }
    }
  };


  return (

    <div className="budget-page">


      {/* ================= HERO ================= */}

      <section className="budget-hero">

        <span>
          SMART TRAVEL FINANCE
        </span>

        <h1>

          Manage your

          <br />

          <strong>
            travel budget.
          </strong>

        </h1>

        <p>
          Track your expenses and stay
          in control of your travel spending.
        </p>

      </section>



      {/* ================= MAIN ================= */}

      <section className="budget-section">


        {/* ================= SUMMARY ================= */}

        <div className="budget-summary">


          <div className="summary-card">

            <span>
              TOTAL BUDGET
            </span>

            <h2>
              ₹
              {Number(
                budget || 0
              ).toLocaleString()}
            </h2>

          </div>



          <div className="summary-card">

            <span>
              TOTAL SPENT
            </span>

            <h2>
              ₹
              {totalSpent.toLocaleString()}
            </h2>

          </div>



          <div className="summary-card">

            <span>
              REMAINING
            </span>

            <h2
              className={
                remaining < 0
                  ? "negative"
                  : ""
              }
            >
              ₹
              {remaining.toLocaleString()}
            </h2>

          </div>


        </div>



        {/* ================= BUDGET SETUP ================= */}

{/* ================= BUDGET PROGRESS ================= */}

{budgetAmount > 0 && (

  <div className="budget-progress-card">

    <div className="progress-header">

      <div>
        <span>BUDGET PROGRESS</span>

        <h2>
          Travel Budget Usage
        </h2>
      </div>

      <strong>
        {Math.round(progressPercentage)}%
      </strong>

    </div>


    <div className="progress-bar">

      <div
        className={`progress-fill ${
          isOverBudget
            ? "over-budget"
            : ""
        }`}
        style={{
          width:
            `${progressPercentage}%`
        }}
      ></div>

    </div>


    <div className="progress-info">

      <span>
        ₹{totalSpent.toLocaleString()}
        {" "}spent
      </span>

      <span>
        Budget: ₹
        {budgetAmount.toLocaleString()}
      </span>

    </div>


    {isOverBudget && (

      <div className="budget-warning">
        ⚠️ You have exceeded your travel budget.
      </div>

    )}

  </div>

)}
        <div className="budget-card">


          <div className="section-title">

            <span>
              BUDGET SETUP
            </span>

            <h2>
              Set your travel budget
            </h2>

          </div>



          <div className="budget-input-row">


            <div className="budget-input-box">

              <label>
                Total Budget
              </label>

              <input
                type="number"
                placeholder="Enter your budget"
                value={budget}
                onChange={(e) =>
                  setBudget(
                    e.target.value
                  )
                }
              />

            </div>



            <button
              className="save-budget-button"
              onClick={saveBudget}
            >
              Save Budget
            </button>


          </div>


        </div>



        {/* ================= ADD EXPENSE ================= */}

        <div className="budget-card">


          <div className="section-title">

            <span>
              EXPENSE TRACKER
            </span>

            <h2>
              Add an expense
            </h2>

          </div>



          <form
            className="expense-form"
            onSubmit={addExpense}
          >


            {/* Amount */}

            <div className="form-field">

              <label>
                Amount
              </label>

              <input
                type="number"
                placeholder="₹ Amount"
                value={expense}
                onChange={(e) =>
                  setExpense(
                    e.target.value
                  )
                }
              />

            </div>



            {/* Category */}

            <div className="form-field">

              <label>
                Category
              </label>

              <select
                value={category}
                onChange={(e) =>
                  setCategory(
                    e.target.value
                  )
                }
              >

                <option>
                  Food
                </option>

                <option>
                  Transport
                </option>

                <option>
                  Hotel
                </option>

                <option>
                  Shopping
                </option>

                <option>
                  Activities
                </option>

                <option>
                  Other
                </option>

              </select>

            </div>



            {/* Description */}

            <div className="form-field">

              <label>
                Description
              </label>

              <input
                type="text"
                placeholder="Example: Lunch"
                value={description}
                onChange={(e) =>
                  setDescription(
                    e.target.value
                  )
                }
              />

            </div>



            {/* Add Button */}

            <button
              className="add-expense-button"
              type="submit"
            >
              + Add Expense
            </button>


          </form>


        </div>



        {/* ================= CHART ================= */}

        {expenses.length > 0 && (

          <div className="expense-chart-card">


            <div className="section-title">

              <span>
                SPENDING ANALYSIS
              </span>

              <h2>
                Where your money goes
              </h2>

            </div>



            <div className="expense-chart">

              <Doughnut
                data={chartData}
                options={chartOptions}
              />

            </div>


          </div>

        )}



        {/* ================= EXPENSE HISTORY ================= */}

        <div className="expenses-section">


          <div className="section-title">

            <span>
              YOUR EXPENSES
            </span>

            <h2>
              Expense History
            </h2>

          </div>



          {expenses.length === 0 ? (

            /* Empty */

            <div className="no-expenses">

              <div>
                💳
              </div>

              <h3>
                No expenses yet
              </h3>

              <p>
                Add your first travel expense above.
              </p>

            </div>

          ) : (

            /* Expense List */

            <div className="expense-list">


              {expenses.map((item) => (

                <div
                  className="expense-item"
                  key={item.id}
                >


                  <div className="expense-icon">
                    💰
                  </div>



                  <div className="expense-details">

                    <h3>
                      {item.description ||
                        item.category}
                    </h3>

                    <span>
                      {item.category}
                    </span>

                  </div>



                  <strong className="expense-amount">

                    ₹
                    {item.amount.toLocaleString()}

                  </strong>



                  <button
                    className="delete-expense"
                    onClick={() =>
                      deleteExpense(
                        item.id
                      )
                    }
                  >
                    ×
                  </button>


                </div>

              ))}


            </div>

          )}


        </div>


      </section>


    </div>

  );
}


export default Budget;