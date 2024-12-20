function addDaysToDate(dateString: string, days: number): string {
  const createdDate = new Date(dateString);
  createdDate.setDate(createdDate.getDate() + days);
  return new Date(createdDate).toDateString();
}

export { addDaysToDate };
