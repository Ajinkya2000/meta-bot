module.exports.goalTemplate = (templateData) => {
  const { name, startDate, endDate, goalList } = templateData;
  const startDateFormat = new Date(startDate);
  const endDateFormat = new Date(endDate);

  return `__Goal for the week **[${startDateFormat.toLocaleDateString()} - ${endDateFormat.toLocaleDateString()}]**__
> By **${name.label}**
\`\`\`autohotkey
${goalList.map((goal, index) => index + 1 + ". " + goal).join("\n")}
\`\`\`

`;
};
