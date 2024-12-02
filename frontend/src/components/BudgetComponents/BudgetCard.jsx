import { Card, ProgressBar, Stack, Button } from "react-bootstrap";
import { currencyFormatter } from "./utils";

/*
The following code creates a budget card.
*/

export default function BudgetCard({
  name,
  amount,
  max,
  hideButtons,
  onAddExpenseClick,
  onViewExpensesClick,
}) {
  // classNames dictates the background color for each budget card
  // (amount > max) => the user is overspending => change card to red
  // Otherwise => keep card gray (default)
  const classNames = [];
  if (amount > max) {
    classNames.push("bg-danger", "bg-opacity-10");
  } else {
    classNames.push("reg-card");
  }

  return (
    <Card className={classNames.join(" ")}>
      <Card.Body>
        <Card.Title className="d-flex justify-content-between align-items-baseline fw-normal mb-3">
          <div className="me-2">{name}</div>
          <div className="d-flex align-items-baseline">
            {currencyFormatter.format(amount)}
            {max && (
              <span className="text-muted fs-6 ms-1">
                / {currencyFormatter.format(max)}
              </span>
            )}
          </div>
        </Card.Title>
        {max && (
          <ProgressBar
            className="rounded-pill"
            variant={getProgressBarVariant(amount, max)}
            min={0}
            max={max}
            now={amount}
          />
        )}
        {!hideButtons && (
          <Stack
            direction="horizontal"
            gap="2"
            className="mt-4 justify-content-between"
          >
            <Button className="ms-auto b-button" onClick={onAddExpenseClick}>
              Add Expense
            </Button>
            <Button onClick={onViewExpensesClick} className="e-button">
              View Expenses
            </Button>
          </Stack>
        )}
      </Card.Body>
    </Card>
  );
}

// This function sets the color of the progress bar as users input their budget.
function getProgressBarVariant(amount, max) {
  const ratio = amount / max;
  if (ratio < 0.5) {
    return "primary";
  } else if (ratio < 0.75) {
    return "warning";
  } else {
    return "danger";
  }
}
