export function getMonthsByFinancialYear(codDateStr) {
  const monthsByFY = {};
  const currentDate = new Date();
  const codDate = new Date(codDateStr);

  let year = currentDate.getFullYear();
  let month = currentDate.getMonth(); // 0 = Jan

  while (
    year < codDate.getFullYear() ||
    (year === codDate.getFullYear() && month <= codDate.getMonth())
  ) {
    const fyStartYear = month < 3 ? year - 1 : year;
    const fyKey = `${fyStartYear}-${fyStartYear + 1}`;
    const monthName = new Date(year, month).toLocaleString("default", {
      month: "long",
    });

    if (!monthsByFY[fyKey]) monthsByFY[fyKey] = [];
    monthsByFY[fyKey].push(monthName);

    // move to next month
    month++;
    if (month > 11) {
      month = 0;
      year++;
    }
  }

  return monthsByFY;
}
