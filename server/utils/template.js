module.exports.goalTemplate = (templateData) => {
  const { name, startDate, endDate, goalList } = templateData;
  const startDateFormat = new Date(startDate);
  const endDateFormat = new Date(endDate);

  return `Goal for the week **[${startDateFormat.toLocaleDateString()} - ${endDateFormat.toLocaleDateString()}]**
> By **${name.label}**
\`\`\`
${goalList.map((goal, index) => index + 1 + ". " + goal).join("\n")}
\`\`\`


`;
};
